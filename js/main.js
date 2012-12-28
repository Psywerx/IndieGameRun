(function() {
    var WIDTH = window.innerWidth-100, HEIGHT = window.innerHeight-100;

    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
        
    function loadSprites(path, n) {
        var sprites = [];
        for(var i=0; i<n; i++) {
            var img = THREE.ImageUtils.loadTexture(path + (i+1) + ".png");
            var material = new THREE.SpriteMaterial({ map: img, useScreenCoordinates: false, color: 0xffffff });
            
            var sprite = new THREE.Sprite(material);
            sprite.scale.set(img.image.width, img.image.height, 1);
            sprite.width = img.image.width
            sprite.height = img.image.height
            
            sprites.push(sprite);
        }
        
        return sprites;
    }
    
    
    function animation(path,num,x,y,size) {
        that = this
        this.x = x;
        this.y = y;
        this.size = size
        this.frame = 0
        this.frames = num
        this.speed = 100
        this.frameTime = 0
        this.sprites = loadSprites(path, that.frames)
        this.update = function() {
            var now = +new Date()

            var lastFrame = that.frame
            if(now > that.frameTime + that.speed) {
                that.frame += 1
                that.frame %= that.frames
            }
            
            if(lastFrame != that.frame) {
                scene.remove(that.sprites[lastFrame])
                scene.add(that.sprites[that.frame])
                that.frameTime = now
            }
        }
        this.start = function() {
            that.sprites.forEach(function(sprite) {
                sprite.position.x = that.x
                sprite.position.y = that.y
                sprite.scale.x = sprite.width*that.size
                sprite.scale.y = sprite.height*that.size
            })
        }
        this.stop = function() {
            that.sprites.forEach(function(sprite) {
                scene.remove(sprite)
            })
        }
    }
    function fire(x,y,size) {
        return new animation("img/fire",16,x,y,size)
    }

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
        var geometry = new THREE.PlaneGeometry(100, 200);
        var texture = THREE.ImageUtils.loadTexture('img/player.png', {}, function() {
            animate();
        });
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
        scene.add(player);
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
        player.position.x += player.speed.x * dt * 0.1;
        player.position.y += player.speed.y;
        if (player.position.y < -100) {
            player.position.y = -100;
            player.speed.y = 0;
            player.jumpCount = 0;
            player.jumpLock = false;
            
        }
        
    }

   function animate() {

        // note: three.js includes requestAnimationFrame shim
        update();
        fire1.update();

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
})();
