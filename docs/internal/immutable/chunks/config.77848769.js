import{S as u,i as m,s as y,e as f,c as g,b as p,d as l,h as c,l as h,p as i,t as d,g as _,m as o,o as x}from"./index.3d718cdb.js";/* empty css                                              */function b(s){let e;return{c(){e=f("div"),this.h()},l(n){e=g(n,"DIV",{id:!0,class:!0}),p(e).forEach(l),this.h()},h(){c(e,"id","loading"),c(e,"class","svelte-1e2b3ig")},m(n,a){h(n,e,a)},p:i,i,o:i,d(n){n&&l(e)}}}class $ extends u{constructor(e){super(),m(this,e,null,b,y,{})}}function v(s){let e,n,a;return{c(){e=f("div"),n=d("DESDR: "),a=d(s[0]),this.h()},l(t){e=g(t,"DIV",{class:!0});var r=p(e);n=_(r,"DESDR: "),a=_(r,s[0]),r.forEach(l),this.h()},h(){c(e,"class","text-center py-5 px-2 text-4xl font-bold")},m(t,r){h(t,e,r),o(e,n),o(e,a)},p(t,[r]){r&1&&x(a,t[0])},i,o:i,d(t){t&&l(e)}}}function q(s,e,n){let{country:a}=e;return s.$$set=t=>{"country"in t&&n(0,a=t.country)},[a]}class E extends u{constructor(e){super(),m(this,e,q,v,y,{country:0})}}const S=`backends:
- type: duckdb
  name: duckdb
  sources:
  - parquet: "admin_raw.parquet"
    name: "admin_raw"
  - parquet: "chirps_raw.parquet"
    name: "chirps_raw"
  - parquet: "ipc_raw.parquet"
    name: ipc_raw

- type: query
  name: climatology
  # query doesn't have source/sources -- assumes all data is loaded already
  db: duckdb
  query: "" # if query name is in model out, will pull query from there, replacing this text 
  defaults:
    region: 1
    freq: 0.23
    year_start: 2015
    year_end: 2025
    sum_early_weight: 0.4
    sum_late_weight: 0.4 
    freq_excess: 0.23
    sum_early_excess_first: 16
    sum_early_excess_last: 22
    sum_late_excess_first: 23
    sum_late_excess_last: 30
    exit_multiplier_excess: 1.015
  save: true 
- type: query
  name: severity_combined 
  db: duckdb
  query: ""
  defaults:
    region: 1
    freq: 0.23
    year_start: 2015
    year_end: 2025
    sum_early_weight: 0.4
    sum_late_weight: 0.4 
    freq_excess: 0.23
    sum_early_excess_first: 16
    sum_early_excess_last: 22
    sum_late_excess_first: 23
    sum_late_excess_last: 30
    exit_multiplier_excess: 1.015
  save: true 
- type: query
  name: ipc
  db: duckdb
  query: ""
  defaults:
    region: 1
    freq: 0.23
    year_start: 2015
    year_end: 2025
  save: true
- type: query
  name: matching 
  db: duckdb
  query: "" 
  defaults:
    region: 1
    freq: 0.23
    year_start: 2015
    year_end: 2025
    sum_early_weight: 0.4
    sum_late_weight: 0.4 
    freq_excess: 0.23
    sum_early_excess_first: 16
    sum_early_excess_last: 22
    sum_late_excess_first: 23
    sum_late_excess_last: 30
    exit_multiplier_excess: 1.015
  save: true 
- type: matching
  name: mtb 
  ignore_cols:
    - year
    - gid
    - value
  default_func: "true positive" 
  backend: matching
  matching: ""
  defaults:
    region: 1
    freq: 0.23
    year_start: 2015
    year_end: 2025
    sum_early_weight: 0.4
    sum_late_weight: 0.4 
    freq_excess: 0.23
    sum_early_excess_first: 16
    sum_early_excess_last: 22
    sum_late_excess_first: 23
    sum_late_excess_last: 30
    exit_multiplier_excess: 1.015
  save: true
- type: query
  name: default_q 
  db: duckdb
  query: "SELECT gid, chirps_early_first, chirps_early_last, chirps_late_first, chirps_late_last FROM admin_raw ORDER BY gid"
- type: overlay
  name: overlay
views:
- type: Login
  name: Login
  selector: "#login"
  dataTable: Mauritania_Data
  stateTable: Mauritania_State
- type: Line
  name: climatology_chart
  selector: "#chart-1"
  xAttr: dekad 
  yAttr: average_value
  data:
  - backend: climatology
  - backend: overlay
    target: overlay
- type: BarGrouped   
  name: severity_combined
  selector: "#chart-3"
  xAttr: year
  yAttr: value
  yMax: 1
  xDomainMin: 2015
  xDomainMax: 2025
  groupNames:
    - sum_early_excess
    - sum_late_excess
    - combined_severity
  overlays:
    ipc:
      label: "IPC Phase 3+"
      stroke: "#004204"
      fill: "#009907"
      default: false
  data:
  - backend: severity_combined
  - backend: ipc
- type: MatchingTable    
  name: matching_table  
  selector: "#chart-4"
  data:
  - backend: mtb  
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
        - backend: mtb
          region: $gid
        - backend: severity_combined 
          region: $gid
        - backend: ipc
          region: $gid
  index: 0
  dropdown_key: region
  data: 
  - query: "SELECT gid, region FROM admin_raw ORDER BY gid"
- type: DropDown
  name: Matching_Dropdown
  selector: "#dropdown-2"
  interactions:
    - type: change
      name: ddc-matching
      to:
        - backend: mtb
          func_elected: $value
  index: 0
  dropdown_key: value
  data: 
  - query: "SELECT * FROM (VALUES (0,'true positive'),(1,'true negative'),(2,'average matching')) MATCHING_OPTIONS(idx, value);"

- type: Slider
  name: ExcessEarly
  selector: "#slider-4"
  min: 16
  max: 30
  description: "Excess Rainfall (Window 1)"
  tooltip: "This sets the time period for measuring excess rainfall during the early season."
  interactions:
  - type: change
    to: 
    - backend: severity_combined
      sum_early_excess_first: $left
      sum_early_excess_last: $right
    - backend: mtb 
      sum_early_excess_first: $left
      sum_early_excess_last: $right
    - backend: overlay
      sum_early_excess:
        left: $left
        right: $right
        
- type: Slider
  name: ExcessLate
  selector: "#slider-5"
  min: 16
  max: 30
  description: "Excess Rainfall (Window 2)"
  tooltip: "This sets the time period for measuring excess rainfall during the late season."
  interactions:
  - type: change
    to: 
    - backend: severity_combined
      sum_late_excess_first: $left
      sum_late_excess_last: $right
    - backend: mtb 
      sum_late_excess_first: $left
      sum_late_excess_last: $right
    - backend: overlay
      sum_late_excess:
        left: $left
        right: $right

- type: Alert
  name: Alert
  selector: "#alert"
  threshold_string: "0.5"
  key: "combined_severity"
  data:
    - backend: severity_combined
  interactions:
  - type: valid
- type: SliderFreq
  name: FrequencySlider
  selector: "#freq-slider"
  min: 0.1
  max: 1
  defaultValue: 0.23
  description: "Trigger frequency"
  tooltip: "This slider sets the percentage of years in which AA would have triggered."
  interactions:
  - type: change
    to:
    # Mauritania: excess models read freq_excess, so the slider sets both
    - backend: severity_combined 
      freq: $left
      freq_excess: $left
    - backend: mtb  
      freq: $left
      freq_excess: $left
    - backend: ipc
      freq: $left
- type: Slider
  name: StartYearSlider
  selector: "#start-year"
  min: 2015
  max: 2025
  minRange: 7
  description: "Analysis period"
  tooltip: "This slider sets the start and end year of the analysis period."
  interactions:
  - type: change
    to:
    - backend: severity_combined 
      year_start: $left
      year_end: $right
    - backend: mtb  
      year_start: $left
      year_end: $right
    - backend: ipc
      year_start: $left
      year_end: $right
dependencies: 
- source: ddc
  attr: "gid"
  target:
    - view: ExcessEarly 
      defaults:
        backend: default_q
        function: "
        if(!a) return;
        let data = this; 
        let row = data.filter((r) => r.gid === a[0].store.val()['gid'])[0];
        return {left: row.chirps_early_first, right: row.chirps_early_last}
        ;"
    - view: ExcessLate 
      defaults:
        backend: default_q
        function: "
        if(!a) return;
        let data = this; 
        let row = data.filter((r) => r.gid === a[0].store.val()['gid'])[0];
        return {left: row.chirps_late_first, right: row.chirps_late_last}
        ;"
`;export{E as H,$ as S,S as r};
