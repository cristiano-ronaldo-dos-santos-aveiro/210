import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, Menu, X, Instagram, MapPin, Phone, ArrowUpRight, Clock, ArrowRight } from 'lucide-react';
import { cn } from './lib/utils';

/** PNG exports in /photo (210 stack + partner / signature mark) */
const LOGO_210_SRC = new URL('../photo/logolar/IMG_2657.PNG', import.meta.url).href;
const LOGO_COLLECTIONS_SRC = new URL('../photo/logolar/logo-collections.png', import.meta.url).href;

/** Spotlight card backgrounds (replace with your own photos anytime) */
/** Brand strip: logos from /public/brands/{slug}.png */
const BRAND_MARQUEE_ITEMS = [
  { alt: 'Gucci', slug: 'gucci' as const },
  { alt: 'Adidas', slug: 'adidas' as const },
  { alt: 'Nike', slug: 'nike' as const },
  { alt: 'FILA', slug: 'fila' as const },
  { alt: 'Hermès', slug: 'hermes' as const }
] as const;

/** Men's luxury boutique — editorial-style Unsplash refs (swap for your own shots anytime) */
const CARD_BG = {
  /** Watches */
  featured:
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=85&w=1200',
  /** Spring / seasonal menswear */
  spring:
    'https://images.unsplash.com/photo-1617137968427-85924c2a2efd?auto=format&fit=crop&q=85&w=1200',
  /** Shoes */
  newDrop:
    'https://images.unsplash.com/photo-1600185365921-3fcc2f66655b?auto=format&fit=crop&q=85&w=1200',
  /** Fragrances */
  special:
    'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=85&w=1200'
} as const;

/** Replace with your real contacts */
const CONTACT_TELEGRAM = 'https://t.me/Direct_210';
const CONTACT_INSTAGRAM = 'https://www.instagram.com/210_direct/';
const CONTACT_PHONE_TEL = 'tel:+998952100000';
const CONTACT_PHONE_LABEL = '+998 952 100 000';

/** Parfyumeriya spotlight kartasi — slayd tartibi: Crivelli → Tom Ford → Bleu de Chanel → ROJA → Bvlgari */
const PERFUME_SPOTLIGHT_SLIDES = [
  new URL('../photo/Atirlar/photo_2026-03-22_12-58-53.jpg', import.meta.url).href,
  new URL('../photo/Atirlar/photo_2026-03-22_13-00-18.jpg', import.meta.url).href,
  new URL('../photo/Atirlar/photo_2026-03-22_13-00-08.jpg', import.meta.url).href,
  new URL('../photo/Atirlar/photo_2026-03-22_12-59-59.jpg', import.meta.url).href,
  new URL('../photo/Atirlar/photo_2026-03-22_13-00-14.jpg', import.meta.url).href
] as const;

/** Soatlar spotlight kartasi — premium soat suratlari (tartib: Santos-style → Daytona ice-blue → two-tone Daytona → AP Royal Oak) */
const WATCH_SPOTLIGHT_SLIDES = [
  new URL('../photo/Soatlar/photo_2026-03-22_13-11-15.jpg', import.meta.url).href,
  new URL('../photo/Soatlar/photo_2026-03-22_13-11-17.jpg', import.meta.url).href,
  new URL('../photo/Soatlar/photo_2026-03-22_13-11-20.jpg', import.meta.url).href,
  new URL('../photo/Soatlar/photo_2026-03-22_13-12-47.jpg', import.meta.url).href
] as const;

/** Oyoq kiyim / yangi tushirish spotlight kartasi */
const SHOE_SPOTLIGHT_SLIDES = [
  new URL('../photo/Oyoq kiyimlar/photo_2025-01-16_12-26-45.jpg', import.meta.url).href,
  new URL('../photo/Oyoq kiyimlar/photo_2025-01-20_17-45-03.jpg', import.meta.url).href,
  new URL('../photo/Oyoq kiyimlar/photo_2025-01-17_13-02-15.jpg', import.meta.url).href,
  new URL('../photo/Oyoq kiyimlar/photo_2025-01-20_11-11-50.jpg', import.meta.url).href
] as const;

