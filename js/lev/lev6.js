level = {
    width : 5000,
    miny : -200, //TODO
    objects : {
        //player : [{ x: 12000, y: 2500 } ],
        player : [{ x: 0, y: 350 } ],
        grounds : [
            { x: -1050, y: -200, z:0, w: 5000, h : 400, depth: 800, texture: "granit" },
            { x: -500, y: 200, z:0, w: 500, h : 4400, depth: 800, texture: "granit" },
            { x: 200, y: 1200, z:0, w: 1500, h : 400, depth: 800, texture: "granit" },

            { x: 300, y: 200, z:0, w: 100, h : 400, depth: 800, texture: "granit" },
            { x: 700, y: 200, z:0, w: 100, h : 400, depth: 800, texture: "granit" },

            { x: 1400, y: 800, z:0, w: 400, h : 100, depth: 800, texture: "granit" },
            { x: 1400, y: 1600, z:0, w: 400, h : 100, depth: 800, texture: "granit" },
            { x: 1650, y: 1195, z:0, w: 100, h : 900, depth: 800, texture: "granit" },
            
            { x: 1400, y: 300, z:0, w: 100, h : 900, depth: 800, texture: "granit" },
            
            { x: 3400, y: 1600, z:0, w: 1400, h : 100, depth: 800, texture: "granit" },

            { x: 4400, y: 300+800, z:0, w: 400, h : 100, depth: 800, texture: "granit" },
            { x: 4400, y: 300+1600, z:0, w: 400, h : 100, depth: 800, texture: "granit" },
            { x: 4650, y: 300+1200, z:0, w: 100, h : 900, depth: 800, texture: "granit" },
            { x: 4650, y: 300+2000, z:0, w: 100, h : 900, depth: 800, texture: "granit" },

            { x: 4400, y: 200, z:0, w: 1600, h : 100, depth: 800, texture: "granit" },
            { x: 6400, y: 300, z:0, w: 1600, h : 100, depth: 800, texture: "granit" },
            { x: 8400, y: 400, z:0, w: 1600, h : 100, depth: 800, texture: "granit" },

            { x: 8400, y: 1600, z:0, w: 400, h : 100, depth: 800, texture: "granit" },
            { x: 8650, y: 1195, z:0, w: 100, h : 900, depth: 800, texture: "granit" },

            { x: 9400, y: 1000, z:0, w: 400, h : 100, depth: 800, texture: "granit" },
            { x: 9650, y: 1195, z:0, w: 100, h : 900, depth: 800, texture: "granit" },

            { x: 9700, y: 2000, z:0, w: 1600, h : 100, depth: 800, texture: "granit" },
            { x: 12300, y: 1000, z:0, w: 1600, h : 100, depth: 800, texture: "granit" },
//          
            
//            { f: 3400, t: 3700, y: 100, depth: 100, texture: "floor_light" }
        ],
        fires : [
             { x: 500, y: 200, w: 600, h: 250, depth: 200 },
             { x: 3700, y: 450, w: 600, h: 250, depth: 200 },
             { x: 4400, y: 450, w: 600, h: 250, depth: 200 },
             { x: 5100, y: 450, w: 600, h: 250, depth: 200 },
             
             { x: 6400, y: 450, w: 600, h: 250, depth: 200 },
             { x: 12800, y: 1200, depth: 200 },
        ],
        clouds : [
                  //TODO: FIX FLICKER
//                  { x: 10500, y: 1600, w: 800, h: 450, depth: 200, texture: "cloud", speed: { x: 100, y: 0 } },
//                  { x: 5500, y: 2000, w: 1000, h: 400, depth: 200, texture: "cloud", speed: { x: -20, y: 0 } },
//                  { x: 400, y: 2200, w: 200, h: 150, depth: 200, texture: "cloud", speed: { x: 0, y: 0 } }
        ],
        trees : [
            //{ x: 1000, y: 600, depth: 200, texture: "tree" },
            { x: 12800, y: 1200, depth: 200, texture: "bush" },
//            { x: 2000, y: 600, w: 200, h: 600, depth: 200 },
//            { x: 5000, y: 600, w: 6600, h: 1000, depth: 200 },
        ],
        suns : [
            { x: 0, y: -500, r: 2500 , alpha: Math.PI/4, omega: 0.00005, size: 2500 }
        ]
    }
};
