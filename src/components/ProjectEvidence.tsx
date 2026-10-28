import type { CSSProperties } from 'react';
import type { CaseStudy, Comparison, FlowDiagram, Project } from '../data/projects';

export function FlowFigure({ diagram }: { diagram: FlowDiagram }) {
  return (
    <figure className="evidence-figure">
      <h3>{diagram.title}</h3>
      <ol className={`evidence-flow ${diagram.mode === 'parallel' ? 'parallel-flow' : ''}`} style={{ '--flow-columns': diagram.steps.length } as CSSProperties}>
        {diagram.steps.map((step, index) => (
          <li key={step.label}>
            {diagram.mode !== 'parallel' && <span className="flow-step-number">0{index + 1}</span>}
            <strong>{step.label}</strong>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}

export function ProjectDeliverables({ project }: { project: Project }) {
  const [firstDiagram, ...otherDiagrams] = project.diagrams ?? [];
  return (
    <>
      <div className="deliverable-list">
        {project.deliverables.map((item, index) => (
          <article key={item.title}>
            <span className="deliverable-number">0{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>{item.ownership}</small>
            </div>
          </article>
        ))}
      </div>
      <p className="source-caption">{project.deliverablesNote}</p>
      {firstDiagram && <FlowFigure diagram={firstDiagram} />}
      {project.dataStructure && (
        <figure className="evidence-figure dataset-figure">
          <h3>qualification / preferred 데이터 구조</h3>
          <p className="figure-scope">{project.dataStructure.scope}</p>
          <dl className="dataset-grid">
            {project.dataStructure.items.map(item => (
              <div key={item.name}>
                <dt>{item.name}</dt>
                <dd><strong>{item.count.toLocaleString('en-US')}</strong><span>건</span><p>{item.meaning}</p></dd>
              </div>
            ))}
          </dl>
          <figcaption>{project.dataStructure.note}</figcaption>
        </figure>
      )}
      {otherDiagrams.map(diagram => <FlowFigure key={diagram.title} diagram={diagram} />)}
    </>
  );
}

export function ComparisonFigure({ comparison }: { comparison: Comparison }) {
  const maximum = Math.max(comparison.before.value, comparison.after.value, 1);
  const indexed = comparison.unit === '지수';
  return (
    <figure className="evidence-figure comparison-figure" data-comparison={comparison.id}>
      <h4>{comparison.title}</h4>
      <p className="figure-scope">{comparison.scope}</p>
      <dl className="comparison-rows">
        {[comparison.before, comparison.after].map((point, index) => (
          <div className={`comparison-row ${index === 1 ? 'comparison-after' : ''}`} key={point.label}>
            <dt>{point.label}</dt>
            <dd>
              <span className="comparison-track" aria-hidden="true"><span className="comparison-bar" style={{ width: `${point.value / maximum * 100}%` }} /></span>
              <span className="comparison-value">{(!indexed || index === 1) && '약 '}{point.value.toLocaleString('en-US')}<small>{comparison.unit}</small></span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="comparison-axis" aria-hidden="true"><span>0</span><span>{maximum.toLocaleString('en-US')} {comparison.unit}</span></div>
      <figcaption>{comparison.note}</figcaption>
    </figure>
  );
}

export function CaseStudies({ cases }: { cases: CaseStudy[] }) {
  return (
    <div className="case-studies">
      {cases.map(item => (
        <article className="case-study" key={item.label}>
          <span className="case-label">{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.problem}</p>
          <ol className="case-flow">{item.flow.map(step => <li key={step}>{step}</li>)}</ol>
          <p>{item.execution}</p>
          <ComparisonFigure comparison={item.comparison} />
        </article>
      ))}
    </div>
  );
}
