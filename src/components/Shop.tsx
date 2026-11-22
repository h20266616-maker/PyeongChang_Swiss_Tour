import { useMemo, useState, type MouseEvent } from 'react';
import { ChevronRight, Cookie, Gift, Package, PawPrint, Plus, Shirt } from 'lucide-react';
import { GOODS, GOODS_CATEGORIES, SHOP, courseById, type Goods, type GoodsBadge, type GoodsCategory } from '../content';

export const goodsImg = (name: string) => `${import.meta.env.BASE_URL}goods/${name}.jpg`;
import { Stepper, unitPrice, useCart, won } from '../cart';
import { navigate } from '../router';
import { SectionTitle } from './Common';

/* ───────── 굿즈 이미지 (성민 시안: public/goods/). 사진 없는 상품만 아이콘 자리표시 ───────── */
const CAT_STYLE: Record<GoodsCategory, { icon: typeof Gift; bg: string; fg: string }> = {
  세트: { icon: Package, bg: 'from-[#fff4d6] to-[#ffe2a8]', fg: 'text-[#c46200]' },
  마스코트: { icon: PawPrint, bg: 'from-[#eef7e8] to-[#d5ecc6]', fg: 'text-[#4b8a2e]' },
  '의류·잡화': { icon: Shirt, bg: 'from-[#eceefa] to-[#d6dbf3]', fg: 'text-[#1d2a6b]' },
  먹거리: { icon: Cookie, bg: 'from-[#fdf0e6] to-[#f7dcc6]', fg: 'text-[#a3541c]' },
  기념품: { icon: Gift, bg: 'from-[#fbeaf0] to-[#f4d2de]', fg: 'text-[#b0315e]' },
};

/** img: 보여줄 사진 이름 (없으면 대표 사진). 흰 배경 상품 사진이라 contain + 흰 바탕 */
export function GoodsImage({ g, className = '', small, view = 0, img }: { g: Goods; className?: string; small?: boolean; view?: number; img?: string }) {
  const name = img ?? g.images[0];
  if (name) return <img src={goodsImg(name)} alt={g.name} className={`bg-white object-contain ${className}`} loading="lazy" />;
  const s = CAT_STYLE[g.category];
  const Icon = s.icon;
  return (
    <div role="img" aria-label={`${g.name} (이미지 준비 중)`} className={`flex flex-col items-center justify-center bg-gradient-to-br ${s.bg} ${className}`}>
      <Icon className={`${s.fg} ${small ? 'h-7 w-7' : 'h-[34%] w-[34%]'}`} strokeWidth={1.4} style={{ transform: view ? `rotate(${view * 12 - 18}deg) scale(${1 - view * 0.08})` : undefined }} />
      {!small && <span className={`mt-2 text-[12px] font-bold tracking-[0.2em] opacity-60 ${s.fg}`}>PYEONGS</span>}
    </div>
  );
}

const BADGE_STYLE: Record<GoodsBadge, string> = {
  BEST: 'bg-[#e60023]',
  NEW: 'bg-[#46b520]',
  MD추천: 'bg-brand',
  한정: 'bg-[#8a2be2]',
};

export function Badge({ b }: { b: GoodsBadge }) {
  return <span className={`inline-block px-2 py-0.5 text-[11px] font-extrabold tracking-wide text-white shadow ${BADGE_STYLE[b]}`}>{b}</span>;
}

function Wool({ n, big }: { n: number; big?: boolean }) {
  return (
    <span className="flex flex-wrap items-baseline gap-x-1.5">
      <b className={big ? 'text-[30px] leading-none text-[#e60023]' : 'text-[17px] text-[#e60023]'}>
        {n.toLocaleString()}
        <span className={big ? 'ml-1 text-[18px]' : 'ml-0.5 text-[13px]'}>양털</span>
      </b>
      <span className={`text-gray-500 ${big ? 'text-[14px]' : 'text-[11px]'}`}>({won(n)})</span>
    </span>
  );
}

