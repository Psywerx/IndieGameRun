(function(G, THREE, _) {
    var Drawables = G.Drawables = {};
    var Sprite = G.Sprite;

    _.extend(Drawables, {
        fire : function () {
            return new Sprite.Animation("fire", "PLANE");
        },
        background : function () {
            return new Sprite.getSprite("bg", "PLANE");
        }
    });
})( GAME, THREE, _ );
