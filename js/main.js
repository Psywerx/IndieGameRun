(function(G, THREE, _) {
    var Sprites = G.Sprites;

    var WIDTH = window.innerWidth - 100, HEIGHT = window.innerHeight - 100;

    var camera, scene, renderer;
    var geometry, material, mesh;

    var score = 0;
    var scoreSprite;
    
    
    init();
    collidables = [];

    function padZeros(number, length) {
        
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    function animation(path,num,x,y,scalex,scaley) {
        var that = this;
        this.running = false;
        this.frame = 0;
        this.frames = num;
        this.speed = 100;
        this.frameTime = 0;
        this.loaded = false;
        this.sprites = Sprites.loadSprites(path, that.frames, function() {
            //scale, position, and rotation get set to same object for all sprites
            that.scale = that.sprites[0].scale
            that.position = that.sprites[0].position
            that.rotation = that.sprites[0].rotation
            that.sprites.forEach(function(sprite) {
                sprite.scale = that.scale
                sprite.position = that.position
                sprite.rotation = that.rotation
            })
            that.scale.x = scalex || 1;
            that.scale.y = scaley || scalex || 1;
            that.width = that.sprites[0].width * that.scale.x;
            that.height = that.sprites[0].height * that.scale.y;
            that.position.x = x;
            that.position.y = y + that.height / 2;

            that.loaded = true;
        });

        this.update = function() {
            if (that.running && that.loaded) {
                var now = +new Date()

                var lastFrame = that.frame
                if (now > that.frameTime + that.speed) {
                    that.frame += 1
                    that.frame %= that.frames
                }

                if (lastFrame != that.frame) {
                    scene.remove(that.sprites[lastFrame])
                    scene.add(that.sprites[that.frame])
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

    function fire(x, y, size) {
        return new animation("img/fire", 16, x, y, size);
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
        world.width = texture.image.width;
        world.height = texture.image.height;
        scene.add(world);

    }
    function initPlayer() {
        player = {};
        player.jumpCount = 0;
        player.speed = {
            x : 0,
            y : 0
        };
        player.loaded = false;
        Sprites.loadSprite("img/player", function(sprite){
            player.sprite = sprite;
            player.sprite.position.x = -1400;
            player.sprite.position.y = -200 - player.sprite.height/2;

            scene.add(player.sprite);
            player.loaded = true;
        });
    }

    function createTextTexture(text){
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = '40px Calibri';
        context.fillText(text, 10, 40);
        
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
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

        fires = [];
        for ( var i = 0; i < 5; i++) {
            var f = fire(-1000 + 500 * i + Math.random() * 300, -200, Math.random() * 0.5 + 0.5)
            f.start();
            fires.push(f);
        }
        scoreSprite = new G.text(padZeros(score));
        
		var test = Sprites.loadSprite("", function(sprite){
            scoreSprite = sprite;
            console.log(scoreSprite, "AAA");
            scene.add(scoreSprite);
        }, createTextTexture("Text"));

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
            if (player.jumpCount < 20 && !player.jumpLock) {
                player.speed.y = 20;
                player.jumpCount += 1;
            } else {
                player.jumpLock = true;
            }

        } else {
            player.jumpLock = true;
        }
        player.speed.y -= 0.1 * dt;
        if (player.loaded) {
            // TODO: Check for collisions:
            for ( var i in collidables) {
                var vertices = collidables[i].geometry.vertices;
            }

            player.sprite.position.x += player.speed.x * dt * 0.1;
            player.sprite.position.y += player.speed.y;
            if (player.sprite.position.y < world.position.y + world.height + player.sprite.height / 2 - 10) {
                player.sprite.position.y = world.position.y + world.height + player.sprite.height / 2 - 10;
                player.speed.y = 0;
                player.jumpCount = 0;
                player.jumpLock = false;

            }
        }

        fires.forEach(function(fire) {
            fire.update();
        })
		
		score += 1;
        
        scoreSprite.material = new THREE.MeshBasicMaterial({map: createTextTexture(padZeros(score, 6))});
        scoreSprite.position.set(0, 500, 0);
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        update();

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
})( GAME || {}, THREE, _);
