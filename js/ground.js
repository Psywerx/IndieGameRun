(function(G, THREE, _) {
    
    var Ground = G.Ground = {};
    
    _.extend(Ground, {
        makeGround : function(f, t, y, depth, texture) {
            var imgSize = 100.0;
            var w = t - f;
            var h = 100;
            var geometry = new THREE.CubeGeometry(w, h, depth);

            var image = new Image();
            image.onload = function() {
                texture.needsUpdate = true;
            };
            image.src = "img/"+texture+".png";

            var texture = new THREE.Texture(image, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping,
                    THREE.NearestFilter, THREE.LinearMipMapLinearFilter);

            texture.repeat.x = w / imgSize;
            texture.repeat.y = h / imgSize;

            var material = new THREE.MeshLambertMaterial({
                map : texture
            });

            var sprite = new THREE.Mesh(geometry, material);
            sprite.position.set(f + w * 0.5, y, depth);
            sprite.scale.set(w/imgSize, h/imgSize, 1);

            var aa = (new THREE.PlaneGeometry(w, h)).vertices;
            sprite.collisionFrame = [aa[0],aa[1],aa[3],aa[2]];

            return sprite;
        }
    });
})(GAME, THREE, _);
