import { MagicDamageHandler } from "@/lib/MagicDamage";
import AutoSpellData from "@/lib/AutoSpellData";

export class Weapon {
    static VERSION = [5, 0];    // major, minor

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
                    if (name == 'ファイアーボルト') status.specific_skill_up += w.refine_effects.skill_up_fb;
                    if (name == 'ファイアーボール') status.specific_skill_up += w.refine_effects.skill_up_fbl;
                    if (name == 'メテオストーム') status.specific_skill_up += w.refine_effects.skill_up_ms;

                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            skill_up_fb: 19,
            skill_up_fbl: 19,
            skill_up_ms: 16,
        },
        tips: "「火属性ダメージ+〇%」を特殊ステータス > 属性ダメージアップに手動で反映してください",
    },
    {
        name: "疾風の杖",
        handler(w, skill) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;
                    if (name == 'ライトニングボルト') status.specific_skill_up += w.refine_effects.skill_up_lb;
                    if (name == 'ユピテルサンダー') status.specific_skill_up += w.refine_effects.skill_up_jt;
                    if (name == 'ロードオブヴァーミリオン') status.specific_skill_up += w.refine_effects.skill_up_lov;

                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            skill_up_lb: 19,
            skill_up_jt: 19,
            skill_up_lov: 16,
        },
        tips: "「風属性ダメージ+〇%」を特殊ステータス > 属性ダメージアップに手動で反映してください",
    },
    {
        name: "古代海龍の杖",
        handler(w, skill) {
            const target = "古代海龍の杖";

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    if (skill.element == '水') {
                        status.skill_add += w.refine_effects.skill_mul_up_water;
                        status.fix_cast_div += w.refine_effects.fcast_water;
                    }

                    let as = AutoSpellData.getAutoSpell(target, 1);
                    as.mul = w.refine_effects.bubble_mul;
                    status.pursuits[target] = as;

                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            skill_mul_up_water: 200,
            fcast_water: 20,
            bubble_mul: 300,
        },
        tips: "「水属性ダメージ+〇%」を特殊ステータス > 属性ダメージアップに手動で反映してください",
    },
    {
        name: "ホーリーステッキ",
        handler(w, skill) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;
                    if (name == 'マグヌスエクソシズム') {
                        status.specific_skill_up += w.refine_effects.skill_up_me;
                        status.ignore_mdef_div += w.refine_effects.ignore_mdef_div;
                        status.variable_cast_div += w.refine_effects.vcast_div;
                        status.fix_cast_sub += w.refine_effects.fcast_sub;
                    }
                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            skill_up_me: 14,
            ignore_mdef_div: 100,
            vcast_div: 50,
            fcast_sub: 1,
        },
    },
    {
        name: "元素の法則",
        handler(w, skill) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;
                    if (name == 'ファイアーボルト' || name == "ライトニングボルト" || name == "コールドボルト" || name == "アーススパイク") {
                        status.specific_skill_up += w.refine_effects.skill_up_bolt;
                        status.delay_sub += w.refine_effects.delay_sub;
                    }
                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            skill_up_bolt: 14,
            delay_sub: 0.4,
        },
        tips: "「属性ダメージ+〇%」を特殊ステータス > 属性ダメージアップに手動で反映してください",
    },
    {
        name: "タブレット",
        handler(w, skill) {
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;
                    if (name == 'サイキックウェーブ') {
                        status.magic_add += w.refine_effects.magic_add;
                        status.fix_cast_sub += w.refine_effects.fcast_sub;
                        status.specific_skill_up += w.refine_effects.skill_up_pw;
                        status.ignore_mdef_div += w.refine_effects.ignore_mdef_div;
                        status.delay_sub += w.refine_effects.delay_sub;
                    }
                    status.custom_skill_up += w.custom_effects.skill_up;
                }
            };
        },
        refine_effects: {
            magic_add: 16,
            fcast_sub: 1,
            skill_up_pw: 14,
            ignore_mdef_div: 50,
            delay_sub: 1,

        },
        tips: "「無属性ダメージ+〇%」を特殊ステータス > 属性ダメージアップに手動で反映してください",
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