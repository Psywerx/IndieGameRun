(function() {
    var WIDTH = window.innerWidth-100, HEIGHT = window.innerHeight-100;

    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
    

    function init() {

        camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
        camera.position.z = 1000;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry(200, 200, 200);
        texture = THREE.ImageUtils.loadTexture('test.jpg', {}, function() {
            animate();
        });
        material = new THREE.MeshPhongMaterial({
            map: texture
        });
        
        
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        var pointLight = new THREE.PointLight(0xff0000);
        pointLight.position.set(10, 50, 130);
        scene.add(pointLight);
        
        var light = new THREE.AmbientLight( 0xffffff ); scene.add( light );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);

        document.body.appendChild(renderer.domElement);

    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }
})();