import { MagicDamageCalculator, MagicDamageHandler } from "@/lib/MagicDamage";

import CharacterStatus from "@/lib/CharacterStatus";
import EnemyData from "@/lib/EnemyData";
import MagicSkillData from "@/lib/MagicSkillData";
//import SubSkillData from "@/lib/SubSkillData";
import WeaponData from "@/lib/WeaponData";
//import MagicGearData from "@/lib/MagicGearData";

describe('MagicDamage', () => {
  const status = new CharacterStatus(100, 200, 300);
  const weapon = new WeaponData();
  const skill = MagicSkillData.getSkill('グラビテーションフィールド', 5);
  const enemy = EnemyData.getEnemy('ポリン');

  describe('#total_atk', () => {
    it('get value', () => {
      const d = new MagicDamageCalculator(status, weapon, skill, enemy);
      expect(d.total_atk()).toEqual(600);
    });

    it('get value with handler', () => {
      const d = new MagicDamageCalculator(status, weapon, skill, enemy);

      d.handler(new class extends MagicDamageHandler {
        total_atk(v, obj) {
          return v + 100;
        }
      });
      expect(d.total_atk()).toEqual(700);
    });
  });

  describe('#damage_up', () => {
    const weapon = new WeaponData();
    const skill = MagicSkillData.getSkill('グラビテーションフィールド', 5);
    const enemy = EnemyData.getEnemy('ポリン');

    it('get value', () => {
      const s = status.clone();
      s.additional_damage = 100;

      const d = new MagicDamageCalculator(s, weapon, skill, enemy);
      expect(d.damage_up()).toEqual(200);
    });

    it('get value with boss_up', () => {
      const s = status.clone();
      s.boss_up = 200;

      const d = new MagicDamageCalculator(s, weapon, skill, enemy);
      expect(d.damage_up()).toEqual(300);
    });

    it('get value with element_enemy_up', () => {
      const s = status.clone();
      s.element_enemy_up = 300;

      const d = new MagicDamageCalculator(s, weapon, skill, enemy);
      expect(d.damage_up()).toEqual(400);
    });

    it('get value with infight gear Lv7', () => {
      const s = status.clone();

      const d = new MagicDamageCalculator(s, weapon, skill, enemy);
      d.handler(new class extends MagicDamageHandler {
        damage_up(v, obj) {
          return v + 7;
        }
      });

      expect(d.damage_up()).toEqual(107);
    });

    it('get value with core-over-clock gear Lv7', () => {
      const s = status.clone();

      const d = new MagicDamageCalculator(s, weapon, skill, enemy);
      d.handler(new class extends MagicDamageHandler {
        damage_up(v, obj, ismin, ismax) {
          if(ismin) return v - 15;
          if(ismax) return v + 40;
          return v + (40 - 15) / 2;
        }
      });

      expect(d.damage_up(0, 0)).toBeCloseTo(112.5);
      expect(d.damage_up(0, 1)).toBeCloseTo(140);
      expect(d.damage_up(1, 0)).toBeCloseTo(85);
    });
  })

  describe('#element_relation_up', () => {
    const weapon = new WeaponData();
    const skill = MagicSkillData.getSkill('グラビテーションフィールド', 5);
    const e1 = EnemyData.getEnemy('ポリン');    // 相性 +0
    const e2 = EnemyData.getEnemy('フリオニ');  // 相性 -30
    const e3 = EnemyData.getEnemy('ドレイク');  // 相性 +25

    it('get value', () => {
      const d1 = new MagicDamageCalculator(status, weapon, skill, e1);
      const d2 = new MagicDamageCalculator(status, weapon, skill, e2);
      const d3 = new MagicDamageCalculator(status, weapon, skill, e3);

      expect(d1.element_relation_up()).toBeCloseTo(100);
      expect(d2.element_relation_up()).toBeCloseTo(70);
      expect(d3.element_relation_up()).toBeCloseTo(125);
    })

    it('get value with 属性感知', () => {
      const h = new class extends MagicDamageHandler {
        element_relation_up(v, obj, ismin, ismax) {
          if(v > 100 && ['風', '地', '火', '水', '念'].includes(obj.skill.element)) {
            return v + 25;
          }
          return v;
        }
      };

      const d1 = new MagicDamageCalculator(status, weapon, skill, e1).handler(h);
      const d2 = new MagicDamageCalculator(status, weapon, skill, e2).handler(h);
      const d3 = new MagicDamageCalculator(status, weapon, skill, e3).handler(h);

      expect(d1.element_relation_up()).toBeCloseTo(100);
      expect(d2.element_relation_up()).toBeCloseTo(70);
      expect(d3.element_relation_up()).toBeCloseTo(150);
    });
  });

  describe('#element_damage_up', () => {
    const weapon = new WeaponData();
    const skill = MagicSkillData.getSkill('グラビテーションフィールド', 5);
    const enemy = EnemyData.getEnemy('ポリン');

    it('get value', () => {
      const s1 = status.clone()
      const s2 = status.clone()
      s2.element_damage_up = 100;

      const d1 = new MagicDamageCalculator(s1, weapon, skill, enemy);
      const d2 = new MagicDamageCalculator(s2, weapon, skill, enemy);
      
      expect(d1.element_damage_up()).toEqual(100);
      expect(d2.element_damage_up()).toEqual(200);
    })
  });

  describe('#race_up', () => {
    const weapon = new WeaponData();
    const skill = MagicSkillData.getSkill('グラビテーションフィールド', 5);
    const enemy = EnemyData.getEnemy('ポリン');

    it('get value', () => {
      const s1 = status.clone()
      const s2 = status.clone()
      s2.race_up = 100;

      const d1 = new MagicDamageCalculator(s1, weapon, skill, enemy);
      const d2 = new MagicDamageCalculator(s2, weapon, skill, enemy);
      
      expect(d1.race_up()).toEqual(100);
      expect(d2.race_up()).toEqual(200);
    })
  });

  describe('#size_up', () => {
    const weapon = new WeaponData();
    const skill = MagicSkillData.getSkill('グラビテーションフィールド', 5);
    const enemy = EnemyData.getEnemy('ポリン');

    it('get value', () => {
      const s1 = status.clone()
      const s2 = status.clone()
      s2.size_up = 100;

      const d1 = new MagicDamageCalculator(s1, weapon, skill, enemy);
      const d2 = new MagicDamageCalculator(s2, weapon, skill, enemy);
      
      expect(d1.size_up()).toEqual(100);
      expect(d2.size_up()).toEqual(200);
    })
  });

  describe('#skill_up', () => {
    const weapon = new WeaponData();
    const skill = MagicSkillData.getSkill('アイスボルト', 10);
    const enemy = EnemyData.getEnemy('ポリン');

    it('get value', () => {
      const d = new MagicDamageCalculator(status, weapon, skill, enemy);
      expect(d.skill_up()).toBeCloseTo(1000);
    });

    it('get value with 海竜の杖+10 改造:コールドボルトダメージ+5%', () => {
      const d = new MagicDamageCalculator(status, weapon, skill, enemy);
      d.handler([
        new class extends MagicDamageHandler {
          priority() { return 1; }
          skill_up(v, obj, ismin, ismax) {
            return v + 200;
          }
        },
        new class extends MagicDamageHandler {
          skill_up(v, obj, ismin, ismax) {
            return v * 1.05;
          }
        },
      ]);

      expect(d.skill_up()).toBeCloseTo(1260);
    });

    it('get value with 海竜の杖+10 改造:コールドボルトダメージ+5% ヴァルキリー栄耀 ブラギギアLv7', () => {
      const d = new MagicDamageCalculator(status, weapon, skill, enemy);
      d.handler([
        new class extends MagicDamageHandler {
          priority() { return 1; }
          skill_up(v, obj, ismin, ismax) {
            return v + 200;
          }
        },
        new class extends MagicDamageHandler {
          skill_up(v, obj, ismin, ismax) {
            return v * 1.05;
          }
        },
        MagicDamageHandler.add_mul(
          new class extends MagicDamageHandler {
            skill_up(v, obj, ismin, ismax) {
              return v * 1.20;
            }
          },
          new class extends MagicDamageHandler {
            skill_up(v, obj, ismin, ismax) {
              return v * 1.12;
            }
          }
        )
      ]);

      expect(d.skill_up()).toBeCloseTo(1663.2);
    });
  });

  describe('#get', () => {
    const weapon = new WeaponData();
    const enemy = EnemyData.getEnemy('カカシ(小)');

    it('get value', () => {
      const skill = MagicSkillData.getSkill('グラビテーションフィールド', 5);
      const d = new MagicDamageCalculator(status, weapon, skill, enemy);
      
      expect(d.get(0, 0)).toEqual(1710);  // atk(600) * skill(4) * elment(0.7) + skill(30) = 1710
      expect(d.get(0, 1)).toEqual(Math.floor(1710 * 1.03));
      expect(d.get(1, 0)).toEqual(Math.floor(1710 * 0.97));
    });

    describe('get value with ゲンドゥルの意思', () => {
      const skill= MagicSkillData.getSkill('ライトニングボルト', 10);

      const h = new class extends MagicDamageHandler {
        last(v, obj, ismin, ismax) {
          const atk = obj.status.base_atk + obj.status.equip_atk + obj.status.refine_atk;
          return Math.min(v * 2.5, atk * 50.0)
        }
      };

      it('under atk', () => {
        const s = status.clone();
        const d = new MagicDamageCalculator(s, weapon, skill, enemy).handler(h);

        // atk(600) * skill(10) + skill(800) = 6800
        // 6800 * 2.5 = 17000
        expect(d.get(0, 0)).toEqual(17000);
      });

      it('over atk', () => {
        const s = status.clone();
        s.additional_damage = 100;
  
        const d = new MagicDamageCalculator(s, weapon, skill, enemy).handler(h);
  
        // atk(600) * skill(10) * status(2) + skill(800) = 12800
        // 12800 * 2.5 = 32000 ... but atk(600) * 50 = 30000
        expect(d.get(0, 0)).toEqual(30000);
      });
    });
  });



});
