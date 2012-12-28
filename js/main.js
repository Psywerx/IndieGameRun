-(function() {
    var WIDTH = window.innerWidth - 100, HEIGHT = window.innerHeight - 100;

    var camera, scene, renderer, player, world;
    var geometry, material, mesh;
    
    var prevTime = +new Date();
    
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
        world.position.set(0, -200,0);
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

    function update(){
    }
    
    function animate() {

        // note: three.js includes requestAnimationFrame shim
        update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
})();
