import { MagicDamageHandler } from "@/lib/MagicDamage";

class AutoSpellSkill {
    static VERSION = [1, 0];    // major, minor

    constructor(
        name, alias, element, level, mul, add, prob, hit, ct,
        target_skill, target_element,
    ) {
        this.name = name;
        this.alias = alias;
        this.element = element;
        this.level = level;
        this.mul = mul;
        this.add = add;
        this.prob = prob;
        this.hit = hit;
        this.ct = ct;
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
            this.name, this.alias, this.element, this.level, this.mul, this.add, this.prob, this.hit, this.ct,
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
        element: "火",
        target_skill: 'ファイアーボルト',
        records: [
            { level: 10, mul: 600, prob: 50, ct: 1, hit: 1 },
            { level: 7, mul: 450, prob: 42, ct: 1, hit: 1 },
            { level: 6, mul: 400, prob: 40, ct: 1, hit: 1 },
            { level: 4, mul: 300, prob: 36, ct: 1, hit: 1 },
            { level: 3, mul: 250, prob: 34, ct: 1, hit: 1 },
            { level: 2, mul: 200, prob: 32, ct: 1, hit: 1 },
            { level: 1, mul: 150, prob: 30, ct: 1, hit: 1 },
            { level: 0, mul: 0, prob: 0, ct: 1, hit: 0 },
        ]
    },
    {
        name: "アドバンスLB",
        element: "風",
        target_skill: 'ライトニングボルト',
        records: [
            { level: 10, mul: 600, prob: 50, ct: 1, hit: 1 },
            { level: 7, mul: 450, prob: 42, ct: 1, hit: 1 },
            { level: 6, mul: 400, prob: 40, ct: 1, hit: 1 },
            { level: 4, mul: 300, prob: 36, ct: 1, hit: 1 },
            { level: 3, mul: 250, prob: 34, ct: 1, hit: 1 },
            { level: 2, mul: 200, prob: 32, ct: 1, hit: 1 },
            { level: 1, mul: 150, prob: 30, ct: 1, hit: 1 },
            { level: 0, mul: 0, prob: 0, ct: 1, hit: 0 },
        ]
    },
    {
        name: "アドバンスCB",
        element: "水",
        target_skill: 'コールドボルト',
        records: [
            { level: 10, mul: 600, prob: 50, ct: 1, hit: 1 },
            { level: 7, mul: 450, prob: 42, ct: 1, hit: 1 },
            { level: 6, mul: 400, prob: 40, ct: 1, hit: 1 },
            { level: 4, mul: 300, prob: 36, ct: 1, hit: 1 },
            { level: 3, mul: 250, prob: 34, ct: 1, hit: 1 },
            { level: 2, mul: 200, prob: 32, ct: 1, hit: 1 },
            { level: 1, mul: 150, prob: 30, ct: 1, hit: 1 },
            { level: 0, mul: 0, prob: 0, ct: 1, hit: 0 },
        ]
    },
    {
        name: "アドバンスMS",
        element: "火",
        target_skill: 'メテオストーム',
        records: [
            { level: 10, mul: 550, prob: 100, ct: 0, hit: 5 },
            { level: 7, mul: 550, prob: 100, ct: 0, hit: 5 },
            { level: 0, mul: 0, prob: 0, ct: 0, hit: 0 },
        ]
    },
    {
        name: "磁気嵐パルス装置",
        element: "風",
        target_skill: 'ロードオブヴァーミリオン',
        records: [
            { level: 10, mul: 600, prob: 100, ct: 0, hit: 1 },
            { level: 7, mul: 400, prob: 100, ct: 0, hit: 1 },
            { level: 6, mul: 350, prob: 100, ct: 0, hit: 1 },
            { level: 4, mul: 250, prob: 100, ct: 0, hit: 1 },
            { level: 3, mul: 200, prob: 100, ct: 0, hit: 1 },
            { level: 2, mul: 150, prob: 100, ct: 0, hit: 1 },
            { level: 1, mul: 100, prob: 100, ct: 0, hit: 1 },
            { level: 0, mul: 0, prob: 0, ct: 0, hit: 0 },
        ]
    },
    {
        name: "アドバンスSG",
        element: "無",
        target_skill: 'ストームガスト',
        records: [
            { level: 10, mul: 100, prob: 100, ct: 0, hit: 4.5 / 0.5 },
            { level: 0, mul: 0, prob: 0, ct: 0, hit: 0 },
        ]
    },
    {
        name: "古代海龍の杖",
        element: "無",
        target_element: "水",
        records: [
            { level: 1, mul: 0, prob: 100, ct: 1, hit: 1 }, // 倍率は武器の処理の中で上書きする
            { level: 0, mul: 0, prob: 0, ct: 1, hit: 0 },
        ]
    },

