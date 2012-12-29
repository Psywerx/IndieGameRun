(function(G, THREE, THREEx, _) {
    var Sprite = G.Sprite,
        Effect = G.Effect,
        Drawables = G.Drawables,
        Ground = G.Ground,
        Player = G.Player,
        Collision = G.Collision;

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
        collidables.push(world);
    }

    function init() {
        camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
        camera.position.z = 2000;
        camera.position.y = 1000;

        scene = new THREE.Scene();

        initWorld();

        player = new Player(scene);

        var light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);


        _.range(5).forEach(function(i){
            var f = Drawables.fire(function() {
                var scale = Math.random() * 0.5 + 0.5;
                f.sprite.scale.set(scale, scale, 1);
                f.sprite.position.set(-1000 + 500 * i + Math.random() * 300, -200 + f.sprite.getHeight()/2, 0);
                f.animationType = Sprite.AnimationType.JERKY;
                if(i%2==0)  f.animationType |= Sprite.AnimationType.BOUNCE;
                f.start();
                scene.add(f.sprite);
            });
            fires.push(f);
        });

        var canvas = renderer.domElement;
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.style.display = "block";
        document.getElementById("content").appendChild(canvas);
    }

    function update() {
        var dt = (+new Date()) - prevTime;
        prevTime = +new Date();

        player.update(dt, collidables, world, camera);

        fires.forEach(function(fire) {
            fire.update();
            if (fire.sprite) {
                fire.sprite.position.z = 5;
            }
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
})( GAME, THREE, THREEx, _);
