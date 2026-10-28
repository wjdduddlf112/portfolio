import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const root = resolve(import.meta.dirname, '..');
const cache = join(root, '.qa-cache');
await mkdir(cache, { recursive: true });
const runtimePath = join(cache, 'render.mjs');
await build({
  stdin: {
    contents: `import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { MemoryRouter } from 'react-router-dom';
      import App from './src/App.tsx';
      import { profile } from './src/data/profile.ts';
      import { projects, projectFacts, extendedProjects, campStages, allProjectIds, policyCell, policyJourney, displayComparison } from './src/data/projects.ts';
      export { profile, projects, projectFacts, extendedProjects, campStages, allProjectIds, policyCell, policyJourney, displayComparison };
      export function render(path) { return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(App))); }`,
    resolveDir: root, loader: 'tsx',
  },
  outfile: runtimePath, platform: 'node', format: 'esm', packages: 'external', bundle: true,
});
const { render, profile, projects, projectFacts, extendedProjects, campStages, allProjectIds, policyCell, policyJourney, displayComparison } = await import(pathToFileURL(runtimePath).href);

test('홈: 대표 사례 3개, 기타 작업, 경력 및 확인된 연락처 렌더링', () => {
  const html = render('/');
  for (const text of ['HumouR', 'VAN Conference 2026', '로아마케팅', 'AI Image Denoising', 'POEx', 'Dayflow', '엘리먼츠', '에듀탑']) assert.ok(html.includes(text), text);
  assert.equal((html.match(/class="project-row"/g) || []).length, 3);
  assert.ok(html.includes('mailto:wjdduddlf112@naver.com'));
  assert.ok(html.includes('mailto:wjdduddlf112@gmail.com'));
  assert.ok(html.includes('https://github.com/wjdduddlf112'));
  assert.ok(!html.includes('download=""'), '미제공 이력서 다운로드 버튼은 없어야 함');
});

for (const [slug, name] of [['humour', 'HumouR'], ['van-conference', 'VAN Conference 2026'], ['roa-marketing', '로아마케팅']]) {
  test(`상세 경로 /projects/${slug}: 콘텐츠와 목차 렌더링`, () => {
    const html = render(`/projects/${slug}`);
    assert.ok(html.includes(`<h1>${name}</h1>`));
    for (const id of ['overview', 'problem', 'role', 'process', 'deliverables', 'outcomes', 'learnings']) assert.ok(html.includes(`id="${id}"`), id);
    assert.ok(html.includes('NEXT CASE'));
    assert.ok(html.includes('정보의 범위'));
  });
}

test('콘텐츠 신뢰성: 합불 판단·참석자 수·미확인 성과를 과장하지 않음', () => {
  const ai = render('/projects/humour');
  const van = render('/projects/van-conference');
  const roa = render('/projects/roa-marketing');
  assert.ok(ai.includes('AI는 채용을 결정하지 않습니다.'));
  assert.ok(van.includes('실제 참석자 수와 구분'));
  assert.ok(roa.includes('30,000'));
  assert.ok(roa.includes('약 30%'));
  assert.ok(roa.includes('일부 블로그'));
  assert.ok(roa.includes('측정 로그 미검증'));
  const home = render('/');
  const policy = render('/projects/policy-exhibition');
  assert.ok(policy.includes('실제 운영 범위 미확인'));
  assert.ok(policy.includes('구현 범위 미확인'));
  assert.ok(!home.includes('졸업 완료'));
});

