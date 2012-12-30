(function(G, THREE, _) {
    var Effect = G.Effect = {};
    var Drawables = G.Drawables;

    _.extend(Effect, {
        Melty : function(player, scene) {
            var that = this;
            this.color = 0x00ffff;

            var particleCount = 180;
            this.player = player;
            this.particles = new THREE.Geometry();
            this.pMaterial =
              new THREE.ParticleBasicMaterial({
                color: that.color,
                size: 20
              });
              
            function makeParticle() {
                var pX = that.player.animation.sprite.position.x,// + Math.random() * player.animation.sprite.getWidth() - player.animation.sprite.getWidth()/2,
                    pY = that.player.animation.sprite.position.y,// - player.animation.sprite.getHeight()/2,
                    pZ = that.player.animation.sprite.position.z;
                  
                var particle = new THREE.Vertex(
                    new THREE.Vector3(pX, pY, pZ)
                );

                particle.age = +new Date();
              
                return particle;
            }
              
            for(var p = 0; p < particleCount; p++) {
                that.particles.vertices.push(makeParticle());
            }

            // create the particle system
            this.particleSystem =
              new THREE.ParticleSystem(
                that.particles,
                that.pMaterial);
                
            that.particleSystem.sortParticles = true;
            
            // add it to the scene
            scene.add(that.particleSystem);
            
            this.update = function() {
                var now = +new Date();
                for(var p = 0; p < particleCount; p++) {
                    var particle = that.particles.vertices[p];
                    if(now < particle.age + 2000*Math.random()) {
                        particle.x = (particle.x*0.95 + that.player.animation.sprite.position.x*0.05);
                        particle.y = (particle.y*0.95 + that.player.animation.sprite.position.y*0.05);
                    } else {
                        particle.age = now;
                        particle.x = that.player.animation.sprite.position.x + Math.random() * player.animation.sprite.getWidth() - player.animation.sprite.getWidth()/2;
                        particle.y = that.player.animation.sprite.position.y - Math.random() * player.animation.sprite.getHeight()/2 + Math.random() * player.animation.sprite.getHeight()/3;
                    }
                    particle.y -= 1+(now-particle.age)/10;
                }
                
                that.particleSystem.geometry.__dirtyVertices = true;
            };
        },
        BurnDown : function(object, scene, onBurntCallback) { //Look's like I need the global scene... not cool I guess.
            if (!object.burning) {
                var that = this;
                this.speed = 200;
                this.object = object;
                this.object.burning = true;
                this.animTime = 0;
                this.done = false;

                this.fires = _.range(15).map(function() { 
                    var f = Drawables.fire();
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
                            object.sprite.position.y -= dy;
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
