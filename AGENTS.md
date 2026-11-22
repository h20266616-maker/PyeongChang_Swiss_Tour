# PyeongChang_Swiss_Tour — 에이전트 작업 가이드

안티그래비티(또는 다른 코딩 에이전트)가 이 프로젝트를 이어서 작업할 때 먼저 읽는 파일.

## 프로젝트
- 한림대 디자인씽킹 6조 「테무산 스위스」 텀과제의 **가상 여행사 웹사이트 "평스투어(PyeongS Travel)"**
- 컨셉: 스위스를 동결건조해서 옮겨놓은 평창. 저가 패키지 여행사 패러디. "스위스인 줄 알았는데 평창" 반전 → 진짜 평창 장점과 실제 교통 정보로 마무리
- 기획 근거·사용성 평가 계획: `PLAN.md`

## 디자인 원칙 (꼭 지킬 것)
- 레퍼런스는 **kiiikiii.kr** (키키 컴백 여행사 사이트). 2000년대 진짜 여행사 홈페이지를 **정색하고** 따라 하는 톤
  - 흰 배경, 큰 풍경 사진, 주황 광택 버튼(`.btn-orange`), 초록 알약 버튼(`.btn-green`), 신뢰 배지, 반사 효과 타이틀(`.reflect`), 회색 카드 + 그림자(`.card-shadow`)
  - 섹션 제목은 "검정 + **파랑 포인트 단어**" (`SectionTitle` 컴포넌트)
- **하지 말 것**: 네온/다크 테마, 그라데이션 블롭, 글래스모피즘, 이모지 남발 같은 "AI 웹사이트" 스타일
- B급은 디자인이 아니라 **문구**로: 진지한 여행사 말투 + 엉뚱한 내용
- 평창을 조롱하는 느낌이 나면 안 됨 (회의 결론)

## 스택
React 19 · TypeScript · Vite 6 · Tailwind v4 (`@tailwindcss/vite`) · motion · lucide-react
- `npm install` → `npm run dev` (포트 3000, host 0.0.0.0) → `npm run build`
- 색·폰트 토큰: `src/index.css`의 `@theme`

## 파일 구조
| 파일 | 내용 |
|---|---|
| `src/content.ts` | **모든 문구·데이터** (코스 `COURSES`, 시즌 한정 `SEASON_EXTRAS`, 홈쇼핑 `HOMESHOPPING`, 리뷰, 교통, 비교표). 문구 수정은 여기만 |
| `src/config.ts` | 팀원 결과물 링크 (아리 홈쇼핑 영상 `HOMESHOPPING_VIDEO_ID`, 도연 인스타, 은빈 전시 사이트, 평가 구글폼), 캐릭터 이미지 경로, 마스코트 표기 |
| `src/router.ts` | 라이브러리 없는 간단 라우팅 (`/`, `/tour/intro`, `/tour/master`). Vercel은 `vercel.json` rewrite |
| `src/components/HomeShopping.tsx` | 헤더 바로 아래 홈쇼핑 영상 섹션 (피그마 18:197) |
| `src/components/Hero.tsx` | 예매 카드 (코스 선택 포함, 피그마 3:73) |
| `src/components/Ticketing.tsx` | 티켓 컴포넌트(21:217) + 발권기 애니메이션 화면(21:313), PDF 저장·인스타 스토리 이미지 |
| `src/components/Shop.tsx` | 굿즈샵 목록 `/duty-free`(6:197), 굿즈 상세 `/duty-free/:id`(25:359), 굿즈 카드(2:39). 상품 데이터는 `content.ts`의 `GOODS` (임시값) |
| `src/cart.tsx` | 장바구니 context + localStorage, 헤더 장바구니 버튼, 오른쪽 드로어, 결제 완료(?) 영수증(25:520). **실제 결제 없음** |
| `src/components/SpotPage.tsx` | 투어 개별 페이지 `/spot/:id` (키키의 Start Tour 페이지). 데이터는 `content.ts`의 `TOURS` (코스 장소 기준 7개, 가이드 = 팀원) |
| `src/components/KakaoMap.tsx` | Map of PyeongSwiss 카카오맵 실제 지도 (코스별 핀·동선). 장소 목록은 `content.ts`의 `MAP_ROUTES` (`query` 비어 있으면 "장소 확정 전") |
| `src/components/CoursePage.tsx` | 코스 상세 페이지 (입문 20:166 / 정복 20:422) |
| `src/components/Tours.tsx` | 투어 코스 카드 섹션(19:197), Duty Free 배너, Tour Guides 슬라이드. 구버전 Schedule 캐러셀은 코드만 남기고 숨김 |
| `src/components/Rest.tsx` | Map, Partners, Travel Info(실제 교통+비교), Reviews, Polaroids, Footer |
| `src/components/Common.tsx` | SectionTitle, Logo, Pin, WeatherIcon, TrustBadges |
| `public/photos/` | 평창 실제 사진 (Wikimedia Commons, CC). 출처는 `src/credits.json` → 푸터에 자동 표기 |

