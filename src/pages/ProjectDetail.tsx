import { Link, useParams } from 'react-router-dom';
import { projects, extendedProjects } from '../data/projects';
import ExtendedProjectDetail from './ExtendedProjectDetail';
import { ProjectArtwork } from '../components/Artwork';
import { Arrow, Asterisk } from '../components/Icon';
import { Contact } from '../components/Contact';
import { CaseStudies, ProjectDeliverables } from '../components/ProjectEvidence';

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) {
    const extended = extendedProjects.find(item => item.slug === slug);
    return extended ? <ExtendedProjectDetail project={extended} /> : <NotFound />;
  }
  const next = projects[(index + 1) % projects.length];
  return <>
    <article className={`detail-page detail-${project.visual}`}>
      <div className="container detail-header"><Link to="/#projects" className="back-link"><span aria-hidden="true">←</span> All projects</Link><div className="detail-eyebrow"><span>{project.eyebrow}</span><span>CASE STUDY / {project.number}</span></div><h1>{project.name}</h1><p className="detail-subtitle">{project.title.replace('\n', ' ')}</p><div className="detail-meta"><div><span>PERIOD</span><p>{project.period}</p></div><div><span>MY ROLE</span><p>{project.role}</p></div><div><span>FIELD</span><p>{project.category}</p></div></div></div>
      <div className="container detail-art"><ProjectArtwork project={project} /></div>
      <div className="container detail-body"><aside className="detail-toc" aria-label="사례 목차"><span className="eyebrow">IN THIS CASE</span><a href="#overview">01 Overview</a><a href="#problem">02 Problem & Goals</a><a href="#role">03 My Role</a><a href="#process">04 Process</a><a href="#deliverables">05 Deliverables</a><a href="#outcomes">06 Outcomes</a><a href="#learnings">07 Learnings</a></aside><div className="detail-content">
        <section id="overview"><span className="eyebrow">01 / PROJECT OVERVIEW</span><h2>{project.visual === 'humour' ? '검토를 돕는 기술, 판단을 맡는 사람.' : project.visual === 'van' ? '질문을 중심으로 모이는 사람들.' : '콘텐츠에서 운영의 개선까지.'}</h2><p className="lead-paragraph">{project.overview}</p></section>
        <section id="problem"><span className="eyebrow">02 / BACKGROUND & GOALS</span><h2>어떤 문제를 풀고자 했는가</h2><p>{project.problem}</p><div className="goals-box"><h3>목표로 삼은 것</h3><ol>{project.goals.map((goal, i) => <li key={goal}><span>0{i + 1}</span>{goal}</li>)}</ol></div><div className="decision-list"><h3>기획과 실행에서 다룬 선택</h3>{project.decisions.map(item => <div key={item.choice}><h4>{item.choice}</h4><p>{item.reason}</p></div>)}</div></section>
        <section id="role"><span className="eyebrow">03 / MY ROLE</span><h2>제가 맡은 일</h2><ul className="role-list">{project.roles.map(role => <li key={role}><Arrow />{role}</li>)}</ul><p className="role-note">{project.visual === 'humour' ? '팀 프로젝트입니다. 기획·데이터·협업 기여와 팀 전체의 구현 결과를 구분합니다.' : project.visual === 'van' ? '행사는 팀이 함께 만든 결과입니다. 본인의 기획·조율 역할과 팀 전체의 성과를 구분합니다.' : '실제 담당한 콘텐츠 운영·평가·업무 개선의 범위를 중심으로 정리했습니다.'}</p></section>
        <section id="process"><span className="eyebrow">04 / PROCESS & EXECUTION</span><h2>{project.visual === 'van' ? '기획이 하나의 행사가 되기까지' : project.visual === 'roa' ? '콘텐츠 성과와 업무 효율, 두 가지 개선' : '문제 정의에서 서비스 구조까지'}</h2>{project.caseStudies ? <CaseStudies cases={project.caseStudies} /> : <div className="process-steps">{project.steps.map((step, i) => <div className="process-step" key={step.title}><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></div>)}</div>}{project.visual === 'humour' && <div className="decision-principle"><Asterisk /><div><h3>AI는 채용을 결정하지 않습니다.</h3><p>정보 요약 → 직무 관련 역량 정리 → 추가 확인 및 면접 질문 → 담당자의 검토와 판단</p><small>서비스의 보조형 구조를 설명하는 개념 흐름입니다.</small></div></div>}</section>
        <section id="deliverables"><span className="eyebrow">05 / KEY DELIVERABLES</span><h2>주요 산출물과 작업 구조</h2><ProjectDeliverables project={project} /></section>
        <section id="outcomes"><span className="eyebrow">06 / OUTCOMES</span><h2>수행 범위와 결과</h2><div className="outcome-grid">{project.outcomes.map(outcome => <div key={outcome.label}><strong>{outcome.value}</strong><h3>{outcome.label}</h3><p>{outcome.context}</p></div>)}</div><div className="evidence-note"><span>정보의 범위</span><p>{project.evidence}</p></div></section>
        <section id="learnings" className="learning-section"><span className="eyebrow">07 / KEY LEARNINGS</span><h2>경험을 통해 연결한 관점</h2><p>{project.learnings}</p></section>
      </div></div>
    </article>
    <section className="next-project container"><span className="eyebrow">NEXT CASE / {next.number}</span><Link to={`/projects/${next.slug}`}><span>{next.name}<small>{next.category}</small></span><Arrow diagonal /></Link></section>
    <Contact />
  </>;
}

export function NotFound() {
  return <section className="not-found container"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>잠시, 다른 길로 들어왔네요.</h1><p>요청하신 페이지를 찾을 수 없습니다.<br />프로젝트 목록에서 다시 살펴보세요.</p><Link className="button button-primary" to="/#projects">프로젝트로 돌아가기<Arrow /></Link></section>;
}
