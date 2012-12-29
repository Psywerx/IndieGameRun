(function(G, THREE, _) {
    var Drawables = G.Drawables = {};
    var Sprite = G.Sprite;

    _.extend(Drawables, {
        fire : function () {
            return new Sprite.Animation(Sprite.GeometryType.PLANE, "fire");
        }
    });
})( GAME, THREE, _ );
