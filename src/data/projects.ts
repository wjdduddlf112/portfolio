export type FlowDiagram = {
  title: string;
  mode?: 'parallel';
  steps: { label: string; detail: string }[];
  caption: string;
};

export type Comparison = {
  id: string;
  title: string;
  scope: string;
  before: { label: string; value: number };
  after: { label: string; value: number };
  unit: string;
  note: string;
};

export type CaseStudy = {
  label: string;
  title: string;
  problem: string;
  execution: string;
  flow: string[];
  comparison: Comparison;
};

// 수치의 단일 기준. 그래프·요약·본문이 이 값을 함께 참조합니다.
export const projectFacts = {
  humour: { roles: 10, qualification: 659, preferred: 390 },
  van: { registrations: 800, team: 8, sessions: 2 },
  roa: { blogs: 6, postsPerBlog: 3, weeklyPlan: 18, beforeViews: 1000, afterViews: 30000, months: 3, recruitments: 15, csReductionPercent: 30 },
} as const;
const { humour, van, roa } = projectFacts;
const number = (value: number) => value.toLocaleString('en-US');

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: 'Product & AI' | 'Business & Operations';
  eyebrow: string;
  period: string;
  title: string;
  summary: string;
  role: string;
  contribution: string;
  tags: string[];
  visual: 'humour' | 'van' | 'roa';
  overview: string;
  problem: string;
  goals: string[];
  roles: string[];
  steps: { title: string; text: string }[];
  decisions: { choice: string; reason: string }[];
  deliverables: { title: string; description: string; ownership: string }[];
  deliverablesNote: string;
  diagrams?: FlowDiagram[];
  dataStructure?: { scope: string; items: { name: string; count: number; meaning: string }[]; note: string };
  caseStudies?: CaseStudy[];
  outcomes: { value: string; label: string; context: string }[];
  evidence: string;
  learnings: string;
};

