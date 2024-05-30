import ElementalRelation from "@/lib/ElementalRelation";
import MagicSkillData from "./MagicSkillData";

class MagicDamageHandler {
    init(s) { }
    run(s, ismin, ismax) { }
}

class DefaultDict {
    constructor(d, obj={}) {
        return new Proxy(obj, {
            get: (target, name) => {
                if(!(name in target)) target[name] = (typeof d === 'function') ? d() : d;
                return target[name];
            }
        });
    }

    static deepcopy(obj) {
        function _copy(o) {
            let ret = new DefaultDict();

            Object.keys(o).forEach(k => {
                let v = o[k];
                if((v instanceof Object) && !(v instanceof Array)) {
                    ret[k] = _copy(v)
                } else {
                    ret[k] = v;
                }
            })
            return ret;
        }
        return _copy(obj);
    }
}

class MagicDamageCalculator {
    constructor(status, skill, enemy, ismin, ismax) {
        this.status = status;
        this.skill = skill;
        this.enemy = enemy;
        this.ismin = ismin || false;
        this.ismax = ismax || false;
    }

    total_atk() {
        let v = this.status.base_atk + this.status.equip_atk + this.status.refine_atk;

        if (this.status.magic_add > 0) {
            const { magic_up: now, magic_add: add } = this.status;
            v = Math.round(v / (1.0 + now / 100) * (1.0 + (now + add) / 100));
        }
        return v;
    }

    total_damage_up() {
        // 魔法ダメージ追加 + 属性モンスターダメUP + BOSSダメUP + ギア効果
        const v = 100
            + this.status.magic_damage_up
            + this.status.element_enemy_up
            + this.status.boss_up;
        return v;
    }

    total_element_relation_up() {
        let v1 = 100 + ElementalRelation[this.skill.element][this.enemy.element];
        if (v1 > 100) {
            v1 += this.status.element_relation_add;
        }

        const v2 = 100 + ElementalRelation[this.skill.element]['MAX'] + this.status.element_relation_add;
        const p = ['風', '地', '火', '水'].includes(this.skill.element) ? this.status.element_override : 0;

        if (p <= 0) return v1;
        if (this.ismin) return v1;
        if (this.ismax) return v2;
        return (v1 * (100 - p) / 100) + (v2 * p / 100);
    }

    total_element_damage_up() {
        const element_value = {
            "風": this.status.element_wind_damage_up,
            "地": this.status.element_earth_damage_up,
            "火": this.status.element_fire_damage_up,
            "水": this.status.element_water_damage_up,
            "無": this.status.element_normal_damage_up,
            "聖": this.status.element_holy_damage_up,
            "闇": this.status.element_dark_damage_up,
            "念": this.status.element_ghost_damage_up,
            "死": this.status.element_undead_damage_up,
            "毒": this.status.element_poison_damage_up,
        }[this.skill.element];

        const v = 100 + element_value;
        return v;
    }

    total_race_up() {
        const v = 100 + this.status.race_up;
        return v;
    }

    total_size_up() {
        const v = 100 + this.status.size_up;
        return v;
    }

    total_skill_up() {
        const element_value = {
            "風": this.status.element_wind_skill_add,
            "地": this.status.element_earth_skill_add,
            "火": this.status.element_fire_skill_add,
            "水": this.status.element_water_skill_add,
            "無": this.status.element_normal_skill_add,
            "聖": this.status.element_holy_skill_add,
            "闇": this.status.element_dark_skill_add,
            "念": this.status.element_ghost_skill_add,
            "死": this.status.element_undead_skill_add,
            "毒": this.status.element_poison_skill_add,
        }[this.skill.element];

        const mul = this.skill.mul;
        const mul_add = (this.status.skill_add + element_value) / this.skill.hit;

        const v = (mul + mul_add)
            * (100 + this.status.skill_up) / 100
            * (100 + this.status.specific_skill_up) / 100
            * (100 + this.status.custom_skill_up) / 100;
        return v;
    }

    total_enemy_mdef_div() {
        const ignore = Math.min(100, this.skill.ignore_mdef + this.status.ignore_mdef_div);
        const mdef = Math.max(0, this.enemy.mdef - this.status.ignore_mdef_sub) * (100 - ignore) / 100; // TODO: 仮で最初に減算するとする
        const v = (1000 + mdef) / (1000 + mdef * 10);

        return v;
    }

