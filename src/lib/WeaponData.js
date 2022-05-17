import { MagicDamageHandler } from "@/lib/MagicDamage";

export class Weapon {
    static VERSION = [3, 0];    // major, minor

    constructor(
        name,
        // 精練
        skill_up,
        skill_mul_up,
        ignore_mdef,
        vcast_p,
        fcast_p,
        fcast_s,
        // 改造
        custom_skill_up
    ) {
        this.name = name;
        this.skill_up = skill_up;
        this.skill_mul_up = skill_mul_up;
        this.ignore_mdef = ignore_mdef;
        this.vcast_p = vcast_p;
        this.fcast_p = fcast_p;
        this.fcast_s = fcast_s;
        
        this.custom_skill_up = custom_skill_up || 0;
    }

    serialize() {
        return [
            ...Weapon.VERSION,
            this.name,
            this.skill_up,
            this.skill_mul_up,
            this.ignore_mdef,
            this.vcast_p,
            this.fcast_p,
            this.fcast_s,
            this.custom_skill_up,
        ];
    }

    clone() {
        return Weapon.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = Weapon.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of Weapon: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of Weapon: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new Weapon(...rest);
    }
}

const DATA = [
    {
        name: "烈火の杖",
        handler(w) {
            return [
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.skill_up) / 100;
                    }
                },
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.custom_skill_up) / 100;
                    }
                },
            ];
        },
        skill_up: 15,
        tips() {
            return "特殊ステータス > 属性ダメージアップに精練効果を反映してください"
        }
    },
    {
        name: "疾風の杖",
        handler(w) {
            return [
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.skill_up) / 100;
                    }
                },
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.custom_skill_up) / 100;
                    }
                },
            ];
        },
        skill_up: 15,
        tips() {
            return "特殊ステータス > 属性ダメージアップに精練効果を反映してください"
        }
    },
    {
        name: "古代海流の杖",
        handler(w) {
            return [
                new class extends MagicDamageHandler {
                    priority() { return 1; }
                    skill_up(v, obj, ismin, ismax) {
                        if(obj.skill.element == '水') return v + w.skill_mul_up;
                        return v;
                    }
                },
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.custom_skill_up) / 100;
                    }
                },
            ];
        },
        skill_mul_up: 200,
        fcast_p: 20,

        tips() {
            return "特殊ステータス > 属性ダメージアップに精練効果を反映してください"
        }
    },
    {
        name: "ホーリーステッキ",
        handler(w) {
            return [
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        if(obj.skill.name == 'マグヌスエクソシズム') return v * (100 + w.skill_up) / 100;
                        return v;
                    }
                },
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.custom_skill_up) / 100;
                    }
                },
            ];
        },
        skill_up: 14,
        ignore_mdef: 100,
        vcast_p: 50,
        fcast_s: 1,

        tips() {
            return "特殊ステータス > 属性ダメージアップに精練効果を反映してください"
        }
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
        // 精練
        skill_up,
        skill_mul_up,
        ignore_mdef,
        vcast_p,
        fcast_p,
        fcast_s,
        // 改造
        custom_skill_up,

        name, handler
    } = obj;

    const w = new Weapon(name, skill_up, skill_mul_up, ignore_mdef, vcast_p, fcast_p, fcast_s, custom_skill_up);

    CONVERT_DATA[name] = {
        instance: w,
        handler: (w) => handler(w)
    }
})



export default {
    data: CONVERT_DATA,
    clazz: Weapon,

    getWeapon(name) {
        const m = CONVERT_DATA[name];
        return m.instance.clone();
    },
    getHandler(w) {
        return CONVERT_DATA[w.name].handler(w);
    }
}