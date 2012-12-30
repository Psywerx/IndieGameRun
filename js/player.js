(function(G, THREE, THREEx, _) {

    var Sprite = G.Sprite, Collision = G.Collision, Sounds = G.Sounds;
    var keyboard = null;//new THREEx.KeyboardState();

    var animation = function(scene) {
        var anim = new Sprite.Animation("icecube1", "CUBE");
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
                sizeFactor : 1,
                speed : {
                    x : 0,
                    y : 0
                },
                animation : animation(scene),
                update : function(dt, collidables, world, camera) { // All these
                                                                    // extra
                                                                    // parameters
                                                                    // :/
                                                                    
                    if(!keyboard) {
                        keyboard = new THREEx.KeyboardState();
                    }
                    
                    player.speed.x = 0;
                    player.isMoving = false;
                    if (keyboard.pressed('B'))  {
                        GAME.nextLevel = GAME.currLevel;
                        GAME.loadinglevel = true;
                        keyboard.destroy();
                        keyboard = undefined;
                        return;
                    }
                    if (keyboard.pressed('N'))  {
                        GAME.nextLevel = GAME.currLevel+1;
                        GAME.loadinglevel = true;
                        keyboard.destroy();
                        keyboard = undefined;
                        return;
                    }

                    if (keyboard.pressed('A') || keyboard.pressed('left')) {
                        player.speed.x -= 10;
                        player.isMoving = true;

                    }

                    if (keyboard.pressed('D') || keyboard.pressed('right')) {
                        player.speed.x += 10;
                        player.isMoving = true;
                    }
                    if(keyboard.pressed('P')){
                        console.log(player.animation.sprite.position.x,
                                player.animation.sprite.position.y,
                                player.animation.sprite.position.z);
                    }
                    if (keyboard.pressed('W') || keyboard.pressed('up') || keyboard.pressed('space')) {
                        try {
                            GAME.Sounds.duck.load().play();
                        } catch(err) {}

                        if (player.jumpCount < 10 && !player.jumpLock) {
                            player.speed.y = 30;
                            player.jumpCount += 1;
                        } else {
                            player.jumpLock = true;
                        }
                    } else {
                        player.jumpLock = true;
                    }
                    if (keyboard.pressed('J') && keyboard.pressed('K')) {
                        halt;
                    }
                    if (keyboard.pressed('S') || keyboard.pressed('down')) {
                        try {
                            if (!player.isCrouched) {
                                GAME.Sounds.jump.load().play();
                            }
                            player.isCrouched = true;
                        } catch(err) {}
                    } else {
                        if (player.isCrouched && player.speed.y == 0)
                            player.speed.y = 17;

                        try {
                            if (player.isCrouched) {
                                GAME.Sounds.jump.load().play();
                            }
                        } catch(err) {}

                        player.isCrouched = false;
                    }

                    player.speed.y -= 0.1 * dt;
                    if (player.isCrouched) {
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y * 0.8 + 0.01 * 0.2;
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x * 0.9 + 2 * 0.1;
                    } else {
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y * 0.8 + 1.0 * 0.2;
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x * 0.8 + 1.0 * 0.2;
                    }
                    if (player.isMoving) {
                        // if(player.jumpLock) GAME.Sounds.moving.stop();
                        // if(!player.jumpLock && GAME.Sounds.moving.isPaused())
                        // {
                        // if(player.isCrouched) {
                        // GAME.Sounds.moving.setVolume( 50 );
                        // } else {
                        // GAME.Sounds.moving.setVolume( 100 );
                        // }

                        try {
                            if (GAME.Sounds.moving.isPaused()) {
                                GAME.Sounds.moving.load().play();
                            }
                        } catch(err) {}
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y + 0.01
                                * Math.sin(+new Date() / 100);
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x + 0.01
                                * Math.sin(+new Date() / 100);
                    } else {
                        try {
                            GAME.Sounds.moving.stop();
                        } catch(err) {}
                    }
                    if (!player.jumpLock) {
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y * 0.9 + 2 * 0.1;
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x * 0.9 + 0.5 * 0.1;
                    } else {
                        player.animation.sprite.scale.y = player.animation.sprite.scale.y * 0.8 + 1.0 * 0.2;
                        player.animation.sprite.scale.x = player.animation.sprite.scale.x * 0.8 + 1.0 * 0.2;
                    }
                    var col = Collision.colliding(player, collidables);
                    _.each(col, function(c) {
                        _.each(Object.keys(c), function(collid) {

                            var collide = c[collid];
                            
                            
                            if(collidables[collide.index].collisionType == "Fire"){
                                player.sizeFactor = Math.max(0, player.sizeFactor - dt/(1000));
                                return;
                            }
                            
                            var h = player.animation.sprite.getHeight(), w = player.animation.sprite.getWidth();

                            if (player.speed.y * collide.vector.y < 0) {
                                player.speed.y = 0.0;
                                if (collide.vector.y > 0) {
                                    player.animation.sprite.position.y += ((h / 2) - collide.vector.y) / 2;
                                } else {
                                    player.animation.sprite.position.y -= ((h / 2) - collide.vector.y) / 10;
                                }
                            } else if (player.speed.x * collide.vector.x < 0) {
                                player.speed.x = 0.0;
                                if (collide.vector.x > 0) {
                                    player.animation.sprite.position.x += (((w / 2) + collide.vector.x) / 1000);
                                } else {
                                    player.animation.sprite.position.x -= (((w / 2) + collide.vector.x) / 100);

                                }
                            }

                            if (collide.vector.y > 0) {
                                player.jumpCount = 0;
                                player.jumpLock = false;
                            }
                        });
                    });

                    // }
                    player.animation.sprite.position.x += player.speed.x * dt * 0.1;
                    player.animation.sprite.position.y += player.speed.y;

                    // if(player.animation.sprite.position.x > 0){ // TODO:
                    // player.sprite.position.x < levelEnd - 1800
                    //console.log(player.animation.sprite.position.x);
                    if(player.animation.sprite.position.x > 800){
                        camera.position.x = player.animation.sprite.position.x;
                    }
                    else{
                        camera.position.x = 800;
                    }
                    if(player.animation.sprite.position.x > 12800){
                        camera.position.x = 12800;
                    }
                    else{
                        camera.position.x = player.animation.sprite.position.x;
                    }
                    if(player.animation.sprite.position.x > 13000){
                        GAME.nextLevel = GAME.currLevel+1;
                        console.log("NEXT LEVEL");
                    }
                    // }
                    player.sizeFactor = Math.max(0, player.sizeFactor - dt/(100000 * (GAME.currLevel==6 ? 4 : 0)));
                    if(player.sizeFactor < 0.5 || player.animation.sprite.position.y < -200){
                        GAME.nextLevel = GAME.currLevel;
                        console.log("YOU SHOULD BE DEAD");
                    }
                    player.animation.sprite.scale.x *= player.sizeFactor;
                    player.animation.sprite.scale.y *= player.sizeFactor;
                    player.animation.sprite.scale.z *= player.sizeFactor;
                    player.animation.update();
                }
            };
            return player;
        }
    });

})(GAME, THREE, THREEx, _);
