(function(e){function t(t){for(var r,i,u=t[0],l=t[1],a=t[2],b=0,f=[];b<u.length;b++)i=u[b],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&f.push(c[i][0]),c[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);s&&s(t);while(f.length)f.shift()();return o.push.apply(o,a||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var l=n[i];0!==c[l]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},c={app:0},o=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-86e9ae48":"1d7d3f09"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=c[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=c[e]=[t,r]}));t.push(n[2]=r);var o,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e);var a=new Error;o=function(t){l.onerror=l.onload=null,clearTimeout(b);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;a.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",a.name="ChunkLoadError",a.type=r,a.request=o,n[1](a)}c[e]=void 0}};var b=setTimeout((function(){o({type:"timeout",target:l})}),12e4);l.onerror=l.onload=o,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],a=l.push.bind(l);l.push=t,l=l.slice();for(var b=0;b<l.length;b++)t(l[b]);var s=a;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),c={id:"nav",class:"text-center p-5"},o=Object(r["i"])("Home"),i=Object(r["i"])(" | "),u=Object(r["i"])("魔法");function l(e,t){var n=Object(r["A"])("router-link"),l=Object(r["A"])("router-view");return Object(r["t"])(),Object(r["g"])(r["a"],null,[Object(r["h"])("div",c,[Object(r["j"])(n,{to:"/"},{default:Object(r["H"])((function(){return[o]})),_:1}),i,Object(r["j"])(n,{to:"/magic"},{default:Object(r["H"])((function(){return[u]})),_:1})]),Object(r["j"])(l)],64)}n("7329");var a=n("d959"),b=n.n(a);const s={},f=b()(s,[["render",l]]);var j=f,O=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),p={class:"home bg-gray-100 p-5"},d=Object(r["h"])("div",{class:"flex flex-col py-5 text-lg"},[Object(r["h"])("p",null,"ラグナロクオリジンの各種計算機を公開する場所です")],-1);function h(e,t,n,c,o,i){var u=Object(r["A"])("About");return Object(r["t"])(),Object(r["g"])("div",p,[d,Object(r["j"])(u)])}var v={class:"about bg-gray-100"},g={class:"flex flex-col px-10 text-lg"},m={class:"flex flex-col"},y=Object(r["i"])("〇〇ステータスには何を入れればいいの？"),x=Object(r["i"])(" ゲームを起動してキャラクターのステータスの詳細情報を開いてください． そこで確認できる各種値を各行の左側の入力欄に記載してください． "),w=Object(r["i"])("基本魔法攻撃や装備魔法攻撃はどうやって見ればいいの？"),H=Object(r["i"])(' ステータスの詳細情報画面で"基本ステータス > 魔法攻撃"をクリックして表示される値を入力してください． '),_=Object(r["i"])("〇〇ステータスの左右は何が違うの？"),k=Object(r["h"])("p",null,' 画面上部のダメージの"現在"に反映されるのが左側，"補正"に反映されるのが左側＋右側となります． ',-1),P=Object(r["h"])("p",null,[Object(r["i"])(" 例えばスネークカード(魔法攻撃+20)をドラキュラカード(魔法攻撃+100, 魔法ダメージ+15%)に変えたい場合は下記のように入力してください "),Object(r["h"])("ul",{class:"list-disc ml-12"},[Object(r["h"])("li",null,'"基本ステータス > 装備魔法攻撃"の右側に80'),Object(r["h"])("li",null,'"上級ステータス > 魔法ダメージ増加"の右側に15')]),Object(r["i"])(' 上記により，画面上部の期待値の"補正"欄がドラキュラカードに換装した場合の値となります． ')],-1),A=Object(r["h"])("p",null," ドラキュラカードからスネークカードに変えた場合は負の値を右側にいれてください． ",-1),E=Object(r["i"])("詠唱に関わるステータスは何のためにあるの？"),L=Object(r["h"])("p",null," DPS出力の算出に利用します． ",-1),S=Object(r["h"])("p",null," 装備固定詠唱減少と変動詠唱減少についてはステータス詳細に表示された値をそのまま入力しないでください． INTとDEXによる効果が混じったモノが表示されているため正しく計算できなくなります． ",-1),B=Object(r["i"])("対象モンスターについて変更できない項目があるのは何故？"),M=Object(r["i"])(" 魔法攻撃で影響を及ぼさない項目のためです． 将来的に物理攻撃に関しても計算できるようにするためデータとしては蓄積しています． "),T=Object(r["i"])("対象モンスターでHPがゼロになっているのは何故？"),C=Object(r["i"])(' HPのデータが公開されていないモンスター(カカシ，MINI，BOSS)です． 対象モンスターには"確殺数"が計算されなくなりますが，その他値は正常です． '),I=Object(r["i"])("計算が合わないんだけど？"),J=Object(r["h"])("p",null," まずは自分の入力した値が正しいかどうか，未実装のギア(インファイト等)による効果が現れていないかをご確認ください． それでも合わない場合，将来的に投稿フォームも用意する予定なので実装をお待ちください． ",-1);function z(e,t,n,c,o,i){var u=Object(r["A"])("Accordion");return Object(r["t"])(),Object(r["g"])("div",v,[Object(r["h"])("div",g,[Object(r["h"])("div",m,[Object(r["j"])(u,null,{title:Object(r["H"])((function(){return[y]})),content:Object(r["H"])((function(){return[x]})),_:1}),Object(r["j"])(u,null,{title:Object(r["H"])((function(){return[w]})),content:Object(r["H"])((function(){return[H]})),_:1}),Object(r["j"])(u,null,{title:Object(r["H"])((function(){return[_]})),content:Object(r["H"])((function(){return[k,P,A]})),_:1}),Object(r["j"])(u,null,{title:Object(r["H"])((function(){return[E]})),content:Object(r["H"])((function(){return[L,S]})),_:1}),Object(r["j"])(u,null,{title:Object(r["H"])((function(){return[B]})),content:Object(r["H"])((function(){return[M]})),_:1}),Object(r["j"])(u,null,{title:Object(r["H"])((function(){return[T]})),content:Object(r["H"])((function(){return[C]})),_:1}),Object(r["j"])(u,null,{title:Object(r["H"])((function(){return[I]})),content:Object(r["H"])((function(){return[J]})),_:1})])])])}var D=n("d54e"),N={name:"About",components:{Accordion:D["a"]}};const V=b()(N,[["render",z]]);var X=V,$={name:"Home",components:{About:X}};const q=b()($,[["render",h]]);var G=q,Y=[{path:"/",name:"Home",component:G},{path:"/magic",name:"Magic",component:function(){return n.e("chunk-86e9ae48").then(n.bind(null,"b03c"))}}],F=Object(O["a"])({history:Object(O["b"])(),routes:Y}),K=F,Q=n("5502"),R=Object(Q["a"])({state:{},mutations:{},actions:{},modules:{}}),U=n("a584"),W=n("af56"),Z=(n("a766"),Object(r["d"])(j));Z.use(R).use(K).use(W["a"]),Z.use(U["a"],{config:{id:"G-224YJ56XVV"}},K),Z.mount("#app")},6675:function(e,t,n){},7329:function(e,t,n){"use strict";n("6675")},a766:function(e,t,n){},d54e:function(e,t,n){"use strict";var r=n("7a23"),c={class:"flex flex-col w-full mb-2"},o=Object(r["h"])("path",{d:"M15 1.2l-7 7-7-7","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},null,-1),i=[o],u={key:0,class:"p-4"};function l(e,t,n,o,l,a){return Object(r["t"])(),Object(r["g"])("div",c,[Object(r["h"])("button",{onClick:t[0]||(t[0]=function(){return a.toggle&&a.toggle.apply(a,arguments)}),class:"flex items-center justify-between shadow bg-white p-2 text-xl font-medium leading-none text-gray-800"},[Object(r["z"])(e.$slots,"title"),(Object(r["t"])(),Object(r["g"])("svg",{class:Object(r["p"])(["w-3 transition-all duration-200 transform",{"rotate-180":l.isOpen,"rotate-0":!l.isOpen}]),fill:"none",stroke:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 10"},i,2))]),Object(r["j"])(r["b"],{onBeforeEnter:a.beforeEnter,onEnter:a.enter,onBeforeLeave:a.beforeLeave,onLeave:a.leave},{default:Object(r["H"])((function(){return[l.isOpen?(Object(r["t"])(),Object(r["g"])("div",u,[Object(r["z"])(e.$slots,"content")])):Object(r["f"])("",!0)]})),_:3},8,["onBeforeEnter","onEnter","onBeforeLeave","onLeave"])])}var a={props:{expand:{type:Boolean,default:!1}},data:function(){return{isOpen:this.expand}},methods:{toggle:function(){this.isOpen=!this.isOpen},beforeEnter:function(e){e.style.height="0"},enter:function(e){e.style.height=e.scrollHeight+"px"},beforeLeave:function(e){e.style.height=e.scrollHeight+"px"},leave:function(e){e.style.height="0"}}},b=n("d959"),s=n.n(b);const f=s()(a,[["render",l]]);t["a"]=f}});