-(function() {
    var WIDTH = window.innerWidth - 100, HEIGHT = window.innerHeight - 100;

    var camera, scene, renderer, player, world;
    var geometry, material, mesh;
    
    var prevTime = +new Date();
    
    var keyboard = new THREEx.KeyboardState();

    init();
    
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
    
    function initWorld() {
        scene.add(drawGround(0, 700, false));
        scene.add(drawGround(700, 1000, true));
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
        //camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 10000 );
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
        
        if(keyboard.pressed('A') || keyboard.pressed('left')){
            player.position.x -= 10;
        }
        if(keyboard.pressed('D') || keyboard.pressed('right')){
            player.position.x += 10;
        }
        
    }
    
    function animate() {

        // note: three.js includes requestAnimationFrame shim
        update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
})();
