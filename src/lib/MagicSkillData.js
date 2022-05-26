class MagicSkill {
    static VERSION = [2, 0];    // major, minor

    constructor(
        name, element, level, ignore_mdef,
        mul, add, vcast, fcast, delay, ct, hit, time
    ) {
        this.name = name;
        this.element = element;
        this.level = level;
        this.ignore_mdef = ignore_mdef;
        this.mul = mul;
        this.add = add;
        this.vcast = vcast;
        this.fcast = fcast;
        this.delay = delay;
        this.ct = ct;
        this.hit = hit;
        this.time = time;
    }

    serialize() {
        return [
            ...MagicSkill.VERSION,
            this.name, this.element, this.level, this.ignore_mdef,
            this.mul, this.add, this.vcast, this.fcast, this.delay, this.ct, this.hit, this.time,
        ];
    }

    clone() {
        return MagicSkill.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = MagicSkill.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of MagicSkill: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of MagicSkill: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new MagicSkill(...rest);
    }
}

const DATA = [
    {
        name: "ソウルストライク",
        element: "念",
        records: [
            { level: 5, mul: 110, add: 40, vcast: 0.20, fcast: 0.20, delay: 2.0, ct: 0, hit: 3, time: 0 },
            { level: 4, mul: 112.5, add: 40, vcast: 0.20, fcast: 0.20, delay: 1.8, ct: 0, hit: 3, time: 0 },
            { level: 3, mul: 87.5, add: 40, vcast: 0.20, fcast: 0.20, delay: 1.6, ct: 0, hit: 4, time: 0 },
            { level: 2, mul: 83.33, add: 40, vcast: 0.20, fcast: 0.20, delay: 1.4, ct: 0, hit: 4, time: 0 },
            { level: 1, mul: 50, add: 40, vcast: 0.20, fcast: 0.20, delay: 1.2, ct: 0, hit: 5, time: 0 },
        ]
    },
    {
        name: "ナパームバルカン",
        element: "念",
        records: [
            { level: 5, mul: 700, add: 50, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 575, add: 50, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 450, add: 50, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 325, add: 50, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 200, add: 50, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "グラビテーションフィールド",
        element: "念",
        ignore_mdef: 100,
        records: [
            { level: 5, mul: 400, add: 30, vcast: 5.33, fcast: 1.0, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
            { level: 4, mul: 330, add: 25, vcast: 5.33, fcast: 1.0, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
            { level: 3, mul: 260, add: 20, vcast: 5.33, fcast: 1.0, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
            { level: 2, mul: 190, add: 15, vcast: 5.33, fcast: 1.0, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
            { level: 1, mul: 120, add: 10, vcast: 5.33, fcast: 1.0, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
        ]
    },
    {
        name: "ファイアーボルト",
        element: "火",
        records: [
            { level: 10, mul: 1000, add: 800, vcast: 0.10, fcast: 1.49, delay: 1.6, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 900, add: 648, vcast: 0.12, fcast: 1.37, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 800, add: 512, vcast: 0.14, fcast: 1.25, delay: 1.4, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 700, add: 392, vcast: 0.16, fcast: 1.13, delay: 1.3, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 600, add: 288, vcast: 0.18, fcast: 1.01, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 500, add: 200, vcast: 0.20, fcast: 0.89, delay: 1.1, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 400, add: 128, vcast: 0.22, fcast: 0.78, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 300, add: 72, vcast: 0.24, fcast: 0.66, delay: 0.9, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 200, add: 32, vcast: 0.26, fcast: 0.54, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 100, add: 8, vcast: 0.28, fcast: 0.42, delay: 0.7, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "ファイアーウォール",
        element: "火",
        records: [
            { level: 10, mul: 80, add: 100, vcast: 0.28, fcast: 0.28, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 80, add: 90, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 80, add: 80, vcast: 0.36, fcast: 0.36, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 80, add: 70, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 80, add: 60, vcast: 0.44, fcast: 0.44, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 80, add: 50, vcast: 0.48, fcast: 0.48, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 80, add: 40, vcast: 0.56, fcast: 0.56, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 80, add: 30, vcast: 0.64, fcast: 0.64, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 80, add: 20, vcast: 0.72, fcast: 0.72, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 80, add: 10, vcast: 0.80, fcast: 0.80, delay: 1.0, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "ファイアーボール",
        element: "火",
        records: [
            { level: 10, mul: 280, add: 80, vcast: 0.40, fcast: 0.40, delay: 0.7, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 260, add: 72, vcast: 0.40, fcast: 0.40, delay: 0.7, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 240, add: 64, vcast: 0.40, fcast: 0.40, delay: 0.7, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 220, add: 56, vcast: 0.40, fcast: 0.40, delay: 0.7, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 200, add: 48, vcast: 0.40, fcast: 0.40, delay: 0.7, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 180, add: 40, vcast: 0.64, fcast: 0.64, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 160, add: 32, vcast: 0.64, fcast: 0.64, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 140, add: 24, vcast: 0.64, fcast: 0.64, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 120, add: 16, vcast: 0.64, fcast: 0.64, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 100, add: 8, vcast: 0.64, fcast: 0.64, delay: 1.0, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        // TODO 表記が他のと違う
        name: "ファイアーピラー",
        element: "火",
        ignore_mdef: 100,
        records: [
            { level: 10, mul: 240, add: 200, vcast: 0.10, fcast: 0.10, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 220, add: 200, vcast: 0.20, fcast: 0.20, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 200, add: 200, vcast: 0.28, fcast: 0.30, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 180, add: 200, vcast: 0.38, fcast: 0.40, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 160, add: 200, vcast: 0.48, fcast: 0.50, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 140, add: 200, vcast: 0.58, fcast: 0.60, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 120, add: 200, vcast: 0.68, fcast: 0.70, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 100, add: 200, vcast: 0.76, fcast: 0.80, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 80, add: 200, vcast: 0.86, fcast: 0.90, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 60, add: 200, vcast: 0.96, fcast: 1.00, delay: 0.8, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "サイトラッシャー",
        element: "火",
        records: [
            { level: 10, mul: 240, add: 100, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 230, add: 90, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 220, add: 80, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 210, add: 70, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 200, add: 60, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 190, add: 50, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 180, add: 40, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 170, add: 30, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 160, add: 20, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 150, add: 10, vcast: 0.16, fcast: 0.16, delay: 1.5, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        // TODO: timeを測定する
        name: "メテオストーム",
        element: "火",
        records: [
            { level: 10, mul: 550, add: 154, vcast: 2.4, fcast: 3.25, delay: 4.0, ct: 0, hit: 9, time: 0 },
            { level: 9, mul: 550, add: 118, vcast: 2.4, fcast: 3.42, delay: 4.0, ct: 0, hit: 8, time: 0 },
            { level: 8, mul: 440, add: 104, vcast: 2.4, fcast: 3.59, delay: 4.0, ct: 0, hit: 8, time: 0 },
            { level: 7, mul: 440, add: 75, vcast: 2.4, fcast: 3.76, delay: 4.0, ct: 0, hit: 7, time: 0 },
            { level: 6, mul: 330, add: 63, vcast: 2.4, fcast: 3.93, delay: 4.0, ct: 0, hit: 7, time: 0 },
            { level: 5, mul: 330, add: 42, vcast: 2.4, fcast: 4.10, delay: 3.0, ct: 0, hit: 6, time: 0 },
            { level: 4, mul: 220, add: 33, vcast: 2.4, fcast: 4.27, delay: 3.0, ct: 0, hit: 6, time: 0 },
            { level: 3, mul: 220, add: 18, vcast: 2.4, fcast: 4.44, delay: 2.0, ct: 0, hit: 5, time: 0 },
            { level: 2, mul: 110, add: 10, vcast: 2.4, fcast: 4.60, delay: 2.0, ct: 0, hit: 5, time: 0 },
            { level: 1, mul: 110, add: 5, vcast: 2.4, fcast: 4.77, delay: 1.0, ct: 0, hit: 4, time: 0 },
        ]
    },
    {
        name: "アイスボルト",
        element: "水",
        records: [
            { level: 10, mul: 1000, add: 800, vcast: 0.10, fcast: 1.49, delay: 1.6, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 900, add: 648, vcast: 0.12, fcast: 1.37, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 800, add: 512, vcast: 0.14, fcast: 1.25, delay: 1.4, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 700, add: 392, vcast: 0.16, fcast: 1.13, delay: 1.3, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 600, add: 288, vcast: 0.18, fcast: 1.01, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 500, add: 200, vcast: 0.20, fcast: 0.89, delay: 1.1, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 400, add: 128, vcast: 0.22, fcast: 0.78, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 300, add: 72, vcast: 0.24, fcast: 0.66, delay: 0.9, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 200, add: 32, vcast: 0.26, fcast: 0.54, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 100, add: 8, vcast: 0.28, fcast: 0.42, delay: 0.7, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "フロストダイバー",
        element: "水",
        records: [
            { level: 10, mul: 200, add: 200, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 190, add: 180, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 180, add: 160, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 170, add: 140, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 160, add: 120, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 150, add: 100, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 140, add: 80, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 130, add: 60, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 120, add: 40, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 110, add: 20, vcast: 0.32, fcast: 0.32, delay: 1.0, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        // TODO HIT数の確認
        name: "ウォーターボール",
        element: "水",
        records: [
            { level: 10, mul: 1500, add: 1005, vcast: 1.75, fcast: 1.75, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 9, mul: 1400, add: 885, vcast: 1.59, fcast: 1.59, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 8, mul: 1200, add: 780, vcast: 1.43, fcast: 1.43, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 7, mul: 1100, add: 675, vcast: 1.27, fcast: 1.27, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 6, mul: 900, add: 570, vcast: 1.11, fcast: 1.11, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 5, mul: 800, add: 465, vcast: 0.95, fcast: 0.95, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 4, mul: 600, add: 216, vcast: 0.80, fcast: 0.80, delay: 0.0, ct: 0, hit: 9, time: 0 },
            { level: 3, mul: 500, add: 162, vcast: 0.64, fcast: 0.64, delay: 0.0, ct: 0, hit: 9, time: 0 },
            { level: 2, mul: 300, add: 90, vcast: 0.48, fcast: 0.48, delay: 0.0, ct: 0, hit: 9, time: 0 },
            { level: 1, mul: 100, add: 15, vcast: 0.32, fcast: 0.32, delay: 0.0, ct: 0, hit: 3, time: 0 },
        ]
    },
    {
        // 表記は合計で記載されているのでhit数で割る必要がある
        // TODO: timeを測定する
        name: "ストームガスト",
        element: "水",
        records: [
            { level: 10, mul: 3740/10, add: 750/10, vcast: 4.8, fcast: 4.77, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 9, mul: 3410/10, add: 650/10, vcast: 4.48, fcast: 4.45, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 8, mul: 3080/10, add: 530/10, vcast: 4.16, fcast: 4.14, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 7, mul: 2750/10, add: 450/10, vcast: 3.84, fcast: 3.82, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 6, mul: 1760/10, add: 200/10, vcast: 3.52, fcast: 3.50, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 5, mul: 2090/10, add: 270/10, vcast: 3.20, fcast: 3.18, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 4, mul: 1760/10, add: 200/10, vcast: 2.88, fcast: 2.86, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 3, mul: 1430/10, add: 150/10, vcast: 2.56, fcast: 2.55, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 2, mul: 1100/10, add: 100/10, vcast: 2.23, fcast: 2.23, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 1, mul: 770/10, add: 50/10, vcast: 1.91, fcast: 1.91, delay: 5.0, ct: 0, hit: 10, time: 0 },
        ]
    },
    {
        name: "フロストノヴァ",
        element: "水",
        records: [
            { level: 10, mul: 200, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 190, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 180, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 170, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 160, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 150, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 140, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 130, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 120, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 110, add: 0, vcast: 1.60, fcast: 1.59, delay: 0.5, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "ライトニングボルト",
        element: "風",
        records: [
            { level: 10, mul: 1000, add: 800, vcast: 0.10, fcast: 1.49, delay: 1.6, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 900, add: 648, vcast: 0.12, fcast: 1.37, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 800, add: 512, vcast: 0.14, fcast: 1.25, delay: 1.4, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 700, add: 392, vcast: 0.16, fcast: 1.13, delay: 1.3, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 600, add: 288, vcast: 0.18, fcast: 1.01, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 500, add: 200, vcast: 0.20, fcast: 0.89, delay: 1.1, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 400, add: 128, vcast: 0.22, fcast: 0.78, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 300, add: 72, vcast: 0.24, fcast: 0.66, delay: 0.9, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 200, add: 32, vcast: 0.26, fcast: 0.54, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 100, add: 8, vcast: 0.28, fcast: 0.42, delay: 0.7, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "サンダーストーム",
        element: "風",
        records: [
            { level: 10, mul: 1000, add: 250, vcast: 3.18, fcast: 3.18, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 900, add: 220, vcast: 2.86, fcast: 2.86, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 800, add: 170, vcast: 2.55, fcast: 2.55, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 700, add: 130, vcast: 2.23, fcast: 2.23, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 600, add: 95, vcast: 1.91, fcast: 1.91, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 500, add: 65, vcast: 1.59, fcast: 1.59, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 400, add: 40, vcast: 1.27, fcast: 1.27, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 300, add: 25, vcast: 0.95, fcast: 0.95, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 200, add: 10, vcast: 0.64, fcast: 0.64, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 100, add: 5, vcast: 0.32, fcast: 0.32, delay: 1.2, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        // TODO: HITS数の確認
        name: "ユピテルサンダー",
        element: "風",
        records: [
            { level: 10, mul: 1200, add: 800, vcast: 0.80, fcast: 2.50, delay: 0.0, ct: 0, hit: 12, time: 0 },
            { level: 9, mul: 1080, add: 648, vcast: 0.80, fcast: 2.31, delay: 0.0, ct: 0, hit: 11, time: 0 },
            { level: 8, mul: 960, add: 512, vcast: 0.80, fcast: 2.12, delay: 0.0, ct: 0, hit: 10, time: 0 },
            { level: 7, mul: 840, add: 392, vcast: 0.80, fcast: 1.93, delay: 0.0, ct: 0, hit: 9, time: 0 },
            { level: 6, mul: 720, add: 288, vcast: 0.80, fcast: 1.74, delay: 0.0, ct: 0, hit: 8, time: 0 },
            { level: 5, mul: 600, add: 200, vcast: 0.80, fcast: 1.55, delay: 0.0, ct: 0, hit: 7, time: 0 },
            { level: 4, mul: 480, add: 128, vcast: 0.80, fcast: 1.36, delay: 0.0, ct: 0, hit: 6, time: 0 },
            { level: 3, mul: 360, add: 72, vcast: 0.80, fcast: 1.17, delay: 0.0, ct: 0, hit: 5, time: 0 },
            { level: 2, mul: 240, add: 32, vcast: 0.80, fcast: 0.98, delay: 0.0, ct: 0, hit: 4, time: 0 },
            { level: 1, mul: 120, add: 8, vcast: 0.80, fcast: 0.80, delay: 0.0, ct: 0, hit: 3, time: 0 },
        ]
    },
    {
        // 表記は合計で記載されているのでhit数で割る必要がある
        // TODO: timeを測定する
        name: "ロードオブヴァーミリオン",
        element: "風",
        records: [
            { level: 10, mul: 3080/4, add: 580/4, vcast: 3.36, fcast: 3.34, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 9, mul: 2904/4, add: 460/4, vcast: 3.52, fcast: 3.50, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 8, mul: 2728/4, add: 360/4, vcast: 3.68, fcast: 3.66, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 7, mul: 2552/4, add: 260/4, vcast: 3.84, fcast: 3.82, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 6, mul: 2376/4, add: 180/4, vcast: 4.00, fcast: 3.98, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 5, mul: 2200/4, add: 140/4, vcast: 4.16, fcast: 4.14, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 4, mul: 2024/4, add: 80/4, vcast: 4.32, fcast: 4.30, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 3, mul: 1848/4, add: 40/4, vcast: 4.48, fcast: 4.45, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 2, mul: 1672/4, add: 28/4, vcast: 4.64, fcast: 4.61, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 1, mul: 1496/4, add: 20/4, vcast: 4.80, fcast: 4.77, delay: 4.0, ct: 0, hit: 4, time: 0 },
        ]
    },
    {
        name: "ストーンカース",
        element: "地",
        records: [
            { level: 10, mul: 200, add: 200, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 190, add: 180, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 180, add: 160, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 170, add: 140, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 160, add: 120, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 150, add: 100, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 140, add: 80, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 130, add: 60, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 120, add: 40, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 110, add: 20, vcast: 0.40, fcast: 0.40, delay: 1.0, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        // TODO: HITS数の確認
        name: "アーススパイク",
        element: "地",
        records: [
            { level: 5, mul: 1000, add: 800, vcast: 0.10, fcast: 1.49, delay: 1.6, ct: 0, hit: 4, time: 0 },
            { level: 4, mul: 800, add: 512, vcast: 0.14, fcast: 1.25, delay: 1.4, ct: 0, hit: 4, time: 0 },
            { level: 3, mul: 600, add: 288, vcast: 0.18, fcast: 1.01, delay: 1.2, ct: 0, hit: 3, time: 0 },
            { level: 2, mul: 400, add: 128, vcast: 0.22, fcast: 0.78, delay: 1.0, ct: 0, hit: 2, time: 0 },
            { level: 1, mul: 200, add: 32, vcast: 0.26, fcast: 0.54, delay: 0.8, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        // TODO: HITS数の確認
        name: "ヘブンズドライブ",
        element: "地",
        records: [
            { level: 5, mul: 1000, add: 225, vcast: 3.20, fcast: 3.18, delay: 0.5, ct: 0, hit: 5, time: 0 },
            { level: 4, mul: 800, add: 145, vcast: 2.56, fcast: 2.55, delay: 0.5, ct: 0, hit: 4, time: 0 },
            { level: 3, mul: 600, add: 80, vcast: 1.92, fcast: 1.91, delay: 0.5, ct: 0, hit: 3, time: 0 },
            { level: 2, mul: 400, add: 40, vcast: 1.28, fcast: 1.27, delay: 0.5, ct: 0, hit: 2, time: 0 },
            { level: 1, mul: 200, add: 10, vcast: 0.64, fcast: 0.64, delay: 0.5, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        // TODO: HITS数の確認
        name: "ヘキサブレイク",
        element: "地",
        records: [
            { level: 10, mul: 2530/5, add: 0, vcast: 2.84, fcast: 2.82, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 9, mul: 2365/5, add: 0, vcast: 2.76, fcast: 2.69, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 8, mul: 2200/5, add: 0, vcast: 2.68, fcast: 2.57, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 7, mul: 2035/5, add: 0, vcast: 2.60, fcast: 2.44, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 6, mul: 1870/5, add: 0, vcast: 2.52, fcast: 2.31, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 5, mul: 1705/5, add: 0, vcast: 2.44, fcast: 2.18, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 4, mul: 1540/5, add: 0, vcast: 2.36, fcast: 2.05, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 3, mul: 1375/5, add: 0, vcast: 2.28, fcast: 1.92, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 2, mul: 1210/5, add: 0, vcast: 2.20, fcast: 1.79, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 1, mul: 1045/5, add: 0, vcast: 2.12, fcast: 1.66, delay: 5.0, ct: 0, hit: 5, time: 0 },
        ]
    },
    {
        name: "マグヌスエクソシズム",
        element: "聖",
        records: [
            { level: 10, mul: 867, add: 0, vcast: 6.6, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 7, time: 14 },
            { level:  9, mul: 750, add: 0, vcast: 5.9, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 6, time: 13 },
            { level:  8, mul: 733, add: 0, vcast: 5.3, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 6, time: 12 },
            { level:  7, mul: 583, add: 0, vcast: 4.6, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 5, time: 11 },
            { level:  6, mul: 450, add: 0, vcast: 3.9, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 5, time: 10 },
            { level:  5, mul: 444, add: 0, vcast: 3.3, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 4, time:  9 },
            { level:  4, mul: 311, add: 0, vcast: 2.6, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 4, time:  8 },
            { level:  3, mul: 200, add: 0, vcast: 2.0, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 3, time:  7 },
            { level:  2, mul: 167, add: 0, vcast: 1.3, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 3, time:  6 },
            { level:  1, mul:  67, add: 0, vcast: 0.7, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 2, time:  5 },
        ]
    },
    {
        name: "ジュデックス",
        element: "聖",
        records: [
            { level: 10, mul: 700, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  9, mul: 660, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  8, mul: 620, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  7, mul: 580, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  6, mul: 540, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  5, mul: 500, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  4, mul: 460, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  3, mul: 420, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  2, mul: 380, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level:  1, mul: 340, add: 0, vcast: 1.6, fcast: 0, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
        ]
    },
];

const CONVERT_DATA = {};
DATA.forEach(({ name, element, ignore_mdef, records }) => {
    let m = {};
    records.forEach(({ level, mul, add, vcast, fcast, delay, ct, hit, time }) => {
        m[level] = new MagicSkill(name, element, level, ignore_mdef || 0, mul, add, vcast, fcast, delay, ct, hit, time);
    });
    CONVERT_DATA[name] = m;
})

export default {
    data: CONVERT_DATA,
    clazz: MagicSkill,

    getSkill(name, level) {
        const m = CONVERT_DATA[name];
        const lv = level || Object.keys(m).sort((a, b) => b - a)[0];
        return m[lv].clone();
    }
}