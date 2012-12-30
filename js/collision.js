(function(GAME, THREE, _) {

    var Collision = GAME.Collision = {};

    function getLine(arr, ind) {
        return [ arr[+ind % arr.length], arr[(+ind + 1) % arr.length] ];
    }
    
    function toVector3(obj){
        return new THREE.Vector3( obj.x, obj.y, obj.z );
    }
    
    function linesCross(line1, line2) {
        var p1 = toVector3(line1[0]),
            p2 = toVector3(line1[1]), 
            p3 = toVector3(line2[0]), 
            p4 = toVector3(line2[1]);
        
        var v1 = (new THREE.Vector3()).sub( p2, p1 );
        var v1a = (new THREE.Vector3()).sub( p3, p1 );
        var v1b = (new THREE.Vector3()).sub( p4, p1 );

        var v2 = (new THREE.Vector3()).sub( p4, p3 );
        var v2a = (new THREE.Vector3()).sub( p1, p3 );
        var v2b = (new THREE.Vector3()).sub( p2, p3 );
        
        if (((new THREE.Vector3()).cross(v1,v1a)).dot((new THREE.Vector3()).cross(v1,v1b)) > 0) {
            return false;
        }
        
        if (((new THREE.Vector3()).cross(v2,v2a)).dot((new THREE.Vector3()).cross(v2,v2b)) > 0) {
            return false;
        }
        
        return true;
    }
    

    function getActualPosition(sprite) {
        
        var vertices = sprite.collisionFrame;
        var vec = sprite.position;
        var scale = sprite.scale;
        
        var result = [];
        _.each(vertices,function(e,i){
            result.push({
                "x" : e.x * scale.x + vec.x,
                "y" : e.y * scale.y + vec.y,
                "z" : 0
            });
        });
        
        return result;
    }
    

    function getClosetPoint(pos,line, segmentClamp){
        var P = toVector3(pos);
        var A = toVector3(line[0]);
        var B = toVector3(line[1]);
        var AP = P.clone().subSelf(A);
        var AB = B.clone().subSelf(A);
        var ab2 = AB.x*AB.x + AB.y*AB.y;
        var ap_ab = AP.x*AB.x + AP.y*AB.y;
        var t = ap_ab / ab2;
        if (segmentClamp){
             if (t < 0.0) t = 0.0;
             else if (t > 1.0) t = 1.0;
        }
        var Closest = A.addSelf(AB.multiplyScalar(t));
        return Closest;
    }
    
    function getDirection(player, line){
        var point = getClosetPoint(player, line, true);
        var r = {
            "x" : Math.round(player.x-point.x), 
            "y" : Math.round(player.y-point.y), 
            "z" : 0};
        r.count = (r.x != 0) + (r.y != 0) + (r.z != 0);
        return r;
    }

    function objectsCollide(position, player, obj, dd) {
//        console.log("player",player);
//        console.log("object",obj);
        var result = {};
        for ( var i in player) {
            for ( var j in obj) {
                var playerLine = getLine(player, i);
                var objectLine = getLine(obj, j);
//                console.log("pline", playerLine)
//                console.log("obectL", objectLine)
                //qconsole.log(linesCross(playerLine, objectLine));
                if (linesCross(playerLine, objectLine)) {
                    var vector = getDirection(position, objectLine);
//                    console.log("vec", vector)
                        
                    if (result[dd] && result[dd].vector.count < vector.count){
//                        console.log("I AM THE IF");
                        vector = result[dd].vector;
                    }
                    result[dd] = {
                        "index" : dd,
                        "vector" : vector
                    };
//                    console.log("resdd", result[dd]);
                }
            }
        }
        return result;
    }

    _.extend(Collision, {
        colliding : function(player, collidables) {
            var playerPosition = getActualPosition(player.animation.sprite);
            var arr = [];
            _.range(collidables.length).forEach(function (i) {
                var obj = getActualPosition(collidables[i].sprite);
                var co = objectsCollide(player.animation.sprite.position,playerPosition, obj, i);
                if(Object.keys(co).length > 0){
                    arr.push(co);
                }
            });
//            console.log("length", arr.length)
//            arr = _.compact(arr);
//            if(collidables.length > 0 && arr.length > 0){
////                console.log("collidables:", collidables)
//                console.log("ARR", arr);
//                console.log("ARR", arr[0][0].vector);
////                asdf
//            }
            
            return arr;
        }
    
    });

})(GAME || {}, THREE, _);
