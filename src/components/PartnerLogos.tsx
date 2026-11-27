/**
 * 공식(?) 협찬사 로고 — 전부 가상 패러디.
 * 실제 브랜드 로고를 베끼지 않고 "그 업종 로고 같은 느낌"(색 조합·글자 분위기)만 빌려옴.
 * 글꼴: Black Han Sans(과자·패스트푸드), Do Hyeon(항공·은행), Tinos(시계), Pacifico(퐁듀) — index.html에서 로드
 */

import type { ReactElement } from 'react';

const HAN ="'Black Han Sans', 'Pretendard', sans-serif";
const DOH = "'Do Hyeon', 'Pretendard', sans-serif";

/** 작은 양 얼굴 (여러 로고 공용) */
function SheepFace({ x, y, s = 1, wool = '#fff', face = '#2b2b2b' }: { x: number; y: number; s?: number; wool?: string; face?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[[-9, -6], [0, -10], [9, -6], [-11, 3], [11, 3], [0, 0]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="8" fill={wool} />
      ))}
      <ellipse cx="0" cy="6" rx="7" ry="9" fill={face} />
      <ellipse cx="-9" cy="3" rx="4" ry="2" fill={face} transform="rotate(-25 -9 3)" />
      <ellipse cx="9" cy="3" rx="4" ry="2" fill={face} transform="rotate(25 9 3)" />
      <circle cx="-2.5" cy="4" r="1.3" fill="#fff" />
      <circle cx="2.5" cy="4" r="1.3" fill="#fff" />
    </g>
  );
}

/** 과자 봉지 로고 느낌: 빨강 굵은 기울임 글자 + 흰/진빨강 이중 테두리 + 노란 물결 칩 */
function YangwingChip() {
  return (
    <svg viewBox="0 0 220 90" className="h-[78px]">
      <path d="M14 58 C 40 40, 70 76, 104 56 S 170 40, 206 58 L 200 74 C 166 58, 140 88, 102 72 S 44 60, 20 74 Z" fill="#ffcf1f" stroke="#e39a00" strokeWidth="2" />
      <text x="110" y="58" textAnchor="middle" fontFamily={HAN} fontSize="50" transform="skewX(-10) translate(10 0)"
        fill="#e4141c" stroke="#7a0008" strokeWidth="11" strokeLinejoin="round" paintOrder="stroke">양윙칩</text>
      <text x="110" y="58" textAnchor="middle" fontFamily={HAN} fontSize="50" transform="skewX(-10) translate(10 0)"
        fill="#e4141c" stroke="#fff" strokeWidth="5" strokeLinejoin="round" paintOrder="stroke">양윙칩</text>
      <text x="178" y="20" fontFamily={DOH} fontSize="12" fill="#e4141c" transform="rotate(12 178 20)">양념맛</text>
    </svg>
  );
}

/** 패스트푸드 느낌: 빨강 바탕 + 노랑 글자 + 양 얼굴 */
function McMeee() {
  return (
    <svg viewBox="0 0 200 90" className="h-[78px]">
      <rect x="4" y="8" width="192" height="74" rx="14" fill="#d71920" />
      <circle cx="44" cy="45" r="27" fill="#ffc72c" />
      <SheepFace x={44} y={44} s={1.15} />
      <text x="82" y="44" fontFamily={HAN} fontSize="30" fill="#ffc72c">MC</text>
      <text x="82" y="72" fontFamily={HAN} fontSize="25" fill="#fff">메에에</text>
      <text x="150" y="44" fontFamily={DOH} fontSize="11" fill="#ffc72c">I'm</text>
      <text x="150" y="56" fontFamily={DOH} fontSize="11" fill="#ffc72c">baa-ing</text>
      <text x="150" y="68" fontFamily={DOH} fontSize="11" fill="#ffc72c">it</text>
    </svg>
  );
}

/** 은행 느낌: 남색 각진 엠블럼 + 금색 털뭉치 + 반듯한 굵은 글자 */
function WoolBank() {
  return (
    <svg viewBox="0 0 290 90" className="h-[74px]">
      <rect x="6" y="14" width="62" height="62" rx="8" fill="#0b2d63" />
      <g fill="none" stroke="#f2b632" strokeWidth="5" strokeLinecap="round">
        <path d="M22 54 c -6 -12 6 -22 14 -14 c 2 -12 18 -12 18 0 c 10 -4 14 10 4 14" />
        <path d="M24 62 H 52" />
      </g>
      <text x="80" y="50" fontFamily={DOH} fontSize="36" fill="#0b2d63">양털은행</text>
      <text x="81" y="70" fontFamily="Pretendard, sans-serif" fontWeight="700" fontSize="11" letterSpacing="3.2" fill="#c98f12">WOOL BANK OF KOREA(?)</text>
    </svg>
  );
}

