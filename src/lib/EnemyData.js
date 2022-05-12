class EnemyStatus {
    static VERSION = [1, 0];    // major, minor

    constructor(name, race, element, size, base, hp, def, mdef, vit, agi, type) {
        this.name = name;
        this.race = race;
        this.element = element;
        this.size = size;
        this.base = base;
        this.hp = hp;
        this.def = def;
        this.mdef = mdef;
        this.vit = vit;
        this.agi = agi;
        this.type = type;
    }

    serialize() {
        return [
            ...EnemyStatus.VERSION,
            this.name, this.race, this.element, this.size,
            this.base, this.hp, this.def, this.mdef, this.vit, this.agi, this.type,
        ];
    }

    clone() {
        return EnemyStatus.deserialize(this.serialize());
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = EnemyStatus.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of EnemyStatus: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of EnemyStatus: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new EnemyStatus(...rest);
    }
}

const DATA = [
    { name: "カカシ(小)", race: "動物", element: "無", size: "小", base: 1, hp: 0, def: 0, mdef: 0, vit: 0, agi: 0, type: "NORMAL" },
    { name: "カカシ(中)", race: "動物", element: "無", size: "中", base: 1, hp: 0, def: 0, mdef: 0, vit: 0, agi: 0, type: "NORMAL" },
    { name: "カカシ(大)", race: "動物", element: "無", size: "大", base: 1, hp: 0, def: 0, mdef: 0, vit: 0, agi: 0, type: "NORMAL" },
    { name: "ポリン", race: "植物", element: "水", size: "中", base: 3, hp: 21, def: 2, mdef: 5, vit: 1, agi: 1, type: "NORMAL" },
    { name: "プバ", race: "昆虫", element: "地", size: "小", base: 5, hp: 46, def: 32, mdef: 20, vit: 1, agi: 1, type: "NORMAL" },
    { name: "ファブル", race: "昆虫", element: "地", size: "小", base: 8, hp: 42, def: 24, mdef: 0, vit: 5, agi: 5, type: "NORMAL" },
    { name: "ガイアス", race: "悪魔", element: "地", size: "小", base: 43, hp: 6444, def: 52, mdef: 16, vit: 30, agi: 19, type: "NORMAL" },
    { name: "黄金蟲", race: "昆虫", element: "火", size: "大", base: 45, hp: 0, def: 159, mdef: 81, vit: 80, agi: 77, type: "MVP" },
    { name: "デビルリング", race: "悪魔", element: "闇", size: "中", base: 48, hp: 0, def: 67, mdef: 70, vit: 33, agi: 50, type: "MVP" },
    { name: "オークヒーロー", race: "人間", element: "地", size: "大", base: 55, hp: 0, def: 197, mdef: 70, vit: 107, agi: 82, type: "MVP" },
    { name: "マヤー", race: "昆虫", element: "地", size: "大", base: 58, hp: 0, def: 183, mdef: 50, vit: 76, agi: 72, type: "MVP" },
    { name: "オークロード", race: "人間", element: "地", size: "大", base: 60, hp: 0, def: 256, mdef: 92, vit: 103, agi: 95, type: "MVP" },
    { name: "ゴブリンリーダー", race: "人間", element: "風", size: "中", base: 62, hp: 0, def: 72, mdef: 30, vit: 45, agi: 67, type: "MVP" },
    { name: "ドレイク", race: "不死", element: "死", size: "中", base: 65, hp: 0, def: 279, mdef: 135, vit: 114, agi: 103, type: "MVP" },
    { name: "エドガ", race: "動物", element: "火", size: "大", base: 68, hp: 0, def: 166, mdef: 70, vit: 103, agi: 80, type: "MVP" },
    { name: "ミストレス", race: "昆虫", element: "風", size: "大", base: 70, hp: 0, def: 187, mdef: 192, vit: 88, agi: 86, type: "MVP" },
    { name: "オシリス", race: "不死", element: "死", size: "中", base: 72, hp: 0, def: 172, mdef: 164, vit: 86, agi: 99, type: "MVP" },
    { name: "フリオニ", race: "動物", element: "無", size: "大", base: 76, hp: 0, def: 269, mdef: 98, vit: 112, agi: 70, type: "MVP" },
    { name: "月夜花", race: "悪魔", element: "火", size: "中", base: 79, hp: 0, def: 254, mdef: 81, vit: 93, agi: 102, type: "MVP" },
    { name: "ドラキュラ", race: "悪魔", element: "闇", size: "大", base: 80, hp: 0, def: 152, mdef: 146, vit: 88, agi: 99, type: "MVP" },
    { name: "ドッペルゲンガー", race: "悪魔", element: "闇", size: "中", base: 83, hp: 0, def: 246, mdef: 86, vit: 105, agi: 122, type: "MVP" },
    { name: "ファラオ", race: "人間", element: "闇", size: "大", base: 86, hp: 0, def: 124, mdef: 269, vit: 96, agi: 102, type: "MVP" },
    { name: "バフォメット", race: "悪魔", element: "闇", size: "大", base: 90, hp: 0, def: 279, mdef: 45, vit: 30, agi: 125, type: "MVP" },
    { name: "キメラ", race: "動物", element: "火", size: "大", base: 109, hp: 0, def: 38, mdef: 83, vit: 110, agi: 38, type: "MVP" },
    { name: "オウルバロン", race: "悪魔", element: "無", size: "大", base: 111, hp: 0, def: 65, mdef: 77, vit: 55, agi: 65, type: "MVP" },
    { name: "ブラッディナイト", race: "無形", element: "闇", size: "大", base: 112, hp: 0, def: 59, mdef: 98, vit: 70, agi: 59, type: "MVP" },
    { name: "ダークロード", race: "悪魔", element: "死", size: "大", base: 113, hp: 0, def: 136, mdef: 161, vit: 154, agi: 136, type: "MVP" },
    { name: "オーガトゥース", race: "無形", element: "闇", size: "中", base: 103, hp: 0, def: 105, mdef: 108, vit: 75, agi: 105, type: "MINI" },
    { name: "オウルデューク", race: "悪魔", element: "無", size: "大", base: 104, hp: 0, def: 51, mdef: 88, vit: 45, agi: 51, type: "MINI" },
    { name: "深淵の騎士", race: "人間", element: "闇", size: "大", base: 104, hp: 0, def: 55, mdef: 97, vit: 68, agi: 55, type: "MINI" },
    { name: "ミステルテイン", race: "無形", element: "闇", size: "大", base: 106, hp: 0, def: 139, mdef: 130, vit: 62, agi: 139, type: "MINI" },
    { name: "ダークイリュージョン", race: "悪魔", element: "死", size: "大", base: 107, hp: 0, def: 36, mdef: 102, vit: 55, agi: 36, type: "MINI" },
    { name: "ジルタス", race: "人間", element: "無", size: "中", base: 109, hp: 0, def: 61, mdef: 113, vit: 51, agi: 61, type: "MINI" },
    { name: "ライドワード", race: "無形", element: "無", size: "小", base: 98, hp: 90839, def: 53, mdef: 104, vit: 32, agi: 53, type: "NORMAL" },
    { name: "ダークフレーム", race: "悪魔", element: "闇", size: "中", base: 99, hp: 361168, def: 37, mdef: 53, vit: 36, agi: 37, type: "NORMAL" },
    { name: "ジェスター", race: "悪魔", element: "風", size: "中", base: 100, hp: 103088, def: 64, mdef: 67, vit: 60, agi: 64, type: "NORMAL" },
    { name: "イビルドルイド", race: "不死", element: "死", size: "大", base: 101, hp: 487703, def: 32, mdef: 71, vit: 24, agi: 32, type: "NORMAL" },
    { name: "アクラウス", race: "昆虫", element: "地", size: "中", base: 102, hp: 76475, def: 73, mdef: 140, vit: 45, agi: 73, type: "NORMAL" },
    { name: "レイドリックアーチャー", race: "悪魔", element: "闇", size: "中", base: 102, hp: 146883, def: 24, mdef: 112, vit: 40, agi: 24, type: "NORMAL" },
    { name: "アリス", race: "人間", element: "無", size: "中", base: 103, hp: 168665, def: 53, mdef: 80, vit: 45, agi: 53, type: "NORMAL" },
    { name: "カーリッツバーグ", race: "不死", element: "死", size: "大", base: 103, hp: 170215, def: 48, mdef: 89, vit: 40, agi: 48, type: "NORMAL" },
    { name: "彷徨う者", race: "悪魔", element: "風", size: "中", base: 104, hp: 544572, def: 92, mdef: 107, vit: 36, agi: 92, type: "NORMAL" },
    { name: "ごっついミノタウロス", race: "動物", element: "火", size: "大", base: 104, hp: 579135, def: 58, mdef: 72, vit: 65, agi: 58, type: "NORMAL" },
    { name: "ゾンビプリズナー", race: "不死", element: "死", size: "中", base: 105, hp: 176966, def: 39, mdef: 68, vit: 58, agi: 39, type: "NORMAL" },
    { name: "インジャスティス", race: "不死", element: "死", size: "中", base: 105, hp: 170363, def: 59, mdef: 73, vit: 58, agi: 59, type: "NORMAL" },
    { name: "スティング", race: "無形", element: "地", size: "中", base: 105, hp: 173442, def: 49, mdef: 99, vit: 68, agi: 49, type: "NORMAL" },
    { name: "レイドリック", race: "人間", element: "闇", size: "大", base: 105, hp: 555574, def: 87, mdef: 76, vit: 55, agi: 87, type: "NORMAL" },
    { name: "セージワーム", race: "動物", element: "無", size: "小", base: 106, hp: 104276, def: 29, mdef: 44, vit: 28, agi: 29, type: "NORMAL" },
    { name: "スケルプリズナー", race: "不死", element: "死", size: "中", base: 106, hp: 180190, def: 35, mdef: 71, vit: 60, agi: 35, type: "NORMAL" },
    { name: "ガーゴイル", race: "悪魔", element: "風", size: "中", base: 106, hp: 587502, def: 61, mdef: 100, vit: 60, agi: 61, type: "NORMAL" },
    { name: "リビオ", race: "悪魔", element: "無", size: "大", base: 107, hp: 604047, def: 52, mdef: 125, vit: 61, agi: 52, type: "NORMAL" },
    { name: "アノリアン", race: "魚介", element: "水", size: "中", base: 108, hp: 174453, def: 63, mdef: 58, vit: 55, agi: 63, type: "NORMAL" },
    { name: "フェンダーク", race: "人間", element: "無", size: "大", base: 109, hp: 356519, def: 500, mdef: 91, vit: 71, agi: 65, type: "NORMAL" },

    { name: "ハティー", race: "動物", element: "水", size: "大", base: 114, hp: 0, def: 153, mdef: 146, vit: 135, agi: 153, type: "MVP" },
    { name: "ストームナイト", race: "無形", element: "風", size: "大", base: 116, hp: 0, def: 165, mdef: 171, vit: 132, agi: 165, type: "MVP" },
    { name: "タイムホルダー", race: "悪魔", element: "無", size: "大", base: 119, hp: 0, def: 152, mdef: 402, vit: 251, agi: 152, type: "MVP" },
    { name: "タイムウォッチャー", race: "無形", element: "無", size: "大", base: 110, hp: 0, def: 60, mdef: 120, vit: 72, agi: 60, type: "MINI" },
    { name: "ブリキング", race: "無形", element: "無", size: "中", base: 112, hp: 0, def: 10, mdef: 34, vit: 23, agi: 99, type: "MINI" },
    { name: "クロック", race: "無形", element: "地", size: "中", base: 112, hp: 0, def: 24, mdef: 81, vit: 35, agi: 24, type: "MINI" },
    { name: "アークエルダー", race: "人間", element: "無", size: "大", base: 116, hp: 0, def: 63, mdef: 106, vit: 35, agi: 63, type: "MINI" },
    { name: "マーリン", race: "植物", element: "水", size: "中", base: 105, hp: 189827, def: 5, mdef: 30, vit: 10, agi: 5, type: "通常" },
    { name: "ミストケース", race: "無形", element: "無", size: "中", base: 106, hp: 186276, def: 19, mdef: 31, vit: 40, agi: 19, type: "通常" },
    { name: "クッキー", race: "人間", element: "無", size: "小", base: 107, hp: 186664, def: 23, mdef: 31, vit: 35, agi: 23, type: "通常" },
    { name: "ハティーベベ", race: "動物", element: "水", size: "中", base: 107, hp: 173177, def: 61, mdef: 88, vit: 55, agi: 61, type: "通常" },
    { name: "クリスマスクッキー", race: "人間", element: "聖", size: "小", base: 109, hp: 193241, def: 16, mdef: 25, vit: 30, agi: 16, type: "通常" },
    { name: "ネペンテス", race: "植物", element: "毒", size: "中", base: 109, hp: 186435, def: 32, mdef: 150, vit: 41, agi: 32, type: "通常" },
    { name: "時計塔管理者", race: "無形", element: "無", size: "大", base: 109, hp: 188334, def: 28, mdef: 73, vit: 40, agi: 28, type: "通常" },
    { name: "狂暴なライドワード", race: "無形", element: "無", size: "小", base: 109, hp: 102434, def: 53, mdef: 104, vit: 32, agi: 53, type: "通常" },
    { name: "アラーム", race: "無形", element: "無", size: "中", base: 109, hp: 594424, def: 72, mdef: 55, vit: 40, agi: 72, type: "通常" },
    { name: "バースリー", race: "人間", element: "闇", size: "中", base: 110, hp: 639700, def: 38, mdef: 56, vit: 40, agi: 38, type: "通常" },
    { name: "ジオグラファー", race: "植物", element: "地", size: "中", base: 110, hp: 191047, def: 26, mdef: 60, vit: 35, agi: 26, type: "通常" },
    { name: "パンク", race: "植物", element: "風", size: "小", base: 110, hp: 186095, def: 39, mdef: 79, vit: 30, agi: 39, type: "通常" },
    { name: "クルーザー", race: "無形", element: "無", size: "中", base: 111, hp: 199528, def: 10, mdef: 34, vit: 23, agi: 10, type: "通常" },
    { name: "ビッグベン", race: "無形", element: "地", size: "中", base: 111, hp: 620546, def: 58, mdef: 131, vit: 69, agi: 58, type: "通常" },
    { name: "ジャイアントホーネット", race: "昆虫", element: "風", size: "小", base: 111, hp: 106203, def: 45, mdef: 62, vit: 47, agi: 45, type: "通常" },
    { name: "エルダー", race: "人間", element: "無", size: "大", base: 112, hp: 621625, def: 63, mdef: 88, vit: 35, agi: 63, type: "通常" },
    { name: "ジョーカー", race: "人間", element: "風", size: "大", base: 113, hp: 589344, def: 99, mdef: 77, vit: 30, agi: 99, type: "通常" },
    { name: "狂暴なミミック", race: "無形", element: "無", size: "中", base: 113, hp: 88554, def: 162, mdef: 213, vit: 10, agi: 162, type: "通常" },
    { name: "タイムキーパー", race: "無形", element: "無", size: "大", base: 114, hp: 636580, def: 60, mdef: 120, vit: 72, agi: 60, type: "通常" },
    { name: "チェペット", race: "人間", element: "火", size: "中", base: 115, hp: 675655, def: 35, mdef: 32, vit: 35, agi: 35, type: "通常" },

    { name: "タオグンカ", race: "悪魔", element: "地", size: "大", base: 120, hp: 0, def: 175, mdef: 199, vit: 98, agi: 175, type: "MVP" },
    { name: "ミュータントドラゴン", race: "竜", element: "火", size: "大", base: 122, hp: 0, def: 35, mdef: 98, vit: 30, agi: 35, type: "MVP" },
    { name: "チンピラリーダ", race: "人間", element: "無", size: "中", base: 114, hp: 0, def: 36, mdef: 41, vit: 33, agi: 36, type: "MINI" },
    { name: "怒りのストラクタイトゴーレム", race: "無形", element: "地", size: "大", base: 115, hp: 0, def: 61, mdef: 69, vit: 48, agi: 61, type: "MINI" },
    { name: "メデューサクイーン", race: "悪魔", element: "水", size: "大", base: 117, hp: 0, def: 68, mdef: 69, vit: 65, agi: 68, type: "MINI" },
    { name: "カニ", race: "魚介", element: "水", size: "小", base: 106, hp: 188220, def: 14, mdef: 28, vit: 24, agi: 14, type: "NORMAL" },
    { name: "ネレイド", race: "動物", element: "地", size: "小", base: 108, hp: 180372, def: 45, mdef: 69, vit: 60, agi: 45, type: "NORMAL" },
    { name: "ヒトデ", race: "魚介", element: "地", size: "小", base: 111, hp: 197899, def: 14, mdef: 28, vit: 15, agi: 14, type: "NORMAL" },
    { name: "メデューサ", race: "悪魔", element: "無", size: "中", base: 112, hp: 616326, def: 68, mdef: 69, vit: 65, agi: 68, type: "NORMAL" },
    { name: "チンピラ", race: "人間", element: "無", size: "中", base: 113, hp: 661490, def: 36, mdef: 41, vit: 33, agi: 36, type: "NORMAL" },
    { name: "スタラクタイトゴーレム", race: "無形", element: "無", size: "大", base: 114, hp: 653367, def: 47, mdef: 63, vit: 48, agi: 47, type: "NORMAL" },
    { name: "お化け貝", race: "魚介", element: "水", size: "小", base: 115, hp: 206946, def: 11, mdef: 26, vit: 48, agi: 11, type: "NORMAL" },
    { name: "怒りのペノメナ", race: "魚介", element: "毒", size: "中", base: 116, hp: 193212, def: 49, mdef: 107, vit: 35, agi: 49, type: "NORMAL" },
    { name: "メガリス", race: "無形", element: "無", size: "大", base: 117, hp: 717217, def: 14, mdef: 90, vit: 35, agi: 14, type: "NORMAL" },
    { name: "レグルロ", race: "動物", element: "風", size: "小", base: 117, hp: 197931, def: 42, mdef: 54, vit: 38, agi: 42, type: "NORMAL" },
    { name: "グリーンイグアナ", race: "動物", element: "地", size: "中", base: 118, hp: 199804, def: 42, mdef: 45, vit: 22, agi: 42, type: "NORMAL" },
    { name: "アリゲータ", race: "動物", element: "水", size: "中", base: 119, hp: 683544, def: 48, mdef: 36, vit: 24, agi: 48, type: "NORMAL" },
    
];

export default {
    clazz: EnemyStatus,

    data: DATA.map(({ name, race, element, size, base, hp, def, mdef, vit, agi, type }) => {
        return new EnemyStatus(name, race, element, size, base, hp, def, mdef, vit, agi, type);
    }),

    getEnemy(name) {
        return this.data.filter(i => i.name == name)[0].clone();
    }
}