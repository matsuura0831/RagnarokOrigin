class MagicSkill {
    static VERSION = [6, 0];    // major, minor

    constructor(
        name, element, level, ignore_mdef,
        mul, add, vcast, fcast, delay, ct, hit, time, motion, can_dc_cast, placeable
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
        this.motion = motion;
        this.can_dc_cast = can_dc_cast;
        this.placeable = placeable
    }

    serialize() {
        return [
            ...MagicSkill.VERSION,
            this.name, this.element, this.level, this.ignore_mdef,
            this.mul, this.add, this.vcast, this.fcast, this.delay, this.ct, this.hit, this.time,
            this.motion, this.can_dc_cast, this.placeable
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
        motion: 0.74,
        records: [
            { level: 5, mul: 110, add: 40, vcast: 0.41, fcast: 0.10, delay: 2.0, ct: 0, hit: 5, time: 0 },
            { level: 4, mul: 112.5, add: 40, vcast: 0.41, fcast: 0.10, delay: 1.8, ct: 0, hit: 4, time: 0 },
            { level: 3, mul: 87.5, add: 40, vcast: 0.41, fcast: 0.10, delay: 1.6, ct: 0, hit: 4, time: 0 },
            { level: 2, mul: 83.33, add: 40, vcast: 0.41, fcast: 0.10, delay: 1.4, ct: 0, hit: 3, time: 0 },
            { level: 1, mul: 50, add: 40, vcast: 0.41, fcast: 0.10, delay: 1.2, ct: 0, hit: 3, time: 0 },
        ]
    },
    {
        name: "ナパームバルカン",
        element: "念",
        records: [
            { level: 5, mul: 700, add: 50, vcast: 0.80, fcast: 0.20, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 575, add: 50, vcast: 0.80, fcast: 0.20, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 450, add: 50, vcast: 0.80, fcast: 0.20, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 325, add: 50, vcast: 0.80, fcast: 0.20, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 200, add: 50, vcast: 0.80, fcast: 0.20, delay: 1.0, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "グラビテーションフィールド",
        element: "念",
        ignore_mdef: 100,
        placeable: true,
        records: [
            { level: 5, mul: 400, add: 30, vcast: 5.33, fcast: 1.0, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
            { level: 4, mul: 330, add: 25, vcast: 5.00, fcast: 0.9, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
            { level: 3, mul: 260, add: 20, vcast: 4.68, fcast: 0.8, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
            { level: 2, mul: 190, add: 15, vcast: 4.35, fcast: 0.7, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
            { level: 1, mul: 120, add: 10, vcast: 4.04, fcast: 0.6, delay: 5.0, ct: 0, hit: 20, time: 10.0 },
        ]
    },
    {
        name: "ファイアーボルト",
        element: "火",
        motion: 0.74,
        can_dc_cast: true,
        records: [
            { level: 10, mul: 1000, add: 800, vcast: 3.01, fcast: 0.05, delay: 1.6, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 900, add: 648, vcast: 2.75, fcast: 0.06, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 800, add: 512, vcast: 2.52, fcast: 0.07, delay: 1.4, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 700, add: 392, vcast: 2.28, fcast: 0.08, delay: 1.3, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 600, add: 288, vcast: 2.05, fcast: 0.09, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 500, add: 200, vcast: 1.80, fcast: 0.10, delay: 1.1, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 400, add: 128, vcast: 1.56, fcast: 0.11, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 300, add: 72, vcast: 1.33, fcast: 0.12, delay: 0.9, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 200, add: 32, vcast: 1.07, fcast: 0.13, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 100, add: 8, vcast: 0.84, fcast: 0.14, delay: 0.7, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "メテオストーム",
        element: "火",
        placeable: true,
        records: [
            { level: 10, mul: 550, add: 154, vcast: 6.54, fcast: 1.2, delay: 4.0, ct: 0, hit: 9, time: 5.4 },   // 0.6秒間隔で1個落ちている
            { level: 9, mul: 550, add: 118, vcast: 6.89, fcast: 1.2, delay: 4.0, ct: 0, hit: 8, time: 0 },
            { level: 8, mul: 440, add: 104, vcast: 7.22, fcast: 1.2, delay: 4.0, ct: 0, hit: 8, time: 0 },
            { level: 7, mul: 440, add: 75, vcast: 7.55, fcast: 1.2, delay: 4.0, ct: 0, hit: 7, time: 0 },
            { level: 6, mul: 330, add: 63, vcast: 7.90, fcast: 1.2, delay: 4.0, ct: 0, hit: 7, time: 0 },
            { level: 5, mul: 330, add: 42, vcast: 8.24, fcast: 1.2, delay: 3.0, ct: 0, hit: 6, time: 0 },
            { level: 4, mul: 220, add: 33, vcast: 8.59, fcast: 1.2, delay: 3.0, ct: 0, hit: 6, time: 0 },
            { level: 3, mul: 220, add: 18, vcast: 8.92, fcast: 1.2, delay: 2.0, ct: 0, hit: 5, time: 0 },
            { level: 2, mul: 110, add: 10, vcast: 9.27, fcast: 1.2, delay: 2.0, ct: 0, hit: 5, time: 0 },
            { level: 1, mul: 110, add: 5, vcast: 9.60, fcast: 1.2, delay: 1.0, ct: 0, hit: 4, time: 0 },
        ]
    },
    {
        name: "コールドボルト",
        element: "水",
        motion: 0.74,
        can_dc_cast: true,
        records: [
            { level: 10, mul: 1000, add: 800, vcast: 3.01, fcast: 0.05, delay: 1.6, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 900, add: 648, vcast: 2.75, fcast: 0.06, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 800, add: 512, vcast: 2.52, fcast: 0.07, delay: 1.4, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 700, add: 392, vcast: 2.28, fcast: 0.08, delay: 1.3, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 600, add: 288, vcast: 2.05, fcast: 0.09, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 500, add: 200, vcast: 1.80, fcast: 0.10, delay: 1.1, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 400, add: 128, vcast: 1.56, fcast: 0.11, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 300, add: 72, vcast: 1.33, fcast: 0.12, delay: 0.9, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 200, add: 32, vcast: 1.07, fcast: 0.13, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 100, add: 8, vcast: 0.84, fcast: 0.14, delay: 0.7, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "ウォーターボール",
        motion: 0.74,
        element: "水",
        records: [
            { level: 10, mul: 1500/15, add: 1005/15, vcast: 3.51, fcast: 0.88, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 9, mul: 1400/15, add: 885/15, vcast: 3.20, fcast: 0.80, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 8, mul: 1200/15, add: 780/15, vcast: 2.48, fcast: 0.72, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 7, mul: 1100/15, add: 675/15, vcast: 2.56, fcast: 0.64, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 6, mul: 900/15, add: 570/15, vcast: 2.24, fcast: 0.56, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 5, mul: 800/15, add: 465/15, vcast: 1.91, fcast: 0.48, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 4, mul: 600/15, add: 216/15, vcast: 1.60, fcast: 0.40, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 3, mul: 500/15, add: 162/15, vcast: 1.29, fcast: 0.32, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 2, mul: 300/15, add: 90/15, vcast: 0.96, fcast: 0.24, delay: 0.0, ct: 0, hit: 15, time: 0 },
            { level: 1, mul: 100/15, add: 15/15, vcast: 0.64, fcast: 0.16, delay: 0.0, ct: 0, hit: 15, time: 0 },
        ]
    },
    {
        // 表記は合計で記載されているのでhit数で割る必要がある
        name: "ストームガスト",
        placeable: true,
        element: "水",
        records: [
            { level: 10, mul: 3740 / 10, add: 750 / 10, vcast: 9.60, fcast: 2.40, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 9, mul: 3410 / 10, add: 650 / 10, vcast: 8.96, fcast: 2.24, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 8, mul: 3080 / 10, add: 530 / 10, vcast: 8.31, fcast: 2.08, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 7, mul: 2750 / 10, add: 450 / 10, vcast: 7.69, fcast: 1.92, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 6, mul: 2420 / 10, add: 350 / 10, vcast: 7.05, fcast: 1.76, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 5, mul: 2090 / 10, add: 270 / 10, vcast: 6.40, fcast: 1.60, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 4, mul: 1760 / 10, add: 200 / 10, vcast: 5.76, fcast: 1.44, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 3, mul: 1430 / 10, add: 150 / 10, vcast: 5.11, fcast: 1.28, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 2, mul: 1100 / 10, add: 100 / 10, vcast: 4.49, fcast: 1.12, delay: 5.0, ct: 0, hit: 10, time: 0 },
            { level: 1, mul: 770 / 10, add: 50 / 10, vcast: 3.84, fcast: 0.96, delay: 5.0, ct: 0, hit: 10, time: 0 },
        ]
    },
    {
        name: "フロストノヴァ",
        placeable: true,
        element: "水",
        records: [
            { level: 10, mul: 200, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  9, mul: 190, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  8, mul: 180, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  7, mul: 170, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  6, mul: 160, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  5, mul: 150, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  4, mul: 140, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  3, mul: 130, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  2, mul: 120, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level:  1, mul: 110, add: 0, vcast: 0.73, fcast: 0.8, delay: 0.5, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "ライトニングボルト",
        element: "風",
        motion: 0.74,
        can_dc_cast: true,
        records: [
            { level: 10, mul: 1000, add: 800, vcast: 3.01, fcast: 0.05, delay: 1.6, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 900, add: 648, vcast: 2.75, fcast: 0.06, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 800, add: 512, vcast: 2.52, fcast: 0.07, delay: 1.4, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 700, add: 392, vcast: 2.28, fcast: 0.08, delay: 1.3, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 600, add: 288, vcast: 2.05, fcast: 0.09, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 500, add: 200, vcast: 1.80, fcast: 0.10, delay: 1.1, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 400, add: 128, vcast: 1.56, fcast: 0.11, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 300, add: 72, vcast: 1.33, fcast: 0.12, delay: 0.9, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 200, add: 32, vcast: 1.07, fcast: 0.13, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 100, add: 8, vcast: 0.84, fcast: 0.14, delay: 0.7, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "ユピテルサンダー",
        element: "風",
        records: [
            { level: 10, mul: 1200, add: 800, vcast: 5.02, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 1080, add: 648, vcast: 4.64, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 960, add: 512, vcast: 4.25, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 840, add: 392, vcast: 3.88, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 720, add: 288, vcast: 3.49, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 600, add: 200, vcast: 3.12, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 480, add: 128, vcast: 2.73, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 360, add: 72, vcast: 2.36, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 240, add: 32, vcast: 1.97, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 120, add: 8, vcast: 1.60, fcast: 0.40, delay: 0.0, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        // 表記は合計で記載されているのでhit数で割る必要がある
        name: "ロードオブヴァーミリオン",
        element: "風",
        placeable: true,
        records: [
            { level: 10, mul: 3080 / 4, add: 580 / 4, vcast: 3.36, fcast: 3.34, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 9, mul: 2904 / 4, add: 460 / 4, vcast: 3.52, fcast: 3.50, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 8, mul: 2728 / 4, add: 360 / 4, vcast: 3.68, fcast: 3.66, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 7, mul: 2552 / 4, add: 260 / 4, vcast: 3.84, fcast: 3.82, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 6, mul: 2376 / 4, add: 180 / 4, vcast: 4.00, fcast: 3.98, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 5, mul: 2200 / 4, add: 140 / 4, vcast: 4.16, fcast: 4.14, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 4, mul: 2024 / 4, add: 80 / 4, vcast: 4.32, fcast: 4.30, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 3, mul: 1848 / 4, add: 40 / 4, vcast: 4.48, fcast: 4.45, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 2, mul: 1672 / 4, add: 28 / 4, vcast: 4.64, fcast: 4.61, delay: 4.0, ct: 0, hit: 4, time: 0 },
            { level: 1, mul: 1496 / 4, add: 20 / 4, vcast: 4.80, fcast: 4.77, delay: 4.0, ct: 0, hit: 4, time: 0 },
        ]
    },
    {
        name: "アーススパイク",
        element: "地",
        motion: 0.74,
        records: [
            { level: 5, mul: 1000, add: 800, vcast: 3.01, fcast: 0.05, delay: 1.6, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 800, add: 512, vcast: 2.52, fcast: 0.07, delay: 1.4, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 600, add: 288, vcast: 2.05, fcast: 0.09, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 400, add: 128, vcast: 1.56, fcast: 0.11, delay: 1.0, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 200, add: 32, vcast: 1.07, fcast: 0.13, delay: 0.8, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "ヘブンズドライブ",
        element: "地",
        records: [
            { level: 5, mul: 1000, add: 225, vcast: 6.40, fcast: 1.60, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 800, add: 145, vcast: 5.11, fcast: 1.28, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 600, add: 80, vcast: 3.84, fcast: 0.96, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 400, add: 40, vcast: 2.56, fcast: 0.64, delay: 0.5, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 200, add: 10, vcast: 1.29, fcast: 0.32, delay: 0.5, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "ヘキサブレイク",
        element: "地",
        placeable: true,
        records: [
            { level: 10, mul: 2530 / 5, add: 0, vcast: 5.68, fcast: 1.42, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 9, mul: 2365 / 5, add: 0, vcast: 5.43, fcast: 1.38, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 8, mul: 2200 / 5, add: 0, vcast: 5.15, fcast: 1.34, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 7, mul: 2035 / 5, add: 0, vcast: 4.90, fcast: 1.30, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 6, mul: 1870 / 5, add: 0, vcast: 4.64, fcast: 1.26, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 5, mul: 1705 / 5, add: 0, vcast: 4.37, fcast: 1.22, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 4, mul: 1540 / 5, add: 0, vcast: 4.12, fcast: 1.18, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 3, mul: 1375 / 5, add: 0, vcast: 3.86, fcast: 1.14, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 2, mul: 1210 / 5, add: 0, vcast: 3.59, fcast: 1.10, delay: 5.0, ct: 0, hit: 5, time: 0 },
            { level: 1, mul: 1045 / 5, add: 0, vcast: 3.34, fcast: 1.06, delay: 5.0, ct: 0, hit: 5, time: 0 },
        ]
    },
    {
        name: "マグヌスエクソシズム",
        element: "聖",
        placeable: true,
        records: [
            { level: 10, mul: 867, add: 0, vcast: 10.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 7, time: 14 },
            { level: 9, mul: 750, add: 0, vcast: 9.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 6, time: 13 },
            { level: 8, mul: 733, add: 0, vcast: 8.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 6, time: 12 },
            { level: 7, mul: 583, add: 0, vcast: 7.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 5, time: 11 },
            { level: 6, mul: 450, add: 0, vcast: 6.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 5, time: 10 },
            { level: 5, mul: 444, add: 0, vcast: 5.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 4, time: 9 },
            { level: 4, mul: 311, add: 0, vcast: 4.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 4, time: 8 },
            { level: 3, mul: 200, add: 0, vcast: 3.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 3, time: 7 },
            { level: 2, mul: 167, add: 0, vcast: 2.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 3, time: 6 },
            { level: 1, mul: 67, add: 0, vcast: 1.00, fcast: 2.5, delay: 2.0, ct: 5.0, hit: 2, time: 5 },
        ]
    },
    {
        name: "ジュデックス",
        element: "聖",
        records: [
            { level: 10, mul: 700, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 9, mul: 660, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 8, mul: 620, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 7, mul: 580, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 6, mul: 540, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 5, mul: 500, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 4, mul: 460, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 3, mul: 420, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 2, mul: 380, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
            { level: 1, mul: 340, add: 0, vcast: 0.0, fcast: 1.61, delay: 0.5, ct: 0.0, hit: 1, time: 0 },
        ]
    },
    {
        name: "フォースアロー",
        element: "無",
        motion: 0.74,
        records: [
            { level: 10, mul: 2000, add: 800, fcast: 0.05, vcast: 3.11, delay: 1.6, ct: 0, hit: 1, time: 0 },
            { level: 9, mul: 1880, add: 648, fcast: 0.06, vcast: 2.87, delay: 1.5, ct: 0, hit: 1, time: 0 },
            { level: 8, mul: 1760, add: 512, fcast: 0.07, vcast: 2.62, delay: 1.4, ct: 0, hit: 1, time: 0 },
            { level: 7, mul: 1640, add: 392, fcast: 0.08, vcast: 2.36, delay: 1.3, ct: 0, hit: 1, time: 0 },
            { level: 6, mul: 1520, add: 288, fcast: 0.09, vcast: 2.12, delay: 1.2, ct: 0, hit: 1, time: 0 },
            { level: 5, mul: 1400, add: 200, fcast: 0.10, vcast: 1.87, delay: 1.1, ct: 0, hit: 1, time: 0 },
            { level: 4, mul: 1280, add: 128, fcast: 0.11, vcast: 1.63, delay: 1, ct: 0, hit: 1, time: 0 },
            { level: 3, mul: 1160, add: 72, fcast: 0.12, vcast: 1.37, delay: 0.9, ct: 0, hit: 1, time: 0 },
            { level: 2, mul: 1040, add: 32, fcast: 0.13, vcast: 1.12, delay: 0.8, ct: 0, hit: 1, time: 0 },
            { level: 1, mul: 920, add: 8, fcast: 0.14, vcast: 0.88, delay: 0.7, ct: 0, hit: 1, time: 0 },
        ]
    },
    {
        name: "サイキックウェーブ",
        element: "無",
        placeable: true,
        records: [
            { level: 10, mul: 1000, add: 0, fcast: 1.68, vcast: 6.72, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 9, mul: 950, add: 0, fcast: 1.76, vcast: 7.04, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 8, mul: 900, add: 0, fcast: 1.84, vcast: 7.36, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 7, mul: 850, add: 0, fcast: 1.92, vcast: 7.69, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 6, mul: 800, add: 0, fcast: 2.00, vcast: 8.00, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 5, mul: 750, add: 0, fcast: 2.08, vcast: 8.33, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 4, mul: 700, add: 0, fcast: 2.16, vcast: 8.64, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 3, mul: 650, add: 0, fcast: 2.24, vcast: 8.97, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 2, mul: 600, add: 0, fcast: 2.32, vcast: 9.28, delay: 5, ct: 0, hit: 5, time: 0 },
            { level: 1, mul: 550, add: 0, fcast: 2.40, vcast: 9.61, delay: 5, ct: 0, hit: 5, time: 0 },
        ]
    },

    // AutoSpell
    {
        name: "アドバンスFB",
        element: "火",
        records: [
            { level: 10, mul: 600, hit: 1 },
            { level: 7, mul: 450, hit: 1 },
            { level: 6, mul: 400, hit: 1 },
            { level: 4, mul: 300, hit: 1 },
            { level: 3, mul: 250, hit: 1 },
            { level: 2, mul: 200, hit: 1 },
            { level: 1, mul: 150, hit: 1 },
        ]
    },
    {
        name: "アドバンスLB",
        element: "風",
        records: [
            { level: 10, mul: 600, hit: 1 },
            { level: 7, mul: 450, hit: 1 },
            { level: 6, mul: 400, hit: 1 },
            { level: 4, mul: 300, hit: 1 },
            { level: 3, mul: 250, hit: 1 },
            { level: 2, mul: 200, hit: 1 },
            { level: 1, mul: 150, hit: 1 },
        ]
    },
    {
        name: "アドバンスCB",
        element: "水",
        records: [
            { level: 10, mul: 600, hit: 1 },
            { level: 7, mul: 450, hit: 1 },
            { level: 6, mul: 400, hit: 1 },
            { level: 4, mul: 300, hit: 1 },
            { level: 3, mul: 250, hit: 1 },
            { level: 2, mul: 200, hit: 1 },
            { level: 1, mul: 150, hit: 1 },
        ]
    },
    {
        name: "アドバンスMS",
        element: "火",
        placeable: true,
        records: [
            { level: 10, mul: 550, hit: 5 },
            { level: 7, mul: 500, hit: 5 },
        ]
    },
    {
        name: "磁気嵐パルス装置",
        element: "風",
        placeable: true,
        records: [
            { level: 10, mul: 600, hit: 1 },
            { level: 7, mul: 400, hit: 1 },
            { level: 6, mul: 350, hit: 1 },
            { level: 4, mul: 250, hit: 1 },
            { level: 3, mul: 200, hit: 1 },
            { level: 2, mul: 150, hit: 1 },
            { level: 1, mul: 100, hit: 1 },
        ]
    },
    {
        name: "アドバンスSG",
        element: "無",
        placeable: true,
        records: [
            { level: 10, mul: 100, hit: 4.5 / 0.5 },
        ]
    },
    {
        name: "古代海龍の杖",
        element: "無",
        records: [
            { level: 1, mul: 300, hit: 1 },
        ]
    },
    {
        name: "ファイアードラゴンブレス",
        element: "火",
        records: [
            { level: 1, mul: 400, add: 0, hit: 1 },
        ],
    },
    {
        name: "超水流",
        element: "水",
        records: [
            { level: 1, mul: 350, add: 0, hit: 1 },
        ],
    },

    // Warlock
    /*
    {
        name: "クリムゾンロック",
        element: "火",
        records: [
            { level: 5, mul: 1500, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 1, time: 0 },
            { level: 4, mul: 1280, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 1, time: 0 },
            { level: 3, mul: 1060, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 1, time: 0 },
            { level: 2, mul:  840, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 1, time: 0 },
            { level: 1, mul:  620, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 1, time: 0 },
        ]
    },
    {
        // TODO 
        name: "コメット",
        element: "火",
        records: [
            { level: 1, mul:  620, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 1, time: 0 },
        ]
    },
    {
        name: "ライトニングコンボ",
        element: "風",
        records: [
            { level: 5, mul: 400, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 4, time: 0 },
            { level: 4, mul: 350, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 4, time: 0 },
            { level: 3, mul: 300, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 4, time: 0 },
            { level: 2, mul: 250, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 4, time: 0 },
            { level: 1, mul: 200, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 4, time: 0 },
        ]
    },
    {
        name: "チェーンライトニング",
        element: "風",
        records: [
            { level: 1, mul: 810, add: 0, fcast: 0.1, vcast: 0.4, delay: 1.2, ct: 1.2, hit: 4, time: 0 },
        ]
    },
    */
];

const CONVERT_DATA = {};
DATA.forEach(({ name, element, records, ignore_mdef = 0, can_dc_cast = false, placeable = false, motion = 0.8 }) => {
    let m = {};
    records.forEach(({ level, hit, mul, add = 0, vcast = 0.0, fcast = 0.0, delay = 0.0, ct = 0.0, time = 0.0 }) => {
        m[level] = new MagicSkill(name, element, level, ignore_mdef, mul, add, vcast, fcast, delay, ct, hit, time, motion, can_dc_cast, placeable);
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