/** 스위스 시계 느낌: 짙은 초록 + 금색 양뿔 왕관 + 넓은 자간 세리프 */
function DaegwalWatch() {
  return (
    <svg viewBox="0 0 250 92" className="h-[80px]">
      <g transform="translate(120 4)" fill="#b8912e">
        <path d="M-22 26 L-26 6 L-13 18 L0 2 L13 18 L26 6 L22 26 Z" />
        <circle cx="-26" cy="5" r="3.2" /><circle cx="0" cy="1" r="3.2" /><circle cx="26" cy="5" r="3.2" />
        <path d="M-22 26 c -10 0 -14 -10 -6 -14" fill="none" stroke="#b8912e" strokeWidth="3" />
        <path d="M22 26 c 10 0 14 -10 6 -14" fill="none" stroke="#b8912e" strokeWidth="3" />
      </g>
      <text x="120" y="60" textAnchor="middle" fontFamily="Tinos, serif" fontWeight="700" fontSize="24" letterSpacing="5" fill="#0b4d2c">DAEGWALYANG</text>
      <text x="120" y="80" textAnchor="middle" fontFamily="Pretendard, sans-serif" fontWeight="600" fontSize="11" letterSpacing="2.5" fill="#0b4d2c">대관양 시계 · PYEONGCHANG</text>
    </svg>
  );
}

/** 항공사 느낌: 하늘색·남색 원형 날개 심볼 + 굵은 산세리프 */
function AirPyeongchang() {
  return (
    <svg viewBox="0 0 250 90" className="h-[74px]">
      <g transform="translate(42 45)">
        <circle r="30" fill="none" stroke="#00a3e0" strokeWidth="7" strokeDasharray="150 40" transform="rotate(-30)" />
        <path d="M-26 8 C -8 -6, 12 -14, 32 -22 C 16 -6, 2 4, -20 14 Z" fill="#0a3d91" />
        <path d="M-14 16 C 0 10, 14 4, 26 -4 C 16 8, 6 16, -8 22 Z" fill="#00a3e0" />
      </g>
      <text x="84" y="44" fontFamily="Pretendard, sans-serif" fontWeight="900" fontSize="25" letterSpacing="1" fill="#0a3d91">AIR</text>
      <text x="138" y="44" fontFamily="Pretendard, sans-serif" fontWeight="900" fontSize="25" fill="#00a3e0">PC</text>
      <text x="85" y="72" fontFamily={DOH} fontSize="27" fill="#0a3d91">에어평창</text>
      <text x="190" y="72" fontFamily="Pretendard, sans-serif" fontWeight="600" fontSize="9" fill="#00a3e0">(버스임)</text>
    </svg>
  );
}

/** 산악열차 느낌: 빨강 알약 + 흰 설산 + 흰 글자 */
function JungfrauyangBahn() {
  return (
    <svg viewBox="0 0 296 90" className="h-[74px]">
      <rect x="4" y="14" width="288" height="62" rx="31" fill="#c8102e" />
      <path d="M22 62 L42 34 L52 46 L64 26 L84 62 Z" fill="#fff" />
      <path d="M58 36 L64 26 L70 36 L66 34 L62 38 Z" fill="#c8102e" />
      <text x="96" y="44" fontFamily="Pretendard, sans-serif" fontWeight="900" fontSize="17" letterSpacing="1.5" fill="#fff">JUNGFRAU-YANG</text>
      <text x="96" y="64" fontFamily={DOH} fontSize="17" fill="#fff">융프라양 산악열차</text>
    </svg>
  );
}

/** 스위스 멀티툴 느낌: 빨강 방패 + 흰 십자 + 굵은 대문자 */
function MacgyvyangSpoon() {
  return (
    <svg viewBox="0 0 300 90" className="h-[74px]">
      <path d="M12 16 H 64 V 46 C 64 64, 50 74, 38 80 C 26 74, 12 64, 12 46 Z" fill="#d52b1e" />
      <path d="M33 30 h10 v10 h10 v10 h-10 v10 h-10 v-10 h-10 v-10 h10 z" fill="#fff" />
      <text x="76" y="46" fontFamily="Pretendard, sans-serif" fontWeight="900" fontSize="24" letterSpacing="1" fill="#d52b1e">MACGYVYANG</text>
      <text x="77" y="68" fontFamily={DOH} fontSize="15" fill="#333">맥가이양 숟가락 · SWISS(?) MADE</text>
    </svg>
  );
}

/** 치즈 브랜드 느낌: 노란 타원 + 갈색 손글씨 + 치즈 구멍 */
function GondreFondue() {
  return (
    <svg viewBox="0 0 220 90" className="h-[78px]">
      <ellipse cx="110" cy="45" rx="104" ry="40" fill="#ffd84d" stroke="#8a4b12" strokeWidth="4" />
      <circle cx="28" cy="36" r="5" fill="#e8b520" /><circle cx="190" cy="54" r="6" fill="#e8b520" /><circle cx="176" cy="24" r="3.5" fill="#e8b520" />
      <text x="110" y="50" textAnchor="middle" fontFamily="Pacifico, cursive" fontSize="28" fill="#8a4b12">Gondre Fondue</text>
      <text x="110" y="72" textAnchor="middle" fontFamily={DOH} fontSize="14" letterSpacing="4" fill="#8a4b12">곤드레 퐁듀</text>
    </svg>
  );
}

const LOGOS: Record<string, () => ReactElement> = {
  yangwingchip: YangwingChip,
  mcmeee: McMeee,
  woolbank: WoolBank,
  watch: DaegwalWatch,
  air: AirPyeongchang,
  bahn: JungfrauyangBahn,
  spoon: MacgyvyangSpoon,
  fondue: GondreFondue,
};

export function PartnerLogo({ name, logo }: { name: string; logo: string }) {
  const L = LOGOS[logo];
  return (
    <span role="img" aria-label={name} className="flex shrink-0 items-center">
      {L ? <L /> : <span className="text-[28px] font-bold text-gray-500">{name}</span>}
    </span>
  );
}
