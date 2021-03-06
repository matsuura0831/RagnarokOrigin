import { MagicDamageHandler } from "@/lib/MagicDamage";

class MagicGear {
    static VERSION = [2, 0];    // major, minor

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
        
        handler(level) {
            const _adj = {
                7: [-15, 40], 6: [-15, 36], 5: [-15, 32],
                3: [-15, 28], 2: [-15, 24], 1: [-15, 20],
                0: [0, 0],
            }[level];

            return new class extends MagicDamageHandler {
                damage_up(v, obj, ismin, ismax) {
                    if(ismin) return v + _adj[0];
                    if(ismax) return v + _adj[1];
                    return v + (_adj[0] + _adj[1]) / 2;
                }
            }
        },
    },
    {
        name: "ME高速詠唱",
        levels: [7, 6, 4, 3, 2, 1, 0],

        handler(level) {
            const _adj = {
                7: 1.1, 6: 1.0,
                4: 0.8, 3: 0.7,
                2: 0.6, 1: 0.5,
                0: 0.0
            }[level];

            return new class extends MagicDamageHandler {
                f_cast(v, obj) {
                    if(obj.skill.name == "マグヌスエクソシズム") {
                        return v - _adj;
                    }
                    return v;
                }
            }
        },
    },
];

const CONVERT_DATA = {};
DATA.forEach(({ name, levels, handler }) => {
    let m = {};
    levels.forEach(i => {
        m[i] = {
            instance: new MagicGear(name, i),
            handler: handler(i),
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
    getHandler({name, level}) {
        return CONVERT_DATA[name][level].handler;
    }
}