import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { KAKAO_MAP_KEY } from '../config';
import { MAP_ROUTES, TOURS, type MapRoute, type MapSpot } from '../content';
import { navigate } from '../router';

/** 지도 장소 → 투어 페이지(/spot/:id) 연결 (키키의 Tour Now) */
const TOUR_OF: Record<string, string> = { pension: 'stars' };
const tourFor = (spotId: string) => TOURS.find((t) => t.id === (TOUR_OF[spotId] ?? spotId));
import { Pin } from './Common';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao?: any;
  }
}

type LatLng = { lat: number; lng: number; address: string; placeUrl: string };

/** 카카오 검색 결과(외부 데이터)를 innerHTML에 넣기 전에 이스케이프 */
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// ───────── SDK 로더 (한 번만) ─────────
let sdkPromise: Promise<any> | null = null;
function loadKakao(): Promise<any> {
  if (window.kakao?.maps?.services) return Promise.resolve(window.kakao);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(KAKAO_MAP_KEY)}&autoload=false&libraries=services`;
    s.async = true;
    s.onload = () => {
      try {
        window.kakao.maps.load(() => resolve(window.kakao));
      } catch (e) {
        reject(e);
      }
    };
    s.onerror = () => reject(new Error('kakao sdk load failed'));
    document.head.appendChild(s);
  }).catch((e) => {
    sdkPromise = null;
    throw e;
  });
  return sdkPromise;
}

// ───────── 장소검색 결과 캐시 (좌표는 카카오에서 받아옴, 지어내지 않음) ─────────
const CACHE_KEY = 'ps:kakao-places:v1';
const memCache: Record<string, LatLng | null> = (() => {
  try {
    return JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
})();
function saveCache() {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(memCache));
  } catch {
    /* 저장 안 돼도 동작에는 문제 없음 */
  }
}

function searchPlace(kakao: any, query: string): Promise<LatLng | null> {
  if (query in memCache) return Promise.resolve(memCache[query]);
  return new Promise((resolve) => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(query, (data: any[], status: string) => {
      let hit: LatLng | null = null;
      if (status === kakao.maps.services.Status.OK) {
        // 평창군 결과 우선 → 없으면 강원. 다른 지역 동명 장소는 핀 안 찍음 (엉뚱한 위치 방지)
        const pick = data.find((d) => d.address_name?.includes('평창군')) || data.find((d) => d.address_name?.startsWith('강원'));
        if (pick) hit = { lat: Number(pick.y), lng: Number(pick.x), address: pick.road_address_name || pick.address_name, placeUrl: pick.place_url };
      }
      memCache[query] = hit;
      saveCache();
      resolve(hit);
    });
  });
}

const kakaoLink = (s: MapSpot, p?: LatLng | null) =>
  p ? `https://map.kakao.com/link/map/${encodeURIComponent(s.name)},${p.lat},${p.lng}` : `https://map.kakao.com/link/search/${encodeURIComponent(s.query || s.name)}`;

function pinHtml(n: number, color: string, active: boolean) {
  const size = active ? 36 : 30;
  return `<div style="transform:translate(-50%,-100%);cursor:pointer;filter:drop-shadow(0 2px 2px rgba(0,0,0,.3))">
    <svg width="${size}" height="${size * 1.3}" viewBox="0 0 30 39"><path d="M15 38 C 15 38 2 22 2 14 a13 13 0 0 1 26 0 c0 8 -13 24 -13 24z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <text x="15" y="19" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" font-family="Pretendard, sans-serif">${n}</text></svg></div>`;
}

