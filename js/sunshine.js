(function(GAME, THREE, _) {
    var Sunshine = G.Sunshine = {};
    
    var Ground = G.Ground;
    var Sun = G.Sun;

    function getRayDirections(n){
        return _.range(n).map(function(i){
            return new THREE.Vector3(i, n/3, 0);
        });
    }
    
    _.extend(Sunshine, {
        getSunnyParts : function (collidable) {
           
            _.each(collidable,function(obj, ind){
                _.map(getRayDirections(1000),function(direction){

                    var intersects = ray.intersectObject( meshes[m] );
                    
                    var ray = new THREE.Ray( this.position, rayDirections[r] );
                });
                
            });
        }
    });
})( GAME, THREE, _ );
