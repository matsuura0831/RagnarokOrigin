<template>
  <div class="magic bg-gray-100">
    <div class="flex flex-col items-center px-5">
      <div class="flex flex-col w-full bg-green-50 p-1">
        <Accordion :expand="true">
          <template #title>ダメージ</template>
          <template #content>
          <div class="flex flex-col justify-center items-center">
            <table class="bg-white shadow">
              <thead>
                <tr class="text-md font-semibold text-center border-gray-600">
                  <th class="p-2 w-24"></th>
                  <th class="p-2 w-40">現在</th>
                  <th class="p-2 w-40">補正</th>
                  <th class="p-2 w-40">上昇率[%]</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-right">
                  <td class="p-2 border text-left">期待値</td>
                  <td class="p-2 border">{{ total_damage.toLocaleString() }}</td>
                  <td class="p-2 border">{{ total_damage_adj.toLocaleString() }}</td>
                  <td class="p-2 border">
                    {{ Math.floor((total_damage_adj - total_damage) / total_damage * 100 * 10) / 10 }}
                  </td>
                </tr>
                <tr class="text-right">
                  <td class="p-2 border">最小値</td>
                  <td class="p-2 border">{{ total_min_damage.toLocaleString() }}</td>
                  <td class="p-2 border">{{ total_min_damage_adj.toLocaleString() }}</td>
                  <td class="p-2 border"></td>
                </tr>
                <tr class="text-right">
                  <td class="p-2 border">最大値</td>
                  <td class="p-2 border">{{ total_max_damage.toLocaleString() }}</td>
                  <td class="p-2 border">{{ total_max_damage_adj.toLocaleString() }}</td>
                  <td class="p-2 border"></td>
                </tr>
                <tr class="text-right">
                  <td class="p-2 border">確殺数</td>
                  <td class="p-2 border">{{ Math.ceil(enemy.hp / total_min_damage) }}</td>
                  <td class="p-2 border">{{ Math.ceil(enemy.hp / total_max_damage_adj) }}</td>
                  <td class="p-2 border"></td>
                </tr>

                <tr class="text-right" v-if="skill.name == 'グラビテーションフィールド'">
                  <td class="p-2 border text-left">DPS</td>
                  <td class="p-2 border">{{ total_dps.toLocaleString() }}</td>
                  <td class="p-2 border">{{ total_dps_adj.toLocaleString() }}</td>
                  <td class="p-2 border">
                    {{ Math.floor((total_dps_adj - total_dps) / total_dps * 100 * 10) / 10 }}
                  </td>
                </tr>
                <tr class="text-right" v-if="skill.name == 'グラビテーションフィールド'">
                  <td class="p-2 border">CT</td>
                  <td class="p-2 border">{{ Math.round(total_cast_time * 100) / 100 }}</td>
                  <td class="p-2 border">{{ Math.round(total_cast_time_adj * 100) / 100 }}</td>
                  <td class="p-2 border"></td>
                </tr>
                <tr class="text-right" v-if="skill.name == 'グラビテーションフィールド'">
                  <td class="p-2 border">CD</td>
                  <td class="p-2 border">{{ Math.round(total_cast_delay * 100) / 100 }}</td>
                  <td class="p-2 border">{{ Math.round(total_cast_delay_adj * 100) / 100 }}</td>
                  <td class="p-2 border"></td>
                </tr>


              </tbody>
            </table>

            <input type="button" value="Save &amp; Copy" @click="setPersistentUrl"
                class="bg-blue-500 font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 mt-2" />
          </div>
          </template>
        </Accordion>

        <Accordion>
          <template #title>計算式</template>
          <template #content>
            <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-2 w-full justify-center">
              <pre class="text-sm bg-gray-100 p-2 whitespace-pre-wrap">
