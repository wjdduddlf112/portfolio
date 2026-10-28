import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import LearningCollections from '../components/LearningCollections';
import { competencies, profile, technicalSkills } from '../data/profile';
import { experiences } from '../data/experience';
import { Arrow, Asterisk } from '../components/Icon';
import { HeroArtwork, ProjectArtwork } from '../components/Artwork';
import { SectionHeading } from '../components/Layout';
import { Contact } from '../components/Contact';

const filters = ['All Projects', 'Product & AI', 'Business & Operations'] as const;

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All Projects');
  const selected = projects.filter(project => filter === 'All Projects' || project.category === filter);
  return <>
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="status-dot" />PRODUCT, PEOPLE & POSSIBILITY</div><h1 id="hero-title">복잡한 문제를,<br /><span>명확한 다음 단계로.</span></h1><p>{profile.introduction}</p><div className="hero-actions"><Link to="/#projects" className="button button-primary">프로젝트 살펴보기<Arrow /></Link><Link to="/#contact" className="text-link">연락하기<Arrow diagonal /></Link></div><div className="hero-fields"><span>Product Management</span><span>AI / AX</span><span>Business & Operations</span></div></div>
      <HeroArtwork />
    </section>
    <div className="intro-strip container"><span className="eyebrow">MY APPROACH</span><p>문제를 정의하고<span className="strip-arrow" aria-hidden="true">↗</span>가능성을 연결하며<span className="strip-arrow" aria-hidden="true">↗</span><strong>실행으로 답합니다.</strong></p><Asterisk /></div>
    <section id="projects" className="projects-section container">
      <SectionHeading number="01" title="Selected work" subtitle="서로 다른 현장, 하나의 문제 해결 태도." />
      <div className="projects-toolbar"><div className="project-filters" aria-label="프로젝트 분야 필터">{filters.map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? 'selected' : ''}>{item}{item === 'All Projects' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div><span className="work-years">2020 — 2026</span></div>
      <div className="project-list" aria-live="polite">{selected.map(project => <article key={project.slug} className="project-row"><Link className="project-art-link" to={`/projects/${project.slug}`} aria-label={`${project.name} 상세 보기`}><ProjectArtwork project={project} /></Link><div className="project-copy"><div className="project-meta"><span>{project.category}</span><span>{project.period}</span></div><h3><Link to={`/projects/${project.slug}`}>{project.name}</Link></h3><p className="project-title">{project.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p><p className="project-summary">{project.summary}</p><dl className="project-facts"><div><dt>ROLE</dt><dd>{project.role}</dd></div><div><dt>FOCUS</dt><dd>{project.contribution}</dd></div></dl><div className="project-card-bottom"><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link className="project-open" to={`/projects/${project.slug}`} aria-label={`${project.name} 사례 읽기`}><Arrow diagonal /></Link></div></div></article>)}</div>
    </section>
    <LearningCollections />
    <section id="about" className="about-section"><div className="container"><SectionHeading number="02" title="A little about me" subtitle="기술을 이해하는 시선, 사람을 향하는 기획." /><div className="about-intro"><h3>관점을 넓히고,<br />해결의 실마리를 찾습니다<span>.</span></h3><div><p>전기전자공학을 공부하며 기술을 이해하는 기반을 쌓았습니다. 콘텐츠 마케팅, 고객 상담, 교육, AI 서비스와 컨퍼런스 기획을 경험하며 서로 다른 현장의 문제를 다뤘습니다.</p><p>이 경험들을 잇는 것은 사람과 맥락을 이해하고, 정보를 정리해 실행 가능한 방향으로 만드는 일입니다.</p><div className="education"><span>EDUCATION & LANGUAGE</span><p>{profile.education.school} · {profile.education.major}<small>{profile.education.period}{profile.education.status ? ` · ${profile.education.status}` : ''}</small></p><p>{profile.languages}</p></div></div></div><div className="competencies">{competencies.map(item => <article key={item.number}><span className="competency-number">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p><div className="competency-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div><div className="technical"><div><span className="eyebrow">TECHNICAL EXPERIENCE</span><h3>기술을 이해하는 기반</h3><p>프로젝트에서 다룬 기술과 협업 맥락입니다.<br />스택 전체를 개인의 전문 숙련도로 표현하지 않습니다.</p></div><div className="technical-list">{technicalSkills.map(item => <div key={item.title}><span>{item.title}</span><h4>{item.items}</h4><p>{item.context}</p></div>)}</div></div></div></section>
    <section id="experience" className="experience-section container"><SectionHeading number="03" title="Experience" subtitle="다양한 경험을, 연결되는 역량으로." /><div className="timeline">{experiences.map(item => <article key={item.organization} className="timeline-item"><span className="timeline-period">{item.period}</span><div><h3>{item.organization}</h3><span className="timeline-role">{item.role}</span><p>{item.description}</p></div>{item.project && <Link to={`/projects/${item.project}`} className="timeline-link" aria-label={`${item.organization} 관련 프로젝트 보기`}><Arrow diagonal /></Link>}</article>)}</div></section>
    <Contact />
  </>;
}