/** Bahor kolleksiyasi — yangi “kiyimlar” spotlight slides */
const SPRING_SPOTLIGHT_SLIDES = [
  new URL('../photo/Kiyimlar/photo_2026-03-23_17-04-01.jpg', import.meta.url).href,
  new URL('../photo/Kiyimlar/photo_2026-03-23_17-04-17.jpg', import.meta.url).href,
  new URL('../photo/Kiyimlar/photo_2026-03-23_17-05-08.jpg', import.meta.url).href,
  new URL('../photo/Kiyimlar/photo_2026-03-23_17-10-38.jpg', import.meta.url).href
] as const;

/** Spotlight slaydlari (oyoq kiyim + soatlar + atirlar) — bir xil tezlik va fade */
const SPOTLIGHT_SLIDE_MS = 2800;
const SPOTLIGHT_FADE_S = 0.75;

// Use public/ paths so the images load reliably in dev + prod.
const NURAFSHON_BRANCH_PHOTO_SRC = '/filiallar/nurafshon-branch.png';
const GULZOR_BRANCH_PHOTO_SRC = '/filiallar/gulzor-branch.png';
const NUKUS_BRANCH_PHOTO_SRC = '/filiallar/nukus-branch.png';

type StoreBranch = {
  name: string;
  instagram: string;
  phoneTel: string;
  phoneLabel: string;
  mapsUrl: string;
  photoSrc?: string;
  openHours?: string;
  addressLineByLang?: Partial<Record<Language, string>>;
};

