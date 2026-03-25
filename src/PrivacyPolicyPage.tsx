import React, { useContext } from 'react';
import { homeHref } from './route';
import { LangContext } from './lang';
import { getPrivacyCopy } from './legalCopy';

const LOGO_210_SRC = new URL('../photo/logolar/IMG_2657.PNG', import.meta.url).href;
const LOGO_COLLECTIONS_SRC = new URL('../photo/logolar/logo-collections.png', import.meta.url).href;

export default function PrivacyPolicyPage() {
  const { lang } = useContext(LangContext);
  const { sections, chrome } = getPrivacyCopy(lang);
  const year = String(new Date().getFullYear());
  const updatedLine = chrome.updatedLine.replace('{year}', year);

  return (
    <main className="min-h-screen bg-[#f5f5f4] px-4 py-10 text-black sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white px-5 py-6 shadow-[0_14px_40px_-26px_rgba(0,0,0,0.28)] sm:px-8 sm:py-8">
        <div className="mb-6 flex items-center justify-center gap-4 sm:gap-5" aria-label="210 × Anba Limited">
          <img
            src={LOGO_210_SRC}
            alt="210 Sports Wear"
            className="h-10 w-auto max-h-12 object-contain object-center sm:h-12"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <span className="h-9 w-px bg-black/15 sm:h-11" aria-hidden />
          <img
            src={LOGO_COLLECTIONS_SRC}
            alt="Anba Limited"
            className="h-7 w-auto max-h-10 object-contain object-center sm:h-8"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/45">210 Sports Wear</p>
        <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">{chrome.h1}</h1>
        <p className="mt-3 text-sm leading-relaxed text-black/70">{chrome.lead}</p>

        <div className="mt-7 space-y-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-black sm:text-lg">{section.title}</h2>
              {section.points?.length ? (
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-black/80">
                  {section.points.map((point) => (
                    <li key={point}>
                      {point.includes('](') ? (
                        <span>
                          {point.startsWith('Instagram') ? (
                            <>
                              Instagram:{' '}
                              <a
                                href="https://www.instagram.com/210_direct/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:underline"
                              >
                                @210_direct
                              </a>
                            </>
                          ) : (
                            <>
                              Telegram:{' '}
                              <a
                                href="https://t.me/Direct_210"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:underline"
                              >
                                @Direct_210
                              </a>
                            </>
                          )}
                        </span>
                      ) : (
                        point
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.text ? <p className="mt-2 text-sm leading-relaxed text-black/80">{section.text}</p> : null}
            </section>
          ))}
        </div>

        <p className="mt-8 border-t border-black/10 pt-4 text-xs text-black/50">{updatedLine}</p>
        <div className="mt-5 flex justify-center">
          <a
            href={homeHref()}
            className="inline-flex items-center rounded-full border border-black/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-black/70 transition-colors hover:bg-black hover:text-white"
          >
            {chrome.backHome}
          </a>
        </div>
      </div>
    </main>
  );
}
