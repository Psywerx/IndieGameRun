(function(G, THREE, THREEx, _) {
    var Sprite = G.Sprite,
        Effect = G.Effect,
        Drawables = G.Drawables,
        Ground = G.Ground;

    var WIDTH = 800,
        HEIGHT = 600;

    var camera, scene, renderer;
    var geometry, material, mesh;

    var player = {},
        world = {},
        collidables = [],
        fires = [],
        effects = [];

    //Burndown demo :)
    function timeout() {
        var burn = new Effect.BurnDown(tree, scene, function(){
            effects = effects.filter(function(elt) { elt != burn; }); // :)
        });
        effects.push(burn);
    }
    setTimeout(timeout, 2000);


    var score = 0;
    var scoreSprite;
    
    // utils.js?
    function padZeros(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    var prevTime = +new Date();

    var keyboard = new THREEx.KeyboardState();

    function initWorld() {
        world = {};
        Sprite.loadSprite(
            "img/test",
            function(sprite) {
                world.sprite = sprite;
                sprite.scale.x = 10000;
                sprite.material.color = 0x000000;
                sprite.position.set(0, -200, 0);
                scene.add(world.sprite);
                animate();
            }
        );
        tree = {};
        Sprite.loadSprite(
            "img/tree",
            function(sprite) {
                tree.sprite = sprite;
                sprite.scale.set(3, 3, 1);
                sprite.position.set(0, -200 + sprite.getHeight()/2, 0);
                scene.add(tree.sprite);
            }
        );
    }
    function initPlayer() {
        player.jumpCount = 0;
        player.isCrouched = false;
        player.speed = {
            x : 0,
            y : 0
        };
        player.animation = new Sprite.Animation("img/playerStill", 2, function() {
            player.animation.sprite.position.x = -1400;
            player.animation.sprite.position.y = -200 + player.animation.sprite.getHeight();
            player.animation.speed = 1000;
            player.animation.start();
            scene.add(player.animation.sprite);
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
     

        _.range(5).forEach(function(i){
            var f = Drawables.fire(function() {
                var scale = Math.random() * 0.5 + 0.5;
                f.sprite.scale.set(scale, scale, 1);
                f.sprite.position.set(-1000 + 500 * i + Math.random() * 300, -200 + f.sprite.getHeight()/2, 0);
                if(i==0) f.type = Sprite.AnimationType.ONCE;
                if(i==1) f.type = Sprite.AnimationType.BOUNCE;
                scene.add(f.sprite);
            });
            f.start();
            fires.push(f);
        });
        
        scoreSprite = new G.text(padZeros(score, 6));
        scene.add(scoreSprite.sprite);
        var canvas = renderer.domElement;
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.style.display = "block";
        document.getElementById("content").appendChild(canvas);
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
        
        if (keyboard.pressed('S') || keyboard.pressed('down')) {
            player.isCrouched = true;
        } else {
            player.isCrouched = false;
        }
        
        player.speed.y -= 0.1 * dt;
        if (player.animation && player.animation.loaded) {
            // TODO: Check for collisions:
            for ( var i in collidables ) {
                var vertices = collidables[i].geometry.vertices;
            }

            if(player.isCrouched) {
                player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.9 + 0.5*0.1;
            } else {
                player.animation.sprite.scale.y = player.animation.sprite.scale.y*0.8 + 1.0*0.2;
            }

            player.animation.sprite.position.x += player.speed.x * dt * 0.1;
            player.animation.sprite.position.y += player.speed.y;
            if (player.animation.sprite.position.y < world.sprite.position.y + world.sprite.getHeight()/2 + player.animation.sprite.getHeight() / 2) {
                player.animation.sprite.position.y = world.sprite.position.y + world.sprite.getHeight()/2 + player.animation.sprite.getHeight() / 2;
                player.speed.y = 0;
                player.jumpCount = 0;
                player.jumpLock = false;

            }

            player.animation.update();
        }

        fires.forEach(function(fire) {
            fire.update();
        });
        effects.forEach(function(effect) {
            effect.update();
        });

		score += 1;
//        scoreSprite.update(padZeros(score, 6));
    }

    function animate() {
        // note: three.js includes requestAnimationFrame shim
        update();

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    init();
})( GAME || {}, THREE, THREEx, _);
