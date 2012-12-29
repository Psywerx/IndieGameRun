(function(G, THREE, _) {
    var Drawables = G.Drawables = {};
    var Sprite = G.Sprite;

    _.extend(Drawables, {
        fire : function () {
            return new Sprite.Animation(Sprite.GeometryType.PLANE, "fire");
        }
        background : function () {
            return new Sprite.loadSprite("PLANE", "bg");
        }
    });
})( GAME, THREE, _ );
