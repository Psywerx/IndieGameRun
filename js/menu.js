(function(G, THREE, _) {
    var Sprite = G.Sprite;
    var menu1 = {}, menu2 = {};
    var levelC = {};
    var slide1 = false;
    _.extend(G, {
        
        showIntro: function(scene){
           
            
            menu1 = Sprite.getSprite("intro1", "PLANE");
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
            menu1.material.visible = false;// -= (dt)/100;
            menu2.material.visible = false;// -= (dt)/100;// menu1.position.y * 0.9 + 4001 * 0.1;
        },
        showLevel: function(scene, lvl, offsetx) {
            try { if(levelC.material) scene.remove(levelC); } catch(err) { console.log(err); }
            levelC = Sprite.getSprite("level"+lvl, "PLANE");
            levelC.position.set(0,0,500);
            levelC.scale.set(7,7,1);
            levelC.material.opacity = 1;
            scene.add(levelC);
        },
        slideLevel : function(dt, scene) {
            try {
                if(levelC.material) {
                    levelC.material.opacity -= (dt)/5000;
                    //levelC.position.set(Math.random()*10000-Math.random()*10000,Math.random()*10000-Math.random()*10000,Math.random()*1000-Math.random()*1000);
                    if(levelC.material.opacity < 0.01) {
                        scene.remove(levelC);
                        levelC = {};
                    }
                }
            } catch(err) { console.log(err); }
        }
        
    });
})(GAME, THREE, _);
