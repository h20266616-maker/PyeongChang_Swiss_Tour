import { MASCOT_NAME } from './config';

// ─────────────────────────────────────────────
// 사이트 문구 전부 여기. 팀 회의 결과 나오면 여기만 고치면 됨.
// 교통·기온 정보는 2026년 조회 기준 → 발표 전 재확인!
// 레퍼런스: kiiikiii.kr (2000년대 여행사 홈페이지를 정색하고 따라 하는 톤)
// ─────────────────────────────────────────────

export const SLOGAN =
  '스위스를 동결건조해서 평창의 동결건조 상황을 뒤엎어버리는 우리는 쿠팡산스위스다 이것들아ㅏㅏㅏ';

export const NAV = [
  { href: '#ticket', label: '예매하기' },
  { href: '#courses', label: '투어 코스' },
  { href: '#guides', label: '투어 가이드' },
  { href: '#map', label: '지도' },
  { href: '#info', label: '교통 정보' },
  { href: '#reviews', label: '후기' },
];

export const BOOKING = {
  origins: ['내 침대에서', '서울', '경기 · 인천', '그 외 (먼 곳)'],
  types: ['VIP', 'VVIP', 'VVVIP', 'VVVVIP'],
  agree: '여기가 스위스가 아닐 수도 있음을 확인했습니다.',
  button: '티켓 구매 »',
  breakfast: '조식(곤드레밥) 패키지 포함',
  signText: '평스위스',
  // 부제: B급 영화 제목처럼 길게 → "...더보기". 팀이 독스에 이어 쓰는 대로 교체
  subtitleShort:
    '스위스를 동결건조해서 옮겨놓은 듯한 느낌을 받을 수 있는 평창. 이 평창에 저희 평스투어가 엄선한 관광상품들을 즐기면서 저가로 유럽감성을 느낄 수 있는 이 기회가 단 돈 팔',
  subtitleRest:
    '만구천원…이 아니라 구만구천원 (입문 코스, 스위스 대비 98% 할인). 비행기 12시간 대신 서울에서 버스 한 번, 한여름 밤에도 겉옷 필수, 양은 스위스산이라고 우기는 꿈의 여름 피서 패키지 (연락바람)',
};

/** 패키지 이동수단 = 왕복 전용 버스 (피그마 코스 원문 기준). KTX·시외버스는 Travel Info의 "따로 가는 법" */
export const PASS = {
  route: '서울 → 평창 · 평스투어 전용 버스',
  duration: '시차 0시간',
  fare: '패키지 포함 (99,000원부터)',
  gate: '서울 집결지 (추후 안내)',
  seat: '아무데나 (농담, 지정석임)',
  realDest: 'PYEONGCHANG',
  realDestKo: '강원특별자치도 평창군',
  note: '본 탑승권으로는 탑승 불가 (과제임). 직접 가실 분은 Travel Info의 KTX·시외버스 정보를 확인하세요.',
};

/** 출발일은 여름 시즌만 (코스 태그: 여름 출발). 지금이 10월 이후면 내년 여름 */
export const SUMMER = (() => {
  const now = new Date();
  const y = now.getMonth() >= 9 ? now.getFullYear() + 1 : now.getFullYear();
  return { min: `${y}-06-01`, max: `${y}-09-15`, def: `${y}-07-15` };
})();

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
  map: { x: number; y: number }; // 일러스트 약도 좌표 %
  courses: CourseId[]; // 포함된 코스
  query: string; // 카카오맵 검색어 (길찾기)
  tips: string[]; // 투어 페이지 "알아두세요"
};

