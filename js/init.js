(function(THREE, _) {
    window.GAME = {
        Sounds : {
            moving : new buzz.sound("sounds/move", {
                formats : [ "ogg" ],
                preload : true,
                loop : false
            }),
            jump : new buzz.sound("sounds/jump", {
                formats : [ "ogg" ],
                preload : true,
                loop : false
            })
        }
    };
})(THREE, _);