// ───────── 메인 ─────────
export function KakaoTourMap({ fallback }: { fallback: ReactNode }) {
  const [routeId, setRouteId] = useState<MapRoute['id']>('intro');
  const route = useMemo(() => MAP_ROUTES.find((r) => r.id === routeId)!, [routeId]);
  const [coords, setCoords] = useState<Record<string, LatLng | null>>({});
  const [active, setActive] = useState<string | null>(null);
  const [state, setState] = useState<'nokey' | 'loading' | 'ready' | 'error'>(KAKAO_MAP_KEY ? 'loading' : 'nokey');

  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any[]>([]);
  const infoRef = useRef<any>(null);

  // SDK + 지도 생성
  useEffect(() => {
    if (!KAKAO_MAP_KEY) return;
    let dead = false;
    loadKakao()
      .then((kakao) => {
        if (dead || !boxRef.current) return;
        mapRef.current = new kakao.maps.Map(boxRef.current, { center: new kakao.maps.LatLng(37.62, 128.6), level: 10 });
        mapRef.current.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
        setState('ready');
      })
      .catch(() => !dead && setState('error'));
    return () => {
      dead = true;
    };
  }, []);

  // 코스 바뀌면 장소 좌표 검색
  useEffect(() => {
    if (state !== 'ready') return;
    const kakao = window.kakao;
    let dead = false;
    Promise.all(route.spots.filter((s) => s.query).map(async (s) => [s.query, await searchPlace(kakao, s.query)] as const)).then((res) => {
      if (dead) return;
      setCoords((prev) => ({ ...prev, ...Object.fromEntries(res) }));
    });
    return () => {
      dead = true;
    };
  }, [state, route]);

  // 핀·동선 그리기
  useEffect(() => {
    if (state !== 'ready') return;
    const kakao = window.kakao;
    const map = mapRef.current;
    layerRef.current.forEach((o) => o.setMap(null));
    layerRef.current = [];
    infoRef.current?.setMap(null);

    const path: any[] = [];
    const bounds = new kakao.maps.LatLngBounds();
    const seen = new Set<string>();
    route.spots.forEach((s, i) => {
      const p = s.query ? coords[s.query] : null;
      if (!p) return;
      const pos = new kakao.maps.LatLng(p.lat, p.lng);
      path.push(pos);
      bounds.extend(pos);
      const key = `${p.lat},${p.lng}`;
      if (seen.has(key)) return; // 같은 장소 두 번(시즌) → 핀 하나
      seen.add(key);
      const el = document.createElement('div');
      el.innerHTML = pinHtml(i + 1, route.color, active === s.id);
      el.onclick = () => setActive(s.id);
      const ov = new kakao.maps.CustomOverlay({ position: pos, content: el, yAnchor: 0, zIndex: active === s.id ? 3 : 1 });
      ov.setMap(map);
      layerRef.current.push(ov);
    });
    if (route.id !== 'season' && path.length > 1) {
      const line = new kakao.maps.Polyline({ path, strokeWeight: 4, strokeColor: route.color, strokeOpacity: 0.75, strokeStyle: 'shortdash' });
      line.setMap(map);
      layerRef.current.push(line);
    }
    if (!active && path.length) map.setBounds(bounds, 60, 60, 60, 60);
  }, [state, route, coords, active]);

  // 선택한 장소로 이동 + 말풍선
  useEffect(() => {
    if (state !== 'ready' || !active) return;
    const kakao = window.kakao;
    const s = route.spots.find((x) => x.id === active);
    const p = s?.query ? coords[s.query] : null;
    infoRef.current?.setMap(null);
    if (!s || !p) return;
    const pos = new kakao.maps.LatLng(p.lat, p.lng);
    mapRef.current.setLevel(6);
    mapRef.current.panTo(pos);
    const el = document.createElement('div');
    el.innerHTML = `<div style="transform:translate(-50%,calc(-100% - 52px));background:#fff;border:1px solid #e3e3e3;box-shadow:0 3px 8px rgba(0,0,0,.18);padding:10px 14px;font-family:Pretendard,sans-serif;min-width:200px">
      <p style="font-size:11px;color:${route.color};font-weight:700;margin:0">${esc(s.when)}</p>
      <p style="font-size:15px;font-weight:700;margin:2px 0">${esc(s.name)}</p>
      <p style="font-size:12px;color:#555;margin:0">${esc(p.address)}</p>
      <a href="${esc(kakaoLink(s, p))}" target="_blank" rel="noreferrer" style="display:inline-block;margin-top:6px;font-size:12px;color:#2a6db5;font-weight:700">카카오맵에서 길찾기 »</a></div>`;
    infoRef.current = new kakao.maps.CustomOverlay({ position: pos, content: el, yAnchor: 0, zIndex: 5 });
    infoRef.current.setMap(mapRef.current);
  }, [state, active, route, coords]);

  const switchRoute = (id: MapRoute['id']) => {
    setActive(null);
    setRouteId(id);
  };

  return (
    <div className="mx-auto max-w-[1160px]">
      {/* 코스 탭 */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {MAP_ROUTES.map((r) => (
          <button
            key={r.id}
            onClick={() => switchRoute(r.id)}
            className={`rounded-full border px-5 py-2 text-[14px] font-semibold transition ${routeId === r.id ? 'border-navy bg-navy text-white' : 'border-line bg-white text-gray-600 hover:border-navy'}`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[440px_1fr]">
        {/* 목록 */}
        <div className="order-2 max-h-[380px] overflow-y-auto border border-line lg:order-1 lg:max-h-[560px]">
          <p className="sticky top-0 z-10 border-b border-line bg-panel px-5 py-3 text-[15px] font-semibold">
            Location <span className="text-[12px] font-normal text-gray-500">· 이번엔 진짜 위치입니다</span>
          </p>
          {route.spots.map((s, i) => {
            const p = s.query ? coords[s.query] : undefined;
            const tbd = !s.query;
            return (
              <div
                key={`${route.id}-${s.id}-${i}`}
                role={tbd ? undefined : 'button'}
                tabIndex={tbd ? -1 : 0}
                onClick={() => !tbd && setActive(s.id)}
                onKeyDown={(e) => !tbd && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActive(s.id))}
                className={`flex cursor-pointer items-center gap-3 px-5 py-2.5 ${active === s.id ? 'bg-[#eaf4fc]' : i % 2 ? 'bg-panel' : 'bg-white'} ${tbd ? 'cursor-default opacity-70' : ''}`}
              >
                <Pin n={i + 1} color={tbd ? '#9aa0a6' : route.color} size={22} />
                <div className="min-w-0 flex-1 text-[13px] leading-tight">
                  <p className="text-[11px] font-semibold" style={{ color: tbd ? '#9aa0a6' : route.color }}>
                    {s.when}
                  </p>
                  <p className="text-[15px] font-semibold">{s.name}</p>
                  <p className="truncate text-gray-500">{tbd ? '장소 확정 전 (업체 정해지면 지도에 표시)' : p ? p.address : s.desc}</p>
                </div>
                {tourFor(s.id) && (
                  <a
                    href={`/spot/${tourFor(s.id)!.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      navigate(`/spot/${tourFor(s.id)!.id}`);
                    }}
                    className="hidden shrink-0 text-[12px] font-bold text-brand underline sm:block"
                  >
                    Tour Now
                  </a>
                )}
                {!tbd && (
                  <a
                    href={kakaoLink(s, p)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-orange flex shrink-0 items-center gap-1 px-3 py-1.5 text-[12px]"
                  >
                    길찾기 <ExternalLink size={12} />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* 지도 */}
        {state === 'nokey' || state === 'error' ? (
          <div className="relative order-1 lg:order-2">
            {fallback}
            <p className="absolute inset-x-3 bottom-3 flex items-center gap-1.5 bg-white/90 px-3 py-2 text-[12px] text-gray-600">
              <MapPin size={14} />
              {state === 'nokey' ? '실제 지도 준비 중 — 목록의 "길찾기"로 카카오맵에서 위치를 볼 수 있어요.' : '지도를 불러오지 못했어요. 목록의 "길찾기"를 이용해 주세요.'}
            </p>
          </div>
        ) : (
          <div className="relative order-1 min-h-[360px] border border-line lg:order-2 lg:min-h-[560px]">
            <div ref={boxRef} className="absolute inset-0" />
            {state === 'loading' && <p className="absolute inset-0 flex items-center justify-center text-[13px] text-gray-500">지도 불러오는 중…</p>}
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-[12px] text-gray-500">
        ※ 위치는 카카오맵 장소검색 결과입니다. 실제 방문 전 각 장소 운영시간·예약 여부를 확인하세요.
      </p>
    </div>
  );
}