(魔法攻撃[{{ status.base_atk + status.equip_atk }}] + 精練魔法攻撃[{{ status.refine_atk }}]) 
   * (100% + 魔法ダメージ%[{{ status.additional_damage }} + ギア効果] + 属性モンスターダメUP%[{{ status.element_enemy_up }}] + BOSSダメUP%[{{ status.boss_up }}])
   * (100% + 属性相性%[{{ element_up }}]) * (100% + 属性ダメージUP%[{{ status.element_damage_up }}])
   * (100% + 種族モンスターダメUP%[{{ status.race_up }}])
   * (100% + サイズモンスターダメUP%[{{ status.size_up }}])
   * スキル倍率%[{{ skill.mul }}] * (100% + 改造スキルダメージUP%[{{ weapon.custom_skill_up }}])
   * 敵除算MDEF%[{{ div_mdef }}]
+ 追加ダメージ[{{ status.extra_damage }}] + スキル追加ダメージ[{{ skill.add }}]
              </pre>

              <pre class="text-sm bg-gray-100 p-2 whitespace-pre-wrap">
(魔法攻撃[{{ status_adjustment.base_atk + status_adjustment.equip_atk }}] + 精練魔法攻撃[{{ status_adjustment.refine_atk }}]) 
   * (100% + 魔法ダメージ%[{{ status_adjustment.additional_damage }} + ギア効果] + 属性モンスターダメUP%[{{ status_adjustment.element_enemy_up }}] + BOSSダメUP%[{{ status_adjustment.boss_up }}])
   * (100% + 属性相性%[{{ element_up }}]) * (100% + 属性ダメージUP%[{{ status_adjustment.element_damage_up }}])
   * (100% + 種族モンスターダメUP%[{{ status_adjustment.race_up }}])
   * (100% + サイズモンスターダメUP%[{{ status_adjustment.size_up }}])
   * スキル倍率%[{{ skill.mul }}] * (100% + 改造スキルダメージUP%[{{ weapon.custom_skill_up }}])
   * 敵除算MDEF%[{{ div_mdef }}]
