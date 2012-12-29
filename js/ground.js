(function(G, THREE, _) {
    
    var Ground = G.Ground = {};
    
    _.extend(Ground, {
        drawGrond : function(f, t, lit) {
            var imgSize = 100.0;
            var w = t - f;
            var h = 100;
            var geometry = new THREE.PlaneGeometry(w, h);

            var image = new Image();
            image.onload = function() {
                texture.needsUpdate = true;
            };
            image.src = lit ? "img/floor_light.png" : "img/floor_dark.png";

            var texture = new THREE.Texture(image, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping,
                    THREE.NearestFilter, THREE.LinearMipMapLinearFilter);

            texture.repeat.x = w / imgSize;
            texture.repeat.y = h / imgSize;

            var material = new THREE.MeshLambertMaterial({
                map : texture
            });

            var ground = new THREE.Mesh(geometry, material);
            ground.position.set(f + w * 0.5, 0, 0);

            return ground;

        }
    });
})(GAME, THREE, _);