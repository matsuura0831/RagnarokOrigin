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
        handler(w, skill) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;
                    if(name == 'ファイアーボルト') status.specific_skill_up += w.refine_effects.skill_up_fb;
                    if(name == 'ファイアーボール') status.specific_skill_up += w.refine_effects.skill_up_fbl;
                    if(name == 'メテオストーム')   status.specific_skill_up += w.refine_effects.skill_up_ms;

                    if(skill.element == "火") status.element_damage_up += w.refine_effects.element_damage_up;
                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            skill_up_fb: 19,
            skill_up_fbl: 19,
            skill_up_ms: 16,
            element_damage_up: 19+9+16,
        },
        tips: "「火属性ダメージ+〇%」を特殊ステータス > 属性ダメージアップに反映済みの場合は武器効果欄の該当箇所を0にしてください",
    },
    {
        name: "疾風の杖",
        handler(w, skill) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;
                    if(name == 'ライトニングボルト') status.specific_skill_up += w.refine_effects.skill_up_lb;
                    if(name == 'ユピテルサンダー') status.specific_skill_up += w.refine_effects.skill_up_jt;
                    if(name == 'ロードオブヴァーミリオン')   status.specific_skill_up += w.refine_effects.skill_up_lov;

                    if(skill.element == "風") status.element_damage_up += w.refine_effects.element_damage_up;
                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            skill_up_lb: 19,
            skill_up_jt: 19,
            skill_up_lov: 16,
            element_damage_up: 19+9+16,
        },
        tips: "「風属性ダメージ+〇%」を特殊ステータス > 属性ダメージアップに反映済みの場合は武器効果欄の該当箇所を0にしてください",
    },
    {
        name: "古代海流の杖", 
        handler(w, skill) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;
                    if(skill.element == '水') {
                        status.skill_add += w.refine_effects.skill_mul_up_water;
                        status.fix_cast_div += w.refine_effects.fcast_water;
                    }

                    if(skill.element == "水") status.element_damage_up += w.refine_effects.element_damage_up;
                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            skill_mul_up_water: 200,
            fcast_water: 20,
            element_damage_up: 15,
        },
        tips: "「水属性ダメージ+〇%」を特殊ステータス > 属性ダメージアップに反映済みの場合は武器効果欄の該当箇所を0にしてください．<br/>泡の計算は現在無効です",
    },
    {
        name: "ホーリーステッキ",
        handler(w, skill) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;
                    if(name == 'マグヌスエクソシズム') {
                        status.specific_skill_up += w.refine_effects.skill_up_me;
                        status.ignore_mdef_div += w.refine_effects.ignore_mdef_me;
                        status.variable_cast_div += w.refine_effects.vcast_me;
                        status.fix_cast_sub += w.refine_effects.fcast_me;
                    }
                    
                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
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
        handler: (w, s) => handler(w, s)
    }
})



export default {
    data: CONVERT_DATA,
    clazz: Weapon,

    getWeapon(name) {
        return CONVERT_DATA[name].instance.clone();
    },
    getHandler(w, skill) {
        return CONVERT_DATA[w.name].handler(w, skill);
    },
    getTips(name) {
        return CONVERT_DATA[name].tips || "";
    }
}