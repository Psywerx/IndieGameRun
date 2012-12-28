(function(G, THREE, _) {
    var Sprite = G.Sprites = {};

    _.extend(G, {
        loadSprites: function(path, callback, img) {
            if (!img) {
                var image = THREE.ImageUtils.loadTexture( path + '.png', {},
                    function success() { Sprite.loadSprite(path, callback, image); },
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

            sprite.width = width;
            sprite.height = height;
            callback && callback(sprite);
        },
        loadSprite: function(path, n, callback) {
            var sprites = [];
            for (var i=0; i < n; i++) {
                Sprite.loadSprite(path + (i+1), function(sprite) {
                    sprites.push(sprite);
                    if ( sprites.length === n) { // all loaded
                        callback();
                    }
                });
            }
            return sprites;
        }
    });
})( window.GAME || {}, THREE, _ );

