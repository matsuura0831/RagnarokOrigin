<template>
  <div class="magic bg-gray-100 pt-1">
    <div class="flex flex-col items-center px-5">
      <div class="flex flex-col w-full bg-white my-2 px-4">
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
                    <td class="p-2 border">{{ Math.ceil(enemy.hp / total_min_damage_adj) }}</td>
                    <td class="p-2 border"></td>
                  </tr>

                  <tr class="text-right">
                    <td class="p-2 border text-left">DPS</td>
                    <td class="p-2 border">{{ total_dps.toLocaleString() }}</td>
                    <td class="p-2 border">{{ total_dps_adj.toLocaleString() }}</td>
                    <td class="p-2 border">
                      {{ Math.floor((total_dps_adj - total_dps) / total_dps * 100 * 10) / 10 }}
                    </td>
                  </tr>
                  <tr class="text-right">
                    <td class="p-2 border">CT</td>
                    <td class="p-2 border">
                      {{ Math.round(total_cast_time * 100) / 100 }}
                    </td>
                    <td class="p-2 border">
                      {{ Math.round(total_cast_time_adj * 100) / 100 }}
                    </td>
                    <td class="p-2 border"></td>
                  </tr>
                  <tr class="text-right">
                    <td class="p-2 border">CD</td>
                    <td class="p-2 border">
                      {{ Math.round(total_cast_delay * 100) / 100 }}
                    </td>
                    <td class="p-2 border">
                      {{ Math.round(total_cast_delay_adj * 100) / 100 }}
                    </td>
                    <td class="p-2 border"></td>
                  </tr>

                  <tr class="text-right">
                    <td class="p-2 border text-left">攻撃回数</td>
                    <td class="p-2 border">{{ total_hit }}</td>
                    <td class="p-2 border">{{ total_hit_adj }}</td>
                    <td class="p-2 border">
                      {{ Math.floor((total_hit_adj - total_hit) / total_hit * 100 * 10) / 10 }}
                    </td>
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
              <div class="text-sm bg-gray-100 p-2 whitespace-pre-wrap">
                <p>
                  (魔法攻撃[{{ calc.total_atk() }}]
                  * 魔法ダメージ%[{{ calc.total_damage_up() }}]
                  * 属性相性%[{{ calc.total_element_relation_up() }}]
                  * 属性ダメージUP%[{{ calc.total_element_damage_up() }}]
                  * 種族モンスターダメUP%[{{ calc.total_race_up() }}]
                  * サイズモンスターダメUP%[{{ calc.total_size_up() }}]
                  * スキル倍率%[{{ calc.total_skill_up() }}]
                  * 敵除算MDEF%[{{ calc.total_enemy_mdef_div() }}]
                  * セイグリッド%[{{ calc.total_sacred_gear_up() }}]
                  + 追加ダメージ[{{ calc.total_extra_damage() }}])
                  * PVEダメージ%[{{ calc.total_pve_damage_up() }}]
                  * 魔法ダメージ強化%[{{ calc.total_enhance_power() }}]
                </p>

                <p>
                  固定詠唱[{{ calc.f_cast() }}]，変動詠唱[{{ calc.v_cast() }}]，ディレイ[{{ calc.delay() }}]
                </p>
              </div>

              <div class="text-sm bg-gray-100 p-2 whitespace-pre-wrap">
                <p>
                  (魔法攻撃[{{ calc_adj.total_atk() }}]
                  * 魔法ダメージ%[{{ calc_adj.total_damage_up() }}]
                  * 属性相性%[{{ calc_adj.total_element_relation_up() }}]
                  * 属性ダメージUP%[{{ calc_adj.total_element_damage_up() }}]
                  * 種族モンスターダメUP%[{{ calc_adj.total_race_up() }}]
                  * サイズモンスターダメUP%[{{ calc_adj.total_size_up() }}]
                  * スキル倍率%[{{ calc_adj.total_skill_up() }}]
                  * 敵除算MDEF%[{{ calc_adj.total_enemy_mdef_div() }}]
                  * セイグリッド%[{{ calc_adj.total_sacred_gear_up() }}]
                  + 追加ダメージ[{{ calc_adj.total_extra_damage() }}])
                  * PVEダメージ%[{{ calc_adj.total_pve_damage_up() }}]
                  * 魔法ダメージ強化%[{{ calc_adj.total_enhance_power() }}]

                </p>
                <p>
                  固定詠唱[{{ calc_adj.f_cast() }}]，変動詠唱[{{ calc_adj.v_cast() }}]，ディレイ[{{ calc_adj.delay() }}]
                </p>
              </div>
            </div>
          </template>
        </Accordion>
      </div>

      <div class="flex flex-col lg:grid lg:grid-cols-5 lg:gap-x-2 w-full justify-center">
        <div class="col-span-2 bg-white shadow text-sm p-4">
          <Accordion :expand="true" :border="4">
            <template #title>Column1</template>
            <template #content>
              <StatusInput v-model:status="status" v-model:status_adj="status_adj" />
            </template>
          </Accordion>
        </div>

        <div class="bg-white shadow text-sm p-4">
          <Accordion :expand="true" :border="4">
            <template #title>Column2</template>
            <template #content>
              <Accordion :expand="true">
                <template #title>対象モンスター</template>
                <template #content>

                  <div class="flex items-center mb-1">
                    <select name="enemy"
                      class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                      v-model="target_enemy" @change="changeEnemy">
                      <option v-for="record in enemy_data" :value="record.name" :key="record.name">
                        {{ record.type == "MVP" ? "MVP: " : "" }}
                        {{ record.type == "MINI" ? "MINI: " : "" }}

                        {{ record.name }}
                      </option>
                    </select>
                  </div>

                  <EnemyInput v-model="enemy" />
                </template>
              </Accordion>

              <Accordion :expand="true">
                <template #title>使用スキル</template>
                <template #content>
                  <div class="flex items-center mb-1">
                    <select name="skill"
                      class="flex-none py-2 mr-1 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                      v-model="target_skill" @change="changeSkill">
                      <option v-for="(v, k) in skill_data" :value="k" :key="k">{{ k }}</option>
                    </select>

                    <select name="skill_level"
                      class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                      v-model="target_skill_level" @change="changeSkillLevel">
                      <option v-for="i in Object.keys(skill_data[target_skill]).sort((a, b) => b - a)" :value="i"
                        :key="i">{{ i }}</option>
                    </select>
                  </div>
                  <SkillInput v-model="skill" />
                </template>
              </Accordion>


              <Accordion :expand="true">
                <template #title>補助スキル</template>
                <template #content>
                  <div class="flex items-center mb-1" v-for="(v, k, i) in sub_skill_data" :key="k">
                    <label class="inline-block flex-none w-24 mr-2 text-right font-bold text-gray-600">{{ k }}</label>

                    <select :name="`sub_skill${i}_level`"
                      class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
                      v-model="target_sub_skill_level[k]" @change="changeSubSkill(k)">
                      <option v-for="j in Object.keys(sub_skill_data[k]).sort((a, b) => b - a)" :value="j" :key="j">{{ j
                      }}</option>
                    </select>
                  </div>
                </template>
              </Accordion>

            </template>
          </Accordion>
        </div>

        <div class="bg-white shadow text-sm p-4">
          <Accordion :expand="true" :border="4">
            <template #title>Column3</template>
            <template #content>


          <Accordion :expand="true">
            <template #title>武器効果</template>
            <template #content>

          <div class="flex items-center mb-2">
            <select name="weapon" class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_weapon" @change="changeWeapon">
              <option v-for="j in Object.keys(weapon_data)" :value="j" :key="j">{{ j }}</option>
            </select>
          </div>
          <WeaponInput v-model="weapon" />

          </template>
          </Accordion>

          <Accordion :expand="true">
            <template #title>武器カード</template>
            <template #content>

          <div class="flex items-center mb-2" v-for="(v, i) in weapon_card" :key="i">
            <select :name="`weapon_card_${i}`"
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_weapon_card[i]" @change="changeWeaponCard(i)">
              <option v-for="j in Object.keys(weapon_card_data)" :value="j" :key="j">{{ j }}</option>
            </select>
          </div>
          </template>
          </Accordion>

          <Accordion :expand="true">
            <template #title>防具効果</template>
            <template #content>

          <div class="flex items-center mb-2">
            <select name="armor" class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_armor" @change="changeArmor">
              <option v-for="j in Object.keys(armor_data)" :value="j" :key="j">{{ j }}</option>
            </select>
          </div>
          <ArmorInput v-model="armor" />

          </template>
          </Accordion>

          <Accordion :expand="true">
            <template #title>アクセサリー</template>
            <template #content>

          <div class="flex items-center mb-2" v-for="(v, i) in accessory" :key="i">
            <select :name="`accessory_${i}`"
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_accessory[i]" @change="changeAccessory(i)">
              <option v-for="j in Object.keys(accessory_data)" :value="j" :key="j">{{ j }}</option>
            </select>
          </div>
          </template>
          </Accordion>

          <Accordion :expand="true">
            <template #title>アクセサリーカード</template>
            <template #content>

          <div class="flex items-center mb-2" v-for="(v, i) in accessory_card" :key="i">
            <select :name="`accessory_${i}`"
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_accessory_card[i]" @change="changeAccessoryCard(i)">
              <option v-for="j in Object.keys(accessory_card_data)" :value="j" :key="j">{{ j }}</option>
            </select>
          </div>
          </template>
          </Accordion>


          <Accordion :expand="true">
            <template #title>アクセサリーセット効果</template>
            <template #content>

          <div class="flex items-center mb-2">
            <select name="accessory_set" class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_accessory_set" @change="changeAccessorySet">
              <option v-for="j in Object.keys(accessory_set_data)" :value="j" :key="j">{{ j }}</option>
            </select>
          </div>
          <AccessorySetInput v-model="accessory_set" />
          </template>
          </Accordion>

          <Accordion :expand="true">
            <template #title>踊り</template>
            <template #content>

          <div class="flex items-center mb-1" v-for="(v, k, i) in dance_skill_data" :key="k">
            <label class="inline-block flex-none w-24 mr-2 text-right font-bold text-gray-600">{{ k }}</label>

            <select :name="`dance_skill${i}_level`"
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_dance_skill_level[k]" @change="changeDanceSkill(k)">
              <option v-for="j in Object.keys(dance_skill_data[k]).sort((a, b) => b - a)" :value="j" :key="j">{{ j }}
              </option>
            </select>

          </div>
          </template>
          </Accordion>

          <Accordion :expand="true">
            <template #title>オートスペル</template>
            <template #content>

          <div class="flex items-center mb-1" v-for="(v, k, i) in auto_spell_data" :key="k">
            <label class="inline-block flex-none w-24 mr-2 text-right font-bold text-gray-600">{{ k }}</label>

            <select :name="`dance_skill${i}_level`"
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_auto_spell_level[k]" @change="changeAutoSpell(k)">
              <option v-for="j in Object.keys(auto_spell_data[k]).sort((a, b) => b - a)" :value="j" :key="j">{{ j }}
              </option>
            </select>

          </div>
          </template>
          </Accordion>

        </template>
          </Accordion>
        </div>

        <div class="bg-white shadow text-sm p-4">
          <Accordion :expand="true" :border="4">
            <template #title>Column4</template>
            <template #content>

          <Accordion :expand="true">
            <template #title>ギア</template>
            <template #content>

          <div class="flex items-center mb-1" v-for="(v, k, i) in gear_data" :key="k">
            <label class="inline-block flex-none w-32 mr-2 text-right font-bold text-gray-600">{{ k }}</label>

            <select :name="`gear${i}_level`"
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600"
              v-model="target_gear_level[k]" @change="changeGear(k)">
              <option v-for="j in Object.keys(gear_data[k]).sort((a, b) => b - a)" :value="j" :key="j">{{ j }}</option>
            </select>
          </div>
          </template>
          </Accordion>
          </template>
          </Accordion>
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
import AccessorySetInput from "@/components/AccessorySetInput.vue";
import ArmorInput from "@/components/ArmorInput.vue";
import Accordion from "@/components/Accordion.vue";

