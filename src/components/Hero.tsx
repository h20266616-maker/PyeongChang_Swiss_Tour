import { useState, type FormEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import { BOOKING, COURSES, SUMMER, courseById, type CourseId } from '../content';
import { TrustBadges, photo } from './Common';
import { LOGO_IMAGE } from '../config';
import { TicketingModal, makeBookingNo, type TicketData } from './Ticketing';

const today = SUMMER.def; // 여름 출발 상품이라 기본값은 다가오는 7월 중순

/** 히어로 오른쪽 나무 표지판: 기둥 가운데에 판이 못으로 박혀 있고, 아래는 풀에 묻힘 */
function WoodSign({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 260 330" className="absolute bottom-0 right-[7%] hidden w-[250px] md:block" aria-hidden>
      <defs>
        <linearGradient id="ws-post" x1="0" x2="1">
          <stop offset="0" stopColor="#4a2e16" />
          <stop offset=".35" stopColor="#7a4f2a" />
          <stop offset=".6" stopColor="#6a4322" />
          <stop offset="1" stopColor="#3b2410" />
        </linearGradient>
        <linearGradient id="ws-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8743f" />
          <stop offset=".5" stopColor="#8d5c2f" />
          <stop offset="1" stopColor="#6e4522" />
        </linearGradient>
        <filter id="ws-paint">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 .965  0 0 0 0 .9  0 0 0 1 0" />
        </filter>
        <filter id="ws-paint-shadow">
          <feColorMatrix type="matrix" values="0 0 0 0 .23  0 0 0 0 .14  0 0 0 0 .06  0 0 0 .55 0" />
        </filter>
        <filter id="ws-shadow"x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000" floodOpacity=".35" />
        </filter>
      </defs>

      {/* 땅 그림자 */}
      <ellipse cx="130" cy="326" rx="46" ry="7" fill="#1f3a10" opacity=".45" />

      {/* 기둥 (판 뒤로 위까지 살짝 올라옴) */}
      <g filter="url(#ws-shadow)">
        <path d="M117 36 L130 26 L143 36 V330 H117 Z" fill="url(#ws-post)" />
        <path d="M124 60 C 122 120, 126 200, 123 320" stroke="#3b2410" strokeWidth="1.2" fill="none" opacity=".5" />
        <path d="M136 80 C 138 160, 134 240, 137 320" stroke="#3b2410" strokeWidth="1" fill="none" opacity=".4" />
      </g>

      {/* 판: 기둥 가운데에 고정, 살짝 기울어짐 */}
      <g transform="rotate(-4 130 100)" filter="url(#ws-shadow)">
        <rect x="14" y="56" width="232" height="88" rx="6" fill="url(#ws-board)" stroke="#4f3117" strokeWidth="3" />
        {/* 나뭇결 */}
        <g stroke="#5c3a1b" fill="none" opacity=".35" strokeWidth="1.3">
          <path d="M22 72 C 70 68, 120 76, 170 70 S 230 72, 240 70" />
          <path d="M22 128 C 80 132, 130 124, 190 130 S 232 128, 240 130" />
          <path d="M40 100 c 10 -6 22 -6 30 0 c -8 6 -20 6 -30 0z" />
          <path d="M196 92 c 8 -4 16 -4 22 0 c -6 4 -14 4 -22 0z" />
        </g>
        {/* 평스투어 로고를 흰 페인트로 (청록 로고는 나무 위에서 안 보여서 색만 바꿈) */}
        <image href={LOGO_IMAGE} x="34" y="76" width="192" height="45" filter="url(#ws-paint-shadow)" aria-label={text} />
        <image href={LOGO_IMAGE} x="32" y="74" width="192" height="45" filter="url(#ws-paint)" />
        {/* 못 */}
        <circle cx="130" cy="66" r="3" fill="#2b2b2b" stroke="#9a9a9a" strokeWidth="1" />
        <circle cx="130" cy="134" r="3" fill="#2b2b2b" stroke="#9a9a9a" strokeWidth="1" />
      </g>

      {/* 기둥 밑을 덮는 풀 */}
      <g fill="#4f8f22">
        <path d="M100 330 C 104 316, 108 306, 112 300 C 112 312, 114 322, 116 330 Z" />
        <path d="M110 330 C 116 314, 122 304, 126 298 C 124 312, 124 322, 126 330 Z" fill="#5fa52a" />
        <path d="M130 330 C 134 316, 140 306, 146 302 C 142 314, 140 322, 140 330 Z" />
        <path d="M140 330 C 146 318, 152 310, 160 306 C 154 316, 152 324, 152 330 Z" fill="#5fa52a" />
      </g>
    </svg>
  );
}

export default function Hero({ course, onCourse }: { course: CourseId; onCourse: (id: CourseId) => void }) {
  const [name, setName] = useState('');
  const [from, setFrom] = useState(BOOKING.origins[0]);
  const [date, setDate] = useState(today);
  const [type, setType] = useState(BOOKING.types[0]);
  const [agree, setAgree] = useState(false);
  const [warn, setWarn] = useState(false);
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [more, setMore] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setWarn(true);
      return;
    }
    setTicket({ name: name.trim(), from, date, grade: type, course: courseById(course).short, bookingNo: makeBookingNo() });
  };

  const reissue = () => {
    setTicket(null);
    setName('');
    setFrom(BOOKING.origins[0]);
    setDate(today);
    setType(BOOKING.types[0]);
    setAgree(false);
    setWarn(false);
    onCourse('intro');
    document.getElementById('ticket')?.scrollIntoView({ behavior: 'smooth' });
  };

  const input = 'h-[27px] w-full border border-[#bfbfbf] bg-white px-2 text-[13px] text-[#555] shadow-[inset_0_1px_2px_rgba(0,0,0,.08)] outline-none focus:border-brand';

  return (
    <section id="ticket" className="relative scroll-mt-[90px]">
      <div className="relative min-h-[640px] overflow-hidden md:h-[640px]">
        <img src={photo('sheep1')} alt="초록 언덕 위에서 풀을 뜯는 양떼와 먼 산 (사실 대관령)" className="absolute inset-0 h-full w-full object-cover" />

        {/* 나무 표지판 */}
        <WoodSign text={BOOKING.signText} />

        {/* 예매 카드 */}
        <div className="relative z-10 px-4 pb-10 pt-10 md:absolute md:left-[10%] md:top-[80px] md:p-0">
          <form
            onSubmit={submit}
            className="card-shadow w-full max-w-[343px] border border-white bg-gradient-to-b from-white to-[#e9f4fb] px-[18px] pb-4 pt-5"
          >
            <div className="mb-5 flex items-start justify-between">
              <p className="reflect text-[34px] font-black leading-none tracking-[-0.04em]">
                지금 <span className="bg-gradient-to-b from-[#3fc6d8] to-[#1f6fb5] bg-clip-text text-transparent">바로</span>{' '}
                <span className="text-navy">예매!</span>
              </p>
              {/* 아래 예매 칸을 가리키는 곡선 화살표 (머리는 marker라 곡선 끝 방향을 자동으로 따라감) */}
              <svg width="42" height="46" viewBox="0 0 42 46" aria-hidden className="mt-1 shrink-0">
                <defs>
                  <marker id="bk-arrow" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="16" markerHeight="16" markerUnits="userSpaceOnUse" orient="auto">
                    <path d="M0 0 L10 5 L0 10 Z" fill="#46b520" />
                  </marker>
                </defs>
                <path d="M6 7 C 26 4, 36 16, 24 32" stroke="#46b520" strokeWidth="6" fill="none" strokeLinecap="round" markerEnd="url(#bk-arrow)" />
              </svg>
            </div>

            <div className="grid grid-cols-[60px_1fr] items-center gap-x-2 gap-y-3 text-[13px] font-semibold">
              <label htmlFor="bk-name">이름</label>
              <input id="bk-name" className={input} placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="bk-from">출발지</label>
              <select id="bk-from" className={input} value={from} onChange={(e) => setFrom(e.target.value)}>
                {BOOKING.origins.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <label htmlFor="bk-date">출발일</label>
              <input id="bk-date" type="date" min={SUMMER.min} max={SUMMER.max} className={input} value={date} onChange={(e) => setDate(e.target.value)} />
              <label htmlFor="bk-course">코스</label>
              <select id="bk-course" className={input} value={course} onChange={(e) => onCourse(e.target.value as CourseId)}>
                {COURSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.short}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="mt-4">
              <legend className="mb-2 text-[13px] font-semibold">티켓 등급 선택</legend>
              <div className="grid grid-cols-2 gap-y-1.5 text-[13px]">
                {BOOKING.types.map((t) => (
                  <label key={t} className="flex cursor-pointer items-center gap-2">
                    <input type="radio" name="type" checked={type === t} onChange={() => setType(t)} className="accent-[#46b520]" />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className={`mt-4 flex cursor-pointer items-center gap-2 text-[12px] font-semibold ${warn && !agree ? 'text-red-600' : ''}`}>
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="h-4 w-4" />
              {BOOKING.agree}
            </label>

            <div className="mt-4 flex justify-center">
              <button type="submit" className="btn-orange h-[46px] w-[200px] text-[18px]">
                {BOOKING.button}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px]">{BOOKING.breakfast}</p>
            <div className="mt-4">
              <TrustBadges />
            </div>
          </form>
        </div>
      </div>

      {/* 길게 잘리는 부제 (B급 영화 제목 컨셉) */}
      <div className="border-b border-line bg-[#fafafa] px-5 py-4">
        <p className="mx-auto max-w-5xl text-center text-[13px] text-[#555]">
          <b className="text-navy">[평스투어 단독] </b>
          {BOOKING.subtitleShort}
          {more ? (
            BOOKING.subtitleRest
          ) : (
            <>
              …{' '}
              <button onClick={() => setMore(true)} className="font-semibold text-brand underline">
                더보기
              </button>
            </>
          )}
        </p>
      </div>

      <AnimatePresence>{ticket && <TicketingModal t={ticket} onClose={() => setTicket(null)} onReissue={reissue} />}</AnimatePresence>
    </section>
  );
}
