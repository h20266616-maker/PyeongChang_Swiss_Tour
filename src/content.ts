import { MASCOT_NAME } from './config';

// ─────────────────────────────────────────────
// 사이트 문구 전부 여기. 팀 회의 결과 나오면 여기만 고치면 됨.
// 교통·기온 정보는 2026년 조회 기준 → 발표 전 재확인!
// 레퍼런스: kiiikiii.kr (2000년대 여행사 홈페이지를 정색하고 따라 하는 톤)
// ─────────────────────────────────────────────

export const SLOGAN =
  '스위스를 동결건조해서 평창의 동결건조 상황을 뒤엎어버리는 우리는 테무산스위스다 이것들아ㅏㅏㅏ';

export const NAV = [
  { href: '#ticket', label: 'Tickets' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#guides', label: 'Tour Guides' },
  { href: '#map', label: 'Map' },
  { href: '#info', label: 'Travel Info' },
  { href: '#reviews', label: 'Reviews' },
];

export const BOOKING = {
  origins: ['From My Bed', '서울', '경기 · 인천', '그 외 (먼 곳)'],
  types: ['VIP', 'VVIP', 'VVVIP', 'VVVVIP'],
  agree: 'I accepted that 여기가 스위스가 아닐 수도 있음.',
  button: 'Buy Ticket »',
  breakfast: 'Breakfast (곤드레밥) Included in the package.',
  signText: 'PyeongSwiss',
  // 부제: B급 영화 제목처럼 길게 → "...더보기". 팀이 독스에 이어 쓰는 대로 교체
  subtitleShort:
    '스위스를 동결건조해서 옮겨놓은 듯한 느낌을 받을 수 있는 평창. 이 평창에 저희 평스투어가 엄선한 관광상품들을 즐기면서 저가로 유럽감성을 느낄 수 있는 이 기회가 단 돈 팔',
  subtitleRest:
    '만구천원…이 아니라 KTX 편도 18,000원부터. 비행기 12시간 대신 기차 1시간 20분, 한여름 밤에도 겉옷 필수, 양은 스위스산이라고 우기는 꿈의 여름 피서 패키지 (연락바람)',
};

export const PASS = {
  route: '청량리역 → 평창역 · KTX-이음',
  duration: '약 1시간 20분',
  fare: '편도 18,000원 (일반실 성인)',
  gate: '청량리역 KTX 승강장',
  seat: '아무데나 (농담, 지정석임)',
  realDest: 'PYEONGCHANG',
  realDestKo: '강원특별자치도 평창군',
  note: '실제 예매는 코레일에서 해주세요. 본 탑승권으로는 탑승 불가 (과제임)',
};

export type Tour = {
  id: string;
  time: string;
  name: string; // 영어 상품명 (키키처럼)
  category: string;
  blurb: string; // 카드 한 줄 (B급)
  real: string; // 실제 장소
  where: string;
  desc: string;
  guide: string;
  weather: string;
  weatherIcon: 'sun' | 'cloud' | 'wind' | 'moon' | 'fog';
  photo: string;
  pinColor: string;
  map: { x: number; y: number }; // 약도 좌표 %
};

export const TOURS: Tour[] = [
  {
    id: 'express',
    time: 'DAY1 09:00',
    name: 'Alps Express',
    category: 'Transportation',
    blurb: '※초특가※\n비행기 아님, 기차임\n1시간 20분이면 알프스 도착!',
    real: 'KTX-이음 강릉선',
    where: '청량리역 → 평창역',
    desc: '비행기 12시간 대신 기차 1시간 20분. 창밖이 점점 스위스(같은 평창)로 바뀝니다.',
    guide: '도연',
    weather: 'Nice',
    weatherIcon: 'cloud',
    photo: 'ktx',
    pinColor: '#29b6f6',
    map: { x: 40, y: 52 },
  },
  {
    id: 'sheep',
    time: 'DAY1 11:00',
    name: 'Swiss Sheep',
    category: 'Nature',
    blurb: '스위스산 양 관람\n(원산지: 대관령)',
    real: '대관령 양떼목장',
    where: '대관령면',
    desc: '스위스 양을 보여드린다고 했지만 대관령 양입니다. 솔직히 구분 안 됨.',
    guide: `${MASCOT_NAME} & 성민`,
    weather: 'Sunny',
    weatherIcon: 'sun',
    photo: 'sheep3',
    pinColor: '#fdd835',
    map: { x: 80, y: 40 },
  },
  {
    id: 'fondue',
    time: 'DAY1 13:00',
    name: 'Not Fondue',
    category: 'Food',
    blurb: '알프스 정식\n퐁듀인 줄 알았던 분들 죄송합니다\n곤드레밥이 더 맛있음',
    real: '곤드레밥',
    where: '평창 일대 식당',
    desc: '패키지 조식·중식 공통 메뉴. 곤드레곤이 직접 고른 맛집으로 모십니다.',
    guide: '곤드레곤',
    weather: 'Sunniest',
    weatherIcon: 'sun',
    photo: 'gondre',
    pinColor: '#7cb342',
    map: { x: 58, y: 62 },
  },
  {
    id: 'windmill',
    time: 'DAY1 15:00',
    name: 'Windmill Hill',
    category: 'Snapshot',
    blurb: '스위스 풍차 언덕\n(풍력발전기임)\n막 찍어도 인생샷★',
    real: '대관령 삼양목장',
    where: '대관령면',
    desc: '네덜란드 풍차 아니냐고요? 풍력발전기입니다. 아무튼 언덕 위에서 돌아갑니다.',
    guide: '아리',
    weather: 'Windy',
    weatherIcon: 'wind',
    photo: 'samyangranch',
    pinColor: '#90a4ae',
    map: { x: 86, y: 22 },
  },
  {
    id: 'monastery',
    time: 'DAY1 18:00',
    name: 'Alps Monastery',
    category: 'Healing',
    blurb: '알프스 수도원 1박\n전자기기 내려놓고\n숲 공기만 마시기',
    real: '오대산 월정사 템플스테이',
    where: '진부면 오대산',
    desc: '현지인도 지칠 때 찾는 코스. 새벽엔 전나무숲길 산책 (한여름에도 서늘함).',
    guide: '은빈',
    weather: 'Cool & Foggy',
    weatherIcon: 'fog',
    photo: 'odaesan',
    pinColor: '#ab47bc',
    map: { x: 62, y: 18 },
  },
  {
    id: 'legacy',
    time: 'DAY2 10:00',
    name: 'Olympic Legacy',
    category: 'Sports',
    blurb: '진짜 스위스엔 없는 것\n동계올림픽 개최지 견학',
    real: '알펜시아 올림픽 시설',
    where: '대관령면',
    desc: '스키점프대 앞 인증샷. 선수 훈련·경기 일정은 방문 전 확인.',
    guide: '화영',
    weather: 'Clear',
    weatherIcon: 'sun',
    photo: 'skijump',
    pinColor: '#ec407a',
    map: { x: 72, y: 48 },
  },
  {
    id: 'buckwheat',
    time: 'DAY2 13:00',
    name: 'Buckwheat Plain',
    category: 'Culture',
    blurb: '알프스 메밀 평원\n「메밀꽃 필 무렵」 그 동네\n9월이 절정',
    real: '봉평 이효석문화마을',
    where: '봉평면',
    desc: '메밀꽃은 9월 효석문화제 즈음 절정. 막국수·전병까지 먹고 장평터미널에서 귀국(?)',
    guide: '채빈',
    weather: 'Blooming',
    weatherIcon: 'cloud',
    photo: 'buckwheat',
    pinColor: '#ff7043',
    map: { x: 16, y: 36 },
  },
];

export const GUIDES_INTRO = {
  // 키키는 멤버가 가이드. 우리는 팀원 + 마스코트가 가이드
  mascots: [
    {
      id: 'dwaegwalyang',
      name: MASCOT_NAME,
      role: '메인 가이드 · 스위스산(이라고 주장)',
      desc: '대관령 출신. 괄괄괄거리는 성격이라 일정 늦으면 버스 안 기다려줌.',
    },
    {
      id: 'gondregon',
      name: '곤드레곤',
      role: '식사 담당 가이드',
      desc: '곤드레 나물 드래곤. 소심하지만 맛집 추천만큼은 확신에 차 있음.',
    },
  ],
};

export const PARTNERS = [
  { name: 'Hwayoung Inc', style: 'serif-star' },
  { name: 'CHAEBIN', style: 'red-box' },
  { name: 'Eunbin', style: 'gold' },
  { name: 'ARI', style: 'leaf' },
  { name: 'SUNGMIN', style: 'swoosh' },
  { name: 'DOYEON', style: 'mono' },
];

export const INFO = {
  howTo: {
    title: 'How to Get to',
    accent: 'PyeongSwiss',
    sub: '"버스가 있는데 검색하면 안 나와요" (현지인 인터뷰) → 그래서 여기 다 적어둠',
    rows: [
      {
        kind: 'KTX',
        title: 'KTX-이음 강릉선',
        route: '청량리역 → 평창역',
        time: '약 1시간 17분',
        fare: '18,000원 (일반실)',
        extra: '서울역 출발 하루 약 12회 · 진부(오대산)역도 정차',
        href: 'https://www.letskorail.com',
        cta: '코레일 예매',
      },
      {
        kind: 'BUS',
        title: '시외버스 (우등)',
        route: '동서울터미널 → 장평터미널',
        time: '약 1시간 41분',
        fare: '16,300원',
        extra: '하루 약 8회 (06:40 첫차 ~ 20:20 막차) · 봉평과 가까움',
        href: 'https://txbus.t-money.co.kr',
        cta: '시외버스 예매',
      },
    ],
    caution: '※ 2026년 시간표 조회 기준. 출발 전 예매 사이트에서 꼭 다시 확인하세요.',
  },
  compare: {
    title: 'Why',
    accent: 'PyeongSwiss?',
    sub: '진짜 스위스 vs 테무산 스위스. 정직하게 비교해 드립니다.',
    rows: [
      { item: '가는 법', swiss: '비행기 10시간 넘게', pc: 'KTX 약 1시간 20분' },
      { item: '교통비', swiss: '항공권 생각만 해도 더워짐', pc: '편도 18,000원부터' },
      { item: '한여름 밤', swiss: '시원함', pc: '대관령 7~8월 평균 최저 16~17℃' },
      { item: '양', swiss: '스위스 양', pc: '대관령 양 (구분 불가)' },
      { item: '동계 스포츠', swiss: '가능', pc: '2018 동계올림픽 개최지' },
      { item: '시차 적응', swiss: '필요', pc: '없음' },
    ],
  },
};

export const REVIEWS = {
  avg: '5.0',
  count: '(응답자 1명)',
  source: '디자인씽킹 6조 평창 거주 경험자 인터뷰 발췌',
  items: [
    { text: '스위스 갔었는데, 진짜 평창이랑 똑같아요', who: '평창 거주 경험 20대', initial: '평' },
    { text: '여름에 30도 넘는 경우가 거의 없어요', who: '평창 거주 경험 20대', initial: '평' },
    { text: '한여름인데 밤엔 추워서 겉옷 입을 정도', who: '평창 거주 경험 20대', initial: '평' },
    { text: '유럽 감성 느끼고 싶은데 돈이 부족하다? 평창 오세요', who: '평창 거주 경험 20대', initial: '평' },
    { text: '유명해지기 전에 지금 저점 매수하세요', who: '평창 거주 경험 20대', initial: '평' },
    { text: '괄괄괄!!!', who: MASCOT_NAME, initial: '양' },
  ],
};

export const POLAROID_QUOTE = { a: 'One', b: 'Night,', c: 'Zero', d: 'Flights' };

export const DUTY_FREE = {
  banner: 'Looking for souvenirs? 해외(같은 국내)에서 직구해온 스위스 굿즈를 만나보세요',
  link: '평스투어 (직구) Duty Free',
  soldMsg: '죄송합니다. 이건 과제라서 실제로 안 팝니다 🙏',
};

export const FOOTER = {
  disclaimer:
    '평창 스위스 투어(평스투어)는 실존하지 않는 여행사입니다. 한림대학교 디자인씽킹 6조 「테무산 스위스」 텀과제 결과물이며 실제 상품을 판매하거나 예약을 받지 않습니다. 교통·관광지 정보는 실제 정보입니다.',
  team: '디자인씽킹 6조 테무산 스위스 · 화영 채빈 은빈 아리 성민 도연',
};
