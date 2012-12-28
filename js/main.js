(function() {
    var WIDTH = window.innerWidth-100, HEIGHT = window.innerHeight-100;

    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
        
    function loadSprites(path, n) {
        var sprites = [];
        for(var i=0; i<n; i++) {
            var img = THREE.ImageUtils.loadTexture(path + (i+1) + ".png");
            var material = new THREE.SpriteMaterial({ map: img, useScreenCoordinates: false, color: 0xffffff });
            
            var sprite = new THREE.Sprite(material);
            sprite.scale.set(img.image.width, img.image.height, 1);
            sprite.width = img.image.width
            sprite.height = img.image.height
            
            sprites.push(sprite);
        }
        
        return sprites;
    }
    
    
    function animation(path,num,x,y,size) {
        var time = function() { return new Date().getTime(); }
        that = this
        this.x = x;
        this.y = y;
        this.size = size
        this.frame = 0
        this.frames = num
        this.sprites = loadSprites(path, that.frames)
        this.update = function() {
            var lastframe = that.sprites[(that.frame)%that.frames]
            var currframe = that.sprites[(that.frame+1)%that.frames]
            that.frame++
            scene.remove(lastframe)
            scene.add(currframe)
        }
        this.start = function() {
            that.sprites.forEach(function(sprite) {
                sprite.position.x = that.x
                sprite.position.y = that.y
                sprite.scale.x = sprite.width*that.size
                sprite.scale.y = sprite.height*that.size
            })
        }
        this.stop = function() {
            that.sprites.forEach(function(sprite) {
                scene.remove(sprite)
            })
        }
    }
    function fire(x,y,size) {
        return new animation("img/fire",16,x,y,size)
    }

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
        
//        var loader = new THREE.BinaryLoader();
//        loader.load({
//            model: "obj/wc.js",
//            callback: function (geometry) {
//                mesh3 = new THREE.Mesh(geometry, material1);
//                scene.add(mesh3);
//            }
//        });
        
        mesh1 = new THREE.Mesh(geometry, material1);
        mesh2 = new THREE.Mesh(geometry, material2);
        
        //scene.add(mesh1);
        //scene.add(mesh2);

        var pointLight = new THREE.PointLight(0xff0000);
        pointLight.position.set(10, 50, 130);
        scene.add(pointLight);
        
        var light = new THREE.AmbientLight( 0xffffff ); scene.add( light );

        fire1 = fire(200, 200, 2);
        fire1.start();

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);

        document.body.appendChild(renderer.domElement);

    }

    function animate() {
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame(animate);

        material2.opacity = 1 + Math.sin(new Date().getTime() * .0025)

        mesh1.rotation.z += 0.001;
        //mesh.rotation.y += 0.02;

        fire1.update();

        renderer.render(scene, camera);
    }
})();