const go = (id: string) => (e: MouseEvent) => {
  e.preventDefault();
  navigate(`/duty-free/${id}`);
};

/* ───────── 굿즈 카드 (피그마 node 2:39) ───────── */
export function GoodsCard({ g }: { g: Goods }) {
  const { add } = useCart();
  return (
    <article className="card-shadow group flex flex-col bg-white">
      <a href={`/duty-free/${g.id}`} onClick={go(g.id)} className="relative block">
        <GoodsImage g={g} className="aspect-square w-full" />
        {g.badge && (
          <span className="absolute left-2 top-2">
            <Badge b={g.badge} />
          </span>
        )}
        {g.soldOut && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/65">
            <span className="border-2 border-gray-600 px-3 py-1 text-[14px] font-extrabold tracking-widest text-gray-700">SOLD OUT</span>
          </span>
        )}
      </a>
      <div className="flex flex-1 flex-col bg-panel px-3 pb-3 pt-2.5">
        <p className="text-[11px] font-semibold text-brand">{g.category}</p>
        <a href={`/duty-free/${g.id}`} onClick={go(g.id)} className="mt-0.5 line-clamp-2 text-[14px] font-bold leading-snug group-hover:text-brand">
          {g.name}
        </a>
        <p className="mt-1 line-clamp-1 text-[12px] text-gray-500">{g.summary}</p>
        <div className="mt-auto pt-2">
          <Wool n={g.price} />
        </div>
        <button
          onClick={() => add(g.id)}
          disabled={g.soldOut}
          className="mt-2 flex h-[34px] items-center justify-center gap-1 rounded-md border border-brand bg-white text-[13px] font-bold text-brand hover:bg-[#eef5fc] disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-white"
        >
          {g.soldOut ? '품절' : (
            <>
              <Plus size={14} /> 장바구니
            </>
          )}
        </button>
      </div>
    </article>
  );
}

/* ───────── 굿즈샵 목록 /duty-free (피그마 node 6:197) ───────── */
type Sort = 'popular' | 'cheap';

