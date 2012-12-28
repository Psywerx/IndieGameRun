(function() {
    var WIDTH = window.innerWidth-100, HEIGHT = window.innerHeight-100;

    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
        
    function loadSprite(path, callback, img) {
        if(!img) {
            var image = THREE.ImageUtils.loadTexture(path+'.png', {}, function(){ loadSprite(path, callback, image) });
        } else {
            var geometry = new THREE.PlaneGeometry(img.image.width, img.image.height);

            var material = new THREE.MeshPhongMaterial({
                map : img,
                transparent : true
            });
            sprite = new THREE.Mesh(geometry, material);

            /*var img = THREE.ImageUtils.loadTexture(path +".png");
            var geometry = new THREE.PlaneGeometry(img.image.width, img.image.height);
            var material = new THREE.MeshPhongMaterial({ 
                map : img,
                transparent : true
            });
            sprite = new THREE.Mesh(geometry, material);
            //scene.add(world);*/


            /*var img = THREE.ImageUtils.loadTexture(path + ".png");
            var material = new THREE.SpriteMaterial({ map: img, useScreenCoordinates: false, color: 0xffffff });
            var sprite = new THREE.Sprite(material);

            sprite.scale.set(img.image.width, img.image.height, 1);*/

            if(callback) callback(sprite)
        }
    }
    
    function loadSprites(path, n) {
        var sprites = [];
        for(var i=0; i<n; i++) {
            loadSprite(path + (i+1), function(sprite) {
                sprites.push(sprite);
            })
        }
        return sprites;
    }    
    
    function animation(path,num,x,y,size) {
        that = this;
        this.x = x;
        this.y = y;
        this.size = size;
        this.running = false;
        this.frame = 0;
        this.frames = num;
        this.speed = 100;
        this.frameTime = 0;
        this.sprites = loadSprites(path, that.frames);
        that.sprites.forEach(function(sprite) {
            sprite.position.x = that.x
            sprite.position.y = that.y
            sprite.scale.x = sprite.scale.x*size
            sprite.scale.y = sprite.scale.y*size
        })
        //this.width = that.sprites[0].material.map.image.width
        //this.height = that.sprites[0].material.map.image.height

        this.update = function() {
            if(that.running) {
                var now = +new Date()

                var lastFrame = that.frame
                if(now > that.frameTime + that.speed) {
                    that.frame += 1
                    that.frame %= that.frames
                }
                
                if(lastFrame != that.frame && that.sprites[lastFrame] && that.sprites[that.frame]) {
                    scene.remove(that.sprites[lastFrame])
                    scene.add(that.sprites[that.frame])
                    //that.sprites[that.frame].position.x = Math.random()*50-Math.random()*50
                    //that.sprites[that.frame].position.y = Math.random()*50-Math.random()*50
                    //that.sprites[that.frame].position.z = Math.random()*50-Math.random()*50
                    that.frameTime = now
                }
            }
        };
        this.start = function() {
            that.running = true;
        };
        this.stop = function() {
            that.running = false;
            that.sprites.forEach(function(sprite) {
                scene.remove(sprite)
            })
        };
    }
    
    function fire(x,y,size) { return new animation("img/fire",16,x,y,size); }

    var prevTime = +new Date();

    var keyboard = new THREEx.KeyboardState();

    function initWorld() {
        var geometry = new THREE.PlaneGeometry(10000, 100);
        var texture = THREE.ImageUtils.loadTexture('img/test.png', {}, function() {
            animate();
        });
        var material = new THREE.MeshBasicMaterial({
            color : 0x000000
        });
        world = new THREE.Mesh(geometry, material);
        world.position.set(0, -200, 0);
        scene.add(world);

    }
    function initPlayer() {
        /*var geometry = new THREE.PlaneGeometry(100, 200);
        var texture = THREE.ImageUtils.loadTexture('img/player.png');
        var material = new THREE.MeshPhongMaterial({
            map : texture,
            transparent : true
        });
        player = new THREE.Mesh(geometry, material);
        player.jumpCount = 0;
        player.speed = {
            x : 0,
            y : 0
        };
        scene.add(player);*/
        player = {}
        player.jumpCount = 0;
        player.speed = {
            x : 0,
            y : 0
        };
        loadSprite("img/player", function(sprite){ 
            player.sprite = sprite
            scene.add(player.sprite)
        });
    }

   function init() {
        camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
        camera.position.z = 1000;

        scene = new THREE.Scene();

        initWorld();
        initPlayer();

        var light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);

        fire1 = fire(200, 200, 2);
        fire1.start();

        document.body.appendChild(renderer.domElement);
    }

    function update() {
        var dt = (+new Date()) - prevTime;
        prevTime = +new Date();
        player.speed.x = 0;
        if (keyboard.pressed('A') || keyboard.pressed('left')) {
            player.speed.x -= 10;
        }
        if (keyboard.pressed('D') || keyboard.pressed('right')) {
            player.speed.x += 10;
        }
        if (keyboard.pressed('W') || keyboard.pressed('up') || keyboard.pressed('space')) {
            if(player.jumpCount < 20 && !player.jumpLock){
                player.speed.y = 20;
                player.jumpCount += 1;
            }
            else{
                player.jumpLock = true;
            }
            
        }
        else{
            player.jumpLock = true;
        }
        player.speed.y -= 0.1 * dt;
        if(player.sprite) {
            player.sprite.position.x += player.speed.x * dt * 0.1;
            player.sprite.position.y += player.speed.y;
            if (player.sprite.position.y < -100) {
                player.sprite.position.y = -100;
                player.speed.y = 0;
                player.jumpCount = 0;
                player.jumpLock = false;
                
            }        
        }

        fire1.update();
    }

   function animate() {

        // note: three.js includes requestAnimationFrame shim
        update();

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
})();
