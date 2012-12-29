(function(G, THREE, _) {
    var Sprite = G.Sprite = {};
    
    function getMinZ(vertices){
        return _.reduce(vertices, function(memo, val, kej){
            return Math.min(memo,
                    Math.abs(Math.round(val.z)));
        }, 10000);
    }
    
    function getCollisionFrame(geometry){
        var vertices = geometry.vertices;
        var minz = getMinZ(vertices);
        var result = [];
        var inserted = {};
        _.each(vertices, function(val) {
            if (Math.abs(Math.round(val.z)) === minz){
                var e =  {"x":+val.x, "y":+val.y, "z":0};
                var j = JSON.stringify(e);
                if (!inserted[j]){
                    inserted[j] = true;
                    result.push(e);
                }
            }
        });
//        var result = _.uniq(_.compact(_.map(vertices, function(val){ 
//            return Math.abs(Math.round(val.z)) === minz ? ""+val.x+"/"+val.y : null  ; 
//        })));
//        
//        result = _.map(result, function(val){ 
//            var a = val.split("/");
//            return {"x":+a[0], "y":+a[1], "z":0};
//        });
        return result;
    }
    
    _.extend(Sprite, {
        getCollisionFrame : function(geometry){
            return getCollisionFrame(geometry);
        },
        
        AnimationType : {
            LOOP : 0,
            ONCE : 1,
            BOUNCE : 2,
        },
        Animation : function(geometryType, path, count, onLoadCallback) {
            var that = this;
            this.started = false;
            this.frame = 0;
            this.frameCount = count;
            this.direction = 1;
            this.speed = 100;
            this.frameTime = 0;
            this.loaded = false;
            this.type = Sprite.AnimationType.LOOP;

            this.materials = Sprite.loadMaterials(path, that.frameCount, null, function() {
                var geometry = null;
                switch (geometryType) {
                    case "CUBE":
                        geometry = new THREE.CubeGeometry(that.materials[0].width, that.materials[0].height, that.materials[0].height, 3, 3, 3);                    
                        break;
                    case "PLANE":
                        geometry = new THREE.PlaneGeometry(that.materials[0].width, that.materials[0].height);
                        break;
                }
                
                that.sprite = new THREE.Mesh(geometry, that.materials[0]);
                that.sprite.getWidth = function() { return that.materials[0].width * that.sprite.scale.x; };
                that.sprite.getHeight = function() { return that.materials[0].height * that.sprite.scale.y; };

                //that.sprite.collisionFrame = getCollisionFrame(geometry);
                var aa = (new THREE.PlaneGeometry(that.materials[0].width, that.materials[0].height)).vertices;
                that.sprite.collisionFrame = [aa[0],aa[1],aa[3],aa[2]];
                
                that.loaded = true;
                
                onLoadCallback && onLoadCallback();
            });

            this.update = function() {
                if (that.started && that.loaded) {
                    var now = +new Date();
                    
                    var lastFrame = that.frame;
                    if (now >= that.frameTime + that.speed) {
                        that.frame += that.direction;
                        that.frame %= that.frameCount;
                        if(that.frame == 0) {
                            if(that.type == Sprite.AnimationType.BOUNCE) that.direction = -that.direction;
                        }
                        if(that.frame == that.frameCount-1) {
                            if(that.type == Sprite.AnimationType.ONCE) that.stop();
                            if(that.type == Sprite.AnimationType.BOUNCE) that.direction = -that.direction;
                        }
                        var currFrame = that.frame;

                        that.sprite.material = that.materials[currFrame];

                        that.frameTime = now;
                    }
                }
            };
            this.start = function() {
                that.started = true;
            };
            this.stop = function() {
                that.started = false;
            };
        },
        loadMaterials: function(path, count, callback, doneCallback) {
            var materials = [];

            _.range(count).forEach(function(i) {
                var materialPath = path + (i+1);
                Sprite.loadMaterial(materialPath, function(material) {
                    callback && callback(material);
                    materials[i] = material;

                    count === _.compact(materials).length && doneCallback();
                });
            });

            return materials;
        },
        loadMaterial: function(path, callback, img) {
            if (!img) {
                return THREE.ImageUtils.loadTexture( path + '.png', {},
                    function success( image ) { Sprite.loadMaterial(path, callback, image); },
                    function error() { Sprite.loadMaterial(path, callback); }
                );
            }

            var material = new THREE.MeshPhongMaterial({
                map : img,
                transparent : true
            });
            material.width = img.image.width;
            material.height = img.image.height;

            callback && callback(material);
        },
        loadSprites: function(path, count, callback, doneCallback) {
            var sprites = [];
            
            _.range(count).forEach(function(i) {
                var spritePath = path + (i+1);
                Sprite.loadSprite(spritePath, function(sprite) {
                    callback && callback(sprite);
                    sprites[i] = sprite;

                    count === _.compact(sprites).length && doneCallback();
                });
            });

            return sprites;
        },
        loadSprite: function(path, callback, img) {
            if (!img) {
                return THREE.ImageUtils.loadTexture( path + '.png', {},
                    function success( image ) { Sprite.loadSprite(path, callback, image); },
                    function error( err ) { console.log(err); Sprite.loadSprite(path, callback); }
                );
            }
            var geometry = new THREE.CubeGeometry(img.image.width, img.image.height, 600);
            
            var material = new THREE.MeshPhongMaterial({
                    map : img,
                    transparent : true
                }),
                sprite = new THREE.Mesh(geometry, material);

            sprite.material = material;
            sprite.getWidth = function() { return img.image.width * sprite.scale.x; };
            sprite.getHeight = function() { return img.image.height * sprite.scale.y; };

            //sprite.collisionFrame = getCollisionFrame(geometry);
            var aa = (new THREE.PlaneGeometry(img.image.width, img.image.height)).vertices;
            sprite.collisionFrame = [aa[0],aa[1],aa[3],aa[2]];
            
            callback && callback(sprite);
        }
    });
})( GAME, THREE, _ );
