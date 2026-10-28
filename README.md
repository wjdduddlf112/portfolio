# 정영일 · Personal Portfolio

PM, AI·AX 서비스 기획, 사업기획·운영 분야를 위한 한국어 정적 포트폴리오입니다. React + TypeScript + Vite + React Router + 일반 CSS로 만들었습니다. Noto Sans KR와 Manrope 폰트는 npm 패키지에서 가져와 사이트와 함께 호스팅합니다. 운영 중 외부 API, CDN 폰트, 데이터베이스, 로그인, 분석 도구를 사용하지 않습니다.

## 완성된 사이트 바로 열기 (Windows)

빌드 후 프로젝트 폴더의 **`portfolio.html`을 더블클릭**하면 서버 없이 열립니다. JS·CSS·폰트가 내장되어 있고 상세 이동은 해시 경로를 사용합니다. `dist/index.html`을 파일로 열어도 같은 폴더의 `portfolio.html`로 이동합니다. 소스의 `index.html`은 개발 진입점이며, 전달할 파일은 빌드로 생성한 `portfolio.html`입니다.

HTTP 미리보기는 **`open-portfolio.cmd`를 더블클릭**하세요. `dist`를 제공하는 로컬 전용 서버가 백그라운드에서 실행되고 `http://127.0.0.1:4173/portfolio/`이 열립니다. Node.js가 필요하며 추가 패키지 설치는 필요하지 않습니다. 이 주소는 내 컴퓨터에서만 열립니다. 재실행하면 기존 서버를 재사용하며, 컴퓨터를 재시작한 후에는 실행 파일을 다시 실행하세요.