// 키키의 "Start Tour" 개별 페이지처럼 /spot/<id> 페이지가 하나씩 생김
// 가이드는 팀원. 사실 정보(위치·시간)는 COURSES 원문과 같게 유지
export const TOURS: Tour[] = [
  {
    id: 'sheep',
    time: 'DAY1 오전',
    name: 'Swiss Sheep',
    category: 'Nature',
    blurb: '스위스산 양 관람\n(원산지: 대관령)',
    real: '대관령 양떼목장',
    where: '대관령면',
    desc: '스위스 양을 보여드린다고 했지만 대관령 양입니다. 솔직히 구분 안 됨. 초원 산책 후 양에게 건초를 직접 줄 수 있어요.',
    guide: `${MASCOT_NAME} & 성민`,
    weather: 'Sunny',
    weatherIcon: 'sun',
    photo: 'sheep3',
    pinColor: '#fdd835',
    map: { x: 80, y: 40 },
    courses: ['intro', 'master'],
    query: '대관령양떼목장',
    tips: ['건초주기 체험 포함', '초원 길이 경사져서 운동화 추천'],
  },
  {
    id: 'fondue',
    time: 'DAY1 점심',
    name: 'Not Fondue',
    category: 'Food',
    blurb: '알프스 정식\n퐁듀인 줄 알았던 분들 죄송합니다\n곤드레밥이 더 맛있음',
    real: '곤드레밥',
    where: '평창 일대 식당',
    desc: `스위스 퐁듀 품절로 곤드레밥으로 대체되었습니다. ${MASCOT_NAME}가 직접 고른 맛집으로 모십니다.`,
    guide: MASCOT_NAME,
    weather: 'Sunniest',
    weatherIcon: 'sun',
    photo: 'gondre',
    pinColor: '#7cb342',
    map: { x: 58, y: 62 },
    courses: ['intro', 'master'],
    query: '평창 곤드레밥',
    tips: ['패키지 식사 포함', '양념장 듬뿍이 정석'],
  },
  {
    id: 'skijump',
    time: 'DAY1 오후',
    name: 'Olympic Legacy',
    category: 'Sports',
    blurb: '진짜 스위스엔 없는 것\n동계올림픽 개최지 견학',
    real: '평창올림픽기념관 · 알펜시아 스키점프대',
    where: '대관령면',
    desc: 'VR로 즐기는 여름 동계스포츠. 여름엔 축구장이 되는 스키점프대 앞에서 인증샷을 남겨요.',
    guide: '화영',
    weather: 'Clear',
    weatherIcon: 'sun',
    photo: 'skijump',
    pinColor: '#ec407a',
    map: { x: 72, y: 48 },
    courses: ['intro', 'master'],
    query: '알펜시아 스키점프센터',
    tips: ['선수 훈련·경기 일정은 방문 전 확인', '발왕산 케이블카와 같은 날 진행'],
  },
  {
    id: 'stars',
    time: 'DAY1 저녁',
    name: 'Swiss Night Sky',
    category: 'Healing',
    blurb: '알프스 별밤 무료 제공\n(흐리면 환불 불가)',
    real: '평창 스위스마을 펜션 · 별 보기',
    where: '대관령면',
    desc: '바비큐로 배를 채우고 도시에선 못 보는 대관령 밤하늘을 봅니다. 한여름에도 밤엔 쌀쌀하니 겉옷 필수!',
    guide: '은빈',
    weather: 'Starry',
    weatherIcon: 'moon',
    photo: 'sheep2',
    pinColor: '#ab47bc',
    map: { x: 62, y: 18 },
    courses: ['intro', 'master'],
    query: '평창스위스마을',
    tips: ['흐린 날은 별이 안 보일 수 있음 (환불 불가)', '대관령 7~8월 평균 최저 16~17℃'],
  },
  {
    id: 'samyang',
    time: 'DAY2 오전',
    name: 'Windmill Hill',
    category: 'Snapshot',
    blurb: '스위스 풍차 언덕\n(풍력발전기임)\n막 찍어도 인생샷★',
    real: '삼양라운드힐',
    where: '대관령면',
    desc: '네덜란드 풍차 아니냐고요? 풍력발전기입니다. 능선을 따라 돌아가는 발전기와 양몰이 공연을 봐요.',
    guide: '아리',
    weather: 'Windy',
    weatherIcon: 'wind',
    photo: 'samyangranch',
    pinColor: '#90a4ae',
    map: { x: 86, y: 22 },
    courses: ['intro', 'master'],
    query: '삼양라운드힐',
    tips: ['바람이 세서 모자는 꽉 잡기', '정복 코스는 선자령 산책 후 방문'],
  },
  {
    id: 'sliding',
    time: 'DAY2 오후',
    name: 'Not Bobsleigh',
    category: 'Activity',
    blurb: '봅슬레이 국가대표 체험\n(튜브썰매임)',
    real: '알펜시아 슬라이딩파크',
    where: '대관령면',
    desc: '올림픽 썰매 경기장 옆에서 봅슬레이 대신 튜브썰매를 탑니다. 기분만은 국가대표.',
    guide: '도연',
    weather: 'Breezy',
    weatherIcon: 'cloud',
    photo: 'alpensia',
    pinColor: '#29b6f6',
    map: { x: 40, y: 52 },
    courses: ['master'],
    query: '알펜시아 슬라이딩센터',
    tips: ['정복 코스 전용', '튜브썰매 이용료 패키지 포함'],
  },
  {
    id: 'bongpyeong',
    time: 'DAY3 오후',
    name: 'Buckwheat Plain',
    category: 'Culture',
    blurb: '알프스 메밀 평원\n「메밀꽃 필 무렵」 그 동네\n9월이 절정',
    real: '봉평 이효석문화마을',
    where: '봉평면',
    desc: '『메밀꽃 필 무렵』 배경지. 메밀은 스위스 곡물이냐고요? 아닙니다. 막국수·전병까지 먹고 서울로 귀국(?)합니다.',
    guide: '채빈',
    weather: 'Blooming',
    weatherIcon: 'cloud',
    photo: 'buckwheat',
    pinColor: '#ff7043',
    map: { x: 16, y: 36 },
    courses: ['master'],
    query: '이효석문화마을',
    tips: ['정복 코스 전용', '8월 말~9월 초 출발이면 효석문화제 추가'],
  },
];

