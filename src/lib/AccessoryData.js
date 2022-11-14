import { MagicDamageHandler } from "@/lib/MagicDamage";

export class Accessory {
    static VERSION = [2, 0];    // major, minor

    constructor(
        name,
        set_effects,
    ) {
        this.name = name;
        this.set_effects = set_effects || {};
    }

    serialize() {
        return [
            ...Accessory.VERSION,
            this.name,
            this.set_effects,
        ];
    }

    clone() {
        return Accessory.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = Accessory.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of Accessory: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of Accessory: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new Accessory(...rest);
    }
}

const DATA = [
    {
        name: "ヴァルキリーの栄耀",
        handler(w) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.skill_up += w.set_effects.skill_up * w.set_effects.skill_up_repeated;
                }
            };
        },
        set_effects: {
            skill_up: 5,
            skill_up_repeated: 4,
        },
    },
    {
        name: "ゲンドゥルの意思",
        handler(w) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.last_up += w.set_effects.last_up;
                    status.last_up_prob += 10;
                    status.last_atk_limit += w.set_effects.last_atk_limit;
                }
            };
        },
        set_effects: {
            last_up: 250,
            last_atk_limit: 5000,
        },
        tips: "DPS計算にクールタイム(1s)は考慮されない点にご注意ください",
    },
    {
        name: "知恵の王の降臨",
        handler(w) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.magic_add += w.set_effects.magic_add;
                    status.fix_cast_div += w.set_effects.fix_cast_div;
                    status.delay_div += w.set_effects.delay_div;
                }
            };
        },
        set_effects: {
            magic_add: 30,
            fix_cast_div: 30,
            delay_div: 20,
        },
        tips: "DPS計算にクールタイム(10s)は考慮されない点にご注意ください<br/>知恵の王の指輪の効果「属性ダメージ+3%」は特殊ステータス > 属性ダメージアップに手動で反映してください",
    },
    {
        name: "きらめく夜",
        handler(w) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.magic_damage_up += w.set_effects.magic_damage_up;
                }
            };
        },
        set_effects: {
            magic_damage_up: 20,
        },
        tips: "注意：ステータス欄に反映されるかどうかの確認が取れていません．もし反映される場合は重複効果になるため利用しないでください",
    },
    {
        name: "ペンダントオブハーモニー",
        handler(w) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.last_up += w.set_effects.last_up;
                    status.last_up_prob += w.set_effects.last_up_prob;
                    status.skill_up += w.set_effects.skill_up;
                }
            };
        },
        set_effects: {
            last_up: 150,
            last_up_prob: 10,
            skill_up: 5,
        },
        tips: "2個装備する場合は最終確率およびスキルダメージアップを2倍にしてください",
    },
    {
        name: "その他",
        handler(w) {
            return new MagicDamageHandler();
        },
    }
]

const CONVERT_DATA = {};
DATA.forEach(obj => {
    const {
        set_effects,
        name, handler, tips
    } = obj;

    const w = new Accessory(name, set_effects);

    CONVERT_DATA[name] = {
        instance: w,
        tips: tips,
        handler: (w) => handler(w)
    }
})

export default {
    data: CONVERT_DATA,
    clazz: Accessory,

    getWeapon(name) {
        return CONVERT_DATA[name].instance.clone();
    },
    getHandler(w) {
        return CONVERT_DATA[w.name].handler(w);
    },
    getTips(name) {
        return CONVERT_DATA[name].tips || "";
    }
}