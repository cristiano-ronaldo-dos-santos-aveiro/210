import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, Menu, X, Instagram, MapPin } from 'lucide-react';
import { cn } from './lib/utils';

/** PNG exports in /photo (210 stack + signature mark) */
const LOGO_210_SRC = new URL('../photo/IMG_2657.PNG', import.meta.url).href;
const LOGO_ANBA_SRC = new URL('../photo/IMG_26589.PNG', import.meta.url).href;

/** Spotlight card backgrounds (replace with your own photos anytime) */
const CARD_BG = {
  wisdom:
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200',
  spring:
    'https://images.unsplash.com/photo-1490750967868-88cb4486a973?auto=format&fit=crop&q=80&w=1200',
  newDrop:
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200',
  special:
    'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=1200'
} as const;

/** Replace with your real contacts */
const CONTACT_TELEGRAM = 'https://t.me/shop210';
const CONTACT_INSTAGRAM = 'https://instagram.com/';

const TelegramIcon = ({ className, size = 22 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.863-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

// --- Types ---
type Language = 'uz' | 'ru' | 'en';

interface Translations {
  nav: {
    collections: string;
    philosophy: string;
    branches: string;
  };
  home: {
    rail: string;
    titleScript: string;
    titleGlass: string;
    tagline: string;
  };
  cards: {
    sectionEyebrow: string;
    sectionTitle: string;
    wisdom: { label: string; title: string; body: string };
    spring: { label: string; title: string; body: string };
    newDrop: { label: string; title: string; body: string };
    special: { label: string; title: string; body: string };
  };
  philosophy: {
    label: string;
    title: string;
    body: string;
  };
  branches: {
    label: string;
    title: string;
    body: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  uz: {
    nav: {
      collections: "Kolleksiyalar",
      philosophy: "Falsafa",
      branches: "Filiallar"
    },
    home: {
      rail: "2016 — Toshkent",
      titleScript: "210",
      titleGlass: "SPORTS WEAR",
      tagline: "Biz oddiylidan yiroqmiz — original va tanlangan uslub."
    },
    cards: {
      sectionEyebrow: "Tanlov",
      sectionTitle: "Kolleksiyalar va ruh",
      wisdom: {
        label: "Hikmat",
        title: "Do'kon falsafasi",
        body: "Har bir buyum — sabr, sifat va o'ziga xoslik haqida. Oddiylik emas, chuqurlik."
      },
      spring: {
        label: "Bahor",
        title: "Bahor kolleksiyasi",
        body: "Yengil ranglar, yangi siluetlar va mavsumiy yangilanish — do'konda."
      },
      newDrop: {
        label: "Yangi",
        title: "Yangi kelganlar",
        body: "Yaqinda kelgan modellar va cheklangan partiyalar — birinchi bo'lib ko'ring."
      },
      special: {
        label: "Maxsus",
        title: "Maxsus kolleksiya",
        body: "Tanlangan brendlar va noyob setlar — kompromiss qilmaydiganlar uchun."
      }
    },
    philosophy: {
      label: "Falsafa",
      title: "Faqat original. 2016-yildan beri.",
      body: "210 — bu brend tarixi va qadriyatlar. Biz oddiylikdan yiroqmiz: har bir buyum birinchi qo'ldan, original va sifat kafolati bilan. Sport va uslubni birlashtirib, dunyo bo'ylab tanlangan ko'rinishlarni taklif qilamiz. Kompromiss qilmaydiganlar uchun do'kon — 2016-yildan beri."
    },
    branches: {
      label: "Filiallar",
      title: "Bizning filiallar",
      body: "Markaziy savdo nuqtasi: Toshkent. Batafsil manzil, ish vaqti va boshqa shaharlar bo'yicha yangiliklar — Telegram orqali yozing."
    },
  },
  ru: {
    nav: {
      collections: "Коллекции",
      philosophy: "Философия",
      branches: "Филиалы"
    },
    home: {
      rail: "С 2016 — Ташкент",
      titleScript: "210",
      titleGlass: "SPORTS WEAR",
      tagline: "Выше обыденности — оригинал и отобранный стиль."
    },
    cards: {
      sectionEyebrow: "Выбор",
      sectionTitle: "Коллекции и настроение",
      wisdom: {
        label: "Мудрость",
        title: "Философия бутика",
        body: "Каждая вещь — о терпении, качестве и характере. Не про простоту, а про глубину."
      },
      spring: {
        label: "Весна",
        title: "Весенняя коллекция",
        body: "Светлые оттенки, новые силуэты и сезонное обновление — уже в бутике."
      },
      newDrop: {
        label: "Новое",
        title: "Новые поступления",
        body: "Свежие модели и ограниченные партии — будьте первыми."
      },
      special: {
        label: "Особое",
        title: "Специальная коллекция",
        body: "Отобранные бренды и уникальные сеты — для тех, кто не идёт на компромиссы."
      }
    },
    philosophy: {
      label: "Философия",
      title: "Только оригинал. С 2016 года.",
      body: "210 — это история бренда и ценности. Мы выше обыденности: каждая вещь из первых рук, оригинал и гарантия качества. Соединяем спорт и стиль, предлагаем курируемые образы со всего мира. Для тех, кто не идёт на компромиссы — с 2016 года."
    },
    branches: {
      label: "Филиалы",
      title: "Наши филиалы",
      body: "Главная точка: Ташкент. Адрес, часы работы и открытие в других городах — напишите в Telegram."
    },
  },
  en: {
    nav: {
      collections: "Collections",
      philosophy: "Philosophy",
      branches: "Branches"
    },
    home: {
      rail: "Est. 2016 — Tashkent",
      titleScript: "210",
      titleGlass: "SPORTS WEAR",
      tagline: "Beyond the ordinary — authentic pieces, curated style."
    },
    cards: {
      sectionEyebrow: "Curated",
      sectionTitle: "Collections & spirit",
      wisdom: {
        label: "Wisdom",
        title: "Boutique philosophy",
        body: "Every piece speaks to patience, quality, and character — depth over noise."
      },
      spring: {
        label: "Spring",
        title: "Spring collection",
        body: "Light tones, fresh silhouettes, and seasonal energy — in store now."
      },
      newDrop: {
        label: "New",
        title: "New arrivals",
        body: "Latest drops and limited runs — see them first."
      },
      special: {
        label: "Special",
        title: "Special collection",
        body: "Selected brands and distinctive sets — for those who don’t compromise."
      }
    },
    philosophy: {
      label: "Philosophy",
      title: "Original only. Since 2016.",
      body: "210 is our story and our values. Beyond the ordinary: every piece is first-hand, authentic, and quality-guaranteed. We blend sport and style with curated looks from around the world. For those who don't compromise — since 2016."
    },
    branches: {
      label: "Branches",
      title: "Our branches",
      body: "Flagship: Tashkent. For full address, hours, and new cities — message us on Telegram."
    },
  }
};

// --- Context for Language ---
const LangContext = React.createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'uz', setLang: () => {} });

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].nav;

  const iconBtn = 'text-black/65 hover:text-black hover:bg-black/[0.06]';
  const menuIcon = 'text-black hover:bg-black/[0.06]';
  const logoSep = 'text-black/30';

  return (
    <motion.nav
      initial={false}
      className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.08] bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[3.75rem] md:h-[4rem] gap-3">
          <motion.a
            href="#"
            className="flex-shrink-0 flex items-center gap-2 md:gap-2.5 z-10"
            whileHover={{ opacity: 0.92 }}
            whileTap={{ scale: 0.98 }}
            aria-label="210 × Anba"
          >
            <img
              src={LOGO_210_SRC}
              alt="210 Sports Wear"
              className="h-7 md:h-9 w-auto max-h-9 object-contain object-left"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <span className={cn('text-base md:text-lg font-light select-none leading-none', logoSep)} aria-hidden>
              |
            </span>
            <img
              src={LOGO_ANBA_SRC}
              alt="Anba"
              className="h-6 md:h-8 w-auto max-h-8 object-contain object-left invert"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </motion.a>

          {/* Central glass capsule — desktop / tablet */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-none [&>*]:pointer-events-auto">
            <div className="flex items-center rounded-full border border-black/10 bg-black/[0.035] px-1.5 py-1.5 pl-4 lg:pl-5 gap-3 lg:gap-5 backdrop-blur-xl">
              <a
                href="#spotlight"
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55 hover:text-black transition-colors"
              >
                {t.collections}
              </a>
              <a
                href="#philosophy"
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55 hover:text-black transition-colors"
              >
                {t.philosophy}
              </a>
              <a
                href="#branches"
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55 hover:text-black transition-colors"
              >
                {t.branches}
              </a>
              <div className="h-5 w-px shrink-0 bg-black/15" aria-hidden />
              <div className="flex items-center gap-0.5 pr-1">
                {(['uz', 'ru', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={cn(
                      'w-8 h-8 rounded-full text-[9px] font-bold uppercase tracking-wide transition-all duration-200',
                      lang === l ? 'bg-black text-white shadow-sm' : 'text-black/40 hover:text-black'
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 z-10">
            <motion.button
              type="button"
              className={cn('p-2.5 rounded-full transition-colors', iconBtn)}
              whileTap={{ scale: 0.94 }}
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.75} />
            </motion.button>
            <motion.button
              type="button"
              className={cn('relative p-2.5 rounded-full transition-colors', iconBtn)}
              whileTap={{ scale: 0.94 }}
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] px-0.5 flex items-center justify-center bg-black text-white text-[9px] font-bold rounded-full leading-none">
                0
              </span>
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-2 z-10">
            <div className="flex rounded-full border border-black/10 bg-black/[0.035] p-0.5">
              {(['uz', 'ru', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-2 py-1 text-[9px] font-bold uppercase rounded-full transition-colors',
                    lang === l ? 'bg-black text-white' : 'text-black/45'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <motion.button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={cn('p-2 rounded-full transition-colors', menuIcon)}
              whileTap={{ scale: 0.92 }}
              aria-expanded={isOpen}
              aria-label="Menu"
            >
              {isOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </motion.button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden backdrop-blur-xl border-t border-black/8 bg-white px-4 pt-4 pb-8 space-y-1 overflow-hidden"
        >
          <a
            href="#spotlight"
            onClick={() => setIsOpen(false)}
            className="block text-[14px] font-semibold uppercase tracking-[0.12em] py-3 border-b border-black/8 text-black"
          >
            {t.collections}
          </a>
          <a
            href="#philosophy"
            onClick={() => setIsOpen(false)}
            className="block text-[14px] font-semibold uppercase tracking-[0.12em] py-3 border-b border-black/8 text-black"
          >
            {t.philosophy}
          </a>
          <a
            href="#branches"
            onClick={() => setIsOpen(false)}
            className="block text-[14px] font-semibold uppercase tracking-[0.12em] py-3 border-b border-black/8 text-black"
          >
            {t.branches}
          </a>
          <div className="flex items-center gap-4 pt-6">
            <button
              type="button"
              className="p-2 rounded-full border border-black/12 text-black/70"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            <button type="button" className="relative p-2 rounded-full border border-black/12 text-black/70" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute top-1 right-1 min-w-[14px] h-[14px] flex items-center justify-center bg-black text-white text-[9px] font-bold rounded-full">
                0
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const CompactHome = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].home;

  return (
    <section className="relative bg-gradient-to-b from-neutral-50 via-white to-white border-b border-black/[0.06] scroll-mt-0">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-[4.75rem] md:pt-[5rem] pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 mb-3">{t.rail}</p>
          <p className="home-script-title text-4xl sm:text-5xl md:text-[3.25rem] text-black leading-none mb-1">{t.titleScript}</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-black">{t.titleGlass}</h1>
          <p className="mt-4 text-sm md:text-base text-black/55 leading-relaxed max-w-md mx-auto">{t.tagline}</p>
        </motion.div>
      </div>
    </section>
  );
};

type SpotlightKey = 'wisdom' | 'spring' | 'newDrop' | 'special';

const SPOTLIGHT_ORDER: SpotlightKey[] = ['wisdom', 'spring', 'newDrop', 'special'];

const SPOTLIGHT_ACCENT: Record<SpotlightKey, string> = {
  wisdom: 'from-amber-950/85 via-stone-900/55 to-black/20',
  spring: 'from-emerald-950/70 via-teal-900/40 to-white/10',
  newDrop: 'from-neutral-950/80 via-black/50 to-black/15',
  special: 'from-violet-950/75 via-purple-950/45 to-black/20'
};

const SpotlightCard: React.FC<{ cardKey: SpotlightKey; index: number }> = ({ cardKey, index }) => {
  const { lang } = React.useContext(LangContext);
  const copy = TRANSLATIONS[lang].cards[cardKey];
  const bg = CARD_BG[cardKey];
  const overlay = SPOTLIGHT_ACCENT[cardKey];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 80, damping: 22 }}
      className="group relative min-h-[220px] sm:min-h-[260px] rounded-2xl overflow-hidden border border-black/[0.07] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] bg-neutral-900"
    >
      <div className="absolute inset-0">
        <motion.img
          src={bg}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className={cn('absolute inset-0 bg-gradient-to-br', overlay)} />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full min-h-[220px] sm:min-h-[260px] p-6 md:p-8 text-left">
        <span className="inline-flex w-fit text-[10px] font-bold uppercase tracking-[0.28em] text-white/85 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 mb-3">
          {copy.label}
        </span>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white drop-shadow-sm">{copy.title}</h2>
        <p className="mt-2 text-sm md:text-[0.95rem] text-white/80 leading-relaxed max-w-sm">{copy.body}</p>
      </div>
    </motion.article>
  );
};

const SpotlightSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].cards;

  return (
    <section id="spotlight" className="py-12 md:py-16 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="mb-8 md:mb-10 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/45 block mb-2">{t.sectionEyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">{t.sectionTitle}</h2>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {SPOTLIGHT_ORDER.map((key, i) => (
            <SpotlightCard key={key} cardKey={key} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ type: 'spring', stiffness: 70, damping: 24 }}
    className={className}
  >
    {children}
  </motion.div>
);

const PhilosophySection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].philosophy;

  return (
    <section id="philosophy" className="py-16 md:py-20 bg-neutral-50 border-t border-black/5 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/45 mb-3">{t.label}</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-black mb-6 leading-tight">{t.title}</h2>
          <p className="text-base md:text-lg text-black/65 leading-relaxed">{t.body}</p>
        </SectionReveal>
      </div>
    </section>
  );
};

const BranchesSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].branches;

  return (
    <section id="branches" className="py-16 md:py-20 bg-white border-t border-black/5 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/45 mb-3">{t.label}</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-black mb-6 leading-tight flex items-center gap-3">
            <MapPin size={28} className="text-black/55 shrink-0" strokeWidth={1.75} />
            {t.title}
          </h2>
          <p className="text-base md:text-lg text-black/65 leading-relaxed">{t.body}</p>
        </SectionReveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-10">
        <div className="flex items-center gap-5 md:gap-8" aria-label="210 × Anba">
          <img
            src={LOGO_210_SRC}
            alt="210 Sports Wear"
            className="h-12 md:h-16 w-auto max-h-16 object-contain object-center brightness-0 invert"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <span className="shrink-0 w-px h-11 md:h-14 bg-white/35 rounded-full" aria-hidden />
          <img
            src={LOGO_ANBA_SRC}
            alt="Anba"
            className="h-10 md:h-12 w-auto max-h-12 object-contain object-center"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
          <motion.a
            href={CONTACT_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/75 hover:text-white transition-colors p-2"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <Instagram size={26} strokeWidth={1.5} />
          </motion.a>
          <motion.a
            href={CONTACT_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="text-white/75 hover:text-white transition-colors p-2"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <TelegramIcon size={26} />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = React.useState<Language>('uz');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-white">
        <Navbar />

        <main>
          <CompactHome />
          <SpotlightSection />

          <PhilosophySection />
          <BranchesSection />
        </main>

        <Footer />

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .writing-vertical-rl {
            writing-mode: vertical-rl;
          }
        `}</style>
      </div>
    </LangContext.Provider>
  );
}