export const projects: Project[] = [
  {
    slug: 'humour', number: '01', name: 'HumouR', category: 'Product & AI',
    eyebrow: 'AI-ASSISTED RECRUITING', period: '2026.01 — 2026.07',
    title: '채용의 판단은 사람에게,\n정보의 정리는 AI에게.',
    summary: '전담 HR 인력이 부족한 기술 스타트업을 위한 AI 기반 채용 보조 서비스입니다.',
    role: '서비스 기획 · 데이터 작업 · 기획·개발 협업 · 발표',
    contribution: `개발자 ${humour.roles}개 직군 · qualification ${humour.qualification}건 · preferred ${humour.preferred}건의 데이터 구성`,
    tags: ['Service Planning', 'RAG', 'Data Analysis'], visual: 'humour',
    overview: 'SK Networks Family AI Camp 5기 최종 팀 프로젝트. 전담 HR 인력이 부족한 소규모 기술 스타트업을 위해 JD·이력서 요약, 직무 관련 역량 분석, 강점·우려 사항, 면접 질문 추천을 연결했습니다. 저는 서비스 기획과 데이터 관련 작업, 개발 협업 및 발표에 참여했습니다.',
    problem: '전담 HR 인력이 부족한 조직은 채용 과정에서 JD와 이력서의 많은 정보를 직접 정리해야 합니다. 검토에 필요한 정보를 한눈에 파악하고, 추가로 확인할 질문을 준비하는 부담에 주목했습니다.',
    goals: ['JD와 이력서의 정보를 검토하기 쉬운 형태로 정리', '직무 관련 역량과 추가 확인 항목을 연결', '최종 채용 판단을 담당자에게 남기는 보조형 서비스 설계'],
    roles: ['채용 담당자가 확인할 정보와 추가 질문을 중심으로 서비스 기획에 참여', `개발자 ${humour.roles}개 직군의 qualification ${humour.qualification}건·preferred ${humour.preferred}건 데이터 구성 및 관련 분석`, '기획·데이터 작업 내용을 개발팀과 연결하고 프로젝트 결과 발표 수행'],
    steps: [
      { title: '문제와 사용자 정의', text: '소규모 기술 스타트업과 채용 담당자를 대상으로, 채용 정보 처리 부담을 핵심 문제로 정의했습니다.' },
      { title: '사용자 요구를 검토 항목으로 변환', text: '담당자에게 필요한 결과를 요약, 직무 관련 역량, 강점·우려 사항, 추가 확인 항목, 면접 질문으로 나눴습니다. 정보 정리에서 추가 검증으로 이어지는 검토 흐름을 구성했습니다.' },
      { title: '직군별 데이터 구조화', text: `개발자 ${humour.roles}개 직군의 요구 정보를 qualification ${humour.qualification}건과 preferred ${humour.preferred}건으로 구분해 구성했습니다. 필수 자격과 우대 사항을 분리해 직무 요구를 서로 다른 기준으로 살펴볼 수 있도록 정리했습니다.` },
      { title: '비동기 서비스 흐름과 개발 협업', text: '팀은 RAG, LangChain/LangGraph, Celery와 Django 등을 활용했습니다. 분석 요청의 처리 상태를 구분하는 비동기 흐름을 다뤘으며, 저는 기획·데이터 작업과 개발 협업에 참여했습니다. 전체 파이프라인의 단독 구현을 의미하지 않습니다.' },
      { title: '검토 결과와 발표로 연결', text: '정리한 직무 요구와 이력서 정보를 검토 결과·면접 질문으로 연결하는 서비스 구조를 다뤘습니다. 팀 프로젝트의 서비스 방향과 수행 내용을 발표했으며, 실제 채용 효과나 운영 지표는 확인된 자료가 없어 제시하지 않습니다.' },
    ],
    decisions: [
      { choice: '합격·불합격 결정 대신, 검토 정보와 질문을 제공', reason: 'AI가 정리한 내용은 담당자가 확인할 자료로 두고 최종 채용 판단은 사람에게 남기는 보조형 구조를 선택했습니다.' },
      { choice: 'qualification과 preferred를 분리', reason: '필수 자격과 우대 사항을 구분해 직무 요구를 구조화했습니다. 실제 데이터 필드·검색 및 매칭 규칙의 세부 명세는 원본 자료 확인이 필요합니다.' },
    ],
    deliverables: [
      { title: '직군별 요구 데이터', description: '개발자 직군별 필수 자격과 우대 사항을 구분한 데이터 구성 및 관련 분석.', ownership: '개인 참여 · 데이터 작업' },
      { title: '서비스 검토·처리 흐름', description: '입력, 요약·분석, 검토 결과, 면접 질문으로 이어지는 서비스 구조와 비동기 처리 맥락.', ownership: '개인 기획·협업 / 팀 개발 결과' },
      { title: '프로젝트 결과 발표', description: '서비스 기획·데이터 작업·개발 협업의 결과를 팀 프로젝트 발표로 전달.', ownership: '개인 참여 · 협업 및 발표' },
    ],
    deliverablesNote: '수행 업무에 근거한 산출물 설명입니다. 아래 도식은 설명용 재구성이며, 원본 데이터·기획 문서·발표 자료·실제 서비스 스크린샷은 아직 첨부되지 않았습니다.',
    diagrams: [
      { title: '입력에서 면접 준비까지', steps: [{ label: 'JD·이력서 입력', detail: '채용 요구와 지원자 정보' }, { label: '요약·역량 분석', detail: '직무 요구와 관련 정보 정리' }, { label: '검토 결과', detail: '강점·우려·추가 확인 항목' }, { label: '면접 질문 추천', detail: '담당자가 검증할 질문' }], caption: '설명용 서비스 흐름도 · 실제 서비스 화면이 아닙니다. 마지막 판단은 채용 담당자가 수행합니다.' },
      { title: '비동기 분석과 상태 확인', steps: [{ label: '분석 요청', detail: 'JD·이력서 처리 요청 접수' }, { label: '비동기 작업', detail: 'Celery 등을 활용한 팀 개발' }, { label: '상태·결과 확인', detail: '처리 상태와 검토 결과 구분' }], caption: '팀 개발 구조를 설명하는 개념도입니다. 실제 상태 코드, 단계별 구현 담당, 오류·재시도 정책은 미확인입니다.' },
      { title: '사용자와 AI의 역할 분담', mode: 'parallel', steps: [{ label: 'AI의 역할', detail: '요약·정보 분석·질문 추천' }, { label: '담당자의 역할', detail: '근거 확인·면접 검증·최종 판단' }], caption: '설명용 역할 구분 · AI가 최종 합격·불합격을 결정하지 않는 구조입니다.' },
    ],
    dataStructure: { scope: `개발자 ${humour.roles}개 직군의 요구 정보`, items: [{ name: 'qualification', count: humour.qualification, meaning: '필수 자격·요구 역량을 구분하는 데이터' }, { name: 'preferred', count: humour.preferred, meaning: '우대 사항·선호 조건을 구분하는 데이터' }], note: '사용자 제공 데이터 건수 · 분류를 설명하는 개념도이며 실제 DB 스키마나 레코드 화면이 아닙니다.' },
    outcomes: [
      { value: String(humour.roles), label: '개발자 직군', context: '프로젝트에서 다룬 분석 범위' },
      { value: String(humour.qualification), label: 'qualification 데이터', context: '프로젝트 데이터 구성 건수' },
      { value: String(humour.preferred), label: 'preferred 데이터', context: '프로젝트 데이터 구성 건수' },
    ],
    evidence: '사용자 제공 프로젝트 정보 기준입니다. 데이터 건수는 서비스 효과나 개인의 단독 개발 성과를 뜻하지 않습니다. 정확도, 채용 시간 절감률, 평가 점수는 제시하지 않습니다.',
    learnings: '이 프로젝트는 AI가 제공할 정보와 사람이 내려야 할 판단의 경계를 다루는 경험이었습니다. 서비스 기획과 직군별 데이터 작업, 개발 협업을 함께 수행하며 기술을 실제 검토 업무의 흐름과 연결했습니다.',
  },
  {
    slug: 'van-conference', number: '02', name: 'VAN Conference 2026', category: 'Business & Operations',
    eyebrow: 'CONFERENCE PLANNING & OPERATIONS', period: '2026.09.12',
    title: '하나의 질문을,\n함께 만드는 경험으로.',
    summary: '「대격변의 시대, 혁신을 묻다」. 기술혁신과 사회혁신을 연결하는 컨퍼런스를 기획하고 운영했습니다.',
    role: '컨퍼런스 기획 TF 팀장 · 세션 설계 · 이해관계자 조율',
    contribution: `약 ${van.team}명 기획 TF 리딩 · ${van.sessions}개 세션 설계 · 사전 신청 약 ${van.registrations}건(팀 전체)`,
    tags: ['Project Management', 'Program Design', 'Communication'], visual: 'van',
    overview: `2026년 9월 12일 숙명여자대학교에서 열린 「대격변의 시대, 혁신을 묻다」. 기술혁신·사회혁신 ${van.sessions}개 세션으로 구성된 행사에서 약 ${van.team}명 규모 기획 TF의 팀장을 맡아 프로그램, 연사·내빈 협의, 운영 조직 조율과 당일 진행 흐름 설계를 수행했습니다.`,
    problem: '「대격변의 시대, 혁신을 묻다」라는 주제를 실제 세션과 행사 경험으로 구체화하고, 연사·관계자·운영 조직이 함께 실행할 수 있는 행사 구조를 만들어야 했습니다.',
    goals: ['기술혁신·사회혁신을 다루는 프로그램과 세션 구성', '연사 및 관계자와 협의하며 행사 구조 구체화', '운영 조직을 조율해 행사 실행으로 연결'],
    roles: [`약 ${van.team}명 규모 기획 TF 팀장으로 프로그램 구조와 기술혁신·사회혁신 세션 기획`, '연사·내빈 및 관계자와 행사 프로그램 관련 협의', '운영 조직 간 업무 연결, 당일 운영 구조·진행 흐름 설계 및 현장 운영 참여'],
    steps: [
      { title: '행사 주제를 두 세션으로 구체화', text: '기술혁신과 사회혁신을 각 세션의 축으로 삼아 「혁신을 묻다」라는 주제를 프로그램 구조로 연결했습니다. 행사 전체의 구성과 개별 세션의 진행을 함께 기획했습니다.' },
      { title: '프로그램과 관계자 협의 연결', text: '세션 기획과 연사·내빈 관련 협의를 함께 다뤘습니다. 프로그램 내용이 실제 참여 관계자와 운영 조건에 맞게 이어지도록 조율하는 역할을 맡았습니다.' },
      { title: '기획 TF와 운영 조직의 업무 연결', text: `약 ${van.team}명 규모의 기획 TF를 이끌며 운영 조직과 협업했습니다. 프로그램 구성, 관계자 협의, 당일 진행의 연결 지점을 관리하고 운영 업무 분담 체계를 조율했습니다.` },
      { title: '당일 진행 흐름 설계와 실행', text: '행사 당일의 운영 구조와 진행 흐름을 설계하고 현장 운영에 참여했습니다. 실제 시각별 타임테이블, 개인별 담당표와 세부 식순은 원본 자료를 확보한 뒤 제시할 수 있습니다.' },
    ],
    decisions: [
      { choice: '기술혁신과 사회혁신을 두 세션으로 구성', reason: '행사 주제를 프로그램 단위로 나누고, 세션 내용과 전체 행사 흐름을 함께 다루는 구조로 기획했습니다.' },
      { choice: '기획·관계자 협의·당일 운영을 연결', reason: '기획 TF 팀장으로 프로그램 설계에 그치지 않고 연사·내빈 협의와 운영 조직 조율까지 실행 범위를 이어갔습니다.' },
    ],
    deliverables: [
      { title: '컨퍼런스 프로그램 구성', description: '기술혁신·사회혁신 2개 세션과 행사 전체 주제의 연결 구조.', ownership: '개인 기획·조율 / 팀 운영' },
      { title: '운영 업무 연결 구조', description: '기획 TF, 연사·내빈 협의, 운영 조직이 맞춰야 하는 업무 범위와 분담 체계.', ownership: '기획 TF 팀장 · 약 8명 규모 조율' },
      { title: '당일 운영·진행 흐름', description: '프로그램이 현장 실행으로 이어지기 위한 운영 구조와 세션 진행 흐름 설계.', ownership: '개인 설계·조율 / 팀 현장 실행' },
    ],
    deliverablesNote: '제공된 수행 범위를 도식으로 재구성했습니다. 실제 프로그램북, 업무 분담표, 시각별 타임테이블은 미첨부 상태이며 도식을 당시 원본 문서로 제시하지 않습니다.',
    diagrams: [
      { title: '프로그램의 두 축', mode: 'parallel', steps: [{ label: '기술혁신 세션', detail: '기술혁신 분야 프로그램' }, { label: '사회혁신 세션', detail: '사회혁신 분야 프로그램' }], caption: '프로그램 구성 개념도 · 좌우 배치는 실제 진행 순서를 의미하지 않습니다. 세부 세션 순서·연사별 식순은 미확인입니다.' },
      { title: '운영 업무의 연결', mode: 'parallel', steps: [{ label: '기획 TF', detail: '프로그램·세션·전체 흐름' }, { label: '연사·내빈 협의', detail: '관계자와 프로그램 조율' }, { label: '운영 조직', detail: '업무 분담·현장 진행 연결' }], caption: '업무 범주를 설명하는 개념도 · 공식 조직도나 개인별 담당표가 아닙니다.' },
      { title: '당일 진행 흐름의 설계 범위', steps: [{ label: '진행 준비', detail: '프로그램과 운영 업무 연결' }, { label: '세션 진행', detail: '프로그램별 진행 흐름' }, { label: '전환·마무리', detail: '행사 전체의 연결 구간' }], caption: '설명용 당일 흐름 재구성 · 정확한 시작·종료 시각과 세부 식순이 미제공되어 실제 타임테이블로 표시하지 않습니다.' },
    ],
    outcomes: [
      { value: `약 ${van.registrations}`, label: '사전 신청 건수', context: '사용자 제공 · 실제 참석자 수와 구분' },
      { value: `약 ${van.team}명`, label: '기획 TF 규모', context: '본인 역할: 기획 TF 팀장' },
      { value: `${van.sessions}개`, label: '프로그램 세션', context: '기술혁신 · 사회혁신' },
    ],
    evidence: '사전 신청 약 800건은 사용자 제공 정보이며 집계 자료는 별도 확인이 필요합니다. 팀 전체의 신청 성과로, 개인 단독 성과나 실제 참석자 수로 표현하지 않습니다.',
    learnings: '행사 기획이 실행으로 이어지는 과정에는 프로그램 설계만큼 관계자 간 협의와 운영 조직의 조율이 필요했습니다. 이 사례는 주제의 구체화부터 현장 실행까지 연결한 프로젝트 운영 경험입니다.',
  },
  {
    slug: 'roa-marketing', number: '03', name: '로아마케팅', category: 'Business & Operations',
    eyebrow: 'CONTENT STRATEGY & PROCESS IMPROVEMENT', period: '2020.04 — 2024.12',
    title: '콘텐츠의 흐름과,\n운영의 방식을 바꾸다.',
    summary: '분야별 콘텐츠를 기획·운영하고, HR 지원과 CS 프로세스 개선까지 업무의 범위를 넓혔습니다.',
    role: '콘텐츠 기획·운영 · 성과 모니터링 · HR 지원 · CS 개선',
    contribution: `블로그 ${roa.blogs}개 · 주간 약 ${roa.weeklyPlan}건 발행 계획 · 일부 블로그 주간 조회수 약 ${number(roa.beforeViews)}→${number(roa.afterViews)}(약 ${roa.months}개월·사용자 제공)`,
    tags: ['Content Strategy', 'Data Analysis', 'Process Improvement'], visual: 'roa',
    overview: `유학·입시 등 분야별 블로그 ${roa.blogs}개를 운영하며 블로그별 주 ${roa.postsPerBlog}회가량, 주간 약 ${roa.weeklyPlan}건의 콘텐츠 발행을 계획했습니다. 콘텐츠 기획·성과 모니터링과 별도로, 채용 지원 및 CS 업무 표준화를 수행했습니다. 콘텐츠 성과와 업무 효율 개선을 두 사례로 나눠 소개합니다.`,
    problem: '분야별 콘텐츠의 성과를 모니터링하고 운영을 개선하는 과제와, 고객 응대 업무의 처리 방식을 정리하고 표준화하는 과제를 함께 다뤘습니다.',
    goals: ['분야별 콘텐츠 기획과 성과 모니터링 수행', '채용 지원 과정에서 콘텐츠 평가와 보고서 작성', 'CS 프로세스 개선과 표준화 추진'],
    roles: [`분야별 블로그 ${roa.blogs}개 운영, 블로그별 주 ${roa.postsPerBlog}회가량의 콘텐츠 제작과 주간 약 ${roa.weeklyPlan}건 발행 계획`, `일부 블로그의 주간 조회수 변화 모니터링: 약 ${roa.months}개월 동안 약 ${number(roa.beforeViews)}→${number(roa.afterViews)} 증가 경험`, `채용 과정 ${roa.recruitments}회 이상 참여, 지원자 콘텐츠 평가 및 관련 보고서 작성`, `CS 업무 프로세스 표준화, 처리 시간 약 ${roa.csReductionPercent}% 단축 경험`],
    steps: [
      { title: '콘텐츠 성과 개선', text: '분야별 운영과 주간 발행 계획, 콘텐츠 기획·개선, 성과 모니터링을 연결했습니다.' },
      { title: '업무 효율 개선', text: '고객 응대 프로세스를 표준화하고 처리 시간 변화에 주목했습니다.' },
    ],
    decisions: [
      { choice: '분야별 블로그 운영을 주간 제작·발행 계획으로 구체화', reason: `블로그 ${roa.blogs}개에 각 주 ${roa.postsPerBlog}회가량의 제작 주기를 적용하고, 주간 약 ${roa.weeklyPlan}건의 콘텐츠 발행을 계획했습니다. 제작 규모와 성과 모니터링을 함께 다뤘습니다.` },
      { choice: '콘텐츠 성과와 고객 응대 방식의 개선을 함께 수행', reason: '콘텐츠 기획·운영에서 CS 업무 표준화까지 개선 범위를 넓혔습니다. 조회수와 처리 시간을 서로 다른 업무의 결과로 구분해 관리하는 경험입니다.' },
    ],
    deliverables: [
      { title: '주간 콘텐츠 발행 계획', description: `블로그 ${roa.blogs}개와 블로그별 주 ${roa.postsPerBlog}회가량의 제작 주기를 연결한 주간 약 ${roa.weeklyPlan}건 계획.`, ownership: '개인 수행 · 콘텐츠 기획·운영' },
      { title: '콘텐츠 평가·보고', description: '운영 콘텐츠의 성과 모니터링과 채용 지원자 콘텐츠 평가·보고서 작성.', ownership: `개인 수행 · 채용 절차 ${roa.recruitments}회 이상 참여` },
      { title: 'CS 프로세스 표준화', description: '고객 응대 업무의 처리 방식을 정리하고 표준화한 운영 개선 경험.', ownership: '개인 수행 범위 · 세부 문서 미첨부' },
    ],
    deliverablesNote: '수행 업무를 요약한 산출물 설명입니다. 콘텐츠 캘린더, 평가·보고서, CS 매뉴얼 원본과 측정 로그는 아직 첨부되지 않았습니다. 그래프는 사용자 제공 수치로 재구성했습니다.',
    caseStudies: [
      {
        label: 'CASE A / CONTENT PERFORMANCE', title: '발행 계획에서 조회수 변화까지',
        problem: '유학·입시 등 서로 다른 분야의 블로그를 지속적으로 운영하면서, 콘텐츠 제작과 발행 계획을 관리하고 성과를 확인해야 했습니다.',
        execution: `블로그 ${roa.blogs}개를 맡아 블로그별 주 ${roa.postsPerBlog}회가량 제작하고 주간 약 ${roa.weeklyPlan}건의 발행을 계획했습니다. 콘텐츠 기획·개선과 성과 모니터링을 수행했으며, 일부 블로그에서 약 ${roa.months}개월간 주간 조회수 증가를 경험했습니다.`,
        flow: ['기존 분야별 운영', '콘텐츠 기획·개선', '성과 모니터링', '주간 조회수 비교'],
        comparison: { id: 'views', title: '일부 블로그의 주간 조회수 변화', scope: `약 ${roa.months}개월 · 일부 블로그 · 주간 조회수`, before: { label: '시작 시점', value: roa.beforeViews }, after: { label: `약 ${roa.months}개월 후`, value: roa.afterViews }, unit: '회', note: '사용자 제공 정보 · 측정 로그 미검증. 시작·종료의 약값만 표시하며 중간 월별 수치, 전체 블로그 합계, 순방문자 수를 의미하지 않습니다.' },
      },
      {
        label: 'CASE B / OPERATIONAL EFFICIENCY', title: '고객 응대 방식을 표준화하다',
        problem: '고객 응대 업무의 처리 방식을 정리하고 표준화하는 과제를 다뤘습니다. 콘텐츠 운영과 별도로, 응대 업무 자체의 효율을 개선하는 경험입니다.',
        execution: `CS 업무 프로세스의 표준화와 개선에 참여했고, 처리 시간 약 ${roa.csReductionPercent}% 단축을 경험했습니다.`,
        flow: ['기존 고객 응대', '프로세스 표준화', '처리 시간 변화'],
        comparison: { id: 'cs', title: 'CS 처리 시간 전후 비교', scope: `사용자 제공 · 약 ${roa.csReductionPercent}% 단축 · 상대 지수`, before: { label: '개선 전', value: 100 }, after: { label: '개선 후', value: 100 - roa.csReductionPercent }, unit: '지수', note: `개선 전=100으로 환산한 설명용 비교입니다. 약 ${roa.csReductionPercent}% 단축을 반영한 개선 후 지수이며 실제 처리 시간(분·초)이나 측정 로그가 아닙니다. 기간·표본·산식은 미확인입니다.` },
      },
    ],
    outcomes: [
      { value: `${roa.blogs}개`, label: '분야별 블로그 운영', context: `블로그별 주 ${roa.postsPerBlog}회가량 제작` },
      { value: `약 ${roa.weeklyPlan}건`, label: '주간 콘텐츠 발행 계획', context: '계획 규모 · 실제 주별 발행량과 구분' },
      { value: `${roa.recruitments}+`, label: '채용 절차 참여', context: '지원자 콘텐츠 평가 및 보고' },
    ],
    evidence: `모든 수치는 사용자 제공 정보입니다. 약 ${roa.months}개월간 주간 조회수 약 ${number(roa.beforeViews)}→${number(roa.afterViews)} 변화는 일부 블로그 기준이며, 전체 6개 블로그의 합계나 유입·방문자 수로 바꾸어 해석하지 않습니다. CS 약 ${roa.csReductionPercent}% 단축은 절대 시간·기간·표본·산식이 미확인입니다. 측정 로그를 검증한 성과로 제시하지 않습니다.`,
    learnings: '콘텐츠의 기획·운영·모니터링에서 HR 지원과 CS 개선까지, 실제 비즈니스 운영의 여러 접점을 경험했습니다. 성과를 설명할 때에는 활동 범위와 측정 근거를 함께 제시해야 한다는 관점으로 이 사례를 정리했습니다.',
  },
];

