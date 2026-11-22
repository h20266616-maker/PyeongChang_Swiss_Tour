import { forwardRef, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BusFront, Download, RotateCcw, X } from 'lucide-react';
import { PASS } from '../content';

export type TicketData = {
  name: string;
  from: string;
  course: string; // 예: 입문 코스 (1박2일)
  date: string;
  grade: string;
  bookingNo: string;
};

export const makeBookingNo = () => {
  const L = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const n = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0');
  return `PS-${n}-${L[Math.floor(Math.random() * L.length)]}${L[Math.floor(Math.random() * L.length)]}`;
};

const Instagram = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/* ───────── 바코드 (예약번호로 항상 같은 모양) ───────── */
function Barcode({ value, height = 38, className = '' }: { value: string; height?: number; className?: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  let h = 2166136261;
  for (let i = 0; i < 56; i++) {
    h = Math.imul(h ^ value.charCodeAt(i % value.length) ^ i, 16777619);
    const w = 1 + (Math.abs(h) % 3);
    if (i % 2 === 0) bars.push({ x, w });
    x += w + (Math.abs(h >> 3) % 2);
  }
  return (
    <svg viewBox={`0 0 ${x} ${height}`} preserveAspectRatio="none" className={className} height={height} aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={height} fill="#111" />
      ))}
    </svg>
  );
}

/* ───────── "평창 확정" 도장 ───────── */
function Stamp() {
  return (
    <div className="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full border-[3px] border-[#d6001c] text-[#d6001c] opacity-90 outline outline-2 outline-offset-[3px] outline-[#d6001c] sm:h-[96px] sm:w-[96px] sm:border-[4px] md:h-[104px] md:w-[104px]">
      <span className="text-[8px] font-extrabold tracking-[0.2em] sm:text-[9px]">PYEONGS</span>
      <span className="text-[18px] font-black leading-none sm:text-[22px] md:text-[25px]">평창</span>
      <span className="text-[18px] font-black leading-none sm:text-[22px] md:text-[25px]">확정</span>
      <span className="text-[8px] font-bold tracking-wider">CONFIRMED</span>
    </div>
  );
}

