import { useEffect, useRef, useState } from 'react';
import type { ComponentProps } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { Arrow } from './Icon';

const navigation = [{ label: 'Projects', id: 'projects' }, { label: 'About', id: 'about' }, { label: 'Experience', id: 'experience' }, { label: 'Contact', id: 'contact' }];

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); button.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><div className="container header-inner">
    <Link className="brand" to="/" aria-label="정영일 포트폴리오 홈"><span className="brand-mark">y<span>j.</span></span><span className="brand-name">정영일<span>YOUNGIL JUNG</span></span></Link>
    <button ref={button} className={`menu-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? '메뉴 닫기' : '메뉴 열기'}><span /><span /></button>
    <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="주요 메뉴">{navigation.map(item => <Link key={item.id} to={`/#${item.id}`} onClick={() => setOpen(false)} className={location.hash === `#${item.id}` ? 'active' : ''}>{item.label}{item.id === 'contact' && <Arrow diagonal />}</Link>)}</nav>
  </div></header>;
}

export function Footer() {
  return <footer className="site-footer container"><Link to="/" className="footer-signature">{profile.englishName}<span>기획에서 실행까지.</span></Link><span>© 2026 {profile.name}</span><SectionLink id="top" className="back-top">Back to top <span aria-hidden="true">↑</span></SectionLink></footer>;
}

export function SectionLink({ id, ...props }: Omit<ComponentProps<typeof Link>, 'to'> & { id: string }) {
  const { pathname } = useLocation();
  return <Link {...props} to={{ pathname, hash: `#${id}` }} />;
}

export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        if (hash === '#main') target?.focus({ preventScroll: true });
      }
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export function SectionHeading({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return <div className="section-heading"><div><span className="section-index">{number} /</span><h2>{title}</h2></div>{subtitle && <p>{subtitle}</p>}</div>;
}
