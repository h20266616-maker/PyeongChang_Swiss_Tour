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
| `src/content.ts` | **모든 문구·데이터** (투어 7개, 리뷰, 교통, 비교표). 문구 수정은 여기만 |
| `src/config.ts` | 팀원 결과물 링크 (아리 영상, 도연 인스타, 은빈 전시 사이트, 평가 구글폼), 캐릭터 이미지 경로, 마스코트 표기 |
| `src/components/Hero.tsx` | 예매 카드 + 탑승권 모달 (SWITZERLAND → PYEONGCHANG 반전) |
| `src/components/Tours.tsx` | Schedule 캐러셀, 투어 상세 모달, Duty Free 배너, Tour Guides 슬라이드 |
| `src/components/Rest.tsx` | Map, Partners, Travel Info(실제 교통+비교), Reviews, Polaroids, Footer |
| `src/components/Common.tsx` | SectionTitle, Logo, Pin, WeatherIcon, TrustBadges |
| `public/photos/` | 평창 실제 사진 (Wikimedia Commons, CC). 출처는 `src/credits.json` → 푸터에 자동 표기 |

## 규칙
- 교통·기온 등 **사실 정보는 지어내지 말 것**. 바꿀 때는 출처 확인 후 `content.ts`에 반영
- 사진 교체 시 같은 파일명으로 덮어쓰기. 새 CC 사진을 쓰면 `credits.json`에 출처 추가 (팀이 직접 찍은 사진이면 credits에서 해당 항목 삭제)
- 리뷰는 실제 인터뷰 발췌만 사용 (가짜 후기 금지)
- 푸터의 "실존하지 않는 여행사 / 과제" 고지는 지우지 말 것

## 남은 작업 (TODO)
- [ ] 성민 캐릭터(돼괄양/곤드레곤) 이미지 → `public/characters/` + `config.ts`
- [ ] 마스코트 표기 확정 (돼괄양 vs 대관양) → `config.ts`의 `MASCOT_NAME`
- [ ] 아리 홈쇼핑 영상 유튜브 ID, 평가 구글폼 링크 → `config.ts`
- [ ] 겨울 사진(풍차 언덕, 올림픽 레거시) → 여름 사진으로 교체
- [ ] 곤드레밥 실제 사진 (지금은 말린 곤드레 나물)
- [ ] 발표 전 교통 시간표 재확인
- [x] Vercel 배포 → https://pyeong-chang-swiss-tour.vercel.app (main에 push하면 자동 재배포)
