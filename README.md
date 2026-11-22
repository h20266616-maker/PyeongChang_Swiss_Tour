# PyeongChang_Swiss_Tour — 평스투어 여행사 웹사이트

디자인씽킹 6조 「테무산 스위스」 · 여행사 웹사이트 (채빈)
기획 근거와 사용성 평가 계획은 `PLAN.md` 참고.

## 안티그래비티에서 열기

1. 압축 풀고 `PyeongChang_Swiss_Tour` 폴더를 안티그래비티에서 **Open Folder**
2. 터미널에서 `npm install` → `npm run dev` → http://localhost:3000
3. 에이전트한테 작업 시킬 때는 먼저 "AGENTS.md 읽고 시작해"라고 하면 디자인 원칙·파일 구조·TODO를 알고 시작함

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # dist/ 생성 → Vercel에 그대로 배포 가능
```

스택: React 19 · TypeScript · Vite 6 · Tailwind v4 · motion · lucide-react

## 어디를 고치면 되나

| 바꿀 것 | 파일 |
|---|---|
| 문구 전부 (부제, 일정, 비교표, 후기 등) | `src/content.ts` |
| 아리 영상 / 인스타 / 전시 사이트 / 평가 구글폼 링크 | `src/config.ts` |
| 성민 캐릭터·굿즈 이미지 | `public/characters/`, `public/goods/`에 넣고 `src/config.ts`에 경로 |
| 마스코트 표기 (확정: 대괄양) | `src/config.ts` → `MASCOT_NAME` |
| 키컬러 (청록 미확정) | `src/index.css` → `@theme` |

## 디자인 방향

키키(kiiikiii.kr)처럼 **2000년대 진짜 여행사 홈페이지를 정색하고 따라 하는 톤**: 흰 배경, 휴양지 스톡사진, 주황 광택 버튼, 신뢰 배지, 반사 효과 타이틀, 섬 일러스트 지도, 폴라로이드. 사진은 전부 실제 평창 사진(Wikimedia Commons, CC 라이선스 · 출처는 푸터 '사진 출처'에 표기). 팀이 직접 찍은 사진이 생기면 `public/photos/`에서 같은 파일명으로 교체.

## 섹션 구성 (키키 사이트 구조 대응)

히어로 예매카드(book ticket now! → 탑승권에서 SWITZERLAND → PYEONGCHANG) → Schedule 캐러셀 7개 플랜 → (직구) Duty Free 배너 → Tour Guides 액자 슬라이드(팀원이 가이드) → Map of PyeongSwiss → Our Partners(팀원 로고) → Travel Info(실제 교통 + 진짜 스위스 비교) → Honest Reviews(인터뷰 발췌) → “One Night, Zero Flights” 폴라로이드 → 푸터

교통·기온 정보는 2026년 조회값이라 발표 전에 다시 확인할 것.
