(function(G, THREE, THREEx, _) {

    var Sprite = G.Sprite,
        Collision = G.Collision,
        Sounds = G.Sounds;
    var keyboard = new THREEx.KeyboardState();

    var animation = function(scene) {
        var anim = new Sprite.Animation("player", "CUBE");
        anim.sprite.position.x = -1400;
        anim.sprite.position.y = 100 + anim.sprite.getHeight();
        var modifier = new THREE.SubdivisionModifier(2);
        modifier.modify(anim.sprite.geometry);
        anim.speed = 1000;
        anim.animationType = Sprite.AnimationType.JERKY;
        anim.start();
        scene.add(anim.sprite);
        
        return anim;
    };


    _.extend(G, {
        Player : function(scene) {
            var player = {
                jumpCount : 0,
                isCrouched : false,
                speed : {
                    x : 0,
                    y : 0
                },
                animation : animation(scene),
                update : function(dt, collidables, world, camera) { // All these extra parameters :/
                    player.speed.x = 0;
                    player.isMoving = false;
                    if (keyboard.pressed('A') || keyboard.pressed('left')) {
                        player.speed.x -= 10;
                        player.isMoving = true;
                       
                    }
                    
                    if (keyboard.pressed('D') || keyboard.pressed('right')) {
                        player.speed.x += 10;
                        player.isMoving = true;
                    }
                    if (keyboard.pressed('W') || keyboard.pressed('up') || keyboard.pressed('space')) {
                        if(GAME.Sounds.jump.isPaused())
                            GAME.Sounds.jump.load().play();
                        
                        if (player.jumpCount < 10 && !player.jumpLock) {
                            player.speed.y = 30;
                            player.jumpCount += 1;
                        } else {
                            player.jumpLock = true;
                        }
                    } else {
                        player.jumpLock = true;
                    }
                    
                    if (keyboard.pressed('S') || keyboard.pressed('down')) {
                        player.isCrouched = true;
                    } else {
                        if(player.isCrouched && player.speed.y == 0) player.speed.y = 17;
                        player.isCrouched = false;
                    }
                    
                    player.speed.y -= 0.1 * dt;
                    if(player.isCrouched) {
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.8 + 0.01*0.2;
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x*0.9 + 2*0.1;
                    } else {
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.8 + 1.0*0.2;
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x*0.8 + 1.0*0.2;
                    }
                    if(player.isMoving){
                        if(GAME.Sounds.moving.isPaused()){
                            GAME.Sounds.moving.load().play();
                        }
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y + 0.01 * Math.sin(+new Date()/100);
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x + 0.01 * Math.sin(+new Date()/100);
                    }
                    else{
                        GAME.Sounds.moving.pause();
                    }
                    if(!player.jumpLock){
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.9 + 2*0.1;
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x*0.9 + 0.5*0.1;
                    }
                    else{
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.8 + 1.0*0.2;
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x*0.8 + 1.0*0.2;
                    }
                    var col = Collision.colliding(player, collidables);
                    if (Object.keys(col).length > 0) {
                        _.each(col, function(collide){
                            var h = player.animation.sprite.getHeight();
                            var w = player.animation.sprite.getWidth();
                            if(player.speed.y * collide.vector.y < 0){
                                player.speed.y = 0.0;
                                player.animation.sprite.position.y += (h/2.0) - collide.vector.y;
                            } 
                            if(player.speed.x * collide.vector.x < 0){
                                console.log(collide);
                                player.speed.x = 0.0;
                                player.animation.sprite.position.x += (w/2.0) - collide.vector.x;
                            } 

                            if(collide.vector.y > 0){
                                player.jumpCount = 0;
                                player.jumpLock = false;
                            }
                        });
                    }
                    player.animation.sprite.position.x += player.speed.x * dt * 0.1;
                    player.animation.sprite.position.y += player.speed.y;

                    if(player.animation.sprite.position.x > 0){ // TODO: player.sprite.position.x < levelEnd - 1800
                        camera.position.x += player.speed.x * dt * 0.1;
                    }


                    player.animation.update();
                }
            };

            return player;
        }
    });

})(GAME, THREE, THREEx, _);
