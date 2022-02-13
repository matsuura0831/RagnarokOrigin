<template>
  <div class="about bg-gray-100">
    <div class="flex flex-col px-10 text-lg">
      <div class="flex flex-col">
        <Accordion>
          <template #title>〇〇ステータスには何を入れればいいの？</template>
          <template #content>
          ゲームを起動してキャラクターのステータスの詳細情報を開いてください．
          そこで確認できる各種値を各行の左側の入力欄に記載してください．
          </template>
        </Accordion>

        <Accordion>
          <template #title>基本魔法攻撃や装備魔法攻撃はどうやって見ればいいの？</template>
          <template #content>
          ステータスの詳細情報画面で"基本ステータス &gt; 魔法攻撃"をクリックして表示される値を入力してください．
          </template>
        </Accordion>

        <Accordion>
          <template #title>〇〇ステータスの左右は何が違うの？</template>
          <template #content>
          <p>
            画面上部のダメージの"現在"に反映されるのが左側，"補正"に反映されるのが左側＋右側となります．
          </p>
          <p>
            例えばスネークカード(魔法攻撃+20)をドラキュラカード(魔法攻撃+100, 魔法ダメージ+15%)に変えたい場合，
            <ul class="ml-4">
              <li>"基本ステータス &gt; 装備魔法攻撃"の右側に80を入力し，</li>
              <li>"上級ステータス &gt; 魔法ダメージ増加"の右側に15を入力すると，</li>
            </ul>
            ダメージの"補正"がドラキュラカードに換装した場合の値となります．
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
            将来的に詠唱時間を計算してDPS出力もできるようにするためのものです．
            実装をお待ちください．
          </p>
          <p>
            装備固定詠唱減少と変動詠唱減少についてはステータス詳細に表示された値をそのまま入力しないでください．
            INTとDEXが混じったモノが表示されているため正しく計算できなくなります．
          </p>
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

        <Accordion>
          <template #title>仕様スキルで詠唱時間に関する項目を変更しても影響しないのは何故？</template>
          <template #content>
          将来的に詠唱時間を計算してDPS出力もできるようにするためのものです．
          実装をお待ちください．
          </template>
        </Accordion>

        <Accordion>
          <template #title>計算が合わないんだけど？</template>
          <template #content>
          まずは自分の入力した値が正しいかどうか，未実装のギア(インファイト等)による効果が現れていないかをご確認ください．
          それでも合わない場合，将来的に投稿フォームも用意する予定なので実装をお待ちください．
          </template>
        </Accordion>

        <Accordion>
          <template #title>古代海龍の杖を装備すると計算が合わないんだけど？</template>
          <template #content>
            <p><img alt="古代海龍の杖" src="@/assets/weapon/water_wand.png"/></p>
            <p>
              上記の杖を持った場合，説明文の上から順に，
              <ul class="ml-4">
                <li>"魔法攻撃+406": "基礎ステータス &gt; 装備魔法攻撃" に現装備の魔法攻撃との差分を追加</li>
                <li>"コードボルトダメージ+5.94%": "装備改造 &gt; スキルダメージUP" に追加</li>
                <li>"海龍の泡を発動して300%の魔法ダメージを与える": 対象追加効果によるダメージ計算は未実装です．計算したい場合は無属性の倍率300%のスキルを入力した場合で計算してください</li>
                <li>"固定詠唱時間-20%": "詠唱にかかわるステータス &gt; 装備固定詠唱減少" に追加</li>
                <li>"精練+6以上の時，水属性ダメージ+15%": "特殊ステータス &gt; 属性ダメージアップ" に追加</li>
                <li>"精練+10以上の時，水属性ダメージ倍率+200%": "使用スキル &gt; 倍率"に追加(スキル変更するとリセットされるので注意)</li>
                <li>"精練+15以上の時...": 未実装です．無属性スキルを利用した場合で計算してください</li>
              </ul>
              といったように値を変更してください．
              なお"精練+6"効果は装備した際にキャラクターのステータス画面に反映されているのでご注意ください．
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
};
</script>
