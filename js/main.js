(function() {
    var WIDTH = window.innerWidth - 100, HEIGHT = window.innerHeight - 100;

    var camera, scene, renderer;
    var geometry, material, mesh;

    var collidables = [];
    
    init();

    function loadSprite(path) {
        var img = THREE.ImageUtils.loadTexture(path + ".png");
        var material = new THREE.SpriteMaterial({
            map : img,
            useScreenCoordinates : false,
            color : 0xffffff,
            alphaTest: 0.5
        });

        var sprite = new THREE.Sprite(material);

        sprite.scale.set(img.image.width, img.image.height, 1);
        sprite.width = img.image.width;
        sprite.height = img.image.height;
        return sprite;
    }

    function loadSprites(path, n) {
        var sprites = [];
        for ( var i = 0; i < n; i++) {
            sprite = loadSprite(path + (i + 1));

            sprites.push(sprite);
        }

        return sprites;
    }

    function animation(path, num, x, y, size) {
        that = this;
        this.x = x;
        this.y = y;
        this.size = size;
        this.frame = 0;
        this.frames = num;
        this.speed = 200;
        this.frameTime = 0;
        this.sprites = loadSprites(path, that.frames);
        this.update = function() {
            var now = +new Date();
            
            var lastFrame = that.frame;
            if (now > that.frameTime + that.speed) {
                that.frame += 1;
                that.frame %= that.frames;
            }

            if (lastFrame != that.frame) {
                scene.remove(that.sprites[lastFrame]);
                scene.add(that.sprites[that.frame]);
                that.frameTime = now;
            }
        };
        this.start = function() {
            that.sprites.forEach(function(sprite) {
                sprite.position.x = that.x;
                sprite.position.y = that.y;
                sprite.scale.x = sprite.width * that.size;
                sprite.scale.y = sprite.height * that.size;
            });
        };
        this.stop = function() {
            that.sprites.forEach(function(sprite) {
                scene.remove(sprite);
            });
        };
    }

    function fire(x, y, size) {
        return new animation("img/fire", 16, x, y, size);
    }

    var prevTime = +new Date();

    var keyboard = new THREEx.KeyboardState();

    function initWorld() {
        var geometry = new THREE.PlaneGeometry(10000, 100);
        var texture = THREE.ImageUtils.loadTexture('img/test.png', {}, function() {
            //animate();
        });
        var material = new THREE.MeshBasicMaterial({
            color : 0x000000
        });
        world = new THREE.Mesh(geometry, material);
        world.position.set(0, -200, 0);
        world.floor = true;
        console.log(world);
        scene.add(world);
        collidables.push(world);

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
        camera.position.z = 5000;

        scene = new THREE.Scene();

        initWorld();
        initPlayer();

        var spotLight = new THREE.SpotLight(0x00ffff);
        spotLight.position.set(0, 100, 0);
        spotLight.castShadow = false;
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowCameraNear = 500;
        spotLight.shadowCameraFar = 4000;
        spotLight.shadowCameraFov = 30;
        scene.add(spotLight);

        //var SpotLightHelper = new THREE.SpotLightHelper();

        var light = new THREE.AmbientLight(0xffffff);
        scene.add(light);
        console.log(scene);
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
            if (player.jumpCount < 10 && !player.jumpLock) {
                player.speed.y = 20;
                player.jumpCount += 1;
            } else {
                player.jumpLock = true;
            }

        } else {
            player.jumpLock = true;
        }
        player.speed.y -= 0.1 * dt;
        player.position.x += player.speed.x * dt * 0.1;
        player.position.y += player.speed.y;
        
        // TODO: Check for collisions:
        for ( var i in collidables) {
            var vertices = collidables[i].geometry.vertices;
        }
        
        if (player.position.y < -200) { // Collided with floor example
            player.position.y = -200;
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