import CharacterStatus from "@/lib/CharacterStatus";
import EnemyData from "@/lib/EnemyData";
import MagicSkillData from "@/lib/MagicSkillData";
import SubSkillData from "@/lib/SubSkillData";
import DanceSkillData from "@/lib/DanceSkillData";
import WeaponData from "@/lib/WeaponData";
import WeaponCardData from "@/lib/WeaponCardData";
import ArmorData from "@/lib/ArmorData";
import AccessoryData from "@/lib/AccessoryData";
import AccessoryCardData from "@/lib/AccessoryCardData";
import AccessorySetData from "@/lib/AccessorySetData";
import MagicGearData from "@/lib/MagicGearData";
import AutoSpellData from "@/lib/AutoSpellData";

import { MagicDamageBuilder, MagicDamageHandler } from "@/lib/MagicDamage";

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
  { key: 'weapon_card', clazz: [WeaponCardData.clazz, WeaponCardData.clazz, WeaponCardData.clazz] },
  { key: 'armor', clazz: ArmorData.clazz },
  { key: 'accessory', clazz: [AccessoryData.clazz, AccessoryData.clazz] },
  { key: 'accessory_card', clazz: [AccessoryCardData.clazz, AccessoryData.clazz, AccessoryData.clazz, AccessoryData.clazz] },
  { key: 'accessory_set', clazz: AccessorySetData.clazz },
  { key: 'gear', clazz: [...Object.keys(MagicGearData.data).map(_ => MagicGearData.clazz)] },
  { key: 'sub_skill', clazz: [...Object.keys(SubSkillData.data).map(_ => SubSkillData.clazz)] },
  { key: 'dance_skill', clazz: [...Object.keys(DanceSkillData.data).map(_ => DanceSkillData.clazz)] },
  { key: 'auto_spell', clazz: [...Object.keys(AutoSpellData.data).map(_ => AutoSpellData.clazz)] },
];


