(function(GAME, THREE, _) {
    var Sun = G.Sun = {};
    var Sprite = G.Sprite;
    
    var x= 0, 
        y= -500, 
        r= 700 , 
        alpha= 0, 
        omega= 0.01, 
        size= 50,
        sprite= none;
        
    function getX(){
        return 100;
    }
    
    function getY(){
        return 100;
    }
    
    _.extend(Sun, {
        update : function (dt) {
           
        },
        init : function(sunObject){
            x = sunObject.x;
            y = sunObject.y;
            r = sunObject.r;
            alpha = sunObject.alpha;
            omega = sunObject.omega;
            size = sunObject.size;
            
            sprite = Sprite.getSprite("sun", "PLANE", size, size);
            sprite.position.set(tree.x, tree.y, tree.depth || 0);
            
        }
    });
})( GAME, THREE, _ );