export const otherProjects = [
  { number: '04', name: 'AI Image Denoising', field: 'TECHNICAL RESEARCH', title: '모델의 차이를 데이터로 이해하기', description: 'ResNet, U-Net, DnCNN의 이미지 노이즈 제거 결과를 비교하고 PSNR 기반 정량 평가와 결과 발표를 수행했습니다. 모델별 성능을 수치로 비교하는 평가 관점을 다뤘습니다.', process: ['노이즈 제거 문제', '세 모델 결과 비교', 'PSNR 기반 평가'], detail: '실험 데이터·노이즈 조건·학습 설정·모델별 PSNR 원값은 미제공입니다. 성능 순위나 우수 모델을 단정하지 않습니다.', tags: ['Deep Learning', 'Model Evaluation'], status: '비교·분석 경험' },
  { number: '05', name: 'POEx', field: 'EXPERIENCE DESIGN', title: '정책을 참여하는 경험으로', description: '정책 제안을 시각적인 전시 콘텐츠로 변환하고, 관람객이 선택에 참여한 뒤 의견을 남기는 구조를 기획했습니다. 전시 구성과 참여 UX, 의견 수집의 접점을 다뤘습니다.', process: ['정책 제안', '전시 콘텐츠 변환', '관람객 선택', '의견 수집'], detail: '참여형 전시의 기획 구조입니다. 실제 시행 여부, 방문자 수·선택 결과·수집 의견 등 운영 성과는 미확인입니다.', tags: ['Exhibition Planning', 'UX'], status: '기획 경험 · 운영 여부 미확인' },
  { number: '06', name: 'Dayflow', field: 'PRODUCT CONCEPT', title: '일상의 계획을 더 자연스럽게', description: '자연어 일정 입력을 출발점으로 일정·할 일·반복 루틴을 관리하고 대시보드에서 전체 계획을 보는 제품 구조를 기획했습니다. 입력과 관리, 한눈에 확인하는 흐름을 연결했습니다.', process: ['자연어 일정 입력', '일정·할 일·반복 루틴', '대시보드'], detail: '위 흐름은 기획 범위입니다. 기능별 구현 완료 여부가 확인되지 않아 실제 구현 기능으로 분류한 항목은 아직 없습니다.', tags: ['Product Planning', 'UX'], status: '기획 경험 · 구현 범위 미확인' },
];

