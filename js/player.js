(function(G, THREE, _) {

    var Sprite = G.Sprite;

    _.extend(G, {
        Player : function() {
            var p = {};
            p.jumpCount = 0;
            p.isCrouched = false;
            p.speed = {
                x : 0,
                y : 0
            };
            p.animation = new Sprite.Animation("img/playerStill", 2, function() {
                p.animation.sprite.position.x = -1400;
                p.animation.sprite.position.y = -200 + p.animation.sprite.getHeight();
                p.animation.speed = 1000;
                p.animation.start();
            });

            return p;
        }
    });

})(GAME, THREE, _);