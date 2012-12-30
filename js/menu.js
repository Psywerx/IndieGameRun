(function(G, THREE, _) {
    var Sprite = G.Sprite;
    var menu1 = {}, menu2 = {};
    var slide1 = false;
    _.extend(G, {
        
        showIntro: function(scene){
           
            
            menu1 = Sprite.getSprite("intro1", "PLANE");
            console.log(menu1.sprite);
            menu1.position.set(0,1000,1000);
            menu1.scale.set(3,3,1);
            scene.add(menu1);
            
            menu2 = Sprite.getSprite("intro2", "PLANE");
            menu2.position.set(0,1000,1000);
            menu2.scale.set(3,3,1);
            scene.add(menu2);
            
            setTimeout(function(){
                slide1 = true;
            },3000);
            
        },
        slideMenu1 : function(dt){
            if(slide1){
                menu1.material.opacity -= (dt)/1000;// menu1.position.y * 0.9 + 4001 * 0.1;
                
            }
        },
        slideMenu2 : function(dt){
            menu1.material.opacity -= (dt)/100;
            menu2.material.opacity -= (dt)/100;// menu1.position.y * 0.9 + 4001 * 0.1;
        }
    });
})(GAME, THREE, _);