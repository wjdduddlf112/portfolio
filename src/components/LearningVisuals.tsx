import { Link } from 'react-router-dom';
import { campStages, displayComparison, denoisingModels, psnrExplanation, technicalReferences } from '../data/projects';

export function CampTimeline() {
  return <figure id="camp-timeline" className="camp-timeline evidence-figure">
    <h3>데이터 분석 → AI 서비스 개발 → 최종 제품 기획·구현</h3>
    <ol className="camp-stages">
      {campStages.map((stage, index) => <li key={stage.title} className="camp-stage">
        <div className="camp-stage-heading"><span>0{index + 1}</span><h4>{stage.title}</h4></div>
        <p className="camp-tools">{stage.tools}</p>
        <p className="camp-question">{stage.question}</p>
        <div className="camp-projects">
          {stage.projects.map((project, projectIndex) => <details key={project.id} id={project.id} open={projectIndex === 0}>
            <summary>{project.name}<span aria-hidden="true">+</span></summary>
            <div className="camp-project-body">
              <dl><div><dt>문제</dt><dd>{project.problem}</dd></div><div><dt>수행·확인 범위</dt><dd>{project.scope}</dd></div><div><dt>산출·경험</dt><dd>{project.output}</dd></div></dl>
              {project.href && <Link to={project.href}>대표 사례에서 자세히 보기 <span aria-hidden="true">↗</span></Link>}
            </div>
          </details>)}
        </div>
        <p className="camp-transfer"><span>연결되는 역량</span>{stage.next}</p>
      </li>)}
    </ol>
    <figcaption>역량별 발전 구조를 보여주는 설명용 타임라인입니다. 실제 수행 순서나 단계별 기간을 확정한 시간순 연혁이 아닙니다. 프로젝트명을 펼치면 문제·수행 범위·산출 경험을 확인할 수 있습니다.</figcaption>
  </figure>;
}

export function DisplayComparison() {
  return <figure id="display-comparison" className="evidence-figure display-comparison">
    <h3>형태의 제약에서 응용의 가능성으로</h3>
    <p className="table-hint">좁은 화면에서는 표를 좌우로 이동해 비교할 수 있습니다.</p>
    <div className="comparison-table-scroll" role="region" aria-label="디스플레이 기술 비교표, 좁은 화면에서 좌우 스크롤" tabIndex={0}>
      <table className="technology-table"><caption className="visually-hidden">구조·유연성·응용·과제를 기준으로 한 디스플레이 비교</caption>
        <thead><tr><th scope="col">비교 기준</th>{displayComparison.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>{displayComparison.rows.map(row => <tr key={row.criterion}><th scope="row">{row.criterion}</th>{row.values.map(value => <td key={value}>{value}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <figcaption>{displayComparison.caption}</figcaption>
  </figure>;
}

export function DenoisingComparison() {
  return <div id="denoising-comparison">
    <div className="model-comparison">{denoisingModels.map(model => <article key={model.name}><h3>{model.name}</h3><dl><div><dt>구조의 특징</dt><dd>{model.structure}</dd></div><div><dt>복원 접근 관점</dt><dd>{model.approach}</dd></div><div><dt>평가 시 확인할 기준</dt><dd>{model.evaluation}</dd></div></dl></article>)}</div>
    <figure className="evidence-figure psnr-explanation"><h3>{psnrExplanation.title}</h3><p className="psnr-formula">{psnrExplanation.formula}</p><p>{psnrExplanation.text}</p><figcaption>{psnrExplanation.limit}</figcaption></figure>
  </div>;
}

export function TechnicalSources({ kind }: { kind: keyof typeof technicalReferences }) {
  return <aside className="technical-sources" aria-label="기술 설명 참고 자료"><span>기술 설명 참고 자료</span><ul>{technicalReferences[kind].map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}<span aria-hidden="true">↗</span></a></li>)}</ul><p>일반 기술 설명의 근거입니다. 당시 프로젝트에서 실제로 사용한 논문·실험 설정과는 구분합니다.</p></aside>;
}
