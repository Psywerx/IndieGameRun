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
        effects = [],
        clouds = [],
        grounds = [],
        background = {};

    //Burndown demo :)
    /*function timeout() {
        var burn = new Effect.BurnDown(tree, scene, function(remains) {
            //console.log(fires.length)
            //fires = fires.concat(remains.fires);
            //console.log(fires.length)
            effects = effects.filter(function(elt) { elt != burn; }); // :)
        });
        effects.push(burn);
    }
    setTimeout(timeout, 3000);*/


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
        world.sprite = Sprite.getSprite("test", "CUBE");
        world.sprite.scale.x = 10000;
        world.sprite.scale.y = 2.5;
        world.sprite.scale.z = 8;
        
        world.sprite.material.color = 0x000000;
        world.sprite.position.set(0, -500, 0);
        
        scene.add(world.sprite);

        tree = {};
        tree.sprite = Sprite.getSprite("tree");
        tree.sprite.scale.set(4, 4, 1);
        tree.sprite.position.set(500, -400 + tree.sprite.getHeight()/2, 200);
        scene.add(tree.sprite);

        clouds = _.range(10).map(function() {
            var cloud = {};
            cloud.animation = new Sprite.Animation("cloud");
            cloud.animation.sprite.scale.set(4, 4, 1);
            cloud.animation.sprite.position.set(
                Math.random()*world.sprite.scale.x, 
                1500 + Math.random()*1000 - Math.random()*1000, 
                Math.random()*1000 - Math.random()*1000
            );
            cloud.animation.speed = 500+500*Math.random();
            cloud.speed = 5*Math.random()-5*Math.random();
            cloud.opacity = Math.random()*0.75+0.25;

            cloud.animation.onUpdate = function() {
                cloud.animation.sprite.position.x += cloud.speed;
                cloud.animation.sprite.material.opacity = cloud.opacity;
            }

            cloud.animation.start();
            cloud.animation.animationType = Sprite.AnimationType.BOUNCE | Sprite.AnimationType.JERKY;
            scene.add(cloud.animation.sprite);
            
            return cloud;
        });

        collidables.push(world);

        background = Drawables.background();

        background.position.set(0, 2500, -5000);
        background.scale.set(20,20,1);
        scene.add(background);

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
            var f = Drawables.fire();
            var scale = Math.random() * 0.5 + 0.5;
            f.sprite.scale.set(scale, scale, 1);
            f.sprite.position.set(-1000 + 500 * i + Math.random() * 300, -400 + f.sprite.getHeight()/2, 0);
            f.animationType = Sprite.AnimationType.JERKY;
            if(i%2==0)  f.animationType |= Sprite.AnimationType.BOUNCE;
            f.start();
            scene.add(f.sprite);
            fires.push(f);
        });

        var canvas = renderer.domElement;
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.style.display = "block";
        document.getElementById("content").appendChild(canvas);

        animate();
    }

    function update() {
        var dt = (+new Date()) - prevTime;
        prevTime = +new Date();

        player.update(dt, collidables, world, camera);

        clouds.forEach(function(cloud) {
            cloud.animation.update();
        });
        fires.forEach(function(fire) {
            fire.update();
            if (fire.sprite) {
                fire.sprite.position.z = 5;
            }
            
        });
        effects.forEach(function(effect) {
            effect.update();
        });

    }

    function animate() {
        // note: three.js includes requestAnimationFrame shim
        update();

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    
    function loadLevel(levelNum, callback) {
        var script = 'js/lev/lev'+levelNum+'.js';
        
        var el = document.createElement('script');
        el.async = false;
        el.src = script;
        el.type = 'text/javascript';
        
        (document.getElementsByTagName('HEAD')[0]||document.body).appendChild(el);
        
        (function is_loaded(cb){
            if(typeof window.level == 'undefined')
                setTimeout(function(){ is_loaded(cb); }, 100);
            else
                cb();
        })(function(){
            console.log(level);
            callback();
        });    
    }


    Sprite.loadAllTextures(function () {
        loadLevel(1, function() {
            init();
            if(level.objects.player) {
                camera.position.x = level.objects.player[0].x;
                player.animation.sprite.position.x = level.objects.player[0].x;
                player.animation.sprite.position.y = level.objects.player[0].y;
            }
            //if(level.objects.ground) _.each(level.objects.ground, function(ground) {
            //    var ground = 
            //})
        });
    });
})( GAME, THREE, THREEx, _);
