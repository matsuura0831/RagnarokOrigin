const DATA = {
    "風": {
        "風": -75,
        "地": -20,
        "水":  75,
        "火":   0,
        "毒":   0,
        "無":   0,
        "念":   0,
        "聖": -25,
        "闇":   0,
        "死":   0,
    },
    "地": {
        "風":  75,
        "地": -75,
        "水":   0,
        "火": -20,
        "毒":   0,
        "無":   0,
        "念":   0,
        "聖": -25,
        "闇":   0,
        "死":   0,
    },
    "水": {
        "風": -20,
        "地":   0,
        "水": -75,
        "火":  75,
        "毒":   0,
        "無":   0,
        "念":   0,
        "聖": -25,
        "闇":   0,
        "死":   0,
    },
    "火": {
        "風":   0,
        "地":  75,
        "水": -20,
        "火": -75,
        "毒":   0,
        "無":   0,
        "念":   0,
        "聖": -25,
        "闇":   0,
        "死":  50,
    },
    "毒": {
        "風":  25,
        "地":  25,
        "水":  25,
        "火":  25,
        "毒": -75,
        "無":   0,
        "念":   0,
        "聖": -50,
        "闇": -50,
        "死": -75,
    },
    "無": {
        "風":   0,
        "地":   0,
        "水":   0,
        "火":   0,
        "毒":   0,
        "無":   0,
        "念": -30,
        "聖":   0,
        "闇":   0,
        "死":   0,
    },
    "念": {
        "風":   0,
        "地":   0,
        "水":   0,
        "火":   0,
        "毒":   0,
        "無": -30,
        "念":  50,
        "聖": -25,
        "闇": -25,
        "死":  25,
    },
    "聖": {
        "風":   0,
        "地":   0,
        "水":   0,
        "火":   0,
        "毒":   0,
        "無":   0,
        "念":   0,
        "聖": -75,
        "闇":  50,
        "死":  75,
    },
    "闇": {
        "風":   0,
        "地":   0,
        "水":   0,
        "火":   0,
        "毒": -50, // TODO 確認
        "無":   0,
        "念":   0,
        "聖":  25, // TODO 確認
        "闇": -75, // TODO 確認
        "死": -25, // TODO 確認
    },
    "死": {
        "風":   0,
        "地":   0,
        "水":   0,
        "火":   0,
        "毒": -50, // TODO 確認
        "無":   0,
        "念":   0,
        "聖":  25, // TODO 確認
        "闇": -75, // TODO 確認
        "死": -75, // TODO 確認
    },
};

// 各属性の最大倍率，最小倍率を引けるようにする
Object.keys(DATA).forEach(k1 => {
    const v = DATA[k1];

    v['MAX'] = Object.keys(v).reduce((val, k2) => Math.max(val, v[k2]), 0);
    v['MIN'] = Object.keys(v).reduce((val, k2) => Math.min(val, v[k2]), 0);
})

export default DATA;