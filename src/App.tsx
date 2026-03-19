import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, Instagram, Facebook, Twitter, Globe, Eye } from 'lucide-react';
import { cn } from './lib/utils';

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
type Language = 'ru' | 'uz';

interface Translations {
  nav: {
    new: string;
    sport: string;
    classic: string;
    brands: string;
  };
  hero: {
    title1: string;
    title2: string;
    desc: string;
    btnSport: string;
    btnClassic: string;
    rail: string;
  };
  products: {
    badge: string;
    add: string;
    quickView: string;
    sale: string;
    curated: string;
    featured: string;
    all: string;
    viewAll: string;
  };
  newCollection: {
    label: string;
    title: string;
    cta: string;
  };
  about: {
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
  newsletter: {
    title: string;
    desc: string;
    placeholder: string;
    btn: string;
  };
  footer: {
    desc: string;
    shop: string;
    support: string;
    rights: string;
    privacy: string;
    terms: string;
    shipping: string;
    sizeGuide: string;
    contact: string;
    faq: string;
  };
}

const TRANSLATIONS: Record<Language, Translations> = {
  ru: {
    nav: { new: "Новинки", sport: "Спорт", classic: "Полуклассика", brands: "Бренды" },
    hero: {
      title1: "Только",
      title2: "Оригинал.",
      desc: "Оригинальные бренды. Спортивная и полуклассическая одежда для тех, кто ценит качество и традиции.",
      btnSport: "Спорт",
      btnClassic: "Классика",
      rail: "ОСНОВАНО В 2016 — ПРЕМИАЛЬНОЕ КАЧЕСТВО"
    },
    products: {
      badge: "Оригинал",
      add: "В корзину",
      quickView: "Быстрый просмотр",
      sale: "Скидка",
      curated: "Кураторская коллекция",
      featured: "Избранные товары",
      all: "Все",
      viewAll: "Посмотреть все товары"
    },
    newCollection: {
      label: "Весна 2025",
      title: "Новая коллекция",
      cta: "Смотреть коллекцию"
    },
    about: {
      label: "О бренде",
      title: "Только оригинал. С 2016 года.",
      body: "Мы отбираем только подлинную спортивную и полуклассическую одежду. Каждая вещь — из первых рук, с гарантией качества. Для тех, кто не идёт на компромиссы."
    },
    categories: {
      sportTitle: "Спортивный стиль",
      sportDesc: "Создано для движения. Оригинальная экипировка от ведущих мировых брендов.",
      sportBtn: "Исследовать спорт",
      classicTitle: "Полуклассика",
      classicDesc: "Идеальный баланс между повседневным и формальным стилем. Вневременные вещи.",
      classicBtn: "Исследовать классику"
    },
    newsletter: {
      title: "Присоединяйся к нам.",
      desc: "Получи эксклюзивный доступ к новым дропам и закрытым распродажам. Только для сообщества «210».",
      placeholder: "ВВЕДИТЕ ВАШ EMAIL",
      btn: "Подписаться"
    },
    footer: {
      desc: "Ваше место для аутентичной брендовой одежды. Мы объединяем спорт и стиль.",
      shop: "Магазин",
      support: "Поддержка",
      rights: "© 2024 МАГАЗИН 210. ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      shipping: "Доставка и возврат",
      sizeGuide: "Гид по размерам",
      contact: "Контакты",
      faq: "Часто задаваемые вопросы"
    }
  },
  uz: {
    nav: { new: "Yangi kelganlar", sport: "Sport", classic: "Yarim klassika", brands: "Brendlar" },
    hero: {
      title1: "Faqat",
      title2: "Original.",
      desc: "Original brendlar. Sifat va an'analarni qadrlaydiganlar uchun sport va yarim klassik kiyimlar to'plami.",
      btnSport: "Sport",
      btnClassic: "Klassika",
      rail: "2024-YILDA ASOS SOLINGAN — PREMIUM SIFAT"
    },
    products: {
      badge: "Original",
      add: "Savatga qo'shish",
      quickView: "Tezkor ko'rinish",
      sale: "Chegirma",
      curated: "Tanlangan to'plam",
      featured: "Saralangan mahsulotlar",
      all: "Hammasi",
      viewAll: "Barcha mahsulotlarni ko'rish"
    },
    newCollection: {
      label: "Bahor 2025",
      title: "Yangi kolleksiya",
      cta: "Kolleksiyani ko'rish"
    },
    about: {
      label: "Brend haqida",
      title: "Faqat original. 2016-yildan beri.",
      body: "Biz faqat haqiqiy sport va yarim klassik kiyimlarni tanlaymiz. Har bir buyum birinchi qo'ldan, sifat kafolati bilan. Kompromisslar qilmaydiganlar uchun."
    },
    categories: {
      sportTitle: "Sport uslubi",
      sportDesc: "Harakat uchun yaratilgan. Dunyoning yetakchi brendlaridan original ekipirovka.",
      sportBtn: "Sportni kashf eting",
      classicTitle: "Yarim klassika",
      classicDesc: "Kundalik va rasmiy uslub o'rtasidagi mukammal muvozanat. Doimiy dolzarb kiyimlar.",
      classicBtn: "Klassikani kashf eting"
    },
    newsletter: {
      title: "Bizga qo'shiling.",
      desc: "Yangi kolleksiyalar va yopiq savdolarga eksklyuziv kirish huquqini oling. Faqat «210» hamjamiyati uchun.",
      placeholder: "EMAILINGIZNI KIRITING",
      btn: "Obuna bo'lish"
    },
    footer: {
      desc: "Haqiqiy brend kiyimlari uchun manzilingiz. Biz sport va uslubni birlashtiramiz.",
      shop: "Do'kon",
      support: "Yordam",
      rights: "© 2024 210 DO'KONI. BARCHA HUQUQLAR HIMOYA QILINGAN.",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
      shipping: "Yetkazib berish va qaytarish",
      sizeGuide: "O'lchamlar bo'yicha qo'llanma",
      contact: "Biz bilan bog'lanish",
      faq: "Ko'p beriladigan savollar"
    }
  }
};

interface Product {
  id: number;
  name: Record<Language, string>;
  brand: string;
  price: string;
  salePrice?: string; // optional discount
  category: 'Sport' | 'Semi-Classic';
  image: string;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: { ru: "Худи Tech Fleece", uz: "Tech Fleece Hudisi" },
    brand: "Nike",
    price: "1 200 000 UZS",
    salePrice: "999 000 UZS",
    category: 'Sport',
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: { ru: "Рубашка Oxford", uz: "Oxford Ko'ylagi" },
    brand: "Ralph Lauren",
    price: "950 000 UZS",
    category: 'Semi-Classic',
    image: "https://images.unsplash.com/photo-1596755094514-f87034a264c6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: { ru: "Спортивные брюки", uz: "Sport Shimlari" },
    brand: "Adidas",
    price: "850 000 UZS",
    category: 'Sport',
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: { ru: "Брюки Чинос", uz: "Chinos Shimlari" },
    brand: "Tommy Hilfiger",
    price: "1 100 000 UZS",
    category: 'Semi-Classic',
    image: "https://images.unsplash.com/photo-1473966968600-fa804b8693ba?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: { ru: "Кроссовки Air Max 270", uz: "Air Max 270 Krossovkalari" },
    brand: "Nike",
    price: "1 500 000 UZS",
    category: 'Sport',
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: { ru: "Свитер из шерсти мериноса", uz: "Merinos Junli Sviteri" },
    brand: "Lacoste",
    price: "1 400 000 UZS",
    category: 'Semi-Classic',
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"
  }
];

