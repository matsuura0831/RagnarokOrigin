import { MagicDamageHandler } from "@/lib/MagicDamage";
import ElementalRelation from "@/lib/ElementalRelation";

class SubSkillData {
    static VERSION = [1, 1];    // major, minor

    constructor(
        name, level,
    ) {
        this.name = name;
        this.level = level || 0;
    }

    serialize() {
        return [
            ...SubSkillData.VERSION,
            this.name, this.level,
        ];
    }

    clone() {
        return SubSkillData.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = SubSkillData.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of SubSkillData: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of SubSkillData: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new SubSkillData(...rest);
    }
}

const DATA = [
    {
        name: "属性感知",
        levels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],

        handler(level, skill, enemy) {
            const _adj = {
                10: 25, 9: 22, 8: 19, 7: 16, 6: 13,
                5: 10, 4: 8, 3: 6, 2: 4, 1: 2, 0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const rel = ElementalRelation[skill.element][enemy.element];

                    if(rel > 0 && ['風', '地', '火', '水', '念'].includes(skill.element)) {
                        status.element_relation_add += _adj;
                    }
                }
            }
        },
    },
    {
        name: "ダブルキャスト",
        levels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],

        handler(level, skill, enemy) {
            const _adj = {
                10: 50, 9: 47, 8: 44, 7: 41, 6: 38,
                 5: 35, 4: 32, 3: 29, 2: 26, 1: 23,
                 0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    const name = skill.name;

                    if(name == 'ファイアーボルト' || name == "ライトニングボルト" || name == "コールドボルト" || name == "アーススパイク") {
                        status.double_cast_mul += _adj;
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
            instance: new SubSkillData(name, i),
            handler: (skill, enemy) => handler(i, skill, enemy),
        };
    });
    CONVERT_DATA[name] = m;
})


export default {
    data: CONVERT_DATA,
    clazz: SubSkillData,

    getSkill(name, level) {
        const m = CONVERT_DATA[name];
        const lv = level || 0;
        return m[lv].instance.clone();
    },
    getHandler({name, level}, skill, enemy) {
        return CONVERT_DATA[name][level].handler(skill, enemy);
    }
}