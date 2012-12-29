(function(G, THREE, _) {
    var Sprite = G.Sprite;

    var WIDTH = window.innerWidth - 100, HEIGHT = window.innerHeight - 100;

    var camera, scene, renderer;
    var geometry, material, mesh;

    var score = 0;
    var scoreSprite;
    
    init();
    collidables = [];

	function drawGround(f, t, lit) {
        var imgSize = 100.0;
        var w = t-f;
        var h = 100;
        var geometry = new THREE.PlaneGeometry(w, h);

        var image = new Image();
        image.onload = function () { texture.needsUpdate = true; };
        image.src = lit ? "img/floor_light.png" : "img/floor_dark.png";

        var texture  = new THREE.Texture( image, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping, THREE.NearestFilter, THREE.LinearMipMapLinearFilter );

        texture.repeat.x = w / imgSize;
        texture.repeat.y = h / imgSize;
        
        var material =  new THREE.MeshLambertMaterial( { map: texture } );
        
        
        var ground = new THREE.Mesh(geometry, material);
        ground.position.set(f+w*0.5, 0 ,0);
        
        return ground;
        
    }

    function padZeros(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    function animation(path, count, x, y, scaleX, scaleY) {
        var that = this;
        this.started = false;
        this.frame = 0;
        this.frameCount = count;
        this.speed = 100;
        this.frameTime = 0;
        this.loaded = false;
        
        this.sprites = Sprite.loadSprites(path, that.frameCount, null, function() {
            //scale, position, and rotation get set to same object for all sprites
            that.scale = that.sprites[0].scale
            that.position = that.sprites[0].position
            that.rotation = that.sprites[0].rotation
            that.sprites.forEach(function(sprite) {
                sprite.scale = that.scale
                sprite.position = that.position
                sprite.rotation = that.rotation
            })
            that.scale.x = scaleX || 1;
            that.scale.y = scaleY || scaleX || 1;
            that.width = that.sprites[0].width * that.scale.x;
            that.height = that.sprites[0].height * that.scale.y;
            that.position.x = x;
            that.position.y = y + that.height / 2;

            that.loaded = true;
        });

        this.update = function() {
            if (that.started && that.loaded) {
                var now = +new Date();

                var lastFrame = that.frame;
                if (now >= that.frameTime + that.speed) {
                    that.frame += 1;
                    that.frame %= that.frameCount;
                    var currFrame = that.frame;
                    
                    scene.remove(that.sprites[lastFrame]);
                    scene.add(that.sprites[currFrame]);
                    
                    that.frameTime = now;
                }
            }
        };
        this.start = function() {
            that.started = true;
        };
        this.stop = function() {
            that.started = false;
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
        world = {}
        Sprite.loadSprite(
            "img/test", 
            function(sprite) {
                //console.log(world.sprite)
                world.sprite = sprite;
                sprite.scale.x = 10000;
                sprite.material.color = 0x000000;
                sprite.position.set(0, -200, 0);
                scene.add(world.sprite);
                animate(); 
            }
        );
    }
    function initPlayer() {
        player = {};
        player.jumpCount = 0;
        player.speed = {
            x : 0,
            y : 0
        };
        player.animation = new animation("img/playerStill", 2, -1400, -200);
        player.animation.speed = 1000;
        player.animation.start();
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
        scoreSprite = new G.text(padZeros(score, 6));
        scene.add(scoreSprite.sprite);
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
        if (player.animation && player.animation.loaded) {
            // TODO: Check for collisions:
            for ( var i in collidables) {
                var vertices = collidables[i].geometry.vertices;
            }

            player.animation.position.x += player.speed.x * dt * 0.1;
            player.animation.position.y += player.speed.y;
            if (player.animation.position.y < world.sprite.position.y + world.sprite.height/2 + player.animation.height / 2) {
                player.animation.position.y = world.sprite.position.y + world.sprite.height/2 + player.animation.height / 2;
                player.speed.y = 0;
                player.jumpCount = 0;
                player.jumpLock = false;

            }
            player.animation.update();
        }

        fires.forEach(function(fire) {
            fire.update();
        })
		
		score += 1;
        scoreSprite.update(padZeros(score, 6));
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        update();

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
})( GAME || {}, THREE, _);
