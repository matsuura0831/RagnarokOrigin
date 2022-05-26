import { MagicDamageHandler } from "@/lib/MagicDamage";

export class Weapon {
    static VERSION = [4, 0];    // major, minor

    constructor(
        name,
        // 精練
        refine_effects,
        // 改造
        custom_effects
    ) {
        this.name = name;
        this.refine_effects = refine_effects || {};
        this.custom_effects = custom_effects || { skill_up: 0 };
    }

    serialize() {
        return [
            ...Weapon.VERSION,
            this.name,
            this.refine_effects,
            this.custom_effects
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
                        const name = obj.skill.name;

                        if(name == 'ファイアーボルト') return v * (100 + w.refine_effects.skill_up_fb) / 100;
                        if(name == 'ファイアーボール') return v * (100 + w.refine_effects.skill_up_fbl) / 100;
                        if(name == 'メテオストーム') return v * (100 + w.refine_effects.skill_up_ms) / 100;
                        return v;
                    }
                },
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.custom_effects.skill_up) / 100;
                    }
                },
            ];
        },
        refine_effects: {
            skill_up_fb: 18,
            skill_up_fbl: 18,
            skill_up_ms: 14,
        },
        tips: "武器効果「火属性ダメージ+」は特殊ステータス > 属性ダメージアップに手動で入力してください",
    },
    {
        name: "疾風の杖",
        handler(w) {
            return [
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        const name = obj.skill.name;

                        if(name == 'ライトニングボルト') return v * (100 + w.refine_effects.skill_up_lb) / 100;
                        if(name == 'ユピテルサンダー') return v * (100 + w.refine_effects.skill_up_jt) / 100;
                        if(name == 'ロードオブヴァーミリオン') return v * (100 + w.refine_effects.skill_up_lov) / 100;
                        return v;
                    }
                },
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.custom_effects.skill_up) / 100;
                    }
                },
            ];
        },
        refine_effects: {
            skill_up_lb: 18,
            skill_up_jt: 18,
            skill_up_lov: 14,
        },
        tips: "武器効果「風属性ダメージ+」は特殊ステータス > 属性ダメージアップに手動で入力してください",
    },
    {
        name: "古代海流の杖",
        handler(w) {
            return [
                new class extends MagicDamageHandler {
                    priority() { return 1; }
                    skill_up(v, obj, ismin, ismax) {
                        if(obj.skill.element == '水') return v + w.refine_effects.skill_mul_up_water;
                        return v;
                    }
                },
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.custom_effects.skill_up) / 100;
                    }
                    f_cast(v, obj) {
                        if(obj.skill.element == '水') return v * (100 - w.refine_effects.fcast_water) / 100;
                        return v;
                    }
                },
            ];
        },
        refine_effects: {
            skill_mul_up_water: 200,
            fcast_water: 20,
        },
        tips: "武器効果「水属性ダメージ+」は特殊ステータス > 属性ダメージアップに手動で入力してください",
    },
    {
        name: "ホーリーステッキ",
        handler(w) {
            return [
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        if(obj.skill.name == 'マグヌスエクソシズム') return v * (100 + w.refine_effects.skill_up_me) / 100;
                        return v;
                    }
                    ignore_mdef(v, obj, ismin, ismax) {
                        if(obj.skill.name == 'マグヌスエクソシズム') return v + w.refine_effects.ignore_mdef_me;
                        return v;
                    }
                    v_cast(v, obj) {
                        if(obj.skill.name == 'マグヌスエクソシズム') return v * (100 - w.refine_effects.vcast_me) / 100;
                        return v;
                    }
                    f_cast(v, obj) {
                        if(obj.skill.name == 'マグヌスエクソシズム') return v - w.refine_effects.fcast_me;
                        return v;
                    }
                },
                new class extends MagicDamageHandler {
                    skill_up(v, obj, ismin, ismax) {
                        return v * (100 + w.custom_effects.skill_up) / 100;
                    }
                },
            ];
        },
        refine_effects: {
            skill_up_me: 14,
            ignore_mdef_me: 100,
            vcast_me: 50,
            fcast_me: 1,
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
        // 精練
        refine_effects,
        // 改造
        custom_effects,

        name, handler, tips
    } = obj;

    const w = new Weapon(name, refine_effects, custom_effects);

    CONVERT_DATA[name] = {
        instance: w,
        tips: tips,
        handler: (w) => handler(w)
    }
})



export default {
    data: CONVERT_DATA,
    clazz: Weapon,

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