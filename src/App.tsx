import { useState } from 'react';
import { ClipboardCheck, Menu, ShoppingBag, X } from 'lucide-react';
import { EVAL_FORM_URL } from './config';
import { NAV } from './content';
import { Logo } from './components/Common';
import Hero from './components/Hero';
import { Guides, Schedule } from './components/Tours';
import { Footer, Partners, Polaroids, Reviews, TourMap, TravelInfo } from './components/Rest';

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 h-[54px] bg-white/95 shadow-[0_2px_6px_rgba(0,0,0,.12)] backdrop-blur">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 md:px-[50px]">
          {/* 키키처럼 헤더 밖으로 튀어나온 로고 박스 */}
          <a href="#ticket" className="relative z-10 self-start bg-[#f6f6f6] px-6 pb-4 pt-5 shadow-[0_3px_6px_rgba(0,0,0,.18)] md:px-9">
            <Logo />
          </a>
          <nav className="hidden items-center gap-11 text-[15px] font-semibold lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-brand">
                {n.label}
              </a>
            ))}
            <a href="#dutyfree" className="btn-green flex items-center gap-1.5 px-4 py-1.5 text-[14px]">
              <ShoppingBag size={15} /> (직구) Duty Free
            </a>
          </nav>
          <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="메뉴">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="grid grid-cols-3 gap-2 border-t border-line bg-white px-4 py-3 text-[14px] font-semibold lg:hidden">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-1.5">
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <Hero />
        <Schedule />
        <Guides />
        <TourMap />
        <Partners />
        <TravelInfo />
        <Reviews />
        <Polaroids />
      </main>
      <Footer />

      {/* 사용성 평가 버튼 */}
      <a
        href={EVAL_FORM_URL || '#'}
        target={EVAL_FORM_URL ? '_blank' : undefined}
        rel="noreferrer"
        onClick={(e) => {
          if (!EVAL_FORM_URL) {
            e.preventDefault();
            alert('평가 설문 링크 준비 중입니다 (config.ts → EVAL_FORM_URL)');
          }
        }}
        className="btn-orange fixed bottom-4 right-4 z-40 flex items-center gap-1.5 px-3 py-2 text-[13px]"
      >
        <ClipboardCheck size={16} /> <span className="hidden sm:inline">이 여행사 평가하기</span>
        <span className="sm:hidden">평가</span>
      </a>
    </>
  );
}
