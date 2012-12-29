(function(G, THREE, _) {
    var Sprite = G.Sprite = {};

    _.extend(Sprite, {
        AnimationType : { // Powers of 2, so they can be combined
            LOOP : 1,
            ONCE : 2,
            BOUNCE : 4,
            JERKY : 8,
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
            this.animationType = 0;

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

                that.loaded = true;
                
                onLoadCallback && onLoadCallback();
            });

            this.update = function() {
                if (that.started && that.loaded) {
                    var now = +new Date();
                    
                    var lastFrame = that.frame;
                    if (now >= that.frameTime + that.speed) {
                        if(that.animationType & Sprite.AnimationType.JERKY) {
                            that.frame += ((Math.random() < 0.5) ? that.direction : 0);
                        } else {
                            that.frame += that.direction;
                        }
                        that.frame = Math.min(Math.max(0, that.frame), that.frameCount);
                        that.frame %= that.frameCount;
                        
                        if(that.frame == 0) {
                            if(that.animationType & Sprite.AnimationType.BOUNCE) that.direction = -that.direction;
                        }
                        if(that.frame == that.frameCount-1) {
                            if(that.animationType & Sprite.AnimationType.ONCE) that.stop();
                            if(that.animationType & Sprite.AnimationType.BOUNCE) that.direction = -that.direction;
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
            
            callback && callback(sprite);
        }
    });
})( GAME, THREE, _ );
