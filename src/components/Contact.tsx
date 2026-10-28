import { profile } from '../data/profile';
import { assetUrl } from '../utils/assetUrl';
import { Arrow, Asterisk } from './Icon';

export function Contact() {
  const hasContact = Boolean(profile.email || profile.github || profile.linkedIn);
  return <section id="contact" className="contact-section"><div className="container contact-inner">
    <div className="contact-heading"><span className="eyebrow">LET’S CONNECT</span><h2>다음 가능성을,<br />함께 이야기해요<span>.</span></h2><p>좋은 질문에서 시작하는 새로운 기회를 기다립니다.<br />PM · AI/AX 서비스 기획 · 사업기획 및 운영</p></div>
    <div className="contact-links"><Asterisk className="contact-star" />
      {profile.email && <a className="contact-email" href={`mailto:${profile.email}`}><span><small>EMAIL</small>{profile.email}</span><Arrow diagonal /></a>}
      {profile.secondaryEmail && <a className="contact-secondary" href={`mailto:${profile.secondaryEmail}`}>{profile.secondaryEmail}<Arrow diagonal /></a>}
      {profile.github && <a className="contact-line" href={profile.github} target="_blank" rel="noreferrer">GitHub<span>프로젝트와 코드 <Arrow diagonal /></span></a>}
      {profile.linkedIn && <a className="contact-line" href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn<Arrow diagonal /></a>}
      {profile.resumeUrl && <a className="contact-line" href={assetUrl(profile.resumeUrl)} download>이력서 PDF 다운로드<Arrow /></a>}
      {!hasContact && <p className="contact-pending">공개 연락처를 준비하고 있습니다.<br />확인된 연락처를 이곳에 업데이트할 예정입니다.</p>}
    </div>
  </div></section>;
}