const BRANDS = ["Nike", "Adidas", "Puma", "Ralph Lauren", "Tommy Hilfiger", "Lacoste", "Hugo Boss"];

// --- Context for Language ---
const LangContext = React.createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'ru', setLang: () => {} });

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollTop = useScrollTop();
  const { lang, setLang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].nav;
  const isScrolled = scrollTop > 24;

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.8)',
        boxShadow: isScrolled ? '0 1px 0 0 rgba(0,0,0,0.06)' : 'none'
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a href="#" className="flex-shrink-0 flex flex-col items-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <span className="text-4xl font-black tracking-tighter leading-none">210</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase -mt-1 text-black/60">Sports Wear</span>
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {([t.new, t.sport, t.classic, t.brands] as const).map((label) => (
              <motion.a key={label} href="#" className="text-sm font-semibold uppercase tracking-wider text-black/80 hover:text-black transition-colors" whileHover={{ y: -1 }}>{label}</motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center bg-black/5 rounded-full p-1">
              <button onClick={() => setLang('ru')} className={cn("px-3 py-1 text-[10px] font-bold rounded-full transition-all", lang === 'ru' ? "bg-black text-white" : "text-black/40")}>RU</button>
              <button onClick={() => setLang('uz')} className={cn("px-3 py-1 text-[10px] font-bold rounded-full transition-all", lang === 'uz' ? "bg-black text-white" : "text-black/40")}>UZ</button>
            </div>
            <motion.button className="p-2 hover:bg-black/5 rounded-full transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Search size={20} /></motion.button>
            <motion.button className="p-2 hover:bg-black/5 rounded-full transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><User size={20} /></motion.button>
            <motion.button className="p-2 hover:bg-black/5 rounded-full transition-colors relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setLang(lang === 'ru' ? 'uz' : 'ru')} className="p-2 bg-black/5 rounded-full"><Globe size={20} /></button>
            <motion.button onClick={() => setIsOpen(!isOpen)} className="p-2" whileTap={{ scale: 0.9 }}>{isOpen ? <X size={24} /> : <Menu size={24} />}</motion.button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-b border-black/5 px-4 pt-2 pb-6 space-y-4 overflow-hidden">
          <a href="#" className="block text-lg font-bold uppercase tracking-tight py-2">{t.new}</a>
          <a href="#" className="block text-lg font-bold uppercase tracking-tight py-2">{t.sport}</a>
          <a href="#" className="block text-lg font-bold uppercase tracking-tight py-2">{t.classic}</a>
          <a href="#" className="block text-lg font-bold uppercase tracking-tight py-2">{t.brands}</a>
          <div className="flex space-x-6 pt-4 border-t border-black/5">
            <Search size={20} /><User size={20} /><ShoppingBag size={20} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const Hero = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 opacity-60"
      >
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920"
          alt="Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
      </motion.div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-white">
          <motion.h1 custom={0} variants={heroVariants} initial="hidden" animate="visible" className="text-7xl md:text-9xl font-black uppercase leading-[0.85] mb-6">
            {t.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{t.title2}</span>
          </motion.h1>
          <motion.p custom={1} variants={heroVariants} initial="hidden" animate="visible" className="text-lg md:text-xl font-medium text-white/80 mb-8 max-w-lg">
            {t.desc}
          </motion.p>
          <motion.div custom={2} variants={heroVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
            <motion.button className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {t.btnSport} <ArrowRight size={18} />
            </motion.button>
            <motion.button className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {t.btnClassic}
            </motion.button>
          </motion.div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className="absolute right-8 bottom-24 hidden lg:block">
        <span className="writing-vertical-rl rotate-180 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">{t.rail}</span>
      </motion.div>
    </section>
  );
};

const BrandMarquee = () => {
  return (
    <div className="py-12 bg-white border-y border-black/5 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <span key={i} className="mx-12 text-3xl md:text-5xl font-black uppercase text-black/10 hover:text-black transition-colors cursor-default">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].products;
  const hasSale = !!product.salePrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
        <img
          src={product.image}
          alt={product.name[lang]}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-black text-white text-[10px] font-bold uppercase px-2 py-1 tracking-wider w-fit">
            {t.badge}
          </span>
          {hasSale && (
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 tracking-wider w-fit">
              {t.sale}
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button className="w-full bg-white/95 text-black py-3 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2" whileHover={{ backgroundColor: 'rgba(255,255,255,1)' }} whileTap={{ scale: 0.98 }}>
            <Eye size={14} /> {t.quickView}
          </motion.button>
          <motion.button className="w-full bg-black text-white py-4 font-bold uppercase text-sm" whileHover={{ backgroundColor: 'rgba(0,0,0,0.85)' }} whileTap={{ scale: 0.98 }}>
            {t.add}
          </motion.button>
        </div>
      </div>
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-black/50 uppercase tracking-widest mb-1">{product.brand}</p>
          <h3 className="text-lg font-bold leading-tight truncate">{product.name[lang]}</h3>
        </div>
        <div className="flex flex-col items-end flex-shrink-0">
          {hasSale && <span className="text-xs text-black/40 line-through">{product.price}</span>}
          <span className="font-bold">{product.salePrice ?? product.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

const SectionReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

const NewCollectionSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].newCollection;
  const featured = PRODUCTS[0];

  return (
    <section className="py-24 bg-neutral-50 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <motion.img
                src={featured.image}
                alt={featured.name[lang]}
                loading="lazy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              />
              <span className="absolute top-6 left-6 bg-black text-white text-[10px] font-bold uppercase px-3 py-1.5 tracking-widest">{t.label}</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/50 mb-4">{t.label}</p>
              <h2 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-[0.95]">{t.title}</h2>
              <p className="text-lg text-black/70 mb-8 max-w-md">{TRANSLATIONS[lang].hero.desc}</p>
              <motion.button className="bg-black text-white px-10 py-4 font-bold uppercase tracking-widest flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {t.cta} <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].about;

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/50 mb-4">{t.label}</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">{t.title}</h2>
          <p className="text-lg text-black/70 leading-relaxed">{t.body}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
            alt="Store"
            loading="lazy"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </SectionReveal>
    </section>
  );
};

const CategorySection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].categories;

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectionReveal>
          <motion.div className="relative h-[600px] overflow-hidden group rounded-sm" whileHover="hover" initial="rest">
            <motion.img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
              alt="Sport"
              loading="lazy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <h2 className="text-5xl font-black uppercase mb-4">{t.sportTitle}</h2>
              <p className="text-lg text-white/80 mb-6 max-w-sm">{t.sportDesc}</p>
              <motion.button className="w-fit border-b-2 border-white pb-1 font-bold uppercase tracking-widest hover:text-white/70 hover:border-white/70 transition-colors" whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                {t.sportBtn}
              </motion.button>
            </div>
          </motion.div>
        </SectionReveal>
        <SectionReveal>
          <motion.div className="relative h-[600px] overflow-hidden group rounded-sm" whileHover="hover" initial="rest">
            <motion.img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1000"
              alt="Semi-Classic"
              loading="lazy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <h2 className="text-5xl font-black uppercase mb-4">{t.classicTitle}</h2>
              <p className="text-lg text-white/80 mb-6 max-w-sm">{t.classicDesc}</p>
              <motion.button className="w-fit border-b-2 border-white pb-1 font-bold uppercase tracking-widest hover:text-white/70 hover:border-white/70 transition-colors" whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                {t.classicBtn}
              </motion.button>
            </div>
          </motion.div>
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
      className="bg-black text-white pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col items-start mb-8">
              <span className="text-6xl font-black tracking-tighter leading-none">210</span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase -mt-1 text-white/60">Sports Wear</span>
            </div>
            <p className="text-white/60 max-w-sm mb-8">
              {t.desc}
            </p>
            <div className="flex space-x-6">
              <motion.a href="#" aria-label="Instagram" whileHover={{ scale: 1.1, opacity: 0.8 }}><Instagram className="cursor-pointer" /></motion.a>
              <motion.a href="#" aria-label="Facebook" whileHover={{ scale: 1.1, opacity: 0.8 }}><Facebook className="cursor-pointer" /></motion.a>
              <motion.a href="#" aria-label="Twitter" whileHover={{ scale: 1.1, opacity: 0.8 }}><Twitter className="cursor-pointer" /></motion.a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold uppercase mb-6">{t.shop}</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">{TRANSLATIONS[lang].nav.new}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{TRANSLATIONS[lang].nav.sport}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{TRANSLATIONS[lang].nav.classic}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{TRANSLATIONS[lang].nav.brands}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold uppercase mb-6">{t.support}</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">{t.shipping}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.sizeGuide}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.contact}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.faq}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs font-bold uppercase tracking-widest">
          <p>{t.rights}</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = React.useState<Language>('ru');
  const t = TRANSLATIONS[lang];

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen">
        <Navbar />
        
        <main>
          <Hero />
          <BrandMarquee />

          <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 mb-2 block">{t.products.curated}</span>
                  <h2 className="text-5xl md:text-6xl font-black uppercase">{t.products.featured}</h2>
                </div>
                <div className="flex gap-4">
                  <motion.button className="px-6 py-2 border border-black font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{t.products.all}</motion.button>
                  <motion.button className="px-6 py-2 border border-black/10 font-bold uppercase text-xs tracking-widest hover:border-black transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{t.nav.sport}</motion.button>
                  <motion.button className="px-6 py-2 border border-black/10 font-bold uppercase text-xs tracking-widest hover:border-black transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{t.nav.classic}</motion.button>
                </div>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <SectionReveal className="mt-16 flex justify-center">
              <motion.button className="group flex items-center gap-4 text-xl font-black uppercase tracking-tighter" whileHover={{ gap: 24 }} whileTap={{ scale: 0.98 }}>
                {t.products.viewAll} <ArrowRight size={24} />
              </motion.button>
            </SectionReveal>
          </section>

          <NewCollectionSection />
          <AboutSection />
          <CategorySection />

          <section className="py-24 bg-black text-white overflow-hidden">
            <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="absolute -top-24 -right-24 text-[200px] font-black text-white/5 select-none pointer-events-none">210</div>
              <div className="max-w-2xl relative">
                <h2 className="text-6xl md:text-8xl font-black uppercase mb-8 leading-none">{t.newsletter.title}</h2>
                <p className="text-xl text-white/60 mb-12">{t.newsletter.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder={t.newsletter.placeholder}
                    className="bg-white/10 border border-white/20 px-6 py-4 flex-grow font-bold uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
                  />
                  <motion.button className="bg-white text-black px-12 py-4 font-black uppercase tracking-widest shrink-0" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {t.newsletter.btn}
                  </motion.button>
                </div>
              </div>
            </SectionReveal>
          </section>
        </main>

        <Footer />

        {/* Custom Styles for Marquee */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 30s linear infinite;
          }
          .writing-vertical-rl {
            writing-mode: vertical-rl;
          }
        `}</style>
      </div>
    </LangContext.Provider>
  );
}
