(function(G, THREE, THREEx, _) {
    var Sprite = G.Sprite,
        Effect = G.Effect,
        Drawables = G.Drawables,
        Ground = G.Ground,
        Player = G.Player,
        Collision = G.Collision,
        Sun = G.Sun;

    var WIDTH = 800,
        HEIGHT = 600;

    var camera, scene, renderer;
    var geometry, material, mesh;

    var state = "intro";
    
    GAME.levelCount = 7;//+1
    GAME.currLevel = 0;
    GAME.nextLevel = 1;
    GAME.loadingLevel = false;
    
    var player = {},
        world = {},
        collidables = [],
        fires = [],
        trees = [],
        effects = [],
        clouds = [],
        suns = [],
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
        /*world = {};
        world.sprite = Sprite.getSprite("test", "CUBE");
        world.sprite.scale.x = 10000;
        world.sprite.scale.y = 2.5;
        world.sprite.scale.z = 8;
        
        world.sprite.material.color = 0x000000;
        world.sprite.position.set(0, -500, 0);*/
        /*
        scene.add(world.sprite);
        collidables.push(world);*/

//        tree = {};
//        tree.sprite = Sprite.getSprite("tree");
//        tree.sprite.scale.set(4, 4, 1);
//        tree.sprite.position.set(500, -400 + tree.sprite.getHeight()/2, 200);
//        scene.add(tree.sprite);
//
//        clouds = _.range(10).map(function() {
//            var cloud = {};
//            cloud.animation = new Sprite.Animation("cloud");
//            cloud.animation.sprite.scale.set(4, 4, 1);
//            cloud.animation.sprite.position.set(
//                Math.random()*world.sprite.scale.x, 
//                1500 + Math.random()*1000 - Math.random()*1000, 
//                Math.random()*1000 - Math.random()*1000
//            );
//            cloud.animation.speed = 500+500*Math.random();
//            cloud.speed = 5*Math.random()-5*Math.random();
//            cloud.opacity = Math.random()*0.75+0.25;
//
//            cloud.animation.onUpdate = function() {
//                cloud.animation.sprite.position.x += cloud.speed;
//                cloud.animation.sprite.material.opacity = cloud.opacity;
//            }
//
//            cloud.animation.start();
//            cloud.animation.animationType = Sprite.AnimationType.BOUNCE | Sprite.AnimationType.JERKY;
//            scene.add(cloud.animation.sprite);
//            
//            return cloud;
//        });


        background = Drawables.background();

        background.position.set(0, 2500, -5000);
        background.scale.set(20,20,1);
        scene.add(background);

    }

    function init() {
        camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
//        camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH/ 2, HEIGHT/ 2, HEIGHT/ - 2, 1, 100000 );
        camera.position.z = 2000;
        camera.position.y = 1000;

        scene = new THREE.Scene();

        initWorld();
        G.showIntro(scene);

        player = new Player(scene);

        var light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);


        /*_.range(5).forEach(function(i){
            var f = Drawables.makeFire();
            var scale = Math.random() * 0.5 + 0.5;
            f.sprite.scale.set(scale, scale, 1);
            f.sprite.position.set(-1000 + 500 * i + Math.random() * 300, -400 + f.sprite.getHeight()/2, 0);
            f.animationType = Sprite.AnimationType.JERKY;
            if(i%2==0)  f.animationType |= Sprite.AnimationType.BOUNCE;
            f.start();
            scene.add(f.sprite);
            fires.push(f);
        });*/

        var canvas = renderer.domElement;
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.style.display = "block";
        document.getElementById("content").appendChild(canvas);
    }

    function update() {
        var dt = (+new Date()) - prevTime;
        GAME.slideLevel(dt, scene);
        if(!GAME.loadingLevel) {
            if(GAME.nextLevel != 0) {
                loadLevel(GAME.nextLevel);
            }
            
            switch(state) {
            case "intro":
                GAME.slideMenu1(dt);
                if(Object.keys(keyboard.keyCodes).length>0){
                    state = "game";
                }
                    
            break;
            
            case "game":
                camera.position.x = player.animation.sprite.x;
                GAME.slideMenu2(dt);
                
                player.update(dt, collidables, world, camera);
                
                clouds && clouds.forEach(function(cloud) {
                //console.log(cloud)
                cloud.sprite.update(dt);
                });
                fires.forEach(function(fire) {
                    fire.update();  
                });
                effects.forEach(function(effect) {
                    effect.update();
                });
                break;
            }
            prevTime = +new Date();
            

            Sun.update(dt,camera);
        }
    }

    function animate() {
        // note: three.js includes requestAnimationFrame shim
        update();

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    
    function loadJS(script, callback) {
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
            //console.log(level);
            callback(level);
        });    
    }

    function loadLevel(levelNum, callback) {
        if(levelNum >= GAME.levelCount) {
            GAME.nextLevel = 0;
            GAME.currLevel = 0;
        } else {
            GAME.loadingLevel = true;
            GAME.nextLevel = 0;
            GAME.currLevel = levelNum;
            level = undefined;
            loadJS('js/lev/lev'+levelNum+'.js', function() {
                effects.forEach(function(effect) { effect.cleanup(); });
                effects = [];

                collidables.forEach(function(c) { scene.remove(c.sprite); });
                collidables = [];
            
                //world = {};
                //background = {};

                fires.forEach(function(fire) { scene.remove(fire.sprite); });
                fires = [];
                
                trees.forEach(function(tree) { scene.remove(tree.sprite); });
                trees = [];
                
                clouds.forEach(function(cloud) { scene.remove(cloud.sprite); });
                clouds = [];
                
                suns = [];
                
                grounds.forEach(function(ground) { scene.remove(ground.sprite); });
                grounds = [];
                
                scene.remove(player.animation.sprite);
                player = new Player(scene);


                if(level.objects.player) {
                    camera.position.x = level.objects.player[0].x;
                    player.animation.sprite.position.x = level.objects.player[0].x;
                    player.animation.sprite.position.y = level.objects.player[0].y;
                    effects.push(new Effect.Melty(player, scene));
                }
                if(level.objects.clouds) clouds = _.map(level.objects.clouds, function(cloud) {
                    var newCloud = {};
                    newCloud.sprite = Sprite.getSprite(cloud.texture || "cloud", "PLANE", cloud.w, cloud.h);
                    newCloud.sprite.position.set(cloud.x, cloud.y, cloud.depth);
                    newCloud.sprite.update = function(dt) {
                        newCloud.sprite.position.x += cloud.speed.x*dt*0.001;
                    };
                    scene.add(newCloud.sprite);
                    
                    return newCloud;
                });            
                if(level.objects.grounds) grounds = _.map(level.objects.grounds, function(ground) {
                    var newGround = {};
                    newGround.sprite = Drawables.makeGround(
                        ground.x,
                        ground.y,
                        ground.z,
                        ground.w,
                        ground.h,
                        ground.depth || 0, 
                        ground.texture || "floor_dark",
                        scene
                    );
                    scene.add(newGround.sprite);
                    collidables.push(newGround);
                    
                    return newGround;
                });

                if(level.objects.fires) fires = _.map(level.objects.fires, function(fire) {
                    var newFire = {};
                    newFire.animation = Drawables.makeFire(fire.texture || "fire", "PLANE", fire.w, fire.h);
                    newFire.animation.sprite.position.set(fire.x, fire.y, fire.depth);
                    newFire.animation.collisionType = "Fire";
                    newFire.animation.start();
                    scene.add(newFire.animation.sprite);
                    collidables.push(newFire.animation);
                    
                    return newFire.animation;
                });
                if(level.objects.trees) trees = _.map(level.objects.trees, function(tree) {
                    var newTree = {};
                    newTree.sprite = Sprite.getSprite(tree.texture || "tree", "PLANE", tree.w, tree.h);
                    newTree.sprite.position.set(tree.x, tree.y, tree.depth || 0);
                    newTree.sprite.update = function(dt) {

                    };
                    scene.add(newTree.sprite);
                    
                    return newTree;
                });            

                if(level.objects.suns) suns = _.map(level.objects.suns, function(sun) {
                    
                    Sun.init(sun,scene, camera);
                });          
                var home = Sprite.getSprite("house1", "PLANE");
                home.position.set(14000, 920, 350);
                home.scale.set(3,3);
                scene.add(home);
                
                callback && callback();

                GAME.loadingLevel = false;
                GAME.showLevel(scene, levelNum);
                GAME.nextLevel = 0;
            });
        }
    }


    Sprite.loadAllTextures(function () {
        init();            
        loadLevel(GAME.nextLevel, function() {
            animate();
        });
    });
})( GAME, THREE, THREEx, _);

