import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Instagram, MapPin, Phone, ArrowUpRight, Clock, ArrowRight } from 'lucide-react';
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
  { alt: 'On', slug: 'on' as const },
  { alt: 'Puma', slug: 'puma' as const },
  { alt: 'Wilson', slug: 'wilson' as const },
  { alt: 'Under Armour', slug: 'under-armour' as const },
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
    new URL('../photo/Kiyimlar/photo_2026-03-23_17-04-01.jpg', import.meta.url).href,
  /** Shoes */
  newDrop:
    'https://images.unsplash.com/photo-1600185365921-3fcc2f66655b?auto=format&fit=crop&q=85&w=1200',
  /** Fragrances */
  special:
    new URL('../photo/Atirlar/photo_2026-03-24_14-06-50.jpg', import.meta.url).href
} as const;

/** Replace with your real contacts */
const CONTACT_TELEGRAM = 'https://t.me/Direct_210';
const CONTACT_INSTAGRAM = 'https://www.instagram.com/210_direct/';
const CONTACT_PHONE_TEL = 'tel:+998952100000';
const CONTACT_PHONE_LABEL = '+998 952 100 000';

/** Parfyumeriya spotlight kartasi — slayd tartibi: Crivelli → Tom Ford → Bleu de Chanel → ROJA → Bvlgari */
const PERFUME_SPOTLIGHT_SLIDES = [
  new URL('../photo/Atirlar/photo_2026-03-24_14-06-50.jpg', import.meta.url).href,
  new URL('../photo/Atirlar/photo_2026-03-22_13-00-18.jpg', import.meta.url).href,
  new URL('../photo/Atirlar/photo_2026-03-22_13-00-08.jpg', import.meta.url).href,
  new URL('../photo/Atirlar/photo_2026-03-22_12-59-59.jpg', import.meta.url).href
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
  new URL('../photo/Kiyimlar/photo_2026-03-23_17-10-38.jpg', import.meta.url).href,
  new URL('../photo/Kiyimlar/photo_2026-03-24_13-43-11.jpg', import.meta.url).href,
  new URL('../photo/Kiyimlar/photo_2026-03-24_13-43-16.jpg', import.meta.url).href
] as const;
const DAILY_LOOK_IMAGE_SRC = '/daily/main.png';
const DAILY_LOOK_SIDE_CARD_1_SRC = '/daily/side-1.png';
const DAILY_LOOK_SIDE_CARD_2_SRC = '/daily/side-2.png';
const DAILY_LOOK_FALLBACK_SRC = '/daily/main.png';
const PARTNER_BRANDS_IMAGE_SRC = '/brands/partner-brands-glass.png';

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
type DailyLookItemKind = 'vest' | 'sweater' | 'pants' | 'sneakers';

