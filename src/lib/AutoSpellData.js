import { MagicDamageHandler } from "@/lib/MagicDamage";

class AutoSpellSkill {
    static VERSION = [4, 0];    // major, minor

    constructor(
        name, level, prob, ct, spells,
        target_skill, target_element,
    ) {
        this.name = name;
        this.level = level;
        this.prob = prob;
        this.ct = ct;
        this.spells = spells || [];
        this.target_skill = target_skill || undefined;
        this.target_element = target_element || undefined;
    }

    check(skill_name, skill_element) {
        if (this.target_skill && this.target_skill != skill_name) return false;
        if (this.target_element && this.target_element != skill_element) return false;
        return true;
    }

    serialize() {
        return [
            ...AutoSpellSkill.VERSION,
            this.name, this.level, this.prob, this.ct, this.spells,
            this.target_skill, this.target_element,
        ];
    }

    clone() {
        return AutoSpellSkill.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = AutoSpellSkill.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of AutoSpellSkill: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of AUtoSpellSkill: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new AutoSpellSkill(...rest);
    }
}

const DATA = [
    {
        name: "アドバンスFB",
        target_skill: 'ファイアーボルト',
        records: [
            { level: 10, prob: 50, ct: 1, spells: [ { spell: "アドバンスFB", level: 10, prob: 100 }, ]},
            { level: 7, prob: 42, ct: 1, spells: [ { spell: "アドバンスFB", level: 7, prob: 100 }, ]},
            { level: 6, prob: 40, ct: 1, spells: [ { spell: "アドバンスFB", level: 6, prob: 100 }, ]},
            { level: 4, prob: 36, ct: 1, spells: [ { spell: "アドバンスFB", level: 4, prob: 100 }, ]},
            { level: 3, prob: 34, ct: 1, spells: [ { spell: "アドバンスFB", level: 3, prob: 100 }, ]},
            { level: 2, prob: 32, ct: 1, spells: [ { spell: "アドバンスFB", level: 2, prob: 100 }, ]},
            { level: 1, prob: 30, ct: 1, spells: [ { spell: "アドバンスFB", level: 1, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ]
    },
    {
        name: "アドバンスLB",
        target_skill: 'ライトニングボルト',
        records: [
            { level: 10, prob: 50, ct: 1, spells: [ { spell: "アドバンスLB", level: 10, prob: 100 }, ]},
            { level: 7, prob: 42, ct: 1, spells: [ { spell: "アドバンスLB", level: 7, prob: 100 }, ]},
            { level: 6, prob: 40, ct: 1, spells: [ { spell: "アドバンスLB", level: 6, prob: 100 }, ]},
            { level: 4, prob: 36, ct: 1, spells: [ { spell: "アドバンスLB", level: 4, prob: 100 }, ]},
            { level: 3, prob: 34, ct: 1, spells: [ { spell: "アドバンスLB", level: 3, prob: 100 }, ]},
            { level: 2, prob: 32, ct: 1, spells: [ { spell: "アドバンスLB", level: 2, prob: 100 }, ]},
            { level: 1, prob: 30, ct: 1, spells: [ { spell: "アドバンスLB", level: 1, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ]
    },
    {
        name: "アドバンスCB",
        target_skill: 'コールドボルト',
        records: [
            { level: 10, prob: 50, ct: 1, spells: [ { spell: "アドバンスCB", level: 10, prob: 100 }, ]},
            { level: 7, prob: 42, ct: 1, spells: [ { spell: "アドバンスCB", level: 7, prob: 100 }, ]},
            { level: 6, prob: 40, ct: 1, spells: [ { spell: "アドバンスCB", level: 6, prob: 100 }, ]},
            { level: 4, prob: 36, ct: 1, spells: [ { spell: "アドバンスCB", level: 4, prob: 100 }, ]},
            { level: 3, prob: 34, ct: 1, spells: [ { spell: "アドバンスCB", level: 3, prob: 100 }, ]},
            { level: 2, prob: 32, ct: 1, spells: [ { spell: "アドバンスCB", level: 2, prob: 100 }, ]},
            { level: 1, prob: 30, ct: 1, spells: [ { spell: "アドバンスCB", level: 1, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ]
    },
    {
        name: "アドバンスMS",
        target_skill: 'メテオストーム',
        records: [
            { level: 10, prob: 100, ct: 0, spells: [ { spell: "アドバンスMS", level: 10, prob: 100 }, ]},
            { level: 7, prob: 100, ct: 0, spells: [ { spell: "アドバンスMS", level: 10, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ]
    },
    {
        name: "磁気嵐パルス装置",
        target_skill: 'ロードオブヴァーミリオン',
        records: [
            { level: 10, prob: 100, ct: 0, spells: [ { spell: "磁気嵐パルス装置", level: 10, prob: 100 }, ]},
            { level: 7, prob: 100, ct: 0, spells: [ { spell: "磁気嵐パルス装置", level: 7, prob: 100 }, ]},
            { level: 6, prob: 100, ct: 0, spells: [ { spell: "磁気嵐パルス装置", level: 6, prob: 100 }, ]},
            { level: 4, prob: 100, ct: 0, spells: [ { spell: "磁気嵐パルス装置", level: 4, prob: 100 }, ]},
            { level: 3, prob: 100, ct: 0, spells: [ { spell: "磁気嵐パルス装置", level: 3, prob: 100 }, ]},
            { level: 2, prob: 100, ct: 0, spells: [ { spell: "磁気嵐パルス装置", level: 2, prob: 100 }, ]},
            { level: 1, prob: 100, ct: 0, spells: [ { spell: "磁気嵐パルス装置", level: 1, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ]
    },
    {
        name: "アドバンスSG",
        target_skill: 'ストームガスト',
        records: [
            { level: 10, prob: 100, ct: 0, spells: [ { spell: "アドバンスSG", level: 10, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ]
    },
    {
        name: "古代海龍の杖",
        target_element: "水",
        records: [
            { level: 1, prob: 100, ct: 1, spells: [ { spell: "古代海龍の杖", level: 1, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ]
    },

    {
        name: "ピットマン",
        records: [
            { level: 15, prob: 10, ct: 2, spells: [ { spell: "ヘブンズドライブ", level: 5, prob: 100 }, ]},
            { level: 1, prob: 5, ct: 2, spells: [ { spell: "ヘブンズドライブ", level: 5, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
        tips: "ヘブンズドライブLv5取得済みとして計算します",
    },
    {
        name: "レッドエルマ",
        records: [
            { level: 15, prob: 10, ct: 1, spells: [ { spell: "ウォーターボール", level: 10, prob: 100 }, ]},
            { level: 1, prob: 5, ct: 1, spells: [ { spell: "ウォーターボール", level: 10, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "ブラッディナイトR",
        records: [
            { level: 15, prob: 5, ct: 7, spells: [ { spell: "メテオストーム", level: 3, prob: 100 }, ]},
            { level: 1, prob: 3, ct: 7, spells: [ { spell: "メテオストーム", level: 3, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "ブラッディナイト",
        records: [
            { level: 15, prob: 10, ct: 7, spells: [ { spell: "メテオストーム", level: 6, prob: 100 }, ]},
            { level: 1, prob: 5, ct: 7, spells: [ { spell: "メテオストーム", level: 6, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "ミュータントドラゴン",
        records: [
            { level: 15, prob: 30, ct: 0, spells: [ { spell: "ファイアードラゴンブレス", level: 1, prob: 100 }, ]},
            { level: 10, prob: 30, ct: 2, spells: [ { spell: "ファイアードラゴンブレス", level: 1, prob: 100 }, ]},
            { level: 5, prob: 24, ct: 2, spells: [ { spell: "ファイアードラゴンブレス", level: 1, prob: 100 }, ]},
            { level: 1, prob: 20, ct: 2, spells: [ { spell: "ファイアードラゴンブレス", level: 1, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "マーリン",
        records: [
            { level: 1, prob: 5, ct: 2, spells: [ { spell: "ライトニングボルト", level: 2, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "ボールステッカー",
        show: true,
        records: [
            { level: 1, prob: 3, ct: 0.5, spells: [ { spell: "ウォーターボール", level: 5, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "ピクニックハット",
        show: true,
        records: [
            { level: 1, prob: 1, ct: 0.5, spells: [ { spell: "ウォーターボール", level: 5, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "アクアオーブ",
        records: [
            { level: 1, prob: 10, ct: 0, spells: [ { spell: "超水流", level: 1, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "高潔の印/春告げの髪留め",
        show: true,
        records: [
            { level: 1, prob: 3, ct: 10, spells: [ { spell: "ヘキサブレイク", level: 5, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "プーペヘッドドレス",
        show: true,
        records: [
            { level: 1, prob: 3, ct: 0.5, merge_spells: [
                { spell: "ファイアーボルト", level: 5, prob: 100 },
                { spell: "コールドボルト", level: 5, prob: 100 },
                { spell: "ライトニングボルト", level: 5, prob: 100 },
            ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "ヴンダーカンマー",
        show: true,
        records: [
            { level: 1, prob: 100, ct: 0, multi_spells: [
                { spell: "ファイアーボルト", level: 5, prob: 1, ct: 2 },
                { spell: "コールドボルト", level: 5, prob: 1, ct: 2 },
                { spell: "ライトニングボルト", level: 5, prob: 1, ct: 2 },
            ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "蝶々の戯れ",
        show: true,
        records: [
            { level: 1, prob: 5, ct: 5, spells: [ { spell: "ストームガスト", level: 1, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
    {
        name: "飛沫の呪文書",
        show: true,
        records: [
            { level: 1, prob: 3, ct: 0.5, spells: [ { spell: "ウォーターボール", level: 5, prob: 100 }, ]},
            { level: 0, prob: 0, ct: 0, spells: [] },
        ],
    },
];

const CONVERT_DATA = {};
const CONVERT_DISPLAY_DATA = {};
DATA.forEach(({ name, records=[], target_skill = undefined, target_element = undefined, show = false, tips = '' }) => {
    let m = {};

    records.forEach(({ level, prob, ct, spells=[], multi_spells=[], merge_spells=[] }) => {
        let instance = new AutoSpellSkill(name, level, prob, ct, spells, target_skill, target_element);

        m[level] = {
            instance: instance,
            tips: tips,
            handler() {
                return new class extends MagicDamageHandler {
                    run(status, ismin, ismax) {
                        function _set(key, ins) {
                            if(key in status.pursuits) {
                                status.pursuits[key].prob += ins.prob;
                            } else {
                                status.pursuits[key] = ins;
                            }
                        }

                        if(level > 0) {
                            // multi_spells指定がある場合は独立で発生するとして計算する
                            let instances = (spells.length && !multi_spells.length)
                                ? [instance]
                                : multi_spells.map(({ spell, level: spell_level, prob: spell_prob, ct: spell_ct = 0 }) => {
                                    return new AutoSpellSkill(`${name}@${spell}`, spell_level, (prob/100) * (spell_prob/100)*100, ct + spell_ct, [
                                        { spell: spell, level: spell_level, prob: 100 }
                                    ])
                                });
                            instances.forEach(ins => {
                                ins.spells.forEach(spell => {
                                    const key = `${spell.spell}-${spell.level}-${ins.ct}`;

                                    if(key in status.pursuits) {
                                        // 同じ名称で同じレベルのスキル かつ CTが同じスキルの場合は確率を加算するだけ
                                        status.pursuits[key].prob += ins.prob;
                                    } else {
                                        const i = ins.clone();
                                        i.spells = [spell];

                                        status.pursuits[key] = i;
                                    }
                                })
                            });

                            if(merge_spells.length) {
                                const merge_key = `${instance.name}Lv.${instance.level}-CT${instance.ct}`;
                                const merge_ins = instance.clone()
                                merge_ins.spells = merge_spells;
                                _set(merge_key, merge_ins);
                            }
                        }
                    }
                }
            },
        }

        console.log(name, level, m)
    });

    CONVERT_DATA[name] = m;
    if(show) CONVERT_DISPLAY_DATA[name] = m;
})

export default {
    data: CONVERT_DISPLAY_DATA,
    clazz: AutoSpellSkill,

    getAutoSpell(name, level) {
        const m = CONVERT_DATA[name];
        const lv = level || 0;
        return m[lv].instance.clone();
    },
    getHandler({ name, level }) {
        return CONVERT_DATA[name][level].handler();
    },
    getTips({name, level}) {
        return CONVERT_DATA[name][level].tips;
    }
}