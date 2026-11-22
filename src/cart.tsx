import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { WOOL_WON, goodsById, SHOP, type Goods } from './content';
import { GoodsImage } from './components/Shop';

/* ───────── 장바구니 상태 (React context + localStorage) ───────── */
// ⚠ 실제 결제는 절대 일어나지 않음. 양털은 가상 화폐.

export type CartLine = { id: string; option?: string; qty: number };
export type PricedLine = CartLine & { goods: Goods; unit: number };

const KEY = 'pyeongs-cart-v1';

function load(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(v) ? v.filter((l) => goodsById(l.id) && l.qty > 0) : [];
  } catch {
    return [];
  }
}

export const unitPrice = (g: Goods, option?: string) => g.price + (g.options?.values.find((v) => v.label === option)?.delta ?? 0);
export const won = (wool: number) => `${(wool * WOOL_WON).toLocaleString('ko-KR')}원`;
export const priceLines = (lines: CartLine[]): PricedLine[] =>
  lines.flatMap((l) => {
    const g = goodsById(l.id);
    return g ? [{ ...l, goods: g, unit: unitPrice(g, l.option) }] : [];
  });

type Ctx = {
  lines: CartLine[];
  count: number;
  add: (id: string, option?: string, qty?: number) => void;
  setQty: (id: string, option: string | undefined, qty: number) => void;
  remove: (id: string, option?: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  checkout: (lines: CartLine[], fromCart: boolean) => void;
};

const CartCtx = createContext<Ctx | null>(null);
export const useCart = () => useContext(CartCtx)!;

const same = (l: CartLine, id: string, option?: string) => l.id === id && (l.option ?? '') === (option ?? '');

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [receipt, setReceipt] = useState<{ lines: PricedLine[]; no: string; at: string } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* 저장 못 해도 화면은 정상 동작 */
    }
  }, [lines]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((id: string, option?: string, qty = 1) => {
    const g = goodsById(id);
    if (!g || g.soldOut) return;
    const opt = option ?? g.options?.values[0].label;
    setLines((ls) => (ls.some((l) => same(l, id, opt)) ? ls.map((l) => (same(l, id, opt) ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...ls, { id, option: opt, qty }]));
    setToast(`장바구니에 담았어요 · ${g.name}`);
  }, []);

  const setQty = useCallback((id: string, option: string | undefined, qty: number) => {
    setLines((ls) => ls.map((l) => (same(l, id, option) ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)));
  }, []);
  const remove = useCallback((id: string, option?: string) => setLines((ls) => ls.filter((l) => !same(l, id, option))), []);
  const clear = useCallback(() => setLines([]), []);

  /** "결제" — 영수증만 보여줌. 어떤 외부 요청도 보내지 않음 */
  const checkout = useCallback((ls: CartLine[], fromCart: boolean) => {
    const priced = priceLines(ls);
    if (!priced.length) return;
    const now = new Date();
    setReceipt({
      lines: priced,
      no: `DF-${now.getTime().toString().slice(-8)}`,
      at: now.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }),
    });
    setOpen(false);
    if (fromCart) setLines([]);
  }, []);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const value = useMemo(() => ({ lines, count, add, setQty, remove, clear, open, setOpen, checkout }), [lines, count, add, setQty, remove, clear, open, checkout]);

  return (
    <CartCtx.Provider value={value}>
      {children}
      <CartDrawer />
      <AnimatePresence>{receipt && <Receipt r={receipt} onClose={() => setReceipt(null)} />}</AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-[calc(68px+env(safe-area-inset-top,0px))] left-1/2 z-[70] max-w-[90vw] -translate-x-1/2 truncate rounded-full bg-navy px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg"
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </CartCtx.Provider>
  );
}

/* ───────── 헤더 장바구니 버튼 ───────── */
export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button onClick={() => setOpen(true)} aria-label={`장바구니 (${count}개)`} className="relative p-1.5 text-navy hover:text-brand">
      <ShoppingCart size={24} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#e60023] px-1 text-[11px] font-bold text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

