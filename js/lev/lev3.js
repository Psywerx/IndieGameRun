level = {
    width : 5000,
    miny : -200, //TODO
    objects : {
        player : [{ x: 0, y: 350 } ],
        grounds : [
            { x: 100, y: -200, z:0, w: 10000000, h : 400, depth: 500, texture: "granit" },
            { x: -2000, y: 1000, z:0, w: 2000, h: 4000, depth: 200, texture: "concret"},
            { x: 3100, y: 50, z:0, w: 300, h : 500, depth: 120, texture: "concret" },
            { x: 3400, y: 50, z:0, w: 400, h : 900, depth: 110, texture: "concret" },
            { x: 3800, y: 50, z:0, w: 600, h : 400, depth: 120, texture: "concret" },
            
            
            { x: 5100, y: 50, z:0, w: 1200, h : 500, depth: 90, texture: "concret" },
            { x: 7400, y: 50, z:0, w: 4002, h : 200, depth: 110, texture: "concret" },
            { x: 6000, y: 50, z:0, w: 600, h : 400, depth: 120, texture: "concret" },
            
            { x: 8000, y: 50, z:0, w: 700, h : 700, depth: 120, texture: "granit" },
            
            
            { x: 10100, y: 150, z:50, w: 1200, h : 500, depth: 10, texture: "concret" },
            { x: 12000, y: 50, z:0, w: 333, h : 200, depth: 110, texture: "concret" },
            { x: 15000, y: 50, z:0, w: 600, h : 1800, depth: 200, texture: "concret" },
            { x: 15000, y: 800, z:0, w: 5600, h : 200, depth: 120, texture: "concret" },
            
//          
            
//            { f: 3400, t: 3700, y: 100, depth: 100, texture: "floor_light" }
        ],
        clouds : [
                  //TODO: FIX FLICKER
                  { x: 10500, y: 1600, w: 800, h: 450, depth: 200, texture: "cloud", speed: { x: 100, y: 0 } },
                  { x: 5500, y: 2000, w: 1000, h: 400, depth: 200, texture: "cloud", speed: { x: -20, y: 0 } },
                  { x: 400, y: 2200, w: 200, h: 150, depth: 200, texture: "cloud", speed: { x: 0, y: 0 } }
        ],
        fires : [
            { x: 4300, y: 200, w: 200, h: 500, depth: 0 },
            { x: 11000, y: 200, w: 400, h: 600, depth: 0 },
            { x: 11500, y: 200, w: 400, h: 400, depth: 0 }
        ],
        trees : [
//            { x: 5000, y: 600, w: 1000, h: 1500, depth: 200 },
        ],
        suns : [
            { x: 0, y: -500, r: 2000 , alpha: Math.PI/4, omega: 0.00004, size: 2000 }
        ]
    }
};
