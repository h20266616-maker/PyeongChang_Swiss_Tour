import { useEffect, useState, type ReactNode } from 'react';
import { Check, ChevronRight, Info, X } from 'lucide-react';
import { COURSES, SEASON_EXTRAS, type Course, type CourseId, type Slot } from '../content';
import { navigate } from '../router';
import { photo } from './Common';

/* ───────── 코스 상세 페이지 /tour/intro (node 20:166) · /tour/master (node 20:422) ───────── */

const TABS = [
  { id: 'sec-schedule', label: '일정표' },
  { id: 'sec-feature', label: '상품 특장점' },
  { id: 'sec-include', label: '포함·불포함' },
  { id: 'sec-notice', label: '유의사항' },
  { id: 'sec-season', label: '시즌 한정' },
];

const SLOT_STYLE: Record<Slot, string> = {
  오전: 'bg-[#e3f3fd] text-[#1f6fb5] border-[#9fd2f3]',
  점심: 'bg-[#fff1dc] text-[#c46200] border-[#ffc98a]',
  오후: 'bg-[#e6f6df] text-[#357a1d] border-[#a9dc92]',
  저녁: 'bg-[#e7e9f6] text-[#1d2a6b] border-[#b4badf]',
};

export default function CoursePage({ course, onBook }: { course: Course; onBook: (id: CourseId) => void }) {
  const [active, setActive] = useState(TABS[0].id);
  const other = COURSES.find((c) => c.id !== course.id)!;

  // 스크롤 위치에 따라 탭 하이라이트
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-120px 0px -60% 0px' },
    );
    TABS.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [course.id]);

  const basic: [string, string][] = [
    ['상품가격', `1인 ${course.priceOrig} → ${course.price} (${course.discount})`],
    ['출발지', course.origin],
    ['여행기간', course.period],
    ['여행지', course.places],
    ['숙소', course.stay],
    ['식사', course.meals],
    ['인솔자', course.leader],
    ['출발인원', course.pax],
  ];

  return (
    <div className="bg-white pb-20">
      {/* 경로 */}
      <nav aria-label="현재 위치" className="mx-auto flex max-w-[1100px] items-center gap-1 px-4 pt-6 text-[12px] text-gray-500">
        <a href="/" onClick={(e) => (e.preventDefault(), navigate('/'))} className="hover:text-brand">
          홈
        </a>
        <ChevronRight size={12} />
        <a href="/#courses" onClick={(e) => (e.preventDefault(), navigate('/#courses'))} className="hover:text-brand">
          투어 코스
        </a>
        <ChevronRight size={12} />
        <span className="font-semibold text-black">{course.short}</span>
      </nav>

      {/* 상단: 대표 사진 + 기본정보 */}
      <div className="mx-auto mt-4 grid max-w-[1100px] gap-8 px-4 md:grid-cols-[1fr_1.05fr]">
        <div>
          <img src={photo(course.photo)} alt="" className="card-shadow aspect-[4/3] w-full object-cover" />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {course.tags.map((t) => (
              <span key={t} className="rounded-sm border border-brand/40 bg-[#f4f9fe] px-2 py-0.5 text-[12px] font-semibold text-brand">
                #{t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[14px] font-extrabold text-[#e60023]">{course.promo}</p>
          <h1 className="mt-1 text-[22px] font-bold leading-snug md:text-[26px]">{course.title.replace(/^\[테무산특가\]\s*/, '')}</h1>
          <div className="mt-4 flex flex-wrap items-end gap-x-2 border-b border-line pb-4">
            <s className="text-[15px] text-gray-400">{course.priceOrig}</s>
            <span className="text-[14px] font-semibold text-gray-500">1인</span>
            <span className="text-[34px] font-extrabold leading-none text-[#e60023]">{course.price}</span>
            <span className="mb-1 rounded-sm bg-[#fff1c2] px-1.5 text-[12px] font-bold text-[#b35a00]">{course.discount}</span>
          </div>
          <table className="mt-3 w-full text-[13px]">
            <tbody>
              {basic.slice(1).map(([k, v]) => (
                <tr key={k} className="border-b border-line">
                  <th scope="row" className="w-[80px] bg-panel px-3 py-2 text-left align-top font-semibold text-gray-600">
                    {k}
                  </th>
                  <td className="px-3 py-2 font-medium">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5 grid grid-cols-[1fr_1.4fr] gap-2">
            <a
              href={other.path}
              onClick={(e) => (e.preventDefault(), navigate(other.path))}
              className="flex h-[48px] items-center justify-center rounded-md border border-brand bg-white text-[14px] font-bold text-brand hover:bg-[#eef5fc]"
            >
              {other.short} 보기
            </a>
            <button onClick={() => onBook(course.id)} className="btn-orange h-[48px] text-[16px]">
              이 코스로 발권 »
            </button>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="sticky top-[54px] z-30 mt-12 border-y border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] overflow-x-auto px-2 [scrollbar-width:none]">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`shrink-0 border-b-[3px] px-4 py-3 text-[14px] font-bold transition md:flex-1 ${
                active === t.id ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-4">
        {/* 일정표 */}
        <Sec id="sec-schedule" title="일정표">
          <div className="space-y-8">
            {course.days.map((d) => (
              <div key={d.day}>
                <div className="flex items-center gap-2">
                  <span className="bg-navy px-3 py-1 text-[14px] font-bold text-white">{d.day}</span>
                  {d.note && <span className="text-[13px] font-semibold text-gray-500">{d.note}</span>}
                </div>
                <ol className="mt-3 border-l-2 border-line pl-4 md:ml-2">
                  {d.items.map((it, k) => (
                    <li key={k} className="relative py-2.5">
                      <span className="absolute -left-[23px] top-[15px] h-3 w-3 rounded-full border-2 border-white bg-brand" />
                      <div className="flex flex-wrap items-start gap-2 md:flex-nowrap md:gap-3">
                        <span className={`shrink-0 rounded-sm border px-2 py-0.5 text-[12px] font-bold ${SLOT_STYLE[it.slot]}`}>{it.slot}</span>
                        <div>
                          <p className="text-[15px] font-bold">{it.title}</p>
                          {it.desc && <p className="mt-0.5 text-[13px] text-gray-600">{it.desc}</p>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Sec>

        {/* 상품 특장점: 동선 */}
        <Sec id="sec-feature" title="상품 특장점" sub="한 번의 버스로 평창(=스위스) 핵심만. 동선 그대로 따라가세요.">
          <ol className="flex flex-wrap items-center gap-y-2 text-[13px] font-semibold">
            {course.route.map((r, k) => (
              <li key={k} className="flex items-center">
                <span className={`rounded-full border px-3 py-1 ${r.startsWith('서울') ? 'border-navy bg-navy text-white' : r.startsWith('펜션') ? 'border-[#ffc98a] bg-[#fff1dc]' : 'border-line bg-panel'}`}>
                  {r}
                </span>
                {k < course.route.length - 1 && <ChevronRight size={14} className="mx-0.5 text-gray-400" />}
              </li>
            ))}
          </ol>
        </Sec>

        {/* 포함/불포함 */}
        <Sec id="sec-include" title="포함 · 불포함">
          <div className="grid gap-4 md:grid-cols-2">
            <List title="포함" items={course.included} icon={<Check size={15} className="text-[#357a1d]" />} head="bg-[#e6f6df] text-[#357a1d]" />
            <List title="불포함" items={course.excluded} icon={<X size={15} className="text-[#e60023]" />} head="bg-[#fde8ea] text-[#c4001d]" />
          </div>
        </Sec>

        {/* 유의사항 */}
        <Sec id="sec-notice" title="유의사항">
          <ul className="space-y-2 bg-[#fffbea] p-5 text-[14px]">
            {course.notices.map((n) => (
              <li key={n} className="flex gap-2">
                <Info size={16} className="mt-0.5 shrink-0 text-[#c46200]" /> {n}
              </li>
            ))}
          </ul>
        </Sec>

        {/* 시즌 한정 */}
        <Sec id="sec-season" title="시즌 한정 추가 일정" sub="출발 시기에 맞으면 자동으로 추가됩니다 (두 코스 공통).">
          <div className="grid gap-4 sm:grid-cols-3">
            {SEASON_EXTRAS.map((s) => (
              <div key={s.when} className="card-shadow overflow-hidden bg-panel">
                <img src={photo(s.photo)} alt="" className="h-[120px] w-full object-cover" loading="lazy" />
                <div className="px-4 py-3">
                  <p className="text-[13px] font-bold text-brand">{s.when}</p>
                  <p className="mt-0.5 text-[14px] font-semibold">{s.what}</p>
                </div>
              </div>
            ))}
          </div>
        </Sec>

        <div className="mt-14 flex flex-col items-center gap-2">
          <button onClick={() => onBook(course.id)} className="btn-orange h-[50px] w-[260px] text-[18px]">
            이 코스로 발권 »
          </button>
          <p className="text-[11px] text-gray-500">※ 실존하지 않는 여행사입니다. 실제 예약·결제는 되지 않습니다 (과제).</p>
        </div>
      </div>
    </div>
  );
}

function Sec({ id, title, sub, children }: { id: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[120px] border-b border-line py-10">
      <h2 className="text-[20px] font-bold">
        <span className="mr-2 inline-block h-5 w-1.5 translate-y-0.5 bg-brand" />
        {title}
      </h2>
      {sub && <p className="mt-1 text-[13px] text-gray-600">{sub}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function List({ title, items, icon, head }: { title: string; items: string[]; icon: ReactNode; head: string }) {
  return (
    <div className="border border-line">
      <p className={`px-4 py-2 text-[14px] font-bold ${head}`}>{title}</p>
      <ul className="space-y-1.5 px-4 py-3 text-[14px]">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            {icon} {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
