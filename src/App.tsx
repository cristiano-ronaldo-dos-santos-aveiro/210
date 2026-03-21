import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, Menu, X, Instagram, MapPin } from 'lucide-react';
import { cn } from './lib/utils';

/** PNG exports in /photo (210 stack + signature mark) */
const LOGO_210_SRC = new URL('../photo/IMG_2657.PNG', import.meta.url).href;
const LOGO_ANBA_SRC = new URL('../photo/IMG_26589.PNG', import.meta.url).href;

/** Hero background — replace with your own photo in /photo if you prefer */
const HERO_BG_IMAGE =
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=88&w=2400';

/** Replace with your real contacts */
const CONTACT_TELEGRAM = 'https://t.me/shop210';
const CONTACT_INSTAGRAM = 'https://instagram.com/';

const TelegramIcon = ({ className, size = 22 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.863-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

// Scroll-based navbar background
const useScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollTop(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrollTop;
};

// --- Types ---
type Language = 'uz' | 'ru' | 'en';

interface Translations {
  nav: {
    shopLooks: string;
    new: string;
    sport: string;
    classic: string;
    brands: string;
    philosophy: string;
    branches: string;
  };
  hero: {
    headline: string;
    subtext: string;
    rail: string;
    scrollHint: string;
    titleScript: string;
    titleGlass: string;
    tagline: string;
  };
  looks: {
    shopLooks: string;
    fullSet: string;
    viewLook: string;
    buyFullLook: string;
    addSeparately: string;
    itemsInLook: string;
  };
  newCollection: {
    label: string;
    title: string;
    cta: string;
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
  categories: {
    sportTitle: string;
    sportDesc: string;
    sportBtn: string;
    classicTitle: string;
    classicDesc: string;
    classicBtn: string;
  };
  footer: {
    opened: string;
  };
}

const HERO_BRANDS = ['FILA', 'ADIDAS', 'WILSON', 'PUMA', 'ON CLOUD', 'GUCCI', 'UNDER ARMOUR', 'HERMES', 'COLUMBIA', 'ARCTERYX'];

const TRANSLATIONS: Record<Language, Translations> = {
  uz: {
    nav: {
      shopLooks: "Ko'rinishlar",
      new: "Yangi kelganlar",
      sport: "Sport",
      classic: "Yarim klassika",
      brands: "Brendlar",
      philosophy: "Falsafa",
      branches: "Filiallar"
    },
    hero: {
      headline: "Dunyo bo'ylab tayyor premium ko'rinishlar",
      subtext: "Biz tanlaymiz, uslublashtiramiz va original buyumlarni rasmiy import qilamiz",
      rail: "2016-YILDA ASOS SOLINGAN",
      scrollHint: "Pastga",
      titleScript: "210",
      titleGlass: "SPORTS WEAR",
      tagline: "Biz oddiylidan yiroqmiz"
    },
    looks: {
      shopLooks: "Ko'rinishlar",
      fullSet: "To'liq set",
      viewLook: "Ko'rinishni ko'rish",
      buyFullLook: "Butun obrazni sotib olish",
      addSeparately: "Alohida qo'shish",
      itemsInLook: "Obrazga kiradi"
    },
    newCollection: {
      label: "Bahor 2026",
      title: "Yangi kolleksiya",
      cta: "Kolleksiyani ko'rish"
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
    categories: {
      sportTitle: "Sport uslubi",
      sportDesc: "Harakat uchun yaratilgan. Dunyoning yetakchi brendlaridan original ekipirovka.",
      sportBtn: "Sportni kashf eting",
      classicTitle: "Yarim klassika",
      classicDesc: "Kundalik va rasmiy uslub o'rtasidagi mukammal muvozanat. Doimiy dolzarb kiyimlar.",
      classicBtn: "Klassikani kashf eting"
    },
    footer: {
      opened: "2016 yilda ochildik"
    }
  },
  ru: {
    nav: {
      shopLooks: "Образы",
      new: "Новинки",
      sport: "Спорт",
      classic: "Полуклассика",
      brands: "Бренды",
      philosophy: "Философия",
      branches: "Филиалы"
    },
    hero: {
      headline: "Готовые премиальные образы со всего мира",
      subtext: "Мы подбираем, стилизуем и официально ввозим оригинальные вещи",
      rail: "ОСНОВАНО В 2016 — ТАШКЕНТ",
      scrollHint: "Листать",
      titleScript: "210",
      titleGlass: "SPORTS WEAR",
      tagline: "Мы выше обыденности"
    },
    looks: {
      shopLooks: "Образы",
      fullSet: "Полный комплект",
      viewLook: "Смотреть образ",
      buyFullLook: "Купить весь образ",
      addSeparately: "Добавить отдельно",
      itemsInLook: "В образ входит"
    },
    newCollection: {
      label: "Весна 2025",
      title: "Новая коллекция",
      cta: "Смотреть коллекцию"
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
    categories: {
      sportTitle: "Спортивный стиль",
      sportDesc: "Создано для движения. Оригинальная экипировка от ведущих мировых брендов.",
      sportBtn: "Исследовать спорт",
      classicTitle: "Полуклассика",
      classicDesc: "Идеальный баланс между повседневным и формальным стилем. Вневременные вещи.",
      classicBtn: "Исследовать классику"
    },
    footer: {
      opened: "Открылись в 2016"
    }
  },
  en: {
    nav: {
      shopLooks: "Looks",
      new: "New",
      sport: "Sport",
      classic: "Semi-classic",
      brands: "Brands",
      philosophy: "Philosophy",
      branches: "Branches"
    },
    hero: {
      headline: "Ready-made premium looks from around the world",
      subtext: "We curate, style, and officially import original pieces",
      rail: "EST. 2016 — TASHKENT",
      scrollHint: "Scroll",
      titleScript: "210",
      titleGlass: "SPORTS WEAR",
      tagline: "Beyond the ordinary"
    },
    looks: {
      shopLooks: "Looks",
      fullSet: "Full set",
      viewLook: "View look",
      buyFullLook: "Buy full look",
      addSeparately: "Add separately",
      itemsInLook: "This look includes"
    },
    newCollection: {
      label: "Spring 2025",
      title: "New collection",
      cta: "View collection"
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
    categories: {
      sportTitle: "Sport style",
      sportDesc: "Built for movement. Original gear from leading global brands.",
      sportBtn: "Explore sport",
      classicTitle: "Semi-classic",
      classicDesc: "The perfect balance between casual and formal. Timeless pieces.",
      classicBtn: "Explore classic"
    },
    footer: {
      opened: "Open since 2016"
    }
  }
};

type LookItemType = 'jacket' | 'pants' | 'shoes' | 'accessories' | 'top';

interface LookItem {
  id: string;
  name: Record<Language, string>;
  brand: string;
  price: string;
  type: LookItemType;
}

interface Look {
  id: number;
  name: Record<Language, string>;
  image: string;
  totalPrice: string;
  items: LookItem[];
}

const BRANDS = ["FILA", "ADIDAS", "WILSON", "PUMA", "ON CLOUD", "GUCCI", "UNDER ARMOUR", "HERMES", "COLUMBIA", "ARCTERYX"];

const LOOKS: Look[] = [
  {
    id: 1,
    name: { ru: "Dubai Night", uz: "Dubai Night", en: "Dubai Night" },
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
    totalPrice: "4 200 000 UZS",
    items: [
      { id: "1-1", name: { ru: "Куртка оверсайз", uz: "Oversayz Kurtka", en: "Oversize Jacket" }, brand: "Fear of God", price: "1 800 000 UZS", type: "jacket" },
      { id: "1-2", name: { ru: "Брюки карго", uz: "Cargo Shimlar", en: "Cargo Pants" }, brand: "Nike", price: "950 000 UZS", type: "pants" },
      { id: "1-3", name: { ru: "Кроссовки", uz: "Krossovkalar", en: "Sneakers" }, brand: "New Balance", price: "1 200 000 UZS", type: "shoes" },
      { id: "1-4", name: { ru: "Кепка", uz: "Kepka", en: "Cap" }, brand: "Lacoste", price: "250 000 UZS", type: "accessories" }
    ]
  },
  {
    id: 2,
    name: { ru: "Minimal Street", uz: "Minimal Street", en: "Minimal Street" },
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
    totalPrice: "3 850 000 UZS",
    items: [
      { id: "2-1", name: { ru: "Худи Tech Fleece", uz: "Tech Fleece Hudisi", en: "Tech Fleece Hoodie" }, brand: "Nike", price: "1 200 000 UZS", type: "top" },
      { id: "2-2", name: { ru: "Спортивные брюки", uz: "Sport Shimlari", en: "Sport Pants" }, brand: "Adidas", price: "850 000 UZS", type: "pants" },
      { id: "2-3", name: { ru: "Кроссовки Air Max", uz: "Air Max Krossovkalari", en: "Air Max" }, brand: "Nike", price: "1 500 000 UZS", type: "shoes" },
      { id: "2-4", name: { ru: "Рюкзак", uz: "Ryukzak", en: "Backpack" }, brand: "Puma", price: "300 000 UZS", type: "accessories" }
    ]
  },
  {
    id: 3,
    name: { ru: "Smart Casual", uz: "Smart Casual", en: "Smart Casual" },
    image: "https://images.unsplash.com/photo-1596755094514-f87034a264c6?auto=format&fit=crop&q=80&w=1200",
    totalPrice: "3 550 000 UZS",
    items: [
      { id: "3-1", name: { ru: "Рубашка Oxford", uz: "Oxford Ko'ylak", en: "Oxford Shirt" }, brand: "Ralph Lauren", price: "950 000 UZS", type: "top" },
      { id: "3-2", name: { ru: "Брюки чинос", uz: "Chinos", en: "Chinos" }, brand: "Tommy Hilfiger", price: "1 100 000 UZS", type: "pants" },
      { id: "3-3", name: { ru: "Лоферы", uz: "Loferlar", en: "Loafers" }, brand: "Hugo Boss", price: "1 500 000 UZS", type: "shoes" }
    ]
  },
  {
    id: 4,
    name: { ru: "Weekend Vibes", uz: "Weekend Vibes", en: "Weekend Vibes" },
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200",
    totalPrice: "2 900 000 UZS",
    items: [
      { id: "4-1", name: { ru: "Свитер меринос", uz: "Merinos Sviter", en: "Merino Sweater" }, brand: "Lacoste", price: "1 400 000 UZS", type: "top" },
      { id: "4-2", name: { ru: "Джинсы", uz: "Jinslar", en: "Jeans" }, brand: "Levi's", price: "1 000 000 UZS", type: "pants" },
      { id: "4-3", name: { ru: "Кеды", uz: "Kedilar", en: "Sneakers" }, brand: "Converse", price: "500 000 UZS", type: "shoes" }
    ]
  }
];

// --- Context for Language ---
const LangContext = React.createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'uz', setLang: () => {} });

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollTop = useScrollTop();
  const { lang, setLang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].nav;
  const [lightNav, setLightNav] = useState(false);

  useEffect(() => {
    const thr = Math.min(window.innerHeight * 0.48, 520);
    setLightNav(scrollTop > thr);
  }, [scrollTop]);

  const iconBtn = lightNav
    ? 'text-black/65 hover:text-black hover:bg-black/[0.06]'
    : 'text-white/80 hover:text-white hover:bg-white/[0.08]';
  const menuIcon = lightNav ? 'text-black hover:bg-black/[0.06]' : 'text-white hover:bg-white/[0.08]';
  const logoSep = lightNav ? 'text-black/30' : 'text-white/35';

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: lightNav ? 'rgba(255,255,255,0.9)' : 'rgba(20,20,20,0.35)',
        borderBottomColor: lightNav ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.1)',
        boxShadow: lightNav ? '0 1px 0 0 rgba(0,0,0,0.04)' : '0 0 0 0 transparent',
      }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
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
              className={cn(
                'h-7 md:h-9 w-auto max-h-9 object-contain object-left drop-shadow-md',
                !lightNav && 'brightness-0 invert'
              )}
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
              className={cn(
                'h-6 md:h-8 w-auto max-h-8 object-contain object-left drop-shadow-md',
                lightNav && 'invert'
              )}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </motion.a>

          {/* Central glass capsule — desktop / tablet */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-none [&>*]:pointer-events-auto">
            <div
              className={cn(
                'flex items-center rounded-full border px-1.5 py-1.5 pl-4 lg:pl-5 gap-3 lg:gap-5 backdrop-blur-xl',
                lightNav ? 'border-black/10 bg-black/[0.04]' : 'border-white/10 bg-white/[0.07]'
              )}
            >
              <a
                href="#shop-looks"
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors',
                  lightNav ? 'text-black/55 hover:text-black' : 'text-white/70 hover:text-white'
                )}
              >
                {t.shopLooks}
              </a>
              <a
                href="#philosophy"
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors',
                  lightNav ? 'text-black/55 hover:text-black' : 'text-white/70 hover:text-white'
                )}
              >
                {t.philosophy}
              </a>
              <a
                href="#branches"
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors',
                  lightNav ? 'text-black/55 hover:text-black' : 'text-white/70 hover:text-white'
                )}
              >
                {t.branches}
              </a>
              <a
                href="#brand-marquee"
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors',
                  lightNav ? 'text-black/55 hover:text-black' : 'text-white/70 hover:text-white'
                )}
              >
                {t.brands}
              </a>
              <div className={cn('h-5 w-px shrink-0', lightNav ? 'bg-black/15' : 'bg-white/20')} aria-hidden />
              <div className="flex items-center gap-0.5 pr-1">
                {(['uz', 'ru', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={cn(
                      'w-8 h-8 rounded-full text-[9px] font-bold uppercase tracking-wide transition-all duration-200',
                      lightNav
                        ? lang === l
                          ? 'bg-black text-white shadow-sm'
                          : 'text-black/40 hover:text-black'
                        : lang === l
                          ? 'bg-white/20 text-white shadow-inner'
                          : 'text-white/45 hover:text-white'
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
              <span
                className={cn(
                  'absolute top-1.5 right-1.5 min-w-[14px] h-[14px] px-0.5 flex items-center justify-center text-[9px] font-bold rounded-full leading-none',
                  lightNav ? 'bg-black text-white' : 'bg-white text-black'
                )}
              >
                0
              </span>
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-2 z-10">
            <div
              className={cn(
                'flex rounded-full border p-0.5',
                lightNav ? 'border-black/10 bg-black/[0.04]' : 'border-white/15 bg-white/[0.07]'
              )}
            >
              {(['uz', 'ru', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-2 py-1 text-[9px] font-bold uppercase rounded-full transition-colors',
                    lightNav
                      ? lang === l
                        ? 'bg-black text-white'
                        : 'text-black/45'
                      : lang === l
                        ? 'bg-white/20 text-white'
                        : 'text-white/50'
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
          className={cn(
            'md:hidden backdrop-blur-xl border-t px-4 pt-4 pb-8 space-y-1 overflow-hidden',
            lightNav ? 'bg-white/95 border-black/8' : 'bg-[#1a1a1a]/96 border-white/10'
          )}
        >
          <a
            href="#shop-looks"
            onClick={() => setIsOpen(false)}
            className={cn(
              'block text-[14px] font-semibold uppercase tracking-[0.12em] py-3 border-b',
              lightNav ? 'border-black/8 text-black' : 'border-white/10 text-white'
            )}
          >
            {t.shopLooks}
          </a>
          <a
            href="#philosophy"
            onClick={() => setIsOpen(false)}
            className={cn(
              'block text-[14px] font-semibold uppercase tracking-[0.12em] py-3 border-b',
              lightNav ? 'border-black/8 text-black' : 'border-white/10 text-white'
            )}
          >
            {t.philosophy}
          </a>
          <a
            href="#branches"
            onClick={() => setIsOpen(false)}
            className={cn(
              'block text-[14px] font-semibold uppercase tracking-[0.12em] py-3 border-b',
              lightNav ? 'border-black/8 text-black' : 'border-white/10 text-white'
            )}
          >
            {t.branches}
          </a>
          <a
            href="#brand-marquee"
            onClick={() => setIsOpen(false)}
            className={cn(
              'block text-[14px] font-semibold uppercase tracking-[0.12em] py-3 border-b',
              lightNav ? 'border-black/8 text-black' : 'border-white/10 text-white'
            )}
          >
            {t.brands}
          </a>
          <div className="flex items-center gap-4 pt-6">
            <button
              type="button"
              className={cn(
                'p-2 rounded-full border',
                lightNav ? 'border-black/12 text-black/70' : 'border-white/15 text-white/80'
              )}
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className={cn(
                'relative p-2 rounded-full border',
                lightNav ? 'border-black/12 text-black/70' : 'border-white/15 text-white/80'
              )}
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span
                className={cn(
                  'absolute top-1 right-1 min-w-[14px] h-[14px] flex items-center justify-center text-[9px] font-bold rounded-full',
                  lightNav ? 'bg-black text-white' : 'bg-white text-black'
                )}
              >
                0
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const Hero = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].hero;

  return (
    <section
      className="relative min-h-screen bg-[#141414] flex flex-col"
      style={{ ['--hero-photo' as string]: `url('${HERO_BG_IMAGE}')` }}
    >
      <div className="flex-1 flex flex-col justify-center px-3 sm:px-5 md:px-8 pt-[4.5rem] pb-6 md:pt-[5.25rem] md:pb-10 max-w-[1600px] mx-auto w-full">
        <div className="relative w-full rounded-2xl sm:rounded-[1.65rem] md:rounded-[2rem] overflow-hidden min-h-[min(68vh,680px)] aspect-[4/5] sm:aspect-[5/6] md:aspect-[21/10] lg:aspect-[2.2/1] shadow-[0_28px_90px_-16px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.07]">
          <img
            src={HERO_BG_IMAGE}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/45" />
          <div
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hidden lg:block w-px h-32 bg-gradient-to-b from-transparent via-white/40 to-transparent"
            aria-hidden
          />

          <div className="relative z-10 h-full min-h-[inherit] flex flex-col justify-end md:justify-center px-5 sm:px-9 md:px-12 lg:px-16 py-9 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p className="hero-tagline text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 md:mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                {t.titleScript}
              </p>
              <h1 className="relative mt-0">
                <span className="hero-glass-headline block font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.25rem,9vw,6.25rem)]">
                  {t.titleGlass}
                </span>
              </h1>
              <p className="mt-5 md:mt-7 text-[11px] sm:text-xs font-medium uppercase tracking-[0.32em] text-white/75 max-w-lg">
                {t.tagline}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-white/30 mt-7 md:mt-9"
        >
          {t.scrollHint}
        </motion.p>
      </div>
    </section>
  );
};

const BrandMarquee = () => {
  return (
    <div
      id="brand-marquee"
      className="relative py-8 bg-black border-y border-white/10 overflow-hidden whitespace-nowrap scroll-mt-24"
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee">
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <motion.span
            key={i}
            className="mx-10 text-2xl md:text-4xl font-semibold uppercase text-white/60 hover:text-white transition-colors cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            {brand}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

const LookCard: React.FC<{ look: Look; onSelect: () => void }> = ({ look, onSelect }) => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].looks;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group cursor-pointer"
      onClick={onSelect}
    >
      <motion.div
        className="relative w-full max-w-[240px] sm:max-w-none mx-auto sm:mx-0 aspect-[3/4] max-h-[300px] sm:max-h-[340px] overflow-hidden bg-neutral-200 mb-3 rounded-xl border border-black/5"
        whileHover={{ borderColor: 'rgba(0,0,0,0.15)', boxShadow: '0 16px 32px -12px rgba(0,0,0,0.12)' }}
        transition={{ duration: 0.35 }}
      >
        <motion.img
          src={look.image}
          alt={look.name[lang]}
          loading="lazy"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        />
        <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold uppercase px-2 py-1 tracking-widest">
          {t.fullSet}
        </span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-end justify-center pb-6">
          <motion.span
            className="bg-white text-black px-8 py-4 font-bold uppercase text-sm tracking-widest inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.viewLook}
          </motion.span>
        </div>
      </motion.div>
      <h3 className="text-base md:text-lg font-bold tracking-tight text-black">{look.name[lang]}</h3>
      <p className="text-xs md:text-sm text-black/50 mt-1">{look.totalPrice}</p>
    </motion.article>
  );
};

const LookPage: React.FC<{ look: Look; onClose: () => void }> = ({ look, onClose }) => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].looks;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/5] overflow-hidden bg-neutral-100"
          >
            <img src={look.image} alt={look.name[lang]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2"
            >
              {look.name[lang]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-lg text-black/60 mb-10"
            >
              {t.itemsInLook}
            </motion.p>
            <ul className="space-y-6 mb-12">
              {look.items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-black/10"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">{item.brand}</p>
                    <p className="font-bold">{item.name[lang]}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">{item.price}</span>
                    <button className="text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black border-b border-transparent hover:border-black transition-colors">
                      {t.addSeparately}
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full bg-black text-white py-5 font-black uppercase tracking-widest text-lg hover:bg-black/90 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {t.buyFullLook} — {look.totalPrice}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
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
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].footer;

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

        <p className="text-white/45 text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">{t.opened}</p>
      </div>
    </motion.footer>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = React.useState<Language>('uz');
  const [selectedLook, setSelectedLook] = useState<Look | null>(null);
  const t = TRANSLATIONS[lang];

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-white">
        <Navbar />
        {selectedLook && <LookPage look={selectedLook} onClose={() => setSelectedLook(null)} />}

        <main>
          <Hero />
          <BrandMarquee />

          <section id="shop-looks" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
            <SectionReveal>
              <div className="mb-10 md:mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/50 mb-2 block">{t.looks.shopLooks}</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase">{t.looks.shopLooks}</h2>
              </div>
            </SectionReveal>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {LOOKS.map((look, i) => (
                <motion.div key={look.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } } }}>
                  <LookCard look={look} onSelect={() => setSelectedLook(look)} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          <PhilosophySection />
          <BranchesSection />
        </main>

        <Footer />

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 30s linear infinite;
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
