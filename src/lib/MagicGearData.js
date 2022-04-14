class MagicGear {
    static VERSION = [1, 0];    // major, minor

    constructor(
        name, level,
    ) {
        this.name = name;
        this.level = level;
    }

    serialize() {
        return [
            ...MagicGear.VERSION,
            this.name, this.level,
        ];
    }

    clone() {
        return MagicGear.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = MagicGear.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of MagicGear: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of MagicGear: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new MagicGear(...rest);
    }
}

const DATA = [
    {
        name: "コアオーバクロック",
        levels: [7, 6, 5, 3, 2, 1, 0],

        handler: (level, isMinimum=false, isMaximum=false) => {
                const _adj = {
                    7: [-15, 40], 6: [-15, 36], 5: [-15, 32],
                    3: [-15, 28], 2: [-15, 24], 1: [-15, 20],
                    0: [0, 0],
                }[level];

                if(isMinimum) return _adj[0];
                if(isMaximum) return _adj[1];
                return (_adj[0] + _adj[1]) / 2;
        },
    },
];

const CONVERT_DATA = {};
DATA.forEach(({ name, levels, handler }) => {
    let m = {};
    levels.forEach(i => {
        m[i] = {
            instance: new MagicGear(name, i),
            handler: handler,
        };
    });
    CONVERT_DATA[name] = m;
})

export default {
    data: CONVERT_DATA,
    clazz: MagicGear,

    getGear(name, level) {
        const m = CONVERT_DATA[name];
        const lv = level || 0;
        return m[lv].instance.clone();
    },
    getGearHandler({name, level}) {
        return { run: (...args) => CONVERT_DATA[name][level].handler(level, ...args) };
    }
}