<template>
  <div class="about bg-gray-100">
    <div class="flex flex-col px-10 text-lg">
      <div class="flex flex-col">
        <Accordion :expand="true">
          <template #title>〇〇ステータスには何を入れればいいの？</template>
          <template #content>
          <p>
            ゲームを起動してキャラクターのステータスの詳細情報を開いてください．
            そこで確認できる各種値を各行の左側の入力欄に記載してください．
          </p>
          <p>
            <img src="@/assets/help/status_input1.png">
          </p>
          <p>
            基礎ステータス，上級ステータス，特殊ステータスについても同じように入力をしてください．
            なお"基本魔法攻撃"と"装備魔法攻撃"の出し方は次の項目を参照してください．
          </p>
          </template>
        </Accordion>

        <Accordion :expand="true">
          <template #title>基本魔法攻撃や装備魔法攻撃はどうやって見ればいいの？</template>
          <template #content>
          <p>
            ステータスの詳細情報画面で"基本ステータス &gt; 魔法攻撃"をクリックして表示される値を入力してください．
          </p>
          <p>
            <img src="@/assets/help/status_input2.png">
          </p>
          </template>
        </Accordion>

        <Accordion :expand="true">
          <template #title>〇〇ステータスの左右は何が違うの？</template>
          <template #content>
          <p>
            画面上部のダメージの"現在"に反映されるのが左側，"補正"に反映されるのが左側＋右側となります．
          </p>
          <p>
            例えばスネークカード(魔法攻撃+20)をドラキュラカード(魔法攻撃+100, 魔法ダメージ+15%)に変えたい場合は下記のように入力してください
            <ul class="list-disc ml-12">
              <li>"基本ステータス &gt; 装備魔法攻撃"の右側に80</li>
              <li>"上級ステータス &gt; 魔法ダメージ増加"の右側に15</li>
            </ul>
            上記により，画面上部の期待値の"補正"欄がドラキュラカードに換装した場合の値となります．
          </p>
          <p>
            <img src="@/assets/help/status_input3.png">
          </p>
          <p>
            ドラキュラカードからスネークカードに変えた場合は負の値を右側にいれてください．
          </p>
          </template>
        </Accordion>

        <Accordion>
          <template #title>詠唱に関わるステータスは何のためにあるの？</template>
          <template #content>
          <p>
            DPS出力の算出に利用します．
          </p>
          <p>
            変動詠唱減少についてはステータス詳細に表示された値をそのまま入力しないでください．
            INTとDEXによる効果が混じったモノが表示されているため正しく計算できなくなります．
          </p>
          <p>
            うるせぇ俺は変動詠唱の数値を数えたくないんだ！という場合はステータス画面を見ながら下記入力をしてみてください(誤差はあります)
          </p>
          
          <div class="mb-1 ml-4">
            <label class="w-32 mr-2 text-right font-bold text-gray-600">INT</label>
            <input type="number"
              class="py-2 w-12 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none border-b-2"
              v-model="int"
              onclick="this.select();"
              />

            <label class="w-32 mr-2 text-right font-bold text-gray-600">DEX</label>
            <input type="number"
              class="py-2 w-12 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none border-b-2"
              v-model="dex"
              onclick="this.select();"
              />

            <label class="w-32 mr-2 text-right font-bold text-gray-600">変動詠唱[%]</label>
            <input type="number"
              class="py-2 w-12 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none border-b-2"
              v-model="variable_cast"
              onclick="this.select();"
              />

            ...装備による変動詠唱は {{ Math.round(equip_variable_cast * 100) }}% です
          </div>
          </template>
        </Accordion>

        <Accordion>
          <template #title>対象モンスターについて変更できない項目があるのは何故？</template>
          <template #content>
          魔法攻撃で影響を及ぼさない項目のためです．
          将来的に物理攻撃に関しても計算できるようにするためデータとしては蓄積しています．
          </template>
        </Accordion>

        <Accordion>
          <template #title>対象モンスターでHPがゼロになっているのは何故？</template>
          <template #content>
          HPのデータが公開されていないモンスター(カカシ，MINI，BOSS)です．
          対象モンスターには"確殺数"が計算されなくなりますが，その他値は正常です．
          </template>
        </Accordion>

        <Accordion :expand="true">
          <template #title>計算が合わないんだけど？</template>
          <template #content>
          <p>
            まずは自分の入力した値が正しいかどうか，未実装のギア(インファイト等)による効果が現れていないかをご確認ください．
            それでも合わない場合は上部の"お問い合わせ"よりご連絡ください．
          </p>
          <p>
            細かい注意点
            <ul class="list-disc ml-12">
              <li>知恵の王の指輪：属性ダメージ+3%はステータスに反映される．特殊ステータス &gt; 属性ダメージアップ に加算する</li>
              <li>ペンダントオブハーモニー：
                <ul>
                  <li>精練10効果のスキルダメージはステータスに反映されない．手動の場合は 内部ステータス &gt; スキルダメージアップ に加算する</li>
                  <li>精練15効果のスキルダメージはステータスに反映されない．手動の場合は 内部ステータスの最終倍率を150%，最終確率を10%(2個の場合は20%)に加算する</li>
                </ul>
              </li>
              <li>きらめく夜セット：セット効果の魔法ダメージ増加がステータス欄に表示されるかが不明です．もし反映される場合は重複効果となるため利用しないでください</li>
            </ul>
          </p>
          <p>
            残課題
            <ul class="list-disc ml-12">
              <li>2022/11/13: なぜか計算式より若干大きな値が私の環境で出るようになりました．理由は不明ですがご存じの方教えてください</li>
              <li>2022/11/14: PVEダメージと物理防御無視(実数)を実装しましたが場所が本当に合っているかは不安です．間違えているよ！の場合はお知らせください</li>
            </ul>
          </p>
          </template>
        </Accordion>

      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "@/components/Accordion.vue";

export default {
  name: "About",

  components: {
    Accordion,
  },
  data() {
    return {
      int: 0,
      dex: 0,
      variable_cast: 0,
    };
  },
  computed: {
    equip_variable_cast() {
      /*
      ステータス上の変動詠唱 = (1 - sqrt((int/2 + dex) / 265)) * (1 - 装備詠唱変動)
      */
      return 1.0 - (1.0 - this.variable_cast / 100) / (1 - Math.sqrt((this.int/2 + this.dex) / 265));
    }
  }
};
</script>
