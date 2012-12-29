(function(G, THREE, _) {
    var Drawables = G.Drawables = {};
    var Sprite = G.Sprite;

    _.extend(Drawables, {
        fire : function (callback) {
            // Q: Is there a way to actually extend class? (--> new fire(...) instead of just fire(...)) 
            return new Sprite.Animation("img/fire", 16, callback);
        },

    });
})( GAME || {}, THREE, _ );
