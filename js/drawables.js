(function(G, THREE, _) {
    var Drawables = G.Drawables = {};
    var Sprite = G.Sprite;

    _.extend(Drawables, {
        background : function () {
            return new Sprite.getSprite("bg", "PLANE");
        },
        makeFire : function (x,y, depth, w, h) {
            var fire = new Sprite.Animation("fire", "PLANE", w, h);
            fire.sprite.position.set(x, y, depth);
            fire.sprite.animationType = Sprite.AnimationType.JERKY;
            return fire
        },
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
            
            return sprite;
        },
        makeCloud : function(x, y, w, h, depth, speed, texture, scene) {
            var geometry = new THREE.PlaneGeometry(w, h);

            var image = new Image();
            image.onload = function() {
                texture.needsUpdate = true;
            };
            image.src = "img/"+texture+".png";

            var texture = new THREE.Texture(image);

            var material = new THREE.MeshLambertMaterial({
                //map : texture
                color : 0x00ff00
            });

            var sprite = new THREE.Mesh(geometry, material);
            sprite.position.set(x, y, depth);
            sprite.scale.set(5, 5, 1);

            var x = new THREE.PlaneGeometry(w, h);
            x.position = sprite.position;
            var aa = (x).vertices;
            sprite.collisionFrame = [aa[0],aa[1],aa[3],aa[2]];
            
            return sprite;
        },
        /*        makeCloud : function(x, y, w, h, depth, speed, texture, scene) {
            var sprite = new Sprite.getSprite(texture, "PLANE")

            sprite.position.set(x, y, depth);
            sprite.speed = speed;
            sprite.update = function(dt) {
                sprite.x += sprite.speed.x * dt;
                sprite.y += sprite.speed.y * dt;
            }

            var x = new THREE.PlaneGeometry(w, h);
            x.position = sprite.position;
            var aa = (x).vertices;
            sprite.collisionFrame = [aa[0],aa[1],aa[3],aa[2]];
            
            return sprite;
        }*/
    });
})( GAME, THREE, _ );