const STORE_BRANCHES: readonly StoreBranch[] = [
  {
    name: 'Nurafshon',
    instagram: CONTACT_INSTAGRAM,
    phoneTel: 'tel:+998952100000',
    phoneLabel: '+998 95 210-00-00',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=210+Nurafshon%2C+Uzbekistan',
    photoSrc: NURAFSHON_BRANCH_PHOTO_SRC
    ,
    openHours: '10:00-22:00'
    ,
    addressLineByLang: {
      uz: 'Нурафшан обвод кўчаси, 41',
      ru: 'Обводная улица Нурафшан, 41',
      en: 'Obvodnaya street Nurafshon, 41'
    }
  },
  {
    name: 'Gulzor',
    instagram: CONTACT_INSTAGRAM,
    phoneTel: 'tel:+998332101111',
    phoneLabel: '+998 33 210-11-11',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=210+Gulzor%2C+Uzbekistan',
    photoSrc: GULZOR_BRANCH_PHOTO_SRC,
    openHours: '10:00-22:00',
    addressLineByLang: {
      uz: 'Кичик ҳалқа йўли, 135',
      ru: 'Малая кольцевая дорога, 135',
      en: 'Small ring road, 135'
    }
  },
  {
    name: 'Nukus',
    instagram: CONTACT_INSTAGRAM,
    phoneTel: 'tel:+998957177777',
    phoneLabel: '+998 95 717-77-77',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=210+Nukus%2C+Uzbekistan',
    photoSrc: NUKUS_BRANCH_PHOTO_SRC,
    openHours: '10:00-22:00',
    addressLineByLang: {
      uz: 'Шифонур кўчаси, 3А',
      ru: 'улица Шифонур, 3А',
      en: 'Shifonur street, 3A'
    }
  }
];

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
    brands: string;
    philosophy: string;
    branches: string;
  };
  cards: {
    featured: { label: string; title: string; body: string };
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
    actionInstagram: string;
    actionPhone: string;
    actionMaps: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  uz: {
    nav: {
      collections: "Kolleksiyalar",
      brands: "Brendlar",
      philosophy: "Falsafa",
      branches: "Filiallar"
    },
    cards: {
      featured: {
        label: "Soatlar",
        title: "Erkaklar soati",
        body: "Shveytsariya va dunyo brendlari: mehanik va zamonaviy kolleksiyalar — premium do'konda."
      },
      spring: {
        label: "Bahor",
        title: "Bahor kolleksiyasi",
        body: "Premium paltolar, jakketlar va bahor palitrasi — zamonaviy erkak uchun."
      },
      newDrop: {
        label: "Poyabzal",
        title: "Oyoq kiymlar",
        body: "Teri, sport va klassik siluetlar — cheklangan partiyalar va original modellar."
      },
      special: {
        label: "Parfyumeriya",
        title: "Atir va odekolon",
        body: "Niche va lyuks uylar: uzoq saqlanadigan erkaklar aromati — tanlov va maslahat."
      }
    },
    philosophy: {
      label: "Falsafa",
      title: "Biz oddiylikdan yiroqmiz!",
      body: "Luxury faqat kiyim bilan o'lchanmaydi. U service bilan boshlanadi va yuqori service mukammallikka olib boradi !\n\n210 va Anba shu service-ni o'z mijozlariga taqdim qiladi !"
    },
    branches: {
      label: "Filiallar",
      title: "Bizning filiallar",
      body: "Uchta filial — Nurafshon, Gulzor va Nukus. Pastdagi kartochkalardan aloqa va manzilni oching.",
      actionInstagram: "Instagram",
      actionPhone: "Telefon",
      actionMaps: "Xarita"
    },
  },
  ru: {
    nav: {
      collections: "Коллекции",
      brands: "Бренды",
      philosophy: "Философия",
      branches: "Филиалы"
    },
    cards: {
      featured: {
        label: "Часы",
        title: "Мужские часы",
        body: "Швейцария и мировые дома: механика и современные линии — в премиальном бутике."
      },
      spring: {
        label: "Весна",
        title: "Весенняя коллекция",
        body: "Премиальные пальто, куртки и палитра сезона — для мужчины с характером."
      },
      newDrop: {
        label: "Обувь",
        title: "Люксовая обувь",
        body: "Кожа, спорт и классика: лимитированные модели и оригинал — только для мужчин."
      },
      special: {
        label: "Парфюм",
        title: "Ароматы",
        body: "Ниша и люксовые дома: стойкие мужские композиции — подбор и консультация."
      }
    },
    philosophy: {
      label: "Философия",
      title: "Мы далеки от обыденности!",
      body: "210 — это история бренда и его ценности. Мы далеки от обыденности: каждая вещь из первых рук, оригинальная и с гарантией качества. Мы предлагаем отобранные образы со всего мира, сочетая спорт и стиль. Магазин для тех, кто не идёт на компромиссы — с 2016 года."
    },
    branches: {
      label: "Филиалы",
      title: "Наши филиалы",
      body: "Три точки — Нурафшон, Гульзор и Нукус. Откройте контакты и карту в карточках ниже.",
      actionInstagram: "Instagram",
      actionPhone: "Телефон",
      actionMaps: "Карта"
    },
  },
  en: {
    nav: {
      collections: "Collections",
      brands: "Brands",
      philosophy: "Philosophy",
      branches: "Branches"
    },
    cards: {
      featured: {
        label: "Watches",
        title: "Men’s timepieces",
        body: "Swiss houses and global maisons — mechanical and contemporary lines, curated for him."
      },
      spring: {
        label: "Spring",
        title: "Spring collection",
        body: "Premium coats, jackets, and a seasonal palette — modern luxury menswear."
      },
      newDrop: {
        label: "Footwear",
        title: "Luxury shoes",
        body: "Leather, sport, and classic profiles — limited runs and authentic pairs for men."
      },
      special: {
        label: "Fragrance",
        title: "Perfumes & cologne",
        body: "Niche and luxury houses — long-lasting men’s scents, with expert guidance."
      }
    },
    philosophy: {
      label: "Philosophy",
      title: "We are far from ordinary!",
      body: "210 is the history and values of the brand. We are far from ordinary: each item is first-hand, original and with a guarantee of quality. We offer selected looks from around the world, combining sport and style. A store for those who do not compromise — since 2016."
    },
    branches: {
      label: "Branches",
      title: "Our branches",
      body: "Three locations — Nurafshon, Gulzor, and Nukus. Use the cards below for Instagram, phone, and maps.",
      actionInstagram: "Instagram",
      actionPhone: "Phone",
      actionMaps: "Location"
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

  const navLinkInBar =
    'inline-flex items-center justify-center px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300';
  const iconInBar = 'p-2.5 rounded-full text-white hover:bg-white/10 transition-colors duration-300 hover:scale-[1.06]';
  const logoSep = 'text-black/30';

  return (
    <motion.nav
      initial={false}
      className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.06] bg-white shadow-[0_10px_30px_-25px_rgba(0,0,0,0.35)]"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[3.75rem] md:h-[4rem] gap-3">
          <motion.a
            href="#"
            className="flex-shrink-0 flex items-center gap-2 md:gap-2.5 z-10"
            whileHover={{ opacity: 0.98, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="210 × Anpa Limited"
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
              src={LOGO_COLLECTIONS_SRC}
              alt="Anpa Limited"
              className="h-6 md:h-8 w-auto max-h-8 object-contain object-left"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </motion.a>

          {/* One black bar: nav links + languages */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-none [&>*]:pointer-events-auto">
            <div className="flex items-center rounded-full bg-black px-4 lg:px-5 py-2 gap-3 lg:gap-4 shadow-md border border-white/10">
              <a href="#spotlight" className={navLinkInBar}>
                {t.collections}
              </a>
              <a href="#philosophy" className={navLinkInBar}>
                {t.philosophy}
              </a>
              <a href="#branches" className={navLinkInBar}>
                {t.branches}
              </a>
              <a href="#brand-marquee" className={navLinkInBar}>
                {t.brands}
              </a>
              <div className="h-5 w-px shrink-0 bg-white/25" aria-hidden />
              <div className="flex items-center gap-0.5">
                {(['uz', 'ru', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={cn(
                      'min-w-[2rem] h-8 rounded-full text-[9px] font-bold uppercase tracking-wide transition-colors text-white/55 hover:text-white',
                      lang === l && 'bg-white/15 text-white'
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* One black bar: phone, search, cart */}
          <div className="hidden md:flex items-center rounded-full bg-black px-1 py-1 gap-0.5 z-10 shadow-md">
            <motion.a
              href={CONTACT_PHONE_TEL}
              className={iconInBar}
              whileTap={{ scale: 0.94 }}
              aria-label={`Call ${CONTACT_PHONE_LABEL}`}
            >
              <Phone size={20} strokeWidth={1.75} />
            </motion.a>
            <motion.button type="button" className={iconInBar} whileTap={{ scale: 0.94 }} aria-label="Search">
              <Search size={20} strokeWidth={1.75} />
            </motion.button>
            <motion.button
              type="button"
              className={cn('relative', iconInBar)}
              whileTap={{ scale: 0.94 }}
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] px-0.5 flex items-center justify-center bg-white text-black text-[9px] font-bold rounded-full leading-none">
                0
              </span>
            </motion.button>
          </div>

          <div className="md:hidden flex items-center z-10">
            <div className="flex items-center rounded-full bg-black pl-2 pr-1 py-1 gap-0.5 shadow-md">
              {(['uz', 'ru', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-2.5 py-1.5 rounded-full text-[9px] font-bold uppercase transition-colors text-white/55 hover:text-white',
                    lang === l && 'bg-white/15 text-white'
                  )}
                >
                  {l}
                </button>
              ))}
              <motion.button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.92 }}
                aria-expanded={isOpen}
                aria-label="Menu"
              >
                {isOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-black/8 bg-white px-4 pt-4 pb-8 overflow-hidden"
        >
          <div className="rounded-2xl bg-black overflow-hidden shadow-md">
            <a
              href="#spotlight"
              onClick={() => setIsOpen(false)}
              className="block text-center text-[13px] font-semibold uppercase tracking-[0.12em] py-3.5 text-white border-b border-white/10 hover:bg-white/[0.06] transition-colors"
            >
              {t.collections}
            </a>
            <a
              href="#philosophy"
              onClick={() => setIsOpen(false)}
              className="block text-center text-[13px] font-semibold uppercase tracking-[0.12em] py-3.5 text-white border-b border-white/10 hover:bg-white/[0.06] transition-colors"
            >
              {t.philosophy}
            </a>
            <a
              href="#branches"
              onClick={() => setIsOpen(false)}
              className="block text-center text-[13px] font-semibold uppercase tracking-[0.12em] py-3.5 text-white border-b border-white/10 hover:bg-white/[0.06] transition-colors"
            >
              {t.branches}
            </a>
            <a
              href="#brand-marquee"
              onClick={() => setIsOpen(false)}
              className="block text-center text-[13px] font-semibold uppercase tracking-[0.12em] py-3.5 text-white hover:bg-white/[0.06] transition-colors"
            >
              {t.brands}
            </a>
          </div>
          <div className="flex justify-center items-center rounded-full bg-black px-2 py-2 gap-1 mt-5 shadow-md">
            <motion.a
              href={CONTACT_PHONE_TEL}
              className="p-2.5 rounded-full text-white hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.96 }}
              aria-label={`Call ${CONTACT_PHONE_LABEL}`}
            >
              <Phone size={20} strokeWidth={1.75} />
            </motion.a>
            <button
              type="button"
              className="p-2.5 rounded-full text-white hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            <button type="button" className="relative p-2.5 rounded-full text-white hover:bg-white/10 transition-colors" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute top-1 right-1 min-w-[14px] h-[14px] flex items-center justify-center bg-white text-black text-[9px] font-bold rounded-full">
                0
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

type SpotlightKey = 'featured' | 'spring' | 'newDrop' | 'special';

const SPOTLIGHT_ORDER: SpotlightKey[] = ['spring', 'newDrop', 'featured', 'special'];

const SPOTLIGHT_ACCENT: Record<SpotlightKey, string> = {
  featured: 'from-slate-950/85 via-zinc-900/55 to-black/30',
  spring: 'from-stone-950/75 via-neutral-900/45 to-black/20',
  newDrop: 'from-amber-950/80 via-stone-900/50 to-black/25',
  special: 'from-violet-950/80 via-purple-950/50 to-black/30'
};

/** Soatlar va atirlar spotlight kartalarida bir xil crossfade slayd */
const SPOTLIGHT_SLIDE_SETS: Partial<Record<SpotlightKey, readonly string[]>> = {
  spring: SPRING_SPOTLIGHT_SLIDES,
  newDrop: SHOE_SPOTLIGHT_SLIDES,
  featured: WATCH_SPOTLIGHT_SLIDES,
  special: PERFUME_SPOTLIGHT_SLIDES
};

const SpotlightCrossfadeSlideshow: React.FC<{ slides: readonly string[]; label: string }> = ({ slides, label }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SPOTLIGHT_SLIDE_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      <span className="sr-only" aria-live="polite">
        {label} — {active + 1} / {slides.length}
      </span>
      {slides.map((src, idx) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding="async"
          initial={false}
          animate={{
            opacity: idx === active ? 1 : 0,
            scale: idx === active ? 1 : 1.04
          }}
          transition={{ duration: SPOTLIGHT_FADE_S, ease: [0.22, 0.61, 0.36, 1] }}
        />
      ))}
      {slides.length > 1 && (
        <div className="absolute bottom-16 sm:bottom-[4.25rem] left-0 right-0 flex justify-center gap-1.5 px-2 z-[12] pointer-events-none">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                'h-1 rounded-full transition-all duration-300 ease-out',
                idx === active ? 'w-3.5 bg-white shadow-sm' : 'w-1.5 bg-white/45'
              )}
            />
          ))}
        </div>
      )}
    </>
  );
};

