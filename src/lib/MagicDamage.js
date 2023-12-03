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
        const element_damage_map = {
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
        };

        const v = 100 + element_damage_map[this.skill.element];
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

        let pursuit_with_ct = {};
        let pursuit_without_ct = {};

        Object.keys(this.status.pursuits).forEach(k => {
            const p = this.status.pursuits[k];

            if ('ct' in p && p.ct > 0) {
                pursuit_with_ct[k] = p;
            } else {
                pursuit_without_ct[k] = p;
            }
        });

        function _sum(o, target) {
            return Object.keys(o).reduce((p, k) => {
                return p + o[target][k]
            }, 0);
        }

        // CT無を複数刺した場合の判定回数を計算
        const TH_HIT = 0.001; // スキル倍率1000%ぐらいを想定して倍率が1%を下回らないようなHIT数にする
        function _calc_noct(base_pursuits, base_name, base_element, base_hit = 0, cache = undefined) {
            let hits = {
                total: base_hit,
                skill: cache ? cache.skill : new DefaultDict(() => new DefaultDict(0)),
                element: cache ? cache.element : new DefaultDict(() => new DefaultDict(0)),
            };

            if (base_name) hits.skill[base_name][base_name] = base_hit;
            if (base_element) hits.element[base_element][base_name] = base_hit;

            function _calc(parent_name, parent_element, parent_hit, pursuits) {
                Object.keys(pursuits).forEach(k => {
                    const pursuit = pursuits[k]
                    const { prob, element, hit, ct, alias = '' } = pursuit;

                    if (pursuit.check(parent_name, parent_element)) {
                        let h = parent_hit * prob / 100 * hit;
                        if (ct <= 0 && h >= TH_HIT) {
                            hits['total'] += h;
                            hits.skill[alias || k][k] += h;
                            hits.element[element][k] += h;

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

        function _calc_ct(pursuits, hits_noct, cache = undefined) {
            let hits_ct = {
                total: cache ? cache.total : 0,
                skill: cache ? cache.skill : new DefaultDict(() => new DefaultDict(0)),
                element: cache ? cache.element : new DefaultDict(() => new DefaultDict(0)),
                prob: cache ? cache.prob : new DefaultDict(0),
            }
            let prev_total = 0;

            do {
                prev_total = hits_ct.total;
                hits_ct.total = 0;

                Object.keys(pursuits).forEach(k => {
                    const { prob, element, hit, ct, target_skill, target_element, alias = '' } = pursuits[k];

                    let n = 0;
                    if (target_skill) {
                        n = _sum(hits_noct.skill, target_skill) + _sum(hits_ct.skill, target_skill);
                    } else if (target_element) {
                        n = hits_noct.element[target_element] + _sum(hits_ct.element, target_element);
                    } else {
                        n = hits_noct.total + Object.keys(hits_ct.skill).reduce((i, k1) => {
                            return i + Object.keys(hits_ct.skill[k1]).reduce((j, k2) => {
                                return k == k2 ? j : j + hits_ct.skill[k1][k2]; // 自分自身は含まない
                            }, 0);
                        }, 0);
                    }

                    const np = (1.0 - prob / 100) ** n;
                    const pp = (1.0 - np);
                    const h = pp * hit / ct;                    // CTが2秒ならヒット数は0.5倍、CTが0.5秒ならヒット数は2倍
                    hits_ct.total += h;
                    hits_ct.skill[alias || k][k] = h;
                    hits_ct.element[element][k] = h;

                    hits_ct.prob[k] = pp;
                })
            } while ((hits_ct.total - prev_total) > TH_HIT);

            return hits_ct;
        }

        let hits_noct = _calc_noct(pursuit_without_ct, this.skill.name, this.skill.element, hit_per_sec);
        console.log("noct1", pursuit_without_ct);

        console.log({
            total: hits_noct.total,
            skill: DefaultDict.deepcopy(hits_noct.skill),
            element: DefaultDict.deepcopy(hits_noct.element),
        })

        let hits_ct = _calc_ct(pursuit_with_ct, hits_noct)

        console.log("ct1", pursuit_with_ct);
        console.log({
            total: hits_ct.total,
            skill: DefaultDict.deepcopy(hits_ct.skill),
            element: DefaultDict.deepcopy(hits_ct.element),
            prob: DefaultDict.deepcopy(hits_ct.prob),
        })

        let element_map = {};
        Object.keys(hits_ct.element).forEach(k1 => {
            Object.keys(hits_ct.element[k1]).forEach(k2 => {
                element_map[k2] = k1;
            });
        });
        console.log(element_map);

        // hits_noct = _calc_noct(pursuit_without_ct, '', '', hits_ct.total, hits_noct);
        Object.keys(hits_ct.skill).forEach(k1 => {
            Object.keys(hits_ct.skill[k1]).forEach(k2 => {
                hits_noct = _calc_noct(pursuit_without_ct, k1, element_map[k2], hits_ct.skill[k1][k2], hits_noct);
            })
        })

        console.log("noct2", pursuit_without_ct);
        console.log({
            total: hits_noct.total,
            skill: DefaultDict.deepcopy(hits_noct.skill),
            element: DefaultDict.deepcopy(hits_noct.element),
        })

        let ret = [];

        // base
        let base_dmg = this.get();
        ret.push([hit_per_sec, hit_per_sec * base_dmg]);

        console.log(`${this.skill.name}{ level:${this.skill.level}, el:${this.skill.element}, mul:${this.skill.mul}, add:${this.skill.add}, prob:100, hit:${this.skill.hit} }, n=${hit_per_sec}, d=${base_dmg}, dps=${(hit_per_sec*base_dmg).toLocaleString()}`);
        
        // ダブルキャスト計算しないように確率をゼロにする
        const clone_status = this.status.clone();
        clone_status.double_cast_mul = 0;
        clone_status.triple_cast_mul = 0;

        // noct
        Object.keys(pursuit_without_ct).forEach(k => {
            const { element, level, mul, prob, hit, add = 0, alias=""} = pursuit_without_ct[k];

            const skill = new MagicSkillData.clazz(k, element, level, 0, mul, add, 0, 0, 0, 0, 1, 0, 0, false);
            const d = (new MagicDamageCalculator(clone_status, skill, this.enemy, this.ismin, this.ismax)).get();
            const n = hits_noct.skill[alias || k][k];

            ret.push([n, n * d]);
            console.log(`${k}{ level:${level}, el:${element}, mul:${mul}, add:${add}, prob:${prob}, hit:${hit}, ct:0 }, n=${n}, d=${d}, dps=${(n*d).toLocaleString()}`);
        })

        // ct
        Object.keys(pursuit_with_ct).forEach(k => {
            const { element, level, mul, prob, hit, ct, add = 0 } = pursuit_with_ct[k];

            const skill = new MagicSkillData.clazz(k, element, level, 0, mul, add, 0, 0, 0, 0, 1, 0, 0, false);
            const d = (new MagicDamageCalculator(clone_status, skill, this.enemy, this.ismin, this.ismax)).get();
            const p = hits_ct.prob[k];

            ret.push([p * hit, p * hit * d]);
            console.log(`${k}{ level:${level}, el:${element}, mul:${mul}, add:${add}, prob:${prob}, hit:${hit}, ct:${ct} }, p=${p}, d=${d}, dps=${(p*hit*d).toLocaleString()}`);
        })


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