// v3 확장 상세와 학습 프로젝트. 수치·수행 범위는 이 파일에서 함께 관리합니다.
export type EvidenceAsset = { src: string; alt: string; caption: string; kind: 'actual' | 'illustration'; width?: number; height?: number };
export type ExtendedProject = {
  slug: string;
  name: string;
  kind: 'camp' | 'display' | 'denoising' | 'policy';
  category: string;
  period: string;
  summary: string;
  role: string;
  status: string;
  overview: string;
  contribution: string;
  outputs: string[];
  evidence: string;
  sections: { id: string; label: string }[];
  assets?: EvidenceAsset[];
};

export const extendedProjects: ExtendedProject[] = [
  {
    slug: 'ai-camp', name: 'SK Networks Family AI Camp 5기', kind: 'camp', category: 'AI & Data Experience', period: '2026.01 — 2026.07',
    summary: '데이터 비교·분석에서 RAG 서비스와 최종 제품 기획·구현까지 연결한 교육 프로젝트 경험.',
    role: '교육 프로젝트 참여 · HumouR 기획·데이터·협업·발표', status: '교육 프로젝트 경험 · 세부 기여 범위는 항목별 구분',
    overview: '자동차·카드·날씨와 교통사고 데이터를 다룬 분석 경험, Pickle·LGNeer의 RAG 서비스 경험, HumouR 최종 프로젝트를 하나의 역량 발전 구조로 정리했습니다. 개별 분석과 서비스 경험이 사용자 문제를 정의하고 제품 구조를 설명하는 역량으로 어떻게 이어지는지 보여줍니다.',
    contribution: 'HumouR에서는 서비스 기획, 직군별 데이터 작업, 개발 협업과 발표에 참여했습니다. 앞선 5개 프로젝트는 참여·학습 경험을 소개하며, 개인별 담당 기능·분석 범위·최종 산출물은 원본 자료가 없어 별도로 확정하지 않습니다.',
    outputs: ['자동차·카드·날씨/교통사고의 비교·전처리·관계 분석 경험', 'Pickle·LGNeer의 RAG 기반 정보 탐색·추천 서비스 경험', 'HumouR의 채용 보조 서비스 기획·직군별 데이터·팀 협업 및 발표'],
    evidence: '프로젝트명과 학습 범위는 사용자 제공 정보입니다. 아래 3단계는 역량별 발전 구조이며 실제 수행 순서를 입증하는 시간순 연혁이 아닙니다. 앞선 프로젝트의 성능·개인 기여·운영 성과는 미확인입니다.',
    sections: [{ id: 'overview', label: '01 Overview' }, { id: 'growth', label: '02 Learning Journey' }, { id: 'contribution', label: '03 Contribution & Outputs' }],
  },
  {
    slug: 'display-research', name: '플렉서블·웨어러블 디스플레이 연구', kind: 'display', category: 'Academic & Engineering', period: '2024년 2학기 · 종합설계Ⅱ',
    summary: '디스플레이의 형태 제약과 응용 가능성을 조사하고, 기술을 비전공자가 이해할 수 있는 콘텐츠로 구성한 3인 팀 프로젝트.',
    role: '3인 팀 참여 · 기술 조사·응용 분석·설명 콘텐츠·발표 경험', status: '기술 조사·분석 프로젝트 · 디스플레이 제품 개발 아님',
    overview: '고려대학교 종합설계Ⅱ에서 기존 디스플레이의 형태 제약을 살피고, 플렉서블 기술과 웨어러블 응용의 가능성을 조사했습니다. 논문·산업 동향을 조사해 차량용 등 응용 방향을 검토하고, 비전공자를 위한 기술 설명 콘텐츠와 팜플렛 구성, 결과 발표로 연결했습니다.',
    contribution: '3인 팀으로 조사·분석·설명 콘텐츠 및 발표를 수행한 경험입니다. 개인별 논문 조사, 팜플렛 제작, 발표의 구체적인 분담은 추가 확인이 필요하며, 패널이나 디스플레이 제품을 직접 개발한 성과로 표현하지 않습니다.',
    outputs: ['기존 기술의 한계와 플렉서블·웨어러블 응용을 정리한 기술 조사', '차량용 및 기타 응용 가능성 분석', '비전공자 대상 기술 설명 콘텐츠·팜플렛 구성과 결과 발표'],
    evidence: '3인 팀·과목·학기·수행 범위는 사용자 제공 정보입니다. 비교표는 공개 기술 자료로 재구성한 설명 자료이며 당시 원본 팜플렛이나 실험 결과가 아닙니다. 실제 조사한 논문 목록·원본 발표 자료·개인 분담은 미제공입니다.',
    sections: [{ id: 'overview', label: '01 Research Question' }, { id: 'comparison', label: '02 Technology Comparison' }, { id: 'research', label: '03 Research Process' }, { id: 'contribution', label: '04 Contribution & Outputs' }],
  },
  {
    slug: 'image-denoising', name: 'AI Image Denoising', kind: 'denoising', category: 'Academic & Engineering', period: '전공 프로젝트 · 수행 기간 미확인',
    summary: 'ResNet·U-Net·DnCNN 관련 모델의 이미지 노이즈 제거 결과를 비교하고 PSNR 기반 평가·발표를 수행한 경험.',
    role: '모델 비교·복원 성능 분석·실험 결과 정리 및 발표 경험', status: '실험·분석 경험 · 결과 이미지·PSNR 원값 미제공',
    overview: '이미지의 노이즈를 줄이면서 복원 성능을 어떻게 비교할지 다룬 프로젝트입니다. ResNet, U-Net, DnCNN 관련 모델을 비교하고 PSNR 등 정량 지표로 결과를 분석·정리해 발표했습니다. 아래에는 평가가 무엇을 비교하는지와 각 모델 구조의 일반적 특징을 설명합니다.',
    contribution: '모델 비교, 이미지 복원 성능 분석과 결과 정리·발표 경험을 소개합니다. 모델별 구현 담당, 학습 설정과 개인별 실험 범위는 원본 자료가 없어 특정 모델의 단독 개발이나 전체 실험 수행으로 확대하지 않습니다.',
    outputs: ['세 모델 관련 노이즈 제거 실험과 복원 성능 비교', 'PSNR 등 정량 지표를 활용한 평가·분석', '실험 결과 정리와 발표'],
    evidence: '실험 경험과 사용한 모델·지표는 사용자 제공 정보입니다. 실제 원본/노이즈/복원 이미지와 PSNR 원값이 없어 개념 도식만 표시합니다. 모델별 우열·개선율·학습 시간은 제시하지 않습니다.',
    sections: [{ id: 'overview', label: '01 Experiment Question' }, { id: 'experiment', label: '02 Restoration Flow' }, { id: 'models', label: '03 Models & Evaluation' }, { id: 'contribution', label: '04 Contribution & Outputs' }],
  },
  {
    slug: 'policy-exhibition', name: 'VAN 정책전시회 · POEx', kind: 'policy', category: 'Product & Policy Planning', period: '기획 사례 · 수행 시점 미확인',
    summary: '작품→해설→정책의 전시 셀을 중심으로, 사회문제의 맥락과 선택지를 관람객이 이해하도록 설계한 기획 사례.',
    role: '사업·운영 구조 기획 · 전시 셀·관람 경험 · 콘텐츠 전달·협업 구조 설계', status: '기획된 전시 경험 · 실제 운영 범위 미확인',
    overview: '전문적인 정책 자료를 시민이 이해할 수 있는 시각적 전시 경험으로 전환하는 기획입니다. 작품에서 사회문제와 갈등을 발견하고, 해설로 맥락과 이해관계를 이해한 뒤, 정책 방향과 선택지를 살피도록 구성했습니다. QR 해설·스티커 투표·의견 수집은 전시 이해를 보조하는 장치로 두었습니다.',
    contribution: '정책전시 사업과 운영 구조, 전시 셀·관람 경험, 정책 콘텐츠의 전달 방식과 관련 부서의 협업 구조를 기획했습니다. 전시와 참여 프로그램의 관계를 정립하는 역할을 다뤘으며, 실제 설치·현장 운영을 수행한 범위는 확인되지 않았습니다.',
    outputs: ['작품·해설·정책이 연결되는 전시 셀 구조 구상', '문제 발견부터 정책 선택지 비교·의견 표현까지 관람 경험 설계', '정책 콘텐츠 전달·관련 부서 협업·운영 구조 기획'],
    evidence: '기획 내용과 역할은 사용자 제공 정보입니다. POEx의 제안·기획과 실제 운영된 정책전시회의 사실을 합치지 않습니다. 행사 일시·장소·실행 범위·관람객 수·의견 수집 결과는 미확인입니다. VAN Conference 2026의 개최 사실·신청 건수도 이 사례의 성과로 사용하지 않습니다.',
    sections: [{ id: 'overview', label: '01 Planning Context' }, { id: 'exhibition-cell', label: '02 Exhibition Cell' }, { id: 'visitor-journey', label: '03 Visitor Journey' }, { id: 'contribution', label: '04 Contribution & Outputs' }],
  },
];

