export default class CharacterStatus {
    static VERSION = [2, 0];    // major, minor

    constructor(
        base_atk, equip_atk, refine_atk,
        magic_damage_up, ignore_mdef_div, extra_damage,
        magic_up, size_up, race_up, element_enemy_up, boss_up,
        element_wind_damage_up, element_earth_damage_up, element_fire_damage_up, element_water_damage_up,
        element_normal_damage_up, element_holy_damage_up, element_dark_damage_up, element_ghost_damage_up, element_undead_damage_up, element_poison_damage_up,
        status_int, status_dex,
        fix_cast_div, variable_cast_div, delay_div,
        fix_cast_sub, variable_cast_sub, delay_sub,
        skill_add,
        specific_skill_up,
        custom_skill_up,
        last_up, last_up_prob, last_atk_limit,
        skill_up,
        element_relation_add,
        ignore_mdef_sub, pve_damage_up,
        magic_add,
        double_cast_mul, triple_cast_mul,
        pursuits,
        element_override,
        sacred_gear,
        enhance_power,
    ) {
        this.base_atk = base_atk || 0;
        this.equip_atk = equip_atk || 0;
        this.refine_atk = refine_atk || 0;

        this.magic_damage_up = magic_damage_up || 0;
        this.ignore_mdef_div = ignore_mdef_div || 0;
        this.extra_damage = extra_damage || 0;

        this.magic_up = magic_up || 0;
        this.size_up = size_up || 0;
        this.race_up = race_up || 0;
        this.element_enemy_up = element_enemy_up || 0;
        this.boss_up = boss_up || 0;

        this.element_wind_damage_up = element_wind_damage_up || 0;
        this.element_earth_damage_up = element_earth_damage_up || 0;
        this.element_fire_damage_up = element_fire_damage_up || 0;
        this.element_water_damage_up = element_water_damage_up || 0;
        this.element_normal_damage_up = element_normal_damage_up || 0;
        this.element_holy_damage_up = element_holy_damage_up || 0;
        this.element_dark_damage_up = element_dark_damage_up || 0;
        this.element_ghost_damage_up = element_ghost_damage_up || 0;
        this.element_undead_damage_up = element_undead_damage_up || 0;
        this.element_poison_damage_up = element_poison_damage_up || 0;

        this.status_int = status_int || 0;
        this.status_dex = status_dex || 0;
        this.fix_cast_div = fix_cast_div || 0;
        this.variable_cast_div = variable_cast_div || 0;
        this.delay_div = delay_div || 0;

        // 武具効果：固定詠唱削除：古代海流の杖，ホーリーステッキ，各種ギア
        this.fix_cast_sub = fix_cast_sub || 0;

        // 武具効果：変動詠唱削除：TBD
        this.variable_cast_sub = variable_cast_sub || 0;

        // 武具効果：ディレイ削除：各種ギア
        this.delay_sub = delay_sub || 0;

        // 武具効果：スキル倍率アップ：古代海流の杖
        this.skill_add = skill_add || 0;

        // 武具効果：特定スキルダメージアップ
        this.specific_skill_up = specific_skill_up || 0;

        // 武具効果：改造スキルダメージアップ
        this.custom_skill_up = custom_skill_up || 0;

        // 武具効果：最後に乗算：ゲンドゥルの意思，ペンダントオブハーモニー
        this.last_up = last_up || 0;
        this.last_up_prob = last_up_prob || 0;
        this.last_atk_limit = last_atk_limit || 0;

        // 武具効果：スキルダメージアップ：ヴァルキリーの栄耀，ペンダントオブハーモニー，マジカルセット
        // 踊り効果：アドバンスドブラギギア
        this.skill_up = skill_up || 0;

        // スキル効果：属性感知
        this.element_relation_add = element_relation_add || 0;

        // ギルドスキル実装
        this.ignore_mdef_sub = ignore_mdef_sub || 0;
        this.pve_damage_up = pve_damage_up || 0;

        // 武具効果：知識の王の降臨
        this.magic_add = magic_add || 0;

        // スキル効果：ダブルキャスト
        this.double_cast_mul = double_cast_mul || 0;

        // ギア効果：トリプルキャストギア
        this.triple_cast_mul = triple_cast_mul || 0;

        // ギア効果：電気嵐バルス装置，アドバンスMS，自動凍結装置
        this.pursuits = pursuits || {};

        // ギア効果；神罰，エレメンタルコントロール
        this.element_override = element_override || 0;

        // ギア効果：セイグリッドギア
        this.sacred_gear = sacred_gear || 0;

        // 魂：魔法ダメージ強化
        this.enhance_power = enhance_power || 0;
    }

