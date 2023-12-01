
class AutoSpellSkill {
    static VERSION = [1, 0];    // major, minor

    constructor(
        name, element, level, mul, add, prob, hit, ct,
        target_skill, target_element,
    ) {
        this.name = name;
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
            this.name, this.element, this.level, this.mul, this.add, this.prob, this.hit, this.ct,
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
        ]
    },
    {
        name: "アドバンスMS",
        element: "火",
        target_skill: 'メテオストーム',
        records: [
            { level: 10, mul: 550 * 5, prob: 100, ct: 0, hit: 5 },
            { level: 7, mul: 550 * 5, prob: 100, ct: 0, hit: 5 },
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
        ]
    },
    {
        name: "アドバンスSG",
        element: "無",
        target_skill: 'ストームガスト',
        records: [
            { level: 10, mul: 100 * (4.5 / 0.5), prob: 100, ct: 0, hit: 4.5 / 0.5 },
        ]
    },
    {
        name: "古代海龍の杖",
        element: "無",
        target_element: "水",
        records: [
            { level: 1, mul: 0, prob: 100, ct: 1, hit: 1 }, // 倍率は武器の処理の中で上書きする
        ]
    },
];

const CONVERT_DATA = {};
DATA.forEach(({ name, element, records, target_skill = undefined, target_element = undefined }) => {
    let m = {};

    records.forEach(({ level, mul, prob, ct, hit, add = 0 }) => {
        m[level] = new AutoSpellSkill(name, element, level, mul, add, prob, hit, ct, target_skill, target_element);
    });
    CONVERT_DATA[name] = m;
})

export default {
    data: CONVERT_DATA,
    clazz: AutoSpellSkill,

    getAutoSpell(name, level) {
        const m = CONVERT_DATA[name];
        const lv = level || Object.keys(m).sort((a, b) => b - a)[0];
        return m[lv].clone();
    }
}