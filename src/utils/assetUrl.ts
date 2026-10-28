/** Resolve public assets against the same base as Vite and BrowserRouter. */
export function assetUrl(path: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  const base = typeof window !== 'undefined' && (window.location.protocol === 'file:' || window.__PORTFOLIO_STANDALONE__)
    ? './' : import.meta.env.BASE_URL;
  return base + path.replace(/^\.?\//, '');
}
