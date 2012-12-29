(function(G, THREE, THREEx, _) {

    var Sprite = G.Sprite,
        Collision = G.Collision;
    var keyboard = new THREEx.KeyboardState();

    _.extend(G, {
        Player : function(scene) {
            var player = {
                jumpCount : 0,
                isCrouched : false,
                speed : {
                    x : 0,
                    y : 0
                },
                animation : new Sprite.Animation("CUBE","img/playerStill", 3, function() {
                    player.animation.sprite.position.x = -1400;
                    player.animation.sprite.position.y = -200 + player.animation.sprite.getHeight();
                    var modifier = new THREE.SubdivisionModifier(2);
                    modifier.modify(player.animation.sprite.geometry);
                    player.animation.speed = 1000;
                    player.animation.animationType = Sprite.AnimationType.JERKY;
                    player.animation.start();
                    scene.add(player.animation.sprite);
                }),                
                update : function(dt, collidables, world, camera){ // All these extra parameters :/
                    
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
                        player.isCrouched = false;
                    }
                    
                    player.speed.y -= 0.1 * dt;
                    if (player.animation && player.animation.loaded) {
                        if(player.isCrouched) {
                            player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.8 + 0.01*0.2;
                            player.animation.sprite.scale.x = player.animation.sprite.scale.x*0.9 + 2*0.1;
                        } else {
                            player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.8 + 1.0*0.2;
                            player.animation.sprite.scale.x = player.animation.sprite.scale.x*0.8 + 1.0*0.2;
                        }
                        if(player.isMoving){
                            player.animation.sprite.scale.y = player.animation.sprite.scale.y + 0.01 * Math.sin(+new Date()/100);
                            player.animation.sprite.scale.x = player.animation.sprite.scale.x + 0.01 * Math.sin(+new Date()/100);
                        }
                        if(!player.jumpLock){
                            player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.9 + 2*0.1;
                            player.animation.sprite.scale.x = player.animation.sprite.scale.x*0.9 + 0.5*0.1;
                        }
                        else{
                            player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.8 + 1.0*0.2;
                            player.animation.sprite.scale.x = player.animation.sprite.scale.x*0.8 + 1.0*0.2;
                        }
                        player.animation.sprite.position.x += player.speed.x * dt * 0.1;
                        player.animation.sprite.position.y += player.speed.y;

                        if(player.animation.sprite.position.x > 0){ // TODO: player.sprite.position.x < levelEnd - 1800
                            camera.position.x += player.speed.x * dt * 0.1;
                        }

                        var col = Collision.colliding(player, collidables);
                        
                        if (player.animation.sprite.position.y < world.sprite.position.y + world.sprite.getHeight()/2 + player.animation.sprite.getHeight() / 2) {
                            player.animation.sprite.position.y = world.sprite.position.y + world.sprite.getHeight()/2 + player.animation.sprite.getHeight() / 2;
                            player.speed.y = 0;
                            player.jumpCount = 0;
                            player.jumpLock = false;

                        }

                        player.animation.update();
                    }
                }
            };

            return player;
        }
    });

})(GAME, THREE, THREEx, _);