test('v2 로아: 조회수의 두 끝값과 CS 상대 지수를 분리하며 월별 관측을 생성하지 않음', () => {
  const project = projects.find(item => item.slug === 'roa-marketing');
  assert.equal(project.caseStudies.length, 2);
  const views = project.caseStudies[0].comparison;
  assert.deepEqual([views.before.value, views.after.value], [1000, 30000]);
  assert.ok(views.scope.includes('약 3개월'));
  assert.ok(views.scope.includes('주간 조회수'));
  const cs = project.caseStudies[1].comparison;
  assert.deepEqual([cs.before.value, cs.after.value], [100, 70]);
  assert.equal(cs.unit, '지수');
  assert.ok(cs.note.includes('실제 처리 시간(분·초)이나 측정 로그가 아닙니다'));
  const html = render('/projects/roa-marketing');
  assert.equal((html.match(/class="comparison-row /g) || []).length, 4, '두 그래프 각각 시작·종료 두 지점만 표시');
  assert.ok(!html.includes('1개월 후'));
  assert.ok(!html.includes('2개월 후'));
  assert.equal(projectFacts.roa.weeklyPlan, projectFacts.roa.blogs * projectFacts.roa.postsPerBlog);
});

test('v2 HumouR·VAN: 역할·데이터·산출물과 개념도임을 함께 표시', () => {
  const ai = render('/projects/humour');
  for (const text of ['659', '390', '비동기', '담당자의 역할', '개인 기획·협업 / 팀 개발 결과', '실제 DB 스키마']) assert.ok(ai.includes(text), text);
  const van = render('/projects/van-conference');
  for (const text of ['약 8명', '기술혁신 세션', '사회혁신 세션', '타임테이블', '설명용', '실제 참석자 수와 구분']) assert.ok(van.includes(text), text);
  for (const project of projects) assert.equal(project.deliverables.length, 3);
});

test('기타 프로젝트의 상세 확장 후에도 평가·기획·구현 확인 범위 유지', () => {
  const denoising = render('/projects/image-denoising');
  assert.ok(denoising.includes('PSNR 원값'));
  assert.ok(denoising.includes('모델별 우열'));
  const policy = render('/projects/policy-exhibition');
  for (const text of ['정책 선택지 비교', '의견 수집', '기능별 구현 완료 여부가 확인되지 않아']) assert.ok(policy.includes(text), text);
  assert.ok(!render('/').includes('졸업 완료'));
});

for (const project of extendedProjects) {
  test(`v3 확장 상세 /projects/${project.slug}: 구조·확인 상태·목차 연결`, () => {
    const html = render(`/projects/${project.slug}`);
    assert.ok(html.includes(`<h1>${project.name}</h1>`));
    assert.ok(html.includes(project.status));
    for (const section of project.sections) assert.ok(html.includes(`id="${section.id}"`), section.id);
    assert.ok(html.includes('정보의 범위'));
    assert.ok(!html.includes('<img'), '미제공 실험·운영 이미지를 생성하지 않음');
  });
}

test('v3 AI Camp: 6개 경험·역량 단계 3개·실제 시간순 미확인 구분', () => {
  assert.equal(campStages.length, 3);
  assert.equal(campStages.flatMap(stage => stage.projects).length, 6);
  const html = render('/projects/ai-camp');
  for (const name of ['자동차', '카드 사용', '서울 날씨', 'Pickle', 'LGNeer', 'HumouR']) assert.ok(html.includes(name), name);
  assert.ok(html.includes('시간순 연혁이 아닙니다'));
  assert.ok(html.includes('유의미한 관계가 확인되었는지는 미확인'));
  assert.ok(html.includes('href="/projects/humour"'));
});

test('v3 기술 비교: 평면 형태/웨어러블 응용 구분, 결과값 없는 모델 평가', () => {
  assert.equal(displayComparison.columns.length, 3);
  assert.equal(displayComparison.rows.length, 4);
  const display = render('/projects/display-research');
  assert.ok(display.includes('독립된 패널 기술이 아닌 응용 범주'));
  assert.ok(display.includes('디스플레이 제품을 직접 개발한 성과로 표현하지 않습니다'));
  assert.ok(display.includes('Arduino'));
  const denoising = render('/projects/image-denoising');
  for (const text of ['Original Image', 'Noisy Image', 'Denoised Image', 'ResNet', 'U-Net', 'DnCNN', 'MAX² / MSE']) assert.ok(denoising.includes(text), text);
  assert.ok(denoising.includes('원 논문은 이미지 인식 연구'));
  assert.ok(denoising.includes('원 논문은 영상 분할 연구'));
  assert.ok(!denoising.match(/\d+\.\d+\s*dB/), '미제공 PSNR 수치 없음');
});

test('v3 정책: 전시 셀 우선, 기획 여정과 실제 운영·행사 성과 분리', () => {
  assert.deepEqual(policyCell.steps.map(step => step.label), ['작품', '해설', '정책']);
  assert.equal(policyJourney.steps.length, 5);
  const html = render('/projects/policy-exhibition');
  assert.ok(html.includes('기획된 관람 경험'));
  assert.ok(html.indexOf('id="exhibition-cell"') < html.indexOf('전시를 보조하는 참여 장치'));
  assert.ok(html.includes('POEx의 제안·기획과 실제 운영된 정책전시회의 사실을 합치지 않습니다'));
  assert.ok(!html.includes('약 800'));
});

test('v3 홈: 대표 3개 유지·3개 분야 연결·프로젝트 중복 집계 방지', () => {
  assert.equal(allProjectIds.filter(id => id === 'humour').length, 1);
  assert.equal(allProjectIds.length, 13);
  const html = render('/');
  for (const id of ['ai-data', 'academic-engineering', 'product-policy']) assert.ok(html.includes(`id="${id}"`));
  for (const project of extendedProjects) assert.ok(html.includes(`href="/projects/${project.slug}`));
  assert.equal((html.match(/class="project-row"/g) || []).length, 3);
});

test('연락처·이력서 누락: 가짜 링크 없이 숨김 및 대체 안내 렌더링', () => {
  const snapshot = { ...profile };
  try {
    profile.email = null; profile.secondaryEmail = null; profile.github = null; profile.linkedIn = null; profile.resumeUrl = null;
    const html = render('/');
    assert.ok(!html.includes('mailto:'));
    assert.ok(!html.includes('download=""'));
    assert.ok(html.includes('공개 연락처를 준비하고 있습니다.'));
  } finally { Object.assign(profile, snapshot); }
});

test('없는 경로와 없는 프로젝트: 복귀 가능한 404 화면', () => {
  for (const path of ['/unknown', '/projects/unknown']) {
    const html = render(path);
    assert.ok(html.includes('404 / PAGE NOT FOUND'));
    assert.ok(html.includes('프로젝트로 돌아가기'));
  }
});

test('빌드 배포 구조: SPA fallback, 정적 자산, 한국어 SEO', async () => {
  const dist = join(root, 'dist');
  assert.equal((await readFile(join(dist, '_redirects'), 'utf8')).trim(), '/* /index.html 200');
  const html = await readFile(join(dist, 'index.html'), 'utf8');
  assert.ok(html.includes('lang="ko"'));
  assert.ok(html.includes('name="description"'));
  assert.ok(html.includes('property="og:title"'));
  const assets = await readdir(join(dist, 'assets'));
  assert.ok(assets.some(file => file.endsWith('.js')));
  assert.ok(assets.some(file => file.endsWith('.woff2')), '폰트는 외부 CDN이 아닌 로컬 자산으로 배포');
});
