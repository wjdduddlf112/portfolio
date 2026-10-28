import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header, ScrollManager } from './components/Layout';
import Home from './pages/Home';
import ProjectDetail, { NotFound } from './pages/ProjectDetail';
import { projects, extendedProjects } from './data/projects';

function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const project = projects.find(item => pathname === `/projects/${item.slug}`) ?? extendedProjects.find(item => pathname === `/projects/${item.slug}`);
    const isHome = pathname === '/';
    const title = project ? `${project.name} — 정영일 포트폴리오` : isHome ? '정영일 — Product, People & Possibility' : '페이지를 찾을 수 없습니다 — 정영일';
    const description = project?.summary ?? '정영일의 포트폴리오. 데이터와 기술을 이해하고, 복잡한 문제를 실행 가능한 서비스와 경험으로 연결합니다.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [pathname]);
  return null;
}

export default function App() {
  return <><a className="skip-link" href="#main">본문으로 건너뛰기</a><ScrollManager /><PageMetadata /><div id="top" /><Header /><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/projects/:slug" element={<ProjectDetail />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>;
}
