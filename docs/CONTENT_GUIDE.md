# 콘텐츠 관리 안내

사이트의 공개 콘텐츠는 `src/data/`를 기준으로 관리합니다. 개인 검토 노트와 테스트 화면은 공개 Git 저장소에 포함하지 않습니다.

## 수정 위치

| 파일·데이터 | 용도 |
| --- | --- |
| `src/data/profile.ts` | 소개·학력·언어·공개 연락처·기술 경험 |
| `src/data/experience.ts` | 경력 타임라인 |
| `src/data/projects.ts`의 `projects` | 대표 사례 3개와 상세 콘텐츠 |
| `extendedProjects` | AI Camp·디스플레이·디노이징·정책전시 상세 |
| `projectFacts` | 카드·본문·그래프에서 공유하는 수치 |
| `campStages`, `learningCollections` | 교육 경험과 홈의 분야별 진입 |
| 기술 비교·정책 도식 데이터 | 설명용 시각 자료와 공개 참고 링크 |

대표 사례 수와 분야별 프로젝트 수는 배열 길이로 계산합니다. `allProjectIds`는 HumouR 등 중복된 프로젝트 ID를 한 번만 집계합니다.

## 표현과 확인 상태

- 개인 수행 업무와 팀 전체 구현·운영 성과를 구분합니다.
- 사용자 제공 수치와 측정 로그를 검증한 결과를 구분합니다. 단위·기간·대상을 함께 표시합니다.
- 조회수의 중간 월별 값, 미제공 PSNR, 참석자 수, 개인 기여율을 추정해 추가하지 않습니다.
- AI Camp의 3단계는 역량 발전 구조이며 실제 수행 순서가 확인된 연혁이 아닙니다.
- 웨어러블은 디스플레이 응용 범주입니다. 기술 설명 참고 자료를 사용자의 실제 실험·연구 산출물로 표현하지 않습니다.
- 정책전시 기획과 실제 운영을 구분하고, VAN Conference의 성과를 별도 전시 사례에 옮겨 쓰지 않습니다.
- 연락처·이력서가 없으면 `null`로 유지합니다. 존재하지 않는 다운로드 링크를 만들지 않습니다.

## 실제 자료 추가

공개가 허용된 자료를 `public/images/`에 넣고 확장 프로젝트의 `assets`에 경로·대체 텍스트·캡션을 지정합니다. `kind`는 `actual` 또는 `illustration`으로 구분하며, 실제 원본과 설명용 도식을 바꾸어 표시하지 않습니다. 개인정보·비공개 회사 정보는 공개 전에 제거합니다.

## 검증과 배포

```sh
npm ci
npm run check
npm run build
npm test
npm run package
```

배포 파일은 `dist/`, 전달용 압축 파일은 `dist.zip`, 서버 없는 열람 파일은 `portfolio.html`에 생성됩니다. 모두 Git에서 제외됩니다. `main` 푸시 시 GitHub Actions가 검사·빌드·테스트 후 GitHub Pages의 `/portfolio/`에 배포합니다. 상세 URL은 생성된 `404.html`과 `index.html`의 복구 스크립트로 유지합니다. Netlify Drop 루트 배포도 가능하며 `PORTFOLIO_BASE=/` 빌드와 `_redirects`를 사용합니다. 실행 절차는 README를 참고하세요.

이미지와 이력서의 로컬 경로는 `/images/파일명.webp`, `/resume.pdf`처럼 입력합니다. 컴포넌트의 `assetUrl()`이 배포 base를 붙이므로 데이터에 `/portfolio/`를 직접 중복 입력하지 않습니다. 디자인·경력 데이터는 배포 설정과 분리해 기존 파일에서 관리합니다.