export default {
  components: {
    StatusInput,
    EnemyInput,
    SkillInput,
    WeaponInput,
    AccessorySetInput,
    ArmorInput,
    Accordion,
  },
  data() {
    const data = {
      status: new CharacterStatus(),
      status_adj: new CharacterStatus(),
      enemy: EnemyData.getEnemy('カカシ(中)'),
      skill: MagicSkillData.getSkill('グラビテーションフィールド'),
      weapon: WeaponData.getWeapon('その他'),
      weapon_card: [WeaponCardData.getWeaponCard('その他'), WeaponCardData.getWeaponCard('その他'), WeaponCardData.getWeaponCard('その他')],
      armor: ArmorData.getArmor('その他'),
      accessory: [AccessoryData.getAccessory('その他'),AccessoryData.getAccessory('その他')],
      accessory_card: [AccessoryCardData.getAccessoryCard('その他'),AccessoryCardData.getAccessoryCard('その他'),AccessoryCardData.getAccessoryCard('その他'),AccessoryCardData.getAccessoryCard('その他')],
      accessory_set: AccessorySetData.getAccessorySet('その他'),

      gear: [...Object.keys(MagicGearData.data).map(k => MagicGearData.getGear(k))],
      sub_skill: [...Object.keys(SubSkillData.data).map(k => SubSkillData.getSkill(k))],
      dance_skill: [...Object.keys(DanceSkillData.data).map(k => DanceSkillData.getSkill(k))],
      auto_spell: [...Object.keys(AutoSpellData.data).map(k => AutoSpellData.getAutoSpell(k))],
    };

    const target_gear_level = {};
    data.gear.forEach(o => target_gear_level[o.name] = o.level);

    const target_sub_skill_level = {};
    data.sub_skill.forEach(o => target_sub_skill_level[o.name] = o.level);

    const target_dance_skill_level = {};
    data.dance_skill.forEach(o => target_dance_skill_level[o.name] = o.level);

    const target_auto_spell_level = {};
    data.auto_spell.forEach(o => target_auto_spell_level[o.name] = o.level);

    return Object.assign(data, {
      enemy_data: EnemyData.data,
      skill_data: MagicSkillData.data,
      gear_data: MagicGearData.data,
      sub_skill_data: SubSkillData.data,
      dance_skill_data: DanceSkillData.data,
      auto_spell_data: AutoSpellData.data,
      weapon_data: WeaponData.data,
      weapon_card_data: WeaponCardData.data,
      armor_data: ArmorData.data,
      accessory_data: AccessoryData.data,
      accessory_card_data: AccessoryCardData.data,
      accessory_set_data: AccessorySetData.data,

      target_enemy: data.enemy.name,
      target_skill: data.skill.name,
      target_skill_level: data.skill.level,
      target_gear_level: target_gear_level,
      target_sub_skill_level: target_sub_skill_level,
      target_dance_skill_level: target_dance_skill_level,
      target_auto_spell_level: target_auto_spell_level,
      target_weapon: data.weapon.name,
      target_weapon_card: [...data.weapon_card.map(o => o.name)],
      target_armor: data.armor.name,
      target_accessory: [...data.accessory.map(o => o.name) ],
      target_accessory_card: [...data.accessory_card.map(o => o.name) ],
      target_accessory_set: data.accessory_set.name,
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
    changeGear(k) {
      const gear = MagicGearData.getGear(k, this.target_gear_level[k]);
      Object.assign(this.getGear(k), gear);
    },
    getSubSkill(k) {
      return this.sub_skill.filter(o => o.name == k)[0];
    },
    changeSubSkill(k) {
      const skill = SubSkillData.getSkill(k, this.target_sub_skill_level[k]);
      Object.assign(this.getSubSkill(k), skill);
    },
    getDanceSkill(k) {
      return this.dance_skill.filter(o => o.name == k)[0];
    },
    changeDanceSkill(k) {
      const skill = DanceSkillData.getSkill(k, this.target_dance_skill_level[k]);
      Object.assign(this.getDanceSkill(k), skill);
    },
    getAutoSpell(k) {
      return this.auto_spell.filter(o => o.name == k)[0];
    },
    changeAutoSpell(k) {
      const skill = AutoSpellData.getAutoSpell(k, this.target_auto_spell_level[k]);
      Object.assign(this.getAutoSpell(k), skill);
    },
    changeWeapon() {
      const weapon = WeaponData.getWeapon(this.target_weapon);
      Object.assign(this.weapon, weapon);

      const tips = WeaponData.getTips(this.target_weapon);
      if (tips) {
        this.$toast.show(tips, { type: 'info', position: 'top-right', duration: 4000 })
      }
    },
    changeWeaponCard(k) {
      const card = WeaponCardData.getWeaponCard(this.target_weapon_card[k]);
      Object.assign(this.weapon_card[k], card);
    },
    changeArmor() {
      const armor = ArmorData.getArmor(this.target_armor);
      Object.assign(this.armor, armor);

      const tips = ArmorData.getTips(this.target_armor);
      if (tips) {
        this.$toast.show(tips, { type: 'info', position: 'top-right', duration: 4000 })
      }
    },
    changeAccessory(k) {
      const accessory = AccessoryData.getAccessory(this.target_accessory[k]);
      Object.assign(this.accessory[k], accessory);
    },
    changeAccessoryCard(k) {
      const card = AccessoryCardData.getAccessoryCard(this.target_accessory_card[k]);
      Object.assign(this.accessory_card[k], card);
    },
    changeAccessorySet() {
      const accessory = AccessorySetData.getAccessorySet(this.target_accessory_set);
      Object.assign(this.accessory_set, accessory);

      const tips = AccessorySetData.getTips(this.target_accessory_set);
      if (tips) {
        this.$toast.show(tips, { type: 'info', position: 'top-right', duration: 4000 })
      }
    },

    async setPersistentUrl() {
      const deflated_str = this.getPersistentString(this);
      history.pushState(null, null, `/${url_prefix}#${deflated_str}`);
      await navigator.clipboard.writeText(location.href);

      this.$toast.show('URLの更新とコピーを完了しました', { type: 'info', position: 'top-right', duration: 4000 })
    },

    getPersistentString(data) {
      const persistent_data = {}
      persistent_list.forEach(v => {
        if (Array.isArray(data[v.key])) {
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
        try {
          if (Array.isArray(v.clazz)) {
            data[v.key] = v.clazz.map((c, i) => c.deserialize(inflated_data[v.key][i]));
          } else {
            data[v.key] = v.clazz.deserialize(inflated_data[v.key]);
          }
        } catch (e) {
          this.$toast.show(e, { type: 'error', position: 'top-right', duration: 4000 })
        }
      })
      return data;
    },

    getCalculator(status, ismin, ismax) {
      const b = new MagicDamageBuilder(status.clone(), this.skill, this.enemy);

      // ギアやスキル追加等もここで行う
      b.handler(WeaponData.getHandler(this.weapon, this.skill));
      b.handler(ArmorData.getHandler(this.armor));
      b.handler(AccessorySetData.getHandler(this.accessory_set));

      this.weapon_card.map(w => b.handler(WeaponCardData.getHandler(w.name)));
      this.accessory.map(a => b.handler(AccessoryData.getHandler(a.name)));
      this.accessory_card.map(c => b.handler(AccessoryCardData.getHandler(c.name)));

      this.sub_skill.map(s => b.handler(SubSkillData.getHandler(s, this.skill, this.enemy)));
      this.gear.map(g => b.handler(MagicGearData.getHandler(g, this.skill)));

      this.dance_skill.map(s => b.handler(DanceSkillData.getHandler(s)));

      this.auto_spell.map(s => b.handler(AutoSpellData.getHandler(s)));

      return b.build(ismin, ismax);
    }

  },

  computed: {
    calc() {
      return this.getCalculator(this.status, 0, 0);
    },
    calc_min() {
      return this.getCalculator(this.status, 1, 0);
    },
    calc_max() {
      return this.getCalculator(this.status, 0, 1);
    },

    calc_adj() {
      return this.getCalculator(this.status.adjust(this.status_adj), 0, 0);
    },
    calc_adj_min() {
      return this.getCalculator(this.status.adjust(this.status_adj), 1, 0);
    },
    calc_adj_max() {
      return this.getCalculator(this.status.adjust(this.status_adj), 0, 1);
    },

    total_damage() {
      return this.calc.get();
    },
    total_min_damage() {
      return this.calc_min.get();
    },
    total_max_damage() {
      return this.calc_max.get();
    },
    total_damage_adj() {
      return this.calc_adj.get();
    },
    total_min_damage_adj() {
      return this.calc_adj_min.get();
    },
    total_max_damage_adj() {
      return this.calc_adj_max.get();
    },

    total_cast_time() {
      return this.calc.cast_time();
    },
    total_cast_time_adj() {
      return this.calc_adj.cast_time();
    },
    total_cast_delay() {
      return this.calc.cast_delay();
    },
    total_cast_delay_adj() {
      return this.calc_adj.cast_delay();
    },

    total_dps() {
      return this.calc.dps().dps;
    },
    total_dps_adj() {
      return this.calc_adj.dps().dps;
    },

    total_hit() {
      return this.calc.dps().hit;
    },
    total_hit_adj() {
      return this.calc_adj.dps().hit;
    },
  },

  created() {
    if (location.hash.startsWith(url_prefix) && location.hash.length > url_prefix.length) {
      const persistent_str = location.hash.slice(url_prefix.length + 1);

      const persistent_data = this.parsePersistentString(persistent_str);

      Object.keys(persistent_data).forEach(k => {
        let v = persistent_data[k];
        Object.assign(this[k], v);

        if (k === "enemy") {
          this.target_enemy = v.name;
        }
        if (k === "skill") {
          this.target_skill = v.name;
          this.target_skill_level = v.level;
        }
        if (k === "gear") {
          v.forEach(g => this.target_gear_level[g.name] = g.level);
        }
        if (k === "sub_skill") {
          v.forEach(s => this.target_sub_skill_level[s.name] = s.level);
        }
        if (k === "dance_skill") {
          v.forEach(s => this.target_dance_skill_level[s.name] = s.level);
        }
        if (k === 'auto_spell') {
          v.forEach(s => this.target_auto_spell_level[s.name] = s.level);
        }
        if (k === "weapon") {
          this.target_weapon = v.name;
        }
        if (k === "weapon_card") {
          v.forEach((s, i) => this.target_weapon_card[i] = s.name);
        }
        if (k === "armor") {
          this.target_armor = v.name;
        }
        if (k === "accessory") {
          v.forEach((s, i) => this.target_accessory[i] = s.name);
        }
        if (k === "accessory_card") {
          v.forEach((s, i) => this.target_accessory_card[i] = s.name);
        }
        if (k === "accessory_set") {
          this.target_accessory_set = v.name;
        }
      });
    }
  },
};
</script>
