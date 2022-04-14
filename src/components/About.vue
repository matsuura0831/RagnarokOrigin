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
            例えばスネークカード(魔法攻撃+20)をドラキュラカード(魔法攻撃+100, 魔法ダメージ+15%)に変えたい場合は下記のように入力してください
            <ul class="list-disc ml-12">
              <li>"基本ステータス &gt; 装備魔法攻撃"の右側に80</li>
              <li>"上級ステータス &gt; 魔法ダメージ増加"の右側に15</li>
            </ul>
            上記により，画面上部の期待値の"補正"欄がドラキュラカードに換装した場合の値となります．
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
            装備固定詠唱減少と変動詠唱減少についてはステータス詳細に表示された値をそのまま入力しないでください．
            INTとDEXによる効果が混じったモノが表示されているため正しく計算できなくなります．
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
          <template #title>計算が合わないんだけど？</template>
          <template #content>
          <p>
            まずは自分の入力した値が正しいかどうか，未実装のギア(インファイト等)による効果が現れていないかをご確認ください．
            それでも合わない場合，将来的に投稿フォームも用意する予定なので実装をお待ちください．
          </p>
          <p>
            なお装備に関してはどのように入力すれば良いかわからない場合もあるかと思いサンプルを用意しました．
            値が変動している箇所を参考にしてください(いずれも精練値15を想定しています)．
            なお〇〇ステータスにも一部補正という形で入力していますが，既に装備済みの場合は反映されたステータスになっているので，当該部分は0にしてください．
            <ul class="list-disc ml-12">
              <li>WIZ: <a class="text-green-600" href="https://bit.ly/3Ebly5o">烈火の杖Ⅳ＋FB10</a></li>
              <li>WIZ: <a class="text-green-600" href="https://bit.ly/3xslBZ9">疾風の杖Ⅳ＋LB10</a></li>
              <li>WIZ: <a class="text-green-600" href="https://bit.ly/36d6NT7">古代海龍の杖＋CB10</a>(泡の計算は未実装です)</li>
              <li>PRI: <a class="text-green-600" href="https://bit.ly/3jAqasn">ホーリーステッキⅣ＋ME10</a></li>
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
};
</script>
