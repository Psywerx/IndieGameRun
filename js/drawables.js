(function(G, THREE, _) {
    var Drawables = G.Drawables = {};
    var Sprite = G.Sprite;

    _.extend(Drawables, {
        fire : function (callback) {
            return new Sprite.Animation("PLANE", "img/fire", 16, callback);
        }
    });
})( GAME, THREE, _ );