공유용 사이트: **[https://wjdduddlf112.github.io/portfolio/](https://wjdduddlf112.github.io/portfolio/)**

## 소스 개발 실행

Node.js 22.12 이상을 권장합니다.

```sh
npm install
npm run dev
```

터미널에 표시되는 로컬 주소를 엽니다. 기본 주소는 `http://127.0.0.1:5173/portfolio/`입니다.

## 빌드와 확인

```sh
npm run build
npm test
npm run preview
npm run package
```

- `npm run build`: TypeScript 검사 후 `dist/`·단일 `portfolio.html`·Pages용 `404.html` 생성
- `npm test`: 홈·상세 7개·404·콘텐츠 표현·하위 경로·404 URL 복구·단일 HTML 구조를 검사
- `npm run preview`: 빌드한 사이트를 로컬에서 확인, 기본 포트 4173
- `npm run package`: `dist` 내용만 담은 `dist.zip` 생성. ZIP 최상위에 `index.html`이 위치합니다.

빌드 후 내용을 수정했다면 다시 빌드하고 ZIP도 다시 생성하세요. 생성물 `dist/`, `dist.zip`, `portfolio.html`은 Git에서 제외하며 소스만 관리합니다.

## GitHub Pages 자동 배포

`.github/workflows/deploy-pages.yml`이 `main` 푸시 또는 수동 실행 시 `npm ci` → TypeScript 검사 → 프로덕션 빌드 → 테스트 → Pages 배포를 수행합니다. 저장소 **Settings → Pages → Build and deployment → Source**는 **GitHub Actions**로 설정합니다.

- Vite 기본 `base`: `/portfolio/`
- BrowserRouter `basename`: `import.meta.env.BASE_URL`
- favicon·폰트·JS·CSS 및 공개 자료 경로도 같은 base 사용
- 상세 URL 직접 접속·새로고침: `404.html`이 원래 URL을 인코딩해 홈으로 이동하고, React 실행 전에 경로·검색 조건·앵커를 복원
- 알 수 없는 상세 경로는 앱의 기존 404 화면 표시

Pages는 서버 rewrite를 지원하지 않으므로 상세 URL 첫 요청은 HTTP 404를 거쳐 홈의 HTTP 200으로 복구됩니다. `_redirects`는 Netlify용이며 Pages에서는 사용하지 않습니다. 배포 상태는 저장소 Actions의 **Deploy portfolio to GitHub Pages** 실행에서 확인하세요.

## Netlify Drop으로 직접 배포

1. Netlify 루트 배포는 PowerShell에서 `$env:PORTFOLIO_BASE='/'; npm run build; Remove-Item Env:PORTFOLIO_BASE`로 별도 빌드합니다. 기본 Pages 빌드를 그대로 루트에 업로드하지 마세요.
2. [Netlify Drop](https://app.netlify.com/drop)을 브라우저에서 엽니다.
3. **`personal-portfolio/dist` 폴더 자체**를 업로드합니다. 소스 폴더나 `node_modules`는 업로드하지 않습니다.
4. Netlify에서 발급한 주소로 홈을 확인합니다.
5. `/projects/humour`, `/projects/van-conference`, `/projects/roa-marketing`에 직접 접속한 뒤 새로고침해 보세요.
6. 모바일 화면에서 메뉴·프로젝트·연락 링크를 확인한 뒤 취업 지원에 사용하세요.

`public/_redirects`의 `/* /index.html 200` 설정이 빌드 시 `dist/_redirects`로 복사됩니다. 따라서 Netlify는 상세 경로 요청에도 SPA를 반환합니다. 앱은 알 수 없는 경로에 별도의 404 화면을 표시합니다. `dist.zip`은 보관·전달용이며, Drop에서 ZIP이 처리되지 않으면 압축을 풀어 그 내용이 들어 있는 폴더를 업로드하세요.

소스는 [wjdduddlf112/portfolio](https://github.com/wjdduddlf112/portfolio)에서 관리하며 기본 배포는 GitHub Pages 자동 배포입니다. Netlify Drop 수동 배포도 유지합니다.

## 콘텐츠 수정

| 파일 | 관리 내용 |
| --- | --- |
| `src/data/profile.ts` | 이름, 소개, 학력, 언어, 역량, 공개 연락처 |
| `src/data/projects.ts` | 대표 프로젝트 카드·상세 내용, 기타 프로젝트 |
| `src/data/experience.ts` | 경력 타임라인 |
| `src/components/Artwork.tsx` | 원본 SVG·CSS 개념 그래픽 |
| `src/components/ProjectEvidence.tsx` | 데이터 기반 주요 산출물, 설명 도식, 전후 비교 그래프 |
| `src/content.css` | v2 콘텐츠 영역의 추가 스타일 (기존 디자인 유지) |
| `src/components/LearningCollections.tsx` | 홈의 AI·전공·정책 3개 분야 진입 영역 |
| `src/components/LearningVisuals.tsx` | AI Camp 역량 타임라인, 기술 비교표, 모델·평가 설명 |
| `src/pages/ExtendedProjectDetail.tsx` | v3 확장 상세 4개와 HANDS·Dayflow 관련 사례 |
| `src/learning.css` | v3 시각화와 좁은 화면 표·타임라인의 추가 스타일 |
| `src/styles.css` | 디자인 토큰, 레이아웃, 반응형, 인쇄 스타일 |
| `index.html`, `public/favicon.svg` | 기본 SEO 메타데이터, 파비콘 |

대표 프로젝트는 `projects` 배열에 `Project` 타입에 맞는 객체를 추가하면 목록·상세 경로·다음 프로젝트가 자동으로 생성됩니다. 기존 시각 테마 `humour`, `van`, `roa` 중 하나를 재사용할 수 있습니다. 대표 목록의 개수와 그래픽의 총 개수 표시는 자동 갱신됩니다. 분류를 추가하려면 `Project.category` 타입과 홈의 `filters`도 수정하세요. 상세 페이지의 문서 제목과 설명은 경로에 맞춰 갱신됩니다.

v3 확장 상세는 같은 `projects.ts`의 `extendedProjects`에서 관리합니다. AI Camp는 `campStages`, 전공·정책 시각화는 `displayComparison`, `denoisingModels`, `policyCell`, `policyJourney` 등을 수정하세요. 홈의 세 분야는 `learningCollections`이며 개수는 배열에서 계산합니다. `allProjectIds`가 중복 프로젝트 ID를 제거하므로 AI Camp의 HumouR를 별도 성과로 다시 세지 않습니다. 현재 대표 3개와 3개 분야의 경험을 합쳐 중복 제거 후 13개 프로젝트 경험, 상세 경로는 7개입니다. AI Camp 전체는 묶음 페이지로, 별도의 수행 프로젝트 한 개로 추가 집계하지 않습니다.

필수 시각화 위치:

- `/projects/ai-camp#growth`: AI Camp 3단계 역량 발전 타임라인. 실제 수행 순서와 구분합니다.
- `/projects/display-research#comparison`: 디스플레이 기술 비교표. 모바일에서는 표 내부를 좌우 스크롤합니다.
- `/projects/image-denoising#experiment`: 원본→노이즈→복원 과정. 아래 모델 구조·PSNR 평가 설명을 연결합니다.
- `/projects/policy-exhibition#exhibition-cell`, `#visitor-journey`: 전시 셀과 기획된 관람객 여정.

확장 상세에 실제 자료를 넣으려면 `public/images/`에 파일을 저장한 뒤 해당 `extendedProjects` 객체의 `assets`에 `src`, `alt`, `caption`, `kind: 'actual' | 'illustration'`, 선택 사항 `width`, `height`를 입력하세요. 비공개/개인정보를 제거한 실제 파일만 연결하고 로컬 정적 경로를 사용하세요. 미입력 시 이미지를 표시하지 않습니다. 원본 실험·운영 자료와 설명 도식의 출처를 바꾸어 표기하지 마세요.

## 연락처·이력서·이미지 추가

v2의 모든 수치는 `src/data/projects.ts`의 `projectFacts`에서 관리합니다. 카드·경력·그래프는 이 값을 참조합니다. 프로젝트별 `decisions`, `deliverables`, 선택 필드 `diagrams`, `dataStructure`, `caseStudies`로 상세 내용을 확장합니다. 비교 그래프에는 시작·종료 두 값만 입력합니다. `caseStudies`가 있으면 해당 프로젝트의 Process 영역에서 일반 단계 목록 대신 사례별 과정과 그래프를 표시합니다.

공개 저장소의 콘텐츠 수정 원칙은 [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)를 참고하세요. 개인 검토 노트·변경 이력·필요 증빙 기록은 로컬에서 별도로 보관하며 Git 추적에서 제외합니다. 사이트는 `src/data/`만 읽습니다.

- 확인된 이메일과 GitHub 주소를 반영했습니다. 각 주소는 `profile.ts`에서 수정하세요.
- `email`, `secondaryEmail`, `github`, `linkedIn`, `resumeUrl`이 `null`이면 해당 링크가 나타나지 않습니다.
- 이력서 PDF를 `public/resume.pdf`에 저장하고 `resumeUrl: '/resume.pdf'`로 변경하면 다운로드 링크가 표시됩니다. 반드시 파일을 함께 빌드하세요.
- 학력 `status`는 확인 전까지 `null`입니다. 졸업 여부가 확인되면 직접 입력하세요.
- 실제 프로젝트 스크린샷을 제공하려면 `public/images/`에 최적화된 WebP·AVIF 등을 넣고 `Artwork.tsx`에서 해당 그래픽을 `<img>`로 교체하세요. `alt`, `width`, `height`, 화면 아래 이미지의 `loading="lazy"`를 지정하세요.
- 현재 그래픽은 직접 제작한 SVG·CSS 개념도입니다. 제품 화면이나 실제 측정 그래프로 표현하지 않았습니다.

## 콘텐츠의 확인 상태

- 모든 경력·활동은 사용자가 제공한 내용을 바탕으로 정리했습니다. 원본 증빙을 독립적으로 검증한 것은 아닙니다.
- HumouR의 기술 스택은 팀 프로젝트 맥락입니다. 개인 단독 개발이나 모든 기술의 전문 숙련도를 주장하지 않습니다.
- VAN의 약 800건은 **사전 신청 건수**이며 실제 참석자 수나 개인 성과가 아닙니다.
- 로아마케팅은 v2에서 사용자 제공 주간 조회수 약 1,000→30,000(약 3개월·일부 블로그), CS 처리 시간 약 30% 단축을 반영했습니다. 그래프에 사용자 제공·로그 미검증을 표시하며, CS는 개선 전=100의 상대 지수입니다. 조회수를 방문자 수나 유입 지표로 바꾸지 않습니다.
- POEx와 Dayflow는 기획 경험으로 표시하고 미확인 운영·구현 상태를 명시했습니다.
- SQL은 v3에서 자동차 데이터 비교 프로젝트의 학습·활용 경험으로 제공되어 기술 경험에 반영했습니다. React·Docker의 개인 숙련도는 미확인이며, 이 사이트의 React 구현도 사용자의 단독 구현 성과로 표시하지 않습니다.
- 콘텐츠에는 사용자 제공 사실·설명 도식·미확인 범위를 구분해 표시합니다. 개인 검토 기록과 원자료 확인 목록은 공개 소스 및 `dist`에 포함하지 않습니다.

## 접근성·운영

한국어 문서 언어, 시맨틱 섹션, 본문 건너뛰기, 키보드 포커스, 모바일 메뉴의 펼침 상태와 Escape 닫기, 모션 감소 설정, 명확한 링크 이름을 적용했습니다. 연락 링크는 `mailto:`이며 서버 전송 폼이 없습니다. GitHub 링크는 새 탭에서 열립니다. 사용자 데이터를 수집하거나 추적하지 않습니다.

로컬 검증 보고와 화면 기록은 Git 추적에서 제외합니다. 자동 검사는 `npm test`로 실행할 수 있습니다. Netlify 배포 자체는 사용자가 수행하므로, 배포 후 경로 새로고침 검증은 최종 수동 확인이 필요합니다.
