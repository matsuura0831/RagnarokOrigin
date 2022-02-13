<template>
    <div class="flex items-center mb-1" v-for="v in inputs" :key="v.key">
      <label class="inline-block flex-none w-12 mr-2 text-right font-bold text-gray-600">{{ v.label }}</label>
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
</template>

<script>
export default {
  name: "EnemyInput",
  props: {
    modelValue: Object,
  },
  data() {
    return {
      selected: this.target,
      inputs: [
        { key: 'race',    label: '種族',  editable: 0, number: 0},
        { key: 'element', label: '属性',  editable: 1, number: 0},
        { key: 'size',    label: 'SIZE',  editable: 0, number: 0},
        { key: 'base',    label: 'Base',  editable: 0, number: 1},
        { key: 'hp',      label: 'HP',    editable: 1, number: 1},
        { key: 'def',     label: 'DEF',   editable: 0, number: 1},
        { key: 'mdef',    label: 'MDEF',  editable: 1, number: 1},
        { key: 'vit',     label: 'VIT',   editable: 0, number: 1},
        { key: 'agi',     label: 'AGI',   editable: 0, number: 1},
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