import { MagicDamageHandler } from "@/lib/MagicDamage";
import AutoSpellData from "@/lib/AutoSpellData";

export class Accessory {
    static VERSION = [1, 0];    // major, minor

    constructor(
        name,
    ) {
        this.name = name;
    }

    serialize() {
        return [
            ...Accessory.VERSION,
            this.name,
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
        name: "その他",
        handler() {
            return new MagicDamageHandler();
        },
    },
    {
        name: "ペンダントオブハーモニー",
        handler() {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    // 2個装着した場合は最終倍率(150)は変わらない
                    status.last_up = 150;

                    status.last_up_prob += 10;
                    status.skill_up += 5;
                }
            };
        },
    },
]

const AS_DATA = [
    ["アクアオーブ", [1], ""],
];

AS_DATA.forEach(o => {
    let [k, levels, tips] = o;

    levels.forEach(l => {
        let as = AutoSpellData.getAutoSpell(k, l);
        let h = AutoSpellData.getHandler(as);

        DATA.push({
            name: k,
            handler: () => h,
            tips: tips,
        })
    })
})


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

    getAccessory(name) {
        return CONVERT_DATA[name].instance.clone();
    },
    getHandler(name) {
        return CONVERT_DATA[name].handler();
    },
    getTips(name) {
        return CONVERT_DATA[name].tips || "";
    }
}