interface Translations {
  ui: {
    addToCart: string;
    /** Contact button — starts phone call */
    contactCall: string;
  };
  nav: {
    home: string;
    dailyLooks: string;
    brands: string;
    clothes: string;
    branches: string;
  };
  cards: {
    featured: { label: string; title: string; body: string; price: string };
    spring: { label: string; title: string; body: string; price: string };
    newDrop: { label: string; title: string; body: string; price: string };
    special: { label: string; title: string; body: string; price: string };
  };
  philosophy: {
    label: string;
    title: string;
    body: string;
  };
  clothes: {
    label: string;
    title: string;
    body: string;
    brandsTitle: string;
    brandsBody: string;
    brandsNote: string;
    items: readonly { name: string; price: string }[];
  };
  dailyLooks: {
    label: string;
    title: string;
    body: string;
    priceLabel: string;
    updatedLabel: string;
    items: readonly { name: string; price: string; kind: DailyLookItemKind }[];
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
    ui: {
      addToCart: "Savatchaga",
      contactCall: "Aloqa"
    },
    nav: {
      home: "Bosh sahifa",
      dailyLooks: "Kunlik look",
      brands: "Brendlar",
      clothes: "Kiyimlar",
      branches: "Filiallar"
    },
    cards: {
      featured: {
        label: "Soatlar",
        title: "Erkaklar soati",
        body: "Shveytsariya va dunyo brendlari: mehanik va zamonaviy kolleksiyalar — premium do'konda.",
        price: "dan 12 500 000 so'm"
      },
      spring: {
        label: "Bahor",
        title: "Bahor kolleksiyasi",
        body: "Premium paltolar, jakketlar va bahor palitrasi — zamonaviy erkak uchun.",
        price: "dan 2 800 000 so'm"
      },
      newDrop: {
        label: "Poyabzal",
        title: "Oyoq kiymlar",
        body: "Teri, sport va klassik siluetlar — cheklangan partiyalar va original modellar.",
        price: "dan 3 200 000 so'm"
      },
      special: {
        label: "Parfyumeriya",
        title: "Atir va odekolon",
        body: "Niche va lyuks uylar: uzoq saqlanadigan erkaklar aromati — tanlov va maslahat.",
        price: "dan 890 000 so'm"
      }
    },
    philosophy: {
      label: "Falsafa",
      title: "Biz oddiylikdan yiroqmiz!",
      body: "Luxury faqat kiyim bilan o'lchanmaydi. U servis bilan boshlanadi va yuqori servis mukammallikka olib boradi.\n\n210 va Anba shu servisni o'z mijozlariga taqdim qiladi!\n\nBiz oddiylikdan yiroqmiz. Oddiylikni hamma joyda ko'rasiz, lekin 210 va Anba o'z mijozlari uchun yuqori servis va premium mahsulotlarni taqdim qilishni o'z yo'li deb biladi!"
    },
    clothes: {
      label: "Kiyimlar",
      title: "Yangi kiyimlar bo'limi",
      body: "",
      brandsTitle: "Hamkor brendlar",
      brandsBody: "Dunyo brendlari bilan rasmiy hamkorlikda ishlaymiz. Bizda faqat so‘nggi va premiumdir. Har bir model sifat, qulaylik va zamonaviy uslub bo‘yicha tanlanadi.",
      brandsNote: "Mahsulotlarimiz originalligiga kafolat 100%.",
      items: [
        { name: 'Ko\'ylak va polo', price: '1 150 000 so\'m' },
        { name: 'Kurtka va paltolar', price: '4 200 000 so\'m' },
        { name: 'Shim va denim', price: '1 890 000 so\'m' },
        { name: 'Aksessuarlar', price: 'dan 450 000 so\'m' },
        { name: 'Sport kiyim', price: '2 100 000 so\'m' },
        { name: 'Teri buyumlar', price: 'dan 3 500 000 so\'m' }
      ]
    },
    dailyLooks: {
      label: "Kunlik look",
      title: "Bugungi look",
      body: "Bugungi to'plamimiz Wilson brendidan bahor uchun to'liq kolleksiya.\nYashil va oq ranglar kombinatsiya qilingan premium va yumshoq materiallar ishlatilgan.",
      priceLabel: "Jami: 1,546,000 so'm",
      updatedLabel: "Har kuni yangilanadi",
      items: [
        { name: "Nimcha", price: "299,000 so'm", kind: 'vest' },
        { name: "Sviter", price: "399,000 so'm", kind: 'sweater' },
        { name: "Shim", price: "349,000 so'm", kind: 'pants' },
        { name: "Krossovka", price: "499,000 so'm", kind: 'sneakers' }
      ]
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
    ui: {
      addToCart: "В корзину",
      contactCall: "Связь"
    },
    nav: {
      home: "Главная",
      dailyLooks: "Образ дня",
      brands: "Бренды",
      clothes: "Одежда",
      branches: "Филиалы"
    },
    cards: {
      featured: {
        label: "Часы",
        title: "Мужские часы",
        body: "Швейцария и мировые дома: механика и современные линии — в премиальном бутике.",
        price: "от 12 500 000 сум"
      },
      spring: {
        label: "Весна",
        title: "Весенняя коллекция",
        body: "Премиальные пальто, куртки и палитра сезона — для мужчины с характером.",
        price: "от 2 800 000 сум"
      },
      newDrop: {
        label: "Обувь",
        title: "Люксовая обувь",
        body: "Кожа, спорт и классика: лимитированные модели и оригинал — только для мужчин.",
        price: "от 3 200 000 сум"
      },
      special: {
        label: "Парфюм",
        title: "Ароматы",
        body: "Ниша и люксовые дома: стойкие мужские композиции — подбор и консультация.",
        price: "от 890 000 сум"
      }
    },
    philosophy: {
      label: "Философия",
      title: "Мы далеки от обыденности!",
      body: "Роскошь измеряется не только одеждой. Она начинается с сервиса, а высокий сервис ведёт к совершенству.\n\n210 и Anba предоставляют этот сервис своим клиентам!\n\nМы далеки от обыденности. Обыденность встречается повсюду, но для 210 и Anba путь — это премиальный сервис и премиальные товары для своих клиентов!"
    },
    clothes: {
      label: "Одежда",
      title: "Раздел одежды",
      body: "",
      brandsTitle: "Бренды-партнеры",
      brandsBody: "В разделе одежды мы работаем с оригинальными коллекциями мировых брендов. Каждая модель отбирается по качеству, комфорту и актуальному стилю.",
      brandsNote: "Оригинальные бренды и регулярно обновляемая коллекция",
      items: [
        { name: 'Рубашки и поло', price: '1 150 000 сум' },
        { name: 'Куртки и пальто', price: '4 200 000 сум' },
        { name: 'Брюки и деним', price: '1 890 000 сум' },
        { name: 'Аксессуары', price: 'от 450 000 сум' },
        { name: 'Спортивная одежда', price: '2 100 000 сум' },
        { name: 'Кожаные изделия', price: 'от 3 500 000 сум' }
      ]
    },
    dailyLooks: {
      label: "Образ дня",
      title: "Сегодняшний образ",
      body: "Сегодняшний look: zip-куртка, поло и брюки в спортивно-casual сочетании.",
      priceLabel: "Цены от",
      updatedLabel: "Обновляется ежедневно",
      items: [
        { name: "Жилет", price: "299,000 сум", kind: 'vest' },
        { name: "Свитер", price: "399,000 сум", kind: 'sweater' },
        { name: "Брюки", price: "349,000 сум", kind: 'pants' },
        { name: "Кроссовки", price: "499,000 сум", kind: 'sneakers' }
      ]
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
    ui: {
      addToCart: "Add to basket",
      contactCall: "Contact"
    },
    nav: {
      home: "Home",
      dailyLooks: "Daily look",
      brands: "Brands",
      clothes: "Clothes",
      branches: "Branches"
    },
    cards: {
      featured: {
        label: "Watches",
        title: "Men’s timepieces",
        body: "Swiss houses and global maisons — mechanical and contemporary lines, curated for him.",
        price: "from 12,500,000 UZS"
      },
      spring: {
        label: "Spring",
        title: "Spring collection",
        body: "Premium coats, jackets, and a seasonal palette — modern luxury menswear.",
        price: "from 2,800,000 UZS"
      },
      newDrop: {
        label: "Footwear",
        title: "Luxury shoes",
        body: "Leather, sport, and classic profiles — limited runs and authentic pairs for men.",
        price: "from 3,200,000 UZS"
      },
      special: {
        label: "Fragrance",
        title: "Perfumes & cologne",
        body: "Niche and luxury houses — long-lasting men’s scents, with expert guidance.",
        price: "from 890,000 UZS"
      }
    },
    philosophy: {
      label: "Philosophy",
      title: "We are far from ordinary!",
      body: "Luxury is not measured by clothing alone. It begins with service, and outstanding service leads to excellence.\n\n210 and Anba bring this service to their customers!\n\nWe are far from ordinary. You see ordinariness everywhere — yet 210 and Anba believe their way is to offer premium service and premium products to their clients!"
    },
    clothes: {
      label: "Clothes",
      title: "Clothing section",
      body: "",
      brandsTitle: "Partner Brands",
      brandsBody: "In our clothing section, we work with original collections from global brands. Each model is selected for quality, comfort, and a modern style direction.",
      brandsNote: "Original brands with a regularly refreshed assortment",
      items: [
        { name: 'Shirts & polos', price: '1,150,000 UZS' },
        { name: 'Jackets & coats', price: '4,200,000 UZS' },
        { name: 'Trousers & denim', price: '1,890,000 UZS' },
        { name: 'Accessories', price: 'from 450,000 UZS' },
        { name: 'Sportswear', price: '2,100,000 UZS' },
        { name: 'Leather goods', price: 'from 3,500,000 UZS' }
      ]
    },
    dailyLooks: {
      label: "Daily look",
      title: "Look of the day",
      body: "Today’s look: a zip jacket, polo shirt, and trousers in a sport-casual mix.",
      priceLabel: "Prices from",
      updatedLabel: "Updated daily",
      items: [
        { name: "Vest", price: "299,000 UZS", kind: 'vest' },
        { name: "Sweater", price: "399,000 UZS", kind: 'sweater' },
        { name: "Pants", price: "349,000 UZS", kind: 'pants' },
        { name: "Sneakers", price: "499,000 UZS", kind: 'sneakers' }
      ]
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

const PHILOSOPHY_BADGES_BY_LANG: Record<Language, readonly string[]> = {
  uz: ['Original mahsulotlar', 'Premium servis', 'Tezkor aloqa'],
  ru: ['Оригинальные товары', 'Премиум сервис', 'Быстрая связь'],
  en: ['Original products', 'Premium service', 'Fast support']
};

const DailyLookItemIcon: React.FC<{ kind: DailyLookItemKind; className?: string }> = ({ kind, className }) => {
  if (kind === 'pants') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#000" aria-hidden>
        <path d="M8 3h8l1 6-2 12h-3l-1-7-1 7H7L5 9l3-6z" />
      </svg>
    );
  }

  if (kind === 'sneakers') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#000" aria-hidden>
        <path d="M3 15h5l3-3 4 2 2 2h4v3H3v-4z" />
      </svg>
    );
  }

  if (kind === 'sweater' || kind === 'vest') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#000" aria-hidden>
        <path d="M9 4l3-2 3 2 3 3-2 3v10H8V10L6 7l3-3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="#000" aria-hidden>
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

// --- Context for Language ---
const LangContext = React.createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'uz', setLang: () => {} });

