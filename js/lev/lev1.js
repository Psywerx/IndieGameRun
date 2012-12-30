level = {
    width : 5000,
    miny : -200, //TODO
    objects : {
        player : [{ x: 0, y: 350 } ],
        grounds : [
            { x: 100, y: 100, w: 1000, h : 200, depth: 100, texture: "concret" },
            { x: 1400, y: 0, w: 1000,  h: 1000, depth: 100, texture: "floor_dark" },
            { x: 1000, y: -300, w: 5000,  h: 400, depth: 100, texture: "floor_light" },
            { x: 1000, y: 900, w: 5000,  h: 400, depth: 100, texture: "floor_dark" },
            
//            { f: 3400, t: 3700, y: 100, depth: 100, texture: "floor_light" }
        ],
        clouds : [
                  { x: -2000, y: 1600, w: 800, h: 450, depth: 200, texture: "cloud", speed: { x: 100, y: 0 } },
                  { x: 1600, y: 2000, w: 1000, h: 400, depth: 200, texture: "cloud", speed: { x: -20, y: 0 } },
                  { x: 400, y: 200, w: 200, h: 150, depth: 200, texture: "cloud", speed: { x: 0, y: 0 } }
        ],
        fires : [
            { x: 100, y: 350, w: 200, h: 300, depth: 0 }
        ],
        trees : [
            { x: 600, y: 1600, w: 1000, h: 1500, depth: 300 }
        ],
        suns : [
            { x: 0, y: -500, r: 2000 , alpha: Math.PI/4, omega: 0.00002, size: 2000 }
        ]
    }
};
