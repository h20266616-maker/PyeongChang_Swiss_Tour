// 팀원 결과물이 나오면 여기만 바꾸면 됨

/**
 * 아리 홈쇼핑 패러디 영상 (유튜브 영상 ID). 헤더 바로 아래 홈쇼핑 섹션에 들어감.
 * 유튜브 주소가 https://www.youtube.com/watch?v=PXdb9MtQwkU 이면 "PXdb9MtQwkU"만 입력.
 * 비워두면 양떼목장 포스터 + 재생 버튼 + 하단 자막이 보임.
 */
export const HOMESHOPPING_VIDEO_ID = '';

/**
 * 사용성 평가 구글폼 링크 (PLAN.md의 사용성 평가용). 넣으면 우측 하단에 "이 여행사 평가하기" 버튼이 생김.
 * 비워두면 버튼 자체가 안 보임.
 */
export const EVAL_FORM_URL = '';

/**
 * 여행사 인스타그램 아이디 (@ 빼고). 예: 'pyeongs_travel'
 * 넣으면 푸터에 "@아이디" + 인스타 링크가 표시됨. 비워두면 안 보임.
 */
export const INSTAGRAM_ID = 'donggyeol_pyeongchang';
export const INSTAGRAM_URL = INSTAGRAM_ID ? `https://www.instagram.com/${INSTAGRAM_ID}/` : '';

/**
 * 피그마 한글 로고 이미지 — public/logo/ 에 넣고 경로 입력 (SVG 추천). 예: '/logo/pyeongs-ko.svg'
 * 비워두면 지금의 글자 로고(PyeongS Travel)가 나옴.
 */
export const LOGO_IMAGE = '';

/** 은빈 전시용 소개 웹사이트 */
export const EXHIBIT_SITE_URL = '';

/** 성민 캐릭터 이미지 — public/characters/ 에 넣고 경로 입력. 비워두면 자리표시 */
export const CHARACTER_IMAGES: Record<string, string> = {
  dwaegwalyang: '', // 대괄양. 예: '/characters/daegwalyang.png'
};

/**
 * 성민 굿즈 이미지 — public/goods/ 에 넣고 경로 입력. 키는 content.ts GOODS의 id.
 * 비워두면 자리표시 (카테고리 아이콘). 예: keyring: '/goods/keyring.png'
 */
export const GOODS_IMAGES: Record<string, string> = {
  'set-intro': '',
  'set-master': '',
  dwaegwalyang: '',
  keyring: '',
  air: '',
  sticker: '',
};

/** 마스코트 표기 (확정: 대괄양) — 사이트 전체가 이 값을 따라감 */
export const MASCOT_NAME = '대괄양';

/**
 * 카카오맵 JavaScript 키 (Map of PyeongSwiss 실제 지도).
 * 코드에 직접 쓰지 말고 Vercel 환경변수 VITE_KAKAO_MAP_KEY 로 넣기 (로컬은 .env.local).
 * 카카오 디벨로퍼스 → 내 애플리케이션 → 플랫폼 → Web 사이트 도메인에
 * https://pyeong-chang-swiss-tour.vercel.app 와 http://localhost:3000 등록 필요.
 * 비어 있으면 예전 일러스트 약도 + "카카오맵에서 보기" 링크로 대체됨.
 */
export const KAKAO_MAP_KEY: string = import.meta.env.VITE_KAKAO_MAP_KEY ?? '';
