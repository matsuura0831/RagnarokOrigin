(function(e){function t(t){for(var c,l,i=t[0],u=t[1],b=t[2],a=0,O=[];a<i.length;a++)l=i[a],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&O.push(r[l][0]),r[l]=0;for(c in u)Object.prototype.hasOwnProperty.call(u,c)&&(e[c]=u[c]);j&&j(t);while(O.length)O.shift()();return o.push.apply(o,b||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],c=!0,l=1;l<n.length;l++){var u=n[l];0!==r[u]&&(c=!1)}c&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var c={},r={app:0},o=[];function l(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-152bc32b":"e0fc8f08"}[e]+".js"}function i(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var c=new Promise((function(t,c){n=r[e]=[t,c]}));t.push(n[2]=c);var o,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=l(e);var b=new Error;o=function(t){u.onerror=u.onload=null,clearTimeout(a);var n=r[e];if(0!==n){if(n){var c=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;b.message="Loading chunk "+e+" failed.\n("+c+": "+o+")",b.name="ChunkLoadError",b.type=c,b.request=o,n[1](b)}r[e]=void 0}};var a=setTimeout((function(){o({type:"timeout",target:u})}),12e4);u.onerror=u.onload=o,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=c,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)i.d(n,c,function(t){return e[t]}.bind(null,c));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],b=u.push.bind(u);u.push=t,u=u.slice();for(var a=0;a<u.length;a++)t(u[a]);var j=b;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"072e":function(e,t,n){e.exports=n.p+"img/water_wand.6e5bd538.png"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23"),r={id:"nav",class:"text-center p-5"},o=Object(c["i"])("Home"),l=Object(c["i"])(" | "),i=Object(c["i"])("魔法");function u(e,t){var n=Object(c["A"])("router-link"),u=Object(c["A"])("router-view");return Object(c["t"])(),Object(c["g"])(c["a"],null,[Object(c["h"])("div",r,[Object(c["j"])(n,{to:"/"},{default:Object(c["H"])((function(){return[o]})),_:1}),l,Object(c["j"])(n,{to:"/magic"},{default:Object(c["H"])((function(){return[i]})),_:1})]),Object(c["j"])(u)],64)}n("7329");var b=n("d959"),a=n.n(b);const j={},O=a()(j,[["render",u]]);var s=O,f=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),p={class:"home bg-gray-100 p-5"},d=Object(c["h"])("div",{class:"flex flex-col py-5 text-lg"},[Object(c["h"])("p",null,"ラグナロクオリジンの各種計算機を公開する場所です")],-1);function h(e,t,n,r,o,l){var i=Object(c["A"])("About");return Object(c["t"])(),Object(c["g"])("div",p,[d,Object(c["j"])(i)])}var v=n("072e"),g=n.n(v),m={class:"about bg-gray-100"},y={class:"flex flex-col px-10 text-lg"},x={class:"flex flex-col"},H=Object(c["i"])("〇〇ステータスには何を入れればいいの？"),w=Object(c["i"])(" ゲームを起動してキャラクターのステータスの詳細情報を開いてください． そこで確認できる各種値を各行の左側の入力欄に記載してください． "),_=Object(c["i"])("基本魔法攻撃や装備魔法攻撃はどうやって見ればいいの？"),k=Object(c["i"])(' ステータスの詳細情報画面で"基本ステータス > 魔法攻撃"をクリックして表示される値を入力してください． '),P=Object(c["i"])("〇〇ステータスの左右は何が違うの？"),A=Object(c["h"])("p",null,' 画面上部のダメージの"現在"に反映されるのが左側，"補正"に反映されるのが左側＋右側となります． ',-1),E=Object(c["h"])("p",null,[Object(c["i"])(" 例えばスネークカード(魔法攻撃+20)をドラキュラカード(魔法攻撃+100, 魔法ダメージ+15%)に変えたい場合， "),Object(c["h"])("ul",{class:"ml-4"},[Object(c["h"])("li",null,'"基本ステータス > 装備魔法攻撃"の右側に80を入力し，'),Object(c["h"])("li",null,'"上級ステータス > 魔法ダメージ増加"の右側に15を入力すると，')]),Object(c["i"])(' ダメージの"補正"がドラキュラカードに換装した場合の値となります． ')],-1),S=Object(c["h"])("p",null," ドラキュラカードからスネークカードに変えた場合は負の値を右側にいれてください． ",-1),L=Object(c["i"])("詠唱に関わるステータスは何のためにあるの？"),B=Object(c["h"])("p",null," 将来的に詠唱時間を計算してDPS出力もできるようにするためのものです． 実装をお待ちください． ",-1),M=Object(c["h"])("p",null," 装備固定詠唱減少と変動詠唱減少についてはステータス詳細に表示された値をそのまま入力しないでください． INTとDEXが混じったモノが表示されているため正しく計算できなくなります． ",-1),T=Object(c["i"])("対象モンスターについて変更できない項目があるのは何故？"),C=Object(c["i"])(" 魔法攻撃で影響を及ぼさない項目のためです． 将来的に物理攻撃に関しても計算できるようにするためデータとしては蓄積しています． "),D=Object(c["i"])("対象モンスターでHPがゼロになっているのは何故？"),I=Object(c["i"])(' HPのデータが公開されていないモンスター(カカシ，MINI，BOSS)です． 対象モンスターには"確殺数"が計算されなくなりますが，その他値は正常です． '),z=Object(c["i"])("仕様スキルで詠唱時間に関する項目を変更しても影響しないのは何故？"),J=Object(c["i"])(" 将来的に詠唱時間を計算してDPS出力もできるようにするためのものです． 実装をお待ちください． "),N=Object(c["i"])("計算が合わないんだけど？"),$=Object(c["i"])(" まずは自分の入力した値が正しいかどうか，未実装のギア(インファイト等)による効果が現れていないかをご確認ください． それでも合わない場合，将来的に投稿フォームも用意する予定なので実装をお待ちください． "),q=Object(c["i"])("古代海龍の杖を装備すると計算が合わないんだけど？"),U=Object(c["h"])("p",null,[Object(c["h"])("img",{alt:"古代海龍の杖",src:g.a})],-1),X=Object(c["h"])("p",null,[Object(c["i"])(" 上記の杖を持った場合，説明文の上から順に， "),Object(c["h"])("ul",{class:"ml-4"},[Object(c["h"])("li",null,'"魔法攻撃+406": "基礎ステータス > 装備魔法攻撃" に現装備の魔法攻撃との差分を追加'),Object(c["h"])("li",null,'"コードボルトダメージ+5.94%": "装備改造 > スキルダメージUP" に追加'),Object(c["h"])("li",null,'"海龍の泡を発動して300%の魔法ダメージを与える": 対象追加効果によるダメージ計算は未実装です．計算したい場合は無属性の倍率300%のスキルを入力した場合で計算してください'),Object(c["h"])("li",null,'"固定詠唱時間-20%": "詠唱にかかわるステータス > 装備固定詠唱減少" に追加'),Object(c["h"])("li",null,'"精練+6以上の時，水属性ダメージ+15%": "特殊ステータス > 属性ダメージアップ" に追加'),Object(c["h"])("li",null,'"精練+10以上の時，水属性ダメージ倍率+200%": "使用スキル > 倍率"に追加(スキル変更するとリセットされるので注意)'),Object(c["h"])("li",null,'"精練+15以上の時...": 未実装です．無属性スキルを利用した場合で計算してください')]),Object(c["i"])(' といったように値を変更してください． なお"精練+6"効果は装備した際にキャラクターのステータス画面に反映されているのでご注意ください． ')],-1);function F(e,t,n,r,o,l){var i=Object(c["A"])("Accordion");return Object(c["t"])(),Object(c["g"])("div",m,[Object(c["h"])("div",y,[Object(c["h"])("div",x,[Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[H]})),content:Object(c["H"])((function(){return[w]})),_:1}),Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[_]})),content:Object(c["H"])((function(){return[k]})),_:1}),Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[P]})),content:Object(c["H"])((function(){return[A,E,S]})),_:1}),Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[L]})),content:Object(c["H"])((function(){return[B,M]})),_:1}),Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[T]})),content:Object(c["H"])((function(){return[C]})),_:1}),Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[D]})),content:Object(c["H"])((function(){return[I]})),_:1}),Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[z]})),content:Object(c["H"])((function(){return[J]})),_:1}),Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[N]})),content:Object(c["H"])((function(){return[$]})),_:1}),Object(c["j"])(i,null,{title:Object(c["H"])((function(){return[q]})),content:Object(c["H"])((function(){return[U,X]})),_:1})])])])}var G=n("d54e"),K={name:"About",components:{Accordion:G["a"]}};const Q=a()(K,[["render",F]]);var R=Q,V={name:"Home",components:{About:R}};const W=a()(V,[["render",h]]);var Y=W,Z=[{path:"/",name:"Home",component:Y},{path:"/magic",name:"Magic",component:function(){return n.e("chunk-152bc32b").then(n.bind(null,"b03c"))}}],ee=Object(f["a"])({history:Object(f["b"])(),routes:Z}),te=ee,ne=n("5502"),ce=Object(ne["a"])({state:{},mutations:{},actions:{},modules:{}}),re=n("af56");n("a766");Object(c["d"])(s).use(ce).use(te).use(re["a"]).mount("#app")},6675:function(e,t,n){},7329:function(e,t,n){"use strict";n("6675")},a766:function(e,t,n){},d54e:function(e,t,n){"use strict";var c=n("7a23"),r={class:"flex flex-col w-full mb-2"},o=Object(c["h"])("path",{d:"M15 1.2l-7 7-7-7","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},null,-1),l=[o],i={key:0,class:"p-4"};function u(e,t,n,o,u,b){return Object(c["t"])(),Object(c["g"])("div",r,[Object(c["h"])("button",{onClick:t[0]||(t[0]=function(){return b.toggle&&b.toggle.apply(b,arguments)}),class:"flex items-center justify-between shadow bg-white p-2 text-xl font-medium leading-none text-gray-800"},[Object(c["z"])(e.$slots,"title"),(Object(c["t"])(),Object(c["g"])("svg",{class:Object(c["p"])(["w-3 transition-all duration-200 transform",{"rotate-180":u.isOpen,"rotate-0":!u.isOpen}]),fill:"none",stroke:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 10"},l,2))]),Object(c["j"])(c["b"],{onBeforeEnter:b.beforeEnter,onEnter:b.enter,onBeforeLeave:b.beforeLeave,onLeave:b.leave},{default:Object(c["H"])((function(){return[u.isOpen?(Object(c["t"])(),Object(c["g"])("div",i,[Object(c["z"])(e.$slots,"content")])):Object(c["f"])("",!0)]})),_:3},8,["onBeforeEnter","onEnter","onBeforeLeave","onLeave"])])}var b={props:{expand:{type:Boolean,default:!1}},data:function(){return{isOpen:this.expand}},methods:{toggle:function(){this.isOpen=!this.isOpen},beforeEnter:function(e){e.style.height="0"},enter:function(e){e.style.height=e.scrollHeight+"px"},beforeLeave:function(e){e.style.height=e.scrollHeight+"px"},leave:function(e){e.style.height="0"}}},a=n("d959"),j=n.n(a);const O=j()(b,[["render",u]]);t["a"]=O}});
//# sourceMappingURL=app.da089d65.js.map