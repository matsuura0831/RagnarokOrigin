import { MagicDamageHandler } from "@/lib/MagicDamage";

class DanceSkillData {
    static VERSION = [1, 0];    // major, minor

    constructor(
        name, level,
    ) {
        this.name = name;
        this.level = level || 0;
    }

    serialize() {
        return [
            ...DanceSkillData.VERSION,
            this.name, this.level,
        ];
    }

    clone() {
        return DanceSkillData.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = DanceSkillData.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of DanceSkillData: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of DanceSkillData: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new DanceSkillData(...rest);
    }
}

const DATA = [
    {
        name: "ブラギの詩",
        levels: [5, 4, 3, 2, 1, 0],
        handler(level) {
            const _adj = {
                5: 20, 4: 16, 3: 12, 2: 8, 1: 4, 0: 0
            }[level];

            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.delay_div += _adj;
                }
            }
        }
    },
    {
        name: "アドバンスブラギの詩",
        levels:[7, 6, 4, 3, 2, 1, 0],
        handler(level) {
            const _adj = {
                7: 12, 6: 10, 
                4: 7, 3: 5,
                2: 4, 1: 3,
                0: 0,
            }[level];
            
            return new class extends MagicDamageHandler {
                run(status, ismin, ismax) {
                    status.skill_up += _adj;
                }
            }
        }
    }
];

const CONVERT_DATA = {};
DATA.forEach(({ name, levels, handler, tips = '' }) => {
    let m = {};
    levels.forEach(i => {
        m[i] = {
            instance: new DanceSkillData(name, i),
            handler: handler(i),
            tips: tips,
        };
    });
    CONVERT_DATA[name] = m;
})


export default {
    data: CONVERT_DATA,
    clazz: DanceSkillData,

    getSkill(name, level) {
        const m = CONVERT_DATA[name];
        const lv = level || 0;
        return m[lv].instance.clone();
    },
    getHandler({name, level}) {
        return CONVERT_DATA[name][level].handler;
    },
    getTips({name, level}) {
        return CONVERT_DATA[name][level].tips;
    }
}