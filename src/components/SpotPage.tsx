import type { MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, UserRound } from 'lucide-react';
import { TOURS, courseById, type CourseId, type Tour } from '../content';
import { navigate } from '../router';
import { WeatherIcon, photo } from './Common';

/* ───────── 투어 개별 페이지 /spot/:id — 키키의 "Start Tour" 페이지처럼 ───────── */
const link = (to: string) => (e: MouseEvent) => {
  e.preventDefault();
  navigate(to);
};

export default function SpotPage({ t, onBook }: { t: Tour; onBook: (id: CourseId) => void }) {
  const i = TOURS.findIndex((x) => x.id === t.id);
  const prev = TOURS[(i - 1 + TOURS.length) % TOURS.length];
  const next = TOURS[(i + 1) % TOURS.length];
  const kakao = `https://map.kakao.com/link/search/${encodeURIComponent(t.query)}`;

  return (
    <div className="pb-20">
      {/* 큰 사진 + 제목 (Tour Guides 액자와 같은 톤) */}
      <div className="relative h-[360px] overflow-hidden md:h-[460px]">
        <img src={photo(t.photo)} alt={t.real} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1100px] flex-col justify-center px-4">
          <nav aria-label="현재 위치" className="mb-4 flex items-center gap-1 text-[12px] text-gray-600">
            <a href="/" onClick={link('/')} className="hover:text-brand">
              홈
            </a>
            <ChevronRight size={12} />
            <a href="/#guides" onClick={link('/#guides')} className="hover:text-brand">
              Tour Guides
            </a>
            <ChevronRight size={12} />
            <span className="font-semibold text-black">{t.name}</span>
          </nav>
          <span className="w-fit rounded-full border-2 border-[#9db6db] bg-white/80 px-3 py-0.5 text-[13px] font-semibold tracking-[2px] text-[#5b7fb5]">{t.time}</span>
          <h1 className="mt-3 text-[44px] font-light leading-none tracking-tight md:text-[64px]">{t.name}</h1>
          <p className="mt-3 text-[13px] font-semibold tracking-[0.45em]">GUIDE BY {t.guide.toUpperCase()}</p>
          <p className="mt-4 max-w-[460px] whitespace-pre-line text-[15px] font-medium text-gray-700">{t.blurb}</p>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1100px] gap-8 px-4 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="rounded bg-[#fff6e0] px-5 py-4">
            <p className="text-[12px] font-bold text-[#c96d00]">실제 투어지 공개</p>
            <p className="text-[22px] font-bold">{t.real}</p>
            <p className="text-[13px] text-gray-600">강원특별자치도 평창군 {t.where}</p>
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-gray-800">{t.desc}</p>
          <h2 className="mt-8 text-[17px] font-bold">알아두세요</h2>
          <ul className="mt-2 space-y-1.5 text-[14px]">
            {t.tips.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /> {x}
              </li>
            ))}
          </ul>
        </div>

        <aside className="card-shadow h-fit bg-panel p-5">
          <dl className="space-y-3 text-[14px]">
            <div className="flex items-center gap-3">
              <dt className="flex w-[72px] items-center gap-1 font-semibold text-gray-600">
                <UserRound size={15} /> 가이드
              </dt>
              <dd className="font-semibold">{t.guide}</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="w-[72px] font-semibold text-gray-600">카테고리</dt>
              <dd>{t.category}</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="w-[72px] font-semibold text-gray-600">날씨</dt>
              <dd className="flex items-center gap-1">
                <WeatherIcon k={t.weatherIcon} /> {t.weather}
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="w-[72px] font-semibold text-gray-600">포함 코스</dt>
              <dd className="flex flex-wrap gap-1.5">
                {t.courses.map((c) => (
                  <a key={c} href={courseById(c).path} onClick={link(courseById(c).path)} className="rounded-sm border border-brand/40 bg-white px-2 py-0.5 text-[12px] font-semibold text-brand hover:bg-[#eef5fc]">
                    {courseById(c).short}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
          <div className="mt-5 grid gap-2">
            <button onClick={() => onBook(t.courses[0])} className="btn-orange h-[44px] text-[15px]">
              이 투어 포함 코스로 발권 »
            </button>
            <a href={kakao} target="_blank" rel="noreferrer" className="flex h-[40px] items-center justify-center gap-1.5 rounded-md border border-brand bg-white text-[14px] font-bold text-brand hover:bg-[#eef5fc]">
              <MapPin size={15} /> 카카오맵에서 위치 보기 <ExternalLink size={13} />
            </a>
          </div>
        </aside>
      </div>

      {/* 이전/다음 투어 */}
      <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-2 gap-3 px-4">
        {[
          ['이전 투어', prev, 'left'] as const,
          ['다음 투어', next, 'right'] as const,
        ].map(([label, x, side]) => (
          <a
            key={side}
            href={`/spot/${x.id}`}
            onClick={link(`/spot/${x.id}`)}
            className={`card-shadow group flex items-center gap-3 bg-white p-3 ${side === 'right' ? 'flex-row-reverse text-right' : ''}`}
          >
            {side === 'left' ? <ChevronLeft className="shrink-0 text-brand" /> : <ChevronRight className="shrink-0 text-brand" />}
            <img src={photo(x.photo)} alt="" className="hidden h-[64px] w-[90px] object-cover sm:block" loading="lazy" />
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold text-gray-500">{label} · {x.time}</span>
              <span className="block truncate text-[15px] font-bold group-hover:text-brand">{x.name}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
