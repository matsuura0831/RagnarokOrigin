<template>
  <div>
    <h2 class="mb-4 ml-2 font-bold text-md border-b-2 border-green-700">精練効果</h2>
    <div class="flex items-center mb-1" v-for="v in inputs_equip" :key="v.key">

      <label class="inline-block flex-none w-32 mr-2 text-right font-bold text-gray-600">{{ v.label }}</label>
      <input
          :type="getType(v.number)"
          class="flex-1 py-2 w-12 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
          :class="{ 'bg-gray-200': !v.editable, 'border-b-0': !v.editable, 'border-b-2': v.editable, }"
          @input="updateValue(v.key, $event.target.value, v.number)"
          :value="this.modelValue[v.key]"
          :disabled="!v.editable"
          onclick="this.select();"
        />
    </div>

    <h2 class="mb-4 ml-2 font-bold text-md border-b-2 border-green-700">改造効果</h2>
    <div class="flex items-center mb-1" v-for="v in inputs_custom" :key="v.key">

      <label class="inline-block flex-none w-32 mr-2 text-right font-bold text-gray-600">{{ v.label }}</label>
      <input
          :type="getType(v.number)"
          class="flex-1 py-2 w-12 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
          :class="{ 'bg-gray-200': !v.editable, 'border-b-0': !v.editable, 'border-b-2': v.editable, }"
          @input="updateValue(v.key, $event.target.value, v.number)"
          :value="this.modelValue[v.key]"
          :disabled="!v.editable"
          onclick="this.select();"
        />
    </div>
  </div>
</template>

<script>
export default {
  name: "WeaponInput",
  props: {
    modelValue: Object,
  },
  data() {
    return {
      selected: this.target,
      inputs_equip: [
        { key: 'skill_up',      label: 'スキルダメージUP[%]',  editable: 1, number: 1},
        { key: 'skill_mul_up',  label: 'スキルダメージ倍率UP[%]',  editable: 1, number: 1},
        { key: 'ignore_mdef',   label: 'スキル防御無視[%]',  editable: 1, number: 1},
        { key: 'vcast_p',       label: 'スキル変動時間減少[%]',  editable: 1, number: 1},
        { key: 'fcast_s',       label: 'スキル固定時間減少[s]',  editable: 1, number: 1},
      ],
      inputs_custom: [
        { key: 'custom_skill_up',    label: 'スキルダメージUP[%]',  editable: 1, number: 1},
      ]
    }
  },
  methods: {
    updateValue(k, v, is_number) {
      if(is_number) {
        v = parseFloat(v);
      }

      const updated = Object.assign(this.modelValue, { [k]: v });
      this.$emit('update', updated);
    },
    getType(v) {
      return v ? 'number' : 'text';
    },
  }
};
</script>