## 규칙
- 교통·기온 등 **사실 정보는 지어내지 말 것**. 바꿀 때는 출처 확인 후 `content.ts`에 반영
- 사진 교체 시 같은 파일명으로 덮어쓰기. 새 CC 사진을 쓰면 `credits.json`에 출처 추가 (팀이 직접 찍은 사진이면 credits에서 해당 항목 삭제)
- 리뷰는 실제 인터뷰 발췌만 사용 (가짜 후기 금지)
- 푸터의 "실존하지 않는 여행사 / 과제" 고지는 지우지 말 것

## 남은 작업 (TODO)
- [x] 곤드레곤 캐릭터 삭제 (마스코트는 대괄양 하나)
- [ ] 성민 캐릭터(대괄양) 이미지 → `public/characters/` + `config.ts`
- [x] 마스코트 표기 확정: **대괄양** → `config.ts`의 `MASCOT_NAME`
- [ ] 아리 홈쇼핑 영상 유튜브 ID → `config.ts`의 `HOMESHOPPING_VIDEO_ID`, 평가 구글폼 링크 → `EVAL_FORM_URL`
- [x] 피그마 반영 (홈쇼핑 영상, 투어 코스, 코스 상세, 코스 선택, 발권 애니메이션) — 피그마 https://www.figma.com/design/F172HJ7ss055cTetZwdlPh
- [x] 굿즈샵 (목록·상세·장바구니·영수증)
- [x] 카카오맵 실제 지도. 키는 Vercel 환경변수 `VITE_KAKAO_MAP_KEY` (로컬은 `.env.local`, 깃에 안 올림). 카카오 앱의 JavaScript SDK 도메인에 사이트 주소 등록돼 있어야 함
- [x] 숙소·치즈·배추 확정 (평창 스위스마을 / 바람마을 치즈체험장 / 대관령 수레마을)
- [x] 교통 시간표·요금 재확인 (2026-11-23 조회: KTX 청량리→평창 18,000원 1시간 10~20분 하루 약 14회 / 동서울→장평 우등 14,800원 약 1시간 50분 하루 8회)
- [x] 패키지 이동수단 = 왕복 전용 버스로 통일 (KTX·시외버스는 Travel Info "따로 가는 법")
- [x] 한글 로고 = 스티커 시안에서 추출한 `public/logo/pyeongs-tour.png` (원본 SVG 받으면 교체)
- [x] 인스타 @donggyeol_pyeongchang (`config.ts` INSTAGRAM_ID)
- [ ] 사용성 평가 구글폼 → `config.ts`의 `EVAL_FORM_URL` (넣으면 우측 하단 "평가하기" 버튼 생김, 비면 숨김)
- [ ] 여름 사진으로 교체 (지금 겨울 사진 많음: samyangranch, skijump, alpensia)
- [x] 굿즈: 성민 시안 9종 반영 (public/goods/). 가격은 임시값 → `content.ts`의 `GOODS` price
- [x] 대괄양 캐릭터 = 인형 시안 사진 (`config.ts` CHARACTER_IMAGES)
- [ ] 겨울 사진(풍차 언덕, 올림픽 레거시) → 여름 사진으로 교체
- [ ] 곤드레밥 실제 사진 (지금은 말린 곤드레 나물)
- [ ] 발표 전 교통 시간표 재확인
- [x] Vercel 배포 → https://pyeong-chang-swiss-tour.vercel.app (main에 push하면 자동 재배포)
