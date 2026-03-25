/** Strip Vite `base` from pathname so `/app/privacy` → `/privacy` when base is `/app/`. */
export function stripBasePath(pathname: string): string {
  let path = pathname.replace(/\/+$/, '') || '/';
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (!base) return path;
  if (path === base) return '/';
  if (path.startsWith(`${base}/`)) {
    path = path.slice(base.length) || '/';
    if (path !== '/' && !path.startsWith('/')) path = `/${path}`;
  }
  return path;
}

export type AppRoute = 'privacy' | 'terms' | 'aurora' | 'app';

/** Hash wins when set (no full document request). Pathname used for direct links + dev server. */
export function getAppRoute(): AppRoute {
  const hash = window.location.hash.replace(/^#/, '').replace(/^\/+/, '').split(/[?&]/)[0] ?? '';
  if (hash === 'privacy') return 'privacy';
  if (hash === 'terms') return 'terms';
  if (hash === 'aurora') return 'aurora';

  const path = stripBasePath(window.location.pathname);
  if (path === '/privacy') return 'privacy';
  if (path === '/terms') return 'terms';
  if (path === '/aurora') return 'aurora';
  return 'app';
}

/** Footer / in-app links: hash avoids 404 on static hosts that lack SPA rewrites. */
export const LEGAL_LINKS = {
  privacy: '#privacy',
  terms: '#terms'
} as const;

/** Home URL respecting `base`. */
export function homeHref(): string {
  return import.meta.env.BASE_URL;
}
