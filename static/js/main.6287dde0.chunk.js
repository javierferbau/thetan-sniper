(this["webpackJsonpthenan-sniper"]=this["webpackJsonpthenan-sniper"]||[]).push([[0],{54:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(20),i=n.n(a),o=(n(54),n(40)),s=n(14),u=n(9),j=n(6),l=(n(55),n(41)),b=n(24),d=n(35),h=n(3);function f(e){var t=e.columns,n=e.data,r=e.onClickRow,c=Object(b.useTable)({columns:t,data:n},b.useSortBy),a=c.getTableProps,i=c.headerGroups,o=c.rows,s=c.prepareRow;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(d.a,{place:"left",type:"success",effect:"solid"}),Object(h.jsxs)(l.a,Object(j.a)(Object(j.a)({striped:!0,bordered:!0,hover:!0,size:"sm"},a()),{},{children:[Object(h.jsx)("thead",{children:i.map((function(e){return Object(h.jsx)("tr",Object(j.a)(Object(j.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(h.jsx)("th",Object(j.a)(Object(j.a)({"data-tip":e.Footer},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(h.jsx)("tbody",{children:o.map((function(e,t){return s(e),Object(h.jsx)("tr",Object(j.a)(Object(j.a)({onClick:function(){return r(e)}},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(h.jsx)("td",Object(j.a)(Object(j.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))})]}))]})}var O=n(21),p=n.n(O),m=n(37),x=function(){var e=Object(m.a)(p.a.mark((function e(){var t,n=arguments;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch.apply(void 0,n);case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=[];C[0]=1.45,C[1]=5,C[2]=23.55;var v=[];v[0]="Common",v[1]="Epic",v[2]="Legendary";var g=function(e,t,n){return e.battleCap*(C[e.heroRarity]+6)*n-e.price/1e8*t},w=function(e,t){return e.price/1e8*t};var y=function(e,t,n){return Object(j.a)(Object(j.a)({},e),{},{usdPrice:w(e,t),heroRarityString:"".concat(v[e.heroRarity]," (").concat(C[e.heroRarity]," gTHC)."),winCalc:e.battleCap*(C[e.heroRarity]+6)*n,winDiffCalc:g(e,t,n),winBenefitTantPerCent:"".concat(Math.trunc((Math.trunc(g(e,t,n))-Math.trunc(w(e,t)))/Math.trunc(g(e,t,n))*100),"%."),needAlarm:e.price/1e8*t<61,silenceAlarm:!1})},H=function(){var e=Object(r.useState)(0),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(0),i=Object(u.a)(a,2),o=i[0],l=i[1],b=Object(r.useState)(!1),d=Object(u.a)(b,2),f=d[0],O=d[1],p=Object(r.useState)(),m=Object(u.a)(p,2),C=m[0],v=m[1],g=Object(r.useState)(61),w=Object(u.a)(g,2),H=w[0],P=w[1],S=Object(r.useState)(!0),F=Object(u.a)(S,2),R=F[0],T=F[1],k=Object(r.useState)(new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")),A=Object(u.a)(k,1)[0],B=[{Header:"Silence alarm",accessor:"silenceAlarm",Cell:function(e){return Object(h.jsx)("button",{onClick:function(){return M(e.row.original.id)},children:e.row.original.silenceAlarm?"\ud83d\udd08":"\ud83d\udd0a"})}},{Header:"Name",accessor:"name"},{Header:"Price (wbnb)",accessor:"price"},{Header:"Hero Cost ($)",accessor:"usdPrice"},{Header:"Maximum Battles",accessor:"battleCap"},{Header:"Hero Rarity",accessor:"heroRarityString"},{Header:"Maximum $ Win By Hero Rarity",accessor:"winCalc",Footer:"(Hero cost by rarity + maximum gTHC by win) x THC price"},{Header:"Maximum Benefits ",accessor:"winDiffCalc",Footer:"Hero cost - Maximum $ by Win"},{Header:"Benefits %",accessor:"winBenefitTantPerCent",Footer:"100*(P-C)/P"}];document.title="Thetan-sniper";var M=function(e){var t=C.map((function(t){return e===t.id?Object(j.a)(Object(j.a)({},t),{},{silenceAlarm:!t.silenceAlarm}):t}));v(t)},I=Object(s.useQuery)("heros",(function(){return x("https://data.thetanarena.com/thetan/v1/nif/search?sort=PriceAsc&size=3852").then((function(e){if(!C)return e;var t=e.data.map((function(e){var t=C.find((function(t){return t.id===e.id}));return t||y(e,n,o)}));v(t)}))}),{refetchInterval:!!f&&2e3}),L=I.data,Q=I.isLoading,$=Object(s.useQuery)("wbnbPrice",(function(){return x("https://exchange.thetanarena.com/exchange/v1/currency/price/32").then((function(e){c(e.data.toFixed(2))}))}),{refetchInterval:!!f&&1e4}).isLoading,E=Object(s.useQuery)("THCPrice",(function(){return x("https://exchange.thetanarena.com/exchange/v1/currency/price/11").then((function(e){l(e.data.toFixed(2))}))}),{refetchInterval:!!f&&1e4}).isLoading;return Object(r.useEffect)((function(){if(L&&L.data&&!C||C&&!C[0].winCalc&&n&&o){var e=function(e,t,n){return e.map((function(e){return y(e,t,n)}))}(L.data,n,o);v(e)}}),[L,n,o,C]),Object(r.useEffect)((function(){R&&C&&C.some((function(e){return e.needAlarm&&!e.silenceAlarm}))?A.play():A.pause()}),[C,A,R]),[n,C,Q,$,o,E,B,f,O,H,P,R,T]};function P(){var e=H(),t=Object(u.a)(e,13),n=t[0],c=t[1],a=t[2],i=t[3],o=t[4],s=t[5],j=t[6],l=t[7],b=t[8],d=t[9],O=t[10],p=t[11],m=t[12],x=Object(r.useState)(d),C=Object(u.a)(x,2),v=C[0],g=C[1];return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{children:["WBNB Price: ",!i&&n,"$"]}),Object(h.jsxs)("div",{children:["THC Price: ",!s&&o,"$"]}),"Alarm --",">",Object(h.jsx)("input",{value:v,onChange:function(e){return g(parseInt(e.target.value))}}),Object(h.jsx)("button",{onClick:function(){return O(v)},children:"\ud83d\udd0a => ".concat(d)}),Object(h.jsx)("button",{onClick:function(){return m(!p)},children:p?"\ud83d\udd0a":"\ud83d\udd08"}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{onClick:function(){return b(!l)},children:l?"\u23f8":"\u25b6"}),Object(h.jsx)("br",{}),Object(h.jsx)("div",{children:!a&&c&&Object(h.jsx)(f,{columns:j,data:c,onClickRow:function(e){return window.open("https://marketplace.thetanarena.com/item/".concat(e.original.refId))}})})]})}var S=new s.QueryClient;function F(){return Object(h.jsx)(s.QueryClientProvider,{client:S,children:Object(h.jsx)(o.a,{children:Object(h.jsx)(P,{})})})}var R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,71)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))};i.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(F,{})}),document.getElementById("root")),R()}},[[66,1,2]]]);
//# sourceMappingURL=main.6287dde0.chunk.js.map