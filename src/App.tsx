import { useState, type MouseEvent } from 'react';
import { ClipboardCheck, Menu, ShoppingBag, X } from 'lucide-react';
import { EVAL_FORM_URL } from './config';
import { COURSES, NAV, TOURS, goodsById, type CourseId } from './content';
import { navigate, usePath } from './router';
import { CartButton, CartProvider } from './cart';
import { GoodsDetail, ShopPage } from './components/Shop';
import { Logo } from './components/Common';
import HomeShopping from './components/HomeShopping';
import Hero from './components/Hero';
import CoursePage from './components/CoursePage';
import SpotPage from './components/SpotPage';
import { Courses, Guides } from './components/Tours';
import { Footer, Partners, Polaroids, Reviews, TourMap, TravelInfo } from './components/Rest';

export default function App() {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState<CourseId>('intro');
  const path = usePath();
  const detail = COURSES.find((c) => c.path === path);
  const isShop = path === '/duty-free';
  const goods = path.startsWith('/duty-free/') ? goodsById(decodeURIComponent(path.slice('/duty-free/'.length))) : undefined;
  const spot = path.startsWith('/spot/') ? TOURS.find((t) => t.id === path.slice('/spot/'.length)) : undefined;
  const isHome = !detail && !isShop && !goods && !spot;

  /** "이 코스로 발권": 코스 선택값 세팅 + 히어로 예매 카드로 스크롤 */
  const book = (id: CourseId) => {
    setCourse(id);
    navigate('/#ticket');
  };

  // 헤더 링크: 메인에서는 #앵커, 상세 페이지에서는 메인으로 이동 후 앵커
  const go = (href: string) => (e: MouseEvent) => {
    setOpen(false);
    if (!isHome) {
      e.preventDefault();
      navigate(`/${href}`);
    }
  };

  const toShop = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate('/duty-free');
  };

  return (
    <CartProvider>
      <header className="sticky top-0 z-40 h-[54px] bg-white/95 shadow-[0_2px_6px_rgba(0,0,0,.12)] backdrop-blur">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 md:px-[50px]">
          {/* 키키처럼 헤더 밖으로 튀어나온 로고 박스 */}
          <a href="#ticket" onClick={go('#ticket')} className="relative z-10 self-start bg-[#f6f6f6] px-4 pb-2 pt-3 shadow-[0_3px_6px_rgba(0,0,0,.18)] md:px-9 md:pb-4 md:pt-5">
            <Logo />
          </a>
          <nav className="hidden items-center gap-11 text-[15px] font-semibold lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={go(n.href)} className="hover:text-brand">
                {n.label}
              </a>
            ))}
            <a href="/duty-free" onClick={toShop} className="btn-green flex items-center gap-1.5 px-4 py-1.5 text-[14px]">
              <ShoppingBag size={15} /> (직구) Duty Free
            </a>
            <CartButton />
          </nav>
          <div className="flex items-center gap-3 lg:hidden">
            <CartButton />
            <button onClick={() => setOpen((o) => !o)} aria-label="메뉴">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="grid grid-cols-3 gap-2 border-t border-line bg-white px-4 py-3 text-[14px] font-semibold lg:hidden">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={go(n.href)} className="py-1.5">
                {n.label}
              </a>
            ))}
            <a href="/duty-free" onClick={toShop} className="py-1.5 text-[#3f9a20]">
              Duty Free
            </a>
          </nav>
        )}
      </header>

      <main>
        {detail ? (
          <CoursePage key={detail.id} course={detail} onBook={book} />
        ) : isShop ? (
          <ShopPage />
        ) : goods ? (
          <GoodsDetail key={goods.id} g={goods} />
        ) : spot ? (
          <SpotPage key={spot.id} t={spot} onBook={book} />
        ) : (
          <>
            <HomeShopping />
            <Hero course={course} onCourse={setCourse} />
            <Courses onBook={book} />
            <Guides />
            <Partners />
            <TourMap />
            <TravelInfo />
            <Reviews />
            <Polaroids />
          </>
        )}
      </main>
      <Footer />

      {/* 사용성 평가 버튼 — config.ts의 EVAL_FORM_URL(구글폼)을 넣었을 때만 보임 */}
      {EVAL_FORM_URL && (
        <a href={EVAL_FORM_URL} target="_blank" rel="noreferrer" className="btn-orange fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 z-40 flex items-center gap-1.5 px-3 py-2 text-[13px]">
          <ClipboardCheck size={16} /> <span className="hidden sm:inline">이 여행사 평가하기</span>
          <span className="sm:hidden">평가</span>
        </a>
      )}
    </CartProvider>
  );
}
