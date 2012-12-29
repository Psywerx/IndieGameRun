(function(G, THREE, _) {
    var Effect = G.Effect = {};
    var Drawables = G.Drawables;

    _.extend(Effect, {
        BurnDown : function(object, scene, onBurntCallback) { //Look's like I need the global scene... not cool I guess.
            if (!object.burning) {
                var that = this;
                this.speed = 100;
                this.object = object;
                this.object.burning = true;
                this.animTime = 0;
                this.done = false;

                this.fires = _.range(15).map(function() { 
                    var f = Drawables.fire(function() {
                        var scale = Math.random() * 0.3 + 0.2;
                        f.sprite.scale.set(scale, scale, 1);
                        f.sprite.position.set(
                            object.sprite.position.x + Math.random() * object.sprite.getWidth() - object.sprite.getWidth()/2,
                            object.sprite.position.y + Math.random() * object.sprite.getHeight() - object.sprite.getHeight()/2,
                            0
                        );
                        f.start();
                        scene.add(f.sprite);
                    });
                    
                    return f;
                });

                this.update = function() {
                    if (!that.done) {
                        var now = +new Date();
                        
                        that.fires.forEach(function(fire) { 
                            if(fire.sprite) fire.sprite.rotation.z += (Math.random()-0.5);
                            fire.update();
                        });
                        
                        if (now >= that.animTime + that.speed) {
                            object.sprite.scale.set(
                                object.sprite.scale.x,
                                object.sprite.scale.y*0.75,
                                1
                            );
                            
                            if (object.sprite.scale.y < 0.1) {
                                that.fires.forEach(function(fire) { 
                                    fire.stop();
                                    scene.remove(fire.sprite);
                                });
                                scene.remove(object.sprite);

                                that.done = true;

                                onBurntCallback && onBurntCallback();
                            }
                            
                            that.animTime = now;
                        }
                    }
                };
            }
        },
    });
})( GAME, THREE, _ );