    serialize() {
        return [
            ...CharacterStatus.VERSION,
            this.base_atk, this.equip_atk, this.refine_atk,
            this.magic_damage_up, this.ignore_mdef_div, this.extra_damage,
            this.magic_up, this.size_up, this.race_up, this.element_enemy_up, this.boss_up,
            this.element_wind_damage_up, this.element_earth_damage_up, this.element_fire_damage_up, this.element_water_damage_up,
            this.element_normal_damage_up, this.element_holy_damage_up, this.element_dark_damage_up, this.element_ghost_damage_up, this.element_undead_damage_up, this.element_poison_damage_up,
            this.status_int, this.status_dex,
            this.fix_cast_div, this.variable_cast_div, this.delay_div,
            this.fix_cast_sub, this.variable_cast_sub, this.delay_sub,
            this.skill_add,
            this.specific_skill_up,
            this.custom_skill_up,
            this.last_up, this.last_up_prob, this.last_atk_limit,
            this.skill_up,
            this.element_relation_add,
            this.ignore_mdef_sub, this.pve_damage_up,
            this.magic_add,
            this.double_cast_mul, this.triple_cast_mul,
            { ...this.pursuits },
            this.element_override,
            this.sacred_gear,
            this.enhance_power,
        ];
    }

    static deserialize(v) {
        const [crnt_major, crnt_minor] = CharacterStatus.VERSION;
        const [major, minor, ...rest] = v;

        if (major != crnt_major) {
            throw `Mismatch major version of CharacterStatus: expected ${crnt_major}.*, actual ${major}.${minor}`;
        }
        if (minor != crnt_minor) {
            console.warn(`Mismatch minor version of CharacterStatus: expected ${crnt_major}.${crnt_minor}, actual ${major}.${minor}`)
        }
        return new CharacterStatus(...rest);
    }

    clone() {
        return CharacterStatus.deserialize(this.serialize());
    }

    adjust(adj) {
        function _adj(a, b, k) {
            return Math.round(
                (a[k] / (1 + a.magic_up / 100) + b[k]) * (1 + (a.magic_up + b.magic_up) / 100)
            );
        }

        return new CharacterStatus(
            _adj(this, adj, 'base_atk'),
            _adj(this, adj, 'equip_atk'),
            _adj(this, adj, 'refine_atk'),
            this.magic_damage_up + adj.magic_damage_up,
            this.ignore_mdef_div + adj.ignore_mdef_div,
            this.extra_damage + adj.extra_damage,
            this.magic_up + adj.magic_up,
            this.size_up + adj.size_up,
            this.race_up + adj.race_up,
            this.element_enemy_up + adj.element_enemy_up,
            this.boss_up + adj.boss_up,

            this.element_wind_damage_up + adj.element_wind_damage_up,
            this.element_earth_damage_up + adj.element_earth_damage_up,
            this.element_fire_damage_up + adj.element_fire_damage_up,
            this.element_water_damage_up + adj.element_water_damage_up,
            this.element_normal_damage_up + adj.element_normal_damage_up,
            this.element_holy_damage_up + adj.element_holy_damage_up,
            this.element_dark_damage_up + adj.element_dark_damage_up,
            this.element_ghost_damage_up + adj.element_ghost_damage_up,
            this.element_undead_damage_up + adj.element_undead_damage_up,
            this.element_poison_damage_up + adj.element_poison_damage_up,

            this.status_int + adj.status_int,
            this.status_dex + adj.status_dex,
            this.fix_cast_div + adj.fix_cast_div,
            this.variable_cast_div + adj.variable_cast_div,
            this.delay_div + adj.delay_div,
            this.fix_cast_sub + adj.fix_cast_sub,
            this.variable_cast_sub + adj.variable_cast_sub,
            this.delay_sub + adj.delay_sub,
            this.skill_add + adj.skill_add,
            this.specific_skill_up + adj.specific_skill_up,
            this.custom_skill_up + adj.custom_skill_up,
            this.last_up + adj.last_up,
            this.last_up_prob + adj.last_up_prob,
            this.last_atk_limit + adj.last_atk_limit,
            this.skill_up + adj.skill_up,
            this.element_relation_add + adj.element_relation_add,
            this.ignore_mdef_sub + adj.ignore_mdef_sub,
            this.pve_damage_up + adj.pve_damage_up,
            this.magic_add + adj.magic_add,
            this.double_cast_mul + adj.double_cast_mul,
            this.triple_cast_mul + adj.triple_cast_mul,
            adj.pursuits,
            this.element_override + adj.element_override,
            this.sacred_gear + adj.sacred_gear,
            this.enhance_power + adj.enhance_power,
        );
    }
}
