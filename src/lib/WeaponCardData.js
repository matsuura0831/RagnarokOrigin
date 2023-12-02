import { MagicDamageHandler } from "@/lib/MagicDamage";
import AutoSpellData from "@/lib/AutoSpellData";

export class WeaponCard {
    static VERSION = [1, 0];    // major, minor

    constructor(
        name,
        custom_effects
    ) {
        this.name = name;
        this.custom_effects = custom_effects || { };
    }

    serialize() {
        return [
            ...WeaponCard.VERSION,
            this.name,
            this.custom_effects
        ];
    }

    clone() {
        return WeaponCard.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = WeaponCard.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of WeaponCard: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of WeaponCard: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new WeaponCard(...rest);
    }
}

const DATA = [
    {
        name: "その他",
        handler(w) {
            return new MagicDamageHandler();
        },
    }
]

const AS_DATA = [
    ["ピットマン", [15, 1], "ヘブンズドライブLv5取得済みで計算します"],
    ["レッドエルマ", [15, 1], ""],
    ["ブラッディナイトR", [15, 1], ""],
    ["ブラッディナイト", [15, 1], ""],
    ["ミュータントドラゴン", [15, 10, 5, 1], ""],
];

AS_DATA.forEach(o => {
    let [k, levels, tips] = o;

    levels.forEach(l => {
        let as = AutoSpellData.getAutoSpell(k, l);
        let h = AutoSpellData.getHandler(as);
        let label = `${k} Lv${l}`;

        DATA.push({
            name: label,
            handler: () => h,
            tips: tips,
        })
    })
})


const CONVERT_DATA = {};
DATA.forEach(obj => {
    const {
        custom_effects,
        name, handler, tips = ""
    } = obj;

    const w = new WeaponCard(name, custom_effects);

    CONVERT_DATA[name] = {
        instance: w,
        tips: tips,
        handler: (w, s) => handler(w, s)
    }
})

export default {
    data: CONVERT_DATA,
    clazz: WeaponCard,

    getWeaponCard(name) {
        return CONVERT_DATA[name].instance.clone();
    },
    getHandler(name) {
        return CONVERT_DATA[name].handler();
    },
    getTips(name) {
        return CONVERT_DATA[name].tips;
    }
}