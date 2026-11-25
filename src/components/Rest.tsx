import type { MouseEvent } from 'react';
import { BusFront, Check, ExternalLink, TrainFront } from 'lucide-react';
import credits from '../credits.json';
import { EXHIBIT_SITE_URL, INSTAGRAM_ID, INSTAGRAM_URL } from '../config';
import { COURSES, FOOTER, INFO, NAV, PARTNERS, PARTNERS_NOTE, POLAROID_QUOTE, REVIEWS, TOURS, type Tour } from '../content';
import { navigate } from '../router';
import { Pin, SectionTitle, photo } from './Common';
import { KakaoTourMap } from './KakaoMap';

const go = (to: string) => (e: MouseEvent) => {
  e.preventDefault();
  navigate(to);
};

/* ───────── Map (카카오맵 실제 지도, 키 없으면 일러스트 약도) ───────── */
export function TourMap() {
  return (
    <section id="map" className="scroll-mt-[90px] px-4 py-20">
      <SectionTitle blue="평스위스" black="지도" blueFirst sub="평스위스 한눈에 보기 (이번엔 축척 지킴)" />
      <KakaoTourMap fallback={<IllustratedMap onPin={(t) => navigate(`/spot/${t.id}`)} />} />
    </section>
  );
}

function IllustratedMap({ onPin }: { onPin: (t: Tour) => void }) {
  return (
    <div className="relative aspect-[584/487] w-full overflow-hidden bg-sky">
      <svg viewBox="0 0 584 487" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* 물결 */}
        {[
          [40, 60],
          [500, 160],
          [460, 450],
          [70, 430],
        ].map(([x, y], k) => (
          <path key={k} d={`M${x} ${y} q8 -6 16 0 t16 0 t16 0 t16 0`} stroke="#fff" strokeWidth="2" fill="none" />
        ))}
        {/* 평창군 (대충) */}
        <path
          d="M60 170 C 70 120, 120 95, 170 110 C 200 70, 260 60, 300 90 C 340 50, 410 45, 450 80 C 500 90, 530 130, 520 180 C 545 230, 520 290, 470 300 C 460 350, 420 395, 360 390 C 320 420, 260 420, 230 385 C 180 400, 130 380, 120 335 C 70 320, 40 270, 70 230 C 40 210, 45 185, 60 170 Z"
          fill="#fbf0c6"
          stroke="#e8d7a0"
          strokeWidth="3"
        />
        {/* 도로 */}
        <path d="M80 200 C 160 215, 230 250, 300 245 C 370 240, 420 205, 500 170" stroke="#e2d2a4" strokeWidth="4" fill="none" />
        <path d="M230 120 C 250 200, 260 280, 300 380" stroke="#e2d2a4" strokeWidth="3" fill="none" />
        <path d="M330 90 C 360 160, 380 230, 450 290" stroke="#e2d2a4" strokeWidth="3" fill="none" />
        <text x="150" y="365" fontFamily="Tinos, serif" fontSize="22" letterSpacing="6" fill="#222">
          PYEONGSWISS
        </text>
        <text x="520" y="215" fontFamily="Tinos, serif" fontSize="15" letterSpacing="4" fill="#fff" transform="rotate(62 520 215)">
          ALPS OCEAN
        </text>
        {/* 나침반 */}
        <g transform="translate(70 395)">
          <circle r="26" fill="none" stroke="#222" strokeWidth="1" />
          <path d="M0 -34 L5 0 L0 34 L-5 0 Z" fill="#222" />
          <path d="M-34 0 L0 -5 L34 0 L0 5 Z" fill="#222" />
          <text y="-38" textAnchor="middle" fontSize="9" fontFamily="Tinos">N</text>
        </g>
        {/* 페이지 말림 */}
        <path d="M584 0 L500 0 C 530 20, 560 50, 584 84 Z" fill="#fff" />
        <path d="M500 0 C 530 20, 560 50, 584 84 C 560 70, 520 40, 500 0 Z" fill="#cfcfcf" />
      </svg>
      {TOURS.map((t, i) => (
        <button
          key={t.id}
          onClick={() => onPin(t)}
          className="absolute -translate-x-1/2 -translate-y-full transition hover:-translate-y-[110%]"
          style={{ left: `${t.map.x}%`, top: `${t.map.y + 10}%` }}
          aria-label={`${i + 1}. ${t.name}`}
        >
          <Pin n={i + 1} color={t.pinColor} size={28} />
        </button>
      ))}
    </div>
  );
}

/* ───────── Partners (가상 패러디 협찬사) ───────── */
export function Partners() {
  const logos = [...PARTNERS, ...PARTNERS];
  return (
    <section className="overflow-hidden py-16">
      <SectionTitle black="공식(?)" blue="협찬사" />
      <div className="marquee-track flex w-max items-center gap-20">
        {logos.map((p, i) => (
          <PartnerLogo key={i} name={p.name} style={p.style} />
        ))}
      </div>
      <p className="mt-8 px-4 text-center text-[12px] text-gray-400">{PARTNERS_NOTE}</p>
    </section>
  );
}

