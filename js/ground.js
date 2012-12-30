(function(G, THREE, _) {
    
    var Ground = G.Ground = {};
    
    _.extend(Ground, {
        makeGround : function(x, y, w, h, depth, texture, scene) {
            var imgSize = 100.0;
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
            sprite.position.set(x, y, depth);

            var x = new THREE.PlaneGeometry(w, h);
            x.position = sprite.position;
            var aa = (x).vertices;
            sprite.collisionFrame = [aa[0],aa[1],aa[3],aa[2]];
            
            console.log(sprite);
            scene.add(x);

            return sprite;
        }
    });
})(GAME, THREE, _);
