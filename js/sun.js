(function(GAME, THREE, _) {
    var Sun = G.Sun = {};
    var Sprite = G.Sprite;
    
    var x= 0, 
        y= -500, 
        r= 700 , 
        alpha= 0, 
        omega= 0.01, 
        size= 50,
        posx = 0,
        posy = 0,
        sprite= none;
      
   
    
    function getX(){
        return x+r*Math.cos(alpha);
    }
    function getY(){
        return y+r*Math.sin(alpha);
    }
    function calcPos(){
        posx = getX();
        posy = getY();
    }
        
    _.extend(Sun, {
        update : function (dt) {
           alpha = omenga*dt;
           calcPos();
           sprite.position.set(posx, posy, 0);
        },
        init : function(sunObject){
            x = sunObject.x;
            y = sunObject.y;
            r = sunObject.r;
            alpha = sunObject.alpha;
            omega = sunObject.omega;
            size = sunObject.size;
            calcPos();
            
            sprite = Sprite.getSprite("sun", "PLANE", size, size);
            sprite.position.set(posx, posy, 0);
            
        }
    });
})( GAME, THREE, _ );
