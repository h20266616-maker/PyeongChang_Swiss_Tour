import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BedDouble, CalendarRange, ChevronLeft, ChevronRight, Flag, MapPin, Utensils } from 'lucide-react';
import { CHARACTER_IMAGES } from '../config';
import { COURSES, DUTY_FREE, GUIDES_INTRO, SEASON_EXTRAS, TOURS, type Course, type CourseId, type Tour } from '../content';
import { navigate } from '../router';
import { SectionTitle, photo } from './Common';

/* ───────── Tour Course: 입문/정복 코스 카드 (피그마 node 19:197) ───────── */
export function Courses({ onBook }: { onBook: (id: CourseId) => void }) {
  return (
    <section id="courses" className="scroll-mt-[90px] px-4 py-20">
      <SectionTitle black="PyeongS Tour" blue="Course" sub="스위스 같은데 평창인 패키지. 처음이면 입문, 다 보고 싶으면 정복." />
      <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-2">
        {COURSES.map((c) => (
          <CourseCard key={c.id} c={c} onBook={onBook} />
        ))}
      </div>

      {/* 시즌 한정 추가 일정 */}
      <div className="mx-auto mt-16 max-w-[1100px]">
        <h3 className="text-center text-[22px] font-semibold tracking-tight">
          시즌 한정 <span className="text-brand">추가 일정</span>
        </h3>
        <p className="mt-1 text-center text-[13px] font-medium text-gray-600">출발 시기에 따라 두 코스 모두 자동 추가 (추가요금 없음)</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {SEASON_EXTRAS.map((s) => (
            <div key={s.when} className="card-shadow overflow-hidden bg-panel">
              <img src={photo(s.photo)} alt="" className="h-[140px] w-full object-cover" loading="lazy" />
              <div className="px-4 py-3">
                <p className="text-[13px] font-bold text-brand">{s.when}</p>
                <p className="mt-0.5 text-[14px] font-semibold leading-snug">{s.what}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DutyBanner />
    </section>
  );
}

function CourseCard({ c, onBook }: { c: Course; onBook: (id: CourseId) => void }) {
  const info: [typeof BedDouble, string, string][] = [
    [CalendarRange, '여행기간', c.period],
    [BedDouble, '숙소', c.stay],
    [Utensils, '식사', c.meals],
    [Flag, '인솔자', c.leader],
  ];
  return (
    <article className="card-shadow flex flex-col bg-white">
      <div className="relative">
        <img src={photo(c.photo)} alt="" className="h-[220px] w-full object-cover md:h-[260px]" loading="lazy" />
        <span className="absolute left-0 top-3 bg-[#e60023] px-3 py-1 text-[13px] font-extrabold text-white shadow">{c.promo}</span>
      </div>
      <div className="flex flex-1 flex-col bg-panel px-5 pb-5 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span key={t} className="rounded-sm border border-brand/40 bg-white px-1.5 py-0.5 text-[11px] font-semibold text-brand">
              {t}
            </span>
          ))}
        </div>
        <h3 className="mt-2 text-[18px] font-bold leading-snug">{c.title.replace(/^\[테무산특가\]\s*/, '')}</h3>
        <div className="mt-3 flex flex-wrap items-end gap-x-2">
          <s className="text-[14px] text-gray-500">{c.priceOrig}</s>
          <span className="text-[13px] font-semibold text-gray-500">1인</span>
          <span className="text-[28px] font-extrabold leading-none text-[#e60023]">{c.price}</span>
          <span className="mb-0.5 rounded-sm bg-[#fff1c2] px-1.5 text-[12px] font-bold text-[#b35a00]">{c.discount}</span>
        </div>
        <dl className="mt-4 space-y-1.5 border-t border-line pt-3 text-[13px]">
          {info.map(([Icon, k, v]) => (
            <div key={k} className="flex gap-2">
              <dt className="flex w-[70px] shrink-0 items-center gap-1 font-semibold text-gray-500">
                <Icon size={14} /> {k}
              </dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <a
            href={c.path}
            onClick={(e) => {
              e.preventDefault();
              navigate(c.path);
            }}
            className="flex h-[42px] items-center justify-center rounded-md border border-brand bg-white text-[14px] font-bold text-brand hover:bg-[#eef5fc]"
          >
            상세 일정 보기
          </a>
          <button onClick={() => onBook(c.id)} className="btn-orange h-[42px] text-[14px]">
            이 코스로 발권 »
          </button>
        </div>
      </div>
    </article>
  );
}

/* ───────── (구버전 · 숨김) Schedule: 키키의 6블록 캐러셀 — 피그마에서도 숨김 처리. App에서 렌더 안 함 ───────── */
export function Schedule() {
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Tour | null>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * 328, behavior: 'smooth' });

  return (
    <section id="schedule" className="scroll-mt-[90px] px-4 py-20">
      <SectionTitle black="PyeongS Tour" blue="Schedule" sub="1박 2일 동안 7개의 플랜. 스위스 같은데 평창인 경험을 시간대별로." />
      <div className="relative mx-auto max-w-[1340px]">
        <button onClick={() => scroll(-1)} aria-label="이전" className="absolute -left-1 top-1/2 z-10 hidden -translate-y-1/2 text-brand md:block">
          <ChevronLeft size={40} strokeWidth={1.5} />
        </button>
        <div ref={track} className="mx-auto flex snap-x gap-7 overflow-x-auto px-2 pb-4 md:mx-12 [scrollbar-width:none]">
          {TOURS.map((t) => (
            <article key={t.id} className="card-shadow flex w-[298px] shrink-0 snap-start flex-col bg-panel text-center">
              <img src={photo(t.photo)} alt={t.real} className="h-[256px] w-full object-cover" loading="lazy" />
              <div className="flex flex-1 flex-col px-4 pt-4">
                <p className="text-[17px] font-semibold text-brand">{t.time}</p>
                <p className="flex items-center justify-center gap-1 text-[16px] font-semibold">
                  <MapPin size={14} fill="currentColor" className="text-black" /> {t.name}
                </p>
                <p className="mt-1 text-[12px] font-semibold text-gray-600">[{t.category}]</p>
                <p className="mt-1 whitespace-pre-line text-[12px] font-medium leading-snug text-gray-700">{t.blurb}</p>
                <p className="mt-3 text-[18px] tracking-[2px] text-brand">★★★★★</p>
              </div>
              <div className="mt-3 border-t border-line py-3">
                <button onClick={() => setOpen(t)} className="text-[16px] font-semibold text-brand underline underline-offset-2">
                  Start Tour
                </button>
              </div>
            </article>
          ))}
        </div>
        <button onClick={() => scroll(1)} aria-label="다음" className="absolute -right-1 top-1/2 z-10 hidden -translate-y-1/2 text-brand md:block">
          <ChevronRight size={40} strokeWidth={1.5} />
        </button>
      </div>

      {/* 면세점 배너 */}
      <DutyBanner />

      <AnimatePresence>{open && <TourModal t={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

export function TourModal({ t, onClose }: { t: Tour; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.name}
    >
      <motion.div initial={{ y: 24 }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-[520px] overflow-hidden rounded-md bg-white shadow-2xl">
        <img src={photo(t.photo)} alt={t.real} className="h-[240px] w-full object-cover" />
        <div className="p-6">
          <p className="text-[13px] font-semibold text-brand">
            {t.time} · Guide by {t.guide}
          </p>
          <h3 className="mt-1 text-2xl font-bold">{t.name}</h3>
          <div className="mt-4 rounded bg-[#fff6e0] px-4 py-3">
            <p className="text-[11px] font-bold text-[#c96d00]">실제 투어지 공개</p>
            <p className="text-lg font-bold">{t.real}</p>
            <p className="text-[12px] text-gray-500">강원특별자치도 평창군 {t.where}</p>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-gray-700">{t.desc}</p>
          <div className="mt-5 flex justify-end">
            <button onClick={onClose} className="btn-orange px-5 py-2 text-[14px]">
              확인 »
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DutyBanner() {
  return (
    <div id="dutyfree" className="relative mx-auto mt-16 flex max-w-[1340px] flex-wrap items-center justify-end gap-4 bg-gradient-to-b from-[#e9f2fb] to-[#f4fbff] px-6 py-5">
      <p className="text-[14px] font-semibold text-navy md:mr-6">
        {DUTY_FREE.banner}{' '}
        <a href="/duty-free" onClick={(e) => (e.preventDefault(), navigate('/duty-free'))} className="underline">
          {DUTY_FREE.link}
        </a>
      </p>
      <svg width="64" height="70" viewBox="0 0 64 70" aria-hidden>
        <path d="M20 22 V14 a12 12 0 0 1 24 0 V22" stroke="#1f6fb5" strokeWidth="5" fill="none" />
        <path d="M8 22 H50 L48 66 H6 Z" fill="#2a8fe0" />
        <path d="M30 26 H60 L58 68 H28 Z" fill="#f7c600" />
        <path d="M44 40 c-4 -6 -12 -1 -6 6 l6 6 6 -6 c6 -7 -2 -12 -6 -6z" fill="#fff" />
      </svg>
      <a
        href="/duty-free"
        onClick={(e) => {
          e.preventDefault();
          navigate('/duty-free');
        }}
        className="text-[14px] font-bold text-navy underline"
      >
        {DUTY_FREE.cta}
      </a>
    </div>
  );
}

/** 성민 캐릭터 이미지 오기 전 임시 양 일러스트 (config.ts CHARACTER_IMAGES 넣으면 교체) */
function SheepIcon() {
  return (
    <svg viewBox="0 0 96 96" className="h-[84px] w-[84px]" role="img" aria-label="대괄양 (임시 일러스트)">
      <g fill="#fff" stroke="#d9dde3" strokeWidth="2">
        <circle cx="34" cy="50" r="14" />
        <circle cx="48" cy="44" r="16" />
        <circle cx="62" cy="50" r="14" />
        <circle cx="40" cy="60" r="13" />
        <circle cx="56" cy="60" r="13" />
      </g>
      <rect x="38" y="68" width="5" height="14" rx="2" fill="#3a3a3a" />
      <rect x="53" y="68" width="5" height="14" rx="2" fill="#3a3a3a" />
      <ellipse cx="48" cy="44" rx="10" ry="12" fill="#3a3a3a" />
      <ellipse cx="36" cy="40" rx="6" ry="3" fill="#3a3a3a" transform="rotate(-25 36 40)" />
      <ellipse cx="60" cy="40" rx="6" ry="3" fill="#3a3a3a" transform="rotate(25 60 40)" />
      <circle cx="44" cy="42" r="1.8" fill="#fff" />
      <circle cx="52" cy="42" r="1.8" fill="#fff" />
      <path d="M44 50 q4 3 8 0" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="28" r="6" fill="#f2b705" />
    </svg>
  );
}

/* ───────── Tour Guides: 큰 액자 + 선반 썸네일 ───────── */
export function Guides() {
  const [i, setI] = useState(0);
  const t = TOURS[i];
  return (
    <section id="guides" className="scroll-mt-[90px] px-4 pb-20 pt-6">
      <SectionTitle black="Tour" blue="Guides" sub="Meet the Best Tour Guides in Pyeongchang (= Switzerland). 사진을 고르고 Start Tour를 누르면 투어 페이지로 이동해요." />
      <div className="mx-auto max-w-[756px] border border-[#cfcfcf] bg-white p-[7px]">
        <div className="relative aspect-[740/490] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={t.id}
              src={photo(t.photo)}
              alt={t.real}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/30 to-transparent" />
          <span className="absolute right-4 top-4 rounded-full border-2 border-[#9db6db] bg-white/80 px-3 py-0.5 text-[14px] font-semibold tracking-[2px] text-[#5b7fb5]">
            {t.time}
          </span>
          <div className="absolute left-0 top-[18%] bg-white/70 px-6 py-4 backdrop-blur-sm">
            <p className="text-[32px] font-light leading-none tracking-tight sm:text-[38px] md:text-[48px]">{t.name}</p>
            <p className="mt-3 text-[12px] font-semibold tracking-[0.45em]">GUIDE BY {t.guide.toUpperCase()}</p>
            <a
              href={`/spot/${t.id}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/spot/${t.id}`);
              }}
              className="btn-orange mt-3 inline-block px-4 py-1.5 text-[13px]"
            >
              Start Tour »
            </a>
          </div>
          <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white [text-shadow:0_1px_3px_rgba(0,0,0,.5)]">
            <span className="text-[13px] font-bold italic">PyeongS Travel</span>
            {TOURS.map((_, k) => (
              <span key={k} className={`h-2.5 w-2.5 rounded-full border border-white ${k === i ? 'bg-white' : ''}`} />
            ))}
            <span className="text-[13px] font-semibold">
              {i + 1}/{TOURS.length}
            </span>
          </div>
          <p className="absolute bottom-3 right-4 hidden font-mono text-[13px] tracking-[0.3em] text-white/80 md:block">
            {t.name.toUpperCase()} TOUR GUIDE BY {t.guide.toUpperCase()}
          </p>
        </div>
      </div>

      {/* 선반 */}
      <div className="relative mx-auto mt-8 max-w-[1190px]">
        <div className="flex items-end justify-center gap-3 overflow-x-auto px-6 pb-4 md:gap-6 [scrollbar-width:none]">
          {TOURS.map((tt, k) => (
            <button
              key={tt.id}
              onClick={() => setI(k)}
              className={`shrink-0 border border-[#ddd] bg-white p-1 shadow transition ${k === i ? '-translate-y-2 w-[150px] md:w-[180px]' : 'w-[110px] md:w-[140px]'}`}
              aria-label={`${tt.name} 가이드 ${tt.guide}`}
            >
              <img src={photo(tt.photo)} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
        <div className="mx-auto h-4 rounded-b bg-gradient-to-b from-[#f2f2f2] to-[#dcdcdc] shadow-[0_6px_10px_rgba(0,0,0,.12)]" />
      </div>

      {/* 마스코트 가이드 */}
      <div className={`mx-auto mt-14 grid gap-5 ${GUIDES_INTRO.mascots.length > 1 ? 'max-w-[900px] md:grid-cols-2' : 'max-w-[450px]'}`}>
        {GUIDES_INTRO.mascots.map((m) => (
          <div key={m.id} className="card-shadow flex gap-4 bg-panel p-4">
            <div className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#e3f4fd] to-[#c9ecc0]">
              {CHARACTER_IMAGES[m.id] ? <img src={CHARACTER_IMAGES[m.id]} alt={m.name} className="h-full w-full bg-white object-cover" /> : <SheepIcon />}
            </div>
            <div>
              <p className="text-[18px] font-bold">{m.name}</p>
              <p className="text-[12px] font-semibold text-brand">{m.role}</p>
              <p className="mt-1.5 text-[13px] text-gray-600">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
