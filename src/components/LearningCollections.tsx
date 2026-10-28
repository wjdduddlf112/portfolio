import { Link } from 'react-router-dom';
import { learningCollections, allProjectIds } from '../data/projects';
import { Arrow } from './Icon';

export default function LearningCollections() {
  return (
    <section id="explorations" className="other-section container" aria-labelledby="other-title">
      <div className="minor-heading">
        <h2 id="other-title">Also explored<span>경험을 확장한 세 가지 방향</span></h2>
        <span className="eyebrow">{learningCollections.length} AREAS / {allProjectIds.length} PROJECT EXPERIENCES</span>
      </div>
      <div className="other-grid collection-grid">
        {learningCollections.map((collection, index) => (
          <article key={collection.id} id={collection.id} className="other-card collection-card">
            <div className="other-card-top"><span>LEARNING & PRACTICE</span><span>0{index + 1}</span></div>
            <h3><Link to={collection.href}>{collection.title}</Link></h3>
            <p>{collection.summary}</p>
            <ul className="collection-projects">
              {collection.items.map(item => <li key={item.id}>{item.href ? <Link to={item.href}>{item.name}<Arrow diagonal /></Link> : <span>{item.name}</span>}</li>)}
            </ul>
            <small className="project-status">{collection.status}</small>
            <Link className="collection-open" to={collection.href}>{collection.items.length}개 프로젝트 살펴보기<Arrow diagonal /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
