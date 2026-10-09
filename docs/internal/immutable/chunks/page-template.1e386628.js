import{S as Me,i as Oe,s as $e,e as n,a as c,t as T,c as r,b as s,d as a,f as d,g as C,h as i,j as Ae,k as Fe,l as De,m as e,n as He,p as Ne,q as Ue,u as We,v as Ye}from"./index.3d718cdb.js";import{l as je,C as Qe}from"./config.69d9bfb6.js";import{M as ze,f as Ge,h as Je}from"./MatchingMetrics.a262ea7c.js";import{b as Le,B as Ke}from"./index.c75ebaf2.js";import{m as Be}from"./model_out.75dac66d.js";import{C as Xe}from"./http_client.b910010a.js";const Ze=`# Madagascar Red Cross Configuration
# This is a minimal configuration file that serves as a baseline template
# for creating new country-specific implementations

backends:
# Basic DuckDB backend for data storage
- type: duckdb
  name: duckdb
  sources:
  - parquet: "admin_raw.parquet"
    name: "admin_raw"
  - parquet: "chirps_raw.parquet"
    name: "chirps_raw"

# Basic query backend for climatology data
- type: query
  name: climatology
  db: duckdb
  query: ""
  defaults:
    region: 1
    ####
    freq: 0.23
    year_start: 1991
    year_end: 2024
  save: true

# Basic overlay backend for interactions
- type: overlay
  name: overlay

views:
# Basic login component
- type: Login
  name: Login
  selector: "#login"
  dataTable: Template_Data
  stateTable: Template_State

# Basic village dropdown
- type: DropDown
  name: Village_Autocomplete
  selector: "#dropdown-villages"
  interactions:
    - type: change
      name: ddc
      defaults:
        region: 1
      to:
        - backend: climatology
          region: $gid
  index: 0
  dropdown_key: region
  data: 
  - query: "SELECT gid, region FROM admin_raw ORDER BY gid"

# Basic climatology chart
- type: Line
  name: climatology_chart
  selector: "#chart-1"
  xAttr: dekad 
  yAttr: average_value
  data:
  - backend: climatology
  - backend: overlay
    target: overlay

# Basic slider for early season
- type: Slider
  name: PlantEarly
  selector: "#slider-1"
  min: 19
  max: 55
  description: "CHIRPS (Early Season)"
  tooltip: "This gives us the sum of rainfall during this time period in the early season."
  interactions:
  - type: change
    to: 
    - backend: overlay
      sum_early:
        left: $left
        right: $right

# Basic alert component
- type: Alert
  name: Alert
  selector: "#alert"
  threshold_string: "0.5"
  key: "combined_severity"
  data:
    - backend: climatology
  interactions:
  - type: valid
`;function ea(R){let u,P,o,p,m,y,g,A,l,f,_,t,te,E,ne,b,Y,re,N,se,ie,S,oe,V,L,le,ce,I,j,de,B,ve,he,Q,fe,D,M,pe,ue,x,q,O,me,ye,w,$,ge,F,_e,Ee,H,U,be,Ie,xe;return{c(){u=n("div"),P=c(),o=n("div"),p=n("div"),m=n("div"),y=c(),g=n("div"),A=c(),l=n("div"),f=n("div"),_=n("span"),t=T("Rainfall climatology"),te=c(),E=n("input"),ne=c(),b=n("div"),Y=n("i"),re=c(),N=n("span"),se=T(`Shows the average observed historical rainfall during each decad
          based on satellite data`),ie=c(),S=n("div"),oe=c(),V=n("div"),L=n("span"),le=T("Variables"),ce=c(),I=n("div"),j=n("i"),de=c(),B=n("span"),ve=T(`These are the specific pieces of information that go into making up
          the Insurance Index.`),he=c(),Q=n("div"),fe=c(),D=n("div"),M=n("div"),pe=T("Policy Performance"),ue=c(),x=n("div"),q=n("div"),O=n("span"),me=T("Performance chart"),ye=c(),w=n("div"),$=n("i"),ge=c(),F=n("span"),_e=T(`If there's a red bar, it means the insurance would have provided
            money to the farmers that year because the conditions matched the
            criteria for a payout.`),Ee=c(),H=n("div"),U=n("p"),be=T("Performance chart will be added here"),this.h()},l(v){u=r(v,"DIV",{id:!0}),s(u).forEach(a),P=d(v),o=r(v,"DIV",{class:!0});var h=s(o);p=r(h,"DIV",{class:!0});var z=s(p);m=r(z,"DIV",{id:!0}),s(m).forEach(a),y=d(z),g=r(z,"DIV",{id:!0}),s(g).forEach(a),z.forEach(a),A=d(h),l=r(h,"DIV",{class:!0});var k=s(l);f=r(k,"DIV",{});var W=s(f);_=r(W,"SPAN",{class:!0});var we=s(_);t=C(we,"Rainfall climatology"),we.forEach(a),te=d(W),E=r(W,"INPUT",{type:!0,class:!0}),ne=d(W),b=r(W,"DIV",{class:!0});var G=s(b);Y=r(G,"I",{class:!0}),s(Y).forEach(a),re=d(G),N=r(G,"SPAN",{class:!0});var ke=s(N);se=C(ke,`Shows the average observed historical rainfall during each decad
          based on satellite data`),ke.forEach(a),G.forEach(a),W.forEach(a),ie=d(k),S=r(k,"DIV",{id:!0}),s(S).forEach(a),oe=d(k),V=r(k,"DIV",{});var J=s(V);L=r(J,"SPAN",{class:!0});var Te=s(L);le=C(Te,"Variables"),Te.forEach(a),ce=d(J),I=r(J,"DIV",{class:!0});var K=s(I);j=r(K,"I",{class:!0}),s(j).forEach(a),de=d(K),B=r(K,"SPAN",{class:!0});var Ce=s(B);ve=C(Ce,`These are the specific pieces of information that go into making up
          the Insurance Index.`),Ce.forEach(a),K.forEach(a),J.forEach(a),he=d(k),Q=r(k,"DIV",{id:!0}),s(Q).forEach(a),k.forEach(a),fe=d(h),D=r(h,"DIV",{class:!0});var X=s(D);M=r(X,"DIV",{class:!0});var Pe=s(M);pe=C(Pe,"Policy Performance"),Pe.forEach(a),ue=d(X),x=r(X,"DIV",{class:!0});var Z=s(x);q=r(Z,"DIV",{});var ee=s(q);O=r(ee,"SPAN",{class:!0});var Se=s(O);me=C(Se,"Performance chart"),Se.forEach(a),ye=d(ee),w=r(ee,"DIV",{class:!0});var ae=s(w);$=r(ae,"I",{class:!0,style:!0}),s($).forEach(a),ge=d(ae),F=r(ae,"SPAN",{class:!0});var Ve=s(F);_e=C(Ve,`If there's a red bar, it means the insurance would have provided
            money to the farmers that year because the conditions matched the
            criteria for a payout.`),Ve.forEach(a),ae.forEach(a),ee.forEach(a),Ee=d(Z),H=r(Z,"DIV",{class:!0});var qe=s(H);U=r(qe,"P",{class:!0});var Re=s(U);be=C(Re,"Performance chart will be added here"),Re.forEach(a),qe.forEach(a),Z.forEach(a),X.forEach(a),h.forEach(a),this.h()},h(){i(u,"id","alert"),i(m,"id","login"),i(g,"id","dropdown-villages"),i(p,"class","col-span-2"),i(_,"class","text-2xl font-bold leading-tight text-gray-900"),i(E,"type","checkbox"),i(E,"class","w-4 h-4"),i(Y,"class","bi bi-info-circle"),i(N,"class","tooltiptext"),i(b,"class","tooltip"),i(S,"id","chart-1"),Ae(S,"hidden",!R[0]),i(L,"class","text-2xl font-bold leading-tight text-gray-900"),i(j,"class","bi bi-info-circle"),i(B,"class","tooltiptext"),i(I,"class","tooltip"),i(Q,"id","slider-1"),i(l,"class","overflow-auto max-h-[80vh]"),i(M,"class","text-2xl font-bold leading-tight text-gray-900"),i(O,"class","font-bold leading-tight text-gray-900"),i($,"class","bi bi-info-circle-fill"),Fe($,"color","#ff6663"),i(F,"class","tooltiptext"),i(w,"class","tooltip"),i(U,"class","text-gray-600"),i(H,"class","bg-gray-100 p-4 rounded"),i(x,"class","mx-[2%]"),i(D,"class","overflow-auto"),i(o,"class","grid grid-cols-2 h-[100vh]")},m(v,h){De(v,u,h),De(v,P,h),De(v,o,h),e(o,p),e(p,m),e(p,y),e(p,g),e(o,A),e(o,l),e(l,f),e(f,_),e(_,t),e(f,te),e(f,E),E.checked=R[0],e(f,ne),e(f,b),e(b,Y),e(b,re),e(b,N),e(N,se),e(l,ie),e(l,S),e(l,oe),e(l,V),e(V,L),e(L,le),e(V,ce),e(V,I),e(I,j),e(I,de),e(I,B),e(B,ve),e(l,he),e(l,Q),e(o,fe),e(o,D),e(D,M),e(M,pe),e(D,ue),e(D,x),e(x,q),e(q,O),e(O,me),e(q,ye),e(q,w),e(w,$),e(w,ge),e(w,F),e(F,_e),e(x,Ee),e(x,H),e(H,U),e(U,be),Ie||(xe=He(E,"change",R[1]),Ie=!0)},p(v,[h]){h&1&&(E.checked=v[0]),h&1&&Ae(S,"hidden",!v[0])},i:Ne,o:Ne,d(v){v&&a(u),v&&a(P),v&&a(o),Ie=!1,xe()}}}function aa(R,u,P){let o;Ue(R,Le,t=>P(3,o=t));let p=Xe;const m=new p("https://rightful-anteater-150.convex.cloud");m.mutation("saveParams"),m.query("getParams");let y=je(Ze,"utf8");console.log(y),We(Le,o=new Ke,o);let g=new ze(o),A,l=!0;const f={year_overlay:t=>`SELECT * FROM ${t} WHERE year >= var(year_start) AND year <= var(year_end) ORDER BY variable LIMIT (SELECT COUNT(DISTINCT year) FROM ${t} WHERE year >= var(year_start) AND year <= var(year_end)) * var(freq)`,year_overlay_region:t=>`SELECT * FROM ${t} WHERE gid = 'var(region)' AND year >= var(year_start) AND year <= var(year_end) ORDER BY variable LIMIT (SELECT COUNT(DISTINCT year) FROM ${t} WHERE gid = 'var(region)' AND year >= var(year_start) AND year <= var(year_end)) * var(freq)`};Ye(async()=>{(y.backends??[]).forEach(t=>{t.type==="matching"?t.matching=Ge:t.query_template&&f[t.query_template]?t.query=f[t.query_template](t.source_table||t.name):Je(t.name)(Be)&&(t.query=Be[t.name].query)}),(y.views??[]).forEach(t=>{t.type==="Login"&&(t.magic=g,t.exportFunc="saveToConvex",t.importFunc="getFromConvex",t.client=m)}),A=new Qe(g,y),await A.init()});function _(){l=this.checked,P(0,l)}return[l,_]}class la extends Me{constructor(u){super(),Oe(this,u,aa,ea,$e,{})}}export{la as default};
