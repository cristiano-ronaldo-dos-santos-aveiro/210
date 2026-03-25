import { StrictMode, useContext, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import PrivacyPolicyPage from './PrivacyPolicyPage.tsx';
import TermsPage from './TermsPage.tsx';
import AuroraSquarePage from './AuroraSquarePage.tsx';
import { getAppRoute, type AppRoute } from './route.ts';
import { LangContext, LangProvider } from './lang';
import { getSiteMeta } from './siteMeta';
import './index.css';

function setOrCreateMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOrCreateLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setOrCreateJsonLd(id: string, data: object) {
  let el = document.querySelector(`script[data-jsonld-id="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('data-jsonld-id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function DocumentMeta({ route }: { route: AppRoute }) {
  const { lang } = useContext(LangContext);

  useEffect(() => {
    const { title, description } = getSiteMeta(route, lang);
    const pageUrl = window.location.href;
    const ogImage = new URL('/favicon.png', window.location.origin).href;
    document.title = title;
    document.documentElement.lang = lang === 'uz' ? 'uz' : lang === 'ru' ? 'ru' : 'en';

    setOrCreateMeta('name', 'description', description);
    setOrCreateMeta('property', 'og:title', title);
    setOrCreateMeta('property', 'og:description', description);
    setOrCreateMeta('property', 'og:type', 'website');
    setOrCreateMeta('property', 'og:url', pageUrl);
    setOrCreateMeta('property', 'og:image', ogImage);
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', title);
    setOrCreateMeta('name', 'twitter:description', description);
    setOrCreateMeta('name', 'twitter:image', ogImage);
    setOrCreateLink('canonical', pageUrl);

    setOrCreateJsonLd('210-local-business', {
      '@context': 'https://schema.org',
      '@type': 'ClothingStore',
      name: '210 Sports Wear',
      image: ogImage,
      url: window.location.origin,
      telephone: '+998952100000',
      addressCountry: 'UZ',
      areaServed: ['Nurafshon', 'Gulzor', 'Nukus'],
      sameAs: ['https://www.instagram.com/210_direct/', 'https://t.me/Direct_210']
    });
  }, [route, lang]);

  return null;
}

function AppRoot() {
  const [route, setRoute] = useState<AppRoute>(() => getAppRoute());

  useEffect(() => {
    const sync = () => setRoute(getAppRoute());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <>
      <DocumentMeta route={route} />
      {(() => {
        switch (route) {
          case 'privacy':
            return <PrivacyPolicyPage />;
          case 'terms':
            return <TermsPage />;
          case 'aurora':
            return <AuroraSquarePage />;
          default:
            return <App />;
        }
      })()}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <AppRoot />
    </LangProvider>
  </StrictMode>,
);