    total_extra_damage() {
        const add = this.skill.add;

        const v = this.status.extra_damage + add;
        return v;
    }

    total_pve_damage_up() {
        // https://twitter.com/feeO_ro/status/1594358453354770433
        // PVE1 = 0.012%

        const v = 100 + (this.status.pve_damage_up * 0.012);
        return v;
    }

    total_sacred_gear_up() {
        return 100 + this.status.sacred_gear;
    }

    total_enhance_power() {
        const v = 100 + (this.status.enhance_power * 0.09);
        return v;
    }

    get(...args) {
        const atk = this.total_atk();

        const n = this.skill.placeable ? 1 : this.skill.hit;
        let d = Math.floor(
            (
                Math.floor(
                    atk
                    * this.total_damage_up() / 100
                    * this.total_element_relation_up() / 100
                    * this.total_element_damage_up() / 100
                    * this.total_race_up() / 100
                    * this.total_size_up() / 100
                    * this.total_skill_up() / 100
                    * this.total_enemy_mdef_div()
                    * this.total_sacred_gear_up() / 100
                ) + this.total_extra_damage()
            )
            * this.total_pve_damage_up() / 100
            * this.total_enhance_power() / 100
            * n
        );

        if (this.status.last_up > 0 && this.ismin == false) {
            const limit = (this.status.last_atk_limit > 0) ? atk * this.status.last_atk_limit / 100 : Infinity;
            const limited_d = Math.min(limit, d * this.status.last_up / 100)

            if (this.ismax) {
                d = limited_d;
            } else {
                const p = this.status.last_up_prob / 100;
                d = d * (1.0 - p) + limited_d * p;
            }
        }

        if (this.ismin) {
            d = Math.floor(d * 0.97);
        } else if (this.ismax) {
            d = Math.floor(d * 1.03);
        } else {
            d = Math.floor(d);
        }

        if (this.status.double_cast_mul > 0) {
            const clone_status = this.status.clone();

            // 無限にダブルキャスト計算しないように確率をゼロにする
            clone_status.double_cast_mul = 0;
            clone_status.triple_cast_mul = 0;

            const clone_d_skill = this.skill.clone();
            clone_d_skill.mul *= this.status.double_cast_mul / 100;

            // TODO: 計算値が実測値より高かったため暫定対応
            clone_d_skill.add = 0;

            d += (new MagicDamageCalculator(clone_status, clone_d_skill, this.enemy, this.ismin, this.ismax)).get();

            if (this.status.triple_cast_mul > 0) {
                const clone_t_skill = this.skill.clone();
                clone_t_skill.mul *= this.status.triple_cast_mul / 100;

                // TODO: 計算値が実測値より高かったため暫定対応
                clone_t_skill.add = 0;

                d += (new MagicDamageCalculator(clone_status, clone_t_skill, this.enemy, this.ismin, this.ismax)).get();
            }
        }

        return d;
    }

    v_cast() {
        const { skill, status } = this;
        const { status_int: int, status_dex: dex, variable_cast_div: div, variable_cast_sub: sub } = status;
        const t = (skill.vcast - sub) * (1 - Math.sqrt((int / 2 + dex) / 265)) * (1.0 - div / 100);

        return Math.max(0, t);
    }
    f_cast() {
        const element_value = {
            "風": this.status.element_wind_fix_cast_div,
            "地": this.status.element_earth_fix_cast_div,
            "火": this.status.element_fire_fix_cast_div,
            "水": this.status.element_water_fix_cast_div,
            "無": this.status.element_normal_fix_cast_div,
            "聖": this.status.element_holy_fix_cast_div,
            "闇": this.status.element_dark_fix_cast_div,
            "念": this.status.element_ghost_fix_cast_div,
            "死": this.status.element_undead_fix_cast_div,
            "毒": this.status.element_poison_fix_cast_div,
        }[this.skill.element];

        const { skill, status } = this;
        const { fix_cast_div: div, fix_cast_sub: sub } = status;
        const t = (skill.fcast - sub) * (1.0 - div / 100 - element_value / 100);

        return Math.max(0, t)
    }
    cast_time() {
        return this.v_cast() + this.f_cast();
    }

