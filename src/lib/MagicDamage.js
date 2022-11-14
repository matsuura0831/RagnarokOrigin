import ElementalRelation from "@/lib/ElementalRelation";

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
       const v = 100 + ElementalRelation[this.skill.element][this.enemy.element] + this.status.element_relation_add
       return v;
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
       const mdef = (this.enemy.mdef - this.status.ignore_mdef_sub) * (100 - ignore) / 100; // TODO: 仮で最初に減算するとする
       const v = (1000 + mdef) / (1000 + mdef * 10);

       return v;
   }

   total_extra_damage() {
       const v = this.status.extra_damage + this.skill.add;
       return v;
   }

   total_pve_damage_up() {
       const v = 100 + this.status.pve_damage_up / 100;   // TODO: 仮でPVEダメージアップは 100 = 1%とする
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
                    ) + this.total_extra_damage()
           ) * this.total_pve_damage_up() / 100
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
              
       if(this.ismin) return Math.floor(d * 0.97);
       if(this.ismax) return Math.floor(d * 1.03);
       return Math.floor(d);
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
       return t;
   }
   cast_delay() {
       const d = this.delay();
       return Math.max(this.skill.ct, d);
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
