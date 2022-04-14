<template>
    <div class="flex items-center mb-1" v-for="v in inputs" :key="v.key">
      <label class="inline-block flex-none w-24 mr-2 text-right font-bold text-gray-600">{{ v.label }}</label>
      <input
          :type="getType(v.number)"
          class="flex-1 py-2 w-12 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
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
        { key: 'element', label: '属性',  editable: 1, number: 0},
        { key: 'mul',     label: '倍率',  editable: 1, number: 1},
        { key: 'add',     label: '追加ダメージ',  editable: 1, number: 1},
        { key: 'ignore_mdef', label: '魔法防御無視',  editable: 1, number: 1},
        { key: 'vcast',   label: '変動詠唱',  editable: 1, number: 1},
        { key: 'fcast',   label: '固定詠唱',  editable: 1, number: 1},
        { key: 'delay',   label: 'ディレイ',  editable: 1, number: 1},
        { key: 'hit',     label: 'ヒット数',  editable: 1, number: 1},
        { key: 'time',    label: '持続時間',  editable: 1, number: 1},
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