const SpotlightCard: React.FC<{ cardKey: SpotlightKey; index: number }> = ({ cardKey, index }) => {
  const { lang } = React.useContext(LangContext);
  const copy = TRANSLATIONS[lang].cards[cardKey];
  const overlay = SPOTLIGHT_ACCENT[cardKey];
  const slideSet = SPOTLIGHT_SLIDE_SETS[cardKey];

  return (
    <motion.a
      href={CONTACT_TELEGRAM}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 76, damping: 22 }}
      whileTap={{ scale: 0.985 }}
      className="group relative w-full aspect-[3/4] max-h-[320px] sm:max-h-[340px] rounded-xl overflow-hidden border border-black/[0.08] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)] bg-neutral-900"
      aria-label={`${copy.title} — open in Telegram`}
    >
      <div className="absolute inset-0">
        {slideSet ? (
          <div className="absolute inset-0 overflow-hidden">
            <SpotlightCrossfadeSlideshow slides={slideSet} label={copy.title} />
          </div>
        ) : (
          <img
            src={CARD_BG[cardKey]}
            alt=""
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
          />
        )}
        <div className={cn('absolute inset-0 bg-gradient-to-t', overlay)} />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-5 text-left min-h-0">
        <span className="inline-flex w-fit text-[9px] font-bold uppercase tracking-[0.22em] text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 mb-2">
          {copy.label}
        </span>
        <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-white drop-shadow-sm leading-tight">{copy.title}</h2>
        <p className="mt-1.5 text-[11px] sm:text-xs text-white/85 leading-snug line-clamp-3">{copy.body}</p>
      </div>
    </motion.a>
  );
};

