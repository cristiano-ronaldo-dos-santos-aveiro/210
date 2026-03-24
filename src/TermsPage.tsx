import React from 'react';

const LOGO_210_SRC = new URL('../photo/logolar/IMG_2657.PNG', import.meta.url).href;
const LOGO_COLLECTIONS_SRC = new URL('../photo/logolar/logo-collections.png', import.meta.url).href;

const sections = [
  {
    title: '1. Назначение сайта',
    text: 'Сайт предназначен для ознакомления с брендом 210 Sports Wear, нашими коллекциями и контактами для связи.'
  },
  {
    title: '2. Отсутствие онлайн-заказа',
    text:
      'На данный момент оформление онлайн-заказа через сайт не предусмотрено. Для покупки и консультации свяжитесь с нами по телефону, в Instagram или Telegram.'
  },
  {
    title: '3. Актуальность информации',
    text:
      'Мы стараемся поддерживать информацию (ассортимент, контакты, режим работы) в актуальном состоянии, но отдельные данные могут обновляться.'
  },
  {
    title: '4. Ответственность',
    text:
      '210 Sports Wear не несет ответственности за временную недоступность сайта, а также за работу сторонних сервисов (соцсети, мессенджеры, карты и внешние ссылки).'
  },
  {
    title: '5. Авторские права',
    text:
      'Материалы сайта (тексты, логотип, элементы дизайна и изображения) принадлежат 210 Sports Wear и не могут использоваться в коммерческих целях без согласия.'
  },
  {
    title: '6. Обратная связь',
    text:
      'Если у вас есть вопросы по условиям использования, свяжитесь с нами по телефону +998 95 210-00-00 или через официальные страницы в социальных сетях.'
  }
];

export default function TermsPage() {
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
        <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">Пользовательские условия</h1>
        <p className="mt-3 text-sm leading-relaxed text-black/70">
          Эта страница описывает базовые условия использования сайта 210 Sports Wear и получения информации о наших
          продуктах и сервисе.
        </p>

        <div className="mt-7 space-y-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-black sm:text-lg">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-black/80">{section.text}</p>
            </section>
          ))}
        </div>

        <p className="mt-8 border-t border-black/10 pt-4 text-xs text-black/50">
          Обновлено: {new Date().getFullYear()} год, 210 Sports Wear.
        </p>
        <div className="mt-5 flex justify-center">
          <a
            href="/"
            className="inline-flex items-center rounded-full border border-black/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-black/70 transition-colors hover:bg-black hover:text-white"
          >
            Back to 210
          </a>
        </div>
      </div>
    </main>
  );
}
