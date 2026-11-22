import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { HOMESHOPPING_VIDEO_ID } from '../config';
import { HOMESHOPPING as H } from '../content';
import { photo } from './Common';

/** 방송 종료 카운트다운 (오늘 자정까지 — 매일 "마감임박") */
function useCountdown() {
  const calc = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(24, 0, 0, 0);
    const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
    const p = (n: number) => String(n).padStart(2, '0');
    return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ───────── 홈쇼핑 영상 (피그마 node 18:197) — 헤더 바로 아래 ───────── */
export default function HomeShopping() {
  const left = useCountdown();
  const [msg, setMsg] = useState(false);
  const hasVideo = !!HOMESHOPPING_VIDEO_ID;

  return (
    <section id="live" aria-label="평스홈쇼핑 방송" className="scroll-mt-16 bg-[#0f1640] px-0 pt-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="relative aspect-video w-full overflow-hidden bg-black md:border-4 md:border-[#26306b] md:shadow-[0_6px_20px_rgba(0,0,0,.45)]">
          {hasVideo ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${HOMESHOPPING_VIDEO_ID}?rel=0`}
              title="평스홈쇼핑 — 평스투어 입문 코스 방송"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img src={photo(H.poster)} alt="대관령 양떼목장 초원 (방송 썸네일)" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
              <button
                onClick={() => setMsg(true)}
                aria-label="방송 재생"
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white/90 bg-black/35 text-white shadow-lg transition hover:scale-105 md:h-20 md:w-20"
              >
                <Play className="ml-1 h-6 w-6 md:h-9 md:w-9" fill="currentColor" />
              </button>
              {msg && (
                <p role="status" className="absolute left-1/2 top-[64%] -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-3 py-1 text-[11px] font-semibold text-white md:text-[13px]">
                  {H.noVideo}
                </p>
              )}
            </>
          )}

          {/* 상단 방송 정보 — 영상 위에서도 클릭 방해 안 하게 pointer-events-none */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-2 md:p-4">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="flex items-center gap-1 rounded-sm bg-[#e60023] px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider text-white md:px-2.5 md:text-[14px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white md:h-2 md:w-2" /> {H.live}
              </span>
              <span className="rounded-sm bg-black/55 px-1.5 py-0.5 text-[10px] font-bold text-white md:px-2.5 md:text-[14px]">{H.channel}</span>
            </div>
            {!hasVideo && (
              <span className="rounded-sm bg-black/55 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#ffd84d] md:px-2.5 md:text-[14px]">
                {H.countdownLabel} {left}
              </span>
            )}
          </div>

          {/* 하단 자막 */}
          {!hasVideo && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-stretch text-white">
              <span className="flex items-center bg-[#e60023] px-2 text-[11px] font-extrabold md:px-5 md:text-[22px]">{H.urgent}</span>
              <div className="flex flex-1 items-center gap-2 bg-gradient-to-r from-[#1d2a6b] to-[#2a6db5]/90 px-2 py-1.5 md:gap-4 md:px-5 md:py-3">
                <span className="hidden truncate text-[15px] font-semibold md:inline">{H.caption}</span>
                <span className="ml-auto whitespace-nowrap text-[11px] md:text-[20px]">
                  <s className="text-white/60">{H.priceOrig}</s> <span className="text-[#ffd84d]">→</span>{' '}
                  <b className="text-[14px] text-[#ffd84d] md:text-[28px]">{H.price}</b>
                </span>
              </div>
            </div>
          )}
        </div>
        {hasVideo && (
          <div className="flex items-stretch text-white">
            <span className="flex items-center bg-[#e60023] px-3 text-[12px] font-extrabold md:px-5 md:text-[18px]">{H.urgent}</span>
            <div className="flex flex-1 items-center gap-3 bg-gradient-to-r from-[#1d2a6b] to-[#2a6db5] px-3 py-2 md:px-5">
              <span className="hidden truncate text-[14px] font-semibold md:inline">{H.caption}</span>
              <span className="ml-auto whitespace-nowrap text-[12px] md:text-[18px]">
                <s className="text-white/60">{H.priceOrig}</s> → <b className="text-[#ffd84d]">{H.price}</b>
              </span>
              <span className="font-mono text-[11px] text-[#ffd84d] md:text-[14px]">
                {H.countdownLabel} {left}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
