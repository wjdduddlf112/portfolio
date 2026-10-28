import { Link } from 'react-router-dom';
import type { ExtendedProject } from '../data/projects';
import { denoisingFlow, researchFlow, policyCell, policyJourney, policySupports, engineeringHands, otherProjects } from '../data/projects';
import { FlowFigure } from '../components/ProjectEvidence';
import { CampTimeline, DisplayComparison, DenoisingComparison, TechnicalSources } from '../components/LearningVisuals';
import { Contact } from '../components/Contact';
import { Arrow } from '../components/Icon';

function ProjectStory({ project }: { project: ExtendedProject }) {
  if (project.kind === 'camp') return <section id="growth"><span className="eyebrow">02 / LEARNING JOURNEY</span><h2>정보를 분석하는 일에서, 제품을 설계하는 일로</h2><CampTimeline /></section>;
  if (project.kind === 'display') return <>
    <section id="comparison"><span className="eyebrow">02 / TECHNOLOGY COMPARISON</span><h2>같은 화면, 다른 구조와 사용 맥락</h2><DisplayComparison /><TechnicalSources kind="display" /></section>
    <section id="research"><span className="eyebrow">03 / RESEARCH TO COMMUNICATION</span><h2>조사한 기술을 설명 가능한 형태로</h2><FlowFigure diagram={researchFlow} /></section>
  </>;
  if (project.kind === 'denoising') return <>
    <section id="experiment"><span className="eyebrow">02 / RESTORATION FLOW</span><h2>입력과 복원 결과, 무엇을 비교하는가</h2><FlowFigure diagram={denoisingFlow} /></section>
    <section id="models"><span className="eyebrow">03 / MODELS & EVALUATION</span><h2>모델 구조와 평가 기준을 나누어 이해하기</h2><DenoisingComparison /><TechnicalSources kind="denoising" /></section>
  </>;
  return <>
    <section id="exhibition-cell"><span className="eyebrow">02 / EXHIBITION CELL</span><h2>참여 장치보다 먼저, 전시의 이해 구조</h2><FlowFigure diagram={policyCell} /></section>
    <section id="visitor-journey"><span className="eyebrow">03 / PLANNED VISITOR JOURNEY</span><h2>관람에서 이해로, 이해에서 의견으로</h2><FlowFigure diagram={policyJourney} /><div className="policy-supports"><h3>전시를 보조하는 참여 장치</h3><dl>{policySupports.map(item => <div key={item.name}><dt>{item.name}<small>{item.point}</small></dt><dd>{item.purpose}</dd></div>)}</dl><p>기획된 활용 범위입니다. 도구의 실제 설치·운영 여부와 수집 결과는 확인되지 않았습니다.</p></div></section>
  </>;
}

function RelatedPractice({ project }: { project: ExtendedProject }) {
  if (project.kind === 'display') return <section id="hands" className="related-practice"><span className="eyebrow">RELATED / HARDWARE & CONTROL</span><h2>{engineeringHands.name}</h2><p>{engineeringHands.description}</p><p className="role-note">{engineeringHands.scope}</p><Link className="text-link" to="/projects/image-denoising">이미지 복원 프로젝트도 살펴보기<Arrow diagonal /></Link></section>;
  if (project.kind === 'policy') {
    const dayflow = otherProjects.find(item => item.name === 'Dayflow')!;
    return <section id="dayflow" className="related-practice"><span className="eyebrow">RELATED / PRODUCT PLANNING</span><h2>{dayflow.name}</h2><p>{dayflow.description}</p><FlowFigure diagram={{ title: '기획한 제품 구조', steps: dayflow.process.map(label => ({ label, detail: label === '자연어 일정 입력' ? '사용자가 계획을 입력하는 접점' : label === '대시보드' ? '전체 계획을 살펴보는 구조' : '계획을 유형별로 관리하는 구조' })), caption: dayflow.detail }} /><p className="role-note">{dayflow.status}</p></section>;
  }
  return null;
}

export default function ExtendedProjectDetail({ project }: { project: ExtendedProject }) {
  return <>
    <article className={`detail-page extended-detail extended-${project.kind}`}>
      <div className="container detail-header">
        <Link to="/#explorations" className="back-link"><span aria-hidden="true">←</span> All explorations</Link>
        <div className="detail-eyebrow"><span>{project.category.toUpperCase()}</span><span>LEARNING & PRACTICE</span></div>
        <h1>{project.name}</h1><p className="detail-subtitle">{project.summary}</p>
        <div className="detail-meta"><div><span>PERIOD</span><p>{project.period}</p></div><div><span>CONTRIBUTION</span><p>{project.role}</p></div><div><span>STATUS</span><p>{project.status}</p></div></div>
      </div>
      <div className="container detail-body">
        <aside className="detail-toc" aria-label="사례 목차"><span className="eyebrow">IN THIS CASE</span>{project.sections.map(item => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}</aside>
        <div className="detail-content">
          <section id="overview"><span className="eyebrow">01 / CONTEXT & PURPOSE</span><h2>이 경험에서 다룬 문제</h2><p className="lead-paragraph">{project.overview}</p></section>
          {project.assets && project.assets.length > 0 && <div className="provided-assets">{project.assets.map(asset => <figure className="evidence-figure" key={asset.src}><img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} loading="lazy" /><figcaption>{asset.kind === 'actual' ? '제공된 실제 자료' : '설명용 자료'} · {asset.caption}</figcaption></figure>)}</div>}
          <ProjectStory project={project} />
          <section id="contribution"><span className="eyebrow">CONTRIBUTION & OUTPUTS</span><h2>기여와 산출 경험의 범위</h2><p>{project.contribution}</p><ul className="role-list">{project.outputs.map(output => <li key={output}><Arrow />{output}</li>)}</ul><div className="evidence-note"><span>정보의 범위</span><p>{project.evidence}</p></div></section>
          <RelatedPractice project={project} />
        </div>
      </div>
    </article>
    <section className="next-project container"><span className="eyebrow">CONTINUE EXPLORING</span><Link to={project.kind === 'camp' ? '/projects/humour' : '/#explorations'}><span>{project.kind === 'camp' ? 'HumouR' : '다른 경험 살펴보기'}<small>{project.kind === 'camp' ? 'AI Camp 최종 대표 사례' : 'AI · Engineering · Policy'}</small></span><Arrow diagonal /></Link></section>
    <Contact />
  </>;
}
