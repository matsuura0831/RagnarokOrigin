<template>
  <div>
    <div class="mb-1" v-for="v in inputs_refine" :key="v.key">
      <div class="flex items-center" v-if="this.modelValue.refine_effects[v.key] != undefined">
  
        <label class="inline-block flex-none w-32 mr-2 text-right font-bold text-gray-600">{{ v.label }}</label>
        <input
            :type="getType(v.number)"
            class="flex-1 py-2 w-12 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none border-b-2"
            @input="updateRefineValue(v.key, $event.target.value, v.number)"
            :value="this.modelValue.refine_effects[v.key]"
            onclick="this.select();"
          />
      </div>
    </div>

    <div class="flex items-center mb-1" v-for="v in inputs_custom" :key="v.key">
      <label class="inline-block flex-none w-32 mr-2 text-right font-bold text-gray-600">{{ v.label }}</label>
      <input
          :type="getType(v.number)"
          class="flex-1 py-2 w-12 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none border-b2"
          @input="updateCustomValue(v.key, $event.target.value, v.number)"
          :value="this.modelValue.custom_effects[v.key]"
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
      inputs_refine: [
        { key: 'skill_up_fb',   label: 'FBスキルダメージUP[%]',  number: 1},
        { key: 'skill_up_fbl',  label: 'FBLスキルダメージUP[%]',  number: 1},
        { key: 'skill_up_ms',   label: 'MSスキルダメージUP[%]',  number: 1},

        { key: 'skill_up_lb',   label: 'LBスキルダメージUP[%]',  number: 1},
        { key: 'skill_up_jt',   label: 'JTスキルダメージUP[%]',  number: 1},
        { key: 'skill_up_lov',  label: 'LOVスキルダメージUP[%]',  number: 1},

        { key: 'skill_mul_up_water',  label: '水属性ダメージ倍率UP[%]',  number: 1},
        { key: 'fcast_water',         label: '水属性スキル固定時間減少[%]',  number: 1},
        { key: 'bubble_mul',          label: '海流の泡[%]', number: 1},
        

        { key: 'skill_up_me',      label: 'MEスキルダメージUP[%]',  number: 1},
        { key: 'ignore_mdef_div',   label: '防御無視[%]',  number: 1},
        { key: 'vcast_div',       label: '変動時間減少[%]',  number: 1},
        { key: 'fcast_sub',       label: '固定時間減少[s]',  number: 1},

        { key: 'skill_up_bolt', label: 'ボルトスキルダメージUP[%]', number: 1 },
        { key: 'delay_sub', label: 'ディレイ減少[s]', number: 1 },

        { key: 'magic_add', label: '魔法攻撃追加[%]', number: 1 },
        { key: 'skill_up_pw', label: 'サイキックウェーブダメージUP[%]', number: 1 },

      ],
      inputs_custom: [
        { key: 'skill_up',    label: '改造:スキルダメージUP[%]',  number: 1},
      ]
    }
  },
  methods: {
    updateRefineValue(k, v, is_number) {
      if(is_number) {
        v = parseFloat(v);
      }

      const updated = Object.assign(this.modelValue.refine_effects, { [k]: v });
      this.$emit('update', updated);
    },
    updateCustomValue(k, v, is_number) {
      if(is_number) {
        v = parseFloat(v);
      }

      const updated = Object.assign(this.modelValue.custom_effects, { [k]: v });
      this.$emit('update', updated);
    },
    getType(v) {
      return v ? 'number' : 'text';
    },
  }
};
</script>