export type CampProject = { id: string; name: string; problem: string; scope: string; output: string; href?: string };
export type CampStage = { title: string; tools: string; question: string; next: string; projects: CampProject[] };
export const campStages: CampStage[] = [
  {
    title: '데이터 분석', tools: 'SQL · 데이터 전처리 · 비교·관계 분석', question: '서로 다른 조건과 데이터를 어떤 기준으로 비교하고 해석할 것인가?',
    next: '비교 기준 설정과 결과 해석 → 사용자 요구에 맞는 정보 탐색',
    projects: [
      { id: 'car-cost', name: '자동차 선택 및 보유비용 비교', problem: '구매 가격 외에 연료비·유지비를 포함해 차량 선택의 비교 기준을 살펴보는 분석.', scope: 'SQL·데이터 활용과 구매/유지비 비교 경험. 실제 대상 차량·분석 기간·계산 조건은 미확인.', output: '비용 비교 분석 경험 · 원본 비교표와 개인 담당 범위 미제공' },
      { id: 'card-data', name: '카드 사용 데이터 분석', problem: '카드 관련 데이터를 전처리하고 분석 결과를 해석하는 과제.', scope: '데이터 전처리·분석·해석 경험. 데이터셋·분석 질문·도구별 사용 범위·개인 역할은 미확인.', output: '데이터 분석 경험 · 구체적 결과와 분석 보고서 미제공' },
      { id: 'weather-traffic', name: '서울 날씨·교통사고 분석', problem: '날씨와 교통사고 변수 사이에 관계가 있는지 살펴보는 분석.', scope: '변수 간 관계·상관관계 검토 경험. 분석 가설과 실제 결과를 구분하며, 유의미한 관계가 확인되었는지는 미확인.', output: '관계 분석 경험 · 상관계수·유의성·인과관계 결론은 제시하지 않음' },
    ],
  },
  {
    title: 'AI 서비스 개발', tools: 'RAG · 정보 검색 · 추천 흐름', question: '사용자의 요구를 어떤 정보와 연결해 탐색·추천을 도울 것인가?',
    next: '정보 검색·추천 경험 → 사용자와 업무 흐름을 고려한 제품 구조',
    projects: [
      { id: 'pickle', name: 'Pickle · 맛집 추천 챗봇', problem: '사용자 요구에 맞춰 맛집 정보를 탐색하고 추천하는 RAG 기반 서비스.', scope: '요구→관련 정보 검색→추천이라는 개념적 구조. 실제 구현 기능, 데이터 출처, 개인 기여는 확인 전까지 확정하지 않음.', output: 'RAG 서비스 프로젝트 경험 · 코드·검색/추천 결과 화면 미제공' },
      { id: 'lgneer', name: 'LGNeer · 가전 추천 챗봇', problem: '사용자 요구조건과 제품 정보를 연결하는 RAG 기반 탐색·추천 서비스.', scope: '요구조건→제품 정보 검색→추천 근거의 개념적 구조. 필터·모델·DB·연동 방식과 개인 구현 범위는 미확인.', output: 'RAG 서비스 프로젝트 경험 · 실제 기능·구현 구조 원본 미제공' },
    ],
  },
  {
    title: '최종 제품 기획·구현', tools: 'RAG · LangChain/LangGraph · Celery · 팀 개발', question: 'AI의 정보 정리를 담당자의 검토와 의사결정 흐름으로 어떻게 연결할 것인가?',
    next: '문제 정의·직군 데이터 구조화·개발 협업을 하나의 서비스로 연결',
    projects: [
      { id: 'humour', name: 'HumouR · AI 채용 보조', problem: projects.find(project => project.slug === 'humour')!.summary, scope: `개발자 ${humour.roles}개 직군, qualification ${humour.qualification}건·preferred ${humour.preferred}건. 개인 기획·데이터·협업·발표와 팀 개발 구분.`, output: '채용 정보 요약·검토 항목·면접 질문을 연결한 최종 팀 프로젝트', href: '/projects/humour' },
    ],
  },
];