export function ShopPage() {
  const [cat, setCat] = useState<(typeof GOODS_CATEGORIES)[number]>('전체');
  const [sort, setSort] = useState<Sort>('popular');
  const [showSold, setShowSold] = useState(true);
  const { add } = useCart();

  const sets = GOODS.filter((g) => g.category === '세트');
  const list = useMemo(() => {
    const l = GOODS.filter((g) => g.category !== '세트' && (cat === '전체' || g.category === cat) && (showSold || !g.soldOut));
    return [...l].sort((a, b) => (sort === 'popular' ? b.popularity - a.popularity : a.price - b.price) || Number(!!a.soldOut) - Number(!!b.soldOut));
  }, [cat, sort, showSold]);

  return (
    <div className="px-4 pb-24 pt-10">
      <Crumbs here="(직구) Duty Free" />
      <div className="mt-6">
        <SectionTitle black={SHOP.title} blue={SHOP.accent} sub={SHOP.sub} />
      </div>

      {/* 코스 고객 전용 세트 */}
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-3 text-[18px] font-bold">
          <span className="mr-2 inline-block h-4 w-1.5 translate-y-0.5 bg-brand" />
          {SHOP.setTitle}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {sets.map((g) => (
            <article key={g.id} className="card-shadow flex bg-gradient-to-r from-[#fffaf0] to-white">
              <a href={`/duty-free/${g.id}`} onClick={go(g.id)} className="relative w-[38%] shrink-0">
                <GoodsImage g={g} className="h-full min-h-[170px] w-full" />
                {g.badge && (
                  <span className="absolute left-2 top-2">
                    <Badge b={g.badge} />
                  </span>
                )}
              </a>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[12px] font-bold text-[#c46200]">{g.course && courseById(g.course).short} 탑승객 전용</p>
                <a href={`/duty-free/${g.id}`} onClick={go(g.id)} className="mt-0.5 text-[15px] font-bold leading-snug hover:text-brand">
                  {g.name.replace(/^\[.*?\]\s*/, '')}
                </a>
                <p className="mt-1 text-[12px] text-gray-600">{g.summary}</p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3">
                  <Wool n={g.price} />
                  <button onClick={() => add(g.id)} className="btn-orange flex h-[34px] items-center gap-1 px-3 text-[13px]">
                    <Plus size={14} /> 장바구니
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 카테고리 + 정렬 */}
      <div className="mx-auto mt-14 max-w-[1100px]">
        <div className="flex flex-col gap-3 border-b-2 border-navy pb-2 md:flex-row md:items-end md:justify-between">
          <div role="tablist" aria-label="카테고리" className="-mx-1 flex overflow-x-auto [scrollbar-width:none]">
            {GOODS_CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`mx-1 shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-bold transition ${cat === c ? 'bg-navy text-white' : 'bg-panel text-gray-600 hover:bg-[#e6e6e6]'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[13px] font-semibold">
            <label className="flex cursor-pointer items-center gap-1.5">
              <input type="checkbox" checked={showSold} onChange={(e) => setShowSold(e.target.checked)} className="h-4 w-4" />
              품절 포함
            </label>
            <select aria-label="정렬" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-[30px] border border-[#bfbfbf] bg-white px-2">
              <option value="popular">인기순</option>
              <option value="cheap">낮은 양털순</option>
            </select>
          </div>
        </div>
        <p className="mt-3 text-[12px] text-gray-500">총 {list.length}개</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {list.map((g) => (
            <GoodsCard key={g.id} g={g} />
          ))}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-[14px] text-gray-500">이 카테고리에는 판매 중인 굿즈가 없어요.</p>}
      </div>
    </div>
  );
}

function Crumbs({ here, mid }: { here: string; mid?: boolean }) {
  return (
    <nav aria-label="현재 위치" className="mx-auto flex max-w-[1100px] items-center gap-1 text-[12px] text-gray-500">
      <a href="/" onClick={(e) => (e.preventDefault(), navigate('/'))} className="hover:text-brand">
        홈
      </a>
      <ChevronRight size={12} />
      {mid && (
        <>
          <a href="/duty-free" onClick={(e) => (e.preventDefault(), navigate('/duty-free'))} className="hover:text-brand">
            (직구) Duty Free
          </a>
          <ChevronRight size={12} />
        </>
      )}
      <span className="truncate font-semibold text-black">{here}</span>
    </nav>
  );
}

/* ───────── 굿즈 상세 /duty-free/:id (피그마 node 25:359) ───────── */
export function GoodsDetail({ g }: { g: Goods }) {
  const { add, checkout, setOpen } = useCart();
  const [view, setView] = useState(0);
  const [option, setOption] = useState(g.options?.values[0].label);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'desc' | 'ship'>('desc');
  const unit = unitPrice(g, option);

  const related = useMemo(() => {
    const others = GOODS.filter((x) => x.id !== g.id && x.category !== '세트');
    return [...others.filter((x) => x.category === g.category), ...others.filter((x) => x.category !== g.category).sort((a, b) => b.popularity - a.popularity)].slice(0, 4);
  }, [g]);

  // 옵션(예: 표정)을 고르면 그 옵션 사진으로 바뀜
  const pickOption = (label: string) => {
    setOption(label);
    const im = g.options?.values.find((v) => v.label === label)?.image;
    if (im && g.images.includes(im)) setView(g.images.indexOf(im));
  };

  return (
    <div className="px-4 pb-24 pt-6">
      <Crumbs here={g.name} mid />
      <div className="mx-auto mt-5 grid max-w-[1100px] gap-8 md:grid-cols-2">
        {/* 이미지 + 썸네일 */}
        <div>
          <div className="relative">
            <GoodsImage g={g} img={g.images[view]} view={view} className="card-shadow aspect-square w-full" />
            {g.badge && (
              <span className="absolute left-3 top-3">
                <Badge b={g.badge} />
              </span>
            )}
          </div>
          {g.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2" role="tablist" aria-label="상품 이미지">
              {g.images.map((im, i) => (
                <button
                  key={im}
                  role="tab"
                  aria-selected={view === i}
                  aria-label={`이미지 ${i + 1}`}
                  onClick={() => setView(i)}
                  className={`border-2 p-0.5 ${view === i ? 'border-brand' : 'border-line'}`}
                >
                  <GoodsImage g={g} img={im} small className="aspect-square w-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 정보 */}
        <div>
          <p className="text-[13px] font-semibold text-brand">{g.category === '세트' && g.course ? `${courseById(g.course).short} 탑승객 전용 세트` : g.category}</p>
          <h1 className="mt-1 text-[22px] font-bold leading-snug md:text-[26px]">{g.name}</h1>
          <p className="mt-1 text-[14px] text-gray-600">{g.summary}</p>
          <div className="mt-4 border-y border-line py-4">
            <Wool n={g.price} big />
            <p className="mt-1 text-[12px] text-gray-500">1 양털 = 100원 · 배송비 0 양털</p>
          </div>

          <div className="mt-4 grid grid-cols-[64px_1fr] items-center gap-x-3 gap-y-3 text-[14px]">
            {g.options && (
              <>
                <label htmlFor="opt" className="font-semibold text-gray-600">
                  {g.options.name}
                </label>
                <select id="opt" value={option} onChange={(e) => pickOption(e.target.value)} className="h-[36px] border border-[#bfbfbf] bg-white px-2">
                  {g.options.values.map((v) => (
                    <option key={v.label} value={v.label}>
                      {v.label}
                      {v.delta ? ` (+${v.delta} 양털)` : ''}
                    </option>
                  ))}
                </select>
              </>
            )}
            <span className="font-semibold text-gray-600">수량</span>
            <div>
              <Stepper value={qty} onChange={(n) => setQty(Math.max(1, Math.min(99, n)))} />
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between bg-panel px-4 py-3">
            <span className="text-[14px] font-semibold text-gray-600">총 상품 양털</span>
            <span className="text-right">
              <b className="text-[22px] text-[#e60023]">{(unit * qty).toLocaleString()} 양털</b>
              <span className="block text-[11px] text-gray-500">= {won(unit * qty)} (가상)</span>
            </span>
          </div>

          {g.soldOut ? (
            <button disabled className="mt-4 h-[50px] w-full rounded-md bg-gray-300 text-[16px] font-bold text-white">
              품절 (너무 정직해서)
            </button>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  add(g.id, option, qty);
                  setOpen(true);
                }}
                className="h-[50px] rounded-md border border-brand bg-white text-[15px] font-bold text-brand hover:bg-[#eef5fc]"
              >
                장바구니 담기
              </button>
              <button onClick={() => checkout([{ id: g.id, option, qty }], false)} className="btn-orange h-[50px] text-[15px]">
                양털로 바로 구매
              </button>
            </div>
          )}
          <p className="mt-2 text-center text-[11px] text-gray-500">※ 실제 결제는 일어나지 않습니다 (과제)</p>
        </div>
      </div>

      {/* 설명 / 배송·교환 탭 */}
      <div className="mx-auto mt-12 max-w-[1100px]">
        <div role="tablist" className="flex border-b border-line">
          {(
            [
              ['desc', '상품 설명'],
              ['ship', '배송 / 교환'],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`flex-1 border-b-[3px] py-3 text-[14px] font-bold md:flex-none md:px-10 ${tab === k ? 'border-brand text-brand' : 'border-transparent text-gray-500'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <ul className="space-y-2 py-6 text-[14px] leading-relaxed">
          {(tab === 'desc' ? g.description : SHOP.shipping).map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /> {t}
            </li>
          ))}
        </ul>
      </div>

      {/* 함께 사면 좋은 굿즈 */}
      <div className="mx-auto mt-6 max-w-[1100px]">
        <h2 className="mb-4 text-[18px] font-bold">
          함께 사면 좋은 <span className="text-brand">굿즈</span>
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {related.map((r) => (
            <GoodsCard key={r.id} g={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
