import type { ReactNode } from 'react';
import { Cloud, CloudFog, Moon, Sun, Wind } from 'lucide-react';
import { LOGO_IMAGE } from '../config';

export const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}.jpg`;

/** 키키식 제목: 검정 + 파랑 포인트 단어 */
export function SectionTitle({ black, blue, sub, blueFirst }: { black: string; blue: string; sub?: ReactNode; blueFirst?: boolean }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-[28px] font-semibold tracking-tight md:text-[32px]">
        {blueFirst ? (
          <>
            <span className="text-brand">{blue}</span> {black}
          </>
        ) : (
          <>
            {black} <span className="text-brand">{blue}</span>
          </>
        )}
      </h2>
      {sub && <p className="mx-auto mt-2 max-w-xl text-[15px] font-medium">{sub}</p>}
    </div>
  );
}

export function Logo({ small }: { small?: boolean }) {
  if (LOGO_IMAGE) return <img src={LOGO_IMAGE} alt="평스투어" className={`h-[30px] w-auto md:h-[36px] ${small ? 'scale-90' : ''}`} />;
  return (
    // 한글 로고 "평스투어" (피그마 원본 파일 받으면 config.ts LOGO_IMAGE로 교체)
    <div className={`flex flex-col items-center leading-none ${small ? 'scale-90' : ''}`} aria-label="평스투어 PyeongS Travel">
      <div className="relative flex items-end">
        <svg width="34" height="30" viewBox="0 0 34 30" className="absolute -left-4 -top-3" aria-hidden>
          <path d="M3 26 C 10 10, 22 4, 33 3" stroke="#f2b705" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M20 2 l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.8 2.7 1-5.3-4-3.7 5.4-.6z" fill="#f2b705" />
        </svg>
        <span className="text-[28px] font-black italic tracking-[-0.04em] text-navy">평스</span>
        <span className="ml-0.5 text-[28px] font-extrabold tracking-[-0.04em] text-brand">투어</span>
      </div>
      <span className="mt-1.5 text-[9px] font-bold tracking-[0.32em] text-brand">PYEONGS TRAVEL</span>
    </div>
  );
}

export function WeatherIcon({ k }: { k: string }) {
  const c = 'inline h-4 w-4';
  if (k === 'sun') return <Sun className={`${c} text-amber-400`} />;
  if (k === 'wind') return <Wind className={`${c} text-sky-500`} />;
  if (k === 'moon') return <Moon className={`${c} text-amber-400`} />;
  if (k === 'fog') return <CloudFog className={`${c} text-slate-400`} />;
  return <Cloud className={`${c} text-sky-300`} />;
}

/** 번호 들어간 물방울 핀 */
export function Pin({ n, color, size = 30 }: { n: number; color: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 30 39" aria-hidden>
      <defs>
        <linearGradient id={`pg${n}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M15 38 C 15 38 2 22 2 14 a13 13 0 0 1 26 0 c0 8 -13 24 -13 24z" fill={color} stroke="rgba(0,0,0,.15)" />
      <path d="M15 38 C 15 38 2 22 2 14 a13 13 0 0 1 26 0 c0 8 -13 24 -13 24z" fill={`url(#pg${n})`} />
      <text x="15" y="19" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" fontFamily="Pretendard">
        {n}
      </text>
    </svg>
  );
}

/** 히어로 신뢰 배지 4종 (키키: 100% FUN GUARANTEE 등) */
export function TrustBadges() {
  return (
    <div className="flex items-center justify-between gap-2 px-1">
      {/* 방패 */}
      <svg width="52" height="54" viewBox="0 0 52 54" aria-label="100% 시원 보장">
        <path d="M26 2 L48 9 V26 C48 40 37 49 26 52 C15 49 4 40 4 26 V9 Z" fill="#1d3d8f" stroke="#c9d3ea" strokeWidth="2" />
        <path d="M26 7 L43 12.5 V26 C43 37 35 44 26 47 C17 44 9 37 9 26 V12.5 Z" fill="#2a56c6" />
        <text x="26" y="24" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily="Pretendard">100%</text>
        <text x="26" y="34" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffd54a" fontFamily="Pretendard">시원</text>
        <rect x="6" y="37" width="40" height="8" rx="1" fill="#f2b705" />
        <text x="26" y="43.5" textAnchor="middle" fontSize="5.4" fontWeight="800" fill="#1d3d8f" fontFamily="Pretendard">GUARANTEE</text>
      </svg>
      {/* 체크 리본 */}
      <svg width="78" height="40" viewBox="0 0 78 40" aria-label="동결건조 인증">
        <rect x="18" y="12" width="58" height="18" rx="2" fill="#f7c600" />
        <text x="47" y="20" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#5a4300" fontFamily="Pretendard">동결건조</text>
        <text x="47" y="27.5" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#5a4300" fontFamily="Pretendard">APPROVED</text>
        <path d="M4 20 l8 9 l16 -24" stroke="#2e2e2e" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20 l8 9 l16 -24" stroke="#ffd84d" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* 금색 씰 */}
      <svg width="50" height="50" viewBox="0 0 50 50" aria-label="베스트 투어">
        {Array.from({ length: 24 }).map((_, i) => (
          <circle key={i} cx={25 + 22 * Math.cos((i / 24) * Math.PI * 2)} cy={25 + 22 * Math.sin((i / 24) * Math.PI * 2)} r="3.2" fill="#c98a00" />
        ))}
        <circle cx="25" cy="25" r="21" fill="#e9a400" />
        <circle cx="25" cy="25" r="16" fill="#2c1a00" />
        <text x="25" y="22" textAnchor="middle" fontSize="5.6" fontWeight="800" fill="#ffcf4a" fontFamily="Pretendard">BEST TOUR</text>
        <text x="25" y="29" textAnchor="middle" fontSize="5.6" fontWeight="800" fill="#ffcf4a" fontFamily="Pretendard">EVER(?)</text>
      </svg>
      {/* 2026 */}
      <svg width="58" height="26" viewBox="0 0 58 26" aria-label="2026">
        <path d="M6 2 H58 L52 24 H0 Z" fill="#fff" stroke="#1d3d8f" strokeWidth="1.5" />
        <text x="29" y="19" textAnchor="middle" fontSize="16" fontWeight="800" fontStyle="italic" fill="#1d3d8f" fontFamily="Pretendard">2026</text>
      </svg>
    </div>
  );
}
