import { shallowMount } from '@vue/test-utils'
import EnemyData from "@/lib/EnemyData";

describe('EnemyData', () => {
  describe('#getEnemy()', () => {
    it('can get ポリン', () => {
      const e = EnemyData.getEnemy('ポリン');

      expect(e.name).toBe('ポリン');
      expect(e.race).toBe('植物');
      expect(e.element).toBe('水');
      expect(e.size).toBe('中');
      expect(e.base).toBe(3);
      expect(e.hp).toBe(21);
      expect(e.def).toBe(2);
      expect(e.mdef).toBe(5);
      expect(e.vit).toBe(1);
      expect(e.agi).toBe(1);
      expect(e.type).toBe('NORMAL');
    });

    it('safe race', () => {
      EnemyData.data.forEach(e => {
        expect(e.race).toEqual(expect.stringMatching(
          '動物|人間|悪魔|不死|植物|昆虫|魚介|無形|天使|竜'
        ));
      });
    });

    it('safe size', () => {
      EnemyData.data.forEach(e => {
        expect(e.size).toEqual(expect.stringMatching('小|中|大'));
      });
    });

    it('safe element', () => {
      EnemyData.data.forEach(e => {
        expect(e.element).toEqual(expect.stringMatching(
          '無|風|地|火|水|毒|聖|闇|念|死'
        ));
      });
    });

    it('safe type', () => {
      EnemyData.data.forEach(e => {
        expect(e.type).toEqual(expect.stringMatching(
          'NORMAL|MINI|MVP'
        ));
      });
    });

  })
})
