level = {
    width : 5000,
    miny : -200, //TODO
    objects : {
        player : [{ x: 0, y: 350 } ],
        grounds : [
            { x: 100, y: 100, z:0, w: 1000, h : 400, depth: 300, texture: "concret" },
            { x: 1400, y: 0, z:0, w: 1000,  h: 1000, depth: 300, texture: "concret" },
            { x: 1000, y: -300, z:0, w: 500000,  h: 500, depth: 400, texture: "concret" },
            { x: 3400, y: 0, z:0, w: 1000,  h: 1000, depth: 400, texture: "concret" },
            { x: 4800, y: 0, z:0, w: 1000,  h: 500, depth: 380, texture: "concret" },
            { x: 9000, y: 0, z:0, w: 120,  h: 100, depth: 380, texture: "concret" },
            { x: 9540, y: 0, z:0, w: 250,  h: 200, depth: 280, texture: "granit" },
            { x: 97800, y: 0, z:0, w: 320,  h: 300, depth: 380, texture: "granit" },
            { x: 10200, y: 0, z:0, w: 420,  h: 200, depth: 280, texture: "granit" },
            { x: 12200, y: 500, z:0, w: 10420,  h: 300, depth: 260, texture: "granit" },

            
           // { x: 1000, y: 900, z:0, w: 5000,  h: 400, depth: 100, texture: "concret" },
            
//            { f: 3400, t: 3700, y: 100, depth: 100, texture: "floor_light" }
        ],
        clouds : [
//                  { x: -2000, y: 1600, w: 800, h: 450, depth: 200, texture: "cloud", speed: { x: 100, y: 0 } },
//                  { x: 1600, y: 2000, w: 1000, h: 400, depth: 200, texture: "cloud", speed: { x: -20, y: 0 } },
//                  { x: 400, y: 200, w: 200, h: 150, depth: 200, texture: "cloud", speed: { x: 0, y: 0 } }
        ],
        fires : [
            { x: -1300, y: 50, w: 200, h: 600, depth: 0 },
            { x: -1400, y: 20, w: 200, h: 1000, depth: 0 },
            { x: -1500, y: 70, w: 200, h: 2000, depth: 0 },
            { x: -1600, y: 10, w: 200, h: 1600, depth: 0 },
            { x: -1700, y: 70, w: 200, h: 2000, depth: 0 },
            { x: 2400, y: 100, w: 200, h: 200, depth: 0 },
            { x: 2200, y: 100, w: 400, h: 200, depth: 0 },
            { x: 2600, y: 100, w: 200, h: 300, depth: 0 },
            { x: 6400, y: 150, w: 300, h: 300, depth: 0 }
        ],
        trees : [
//            { x: 600, y: 1600, w: 1000, h: 1500, depth: 300 }
        ],
        suns : [
            { x: 0, y: -500, r: 2000 , alpha: Math.PI/4, omega: 0.00002, size: 2000 }
        ]
    }
};