    {
        name: "ピットマン",
        alias: "ヘブンズドライブ",
        element: "地",
        records: [
            { level:15, mul: 1000, add: 225, prob:10, ct: 0, hit: 1 },
            { level: 1, mul: 1000, add: 225, prob: 5, ct: 0, hit: 1 },
            { level: 0, mul:    0, add:   0, prob: 0, ct: 0, hit: 0 },
        ],
        tips: "ヘブンズドライブLv5取得済みとして計算します",
    },
    {
        name: "レッドエルマ",
        alias: "ウォーターボール",
        element: "水",
        records: [
            { level:15, mul: 1500/15, add: 1005/15, prob:10, ct: 1, hit: 15 },
            { level: 1, mul: 1500/15, add: 1005/15, prob: 5, ct: 1, hit: 15 },
            { level: 0, mul:    0, add:    0, prob: 0, ct: 1, hit:  0 },
        ],
    },
    {
        name: "ブラッディナイトR",
        alias: "メテオストーム",
        element: "火",
        records: [
            { level: 15, mul: 220, add: 18, prob: 5, ct: 7, hit: 5 },
            { level: 1, mul: 220, add: 18, prob: 3, ct: 7, hit: 5 },
            { level: 0, mul:   0, add: 0, prob: 0, ct: 1, hit: 0 },
        ],
    },
    {
        name: "ブラッディナイト",
        alias: "メテオストーム",
        element: "火",
        records: [
            { level: 15, mul: 330, add: 63, prob: 10, ct: 7, hit: 7 },
            { level: 1, mul: 330, add: 63, prob: 5, ct: 7, hit: 7 },
            { level: 0, mul:   0, add: 0, prob: 0, ct: 1, hit: 0 },
        ],
    },
    {
        name: "ミュータントドラゴン",
        alias: "ファイアードラゴンブレス",
        element: "火",
        records: [
            { level: 15, mul: 400, add: 0, prob: 30, ct: 0, hit: 1 },
            { level: 10, mul: 400, add: 0, prob: 30, ct: 2, hit: 1 },
            { level: 5, mul: 400, add: 0, prob: 24, ct: 2, hit: 1 },
            { level: 1, mul: 400, add: 0, prob: 20, ct: 2, hit: 1 },
            { level: 0, mul:   0, add: 0, prob: 0, ct: 1, hit: 0 },
        ],
    },
    {
        name: "マーリン",
        alias: "ライトニングボルト",
        element: "風",
        records: [
            { level: 1, mul: 200, add: 32, prob: 5, ct: 2, hit: 1 },
            { level: 0, mul:   0, add:  0, prob: 0, ct: 2, hit: 0 },
        ],
    },
    {
        name: "ボールステッカー",
        alias: "ウォーターボール",
        element: "水",
        show: true,
        records: [
            { level: 1, mul: 800/15, add: 250/15, prob: 3, ct: 0.5, hit: 15 },
            { level: 0, mul:   0, add:   0, prob: 0, ct: 0.5, hit:  0 },
        ],
    },
    {
        name: "ピクニックハット",
        alias: "ウォーターボール",
        element: "水",
        show: true,
        records: [
            { level: 1, mul: 800/15, add: 250/15, prob: 1, ct: 0.5, hit: 15 },
            { level: 0, mul:   0, add:   0, prob: 0, ct: 0.5, hit:  0 },
        ],
    },
    {
        name: "アクアオーブ",
        alias: "超水流",
        element: "水",
        records: [
            { level: 1, mul: 350, add: 0, prob: 10, ct: 0, hit: 1 },
            { level: 0, mul:   0, add: 0, prob:  0, ct: 0, hit: 0 },
        ],
    },


];

const CONVERT_DATA = {};
const CONVERT_DISPLAY_DATA = {};
DATA.forEach(({ name, element, records, target_skill = undefined, target_element = undefined, show = false, tips = '', alias = '' }) => {
    let m = {};

    records.forEach(({ level, mul, prob, ct, hit, add = 0 }) => {
        let instance = new AutoSpellSkill(name, alias, element, level, mul, add, prob, hit, ct, target_skill, target_element);

        m[level] = {
            instance: instance,
            tips: tips,
            handler() {
                return new class extends MagicDamageHandler {
                    run(status, ismin, ismax) {
                        if(level > 0) {
                            if(name in status.pursuits) {
                                // 同名がある場合は確率を加算する
                                status.pursuits[name].prob += instance.prob;
                            } else {
                                status.pursuits[name] = instance.clone();
                            }
                        }
                    }
                }
            },
        }
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