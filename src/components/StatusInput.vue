<template>
  <div v-for="i in inputs" :key="i.label">
    <h1 class="mb-4 font-bold text-lg border-b-2 border-green-600">{{ i.label }}</h1>

    <div class="flex items-center mb-1" v-for="j in i.records" :key="j.label">
      <label class="inline-block flex-none w-40 mr-2 text-right font-bold text-gray-600">{{ j.label }}</label>

      <div class="flex-1 flex items-center">
        <input
          type="number"
          class="flex-1 py-2 w-12 mr-1 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
          :class="{ 'bg-gray-200': j.main_disabled || j.disabled, 'border-b-0': !j.main_disabled && !j.disabled, 'border-b-2': !j.main_disabled && !j.disabled, }"
          :value="this.status[j.key]"
          @input="updateMainValue(j.key, parseFloat($event.target.value))"
          onclick="this.select();"
          :disabled="j.main_disabled || j.disabled"
        />
        +
        <input
          type="number"
          class="flex-1 py-2 w-12 ml-1 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
          :class="{ 'bg-gray-200': j.sub_disabled || j.disabled, 'border-b-0': !j.sub_disabled && !j.disabled, 'border-b-2': !j.sub_disabled && !j.disabled, }"
          :value="this.status_adj[j.key]"
          @input="updateSubValue(j.key, parseFloat($event.target.value))"
          onclick="this.select();"
          :disabled="j.sub_disabled || j.disabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnemyInput",
  props: {
    status: Object,
    status_adj: Object,
  },
  data() {
    return {
      inputs: [
        { label: "基本ステータス", records: [
          { label: "基本魔法攻撃", key: "base_atk", sub_disabled: 1 },
          { label: "装備魔法攻撃", key: "equip_atk", disabled: 0 },
          { label: "精練魔法攻撃", key: "refine_atk", disabled: 0 },
        ]},
        { label: "上級ステータス", records: [
          { label: "魔法ダメージ増加[%]", key: "additional_damage", disabled: 0 },
          { label: "魔法防御無視[%]", key: "ignore_mdef", disabled: 0 },
          { label: "追加魔法ダメージ", key: "extra_damage", disabled: 0 },
        ]},
        { label: "特殊ステータス", records: [
          { label: "魔法攻撃[%]", key: "magic_damage_up", disabled: 0 },
          { label: "サイズモンスターダメージアップ[%]", key: "size_up", disabled: 0 },
          { label: "種族モンスターダメージアップ[%]", key: "race_up", disabled: 0 },
          { label: "属性モンスターダメージアップ[%]", key: "element_enemy_up", disabled: 0 },
          { label: "BOSSダメージアップ[%]", key: "boss_up", disabled: 0 },
          { label: "属性ダメージアップ[%]", key: "element_damage_up", disabled: 0 },
        ]},
        { label: "詠唱に関わるステータス", records: [
          { label: "INT", key: "status_int", disabled: 0 },
          { label: "DEX", key: "status_dex", disabled: 0 },
          { label: "装備固定詠唱減少[%]", key: "equip_fix_cast", disabled: 0 },
          { label: "装備変動詠唱減少[%]", key: "equip_variable_cast", disabled: 0 },
          { label: "装備ディレイ減少[%]", key: "equip_delay", disabled: 0 },
        ]},
      ]
    }
  },
  methods: {
    updateMainValue(k, v) {
      const updated = Object.assign(this.status, { [k]: v });
      this.$emit('update:status', updated);
    },
    updateSubValue(k, v) {
      const updated = Object.assign(this.status_adj, { [k]: v });
      this.$emit('update:status_adj', updated);
    },
  }
};
</script>