export const GUIDES_INTRO = {
  // 키키는 멤버가 가이드. 우리는 팀원 + 마스코트가 가이드
  mascots: [
    {
      id: 'dwaegwalyang',
      name: MASCOT_NAME,
      role: '메인 가이드 · 스위스산(이라고 주장)',
      desc: '대관령 출신. 성격이 급해서 일정 늦으면 버스 안 기다려줌.',
    },
  ],
};

// 가상 협찬사 (전부 패러디 · 실존 기업/인물과 무관). 키키처럼 흐르는 로고 띠
export const PARTNERS = [
  { name: '양윙칩', style: 'red-box' },
  { name: 'MC 메에에', style: 'mono' },
  { name: '양털은행', style: 'gold' },
  { name: '대관양 시계', style: 'serif-star' },
  { name: '에어 평창', style: 'swoosh' },
  { name: '융프라양 산악열차', style: 'leaf' },
  { name: '맥가이양 숟가락', style: 'red-box' },
  { name: '곤드레 퐁듀', style: 'gold' },
];

export const PARTNERS_NOTE = '※ 상기 협찬사는 전부 가상이며 실존 기업·인물과 무관합니다. 양은 실존합니다.';

export const INFO = {
  howTo: {
    title: '평스위스',
    accent: '가는 법',
    sub: '패키지는 서울에서 전용 버스로 모십니다. 따로 오실 분은 아래로 → "버스가 있는데 검색하면 안 나와요" (현지인 인터뷰) 그래서 여기 다 적어둠',
    rows: [
      {
        kind: 'KTX',
        title: 'KTX-이음 강릉선',
        route: '청량리역 → 평창역',
        time: '약 1시간 10~20분',
        fare: '18,000원',
        extra: '청량리 출발 하루 약 14회 (05:27 첫차 ~ 21:52 막차, 요일별 상이) · 진부(오대산)역도 정차',
        href: 'https://www.letskorail.com',
        cta: '코레일 예매',
      },
      {
        kind: 'BUS',
        title: '시외버스 (우등)',
        route: '동서울터미널 → 장평터미널',
        time: '약 1시간 50분',
        fare: '14,800원 (우등)',
        extra: '하루 8회 (06:40 첫차 ~ 20:20 막차, 13:50편만 일반 11,400원) · 봉평과 가까움',
        href: 'https://txbus.t-money.co.kr',
        cta: '시외버스 예매',
      },
    ],
    caution: '※ 2026년 11월 23일 시간표 조회 기준. 출발 전 예매 사이트에서 꼭 다시 확인하세요.',
  },
  compare: {
    title: '왜',
    accent: '평스위스?',
    sub: '진짜 스위스 vs 쿠팡산 스위스. 정직하게 비교해 드립니다.',
    rows: [
      { item: '가는 법', swiss: '비행기 10시간 넘게', pc: '서울에서 버스 한 번 (KTX면 약 1시간 15분)' },
      { item: '여행 경비', swiss: '항공권 생각만 해도 더워짐', pc: '1박2일 99,000원 (버스·숙박·식사 포함)' },
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
    { text: '평스 투어에 환불이 어딨어? 여름 시원하잖아. 좋다며?', who: MASCOT_NAME, initial: '양', avatar: '/characters/pyeongchiyang-angry.png' },
  ],
};

// ─────────────────────────────────────────────
// 투어 코스 (피그마 node 19:197 / 20:166 / 20:422) — FIGMA_HANDOFF.md 원문 그대로
// ─────────────────────────────────────────────
export type CourseId = 'intro' | 'master';
export type Slot = '오전' | '점심' | '오후' | '저녁';
export type ScheduleItem = { slot: Slot; title: string; desc?: string; photo?: string };
export type CourseDay = { day: string; note?: string; items: ScheduleItem[] };

export type Course = {
  id: CourseId;
  path: string;
  short: string; // 셀렉트·티켓 표기
  promo: string;
  title: string;
  subtitle: string;
  photo: string;
  priceOrig: string;
  price: string;
  discount: string;
  tags: string[];
  origin: string;
  period: string;
  places: string;
  stay: string;
  meals: string;
  leader: string;
  pax: string;
  route: string[];
  included: string[];
  excluded: string[];
  notices: string[];
  days: CourseDay[];
};

const INTRO_DAY1: ScheduleItem[] = [
  { slot: '오전', title: '서울 출발 → 대관령 양떼목장', desc: '한국의 알프스, 아니 평창의 스위스 초원 산책 / 양떼 건초주기 체험', photo: 'sheep3' },
  { slot: '점심', title: '곤드레밥', desc: '스위스 퐁듀 품절로 대체', photo: 'gondre' },
  { slot: '오후', title: '발왕산 케이블카 + 스카이워크', desc: '국내 최장 7.4km 케이블카로 해발 1,458m 정상까지 / 융프라우 산악열차 대신 탑승' },
  { slot: '오후', title: '평창올림픽기념관 → 알펜시아 스키점프대', desc: 'VR로 즐기는 여름 동계스포츠 / 여름엔 축구장이 되는 스키점프대 포토타임', photo: 'skijump' },
  { slot: '저녁', title: '스위스마을 펜션 체크인 → 바비큐 → 별 보기', desc: '도시에선 못 보는 대관령 밤하늘 무료 제공', photo: 'sheep2' },
];

const COMMON_EXCLUDED = ['여권(필요 없음)', '스위스 프랑', '개인경비', '여행자보험'];

export const COURSES: Course[] = [
  {
    id: 'intro',
    path: '/tour/intro',
    short: '입문 코스 (1박2일)',
    promo: '[쿠팡산특가]',
    title: '[평스투어 입문 코스] 양떼목장+발왕산+별보기 (1박2일)',
    subtitle: '양떼목장+발왕산+별보기',
    photo: 'sheep2',
    priceOrig: '199,000원',
    price: '99,000원',
    discount: '스위스 대비 98% 할인',
    tags: ['여름 출발', '1박2일', '서울출발', '버스여행'],
    origin: '서울 (집결지 추후 안내)',
    period: '1박 2일',
    places: '대관령 양떼목장, 발왕산 케이블카, 평창올림픽기념관, 알펜시아 스키점프대, 삼양라운드힐, 치즈체험장, 고랭지배추 농원',
    stay: '평창 스위스마을 펜션 (진짜 스위스 아님)',
    meals: '3식 포함 (곤드레밥 / 펜션 바비큐 / 황태구이 정식)',
    leader: `있음 (마스코트 ${MASCOT_NAME})`,
    pax: '최소 출발인원 2명 / 총인원 40명',
    route: ['서울', '양떼목장', '발왕산', '올림픽기념관', '스키점프대', '펜션(1박, 별 보기)', '삼양라운드힐', '치즈체험', '배추농원', '서울'],
    included: ['왕복 버스', '숙박 1박', '식사 3회', '발왕산 케이블카', '치즈체험', '배추농원 체험', '별 (무료)'],
    excluded: COMMON_EXCLUDED,
    notices: [
      '본 상품은 스위스가 아닌 평창에서 진행됩니다.',
      '매주 월요일은 발왕산 케이블카 휴장으로 출발이 어렵습니다.',
      '한여름에도 대관령 밤은 쌀쌀합니다. 겉옷 필수!',
      '흐린 날에는 별이 안 보일 수 있습니다. (환불 불가)',
      '현지 날씨 및 사정에 따라 일정이 변경될 수 있습니다.',
    ],
    days: [
      { day: '1일차', items: INTRO_DAY1 },
      {
        day: '2일차',
        items: [
          { slot: '오전', title: '삼양라운드힐', desc: '풍력발전기 능선 + 양몰이 공연', photo: 'samyangranch' },
          { slot: '오전', title: '치즈 만들기 체험', desc: '스위스 치즈 공방 체험 (대관령 우유 사용)' },
          { slot: '점심', title: '황태구이 정식' },
          { slot: '오후', title: '고랭지배추 농원', desc: '알프스 양배추 농장 체험, 배추모양 만두 빚기' },
          { slot: '오후', title: '서울 도착' },
        ],
      },
    ],
  },
  {
    id: 'master',
    path: '/tour/master',
    short: '정복 코스 (2박3일)',
    promo: '[쿠팡산특가]',
    title: '[평스투어 정복 코스] 발왕산+육백마지기+봉평 (2박3일)',
    subtitle: '발왕산+육백마지기+봉평',
    photo: 'buckwheat',
    priceOrig: '349,000원',
    price: '149,000원',
    discount: '스위스 대비 97% 할인',
    tags: ['여름 출발', '2박3일', '서울출발', '버스여행'],
    origin: '서울 (집결지 추후 안내)',
    period: '2박 3일',
    places: '입문 코스 전 일정 + 선자령, 슬라이딩파크, 육백마지기, 봉평 이효석문화마을',
    stay: '평창 스위스마을 펜션 2박 (연박이라 짐 안 옮겨도 됨)',
    meals: '5식 포함 (곤드레밥 / 바비큐 / 삼양라면+한우버거 / 대관령 한우 / 봉평 메밀)',
    leader: `있음 (마스코트 ${MASCOT_NAME})`,
    pax: '최소 출발인원 2명 / 총인원 40명',
    route: ['서울', '양떼목장', '발왕산', '올림픽기념관', '스키점프대', '펜션(1박)', '선자령', '삼양라운드힐', '치즈체험', '배추농원', '슬라이딩파크', '펜션(2박)', '육백마지기', '봉평', '서울'],
    included: ['왕복 버스', '숙박 2박', '식사 5회', '발왕산 케이블카', '치즈체험', '배추농원 체험', '튜브썰매', '별 (무료)'],
    excluded: COMMON_EXCLUDED,
    notices: [
      '본 상품은 스위스가 아닌 평창에서 진행됩니다.',
      '매주 월요일은 발왕산 케이블카 휴장으로 출발이 어렵습니다.',
      '선자령은 전체 코스가 4~5시간이라 입구 숲길만 산책합니다.',
      '육백마지기 진입로는 공사로 간헐적 통제될 수 있습니다.',
      '한여름에도 대관령 밤은 쌀쌀합니다. 겉옷 필수!',
    ],
    days: [
      { day: '1일차', note: '입문 코스 1일차와 동일', items: INTRO_DAY1 },
      {
        day: '2일차',
        items: [
          { slot: '오전', title: '선자령 산책', desc: '알프스 트레킹 코스 맛보기, 풍력발전기 능선길' },
          { slot: '오전', title: '삼양라운드힐', desc: '풍력발전기 능선 + 양몰이 공연', photo: 'samyangranch' },
          { slot: '점심', title: '삼양라면 + 한우버거', desc: '알프스 정상에서 먹는 라면' },
          { slot: '오후', title: '치즈 만들기 체험 → 고랭지배추 농원', desc: '스위스 치즈 공방 + 알프스 양배추 농장 체험' },
          { slot: '오후', title: '알펜시아 슬라이딩파크', desc: '봅슬레이 대신 튜브썰매 국가대표 체험', photo: 'alpensia' },
          { slot: '저녁', title: '대관령 한우 → 펜션 별 보기' },
        ],
      },
      {
        day: '3일차',
        items: [
          { slot: '오전', title: '육백마지기', desc: '해발 1,256m, 국내 최초 고랭지 채소단지 / 고랭지 배추밭 + 풍력발전기 초원' },
          { slot: '점심', title: '봉평 메밀 (막국수·전병)' },
          { slot: '오후', title: '봉평 이효석문화마을', desc: '『메밀꽃 필 무렵』 배경지 / 메밀 = 스위스 곡물? (아님)', photo: 'buckwheat' },
          { slot: '오후', title: '서울 도착' },
        ],
      },
    ],
  },
];

export const courseById = (id: CourseId) => COURSES.find((c) => c.id === id)!;

/** 시즌 한정 추가 일정 (두 코스 공통) */
export const SEASON_EXTRAS = [
  { when: '6월~7월 초 출발', what: '육백마지기 샤스타데이지 + 은하수 관측', photo: 'samyangranch' },
  { when: '7월 말 출발', what: '평창대관령음악제 + 더위사냥축제(땀띠공원)', photo: 'alpensia' },
  { when: '8월 말~9월 초 출발', what: '휘닉스파크 몽블랑 메밀꽃밭 + 효석문화제', photo: 'buckwheat' },
];

/** 상단 홈쇼핑 영상 섹션 (피그마 node 18:197) */
export const HOMESHOPPING = {
  channel: '평스홈쇼핑 CH.1458',
  live: 'LIVE',
  countdownLabel: '방송 종료까지',
  urgent: '마감임박',
  priceOrig: '199,000원',
  price: '99,000원',
  caption: '[평스투어 입문 코스] 양떼목장+발왕산+별보기 1박2일',
  poster: 'sheep2',
  noVideo: '방송 준비 중입니다. 곧 찾아뵙겠습니다 (영상 제작 중)',
};

// ─────────────────────────────────────────────
// (직구) Duty Free 굿즈샵 (피그마 node 6:197 / 25:359 / 25:520 / 2:39)
// ⚠ 상품명·가격은 임시값. 피그마 확정본 나오면 여기만 고치면 됨
// 이미지: public/goods/<이름>.jpg 넣고 각 상품 images 에 이름 추가 (첫 장이 대표)
// ─────────────────────────────────────────────
export const GOODS_CATEGORIES = ['전체', '마스코트', '의류·잡화', '먹거리', '기념품'] as const;
export type GoodsCategory = Exclude<(typeof GOODS_CATEGORIES)[number], '전체'> | '세트';
export type GoodsBadge = 'BEST' | 'NEW' | 'MD추천' | '한정';
/** image: 그 옵션을 고르면 바뀌는 사진 (public/goods/ 파일명, 확장자 제외) */
export type GoodsOption = { name: string; values: { label: string; delta?: number; image?: string }[] };

export type Goods = {
  id: string;
  name: string;
  category: GoodsCategory;
  price: number; // 원
  badge?: GoodsBadge;
  popularity: number; // 인기순 정렬용
  soldOut?: boolean;
  options?: GoodsOption;
  summary: string; // 카드 한 줄
  description: string[]; // 상세 설명
  course?: CourseId; // 코스 고객 전용 세트
  images: string[]; // public/goods/<이름>.jpg (첫 장이 대표). 성민 시안
};

const SIZES: GoodsOption = { name: '사이즈', values: [{ label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL', delta: 2000 }] };

// 성민 굿즈 시안 기준 (2026-11-23). 가격은 임시값 → 확정되면 price만 수정
export const GOODS: Goods[] = [
  {
    id: 'set-intro',
    name: '[입문 코스 고객 전용] 평스 웰컴 세트',
    category: '세트',
    price: 17000,
    badge: '한정',
    popularity: 90,
    course: 'intro',
    summary: `${MASCOT_NAME} 인형 키링 + 평스 스티커팩`,
    description: ['입문 코스 탑승권 소지자만 살 수 있다고 우기는 세트입니다. (확인은 안 합니다)', `구성: ${MASCOT_NAME} 인형 키링(기본) 1 + 평스 스티커팩 1`, '따로 사는 것보다 2,000원 저렴합니다.'],
    images: ['plush-basic', 'sticker-pack'],
  },
  {
    id: 'set-master',
    name: '[정복 코스 고객 전용] 평스 정복자 세트',
    category: '세트',
    price: 64000,
    badge: '한정',
    popularity: 85,
    course: 'master',
    summary: '인형 키링 + 무드등 키링 + 창좋다 티셔츠 + 하스카프 시리얼',
    description: [
      '2박 3일을 버틴 정복자에게 드리는 풀세트입니다.',
      `구성: ${MASCOT_NAME} 인형 키링 1 + 동결건조 ${MASCOT_NAME} 무드등 키링 1 + "평창 창좋다~" 티셔츠 1 + 하스카프 동결건조칩 시리얼 1`,
      '따로 사는 것보다 7,000원 저렴합니다.',
    ],
    images: ['moodlight-keyring', 'plush-basic', 'tshirt-changjota', 'haskap-cereal'],
  },
  {
    id: 'plush',
    name: `${MASCOT_NAME} 인형 키링`,
    category: '마스코트',
    price: 15000,
    badge: 'BEST',
    popularity: 100,
    options: {
      name: '표정',
      values: [
        { label: '기본', image: 'plush-basic' },
        { label: '화남', image: 'plush-angry' },
      ],
    },
    summary: `평스투어 메인 가이드, 가방에 달고 다니는 ${MASCOT_NAME}`,
    description: [
      `평스투어 메인 가이드 ${MASCOT_NAME}를 그대로 옮긴 복슬복슬 인형 키링.`,
      '표정 2종: 기본 / 화남(일정 늦으면 나오는 표정)',
      '원산지: 대관령 (스위스 아님)',
    ],
    images: ['plush-basic', 'plush-angry'],
  },
  {
    id: 'moodlight',
    name: `동결건조 ${MASCOT_NAME} 무드등 키링`,
    category: '마스코트',
    price: 18000,
    badge: 'NEW',
    popularity: 88,
    summary: `리모컨을 누르면 유리병 속 ${MASCOT_NAME}이 파랗게 빛남`,
    description: [
      `유리병 안에 동결건조(?)된 ${MASCOT_NAME}가 들어 있는 키링.`,
      '함께 달린 리모컨의 빨간 버튼을 누르면 병이 파랗게 빛납니다.',
      '스위스를 동결건조해 옮겨온 평스투어의 컨셉을 그대로 담았습니다.',
    ],
    images: ['moodlight-keyring'],
  },
  {
    id: 'tshirt-changjota',
    name: '"평창 창좋다~" 티셔츠',
    category: '의류·잡화',
    price: 29000,
    badge: 'BEST',
    popularity: 80,
    options: SIZES,
    summary: '평창 → 창좋다. 세로로 읽어도 가로로 읽어도 평창',
    description: ['흰 티셔츠에 "평창 / 창좋다~" 문구.', '한여름에도 대관령 밤은 쌀쌀하니 위에 겉옷 필수!'],
    images: ['tshirt-changjota'],
  },
  {
    id: 'tshirt-more',
    name: '"…(더보기)" 티셔츠',
    category: '의류·잡화',
    price: 29000,
    badge: 'MD추천',
    popularity: 75,
    options: SIZES,
    summary: '사이트 부제를 통째로 입는 티셔츠. 결말은 더보기',
    description: ['평스투어 사이트의 그 긴 부제가 앞판에 그대로.', '"단 돈…(더보기)"에서 끝나서 사람들이 뒷말을 궁금해합니다.'],
    images: ['tshirt-more'],
  },
  {
    id: 'haskap-cereal',
    name: '평창 특산물 하스카프 동결건조칩 시리얼',
    category: '먹거리',
    price: 9000,
    badge: 'MD추천',
    popularity: 70,
    summary: '평창산 하스카프 동결건조칩 함유 · 300g',
    description: ['평창의 자연이 키운 하스카프를 동결건조칩으로 넣은 시리얼.', '구성: 300g', '스위스 뮤즐리 대신 평창 시리얼.'],
    images: ['haskap-cereal'],
  },
  {
    id: 'sticker',
    name: '평스 스티커팩',
    category: '기념품',
    price: 4000,
    badge: 'BEST',
    popularity: 92,
    summary: `"평창… 창좋다", 동결건조, ${MASCOT_NAME} 등 스티커 한 장`,
    description: [
      `${MASCOT_NAME}, 평스투어 로고, "평창… 창좋다", "동결건조", "시원해!" 등이 들어간 스티커 시트.`,
      '캐리어에 붙이면 스위스 다녀온 것처럼 보입니다.',
    ],
    images: ['sticker-pack', 'sticker-sheet'],
  },
  {
    id: 'wakppu',
    name: '평창 동결 건조 왁뿌 (12개입)',
    category: '기념품',
    price: 12000,
    badge: '한정',
    popularity: 65,
    summary: '하늘색·민트·흰색 캡슐 12개입 박스',
    description: ['평창 동결 건조 왁뿌 12개입 박스.', '하늘색·민트·흰색 캡슐이 4개씩 들어 있습니다.'],
    images: ['wakppu'],
  },
];

export const goodsById = (id: string) => GOODS.find((g) => g.id === id);

export const SHOP = {
  title: '평스',
  accent: '면세점',
  sub: '해외(같은 국내)에서 직구해온 스위스(보다 더 좋은) 굿즈.',
  setTitle: '코스 고객 전용 세트',
  shipping: [
    '배송: 실제로 배송되지 않습니다 (과제). 마음으로 보내드립니다.',
    '배송비: 0원 (스위스에서 오지 않으므로)',
    '교환·반품: 상품을 받지 않으셨으므로 교환·반품할 것도 없습니다.',
    '결제는 절대 일어나지 않습니다. 실제로 판매하지 않는 상품입니다.',
  ],
  receiptNote: '실제 결제는 일어나지 않았습니다. 돈도 빠져나가지 않았습니다. (디자인씽킹 과제)',
};

export const POLAROID_QUOTE = { a: '1박', b: '하는데', c: '비행기', d: '0번' };

export const DUTY_FREE = {
  banner: '기념품 찾으세요? 해외(같은 국내)에서 직구해온 스위스(보다 더 좋은) 굿즈를 만나보세요',
  link: '평스투어 (직구) 면세점',
  cta: '쇼핑하러 가기 »',
};

export const FOOTER = {
  disclaimer:
    '평창 스위스 투어(평스투어)는 실존하지 않는 여행사입니다. 한림대학교 디자인씽킹 6조 「쿠팡산 스위스」 텀과제 결과물이며 실제 상품을 판매하거나 예약을 받지 않습니다. 교통·관광지 정보는 실제 정보입니다.',
  team: '디자인씽킹 6조 쿠팡산 스위스 · 화영 채빈 은빈 아리 성민 도연',
};

// ─────────────────────────────────────────────
// Map of PyeongSwiss — 실제 지도 (카카오맵)
// 좌표는 지어내지 않고, query를 카카오 장소검색에 넣어서 실제 위치를 받아옴.
// query가 빈 칸('')인 곳은 실제 업체가 정해지지 않은 곳 → 지도에 핀 없이 목록에만 "장소 확정 전"으로 표시.
// 업체가 정해지면 query에 카카오맵 검색어(예: '대관령치즈스쿨')만 넣으면 핀이 생김.
// ─────────────────────────────────────────────
/** address: 카카오 장소명 검색이 실패할 때 쓰는 실제 주소 (출처 확인된 주소만) */
export type MapSpot = { id: string; name: string; query: string; when: string; desc?: string; address?: string };
export type MapRoute = { id: CourseId | 'season'; label: string; color: string; spots: MapSpot[] };

const SPOT = {
  sheep: { id: 'sheep', name: '대관령 양떼목장', query: '대관령양떼목장', when: '1일차 오전', desc: '평창의 스위스 초원 산책 + 양떼 건초주기' },
  balwang: { id: 'balwang', name: '발왕산 케이블카 + 스카이워크', query: '발왕산관광케이블카', when: '1일차 오후', desc: '국내 최장 7.4km 케이블카, 해발 1,458m' },
  olympic: { id: 'olympic', name: '평창올림픽기념관', query: '평창올림픽기념관', when: '1일차 오후', desc: 'VR로 즐기는 여름 동계스포츠' },
  skijump: { id: 'skijump', name: '알펜시아 스키점프대', query: '알펜시아 스키점프센터', when: '1일차 오후', desc: '여름엔 축구장이 되는 스키점프대' },
  // 숙소·치즈·배추: 팀 확정 (2026-11-23). 평창 스위스마을 / 바람마을 치즈체험장 / 대관령 수레마을
  pension: { id: 'pension', name: '평창 스위스마을 (숙소)', query: '평창스위스마을', when: '1일차 저녁', desc: '양떼목장 도보 3분 독채 · 바비큐 + 별 보기' },
  samyang: { id: 'samyang', name: '삼양라운드힐', query: '삼양라운드힐', when: '2일차 오전', desc: '풍력발전기 능선 + 양몰이 공연' },
  cheese: { id: 'cheese', name: '바람마을 치즈체험장', query: '바람마을 치즈체험장', when: '2일차', desc: '대관령 목장 우유로 만드는 스위스 치즈(?)' },
  cabbage: { id: 'cabbage', name: '대관령 수레마을 (고랭지배추)', query: '고랭지만두체험휴양마을', address: '강원특별자치도 평창군 대관령면 갈골길 33-5', when: '2일차 오후', desc: '고랭지배추 체험 + 배추모양 만두 빚기' },
  seonja: { id: 'seonja', name: '선자령', query: '선자령', when: '2일차 오전', desc: '입구 숲길만 산책 (전체 코스 4~5시간)' },
  sliding: { id: 'sliding', name: '알펜시아 슬라이딩파크', query: '알펜시아 슬라이딩센터', when: '2일차 오후', desc: '봅슬레이 대신 튜브썰매' },
  yukbaek: { id: 'yukbaek', name: '육백마지기', query: '육백마지기', when: '3일차 오전', desc: '해발 1,256m 고랭지 채소단지 + 풍력발전기 초원' },
  bongpyeong: { id: 'bongpyeong', name: '봉평 이효석문화마을', query: '이효석문화마을', when: '3일차 오후', desc: '『메밀꽃 필 무렵』 배경지' },
} satisfies Record<string, MapSpot>;

export const MAP_ROUTES: MapRoute[] = [
  {
    id: 'intro',
    label: '입문 코스 (1박2일)',
    color: '#2a6db5',
    spots: [SPOT.sheep, SPOT.balwang, SPOT.olympic, SPOT.skijump, SPOT.pension, SPOT.samyang, SPOT.cheese, SPOT.cabbage],
  },
  {
    id: 'master',
    label: '정복 코스 (2박3일)',
    color: '#f58300',
    spots: [
      SPOT.sheep, SPOT.balwang, SPOT.olympic, SPOT.skijump, SPOT.pension,
      SPOT.seonja, SPOT.samyang, { ...SPOT.cheese, when: '2일차 오후' }, SPOT.cabbage, SPOT.sliding,
      { ...SPOT.yukbaek }, SPOT.bongpyeong,
    ],
  },
  {
    id: 'season',
    label: '시즌 한정',
    color: '#5fbf37',
    spots: [
      { id: 'daisy', name: '육백마지기 샤스타데이지', query: '육백마지기', when: '6월~7월 초 출발', desc: '샤스타데이지 + 은하수 관측' },
      { id: 'music', name: '평창대관령음악제', query: '알펜시아 콘서트홀', when: '7월 말 출발', desc: '알펜시아 일대에서 열림' },
      { id: 'ttamtti', name: '더위사냥축제 (땀띠공원)', query: '평창 땀띠공원', when: '7월 말 출발', desc: '평창읍 땀띠공원 일대' },
      { id: 'montblanc', name: '휘닉스파크 몽블랑 메밀꽃밭', query: '휘닉스파크', when: '8월 말~9월 초 출발', desc: '메밀꽃밭' },
      { id: 'hyoseok', name: '효석문화제', query: '이효석문화마을', when: '8월 말~9월 초 출발', desc: '봉평 일대' },
    ],
  },
];
