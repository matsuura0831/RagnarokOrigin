import ElementalRelation from "@/lib/ElementalRelation";
import MagicSkillData from "@/lib/MagicSkillData";

class MagicDamageHandler {
    run(s, ismin, ismax) {}
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

       if(this.status.magic_add > 0) {
           const {magic_up: now, magic_add: add} = this.status;
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
       if(v1 > 100) {
           v1 += this.status.element_relation_add;
       }

       const v2 = 100 + ElementalRelation[this.skill.element]['MAX'] + this.status.element_relation_add;
       const p = this.status.element_override;
       
       if(p <= 0) return v1;
       if(this.ismin) return v1;
       if(this.ismax) return v2;
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

       if(this.status.last_up > 0 && this.ismin == false) {
           const limit = (this.status.last_atk_limit > 0) ? atk * this.status.last_atk_limit / 100 : Infinity;
           const limited_d = Math.min(limit, d * this.status.last_up / 100)

           if(this.ismax) {
               d = limited_d;
           } else {
               const p = this.status.last_up_prob / 100;
               d = d * (1.0 - p) + limited_d * p;
           }
       }
              
       if(this.ismin) {
           d = Math.floor(d * 0.97);
       } else if(this.ismax) {
           d = Math.floor(d * 1.03);
       } else {
           d = Math.floor(d);
       }

       if(this.status.double_cast_mul > 0) {
           const clone_status = this.status.clone();

           // 無限にダブルキャスト計算しないように確率をゼロにする
           clone_status.double_cast_mul = 0;
           clone_status.triple_cast_mul = 0;

           const clone_d_skill = this.skill.clone();
           clone_d_skill.mul *= this.status.double_cast_mul / 100;

           // TODO: 計算値が実測値より高かったため暫定対応
           clone_d_skill.add = 0;

           d += (new MagicDamageCalculator(clone_status, clone_d_skill, this.enemy, this.ismin, this.ismax)).get();

           if(this.status.triple_cast_mul > 0) {
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
       const t = (skill.vcast - sub) * (1 - Math.sqrt((int/2 + dex) / 265)) * (1.0 - div / 100);
       
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
       const hit_per_sec = this.skill.hit * cast_per_sec;
       const damage_per_hit = this.get();

       let ret = Math.floor(hit_per_sec * damage_per_hit);

       const eval_per_cast = (this.status.double_cast_mul > 0 ? (this.status.triple_cast_mul > 0 ? 3 : 2) : 1);
       
       const pursuit_keys = Object.keys(this.status.pursuits);
       if(pursuit_keys.length) {
           // 追撃系がある場合は追加する
           const clone_status = this.status.clone();
           
           // ダブルキャスト計算しないように確率をゼロにする
           clone_status.double_cast_mul = 0;
           clone_status.triple_cast_mul = 0;

           pursuit_keys.forEach(k => {
               const { mul = 0, element = '無', prob = 0, ct = 0} = this.status.pursuits[k];

               if(mul > 0 && prob > 0) {
                   const skill = new MagicSkillData.clazz("", element, 0, 0, mul, 0, 0, 0, 0, 0, 1, 0, 0);
                   const d = (new MagicDamageCalculator(clone_status, skill, this.enemy, this.ismin, this.ismax)).get();

                   if(ct <= 0) {
                       // 1回のキャストで発生する確率を求める(発生しない回数を算出して100%から引く)
                       const p = 1.0 - ((1.0 - prob / 100) ** (eval_per_cast));

                       // 回数 * 1回あたりの期待値を加算
                       ret += Math.floor(cast_per_sec * d * p);
                   } else {
                       // CTの間に発動する確率を求める(発生しない回数を算出して100%から引く)
                       const p = 1.0 - ((1.0 - prob / 100) ** (cast_per_sec * ct * eval_per_cast));

                       // CT1回あたりの期待値を秒で割って１秒当たりの期待値にして加算
                       ret += Math.floor(d * p / ct);
                   }
                   
               }
           })
       }

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
        if(Array.isArray(h)) {
            this.handlers = [...this.handlers, ...h]
        } else {
            this.handlers.push(h);
        }
        
        return this;
    }

    build(ismin, ismax) {
        const s = this.status.clone();
        this.handlers.map((h) => h.run(s, ismin, ismax));

        return new MagicDamageCalculator(s, this.skill, this.enemy, ismin, ismax);
    }
}


export {
    MagicDamageHandler,
    MagicDamageCalculator,
    MagicDamageBuilder
}
