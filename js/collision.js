(function(GAME, THREE, _) {

    var Collision = GAME.Collision = {};

    function linesCross(line1, line2) {
        var p1 = line1[0], p2 = line1[1], p3 = line2[0], p4 = line2[1];

        var v1 = new THREE.Vector3( p2.x - p1.x, p2.y - p1.y, p2.z - p1.z );
        var v1a = new THREE.Vector3( p3.x - p1.x, p3.y - p1.y, p3.z - p1.z );
        var v1b = new THREE.Vector3( p4.x - p1.x, p4.y - p1.y, p4.z - p1.z );

        if ((v1.crossSelf(v1a)).dot(v1.crossSelf(v1b)) > 0) {
            return false;
        }

        var v2 = new THREE.Vector3( p4.x - p3.x, p4.y - p3.y, p4.z - p3.z );
        var v2a = new THREE.Vector3( p1.x - p3.x, p1.y - p3.y, p1.z - p3.z );
        var v2b = new THREE.Vector3( p2.x - p3.x, p2.y - p3.y, p2.z - p3.z );

        if ((v2.crossSelf(v2a)).dot(v2.crossSelf(v2b)) > 0) {
            return false;
        }

        return true;
    }

    function translate(obj, vec) {
        var result = [];
        _.each(obj,function(e,i){
            result.push({
                "x" : e.x + vec.x,
                "y" : e.y + vec.y,
                "z" : e.z + vec.z
            });
        });
        return result;
    }

    function getLine(arr, ind) {
        var arrLen = arr.length;
        ind = +ind;

        return [ arr[ind % arrLen], arr[(ind + 1) % arrLen] ];
    }

    function objectsCollide(o1, o2) {
        for (var i in o1) {
            for ( var j in o2) {
                if (linesCross(getLine(o1, i), getLine(o2, j))) {
                    return true;
                }
            }
        }
    }
    // This is probably bit faster
    // function objectsCollide(o1, o2) {
    //     var i = 0,
    //         j = 0,
    //         o1len = o1.length,
    //         o2len = o2.length;

    //     for (; i < o1len; i++) {
    //         for (; j < o2len; j++) {
    //             return linesCross(getLine(o1, i), getLine(o2, j));
    //         }
    //     }
    // }
    _.extend(Collision, {
        colliding : function(player, collidables) {
            var pv = player.animation.sprite.geometry.vertices;
            var pp = player.animation.sprite.position;

            for ( var i in collidables) {
                var cv = collidables[i].sprite.geometry.vertices;
                var cp = collidables[i].sprite.position;

                return objectsCollide(translate(pv, pp), translate(cv, cp));

            }
        }
    });

})(GAME || {}, THREE, _);
