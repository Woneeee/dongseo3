export const CompDataInsert = [
  [
    { label: "유량당 소비전력", desc: "1Nm³의 압축 공기를 생산할 때 소모되는 전력량 입니다.", import: true },
    { label: "분당 최대 토출 용량", desc: "1분 동안 최대로 토출할 수 있는 압축 공기량 입니다.", import: true },
    { label: "총 가동시간", desc: "장비가 운전된 전체 시간 입니다. ( 부하 + 무부하 )" },
    { label: "부하 운전 시간", desc: "장비가 실제 부하 상태로 운전된 시간 입니다." },
    { label: "부하율", desc: "총 가동시간 중 부하 상태로 운전된 비율 입니다." },
    { label: "총 토출량", desc: "부하 운전 시간 동안 생산된 압축 공기의 총량 입니다." },
    { label: "총 전력량", desc: "총 토출량을 생산하는 데 소모된 전체 전력량 입니다." },
    { label: "총 배출량", desc: "총 전력 소비량을 기준으로 계산된 온실가스 배출량 입니다." },
  ],
  [
    { label: "부하율", desc: "= ( 부하 운전 시간 ÷ 총 가동 시간 ) × 100" },
    { label: "총 토출량", desc: "= 분당 최대 토출 용량 × 부하 운전 시간" },
    { label: "총 전력량", desc: "= 유량당 소비 전력량 × 총 토출량" },
    { label: "총 배출량", desc: "= 총 전력량 ÷ 1000 × 배출계수( 0.45941 )" },
  ],
];
