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
        
        handler(level, skill) {
            const _adj = {
                7: [-15, 40], 6: [-15, 36], 5: [-15, 32],
                3: [-15, 28], 2: [-15, 24], 1: [-15, 20],
                0: [0, 0],
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    if(ismin) {
                        status.magic_damage_up += _adj[0];
                    } else if(ismax) {
                        status.magic_damage_up += _adj[1];
                    } else {
                        status.magic_damage_up += (_adj[0] + _adj[1]) / 2;
                    }
                }
            }
        },
    },
    {
        name: "インファイト",
        levels: [7, 6, 4, 3, 2, 1, 0],
        
        handler(level, skill) {
            const _adj = {
                7: 7, 6: 6,
                4: 4, 3: 3,
                2: 2, 1: 1,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.magic_damage_up += _adj;
                }
            }
        },
    },
    {
        name: "アウトレンジ",
        levels: [7, 6, 4, 3, 2, 1, 0],
        
        handler(level, skill) {
            const _adj = {
                7: 7, 6: 6,
                4: 4, 3: 3,
                2: 2, 1: 1,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.magic_damage_up += _adj;
                }
            }
        },
    },
    {
        name: "臨戦",
        levels: [7, 6, 5, 3, 2, 1, 0],
        
        handler(level, skill) {
            const _adj = {
                7: 8, 6: 7, 5: 6,
                3: 4, 2: 3, 1: 2,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.magic_damage_up += _adj;
                }
            }
        },
    },
    {
        name: "残忍",
        levels: [7, 6, 5, 3, 2, 1, 0],
        
        handler(level, skill) {
            const _adj = {
                7: 10, 6: 9, 5: 8,
                3: 5, 2: 4, 1: 3,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.magic_damage_up += _adj;
                }
            }
        },
    },
    {
        name: "ウォールエッジ",
        levels: [3, 2, 1, 0],
        
        handler(level, skill) {
            const _adj = {
                3: 10, 2: 9, 1: 8,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.magic_damage_up += _adj;
                }
            }
        },
    },
    {
        name: "ニューマエッジ",
        levels: [3, 2, 1, 0],
        
        handler(level, skill) {
            const _adj = {
                3: 10, 2: 9, 1: 8,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.magic_damage_up += _adj;
                }
            }
        },
    },
    {
        name: "MS再詠唱時間減少",
        levels: [7, 6, 5, 3, 2, 1, 0],

        handler(level, skill) {
            const _adj = {
                7: 1.4, 6: 1.2, 5: 1.0,
                3: 0.6, 2: 0.4, 1: 0.2,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    if(skill.name == "メテオストーム") {
                        status.delay_sub += _adj;
                    }
                }
            }
        },
    },
    {
        name: "LoV再詠唱時間減少",
        levels: [7, 6, 5, 3, 2, 1, 0],

        handler(level, skill) {
            const _adj = {
                7: 1.4, 6: 1.2, 5: 1.0,
                3: 0.6, 2: 0.4, 1: 0.2,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    if(skill.name == "ロードオブヴァーミリオン") {
                        status.delay_sub += _adj;
                    }
                }
            }
        },
    },
    {
        name: "SG再詠唱時間減少",
        levels: [7, 6, 5, 3, 2, 1, 0],

        handler(level, skill) {
            const _adj = {
                7: 1.4, 6: 1.2, 5: 1.0,
                3: 0.6, 2: 0.4, 1: 0.2,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    if(skill.name == "ストームガスト") {
                        status.delay_sub += _adj;
                    }
                }
            }
        },
    },
    {
        name: "HB再詠唱時間減少",
        levels: [7, 6, 4, 3, 0],

        handler(level, skill) {
            const _adj = {
                7: 1.4, 6: 1.2,
                4: 0.8, 3: 0.6,
                0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    if(skill.name == "ヘキサブレイク") {
                        status.delay_sub += _adj;
                    }
                }
            }
        },
    },

    {
        name: "ME高速詠唱",
        levels: [7, 6, 4, 3, 2, 1, 0],

        handler(level, skill) {
            const _adj = {
                7: 1.1, 6: 1.0,
                4: 0.8, 3: 0.7,
                2: 0.6, 1: 0.5,
                0: 0.0
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    if(skill.name == "マグヌスエクソシズム") {
                        status.fix_cast_sub += _adj;
                    }
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
            handler: (skill) => handler(i, skill),
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
    getHandler({name, level}, skill) {
        return CONVERT_DATA[name][level].handler(skill);
    }
}