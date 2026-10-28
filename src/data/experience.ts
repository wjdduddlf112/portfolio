import { projectFacts } from './projects';

export const experiences = [
  { organization: 'VAN Conference 2026', role: '컨퍼런스 기획 TF 팀장', period: '2026.09.12 개최', description: `약 ${projectFacts.van.team}명 기획 TF 리딩 · ${projectFacts.van.sessions}개 세션 기획, 연사·내빈 협의 및 당일 운영 흐름 설계`, project: 'van-conference' },
  { organization: 'SK Networks Family AI Camp 5기', role: '데이터 분석 · AI 서비스 · 최종 프로젝트', period: '2026.01 — 2026.07', description: '데이터 분석에서 RAG 서비스와 HumouR까지. 개인 기획·데이터·협업·발표와 프로젝트별 확인 범위 구분', project: 'ai-camp' },
  { organization: '엘리먼츠', role: '입시 컨설팅 및 고객 상담', period: '2023.07 — 2026.06', description: '대학별 지원 자료와 사례를 분석하고, 개인 맞춤형 전략·보고서 작성 및 고객 커뮤니케이션 수행' },
  { organization: '에듀탑', role: '1:1 수학 교육', period: '2023.01 — 2026.06', description: '중·고등학생별 학습 진단, 계획 수립, 성과 관리 및 학습 개선' },
  { organization: '로아마케팅', role: '콘텐츠 마케팅 · HR 업무 지원', period: '2020.04 — 2024.12', description: `블로그 ${projectFacts.roa.blogs}개 · 주간 약 ${projectFacts.roa.weeklyPlan}건 콘텐츠 발행 계획, 채용 절차 ${projectFacts.roa.recruitments}회 이상 참여 및 CS 업무 표준화`, project: 'roa-marketing' },
];

