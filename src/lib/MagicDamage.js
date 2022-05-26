import ElementalRelation from "@/lib/ElementalRelation";

class MagicDamageHandler {
    static add_mul(a, b, ix=1, iy=1, dx=1, dy=1, iv=1) {
        return new Proxy({}, {
            get(targets, prop, receiver) {
                return (v, ...args) => {
                    // デフォルトだと倍率部分を足し合わせて元値にかける
                    // ブラギギアと105アクセセットのように同枠にする必要があるときに利用する

                    // それぞれ1を加算した値が返ってくるはずなので-1できるようにしており(dx,dy)
                    // 元値にかける際に1を足せるようにしている(iv)
                    const x = Reflect.get(a, prop)(ix, ...args) - dx;
                    const y = Reflect.get(b, prop)(iy, ...args) - dy;

                    return v * (iv + x + y);
                }
            }
        })
    }

    priority() {
        return 0;
    }

    total_atk(v, obj, ismin, ismax) {
        return v;
    }

    damage_up(v, obj, ismin, ismax) {
        return v;
    }

    element_relation_up(v, obj, ismin, ismax) {
        return v;
    }

    element_damage_up(v, obj, ismin, ismax) {
        return v;
    }

    race_up(v, obj, ismin, ismax) {
        return v;
    }

    size_up(v, obj, ismin, ismax) {
        return v;
    }

    skill_up(v, obj, ismin, ismax) {
        return v;
    }

    ignore_mdef(v, obj, ismin, ismax) {
        return v;
    }

    div_mdef(v, obj, ismin, ismax) {
        return v;
    }

    extra_damage(v, obj, ismin, ismax) {
        return v;
    }

    last(v, obj, ismin, ismax) {
        return v;
    }
    
    f_cast(v, obj) {
        return v;
    }
    v_cast(v, obj) {
        return v;
    }
    delay_pre(v, obj) {
        return v;
    }
    delay(v, obj) {
        return v;
    }
}

class MagicDamageCalculator {
   constructor(status, weapon, skill, enemy) {
       this.status = status;
       this.weapon = weapon;
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

       this.handlers.sort((a, b) => b.priority() - a.priority());
       return this;
   }

   total_atk(ismin=false, ismax=false) {
       const atk = this.status.base_atk + this.status.equip_atk + this.status.refine_atk;
       return this.handlers.reduce((v, h) => h.total_atk(v, this, ismin, ismax), atk);
   }
   
   damage_up(ismin=false, ismax=false) {
       // 魔法ダメージ追加 + 属性モンスターダメUP + BOSSダメUP + ギア効果
       const mul = 100
           + this.status.additional_damage
           + this.status.element_enemy_up
           + this.status.boss_up;

       return this.handlers.reduce((v, h) => h.damage_up(v, this, ismin, ismax), mul);
   }

   element_relation_up(ismin=false, ismax=false) {
       const mul = 100 + ElementalRelation[this.skill.element][this.enemy.element];
       return this.handlers.reduce((v, h) => h.element_relation_up(v, this, ismin, ismax), mul);
   }

   element_damage_up(ismin=false, ismax=false) {
       const mul = 100 + this.status.element_damage_up;
       return this.handlers.reduce((v, h) => h.element_damage_up(v, this, ismin, ismax), mul);
   }

   race_up(ismin=false, ismax=false) {
       const mul = 100 + this.status.race_up;
       return this.handlers.reduce((v, h) => h.race_up(v, this, ismin, ismax), mul);
   }

   size_up(ismin=false, ismax=false) {
       const mul = 100 + this.status.size_up;
       return this.handlers.reduce((v, h) => h.size_up(v, this, ismin, ismax), mul);
   }

   skill_up(ismin=false, ismax=false) {
       const mul = this.skill.mul;
       return this.handlers.reduce((v, h) => h.skill_up(v, this, ismin, ismax), mul);
   }

   div_mdef(ismin=false, ismax=false) {
       const ignore = this.skill.ignore_mdef + this.status.ignore_mdef;
       const i = Math.min(100, this.handlers.reduce((v, h) => h.ignore_mdef(v, this, ismin, ismax), ignore))
       
       const mdef = this.enemy.mdef * (100 - i) / 100;
       const v = (1000 + mdef) / (1000 + mdef * 10);

       return this.handlers.reduce((v, h) => h.div_mdef(v, this, ismin, ismax), v);
   }

   extra_damage(ismin=false, ismax=false) {
       const add = this.status.extra_damage + this.skill.add;
       return this.handlers.reduce((v, h) => h.extra_damage(v, this, ismin, ismax), add);
   }

   get(...args) {
       const [ismin, ismax] = args;

       const total_atk = this.total_atk(...args);
       const damage_up = this.damage_up(...args);
       const element_relation_up = this.element_relation_up(...args);
       const element_damage_up = this.element_damage_up(...args);
       const race_up = this.race_up(...args);
       const size_up = this.size_up(...args);
       const skill_up = this.skill_up(...args);
       const div_mdef = this.div_mdef(...args);
       const extra_damage = this.extra_damage(...args);

       const damage = Math.floor(
           total_atk
           * damage_up / 100
           * element_relation_up / 100
           * element_damage_up / 100
           * race_up / 100
           * size_up / 100
           * skill_up / 100
           * div_mdef
       ) + extra_damage;

       /*
       console.log(`${damage} = Math.floor(
           ${total_atk}
           * ${damage_up} / 100
           * ${element_relation_up} / 100
           * ${element_damage_up} / 100
           * ${race_up} / 100
           * ${size_up} / 100
           * ${skill_up} / 100
           * ${div_mdef}
       ) + ${extra_damage}; `);
       */

       const d = this.handlers.reduce((v, h) => h.last(v, this, ismin, ismax), damage);
       
       if(ismin) return Math.floor(d * 0.97);
       if(ismax) return Math.floor(d * 1.03);
       return Math.floor(d);
   }
   get_min() {
       return this.get(1, 0);
   }
   get_max() {
       return this.get(0, 1);
   }
   
   v_cast() {
       const { skill, weapon, status } = this;
       const { status_int: int, status_dex: dex, equip_variable_cast: equip } = status;
       const t = skill.vcast
            * (1 - Math.sqrt((int/2 + dex) / 265))
            * (1 - equip / 100);
       
       return Math.max(0, this.handlers.reduce((v, h) => h.v_cast(v, this), t));
   }
   f_cast() {
       const { skill, weapon, status } = this;
       const {equip_fix_cast: equip } = status;
       const t = skill.fcast * (1 - equip / 100);

       return Math.max(0, this.handlers.reduce((v, h) => h.f_cast(v, this), t));
   }
   cast_time() {
       return this.v_cast() + this.f_cast();
   }

   delay() {
       const { skill, status } = this;
       const { equip_delay: equip } = status;

       const d = this.handlers.reduce((v, h) => h.delay_pre(v, this), equip);

       const t = skill.delay * (1 - d / 100);
       return Math.max(0, this.handlers.reduce((v, h) => h.delay(v, this), t));
   }
   cast_delay() {
       const d = this.delay();
       return Math.max(this.skill.ct, d);
   }
}

export {
    MagicDamageHandler,
    MagicDamageCalculator
}