/* ───────── 티켓 컴포넌트 (피그마 node 21:217): 본권 + 절취선 + 하늘색 꼬리표 ───────── */
export const Ticket = forwardRef<HTMLDivElement, { t: TicketData; stamped: boolean; notch?: string }>(function Ticket({ t, stamped, notch = '#141c4d' }, ref) {
  const fields: [string, string, string][] = [
    ['승객', 'PASSENGER', t.name || '익명의 여행자'],
    ['코스', 'COURSE', t.course],
    ['출발일', 'DEPARTURE', t.date],
    ['등급', 'CLASS', `${t.grade} (혜택 동일)`],
  ];
  return (
    <div ref={ref} className="relative flex w-full flex-col overflow-hidden rounded-lg bg-white text-[#111] shadow-[0_10px_30px_rgba(0,0,0,.35)] sm:flex-row">
      {/* 본권 */}
      <div className="relative flex-1">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#1f6fb5] to-[#3fc6d8] px-4 py-2 text-white md:px-5">
          <span className="text-[12px] font-extrabold tracking-wide md:text-[13px]">PyeongS Travel · BOARDING PASS</span>
          <span className="text-[11px] font-semibold opacity-90">평스투어 탑승권</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1.2fr] items-center gap-2 px-4 pt-4 md:px-5">
          <div>
            <p className="text-[10px] font-semibold text-gray-500">FROM</p>
            <p className="text-[17px] font-extrabold leading-tight md:text-[20px]">{t.from}</p>
          </div>
          <BusFront className="text-brand" size={20} />
          <div className="text-right">
            <p className="text-[10px] font-semibold text-gray-500">TO</p>
            <p className="text-[14px] font-extrabold text-gray-300 line-through decoration-[#d6001c] decoration-[3px] md:text-[16px]">SWITZERLAND</p>
            <p className="text-[19px] font-extrabold leading-tight text-brand md:text-[22px]">{PASS.realDest}</p>
            <p className="text-[10px] text-gray-500">{PASS.realDestKo}</p>
          </div>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 px-4 text-[12px] sm:w-[64%] md:px-5">
          {fields.map(([ko, en, v]) => (
            <div key={en}>
              <dt className="text-[9px] font-bold tracking-wider text-gray-500">
                {en} · {ko}
              </dt>
              <dd className="font-bold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex items-end justify-between gap-3 px-4 pb-4 md:px-5">
          <div>
            <p className="text-[9px] font-bold tracking-wider text-gray-500">BOOKING NO. · 예약번호</p>
            <p className="font-mono text-[15px] font-bold tracking-wider">{t.bookingNo}</p>
          </div>
          <Barcode value={t.bookingNo} className="w-[150px] md:w-[190px]" />
        </div>

        <AnimatePresence>
          {stamped && (
            <motion.div
              key="stamp"
              initial={{ scale: 3, opacity: 0, rotate: -40 }}
              animate={{ scale: 1, opacity: 1, rotate: -14 }}
              transition={{ type: 'spring', stiffness: 520, damping: 18 }}
              className="pointer-events-none absolute bottom-[2%] right-[3%] sm:bottom-auto sm:right-[6%] sm:top-[42%]"
            >
              <Stamp />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 절취선 (구멍 두 개 + 점선) */}
      <div className="relative h-0 border-t-2 border-dashed border-[#bcd7ea] sm:h-auto sm:w-0 sm:border-l-2 sm:border-t-0">
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full sm:-left-[9px] sm:-top-2" style={{ background: notch }} />
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full sm:-bottom-2 sm:-left-[9px] sm:right-auto sm:top-auto" style={{ background: notch }} />
      </div>

      {/* 꼬리표 */}
      <div className="flex flex-col justify-between gap-2 bg-[#dff1fb] px-4 py-3 sm:w-[170px] md:w-[180px]">
        <div>
          <p className="text-[11px] font-extrabold tracking-wide text-navy">PyeongS Travel</p>
          <p className="mt-1 text-[14px] font-bold">{t.name || '익명의 여행자'}</p>
          <p className="text-[11px] font-semibold text-gray-600">{t.course}</p>
          <p className="text-[11px] font-semibold text-gray-600">{t.date}</p>
        </div>
        <div className="flex items-center justify-between gap-2 sm:block">
          <p className="font-mono text-[11px] font-bold">{t.bookingNo}</p>
          <Barcode value={t.bookingNo + 'stub'} height={26} className="w-[110px] sm:mt-1 sm:w-full" />
        </div>
      </div>
    </div>
  );
});

/* ───────── 이미지/PDF 만들기 ───────── */
async function ticketPng(node: HTMLElement) {
  const { toPng } = await import('html-to-image');
  return toPng(node, { pixelRatio: 2, cacheBust: true });
}

function loadImg(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });
}

/** 티켓 이미지를 배경 위에 올린 캔버스 (PDF: 흰 A4 가로, 스토리: 남색 9:16) */
async function compose(src: string, kind: 'pdf' | 'story', course: string) {
  const img = await loadImg(src);
  const [W, H] = kind === 'pdf' ? [2480, 1754] : [1080, 1920];
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  const font = (w: number, s: number) => `${w} ${s}px Pretendard, "Malgun Gothic", sans-serif`;
  g.fillStyle = kind === 'pdf' ? '#ffffff' : '#141c4d';
  g.fillRect(0, 0, W, H);
  const maxW = kind === 'pdf' ? 2100 : 960;
  const maxH = kind === 'pdf' ? 1150 : 1250;
  const s = Math.min(maxW / img.width, maxH / img.height);
  const w = img.width * s;
  const h = img.height * s;
  const x = (W - w) / 2;
  const y = kind === 'pdf' ? 330 : (H - h) / 2 + 40;
  g.textAlign = 'center';
  if (kind === 'pdf') {
    g.fillStyle = '#1d2a6b';
    g.font = font(800, 80);
    g.fillText('평스투어 탑승권 (BOARDING PASS)', W / 2, 170);
    g.fillStyle = '#2a6db5';
    g.font = font(700, 52);
    g.fillText(course, W / 2, 255);
    g.drawImage(img, x, y, w, h);
    g.fillStyle = '#666';
    g.font = font(500, 40);
    g.fillText(PASS.note, W / 2, y + h + 110);
    g.fillText(`${PASS.route} · ${PASS.duration} · ${PASS.fare}`, W / 2, y + h + 175);
  } else {
    g.fillStyle = '#ffd84d';
    g.font = font(800, 44);
    g.fillText('평스투어 자동발권기', W / 2, y - 120);
    g.fillStyle = '#ffffff';
    g.font = font(800, 64);
    g.fillText('스위스 가려다 평창 확정', W / 2, y - 40);
    g.drawImage(img, x, y, w, h);
    g.fillStyle = 'rgba(255,255,255,.75)';
    g.font = font(600, 34);
    g.fillText('pyeong-chang-swiss-tour.vercel.app', W / 2, y + h + 110);
  }
  return c;
}

function download(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ───────── 발권 완료 화면 (피그마 node 21:313) ───────── */
export function TicketingModal({ t, onClose, onReissue }: { t: TicketData; onClose: () => void; onReissue: () => void }) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(false);
  const [busy, setBusy] = useState<'' | 'pdf' | 'story'>('');
  const [msg, setMsg] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const savePdf = async () => {
    if (!ref.current) return;
    setBusy('pdf');
    setMsg('');
    try {
      const canvas = await compose(await ticketPng(ref.current), 'pdf', t.course);
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 297, 210);
      pdf.save(`평스투어_탑승권_${t.bookingNo}.pdf`);
    } catch {
      setMsg('PDF 저장에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setBusy('');
    }
  };

  const shareStory = async () => {
    if (!ref.current) return;
    setBusy('story');
    setMsg('');
    try {
      const canvas = await compose(await ticketPng(ref.current), 'story', t.course);
      const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), 'image/png'));
      const file = new File([blob], `평스투어_스토리_${t.bookingNo}.png`, { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: '평스투어 탑승권' });
      } else {
        const url = URL.createObjectURL(blob);
        download(url, file.name);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setMsg('스토리용 이미지를 저장했어요. 인스타그램 스토리에 올려주세요!');
      }
    } catch (e) {
      if ((e as Error)?.name !== 'AbortError') setMsg('이미지 만들기에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setBusy('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#141c4d] text-white"
      role="dialog"
      aria-modal="true"
      aria-label="발권 완료"
    >
      <button onClick={onClose} aria-label="닫기" className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
        <X size={24} />
      </button>

      <div className="mx-auto flex min-h-full max-w-[720px] flex-col items-center px-4 pb-10 pt-12">
        <p className="text-[13px] font-semibold tracking-[0.3em] text-[#9fb3ff]">TICKET ISSUED</p>
        <h2 className="mt-1 text-[24px] font-extrabold md:text-[30px]">발권이 완료되었습니다</h2>

        {/* 발권기 */}
        <div className="relative z-10 mt-6 w-full max-w-[680px] rounded-xl bg-gradient-to-b from-[#3a4690] to-[#26306b] px-5 pb-4 pt-3 shadow-[0_8px_20px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.25)]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-extrabold tracking-wide text-[#ffd84d]">평스투어 자동발권기</span>
            <span className="flex gap-1.5" aria-hidden>
              <span className={`h-2.5 w-2.5 rounded-full ${out ? 'bg-[#46e05a]' : 'animate-pulse bg-[#ffb020]'}`} />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-[#05081c] shadow-[inset_0_2px_4px_rgba(0,0,0,.9)]" />
        </div>

        {/* 구멍 아래로 내려오는 티켓 */}
        <div className="-mt-2 w-full max-w-[640px] overflow-hidden px-1 pb-6">
          <motion.div
            initial={{ y: '-102%' }}
            animate={{ y: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.35, ease: [0.25, 0.8, 0.3, 1] }}
            onAnimationComplete={() => setTimeout(() => setOut(true), reduce ? 0 : 150)}
          >
            <Ticket ref={ref} t={t} stamped={out} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={out ? { opacity: 1, y: 0 } : {}} className="flex w-full max-w-[640px] flex-col items-center">
          <div className="grid w-full gap-2 sm:grid-cols-3">
            <button onClick={savePdf} disabled={!!busy} className="btn-orange flex h-[46px] items-center justify-center gap-1.5 text-[15px] disabled:opacity-60">
              <Download size={17} /> {busy === 'pdf' ? '만드는 중…' : '탑승권 PDF 저장'}
            </button>
            <button
              onClick={shareStory}
              disabled={!!busy}
              className="flex h-[46px] items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-[#f9a43a] via-[#e1306c] to-[#833ab4] text-[15px] font-bold shadow disabled:opacity-60"
            >
              <Instagram size={17} /> {busy === 'story' ? '만드는 중…' : '인스타 스토리 공유'}
            </button>
            <button onClick={onReissue} className="flex h-[46px] items-center justify-center gap-1.5 rounded-md border border-white/40 text-[15px] font-bold hover:bg-white/10">
              <RotateCcw size={17} /> 다시 발권하기
            </button>
          </div>
          {msg && (
            <p role="status" className="mt-3 text-[13px] font-semibold text-[#ffd84d]">
              {msg}
            </p>
          )}
          <p className="mt-5 text-center text-[12px] text-white/60">{PASS.note}</p>
          <a href="/#info" onClick={onClose} className="mt-1 text-[13px] font-semibold text-[#9fd2f3] underline">
            진짜로 가는 법 보기 »
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
