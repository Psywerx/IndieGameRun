(function(G, THREE, _) {
    var Sprite = G.Sprite = {};

    var textures = {
        "player" : { name: "player", count: 3 },
        "fire" : { name: "fire", count: 16 },
        "test" : { name: "test", count: 1 },
        "tree" : { name: "tree", count: 1 },
        "bg"   : { name: "bg", count : 1}
    };

    _.extend(Sprite, {
        loadTextures : function(callback) { // Don't read this... just don't...
            for(var texI in textures) (function(tex){
                tex.materials = [];
                _.range(Math.max(1,tex.count)).forEach(function(i) {
                    var texs = tex;
                    var texName = "img/" + texs.name + (texs.count <= 1 ? "" : (i+1));
                    Sprite.loadMaterial(texName, function(material) {
                        texs.materials[i] = material;
                        material.loaded = true;
                        if(_.every(texs.materials, function(mat){ return mat.loaded; })) {
                            texs.loaded = true;
                            if(texs.count == 1) {
                                texs.material = texs.materials[0];
                            }
                            
                            var allLoaded = true;
                            for(var texI in textures) (function(tex){
                                if(!tex.loaded) {
                                    allLoaded = false;
                                }
                            })(textures[texI]);
                            
                            if(allLoaded) {
                                textures.loaded = true;
                                callback && callback();
                            }
                        }
                    });
                });
            })(textures[texI]);
        },
        AnimationType : { // Powers of 2, so they can be combined
            LOOP : 1,
            ONCE : 2,
            BOUNCE : 4,
            JERKY : 8,
        },
        GeometryType : { // redundant :)
            PLANE : "PLANE",
            CUBE : "CUBE",
        },
        Animation : function(geometryType, name) {
            var that = this;
            this.started = false;
            this.frame = 0;
            this.direction = 1;
            this.speed = 100;
            this.frameTime = 0;
            this.animationType = 0;

            this.materials = Sprite.getMaterials(name)
            this.frameCount = this.materials.length;
            var geometry = null;
            switch (geometryType) {
                case Sprite.GeometryType.CUBE:
                    geometry = new THREE.CubeGeometry(that.materials[0].width, that.materials[0].height, that.materials[0].height, 3, 3, 3);                    
                    break;
                case Sprite.GeometryType.PLANE:
                    geometry = new THREE.PlaneGeometry(that.materials[0].width, that.materials[0].height);
                    break;
                default:
                    console.log("Unknown geometryType: ", geometryType);
                    //fallback to plane:
                    geometryType = Sprite.GeometryType.PLANE;
                    geometry = new THREE.PlaneGeometry(that.materials[0].width, that.materials[0].height);
                    break;
            }
            
            that.sprite = new THREE.Mesh(geometry, that.materials[0]);
            that.sprite.getWidth = function() { return that.materials[0].width * that.sprite.scale.x; };
            that.sprite.getHeight = function() { return that.materials[0].height * that.sprite.scale.y; };

            this.update = function() {
                if (that.started) {
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
        getMaterials: function(name) {
            return textures[name].materials;
        },
        getMaterial: function(name) {
            if(!textures[name]) console.log("Unknown material: ",name);
            return textures[name].material;
        },
        loadMaterial: function(path, callback, img) {
            if (!img) {
                THREE.ImageUtils.loadTexture(path + '.png', {},
                    function success( image ) { Sprite.loadMaterial(path, callback, image); },
                    function error() { Sprite.loadMaterial(path, callback); }
                );
            } else {
                var material = new THREE.MeshPhongMaterial({
                    map : img,
                    transparent : true
                });
                material.width = img.image.width;
                material.height = img.image.height;

                callback && callback(material);
            }
        },
        getSprite: function(name, geometryType) {
            var material = Sprite.getMaterial(name);
            var geometry = null;
            switch (geometryType) {
                case Sprite.GeometryType.CUBE:
                    geometry = new THREE.CubeGeometry(material.width, material.height, material.height, 3, 3, 3);                    
                    break;
                case Sprite.GeometryType.PLANE:
                    geometry = new THREE.PlaneGeometry(material.width, material.height);
                    break;
                default:
                    console.log("Unknown geometryType: ", geometryType);
                    //fallback to plane:
                    geometryType = Sprite.GeometryType.PLANE;
                    geometry = new THREE.PlaneGeometry(material.width, material.height);
                    break;
            }
            sprite = new THREE.Mesh(geometry, material);

            sprite.material = material;
            sprite.getWidth = function() { return material.width * sprite.scale.x; };
            sprite.getHeight = function() { return material.height * sprite.scale.y; };
            
            return sprite;
        },
    });
})( GAME, THREE, _ );