export const displayComparison = {
  caption: '설명용 기술 비교 · 일반적인 강성 평면 구조를 기준으로 비교합니다. 웨어러블은 독립된 패널 기술이 아닌 응용 범주이며, 평면 표시 형태 자체가 반드시 강성 기판을 뜻하지는 않습니다.',
  columns: ['일반 강성 평면 디스플레이', '플렉서블 디스플레이', '웨어러블 디스플레이 응용'],
  rows: [
    { criterion: '구조적 특성', values: ['유리 등 강성 기판을 사용하는 일반적인 고정형 패널을 비교 기준으로 설정', 'PI 등 유연한 기판과 박막 봉지(TFE) 등을 활용하는 구조', '착용형 기기에 패널을 탑재하는 응용. 강성·플렉서블 등 패널 방식과 구분'] },
    { criterion: '유연성·형태 제약', values: ['구조를 유지하는 형태로 사용하며 접힘·변형에 제약', '굽힘·접힘 등의 형태 확장. 허용 곡률·모듈 설계·내구 조건의 제약은 존재', '착용 위치와 기기 형상에 맞춘 크기·무게·표시 형태 검토'] },
    { criterion: '대표 응용·검토 방향', values: ['고정형 화면을 사용하는 일반 디스플레이', '폴더블 기기·곡면 등 형태 확장, 차량용 응용 가능성 검토', '스마트워치 등 착용형 기기의 정보 표시'] },
    { criterion: '기술적 과제', values: ['고정된 형태에서 새로운 곡면·접힘 구조로 확장하는 제약', '반복 굽힘의 내구성과 수분·산소를 막는 봉지 구조', '작고 가벼운 형태에서의 표시 품질·구동 시간 등 시스템 조건'] },
  ],
};

