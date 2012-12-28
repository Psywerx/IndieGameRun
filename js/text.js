(function(G, THREE, _) {
    _.extend(G, {
        text : function(text) {

            function createTextTexture(text) {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                context.font = '40px Calibri';
                context.fillText(text, 10, 40);

                var texture = new THREE.Texture(canvas);
                texture.needsUpdate = true;
                return texture;
            }

            var res = {
                sprite : null,
                update : function(text) {
                    this.sprite.material = new THREE.MeshBasicMaterial({
                        map : createTextTexture(text)
                    });
                }
            };

            var sprite = G.Sprites.loadSprite("", function(s) {
                res.sprite = s;
            }, createTextTexture(text));

            return res;
        }
    });
})(GAME || {}, THREE, _);