/* ───────── 오른쪽 드로어 ───────── */
function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, clear, checkout } = useCart();
  const priced = priceLines(lines);
  const total = priced.reduce((s, l) => s + l.unit * l.qty, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/45" onClick={() => setOpen(false)} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="장바구니"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="text-[18px] font-bold">
                장바구니 <span className="text-brand">{priced.reduce((s, l) => s + l.qty, 0)}</span>
              </p>
              <button onClick={() => setOpen(false)} aria-label="닫기">
                <X />
              </button>
            </div>

            {priced.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center text-gray-500">
                <ShoppingCart size={40} className="text-gray-300" />
                <p className="text-[14px] font-semibold">장바구니가 비어 있어요</p>
                <p className="text-[12px]">스위스(같은 평창) 굿즈를 담아보세요.</p>
              </div>
            ) : (
              <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                {priced.map((l) => (
                  <li key={l.id + (l.option ?? '')} className="flex gap-3 py-4">
                    <GoodsImage g={l.goods} className="h-[72px] w-[72px] shrink-0" small />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-semibold">{l.goods.name}</p>
                      {l.option && <p className="text-[12px] text-gray-500">{l.goods.options?.name}: {l.option}</p>}
                      <div className="mt-2 flex items-center justify-between">
                        <Stepper value={l.qty} onChange={(q) => setQty(l.id, l.option, q)} />
                        <p className="text-[14px] font-bold">{(l.unit * l.qty).toLocaleString()} 양털</p>
                      </div>
                    </div>
                    <button onClick={() => remove(l.id, l.option)} aria-label={`${l.goods.name} 삭제`} className="self-start text-gray-500 hover:text-[#e60023]">
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-line bg-panel px-5 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] pt-4">
              <div className="flex items-end justify-between">
                <span className="text-[14px] font-semibold text-gray-600">총 결제 양털</span>
                <span className="text-right">
                  <b className="text-[22px] text-[#e60023]">{total.toLocaleString()} 양털</b>
                  <span className="block text-[11px] text-gray-500">= {won(total)} (가상)</span>
                </span>
              </div>
              <button disabled={!priced.length} onClick={() => checkout(lines, true)} className="btn-orange mt-3 h-[48px] w-full text-[16px] disabled:opacity-50">
                양털로 결제하기 »
              </button>
              {priced.length > 0 && (
                <button onClick={clear} className="mt-2 w-full text-[12px] text-gray-500 underline">
                  장바구니 비우기
                </button>
              )}
              <p className="mt-2 text-center text-[11px] text-gray-500">※ 실제 결제는 일어나지 않습니다 (과제)</p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center border border-[#cfcfcf] bg-white">
      <button onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="수량 빼기" className="flex h-7 w-7 items-center justify-center disabled:text-gray-300">
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-[13px] font-semibold" aria-live="polite">
        {value}
      </span>
      <button onClick={() => onChange(value + 1)} disabled={value >= 99} aria-label="수량 더하기" className="flex h-7 w-7 items-center justify-center disabled:text-gray-300">
        <Plus size={14} />
      </button>
    </div>
  );
}

/* ───────── 결제 완료(?) 영수증 (피그마 node 25:520) ───────── */
function Receipt({ r, onClose }: { r: { lines: PricedLine[]; no: string; at: string }; onClose: () => void }) {
  const total = r.lines.reduce((s, l) => s + l.unit * l.qty, 0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[65] flex items-start justify-center overflow-y-auto bg-black/55 px-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-label="결제 완료 영수증"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[360px]"
      >
        <div className="bg-white px-6 pb-6 pt-7 font-mono text-[13px] text-[#222] shadow-2xl">
          <p className="text-center font-sans text-[12px] font-bold tracking-[0.3em] text-brand">PYEONGS DUTY FREE</p>
          <p className="mt-1 text-center font-sans text-[22px] font-extrabold">결제 완료(?)</p>
          <p className="mt-1 text-center text-[11px] text-gray-500">
            {r.at} · No. {r.no}
          </p>
          <div className="my-4 border-t-2 border-dashed border-gray-300" />
          <ul className="space-y-2">
            {r.lines.map((l) => (
              <li key={l.id + (l.option ?? '')} className="flex justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate font-sans font-semibold">{l.goods.name}</span>
                  <span className="text-[11px] text-gray-500">
                    {l.option ? `${l.option} · ` : ''}
                    {l.unit} × {l.qty}
                  </span>
                </span>
                <span className="shrink-0 font-semibold">{(l.unit * l.qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="my-4 border-t-2 border-dashed border-gray-300" />
          <div className="flex justify-between">
            <span>배송비</span>
            <span>0</span>
          </div>
          <div className="mt-1 flex justify-between font-sans text-[17px] font-extrabold">
            <span>합계</span>
            <span className="text-[#e60023]">{total.toLocaleString()} 양털</span>
          </div>
          <div className="mt-1 flex justify-between text-[11px] text-gray-500">
            <span>원화 환산 (1 양털 = {WOOL_WON}원)</span>
            <span>{won(total)}</span>
          </div>
          <div className="flex justify-between text-[11px] text-gray-500">
            <span>결제수단</span>
            <span>양털 (가상)</span>
          </div>
          <div className="relative mt-5 flex items-center justify-center">
            <span className="-rotate-6 rounded border-[3px] border-[#d6001c] px-3 py-1 font-sans text-[15px] font-black tracking-wider text-[#d6001c] opacity-85">
              실제 결제 안 됨
            </span>
          </div>
          <p className="mt-4 text-center font-sans text-[11px] leading-relaxed text-gray-500">{SHOP.receiptNote}</p>
          <button onClick={onClose} className="btn-orange mt-5 h-[44px] w-full font-sans text-[15px]">
            확인
          </button>
        </div>
        {/* 영수증 아래 톱니 */}
        <svg viewBox="0 0 360 12" preserveAspectRatio="none" className="block h-3 w-full" aria-hidden>
          <path d={'M0 0 ' + Array.from({ length: 18 }, (_, i) => `L${i * 20 + 10} 12 L${i * 20 + 20} 0`).join(' ') + ' Z'} fill="#fff" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