export const researchFlow: FlowDiagram = {
  title: '기술을 조사하고, 이해 가능한 콘텐츠로 바꾸기',
  steps: [{ label: '기술 조사', detail: '기존 방식과 형태 제약 확인' }, { label: '논문·산업 분석', detail: '기술의 특징과 발전 방향 조사' }, { label: '응용 가능성', detail: '차량용·웨어러블 등 활용 검토' }, { label: '설명 콘텐츠', detail: '비전공자용 콘텐츠·팜플렛 구성' }, { label: '발표', detail: '조사 결과 전달' }],
  caption: '사용자 제공 수행 과정을 정리한 설명용 도식 · 원본 팜플렛·발표 슬라이드는 미첨부입니다.',
};

export const denoisingFlow: FlowDiagram = {
  title: 'Original Image → Noisy Image → Denoised Image',
  steps: [{ label: 'Original Image', detail: '복원 성능을 비교할 기준 영상' }, { label: 'Noisy Image', detail: '노이즈가 포함된 모델 입력' }, { label: 'Denoised Image', detail: '모델이 출력하는 복원 영상' }],
  caption: '설명용 실험 과정 도식 · 이미지 대신 역할을 표시했습니다. 실제 실험 이미지·노이즈 생성 조건·복원 결과를 임의로 만들지 않았습니다.',
};

