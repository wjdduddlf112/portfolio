import { projects, type Project } from '../data/projects';
import { Asterisk } from './Icon';

export function HeroArtwork() {
  return <figure className="hero-art" aria-label="문제와 데이터, 사람과 기술을 연결해 실행으로 이어가는 접근 방식 개념도">
    <div className="art-coordinate top">IDEAS INTO IMPACT</div>
    <svg viewBox="0 0 480 440" className="orbital-art" aria-hidden="true">
      <defs>
        <linearGradient id="orbit-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#182e5b" /><stop offset=".5" stopColor="#4266a5" /><stop offset="1" stopColor="#213a70" /></linearGradient>
        <radialGradient id="orbit-glow"><stop stopColor="#d8e0eb" stopOpacity=".5" /><stop offset="1" stopColor="#d8e0eb" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="240" cy="220" r="195" fill="url(#orbit-glow)" />
      <path d="M35 220h410M240 28v384" stroke="#bdc7d4" strokeWidth=".8" strokeDasharray="3 6" />
      <circle cx="240" cy="220" r="158" fill="none" stroke="#ccd2dc" strokeWidth=".8" />
      <circle cx="240" cy="220" r="187" fill="none" stroke="#d9dce1" strokeWidth=".6" />
      <g transform="rotate(-33 240 220)">
        <ellipse cx="240" cy="220" rx="100" ry="150" fill="none" stroke="url(#orbit-gradient)" strokeWidth="34" />
        <ellipse cx="240" cy="220" rx="150" ry="64" fill="none" stroke="#294c84" strokeWidth="26" />
        <path d="M140 220c0-82.8 44.8-150 100-150s100 67.2 100 150" fill="none" stroke="url(#orbit-gradient)" strokeWidth="34" />
        <ellipse cx="240" cy="220" rx="71" ry="145" fill="none" stroke="#b7c5de" strokeWidth=".7" />
      </g>
      <circle cx="240" cy="220" r="7" fill="#f7f7f2" />
      <circle cx="126" cy="110" r="4" fill="#203b74" /><path d="m122 106-25-21H44" fill="none" stroke="#7a8ba6" />
      <circle cx="376" cy="300" r="4" fill="#203b74" /><path d="m380 304 20 22h43" fill="none" stroke="#7a8ba6" />
      <text x="43" y="75" className="diagram-label">문제의 발견</text><text x="390" y="347" className="diagram-label">실행의 연결</text>
    </svg>
    <div className="hero-art-bottom"><span>THINK CLEARLY.</span><span>BUILD MEANINGFULLY.</span></div>
    <figcaption>문제에서 실행까지 · 접근 방식 개념도</figcaption>
  </figure>;
}

export function ProjectArtwork({ project }: { project: Project }) {
  return <figure className={`project-art art-${project.visual}`} aria-label={`${project.name}의 작업 주제를 표현한 개념 그래픽`}>
    <div className="art-kicker"><span>{project.eyebrow.split(' & ')[0]}</span><span>{project.number} / {String(projects.length).padStart(2, '0')}</span></div>
    {project.visual === 'humour' ? <>
      <div className="humour-wordmark">HumouR<span>.</span></div>
      <div className="humour-flow"><div className="flow-input"><span>JOB DESCRIPTION</span><span>RÉSUMÉ</span></div><div className="flow-connector" /><div className="context-node"><Asterisk /><span>CONTEXT</span></div><div className="flow-connector" /><div className="decision-node">사람의 판단<small>HUMAN DECISION</small></div></div>
      <div className="art-bottom"><span>Better context.<br />Human decisions.</span><span className="art-caption">서비스 구조 개념도</span></div>
    </> : project.visual === 'van' ? <>
      <div className="van-content"><div className="van-wordmark">VAN<span>2026</span></div><div className="van-symbol"><i /><i /><i /></div></div>
      <div className="art-bottom"><span>대격변의 시대,<br />혁신을 묻다.</span><span className="art-caption">프로그램 주제 그래픽</span></div>
    </> : <>
      <div className="roa-wordmark">작은 개선이<br /><span>만드는 변화.</span></div>
      <div className="roa-bars"><span>CONTENT</span><span>INSIGHT</span><span>PROCESS</span><span>IMPACT<ArrowMark /></span></div>
      <div className="art-bottom"><span>Content to operations.</span><span className="art-caption">업무 흐름 개념도 · 성과 그래프 아님</span></div>
    </>}
  </figure>;
}

function ArrowMark() { return <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M4 18 18 4M4 4h14v14" stroke="currentColor" strokeWidth="1.5" /></svg>; }
