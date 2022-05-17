import { MagicDamageHandler } from "@/lib/MagicDamage";

class SubSkillData {
    static VERSION = [1, 0];    // major, minor

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

        handler(level) {
            const _adj = {
                10: 25, 9: 22, 8: 19, 7: 16, 6: 13,
                5: 10, 4: 8, 3: 6, 2: 4, 1: 2, 0: 0,
            }[level];

            return new class extends MagicDamageHandler {
                element_relation_up(v, obj, ismin, ismax) {
                    if(v > 100 && ['風', '地', '火', '水', '念'].includes(obj.skill.element)) {
                        return v + _adj;
                    }
                    return v;
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
            handler: handler(i),
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
    getHandler({name, level}) {
        return CONVERT_DATA[name][level].handler;
    }
}