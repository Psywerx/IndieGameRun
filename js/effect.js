(function(G, THREE, _) {
    var Effect = G.Effect = {};
    var Drawables = G.Drawables;

    _.extend(Effect, {
        BurnDown : function(object, scene, onBurntCallback) { //Look's like I need the global scene... not cool I guess.
            if (!object.burning) {
                var that = this;
                this.speed = 200;
                this.object = object;
                this.object.burning = true;
                this.animTime = 0;
                this.done = false;

                this.fires = _.range(15).map(function() { 
                    var f = Drawables.fire()
                    var scale = Math.random() * 0.3 + 0.2;
                    f.sprite.scale.set(scale, scale, 1);
                    f.sprite.position.set(
                        object.sprite.position.x + Math.random() * object.sprite.getWidth()/3 - Math.random() * object.sprite.getWidth()/3,
                        object.sprite.position.y + Math.random() * object.sprite.getHeight()/3 - Math.random() * object.sprite.getHeight()/3,
                        object.sprite.position.z + 10
                    );
                    f.start();
                    scene.add(f.sprite);
                    
                    return f;
                });

                this.update = function() {
                    that.
                    fires.forEach(function(fire) { 
                        fire.update();
                    });
                    if (!that.done) {
                        var now = +new Date();
                        
                        
                        if (now >= that.animTime + that.speed) {
                            var exWidth = object.sprite.getWidth(),
                                exHeight = object.sprite.getHeight();
                                
                            object.sprite.scale.y *= 0.75 + (Math.random()-0.5)*0.1;
                            object.sprite.scale.x *= 0.9 + (Math.random()-0.5)*0.1;

                            var dx = (exWidth-object.sprite.getHeight())/2,
                                dy = (exHeight-object.sprite.getHeight())/2;
                            
                            that.fires.forEach(function(fire) { 
                                fire.sprite.rotation.z += (Math.random()-0.5);
                                fire.sprite.position.y -= (Math.random()+0.5) * dy;
                            });
                            object.sprite.position.y -= dy
                            object.sprite.rotation.z += (Math.random()-0.5)*0.1;
                            
                            if (object.sprite.scale.y < 0.1) {
                                that.fires.forEach(function(fire) { 
                                    fire.fade(function onFade(){
                                        scene.remove(fire.sprite);
                                    });
                                });
                                scene.remove(object.sprite);

                                that.done = true;

                                var remains = {};
                                remains.fires = that.fires;

                                onBurntCallback && onBurntCallback(remains);
                            }
                            
                            that.animTime = now;
                        }
                    }
                };
            }
        },
    });
})( GAME, THREE, _ );
