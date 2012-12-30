level = {
    width : 5000,
    miny : -200, //TODO
    objects : {
        player : [{ x: 0, y: 350 } ],
        grounds : [
            { x: 100, y: -200, z:0, w: 10000000, h : 400, depth: 800, texture: "granit" },
            { x: -2000, y: 1000, z:0, w: 2000, h: 4000, depth: 150, texture: "concret"},
            { x: -1000, y: 800, z:0, w: 300, h: 400, depth: 180, texture: "concret"},
            { x: -1000, y: 1200, z:0, w: 200, h: 400, depth: 180, texture: "concret"},
            { x: -1000, y: 1600, z:0, w: 100, h: 400, depth: 180, texture: "concret"},
            { x: -500, y: 100, z:100, w: 150, h: 620, depth: 680, texture: "concret"},
            
            { x: 400, y: 300, z:100, w: 150, h: 1520, depth: 680, texture: "concret"},
            { x: 3100, y: 5000, z:0, w: 300, h : 9000, depth: 120, texture: "granit" },
            { x: 3400, y: 7000, z:0, w: 400, h : 12000, depth: 110, texture: "granit" },
            { x: 3200, y: 1560, z:0, w: 600, h : 330, depth: 120, texture: "granit" },
            
            
            { x: 5100, y: 50, z:0, w: 1200, h : 500, depth: 90, texture: "concret" },
            { x: 6000, y: 50, z:0, w: 600, h : 200, depth: 120, texture: "concret" },
            
            { x: 8200, y: 50, z:0, w: 700, h : 200, depth: 120, texture: "granit" },
            
            
            { x: 10100, y: 300, z:50, w: 1200, h : 200, depth: 10, texture: "concret" },
            { x: 12000, y: 50, z:0, w: 333, h : 200, depth: 110, texture: "concret" },

//          
            
//            { f: 3400, t: 3700, y: 100, depth: 100, texture: "floor_light" }
        ],
        clouds : [
                  //TODO: FIX FLICKER
//                  { x: 10500, y: 1600, w: 800, h: 450, depth: 200, texture: "cloud", speed: { x: 100, y: 0 } },
//                  { x: 5500, y: 2000, w: 1000, h: 400, depth: 200, texture: "cloud", speed: { x: -20, y: 0 } },
//                  { x: 400, y: 2200, w: 200, h: 150, depth: 200, texture: "cloud", speed: { x: 0, y: 0 } }
        ],
        fires : [
             { x: 7400, y: 200, w: 600, h: 250, depth: 200 },
             { x: 9400, y: 200, w: 600, h: 250, depth: 200 },
             { x: 11400, y: 200, w: 600, h: 250, depth: 200 }
        ],
        trees : [
//            { x: 2000, y: 600, w: 200, h: 600, depth: 200 },
//            { x: 5000, y: 600, w: 6600, h: 1000, depth: 200 },
        ],
        suns : [
            { x: 0, y: -500, r: 2500 , alpha: Math.PI/4, omega: 0.00005, size: 2500 }
        ]
    }
};