+ 追加ダメージ[{{ status_adjustment.extra_damage }}] + スキル追加ダメージ[{{ skill.add }}]
              </pre>
            </div>
          </template>
        </Accordion>
      </div>

      <div class="flex flex-col lg:grid lg:grid-cols-5 lg:gap-x-2 w-full justify-center">
        <div class="col-span-2 bg-white shadow text-sm p-4">
          <StatusInput v-model:status="status" v-model:status_adj="status_adj" />
        </div>

        <div class="bg-white shadow text-sm p-4">
          <h1 class="mb-4 font-bold text-lg border-b-2 border-green-600">対象モンスター</h1>
              
          <div class="flex items-center mb-1">
            <select
                name="enemy"
                class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                v-model="target_enemy" @change="changeEnemy">
              <option v-for="record in enemy_data" :value="record.name" :key="record.name">{{ record.name }}</option>
            </select>
          </div>

          <EnemyInput v-model="enemy" />
        </div>

        <div class="bg-white shadow text-sm p-4">
          <h1 class="mb-4 font-bold text-lg border-b-2 border-green-600">使用スキル</h1>
              
          <div class="flex items-center mb-1">
            <select
                name="skill"
                class="flex-none py-2 mr-1 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                v-model="target_skill" @change="changeSkill">
              <option v-for="(v, k) in skill_data" :value="k" :key="k">{{ k }}</option>
            </select>

            <select
                name="skill_level"
                class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                v-model="target_skill_level" @change="changeSkillLevel">
              <option v-for="i in Object.keys(skill_data[target_skill]).sort((a, b) => b - a)" :value="i" :key="i">{{ i }}</option>
            </select>
          </div>

          <SkillInput v-model="skill" />

          <h1 class="mb-4 font-bold text-lg border-b-2 border-green-600">補助スキル</h1>

          <div class="flex items-center mb-1" v-for="(v, k, i) in sub_skill_data" :key="k">
            <label class="inline-block flex-none w-24 mr-2 text-right font-bold text-gray-600">{{ k }}</label>

            <select
                :name="`sub_skill${i}_level`"
                class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                v-model="target_sub_skill_level[k]" @change="changeSubSkill(k)">
              <option v-for="j in Object.keys(sub_skill_data[k]).sort((a, b) => b - a)" :value="j" :key="j">{{ j }}</option>
            </select>

          </div>

        </div>

        <div class="bg-white shadow text-sm p-4">
          <h1 class="mb-4 font-bold text-lg border-b-2 border-green-600">装備改造</h1>
          <WeaponInput v-model="weapon" />

          <h1 class="mb-4 font-bold text-lg border-b-2 border-green-600">使用ギア</h1>

          <div class="flex items-center mb-1" v-for="(v, k, i) in gear_data" :key="k">
            <label class="inline-block flex-none w-24 mr-2 text-right font-bold text-gray-600">{{ k }}</label>

            <select
                :name="`gear${i}_level`"
                class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                v-model="target_gear_level[k]" @change="changeGear(k)">
              <option v-for="j in Object.keys(gear_data[k]).sort((a, b) => b - a)" :value="j" :key="j">{{ j }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatusInput from "@/components/StatusInput.vue";
import EnemyInput from "@/components/EnemyInput.vue";
import SkillInput from "@/components/SkillInput.vue";
import WeaponInput from "@/components/WeaponInput.vue";
import Accordion from "@/components/Accordion.vue";

import CharacterStatus from "@/lib/CharacterStatus";
import EnemyData from "@/lib/EnemyData";
import MagicSkillData from "@/lib/MagicSkillData";
import SubSkillData from "@/lib/SubSkillData";
import WeaponData from "@/lib/WeaponData";
import MagicGearData from "@/lib/MagicGearData";
import ElementalRelation from "@/lib/ElementalRelation";

const zlib = require('zlib')

// URLのPrefix
const url_prefix = "#/magic/";

// URL永続化用の設定
const persistent_list = [
  { key: 'status', clazz: CharacterStatus },
  { key: 'status_adj', clazz: CharacterStatus },
  { key: 'enemy', clazz: EnemyData.clazz },
  { key: 'skill', clazz: MagicSkillData.clazz },
  { key: 'weapon', clazz: WeaponData.clazz },
  { key: 'gear', clazz: [...Object.keys(MagicGearData.data).map(_ => MagicGearData.clazz)] },
  { key: 'sub_skill', clazz: [...Object.keys(SubSkillData.data).map(_ => SubSkillData.clazz)] },
];

export default {
  components: {
    StatusInput,
    EnemyInput,
    SkillInput,
    WeaponInput,
    Accordion,
  },
  data() {
    const data = {
      status: new CharacterStatus(),
      status_adj: new CharacterStatus(),
      enemy: EnemyData.getEnemy('カカシ(中)'),
      skill: MagicSkillData.getSkill('グラビテーションフィールド'),
      weapon: WeaponData.EMPTY(),

      gear: [...Object.keys(MagicGearData.data).map(k => MagicGearData.getGear(k))],
      sub_skill: [...Object.keys(SubSkillData.data).map(k => SubSkillData.getSkill(k))],
    };

    const target_gear_level = {};
    data.gear.forEach(o => target_gear_level[o.name] = o.level );

    const target_sub_skill_level = {};
    data.sub_skill.forEach(o => target_sub_skill_level[o.name] = o.level );

    return Object.assign(data, {
      enemy_data: EnemyData.data,
      skill_data: MagicSkillData.data,
      gear_data: MagicGearData.data,
      sub_skill_data: SubSkillData.data,
      target_enemy: data.enemy.name,
      target_skill: data.skill.name,
      target_skill_level: data.skill.level,
      target_gear_level: target_gear_level,
      target_sub_skill_level: target_sub_skill_level,
    });
  },
  methods: {
    changeEnemy() {
      const enemy = EnemyData.getEnemy(this.target_enemy);
      Object.assign(this.enemy, enemy);
    },
    changeSkill() {
      const skill = MagicSkillData.getSkill(this.target_skill);

      this.target_skill_level = skill.level;
      Object.assign(this.skill, skill);
    },
    changeSkillLevel() {
      const skill = MagicSkillData.getSkill(this.target_skill, this.target_skill_level);
      Object.assign(this.skill, skill);
    },
    getGear(k) {
      return this.gear.filter(o => o.name == k)[0];
    },
    getGearHandler(k) {
      return MagicGearData.getGearHandler(this.getGear(k));
    },
    changeGear(k) {
      const gear = MagicGearData.getGear(k, this.target_gear_level[k]);
      Object.assign(this.getGear(k), gear);
    },
    getSubSkill(k) {
      return this.sub_skill.filter(o => o.name == k)[0];
    },
    getSubSkillHandler(k) {
      return SubSkillData.getSkillHandler(this.getSubSkill(k));
    },
    changeSubSkill(k) {
      const skill = SubSkillData.getSkill(k, this.target_sub_skill_level[k]);
      Object.assign(this.getSubSkill(k), skill);
    },

    async setPersistentUrl() {
      const deflated_str = this.getPersistentString(this);
      history.pushState(null,null,`/${url_prefix}#${deflated_str}`);
      await navigator.clipboard.writeText(location.href);

      this.$toast.show('URLの更新とコピーを完了しました', { type: 'info', position: 'top-right', duration: 4000})
    },

    getDamage(status, isMinimum=false, isMaximum=false) {
      const { skill, weapon } = this;
      const { element_up, div_mdef } = this;

      const additional_damage = status.additional_damage
        + this.getGearHandler('コアオーバクロック').run(isMinimum, isMaximum)
        ;

      const damage = Math.floor(
          (status.base_atk + status.equip_atk + status.refine_atk)
          * (1 + additional_damage / 100 + status.element_enemy_up / 100 + status.boss_up / 100)
          * (1 + element_up / 100) * (1 + status.element_damage_up / 100)
          * (1 + status.race_up / 100)
          * (1 + status.size_up / 100)
          * (skill.mul / 100) * (1 + weapon.custom_skill_up / 100)
          * div_mdef
      ) + status.extra_damage + skill.add
      ;

      console.log(
          (status.base_atk + status.equip_atk + status.refine_atk),
          (1 + additional_damage / 100 + status.element_enemy_up / 100 + status.boss_up / 100)
          * (1 + element_up / 100) * (1 + status.element_damage_up / 100)
          * (1 + status.race_up / 100)
          * (1 + status.size_up / 100)
          * (skill.mul / 100) * (1 + weapon.custom_skill_up / 100),
          div_mdef,
          status.extra_damage + skill.add
      );

      if(isMinimum) return Math.floor(damage * 0.97);
      if(isMaximum) return Math.floor(damage * 1.03);
      return damage;
    },
    
    getVcast(status) {
      const { skill } = this;
      const { status_int: int, status_dex: dex, equip_variable_cast: equip } = status;

      return skill.vcast * (1 - Math.sqrt((int/2 + dex) / 265)) * (1 - equip / 100);
    },
    getFcast(status) {
      const { skill } = this;
      const { equip_fix_cast: equip } = status;

      return skill.fcast * (1 - equip / 100);
    },
    getDelay(status) {
      const { skill } = this;
      const { equip_delay: equip } = status;

      return skill.delay * (1 - equip / 100);
    },

    getPersistentString(data) {
      const persistent_data = {}
      persistent_list.forEach(v => {
        if(Array.isArray(data[v.key])) {
          persistent_data[v.key] = data[v.key].map(v => v.serialize());
        } else {
          persistent_data[v.key] = data[v.key].serialize()
        }
      });

      const str = JSON.stringify(persistent_data);
      const str_enc = encodeURIComponent(str);

      const deflated = zlib.gzipSync(str_enc);
      const deflated_str = deflated.toString('base64');
      return deflated_str;
    },

    parsePersistentString(deflated_str) {
      const buf = Buffer.from(deflated_str, 'base64');
      const result = zlib.unzipSync(buf);
      const inflated_str = decodeURIComponent(result).toString('utf-8');
      const inflated_data = JSON.parse(inflated_str);

      const data = {};
      persistent_list.forEach(v => {
        if(Array.isArray(v.clazz)) {
          data[v.key] = v.clazz.map((c, i) => c.deserialize(inflated_data[v.key][i]));
        } else {
          data[v.key] = v.clazz.deserialize(inflated_data[v.key]);
        }
      })
      return data;
    }
  },

  computed: {
    div_mdef() {
      const { status, skill, enemy } = this;
      const _ignore_mdef = Math.min(100, skill.ignore_mdef || status.ignore_mdef);
      const _mdef = enemy.mdef * (1 - _ignore_mdef / 100);
      return (1000 + _mdef) / (1000 + _mdef * 10);
    },
    element_up() {
      const { skill, enemy, sub_skill } = this;
      const v = ElementalRelation[skill.element][enemy.element];

      const s = sub_skill.filter(o => o.name == '属性感知')[0];
      const h = SubSkillData.getSkillHandler(s).element_up(s.level, this)

      return v + h;
    },

    status_adjustment() {
      return this.status.adjust(this.status_adj);
    },

    total_damage() {
      return this.getDamage(this.status);
    },
    total_min_damage() {
      return this.getDamage(this.status, true, false);
    },
    total_max_damage() {
      return this.getDamage(this.status, false, true);
    },
    total_damage_adj() {
      return this.getDamage(this.status_adjustment);
    },
    total_min_damage_adj() {
      return this.getDamage(this.status_adjustment, true, false);
    },
    total_max_damage_adj() {
      return this.getDamage(this.status_adjustment, false, true);
    },

    total_cast_time() {
      return this.getFcast(this.status) + this.getVcast(this.status);
    },
    total_cast_time_adj() {
      return this.getFcast(this.status_adjustment) + this.getVcast(this.status_adjustment);
    },
    total_cast_delay() {
      return this.getDelay(this.status);
    },
    total_cast_delay_adj() {
      return this.getDelay(this.status_adjustment);
    },

    total_cast_per_second() {
      const { skill, total_cast_time: ct, total_cast_delay: cd } = this;
      return skill.time / (ct + cd);
    },
    total_cast_per_second_adj() {
      const { skill, total_cast_time_adj: ct, total_cast_delay_adj: cd } = this;
      return skill.time / (ct + cd);
    },

    total_hit_per_second() {
      const { skill, total_cast_per_second: n } = this;
      return skill.hit / skill.time * n;
    },
    total_hit_per_second_adj() {
      const { skill, total_cast_per_second_adj: n } = this;
      return skill.hit / skill.time * n;
    },

    total_dps() {
      return Math.floor(this.total_hit_per_second * this.total_damage)
    },
    total_dps_adj() {
      return Math.floor(this.total_hit_per_second_adj * this.total_damage_adj)
    },


  },

  created() {
    if(location.hash.startsWith(url_prefix) && location.hash.length > url_prefix.length) {
      const persistent_str = location.hash.slice(url_prefix.length + 1);

      try {
        const persistent_data = this.parsePersistentString(persistent_str);

        Object.keys(persistent_data).forEach(k => {
          let v = persistent_data[k];

          Object.assign(this[k], v);

          if(k === "enemy") {
            this.target_enemy = v.name;
          }
          if(k === "skill") {
            this.target_skill = v.name;
            this.target_skill_level = v.level;
          }
          if(k === "gear") {
            v.forEach(g => this.target_gear_level[g.name] = g.level);
          }
          if(k === "sub_skill") {
            v.forEach(s => this.target_sub_skill_level[s.name] = s.level);
          }
        })
      } catch(e) {
        this.$toast.show(e, { type: 'error', position: 'top-right', duration: 4000})
      }
    }
  },
};
</script>
