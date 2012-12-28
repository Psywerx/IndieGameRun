(function() {
    var WIDTH = window.innerWidth-100, HEIGHT = window.innerHeight-100;

    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
    

    function init() {

        camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
        camera.position.z = 1000;

        scene = new THREE.Scene();

        geometry = new THREE.PlaneGeometry(800, 800);
        texture = THREE.ImageUtils.loadTexture('img/test.png', {}, function() {
            animate();
        });
        material1 = new THREE.MeshPhongMaterial({
            map: texture
        });
        material2 = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true
        });
        
        
        mesh1 = new THREE.Mesh(geometry, material1);
        mesh2 = new THREE.Mesh(geometry, material2);
        mesh2.z += 10
        
        scene.add(mesh1);
        scene.add(mesh2);

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

        material2.opacity = 1 + Math.sin(new Date().getTime() * .0025)

        mesh1.rotation.z += 0.01;
        //mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }
})();
