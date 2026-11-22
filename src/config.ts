// 팀원 결과물이 나오면 여기만 바꾸면 됨

/**
 * 아리 홈쇼핑 패러디 영상 (유튜브 영상 ID). 헤더 바로 아래 홈쇼핑 섹션에 들어감.
 * 유튜브 주소가 https://www.youtube.com/watch?v=PXdb9MtQwkU 이면 "PXdb9MtQwkU"만 입력.
 * 비워두면 양떼목장 포스터 + 재생 버튼 + 하단 자막이 보임.
 */
export const HOMESHOPPING_VIDEO_ID = '';

/** 사용성 평가 구글폼 링크 (사이트 우측 하단 버튼) */
export const EVAL_FORM_URL = '';

/** 도연 여행사 인스타그램 */
export const INSTAGRAM_URL = '';

/** 은빈 전시용 소개 웹사이트 */
export const EXHIBIT_SITE_URL = '';

/** 성민 캐릭터 이미지 — public/characters/ 에 넣고 경로 입력. 비워두면 자리표시 */
export const CHARACTER_IMAGES: Record<string, string> = {
  dwaegwalyang: '', // 예: '/characters/dwaegwalyang.png'
  gondregon: '',
};

/**
 * 성민 굿즈 이미지 — public/goods/ 에 넣고 경로 입력. 키는 content.ts GOODS의 id.
 * 비워두면 자리표시 (카테고리 아이콘). 예: keyring: '/goods/keyring.png'
 */
export const GOODS_IMAGES: Record<string, string> = {
  'set-intro': '',
  'set-master': '',
  dwaegwalyang: '',
  gondregon: '',
  keyring: '',
  air: '',
  sticker: '',
};

/** 마스코트 표기 (돼괄양 / 대관양 확정되면 변경) */
export const MASCOT_NAME = '돼괄양';