const SpotlightSection = () => {
  return (
    <section id="spotlight" className="bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[4.85rem] md:pt-[5.1rem] pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 md:mb-8 flex flex-col items-center justify-center"
          aria-label="210 × Anpa Limited"
        >
          <div className="flex items-center justify-center gap-2.5 md:gap-3.5 min-h-[2.75rem] md:min-h-[3.25rem]">
            <img
              src={LOGO_210_SRC}
              alt="210 Sports Wear"
              className="h-[1.9rem] sm:h-[2.15rem] md:h-[2.45rem] w-auto max-h-[2.45rem] object-contain object-center"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <span className="text-black/30 text-xl sm:text-2xl md:text-3xl font-light leading-none select-none" aria-hidden>
              |
            </span>
            <img
              src={LOGO_COLLECTIONS_SRC}
              alt="Anpa Limited"
              className="h-[1.65rem] sm:h-[1.85rem] md:h-[2.1rem] w-auto max-h-[2.1rem] object-contain object-center"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SPOTLIGHT_ORDER.map((key, i) => (
            <SpotlightCard key={key} cardKey={key} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandMarqueeLogo: React.FC<{ alt: string; slug: string }> = ({ alt, slug }) => {
  const [failed, setFailed] = useState(false);
  const src = `/brands/${slug}.png`;

  if (failed) {
    return (
      <span className="inline-flex items-center mx-8 md:mx-12 text-xl md:text-3xl font-semibold uppercase text-white/55 tracking-tight whitespace-nowrap">
        {alt}
      </span>
    );
  }

  return (
    <motion.span className="inline-flex items-center mx-8 md:mx-12" whileHover={{ scale: 1.06 }}>
      <img
        src={src}
        alt={alt}
        className="h-12 md:h-[3.5rem] w-auto max-w-[132px] md:max-w-[158px] object-contain object-center opacity-95 hover:opacity-100 transition-opacity duration-300"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </motion.span>
  );
};

const BrandMarquee = () => {
  const loop = [...BRAND_MARQUEE_ITEMS, ...BRAND_MARQUEE_ITEMS];

  return (
    <div
      id="brand-marquee"
      className="brand-marquee relative py-7 md:py-9 bg-gradient-to-b from-black via-neutral-950 to-black border-y border-white/10 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee items-center w-max">
        {loop.map((item, i) => (
          <BrandMarqueeLogo key={`${item.slug}-${i}`} alt={item.alt} slug={item.slug} />
        ))}
      </div>
    </div>
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
    <section id="philosophy" className="py-16 md:py-20 bg-white border-t border-black/5 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="relative rounded-3xl border border-black/10 bg-white px-5 sm:px-7 py-7 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.35)]">
            <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-black/5 blur-[0.5px]" aria-hidden />
            <div className="absolute -bottom-6 -right-6 h-14 w-14 rounded-full bg-black/5 blur-[0.5px]" aria-hidden />

            <div className="flex items-center gap-3 mb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-black" aria-hidden />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/55">{t.label}</p>
            </div>

            <h2 className="text-3xl md:text-4xl font-black uppercase text-black mb-5 leading-tight">
              {t.title}
            </h2>
            <div className="h-px w-24 bg-black/20 mb-6" aria-hidden />

            <p className="text-base md:text-lg text-black/70 leading-relaxed whitespace-pre-line">
              {t.body}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

const BranchCard: React.FC<{
  branch: StoreBranch;
  actionInstagram: string;
  actionPhone: string;
  actionMaps: string;
  index: number;
}> = ({ branch, actionInstagram, actionPhone, actionMaps, index }) => {
  const { lang } = React.useContext(LangContext);
  const getAddressFromMaps = (mapsUrl: string) => {
    try {
      const u = new URL(mapsUrl);
      const q = u.searchParams.get('query');
      if (!q) return '';
      // Example: "210 Nurafshon, Uzbekistan" -> "Nurafshon, Uzbekistan"
      return q.replace(/^210\s*/i, '').trim();
    } catch {
      return '';
    }
  };

  const address = getAddressFromMaps(branch.mapsUrl);
  const addressText = branch.addressLineByLang?.[lang] ?? address;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 80, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_10px_40px_-25px_rgba(0,0,0,0.35)]"
      whileHover={{ scale: 1.02 }}
    >
      <motion.a
        href={branch.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${branch.name} — ${actionMaps}`}
        whileTap={{ scale: 0.96 }}
        className="absolute top-3 right-3 z-20 inline-flex items-center justify-center rounded-full border border-black/10 bg-white/90 text-black p-2.5 hover:bg-white transition-colors shadow-sm"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] leading-none">
          OPEN
        </span>
      </motion.a>

      <div className="w-full">
        <div className="relative w-full h-[170px] sm:h-[190px] bg-neutral-50 overflow-hidden">
          {branch.photoSrc ? (
            <img
              src={branch.photoSrc}
              alt={branch.name}
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/25">210</span>
            </div>
          )}
        </div>

        <div className="px-5 py-4 sm:px-6 sm:py-5">
          <h3 className="text-[18px] sm:text-[20px] font-black text-black leading-tight">{branch.name}</h3>

          <div className="mt-4 flex flex-col gap-3">
            <motion.a
              href={branch.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${branch.name} — ${actionMaps}`}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex items-center gap-3 text-[13px] sm:text-[14px] text-black/60 hover:text-black transition-colors"
            >
              <MapPin size={18} strokeWidth={1.8} className="shrink-0" />
              <span className="leading-snug">{addressText ?? branch.name}</span>
            </motion.a>

            <motion.a
              href={branch.phoneTel}
              aria-label={`${branch.name} — ${actionPhone}: ${branch.phoneLabel}`}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex items-center gap-3 text-[13px] sm:text-[14px] text-black/60 hover:text-black transition-colors"
            >
              <Phone size={18} strokeWidth={1.8} className="shrink-0" />
              <span className="leading-snug">{branch.phoneLabel}</span>
            </motion.a>

            {branch.openHours ? (
              <div className="flex items-center gap-3 text-[13px] sm:text-[14px] text-black/60">
                <Clock size={18} strokeWidth={1.8} className="shrink-0" />
                <span className="leading-snug">{branch.openHours}</span>
              </div>
            ) : null}
          </div>

          <motion.a
            href={branch.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.99 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-black/20 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-black hover:bg-black hover:text-white transition-colors"
            aria-label={`${branch.name} — ${actionMaps}`}
          >
            <span>{actionMaps}</span>
            <ArrowRight size={18} strokeWidth={2} />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

const BranchesSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].branches;

  return (
    <section id="branches" className="py-14 md:py-20 bg-white border-t border-black/5 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/45 mb-2 text-center">{t.label}</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-black mb-3 md:mb-4 leading-tight text-center">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-black/60 leading-relaxed text-center max-w-2xl mx-auto mb-8 md:mb-10">
            {t.body}
          </p>
        </SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {STORE_BRANCHES.map((branch, i) => (
            <BranchCard
              key={branch.name}
              branch={branch}
              actionInstagram={t.actionInstagram}
              actionPhone={t.actionPhone}
              actionMaps={t.actionMaps}
              index={i}
            />
          ))}
        </div>
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
        <div className="flex items-center gap-5 md:gap-8" aria-label="210 × Anpa Limited">
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
            src={LOGO_COLLECTIONS_SRC}
            alt="Anpa Limited"
            className="h-10 md:h-12 w-auto max-h-12 object-contain object-center invert"
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
          <motion.a
            href={CONTACT_PHONE_TEL}
            aria-label={`Phone ${CONTACT_PHONE_LABEL}`}
            className="text-white/75 hover:text-white transition-colors p-2"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <Phone size={26} strokeWidth={1.75} />
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
          <SpotlightSection />
          <BrandMarquee />

          <PhilosophySection />
          <BranchesSection />
        </main>

        <Footer />

        <style>{`
          @keyframes marquee {
            0% { transform: translate3d(0,0,0); }
            100% { transform: translate3d(-50%,0,0); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 28s linear infinite;
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee {
              animation-duration: 60s;
            }
          }
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
