(function(G, THREE, _) {
    var Sprite = G.Sprite = {};

    _.extend(Sprite, {
        loadSprites: function(path, count, callback, doneCallback) {
            var sprites = [],
                i = 0;

            for (;i < count; i++) {
                (function( num ) {
                    var spritePath = path + (num+1);
                    Sprite.loadSprite(spritePath, function(sprite) {
                        callback && callback(sprite);
                        sprites[num] = sprite;

                        count === _.compact(sprites).length && doneCallback();
                    });
                })(i);
            }

            return sprites;
        },
        loadSprite: function(path, callback, img) {
            if (!img) {
                return THREE.ImageUtils.loadTexture( path + '.png', {},
                    function success( image ) { Sprite.loadSprite(path, callback, image); },
                    function error() { Sprite.loadSprite(path, callback); }
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
})( GAME || {}, THREE, _ );