// --- Components ---

const Navbar = () => {
  const sectionIds = ['spotlight', 'partner-brands', 'daily-looks', 'clothes', 'branches'] as const;
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('spotlight');
  const visibleRatiosRef = useRef<Record<(typeof sectionIds)[number], number>>({
    spotlight: 0,
    'partner-brands': 0,
    'daily-looks': 0,
    clothes: 0,
    branches: 0
  });
  const { lang, setLang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].nav;
  const ui = TRANSLATIONS[lang].ui;

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as (typeof sectionIds)[number];
          visibleRatiosRef.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }

        let next: (typeof sectionIds)[number] = activeSection;
        let maxRatio = -1;
        for (const id of sectionIds) {
          const ratio = visibleRatiosRef.current[id] ?? 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            next = id;
          }
        }

        if (maxRatio <= 0.02) {
          const firstVisible = sectionIds.find((id) => {
            const el = document.getElementById(id);
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.2;
          });
          if (firstVisible) next = firstVisible;
        }

        setActiveSection(next);
      },
      {
        root: null,
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.05, 0.2, 0.4, 0.65, 0.9]
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeSection]);

  const navLinkInBar = (id: (typeof sectionIds)[number]) =>
    cn(
      'inline-flex items-center justify-center rounded-full px-2.5 py-1.5 text-[11px] font-medium uppercase leading-none tracking-[0.08em] antialiased transition-all duration-200 lg:px-3 lg:text-xs lg:tracking-[0.1em]',
      activeSection === id
        ? 'bg-black/12 text-black'
        : 'text-black/75 hover:bg-black/8 hover:text-black'
    );
  const navLinkMobilePill = (id: (typeof sectionIds)[number]) =>
    cn(
      'inline-flex shrink-0 items-center justify-center rounded-full px-2 py-1.5 text-[8px] font-medium uppercase leading-none tracking-[0.06em] antialiased transition-all duration-200 [-webkit-tap-highlight-color:transparent] min-[400px]:px-2.5 min-[400px]:text-[9px] sm:text-[10px]',
      activeSection === id
        ? 'bg-black/12 text-black'
        : 'text-black/75 hover:bg-black/8 hover:text-black'
    );
  const logoSep = 'text-black/30';

  return (
    <motion.nav
      initial={false}
      className="relative z-40 bg-transparent"
    >
      {/* Mobile / small tablet: same structure as desktop — logo | scrollable nav+lang pill | contact */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[95] flex items-center gap-1.5 px-2 pt-2 sm:gap-2 sm:px-3 md:hidden">
        <motion.a
          href="#"
          className="pointer-events-auto flex shrink-0 items-center gap-1 rounded-full border border-black/12 bg-white/95 px-2 py-1.5 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] backdrop-blur-md min-[400px]:gap-1.5 min-[400px]:px-2.5"
          whileTap={{ scale: 0.98 }}
          aria-label="210 × Anpa Limited"
        >
          <img
            src={LOGO_210_SRC}
            alt="210 Sports Wear"
            className="h-5 w-auto max-h-7 object-contain object-left min-[400px]:h-6 min-[400px]:max-h-8"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <span className={cn('text-xs font-light leading-none select-none min-[400px]:text-sm', logoSep)} aria-hidden>
            |
          </span>
          <img
            src={LOGO_COLLECTIONS_SRC}
            alt="Anpa Limited"
            className="h-4 w-auto max-h-6 object-contain object-left min-[400px]:h-5 min-[400px]:max-h-7"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </motion.a>

        <nav
          aria-label="Main"
          className="pointer-events-auto min-h-[2.5rem] min-w-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth touch-pan-x [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-webkit-tap-highlight-color:transparent] [&::-webkit-scrollbar]:hidden"
        >
          <div className="inline-flex min-h-[2.5rem] w-max max-w-none items-center gap-0.5 rounded-full border border-black/12 bg-white/92 py-1 pl-1.5 pr-1.5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06] backdrop-blur-xl supports-[backdrop-filter]:bg-white/85 min-[400px]:gap-1 min-[400px]:px-2">
            <a href="#spotlight" className={navLinkMobilePill('spotlight')}>
              {t.home}
            </a>
            <a href="#daily-looks" className={navLinkMobilePill('daily-looks')}>
              {t.dailyLooks}
            </a>
            <a href="#clothes" className={navLinkMobilePill('clothes')}>
              {t.clothes}
            </a>
            <a href="#branches" className={navLinkMobilePill('branches')}>
              {t.branches}
            </a>
            <a href="#partner-brands" className={navLinkMobilePill('partner-brands')}>
              {t.brands}
            </a>
            <div className="mx-0.5 h-4 w-px shrink-0 bg-black/20" aria-hidden />
            <div className="flex shrink-0 items-center gap-0.5 pr-0.5">
              {(['uz', 'ru', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    'h-7 min-w-[1.75rem] rounded-full text-[9px] font-semibold uppercase leading-none tracking-normal text-black/65 transition-colors min-[400px]:h-8 min-[400px]:min-w-[2rem] min-[400px]:text-[10px]',
                    lang === l && 'bg-black/12 text-black'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <motion.a
          href={CONTACT_PHONE_TEL}
          className="pointer-events-auto inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-black/12 bg-white/95 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-black shadow-[0_6px_22px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] backdrop-blur-md transition-colors active:bg-black/[0.04]"
          whileTap={{ scale: 0.96 }}
          aria-label={`${ui.contactCall}: ${CONTACT_PHONE_LABEL}`}
        >
          <span>{ui.contactCall}</span>
          <ArrowUpRight size={14} strokeWidth={2} className="ml-1.5 shrink-0" />
        </motion.a>
      </div>

      <div className="h-[3.65rem] shrink-0 sm:h-[3.75rem] md:hidden" aria-hidden />

      <div className="mx-auto hidden h-[3.75rem] max-w-[1600px] px-4 md:block md:h-[4rem] lg:px-10" aria-hidden />

      {/* md+: fixed logo + centered bar + contact (matches desktop mock) */}
      <motion.a
        href="#"
        className="fixed top-2 left-3 z-[96] hidden items-center gap-2 rounded-full border border-black/12 bg-white/95 px-3 py-2 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] backdrop-blur-md sm:left-6 md:flex md:gap-2.5 lg:left-10"
        whileHover={{ opacity: 0.98, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="210 × Anpa Limited"
      >
        <img
          src={LOGO_210_SRC}
          alt="210 Sports Wear"
          className="h-7 w-auto max-h-9 object-contain object-left md:h-9 md:max-h-9"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <span className={cn('text-sm font-light leading-none select-none md:text-base lg:text-lg', logoSep)} aria-hidden>
          |
        </span>
        <img
          src={LOGO_COLLECTIONS_SRC}
          alt="Anpa Limited"
          className="h-6 w-auto max-h-8 object-contain object-left md:h-8 md:max-h-8"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </motion.a>

      <div className="hidden md:flex fixed top-2 left-1/2 z-[95] -translate-x-1/2 pointer-events-none [&>*]:pointer-events-auto">
        <div className="flex items-center gap-3 rounded-full border border-black/12 bg-white/90 px-4 py-2 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06] backdrop-blur-xl supports-[backdrop-filter]:bg-white/82 lg:gap-4 lg:px-5">
          <a href="#spotlight" className={navLinkInBar('spotlight')}>
            {t.home}
          </a>
          <a href="#daily-looks" className={navLinkInBar('daily-looks')}>
            {t.dailyLooks}
          </a>
          <a href="#clothes" className={navLinkInBar('clothes')}>
            {t.clothes}
          </a>
          <a href="#branches" className={navLinkInBar('branches')}>
            {t.branches}
          </a>
          <a href="#partner-brands" className={navLinkInBar('partner-brands')}>
            {t.brands}
          </a>
          <div className="h-5 w-px shrink-0 bg-black/20" aria-hidden />
          <div className="flex items-center gap-0.5">
            {(['uz', 'ru', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  'h-8 min-w-[2.25rem] rounded-full text-[11px] font-semibold uppercase leading-none tracking-normal text-black/65 transition-colors hover:text-black',
                  lang === l && 'bg-black/12 text-black'
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.a
        href={CONTACT_PHONE_TEL}
        className="fixed top-2 right-3 z-[96] hidden h-10 items-center justify-center rounded-full border border-black/12 bg-white/95 px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-black shadow-[0_6px_24px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] backdrop-blur-md transition-colors hover:bg-black/[0.03] sm:right-6 md:inline-flex lg:right-10"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        aria-label={`${ui.contactCall}: ${CONTACT_PHONE_LABEL}`}
      >
        <span>{ui.contactCall}</span>
        <ArrowUpRight size={15} strokeWidth={2} className="ml-1.5 shrink-0" />
      </motion.a>
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

const SLIDE_OBJECT_POSITION_BY_FILENAME: Record<string, string> = {
  // Shift this specific shoe photo up so less bottom area is shown.
  'photo_2025-01-20_17-45-03.jpg': 'object-[50%_70%]'
};

const SpotlightCrossfadeSlideshow: React.FC<{
  slides: readonly string[];
  label: string;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}> = ({ slides, label, active, setActive }) => {
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SPOTLIGHT_SLIDE_MS);
    return () => clearInterval(id);
  }, [slides.length, setActive]);

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
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-center',
            Object.entries(SLIDE_OBJECT_POSITION_BY_FILENAME).find(([filename]) => src.includes(filename))?.[1]
          )}
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
        <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-[12] flex justify-center gap-1.5 px-2 sm:bottom-16 lg:bottom-[4.25rem]">
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

const SPOTLIGHT_SWIPE_MIN_PX = 44;
const SPOTLIGHT_SWIPE_DOMINANCE = 1.15;

const SpotlightCard: React.FC<{ cardKey: SpotlightKey; index: number; className?: string }> = ({ cardKey, index, className }) => {
  const { lang } = React.useContext(LangContext);
  const copy = TRANSLATIONS[lang].cards[cardKey];
  const overlay = SPOTLIGHT_ACCENT[cardKey];
  const slideSet = SPOTLIGHT_SLIDE_SETS[cardKey];
  const isCompactCard = index > 0;
  const [slideIndex, setSlideIndex] = useState(0);
  const swipeTouchRef = useRef<{ x: number; y: number } | null>(null);
  const blockTelegramClickRef = useRef(false);

  useEffect(() => {
    setSlideIndex(0);
  }, [cardKey, lang]);

  const swipeable = Boolean(slideSet && slideSet.length > 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 76, damping: 22 }}
      whileTap={{ scale: 0.992 }}
      whileHover={{ y: -6 }}
      className={cn(
        'group relative h-full w-full min-h-0 overflow-hidden rounded-3xl border border-white/70 bg-white/22 shadow-[0_22px_60px_-34px_rgba(0,0,0,0.45)] backdrop-blur-xl touch-pan-y',
        className
      )}
    >
      <a
        href={CONTACT_TELEGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-[1] touch-pan-y"
        aria-label={`${copy.title} — open in Telegram`}
        onTouchStart={
          swipeable
            ? (e) => {
                if (e.touches.length !== 1) return;
                const t = e.touches[0];
                swipeTouchRef.current = { x: t.clientX, y: t.clientY };
              }
            : undefined
        }
        onTouchEnd={
          swipeable
            ? (e: React.TouchEvent) => {
                const start = swipeTouchRef.current;
                swipeTouchRef.current = null;
                if (!start || !slideSet) return;
                const t = e.changedTouches[0];
                const dx = t.clientX - start.x;
                const dy = t.clientY - start.y;
                if (Math.abs(dx) < SPOTLIGHT_SWIPE_MIN_PX) return;
                if (Math.abs(dx) < Math.abs(dy) * SPOTLIGHT_SWIPE_DOMINANCE) return;
                blockTelegramClickRef.current = true;
                if (dx < 0) {
                  setSlideIndex((i) => (i + 1) % slideSet.length);
                } else {
                  setSlideIndex((i) => (i - 1 + slideSet.length) % slideSet.length);
                }
              }
            : undefined
        }
        onClick={
          swipeable
            ? (e) => {
                if (blockTelegramClickRef.current) {
                  e.preventDefault();
                  blockTelegramClickRef.current = false;
                }
              }
            : undefined
        }
      />
      <div className="absolute inset-0">
        {slideSet && slideSet.length > 0 ? (
          <div className="absolute inset-0 overflow-hidden touch-pan-y">
            <SpotlightCrossfadeSlideshow
              slides={slideSet}
              label={copy.title}
              active={slideIndex}
              setActive={setSlideIndex}
            />
          </div>
        ) : (
          <img
            src={CARD_BG[cardKey]}
            alt=""
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/35" />
      </div>
      <div className={cn('pointer-events-none absolute inset-x-0 bottom-0 z-[2]', isCompactCard ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-3 lg:p-4')}>
        {isCompactCard ? (
          <div className="flex">
            <span className="inline-flex max-w-[92%] items-center rounded-full border border-white/45 bg-white/20 px-2.5 py-1 text-[10px] font-black uppercase leading-tight tracking-[0.08em] text-white backdrop-blur-[7px] sm:px-3 sm:py-1.5 sm:text-[11px]">
              <span className="line-clamp-1">{copy.title}</span>
            </span>
          </div>
        ) : (
          <div className="inline-flex max-w-[95%] items-center rounded-full border border-white/70 bg-white/35 px-3 py-1.5 text-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-3.5 sm:py-2 lg:px-4">
            <span className="line-clamp-1 text-[11px] font-black uppercase leading-tight tracking-[0.09em] sm:text-[13px] lg:text-[14px]">
              {copy.title}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SpotlightSection = () => {
  const { lang } = React.useContext(LangContext);
  const tPhilosophy = TRANSLATIONS[lang].philosophy;

  return (
    <section id="spotlight" className="scroll-mt-20 bg-gradient-to-b from-white to-neutral-50/50 min-h-0 overflow-x-hidden lg:min-h-screen lg:scroll-mt-24">
      <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-col px-3 pb-2 pt-[2.8rem] sm:px-4 sm:pb-5 sm:pt-[3.75rem] md:px-6 md:pb-6 md:pt-[4.2rem] lg:min-h-[calc(100dvh-4rem)] lg:px-8 lg:pb-10 lg:pt-[3.65rem]">
        <div className="grid min-h-0 w-full flex-1 grid-cols-1 items-stretch gap-3 sm:gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)] lg:gap-7">
          {/* Spotlight: full-width stack below lg (no squeezed side column); desktop keeps editorial split */}
          <div className="grid min-h-0 grid-cols-1 items-stretch gap-2 sm:gap-3 max-lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-5 lg:-translate-x-6 xl:-translate-x-10 2xl:-translate-x-14">
            <SpotlightCard
              cardKey="spring"
              index={0}
              className="max-lg:aspect-[5/4] max-lg:min-h-[9.5rem] max-lg:w-full lg:aspect-auto lg:min-h-0 h-full w-full"
            />
            <div className="grid min-h-0 auto-rows-fr gap-2 sm:gap-2.5 max-sm:grid-cols-1 max-sm:grid-rows-3 sm:max-lg:grid-cols-3 sm:max-lg:grid-rows-1 lg:grid-cols-1 lg:grid-rows-3 lg:gap-5">
              <SpotlightCard cardKey="newDrop" index={1} className="min-h-0 max-sm:min-h-[6.1rem] sm:max-lg:min-h-[9.5rem]" />
              <SpotlightCard cardKey="featured" index={2} className="min-h-0 max-sm:min-h-[6.1rem] sm:max-lg:min-h-[9.5rem]" />
              <SpotlightCard cardKey="special" index={3} className="min-h-0 max-sm:min-h-[6.1rem] sm:max-lg:min-h-[9.5rem]" />
            </div>
          </div>

          <div className="flex min-h-0 w-full min-w-0 flex-col items-stretch gap-3 sm:gap-4 lg:h-full lg:gap-5">
            <SectionReveal className="w-full shrink-0 lg:translate-x-5 xl:translate-x-8 2xl:translate-x-10">
              <div
                id="philosophy"
                className="scroll-mt-24 relative overflow-hidden rounded-3xl border border-white/20 bg-[linear-gradient(155deg,rgba(18,18,20,0.92),rgba(36,36,44,0.86))] px-4 py-4 text-center shadow-[0_28px_80px_-42px_rgba(0,0,0,0.72)] ring-1 ring-white/10 backdrop-blur-2xl sm:px-7 sm:py-8 md:px-9 md:py-10 lg:px-10 lg:py-11"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_75%_at_50%_0%,rgba(255,255,255,0.18),transparent_62%)]" aria-hidden />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-300/80 via-orange-300/55 to-transparent" aria-hidden />

                <div className="mb-3 flex items-center justify-center sm:mb-5">
                  <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 shadow-[0_10px_26px_-18px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
                    {tPhilosophy.label}
                  </p>
                </div>

                <h2 className="mx-auto mb-3 max-w-[15ch] text-balance text-[1.35rem] font-black uppercase leading-[1.08] tracking-tight text-white sm:mb-5 sm:text-[2rem] md:text-[2.2rem] lg:text-[2.45rem]">
                  {tPhilosophy.title}
                </h2>
                <div className="mx-auto mb-3 h-px w-14 bg-white/30 sm:mb-6 sm:w-20" aria-hidden />
                <p className="mx-auto max-w-[62ch] whitespace-pre-line text-[13px] leading-relaxed text-white/82 sm:text-[15px] lg:text-[1.02rem]">
                  {tPhilosophy.body}
                </p>

                <div className="mt-4 hidden flex-wrap justify-center gap-1.5 sm:mt-6 sm:flex sm:gap-2.5 md:gap-3">
                  {PHILOSOPHY_BADGES_BY_LANG[lang].map((item) => (
                    <span
                      key={`${lang}-${item}`}
                      className="inline-flex items-center rounded-full border border-white/30 bg-white/12 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-md sm:px-3.5 sm:py-2 sm:text-[11px] sm:tracking-[0.12em] md:px-4"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal className="hidden min-h-0 flex-1 flex-col basis-0 md:flex">
              <div className="flex min-h-0 flex-1 items-center justify-center py-2 sm:py-4">
                <div
                  className="flex w-full max-w-none flex-nowrap items-center justify-center gap-5 sm:gap-8 lg:translate-x-6 lg:gap-12 xl:gap-16 xl:translate-x-10 2xl:translate-x-12"
                  aria-label="210 × Anpa Limited"
                >
                  <img
                    src={LOGO_210_SRC}
                    alt="210 Sports Wear"
                    className="h-[clamp(3.25rem,min(14vw,5.5rem),5.5rem)] w-auto max-w-[44%] object-contain object-center sm:h-[clamp(4.5rem,min(22vw,8rem),8rem)] lg:h-[clamp(7.5rem,min(32vh,15rem),15rem)] xl:h-[clamp(8.5rem,min(36vh,17rem),17rem)]"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    className="h-[clamp(2.75rem,min(12vw,4.75rem),4.75rem)] w-px shrink-0 bg-black/15 sm:h-[clamp(4rem,min(20vw,7rem),7rem)] lg:h-[clamp(6.5rem,min(28vh,13rem),13rem)] xl:h-[clamp(7.5rem,min(32vh,15rem),15rem)]"
                    aria-hidden
                  />
                  <img
                    src={LOGO_COLLECTIONS_SRC}
                    alt="Anpa Limited"
                    className="h-[clamp(3rem,min(14vw,5.75rem),5.75rem)] w-auto max-w-[44%] object-contain object-center sm:h-[clamp(4.75rem,min(22vw,8.25rem),8.25rem)] lg:h-[clamp(7rem,min(28vh,13.5rem),13.5rem)] xl:h-[clamp(8rem,min(32vh,15.5rem),15.5rem)]"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </SectionReveal>
          </div>
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
  const loop = [...BRAND_MARQUEE_ITEMS, ...BRAND_MARQUEE_ITEMS, ...BRAND_MARQUEE_ITEMS];

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

const DailyLooksSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].dailyLooks;
  const ui = TRANSLATIONS[lang].ui;

  return (
    <section id="daily-looks" className="scroll-mt-24 border-t border-black/5 bg-white py-10 min-[480px]:py-12 lg:min-h-screen lg:py-0">
      <div className="mx-auto flex max-w-[1600px] flex-col px-4 pb-8 pt-2 sm:px-6 sm:pb-10 sm:pt-3 lg:min-h-[calc(100dvh-4rem)] lg:justify-center lg:px-8 lg:pb-8 lg:pt-[4.4rem]">
        {/* No SectionReveal here: spring y-overshoot made the card feel like it grew then shrank */}
        <div className="w-full">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.28em] text-black/45 sm:text-left sm:tracking-[0.3em]">
            {t.label}
          </p>
          <div className="grid flex-1 grid-cols-1 items-start gap-6 md:gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
            <motion.div
              className="mx-auto flex w-full max-w-[min(100%,min(96vw,calc((100dvh-12rem)*1.04)))] items-center justify-center gap-3 sm:mx-0 sm:justify-start sm:gap-4 lg:-ml-8"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px 0px -80px 0px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.article
                className="relative z-20 aspect-[9/16] w-[min(76vw,342px)] shrink-0 overflow-hidden rounded-2xl border border-white/40 shadow-[0_14px_45px_-28px_rgba(0,0,0,0.32)] sm:w-[min(47vw,368px)] lg:w-[min(31vw,410px)]"
                initial={{ opacity: 0, x: -16, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px 0px -80px 0px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                animate={{ y: [0, -4, 0] }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.995 }}
              >
                <img
                  src={DAILY_LOOK_IMAGE_SRC}
                  alt={t.title}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_24%]"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DAILY_LOOK_FALLBACK_SRC;
                  }}
                />
                <p className="absolute left-4 bottom-4 text-white text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {t.updatedLabel}
                </p>
              </motion.article>

              <motion.div
                className="relative flex flex-col justify-center gap-3 sm:gap-4"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px 0px -80px 0px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
              >
                <motion.article
                  className="relative aspect-[3/4] w-[min(36vw,190px)] overflow-hidden rounded-2xl border border-white/45 shadow-[0_12px_36px_-25px_rgba(0,0,0,0.3)] sm:w-[min(28vw,220px)] lg:w-[min(20vw,255px)]"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ x: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <img
                    src={DAILY_LOOK_SIDE_CARD_1_SRC}
                    alt={`${t.title} side card 1`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DAILY_LOOK_FALLBACK_SRC;
                    }}
                  />
                </motion.article>
                <motion.article
                  className="relative aspect-[3/4] w-[min(36vw,190px)] overflow-hidden rounded-2xl border border-white/45 shadow-[0_12px_36px_-25px_rgba(0,0,0,0.3)] sm:w-[min(28vw,220px)] lg:w-[min(20vw,255px)]"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  whileHover={{ x: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <img
                    src={DAILY_LOOK_SIDE_CARD_2_SRC}
                    alt={`${t.title} side card 2`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DAILY_LOOK_FALLBACK_SRC;
                    }}
                  />
                </motion.article>
              </motion.div>
            </motion.div>

            <article className="w-full max-w-[680px] rounded-2xl border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.58),rgba(226,232,240,0.36))] p-4 shadow-[0_22px_56px_-34px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-5 lg:max-w-[620px] lg:p-5">
              <h2 className="text-balance text-center text-[1.55rem] font-black uppercase leading-tight text-black sm:text-left md:text-[1.75rem]">
                {t.title}
              </h2>
              {t.body.trim() ? (
                <p className="mt-2.5 text-center text-sm leading-relaxed text-black/65 sm:text-left">{t.body}</p>
              ) : null}
              <div
                className={cn(
                  'mx-auto h-px w-24 bg-black/15 sm:mx-0',
                  t.body.trim() ? 'mt-4' : 'mt-3'
                )}
                aria-hidden
              />

              <div className="mt-3.5 space-y-2 sm:space-y-2.5">
                {t.items.map((item) => (
                  <div key={item.name} className="grid min-h-[2.9rem] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-xl border border-white/80 bg-white/45 px-3 py-2 backdrop-blur-xl sm:min-h-[3.1rem] sm:gap-2.5 sm:px-3.5 sm:py-2.5">
                    <span className="min-w-0 flex items-center gap-2 text-sm font-semibold leading-snug text-black md:text-[15px]">
                      <DailyLookItemIcon kind={item.kind} className="h-4 w-4 shrink-0 text-black" />
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="shrink-0 text-right text-sm font-bold tabular-nums text-black md:text-[15px]">{item.price}</span>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/70 p-1.5 text-black transition-colors backdrop-blur-md hover:bg-white/90 sm:h-10 sm:w-10"
                      aria-label={`${ui.addToCart}: ${item.name}`}
                    >
                      <ShoppingBag size={16} strokeWidth={1.75} />
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-black/45">{t.priceLabel}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClothesSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].clothes;
  const ui = TRANSLATIONS[lang].ui;

  return (
    <section id="clothes" className="scroll-mt-24 overflow-x-hidden border-t border-black/5 bg-white py-12 md:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/45 mb-2 text-center">{t.label}</p>
          <h2
            className={`text-2xl md:text-3xl font-black uppercase text-black leading-tight text-center ${t.body.trim() ? 'mb-3 md:mb-4' : 'mb-8 md:mb-10'}`}
          >
            {t.title}
          </h2>
          {t.body.trim() ? (
            <p className="text-sm md:text-base text-black/60 leading-relaxed text-center max-w-2xl mx-auto mb-8 md:mb-10">
              {t.body}
            </p>
          ) : null}
        </SectionReveal>
      </div>

      {/* Horizontal row: equal space at start/end when row is shorter than viewport; scroll when needed */}
      <div
        className="touch-auto overscroll-x-contain overflow-x-auto overflow-y-hidden scroll-smooth pb-2 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch] [scroll-padding-inline:1rem] sm:[scroll-padding-inline:1.5rem] lg:[scroll-padding-inline:2.5rem]"
        role="region"
        aria-label={t.title}
      >
        <div className="flex w-max min-w-full snap-x snap-mandatory justify-start gap-3 px-4 pb-1 sm:justify-evenly sm:gap-5 sm:px-6 lg:px-10">
          {t.items.map((item) => (
            <article
              key={item.name}
              className="relative aspect-[13/15] w-[min(80vw,268px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.62),rgba(219,234,254,0.34))] shadow-[0_20px_48px_-32px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:w-[280px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.45),transparent_45%)]" aria-hidden />
              <div className="relative flex h-full min-h-0 flex-col p-4">
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-black/15 text-black/40 text-xl mb-3">
                    +
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/55">{item.name}</p>
                  <p className="mt-2 text-[12px] text-black/45">Photo placeholder</p>
                </div>
                <div className="mt-auto flex shrink-0 items-center justify-between gap-2 border-t border-white/60 pt-3">
                  <span className="text-[12px] sm:text-[13px] font-bold text-black tabular-nums">{item.price}</span>
                  <button
                    type="button"
                    className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/70 p-2 text-black transition-colors backdrop-blur-md hover:bg-white/90"
                    aria-label={`${ui.addToCart}: ${item.name}`}
                  >
                    <ShoppingBag size={18} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="partner-brands" className="mx-auto mt-10 max-w-[1600px] scroll-mt-24 px-4 sm:mt-12 sm:px-6 lg:mt-14 lg:px-10">
        <SectionReveal>
          <div className="grid grid-cols-1 items-center gap-5 rounded-[2rem] border border-black/12 bg-white/90 p-4 shadow-[0_10px_34px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06] backdrop-blur-xl supports-[backdrop-filter]:bg-white/84 sm:p-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-7 lg:p-6">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-black/10 bg-white/80 p-2 shadow-[0_16px_34px_-20px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.05] backdrop-blur-lg sm:p-2.5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.45),transparent_45%)]" aria-hidden />
              <img
                src={PARTNER_BRANDS_IMAGE_SRC}
                alt={t.brandsTitle}
                className="relative z-[1] h-[190px] w-full rounded-[1rem] border border-black/10 object-cover sm:h-[230px] lg:h-[255px]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <article className="text-center lg:text-left">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-black/60">{t.label}</p>
              <h3 className="mt-1 text-[1.45rem] font-black uppercase leading-tight text-black sm:text-[1.7rem]">
                {t.brandsTitle}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-black/80 sm:text-[17px]">{t.brandsBody}</p>
              <p className="mt-3 text-[12px] font-extrabold uppercase tracking-[0.14em] text-black/65">{t.brandsNote}</p>
            </article>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

const SectionReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-48px 0px -80px 0px' }}
    transition={{ type: 'spring', stiffness: 70, damping: 24 }}
    className={className}
  >
    {children}
  </motion.div>
);

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
      className="group relative overflow-hidden rounded-2xl border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.6),rgba(226,232,240,0.35))] shadow-[0_20px_52px_-32px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
      whileHover={{ scale: 1.02 }}
    >
      <motion.a
        href={branch.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${branch.name} — ${actionMaps}`}
        whileTap={{ scale: 0.96 }}
        className="absolute top-3 right-3 z-20 inline-flex items-center justify-center rounded-full border border-white/70 bg-white/70 text-black p-2.5 backdrop-blur-md transition-colors hover:bg-white/90"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] leading-none">
          OPEN
        </span>
      </motion.a>

      <div className="w-full">
        <div className="relative w-full h-[200px] sm:h-[220px] bg-neutral-50 overflow-hidden">
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

        <div className="px-4 py-3.5 sm:px-5 sm:py-4">
          <h3 className="text-[18px] sm:text-[20px] font-black text-black leading-tight">{branch.name}</h3>

          <div className="mt-3.5 flex flex-col gap-2.5">
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
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-black/20 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-black hover:bg-black hover:text-white transition-colors"
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
    <section id="branches" className="scroll-mt-24 border-t border-black/5 bg-white py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/45 mb-2 text-center">{t.label}</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-black mb-3 md:mb-4 leading-tight text-center">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-black/60 leading-relaxed text-center max-w-2xl mx-auto mb-8 md:mb-10">
            {t.body}
          </p>
        </SectionReveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
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

const CartFloatingButton: React.FC = () => {
  return (
    <motion.button
      type="button"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black text-white shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)] transition-colors hover:bg-neutral-900"
      whileTap={{ scale: 0.95 }}
      aria-label="Cart"
    >
      <ShoppingBag size={20} strokeWidth={1.75} />
      <span className="absolute top-2 right-2 min-w-[14px] h-[14px] px-0.5 flex items-center justify-center bg-white text-black text-[9px] font-bold rounded-full leading-none">
        0
      </span>
    </motion.button>
  );
};

const Footer = () => {
  const { lang } = React.useContext(LangContext);

  const legalText: Record<Language, { privacy: { title: string }; terms: { title: string } }> = {
    uz: {
      privacy: {
        title: 'Maxfiylik siyosati'
      },
      terms: {
        title: 'Foydalanish shartlari'
      }
    },
    ru: {
      privacy: {
        title: 'Политика конфиденциальности'
      },
      terms: {
        title: 'Пользовательские условия'
      }
    },
    en: {
      privacy: {
        title: 'Privacy Policy'
      },
      terms: {
        title: 'Terms of Use'
      }
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-100 text-black py-16 md:py-20 border-t border-black/12 shadow-[0_-18px_42px_-34px_rgba(0,0,0,0.32)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-10">
        <div className="flex items-center gap-5 md:gap-8" aria-label="210 × Anpa Limited">
          <img
            src={LOGO_210_SRC}
            alt="210 Sports Wear"
            className="h-12 md:h-16 w-auto max-h-16 object-contain object-center"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <span className="shrink-0 w-px h-11 md:h-14 bg-black/15 rounded-full" aria-hidden />
          <img
            src={LOGO_COLLECTIONS_SRC}
            alt="Anpa Limited"
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
            className="text-black/65 hover:text-black transition-colors p-2"
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
            className="text-black/65 hover:text-black transition-colors p-2"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <TelegramIcon size={26} />
          </motion.a>
          <motion.a
            href={CONTACT_PHONE_TEL}
            aria-label={`Phone ${CONTACT_PHONE_LABEL}`}
            className="text-black/65 hover:text-black transition-colors p-2"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <Phone size={26} strokeWidth={1.75} />
          </motion.a>
        </div>

        <div className="mt-2 flex w-full flex-col items-center gap-4 border-t border-black/10 pt-6 sm:flex-row sm:justify-between sm:gap-6">
          <span className="order-2 text-center text-[12px] text-black/50 select-none sm:order-1 sm:text-left">
            © {new Date().getFullYear()} 210 Sports Wear. Все права защищены.
          </span>
          <div className="order-1 flex items-center gap-6 sm:order-2">
            <a
              href="/privacy"
              className="text-[12px] text-black/50 hover:text-black transition-colors"
            >
              {legalText[lang].privacy.title}
            </a>
            <a
              href="/terms"
              className="text-[12px] text-black/50 hover:text-black transition-colors"
            >
              {legalText[lang].terms.title}
            </a>
          </div>
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
        <CartFloatingButton />

        <main>
          <SpotlightSection />
          <BrandMarquee />
          <DailyLooksSection />
          <ClothesSection />
          <BranchesSection />
        </main>

        <Footer />

        <style>{`
          @keyframes marquee {
            0% { transform: translate3d(0,0,0); }
            100% { transform: translate3d(-33.333%,0,0); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 12s linear infinite;
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee {
              animation-duration: 14s;
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