export const denoisingModels = [
  { name: 'ResNet', structure: '입력과 잔차 함수를 더하는 skip connection이 깊은 네트워크 학습을 돕는 구조.', approach: '잔차 학습 구조를 복원 문제에 활용하는 관점. 원 논문은 이미지 인식 연구이며, 이 프로젝트에서의 복원용 변형 구조는 미확인.', evaluation: '복원용 구현과 입출력 정의 확인 후 기준 영상 대비 PSNR 비교.' },
  { name: 'U-Net', structure: '축소 경로와 확장 경로를 연결해 맥락과 위치 정보를 함께 다루는 구조.', approach: '인코더·디코더 및 경로 간 연결을 활용하는 복원 관점. 원 논문은 영상 분할 연구이며, 실제 복원 설정은 별도 확인 필요.', evaluation: '입출력 크기와 학습·평가 조건을 확인하고 동일 기준으로 복원 결과 비교.' },
  { name: 'DnCNN', structure: 'CNN·잔차 학습·배치 정규화를 활용하는 이미지 노이즈 제거 모델.', approach: '노이즈 잔차를 학습해 깨끗한 영상을 복원하는 방식. 일반적인 모델 설명과 실제 실험 구현을 구분.', evaluation: '노이즈 종류·수준과 테스트 영상을 확인한 뒤 기준 영상 대비 PSNR 비교.' },
];

export const psnrExplanation = {
  title: 'PSNR은 무엇을 비교하는가?', formula: 'PSNR = 10 log₁₀(MAX² / MSE)',
  text: '기준 영상과 복원 영상의 평균제곱오차(MSE)를 최대 신호값(MAX)에 대한 비율로 나타낸 dB 단위 지표입니다. 같은 신호 범위·평가 조건에서 값이 높으면 오차가 작다는 뜻입니다.',
  limit: '동일한 테스트 영상·노이즈 조건·신호 범위 등을 맞춰 비교해야 합니다. 실제 실험의 PSNR 원값과 조건이 없어 수치 표나 모델 순위는 표시하지 않습니다.',
};

export const policyCell: FlowDiagram = {
  title: '작품 → 해설 → 정책',
  steps: [{ label: '작품', detail: '사회문제와 갈등 구조를 시각화해 관람의 출발점 제공' }, { label: '해설', detail: '문제의 맥락과 이해관계자를 설명해 작품 이해를 지원' }, { label: '정책', detail: '정책 방향과 해결 방안을 연결해 선택지를 이해' }],
  caption: '기획된 전시 셀 구조 · 전시가 중심이며 참여 도구는 이해와 의견 표현을 보조합니다. 실제 설치·운영 자료가 아닙니다.',
};

export const policyJourney: FlowDiagram = {
  title: '관람객 경험 여정',
  steps: [{ label: '문제 발견', detail: '사회문제와 갈등의 존재 인식' }, { label: '작품 관람', detail: '시각적 표현을 통해 문제와 만남' }, { label: '해설 이해', detail: '맥락·이해관계·쟁점 파악' }, { label: '정책 선택지 비교', detail: '정책 방향과 해결 방안 검토' }, { label: '의견 표현', detail: '이해한 내용을 바탕으로 의견 전달' }],
  caption: '기획된 관람 경험을 설명하는 여정도 · 실제 관찰 조사·방문 기록·운영 결과가 아닙니다.',
};

export const policySupports = [
  { name: 'QR 해설', purpose: '작품·해설의 추가 맥락을 확인하는 보조 채널', point: '해설 이해 단계' },
  { name: '스티커 투표', purpose: '정책 선택지에 대한 관람객의 의사를 표현하는 장치', point: '선택지 비교·의견 표현 단계' },
  { name: '의견 수집', purpose: '전시를 이해한 뒤 생각을 남기는 참여 접점', point: '의견 표현 단계' },
];

export const engineeringHands = {
  id: 'hands', name: 'HANDS RC카 해커톤', description: '고려대학교 전공 학회에서 Arduino 기반 RC카를 팀 단위로 설계·제작하고 주행 테스트를 경험했습니다.',
  scope: '하드웨어·제어 관련 협업 경험. 개인 담당 회로·코드·제어 기능, 주행 기록과 대회 결과는 미확인입니다.',
};

export const technicalReferences = {
  display: [
    { title: 'Samsung Display · Flexible OLED', url: 'https://global.samsungdisplay.com/28236' },
    { title: 'Samsung Display · Thin Film Encapsulation', url: 'https://global.samsungdisplay.com/29678' },
    { title: 'LG Display · Tandem OLED', url: 'https://www.lgdisplay.com/eng/technology/tandem-oled' },
  ],
  denoising: [
    { title: 'ResNet · He et al. (2015)', url: 'https://arxiv.org/abs/1512.03385' },
    { title: 'U-Net · Ronneberger et al. (2015)', url: 'https://arxiv.org/abs/1505.04597' },
    { title: 'DnCNN · Zhang et al. (2016)', url: 'https://arxiv.org/abs/1608.03981' },
    { title: 'MathWorks · PSNR', url: 'https://www.mathworks.com/help/images/ref/psnr.html' },
  ],
};

export type LearningCollection = { id: string; title: string; summary: string; href: string; status: string; items: { id: string; name: string; href?: string }[] };
export const learningCollections: LearningCollection[] = [
  { id: 'ai-data', title: 'AI & Data Experience', summary: '데이터 분석에서 RAG 서비스, 최종 제품으로 이어진 AI Camp 경험.', href: '/projects/ai-camp', status: '2026.01 — 2026.07 · 교육 프로젝트', items: campStages.flatMap(stage => stage.projects.map(project => ({ id: project.id, name: project.name }))) },
  { id: 'academic-engineering', title: 'Academic & Engineering', summary: '디스플레이 기술 조사, 이미지 복원 평가와 하드웨어·제어 협업.', href: '/projects/display-research', status: '전공 연구·실험·제작 경험', items: [{ id: 'display-research', name: '플렉서블·웨어러블 디스플레이', href: '/projects/display-research' }, { id: 'image-denoising', name: 'AI Image Denoising', href: '/projects/image-denoising' }, { id: engineeringHands.id, name: engineeringHands.name, href: '/projects/display-research#hands' }] },
  { id: 'product-policy', title: 'Product & Policy Planning', summary: '정책을 이해하는 관람 경험과 일상의 계획을 다루는 제품 구조.', href: '/projects/policy-exhibition', status: '기획 경험 · 운영·구현 범위 구분', items: [{ id: 'policy-exhibition', name: 'VAN 정책전시회 · POEx', href: '/projects/policy-exhibition' }, { id: 'dayflow', name: 'Dayflow', href: '/projects/policy-exhibition#dayflow' }] },
];

export const allProjectIds = [...new Set([...projects.map(project => project.slug), ...learningCollections.flatMap(collection => collection.items.map(item => item.id))])];
