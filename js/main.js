(function() {
    var WIDTH = window.innerWidth - 100, HEIGHT = window.innerHeight - 100;

    var camera, scene, renderer, player, world;
    var geometry, material, mesh;

    var prevTime = +new Date();

    var keyboard = new THREEx.KeyboardState();

    init();

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
        var texture = THREE.ImageUtils.loadTexture('img/test.png', {}, function() {
            animate();
        });
        var material = new THREE.MeshPhongMaterial({
            map : texture
        });
        player = new THREE.Mesh(geometry, material);
        player.impulse = 0;
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
            if(player.position.y == -100){
                player.speed.y = 40;
            }
            console.log(player.speed.y);
        }
        player.speed.y -= 0.1 * dt;
        player.position.x += player.speed.x * dt * 0.1;
        player.position.y += player.speed.y;
        if (player.position.y < -100) {
            player.position.y = -100;
            player.speed.y = 0;
        }
        
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
})();