    delay() {
        const { skill, status } = this;
        const { delay_div: div, delay_sub: sub } = status;

        const t = (skill.delay - sub) * (1 - div / 100);
        return Math.max(skill.motion, t);
    }
    cast_delay() {
        const d = this.delay();
        return Math.max(this.skill.ct, d);
    }

    dps() {
        const cast_per_sec = 1.0 / (this.cast_time() + this.cast_delay());
        let hit_per_sec = this.skill.hit * cast_per_sec;

        let hit_per_sec_with_dc = hit_per_sec;
        if (this.skill.can_dc_cast && this.status.double_cast_mul > 0) {
            hit_per_sec_with_dc += this.status.triple_cast_mul > 0 ? 3 : 2;
        }

        /*
        CTがあるかないかで判断を分ける必要がある

        pursuitsは { key: AutoSpellSkill } の形式となり、基本的にはAutoSpellSkill.spellは1個のみスキルが指定される。
        ただしプーペヘッドドレスのように複数ASが独立に発動しない場合はspellに複数登録されている可能性がある。

        1. CTがない場合
            発動条件を満たす攻撃数を計算し
                期待キャスト数：攻撃回数 x 当該スキルの発動確率
                期待攻撃数：期待キャスト数 x ヒット数
            を計算する
            期待値計算のしかたは
                非設置物： 1発のダメージ x 期待キャスト数
                設置物： 1発のダメージ x 連続HIT数 x 期待キャスト数

        2. CTがある場合
            発動条件を満たす攻撃数を計算し、
                期待発動確率： (1 - 1度も発動できない確率)
                期待攻撃数： 期待発動確率 x ヒット数
            を計算する
            期待値計算のしかたは
                非設置物： 1発のダメージ x 期待発動率
                設置物： 1発のダメージ x 連続HIT数 x 期待発動率
        */
        const CACHE_SKILL = new DefaultDict(() => new DefaultDict(() => new DefaultDict(0)));
        const CACHE_ELEMENT = new DefaultDict(() => new DefaultDict(() => new DefaultDict(0)));

        CACHE_SKILL[this.skill.name][this.skill.name].cast = cast_per_sec;
        CACHE_SKILL[this.skill.name][this.skill.name].hit = hit_per_sec_with_dc;
        CACHE_ELEMENT[this.skill.element][this.skill.name].cast = cast_per_sec;
        CACHE_ELEMENT[this.skill.element][this.skill.name].hit = hit_per_sec_with_dc;

        function _reduce_sum(obj, key, ignores=[]) {
            return Object.keys(obj).reduce((p, k) => {
                return ignores.includes(k) ? p : p + obj[k][key];
            }, 0)
        }

        let prev_total = 0;
        while (true) {
            Object.keys(this.status.pursuits).forEach(k => {
                const { prob, target_skill, target_element, spells, ct = 0 } = this.status.pursuits[k];

                // 発動条件を満たす判定回数を計算する
                let n = 0;
                if (target_skill) {
                    n = _reduce_sum(CACHE_SKILL[target_skill], "cast");
                } else if (target_element) {
                    n = _reduce_sum(CACHE_ELEMENT[target_element], "hit");
                } else {
                    n = Object.keys(CACHE_SKILL).reduce((p, k1) => {
                        return p + _reduce_sum(CACHE_SKILL[k1], "hit", [k]); // 自分自身は含まない
                    }, 0);
                }

                spells.forEach(({spell, level, prob: sub_prob}) => {
                    const skill = MagicSkillData.getSkill(spell, level);
                    const p = (prob / 100) * (sub_prob / 100);

                    if(ct <= 0) {
                        // without ct
                        const e_cast = n * p;
                        const e_hit = e_cast * skill.hit;

                        CACHE_SKILL[skill.name][k].cast = e_cast;
                        CACHE_SKILL[skill.name][k].hit = e_hit;
                        CACHE_ELEMENT[skill.element][k].hit = e_hit;
                    } else {
                        // with ct
                        const np = (1.0 - p) ** (n * ct);     // CTが2秒なら判定回数は2倍、CTが0.5秒なら判定回数は0.5倍
                        const pp = (1.0 - np);
                        const e_hit = pp * (skill.hit / ct);  // CTが2秒ならヒット数は0.5倍、CTが0.5秒ならヒット数は2倍

                        CACHE_SKILL[skill.name][k].cast = pp / ct; // 期待キャスト = 期待発動率 / CT (100%発動だけどCT2秒だと0.5キャスト)
                        CACHE_SKILL[skill.name][k].prob = pp;
                        CACHE_SKILL[skill.name][k].hit = e_hit;
                        CACHE_ELEMENT[skill.element][k].hit = e_hit;
                    }
                });
            });

            const crnt_total = Object.keys(CACHE_SKILL).reduce((p, k1) => p + _reduce_sum(CACHE_SKILL[k1], "hit"), 0);
            const delta = crnt_total - prev_total;
            prev_total = crnt_total;

            if (delta <= 0.001) break;
        }

        console.log(CACHE_SKILL)
        console.log(CACHE_ELEMENT)

        let ret = [];

        // base
        let base_dmg = this.get();
        if(this.skill.placeable) base_dmg *= this.skill.hit;

        ret.push([hit_per_sec_with_dc, cast_per_sec * base_dmg]);
        console.log(`${this.skill.name} Lv.${this.skill.level} prob=100, hit=${this.skill.hit}, placeable=${this.skill.placeable}, n=${cast_per_sec}, d=${base_dmg.toLocaleString()}, dps=${(cast_per_sec*base_dmg).toLocaleString()}`);

        // AS
        
        // ダブルキャスト計算しないように確率をゼロにする
        const clone_status = this.status.clone();
        clone_status.double_cast_mul = 0;
        clone_status.triple_cast_mul = 0;

        Object.keys(this.status.pursuits).forEach(k => {
            const { prob, target_skill, target_element, spells, ct = 0 } = this.status.pursuits[k];

            const results = []
            spells.forEach(({spell, level, prob: sub_prob}) => {
                const skill = MagicSkillData.getSkill(spell, level);
                const d = (new MagicDamageCalculator(clone_status, skill, this.enemy, this.ismin, this.ismax)).get();

                // 設置系はHIT数を乗算する必要がある。非設置はCalculatorの中で計算済
                const dmg = skill.placeable ? d * skill.hit : d;

                if(ct <= 0) {
                    // without ct
                    const n = CACHE_SKILL[skill.name][k].cast;
                    const dps = n * dmg;

                    results.push([n, dps]);
                    console.log(`${k}@${spell} Lv.${level} prob=(${prob}*${sub_prob}), hit=${skill.hit}, placeable=${skill.placeable}, ct=0, n=${n}, d=${dmg.toLocaleString()}, dps=${dps.toLocaleString()}`);
                } else {
                    // with ct
                    const p = CACHE_SKILL[skill.name][k].prob;
                    const h = CACHE_SKILL[skill.name][k].hit;

                    const dps = p * dmg / ct;     // CTが2秒ならdpsはx1/2, CTが0.5秒ならdpsはx2

                    results.push([h, dps]);
                    console.log(`${k}@${spell} Lv.${level} prob=(${prob}*${sub_prob}), hit=${skill.hit}, placeable=${skill.placeable}, ct=${ct}, n=${h}, p=${p}, d=${dmg.toLocaleString()}, dps=${dps.toLocaleString()}`);
                }
            });

            const hit = results.reduce((r, i) => r + i[0], 0) / spells.length;
            const dps = results.reduce((r, i) => r + i[1], 0) / spells.length;
            ret.push([hit, dps]);
        });

        const hit = Math.floor(ret.reduce((r, i) => r + i[0], 0));
        const dps = ret.reduce((r, i) => r + Math.floor(i[1]), 0);
        return { hit: hit, dps: dps }
    }
}


class MagicDamageBuilder {
    constructor(status, skill, enemy) {
        this.status = status;
        this.skill = skill;
        this.enemy = enemy;
        this.handlers = [];
    }

    handler(h) {
        if (Array.isArray(h)) {
            this.handlers = [...this.handlers, ...h]
        } else {
            this.handlers.push(h);
        }

        return this;
    }

    build(ismin, ismax) {
        const s = this.status.clone();
        this.handlers.map((h) => h.init(s));
        this.handlers.map((h) => h.run(s, ismin, ismax));

        return new MagicDamageCalculator(s, this.skill, this.enemy, ismin, ismax);
    }
}


export {
    MagicDamageHandler,
    MagicDamageCalculator,
    MagicDamageBuilder
}
