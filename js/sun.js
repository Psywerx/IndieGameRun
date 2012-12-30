(function(GAME, THREE, _) {
    var Sun = GAME.Sun = {};
    var Sprite = GAME.Sprite;
    
    var x= 0, 
        y= -500, 
        r= 700 , 
        alpha= 0, 
        omega= 0.01, 
        size= 500,
        posx = 0,
        posy = 0,
        sprite= null;
      
   
    
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
        update : function (dt,camera) {
           alpha += omega*dt;
           calcPos();
           sprite.position.set(posx+camera.position.x, posy+camera.position.y, 0);
        },
        init : function(sunObject,scene){
            x = sunObject.x;
            y = sunObject.y;
            r = sunObject.r;
            alpha = sunObject.alpha;
            omega = sunObject.omega;
            size = sunObject.size;
            calcPos();
            
            sprite = Sprite.getSprite("sun", "PLANE", size, size);
            sprite.position.set(posx, posy, 0);
            console.log("sun",sprite);
            scene.add(sprite);
        }
    });
})( GAME, THREE, _ );
