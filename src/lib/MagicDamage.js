import ElementalRelation from "@/lib/ElementalRelation";
import MagicSkillData from "./MagicSkillData";

class MagicDamageHandler {
    init(s) { }
    run(s, ismin, ismax) { }
}

class DefaultDict {
    constructor(defaultVal, obj = {}) {
        return new Proxy(obj, {
            get: (target, name) => name in target ? target[name] : defaultVal
        })
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
        const p = this.status.element_override;

        if (p <= 0) return v1;
        if (this.ismin) return v1;
        if (this.ismax) return v2;
        return (v1 * (100 - p) / 100) + (v2 * p / 100);
    }

    total_element_damage_up() {
        const v = 100 + this.status.element_damage_up;
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
        const v = (this.skill.mul + this.status.skill_add)
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
        const v = this.status.extra_damage + this.skill.add;
        return v;
    }

    total_pve_damage_up() {
        // https://twitter.com/feeO_ro/status/1594358453354770433
        // PVE1 = 0.012%

        // 2023.10.17: ここが原因で誤差を生んでいるように見える。暫定的に 0.012 から 0.01に変更 
        const v = 100 + (this.status.pve_damage_up * 0.01);
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
        const { skill, status } = this;
        const { fix_cast_div: div, fix_cast_sub: sub } = status;
        const t = (skill.fcast - sub) * (1.0 - div / 100);

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

        if (this.skill.can_dc_cast && this.status.double_cast_mul > 0) {
            hit_per_sec *= this.status.triple_cast_mul > 0 ? 3 : 2;
        }

        /*
         ASの発動種別
             攻撃時：マーリン(CT)、レッドエルマ(CT)、ピットマン、ボールステッカー(CT)
             物理攻撃時：ウィンドゴースト
             魔法攻撃時：アクアオーブ
             特定属性攻撃時：水龍の杖(CT)
             特定スキル発動時：アドバンスギア(CT)、ダブルキャスト、トリプルキャスト
         CT有とCT無で計算方法を変える必要がある
             CT無：発動率*総判定回数*ダメージ
             CT有：発動率(=CT期間中に1回でも発動する確率)*ダメージ / CT
        */

        const clone_status = this.status.clone();

        // ダブルキャスト計算しないように確率をゼロにする
        clone_status.double_cast_mul = 0;
        clone_status.triple_cast_mul = 0;

        //    //dummy
        //    clone_status.pursuits['アクアオーブ'] = { prob: 10, mul:  350, add:   0, hit: 1, ct: 0, element: "水", alias: "超水流", check:() => true };
        //    clone_status.pursuits['ピットマン'] =   { prob: 10, mul: 1000, add: 225, hit: 1, ct: 0, element: "地", alias: "ヘブンズドライブ", check:() => true };

        //    clone_status.pursuits['eruma']   = { prob: 5, mul: 800, add: 250, hit: 15, ct: 1, element: "水", check:() => true };
        //    clone_status.pursuits['stacker'] = { prob: 3, mul:1500, add:1005, hit: 15, ct: 1, element: "水", check:() => true };

        let pursuit_with_ct = {};
        let pursuit_without_ct = {};

        Object.keys(clone_status.pursuits).forEach(k => {
            const p = clone_status.pursuits[k];

            if ('ct' in p && p.ct > 0) {
                pursuit_with_ct[k] = p;
            } else {
                pursuit_without_ct[k] = p;
            }
        });

        const TH_HIT = 0.001; // スキル倍率1000%ぐらいを想定して倍率が1%を下回らないようなHIT数にする

        function _calc_total_hit(base_name, base_element, base_hit, base_pursuits, bs = {}, be = {}) {
            let hits = { 'total': base_hit, 'skill': new DefaultDict(0, bs), 'element': new DefaultDict(0, be) };

            if (base_name) hits.skill[base_name] = base_hit;
            if (base_element) hits.element[base_element] = base_hit;

            function _calc(parent_name, parent_element, parent_hit, pursuits) {
                Object.keys(pursuits).forEach(k => {
                    const { prob, element, hit, ct, check } = pursuits[k];

                    if (check(parent_name, parent_element)) {
                        let h = parent_hit * prob / 100 * hit;
                        if (ct <= 0 && h >= TH_HIT) {
                            hits['total'] += h;
                            hits.skill[k] += h;
                            hits.element[element] += h;

                            _calc(k, element, h, Object.keys(base_pursuits).reduce((p, i) => {
                                if (k != i) p[i] = base_pursuits[i];
                                return p;
                            }, {}));
                        }
                    }
                })
            }

            _calc(base_name, base_element, base_hit, base_pursuits)

            return hits;
        }

        let hits_noct = _calc_total_hit(this.skill.name, this.skill.element, hit_per_sec, pursuit_without_ct);
        console.log(hits_noct);

        let hits_ct = { 'total': 0, 'skill': new DefaultDict(0), 'element': new DefaultDict(0), 'prob': new DefaultDict(0) };
        let prev_total = 0;
        do {
            prev_total = hits_ct.total;
            hits_ct.total = 0;

            Object.keys(pursuit_with_ct).forEach(k => {
                const { prob, element, hit, ct, target_skill, target_element } = pursuit_with_ct[k];

                let n = 0;
                if (target_skill) {
                    n = hits_noct.skill[target_skill] + hits_ct.skill[target_skill];
                } else if (target_element) {
                    n = hits_noct.element[target_element] + hits_ct.element[target_element];
                } else {
                    n = hits_noct.total + Object.keys(hits_ct.skill).reduce((i, l) => {
                        return k == l ? i : i + hits_ct.skill[l];
                    }, 0);
                }

                const np = (1.0 - prob / 100) ** n;
                const pp = (1.0 - np) / ct
                const h = pp * hit;
                hits_ct.total = h;
                hits_ct.skill[k] = h;
                hits_ct.element[element] = h;

                hits_ct.prob[k] = pp;

                console.log("CT", prev_total, k, prob, hit, ct, n, pp, h)
            })
            console.log(hits_ct);
        } while ((hits_ct.total - prev_total) > TH_HIT);

        let hits_noct2 = _calc_total_hit('', '', hits_ct.total, pursuit_without_ct, { ...hits_noct.skill }, { ...hits_noct.element });

        const damage_per_hit = this.get();
        //    let ret = Math.floor(hit_per_sec * damage_per_hit);

        let ret = [];

        // base
        ret.push(hit_per_sec * this.get());

        // noct
        Object.keys(pursuit_without_ct).forEach(k => {
            const { element, level, mul, add = 0 } = pursuit_without_ct[k];

            const skill = new MagicSkillData.clazz(k, element, level, 0, mul, add, 0, 0, 0, 0, 1, 0, 0, false);
            const d = (new MagicDamageCalculator(clone_status, skill, this.enemy, this.ismin, this.ismax)).get();
            const n = hits_noct2.skill[k];

            ret.push(n * d);
            console.log(k, n, d, n * d)
        })

        // ct
        Object.keys(pursuit_with_ct).forEach(k => {
            const { element, level, mul, add = 0 } = pursuit_with_ct[k];

            const skill = new MagicSkillData.clazz(k, element, level, 0, mul, add, 0, 0, 0, 0, 1, 0, 0, false);
            const d = (new MagicDamageCalculator(clone_status, skill, this.enemy, this.ismin, this.ismax)).get();
            const p = hits_ct.prob[k];

            ret.push(p * d);
            console.log(k, p, d, p * d)
        })


        console.log(ret);

        ret = ret.reduce((r, i) => r + Math.floor(i), 0);



        return ret;
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
