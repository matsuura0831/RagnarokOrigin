import { MagicDamageHandler } from "@/lib/MagicDamage";

export class Armor {
    static VERSION = [1, 0];    // major, minor

    constructor(
        name,
        set_effects
    ) {
        this.name = name;
        this.set_effects = set_effects || {};
    }

    serialize() {
        return [
            ...Armor.VERSION,
            this.name,
            this.set_effects,
        ];
    }

    clone() {
        return Armor.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = Armor.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of Armor: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of Armor: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new Armor(...rest);
    }
}

const DATA = [
    {
        name: "魔力の支配者のセット",
        handler(w) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.skill_up += w.set_effects.skill_up;
                }
            };
        },
        set_effects: {
            skill_up: 30,
        },
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

    const w = new Armor(name, set_effects);

    CONVERT_DATA[name] = {
        instance: w,
        tips: tips,
        handler: (w) => handler(w)
    }
})

export default {
    data: CONVERT_DATA,
    clazz: Armor,

    getArmor(name) {
        return CONVERT_DATA[name].instance.clone();
    },
    getHandler(w) {
        return CONVERT_DATA[w.name].handler(w);
    },
    getTips(name) {
        return CONVERT_DATA[name].tips || "";
    }
}