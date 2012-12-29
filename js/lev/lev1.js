level = {
    width : 5000,
    miny : -200, //TODO
    objects : {
        player : [{ x: 3100, y: 350 } ],
        grounds : [
            { f: 0, t: 10000, y: -200, depth: 100, texture: "floor_dark" },
            { f: 3000, t: 3200, y: 0, depth: 100, texture: "floor_dark" },
            { f: 3400, t: 3700, y: 100, depth: 100, texture: "floor_light" }
        ],
        clouds : [{ x: 0, y: -200, w: 300,  h: 300, depth: 0,   texture: { name: "cloud", count: 2 }, speed: { x: -60, y: 0 } }],
         fires : [{ x: 0, y: -200, w: 3000, h: 300, depth: 0 }],
         trees : [{ x: 0, y: -200, w: 3000, h: 300, depth: 0 }],
    },
};