function PartnerLogo({ name, style }: { name: string; style: string }) {
  if (style === 'red-box') return <span className="bg-[#d42027] px-6 py-2 text-[30px] font-black tracking-[0.2em] text-white">{name}</span>;
  if (style === 'gold') return <span className="font-serif text-[36px] text-[#7a5a00]">✿ {name}</span>;
  if (style === 'leaf') return <span className="font-serif text-[40px] italic text-[#4a8c2a]">🌿{name}</span>;
  if (style === 'swoosh')
    return (
      <span className="flex items-center gap-2 text-[30px] font-black text-[#1b2a4a]">
        <span className="h-8 w-8 rounded-full border-[6px] border-[#2ab3e6] border-r-transparent" />
        {name}
      </span>
    );
  if (style === 'mono')
    return (
      <span className="flex flex-col items-center leading-none">
        <span className="text-[40px] font-black">🐑</span>
        <span className="text-[13px] font-bold tracking-[0.3em]">{name}</span>
      </span>
    );
  return <span className="font-serif text-[28px] text-gray-500">★ {name}</span>;
}

/* ───────── Travel Info: 실제 교통 + 비교 ───────── */
export function TravelInfo() {
  const h = INFO.howTo;
  const c = INFO.compare;
  return (
    <section id="info" className="scroll-mt-[90px] bg-[#f7fbfe] px-4 py-20">
      <SectionTitle black={h.title} blue={h.accent} sub={h.sub} />
      <div className="mx-auto grid max-w-[1160px] gap-5 md:grid-cols-2">
        {h.rows.map((r) => (
          <div key={r.kind} className="card-shadow bg-white">
            <div className="flex items-center gap-3 border-b border-line bg-panel px-5 py-3">
              {r.kind === 'KTX' ? <TrainFront className="text-brand" /> : <BusFront className="text-brand" />}
              <span className="text-[16px] font-bold">{r.title}</span>
            </div>
            <dl className="grid grid-cols-[80px_1fr] gap-y-2 px-5 py-4 text-[14px]">
              <dt className="font-semibold text-gray-500">구간</dt>
              <dd className="font-semibold">{r.route}</dd>
              <dt className="font-semibold text-gray-500">소요</dt>
              <dd className="font-bold text-brand">{r.time}</dd>
              <dt className="font-semibold text-gray-500">요금</dt>
              <dd className="font-bold text-brand">{r.fare}</dd>
              <dt className="font-semibold text-gray-500">참고</dt>
              <dd className="text-gray-600">{r.extra}</dd>
            </dl>
            <div className="flex justify-end px-5 pb-4">
              <a href={r.href} target="_blank" rel="noreferrer" className="btn-orange inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px]">
                {r.cta} <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-3 max-w-[1160px] text-[12px] text-gray-500">{h.caution}</p>

      <div className="mt-20">
        <SectionTitle black={c.title} blue={c.accent} sub={c.sub} />
        {/* 모바일에서도 3열이 화면 안에 들어오게 (가로 스크롤 없음) */}
        <div className="card-shadow mx-auto max-w-[900px] bg-white">
          <table className="w-full table-fixed border-collapse text-[13px] md:text-[14px]">
            <thead>
              <tr>
                <th className="w-[64px] border-b border-line bg-panel p-2 md:w-[120px] md:p-3" />
                <th className="border-b border-line bg-panel p-2 font-semibold text-gray-600 md:p-3">진짜 스위스</th>
                <th className="border-b border-line bg-gradient-to-b from-[#ffd27a] to-[#ffb238] p-2 font-bold text-[#5a3200] md:p-3">
                  PyeongSwiss <span className="hidden sm:inline">★추천★</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.item}>
                  <td className="border-b border-line p-2 font-semibold text-gray-600 md:p-3">{r.item}</td>
                  <td className="border-b border-line p-2 text-center text-gray-600 md:p-3">{r.swiss}</td>
                  <td className="border-b border-line bg-[#fffaf0] p-2 text-center font-semibold md:p-3">
                    <Check size={14} className="mr-1 inline text-[#46b520]" strokeWidth={3} />
                    {r.pc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ───────── Reviews ───────── */
export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-[90px] px-4 py-20">
      <div className="mx-auto max-w-[1160px]">
        <div className="card-shadow bg-panel">
          <div className="flex items-center gap-4 border-b border-line px-5 py-3">
            <svg width="60" height="48" viewBox="0 0 60 48" aria-hidden>
              <ellipse cx="38" cy="18" rx="20" ry="15" fill="#2a8fe0" />
              <path d="M44 30 L52 40 L36 32 Z" fill="#2a8fe0" />
              <ellipse cx="24" cy="26" rx="20" ry="15" fill="#6ccd2f" />
              <path d="M14 38 L8 47 L24 40 Z" fill="#6ccd2f" />
            </svg>
            <h2 className="text-[20px] font-semibold">솔직 후기</h2>
          </div>
          <div className="px-5 py-3">
            <p className="text-[13px] font-semibold">평균 별점</p>
            <p className="flex items-center gap-2 text-[15px] font-semibold">
              {REVIEWS.avg} <span className="text-[24px] text-[#f7c600]">★★★★★</span>
              <span className="text-[14px] font-normal text-gray-500">{REVIEWS.count}</span>
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {REVIEWS.items.map((r) => (
            <div key={r.text} className="card-shadow flex min-h-[190px] flex-col justify-between bg-panel p-5">
              <div>
                <p className="text-[24px] text-[#f7c600]">★★★★★</p>
                <p className="mt-2 text-[15px] font-semibold">{r.text}</p>
              </div>
              <div className="flex items-center gap-3">
                {'avatar' in r && r.avatar ? (
                  <img src={r.avatar} alt="" className="h-10 w-10 rounded-full border border-line bg-white object-cover" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7c8b99] font-semibold text-white">{r.initial}</span>
                )}
                <div className="leading-tight">
                  <p className="text-[14px] font-semibold">{r.who}</p>
                  <p className="text-[12px] text-gray-500">인터뷰 · 2026</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-right text-[11px] text-gray-500">* {REVIEWS.source}</p>
      </div>
    </section>
  );
}

/* ───────── Polaroids ───────── */
export function Polaroids() {
  const shots: [string, string, number, number][] = [
    // [사진, 크기클래스, 회전, 위아래 오프셋]
    ['sheep2', 'w-[180px] md:w-[200px]', -8, 0],
    ['odaesan', 'w-[190px] md:w-[210px]', 6, 50],
    ['sheep1', 'w-[200px] md:w-[230px]', -3, 30],
    ['buckwheat', 'w-[170px] md:w-[190px]', 5, 70],
    ['samyangranch', 'w-[210px] md:w-[240px]', 2, 20],
    ['sheep3', 'w-[170px] md:w-[180px]', -7, 80],
  ];
  const q = POLAROID_QUOTE;
  return (
    <section className="overflow-hidden px-4 pb-24 pt-10">
      <p className="reflect mx-auto w-fit text-center text-[36px] font-black leading-none tracking-[-0.03em] md:text-[48px]">
        “<span className="text-[#19b6d2]">{q.a}</span> {q.b} <span className="text-[#1d2aa8]">{q.c}</span> {q.d}”
      </p>
      <div className="mx-auto mt-14 flex max-w-[1300px] flex-wrap justify-center gap-x-2 gap-y-6 items-start md:h-[330px] md:flex-nowrap">
        {shots.map(([p, w, r, y]) => (
          <div key={p} className={`${w} shrink-0 bg-white p-2.5 pb-10 shadow-[0_4px_12px_rgba(0,0,0,.25)]`} style={{ transform: `rotate(${r}deg) translateY(${y}px)` }}>
            <img src={photo(p)} alt="" className="aspect-square w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────── Footer ───────── */
export function Footer() {
  return (
    <footer className="rounded-t-[60px] bg-[#f3f3f3] px-5 pb-10 pt-12 text-center shadow-[0_-8px_20px_rgba(0,0,0,.05)]">
      <img src="/logo/logo-full.png" alt="PYEONGS TOUR 평스투어" className="mx-auto mb-8 h-[54px] w-auto md:h-[64px]" />
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[15px] font-semibold text-navy">
        {NAV.map((n) => (
          <a key={n.href} href={`/${n.href}`} onClick={go(`/${n.href}`)} className="underline">
            {n.label}
          </a>
        ))}
        <a href="/duty-free" onClick={go('/duty-free')} className="underline">
          면세점
        </a>
        {EXHIBIT_SITE_URL && (
          <a href={EXHIBIT_SITE_URL} target="_blank" rel="noreferrer" className="underline">
            프로젝트 소개
          </a>
        )}
      </nav>
      <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[13px] text-gray-600">
        {COURSES.map((c) => (
          <a key={c.id} href={c.path} onClick={go(c.path)} className="hover:text-brand">
            {c.short} 상세 »
          </a>
        ))}
      </div>
      {INSTAGRAM_ID && (
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#f9a43a] via-[#e1306c] to-[#833ab4] px-5 py-2 text-[14px] font-bold text-white shadow"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          @{INSTAGRAM_ID}
        </a>
      )}
      <p className="mt-4 text-[13px] text-navy">© 2026 평스투어. 모든 권리 보유 (아마도).</p>
      <p className="mx-auto mt-6 max-w-3xl text-[12px] leading-relaxed text-gray-500">{FOOTER.disclaimer}</p>
      <p className="mt-2 text-[11px] text-gray-500">{FOOTER.team}</p>
      <details className="mx-auto mt-6 max-w-3xl text-left text-[11px] text-gray-500">
        <summary className="cursor-pointer text-center">사진 출처 (Wikimedia Commons)</summary>
        <ul className="mt-2 space-y-0.5">
          {credits.map((c) => (
            <li key={c.file}>
              <a href={c.page} target="_blank" rel="noreferrer" className="underline">
                {c.title}
              </a>{' '}
              — {c.artist}, {c.license}
            </li>
          ))}
        </ul>
      </details>
    </footer>
  );
}
