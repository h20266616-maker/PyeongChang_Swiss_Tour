import { useState, type FormEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import { BOOKING, COURSES, courseById, type CourseId } from '../content';
import { TrustBadges, photo } from './Common';
import { TicketingModal, makeBookingNo, type TicketData } from './Ticketing';

const today = new Date().toISOString().slice(0, 10);

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
    <section id="ticket" className="relative scroll-mt-16">
      <div className="relative min-h-[640px] overflow-hidden md:h-[640px]">
        <img src={photo('sheep1')} alt="초록 언덕 위에서 풀을 뜯는 양떼와 먼 산 (사실 대관령)" className="absolute inset-0 h-full w-full object-cover" />

        {/* 나무 표지판 */}
        <div className="absolute bottom-0 right-[8%] hidden h-[300px] w-[230px] md:block" aria-hidden>
          <div className="absolute bottom-0 left-1/2 h-[210px] w-[18px] -translate-x-1/2 bg-gradient-to-r from-[#6b4423] via-[#8a5a32] to-[#5a3a1d]" />
          <div className="absolute left-0 top-6 -rotate-6 rounded-sm bg-gradient-to-b from-[#9b6a3f] to-[#6e4524] px-5 py-3 shadow-[0_4px_8px_rgba(0,0,0,.35)]">
            <span className="font-script text-[30px] text-white/90 [text-shadow:0_2px_2px_rgba(0,0,0,.35)]">{BOOKING.signText}</span>
          </div>
        </div>

        {/* 예매 카드 */}
        <div className="relative z-10 px-4 pb-10 pt-10 md:absolute md:left-[10%] md:top-[80px] md:p-0">
          <form
            onSubmit={submit}
            className="card-shadow w-full max-w-[343px] border border-white bg-gradient-to-b from-white to-[#e9f4fb] px-[18px] pb-4 pt-5"
          >
            <div className="mb-5 flex items-start justify-between">
              <p className="reflect origin-left scale-x-[.82] font-serif text-[40px] leading-none tracking-tight">
                book <span className="bg-gradient-to-b from-[#3fc6d8] to-[#1f6fb5] bg-clip-text text-transparent">ticket</span>{' '}
                <span className="text-navy">now!</span>
              </p>
              <svg width="40" height="44" viewBox="0 0 40 44" aria-hidden className="mt-1">
                <path d="M6 4 C 30 6, 36 22, 22 38" stroke="#46b520" strokeWidth="7" fill="none" strokeLinecap="round" />
                <path d="M12 34 L22 42 L28 30 Z" fill="#46b520" />
              </svg>
            </div>

            <div className="grid grid-cols-[60px_1fr] items-center gap-x-2 gap-y-3 text-[13px] font-semibold">
              <label htmlFor="bk-name">Name</label>
              <input id="bk-name" className={input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="bk-from">From</label>
              <select id="bk-from" className={input} value={from} onChange={(e) => setFrom(e.target.value)}>
                {BOOKING.origins.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <label htmlFor="bk-date">Departure</label>
              <input id="bk-date" type="date" className={input} value={date} onChange={(e) => setDate(e.target.value)} />
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
              <legend className="mb-2 text-[13px] font-semibold">Choose Ticket Type</legend>
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
