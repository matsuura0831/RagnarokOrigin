<template>
  <div>
    <div class="mb-1" v-for="v in inputs" :key="v.key">
      <div class="flex items-center" v-if="this.modelValue.set_effects[v.key] != undefined">
  
        <label class="inline-block flex-none w-32 mr-2 text-right font-bold text-gray-600">{{ v.label }}</label>
        <input
            :type="getType(v.number)"
            class="flex-1 py-2 w-12 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none border-b-2"
            @input="updateValue(v.key, $event.target.value, v.number)"
            :value="this.modelValue.set_effects[v.key]"
            onclick="this.select();"
          />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccessoryInput",
  props: {
    modelValue: Object,
  },
  data() {
    return {
      inputs: [
        { key: 'skill_up',   label: 'スキルダメージ[%]',  number: 1},
        { key: 'skill_up_repeated',   label: '重複回数',  number: 1},

        { key: 'last_up', label: '最終倍率[%]',  number: 1},
        { key: 'last_atk_limit', label: '魔法攻撃上限[%]',  number: 1},
        
      ],
    }
  },
  methods: {
    updateValue(k, v, is_number) {
      if(is_number) {
        v = parseFloat(v);
      }

      const updated = Object.assign(this.modelValue.set_effects, { [k]: v });
      this.$emit('update', updated);
    },
    getType(v) {
      return v ? 'number' : 'text';
    },
  }
};
</script>