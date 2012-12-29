(function(G, THREE, _) {
    var Sprite = G.Sprite = {};

    _.extend(Sprite, {
        loadSprites: function(path, count, callback, doneCallback) {
            var sprites = [];
            for(var i = 0; i < count; i++) {
                (function(j) {
                    Sprite.loadSprite(path + (j+1), function(sprite) {
                        callback && callback(sprite);
                        sprites[j] = sprite;
                        if (count === _.compact(sprites).length) { // all loaded
                            doneCallback();
                        }
                    });
                })(i);
            }

            return sprites;
        },
        loadSprite: function(path, callback, img) {
            if (!img) {
                return THREE.ImageUtils.loadTexture( path + '.png', {},
                    function success( image ) { Sprite.loadSprite(path, callback, image); },
                    function error() { Sprite.loadSprite(path, callback); } // retry
                );
            }

            var width = img.image.width,
                height = img.image.height,
                geometry = new THREE.PlaneGeometry(width, height),
                material = new THREE.MeshPhongMaterial({
                    map : img,
                    transparent : true
                }),
                sprite = new THREE.Mesh(geometry, material);

            sprite.material = material;
            sprite.width = width;
            sprite.height = height;
            callback && callback(sprite);
        }
    });
    console.log(G);
})( GAME || {}, THREE, _ );
