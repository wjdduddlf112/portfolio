export const profile = {
  name: '정영일',
  englishName: 'Youngil Jung',
  headline: '복잡한 문제를,\n명확한 다음 단계로.',
  introduction: '데이터와 기술을 이해하고, 사람과 비즈니스를 연결합니다. 문제의 본질을 찾고 실행 가능한 서비스와 경험으로 만드는 기획자 정영일입니다.',
  education: { school: '고려대학교', major: '전기전자공학', period: '2016.03 — 2026.02', status: null as string | null },
  languages: '영어·중국어 활용 경험',
  // 확인된 공개 연락처만 입력하세요. null인 항목은 화면에서 숨깁니다.
  email: 'wjdduddlf112@naver.com' as string | null,
  secondaryEmail: 'wjdduddlf112@gmail.com' as string | null,
  github: 'https://github.com/wjdduddlf112' as string | null,
  linkedIn: null as string | null,
  // PDF를 public/에 넣고 '/resume.pdf' 형태로 지정하세요.
  resumeUrl: null as string | null,
};

export const competencies = [
  { number: '01', title: '문제의 구조를 찾는 기획', description: 'HumouR에서 직무 요구 데이터를 구분하고, 담당자의 정보 검토에서 면접 준비까지 이어지는 서비스 구조를 다뤘습니다.', tags: ['Product Planning', 'Data Analysis'] },
  { number: '02', title: '기술과 비즈니스의 연결', description: 'AI가 제공할 정보와 사람이 결정할 영역을 나누고, RAG·비동기 처리 등을 활용하는 팀의 기획·개발 협업에 참여했습니다.', tags: ['AI Service Planning', 'Cross-functional Collaboration'] },
  { number: '03', title: '끝까지 이어지는 실행', description: '컨퍼런스의 프로그램·관계자·운영 조직을 조율하고, 블로그 제작·발행 계획과 CS 업무 표준화를 수행했습니다.', tags: ['Project Management', 'Process Improvement'] },
];

export const technicalSkills = [
  { title: 'AI & Data', items: 'SQL · Python · RAG · LangChain / LangGraph', context: 'SQL·데이터 분석 교육 프로젝트와 HumouR의 데이터 작업·팀 기술 협업 경험' },
  { title: 'Web & Infrastructure', items: 'Django · Celery', context: 'HumouR 팀 프로젝트에서 사용한 기술 · 개인 숙련도와 구분' },
  { title: 'Model Evaluation', items: 'ResNet · U-Net · DnCNN · PSNR', context: '이미지 노이즈 제거 모델 비교·분석 경험' },
  { title: 'Hardware & Control', items: 'Arduino · RC Car', context: 'HANDS 팀 단위 설계·제작·주행 테스트 경험 · 개인 기능별 담당은 미확인' },
];

// SQL은 v3에서 자동차 데이터 프로젝트의 학습·활용 경험으로 제공되었습니다.
// React·Docker의 개인 숙련도는 확인되지 않아 전문 역량으로 단정하지 않습니다.
