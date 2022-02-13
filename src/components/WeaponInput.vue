<template>
    <div class="flex items-center mb-1" v-for="v in inputs" :key="v.key">
      <label class="inline-block flex-none w-24 mr-2 text-right font-bold text-gray-600">{{ v.label }}</label>
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
  name: "WeaponInput",
  props: {
    modelValue: Object,
  },
  data() {
    return {
      selected: this.target,
      inputs: [
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