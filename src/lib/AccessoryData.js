import { MagicDamageHandler } from "@/lib/MagicDamage";

export class Accessory {
    static VERSION = [1, 0];    // major, minor

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
                skill_up(v, obj, ismin, ismax) {
                    return v * (100 + w.set_effects.skill_up * w.set_effects.repeated) / 100;
                }
            };
        },
        set_effects: {
            skill_up: 5,
            repeated: 4,
        },
    },
    {
        name: "ゲンドゥルの意思",
        handler(w) {
            return new class extends MagicDamageHandler {
                last(v, obj, ismin, ismax) {
                    if(ismin) return v;

                    const matk = obj.total_atk(ismin, ismax);
                    const d = Math.min(matk * w.set_effects.matk_limit / 100, v * w.set_effects.skill_up / 100);

                    if(ismax) return Math.max(v, d);
                    return v * 0.9 + d * 0.1;
                }
            };
        },
        set_effects: {
            skill_up: 250,
            matk_limit: 5000,
        },
        tips: "DPS計算にクールタイム(1s)は考慮されない点にご注意ください",
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