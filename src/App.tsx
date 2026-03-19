import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, Instagram, Facebook, Twitter, Globe, Eye, MapPin } from 'lucide-react';
import { cn } from './lib/utils';

const LOGO_210_SRC = new URL('../photo/photo_2026-03-19_10-13-51.jpg', import.meta.url).href;

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
  };
  hero: {
    headline: string;
    subtext: string;
    rail: string;
  };
  looks: {
    shopLooks: string;
    fullSet: string;
    viewLook: string;
    buyFullLook: string;
    addSeparately: string;
    itemsInLook: string;
  };
  products: {
    badge: string;
    add: string;
    quickView: string;
    sale: string;
    curated: string;
    featured: string;
    individualPieces: string;
    all: string;
    viewAll: string;
  };
  trust: {
    title: string;
    authentic: string;
    globalSourcing: string;
    handpicked: string;
  };
  newLooksDrop: {
    label: string;
    title: string;
    desc: string;
    cta: string;
  };
  showroom: {
    title: string;
    address: string;
    cta: string;
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

const HERO_BRANDS = ['FILA', 'ARCTERYX', 'ADIDAS', 'NIKE', 'WILSON', 'HERMES', 'PUMA', 'COLUMBIA', 'ON', 'FUSION', 'GUCCI', 'UA'];

const TRANSLATIONS: Record<Language, Translations> = {
  uz: {
    nav: { shopLooks: "Ko'rinishlar", new: "Yangi kelganlar", sport: "Sport", classic: "Yarim klassika", brands: "Brendlar" },
    hero: {
      headline: "Dunyo bo'ylab tayyor premium ko'rinishlar",
      subtext: "Biz tanlaymiz, uslublashtiramiz va original buyumlarni rasmiy import qilamiz",
      rail: "2016-YILDA ASOS SOLINGAN — TOSHKENT"
    },
    looks: {
      shopLooks: "Ko'rinishlar",
      fullSet: "To'liq set",
      viewLook: "Ko'rinishni ko'rish",
      buyFullLook: "Butun obrazni sotib olish",
      addSeparately: "Alohida qo'shish",
      itemsInLook: "Obrazga kiradi"
    },
    products: {
      badge: "Original",
      add: "Savatga qo'shish",
      quickView: "Tezkor ko'rinish",
      sale: "Chegirma",
      curated: "Tanlangan to'plam",
      featured: "Saralangan mahsulotlar",
      individualPieces: "Alohida buyumlar",
      all: "Hammasi",
      viewAll: "Barcha mahsulotlarni ko'rish"
    },
    trust: {
      title: "Nima uchun ishonamiz",
      authentic: "100% original",
      globalSourcing: "Turli mamlakatlardan yetkazib berish",
      handpicked: "Qo'lda tanlangan kombinatsiyalar"
    },
    newLooksDrop: {
      label: "Cheklangan drop",
      title: "Yangi ko'rinishlar",
      desc: "Eksklyuziv setlar. Cheklangan miqdor.",
      cta: "Ko'rinishlarni ko'rish"
    },
    showroom: {
      title: "Shou-room",
      address: "Toshkent",
      cta: "Shou-roomga tashrif buyuring"
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
  },
  ru: {
    nav: { shopLooks: "Образы", new: "Новинки", sport: "Спорт", classic: "Полуклассика", brands: "Бренды" },
    hero: {
      headline: "Готовые премиальные образы со всего мира",
      subtext: "Мы подбираем, стилизуем и официально ввозим оригинальные вещи",
      rail: "ОСНОВАНО В 2016 — ТАШКЕНТ"
    },
    looks: {
      shopLooks: "Образы",
      fullSet: "Полный комплект",
      viewLook: "Смотреть образ",
      buyFullLook: "Купить весь образ",
      addSeparately: "Добавить отдельно",
      itemsInLook: "В образ входит"
    },
    products: {
      badge: "Оригинал",
      add: "В корзину",
      quickView: "Быстрый просмотр",
      sale: "Скидка",
      curated: "Кураторская коллекция",
      featured: "Избранные товары",
      individualPieces: "Отдельные вещи",
      all: "Все",
      viewAll: "Посмотреть все товары"
    },
    trust: {
      title: "Почему нам доверяют",
      authentic: "100% оригинал",
      globalSourcing: "Поставки из разных стран",
      handpicked: "Ручной подбор образов"
    },
    newLooksDrop: {
      label: "Ограниченный дроп",
      title: "Новые образы",
      desc: "Эксклюзивные комплекты. Ограниченное количество.",
      cta: "Смотреть образы"
    },
    showroom: {
      title: "Шоурум",
      address: "Ташкент",
      cta: "Посетить шоурум"
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
  en: {
    nav: { shopLooks: "Looks", new: "New", sport: "Sport", classic: "Semi-classic", brands: "Brands" },
    hero: {
      headline: "Ready-made premium looks from around the world",
      subtext: "We curate, style, and officially import original pieces",
      rail: "EST. 2016 — TASHKENT"
    },
    looks: {
      shopLooks: "Looks",
      fullSet: "Full set",
      viewLook: "View look",
      buyFullLook: "Buy full look",
      addSeparately: "Add separately",
      itemsInLook: "This look includes"
    },
    products: {
      badge: "Original",
      add: "Add to cart",
      quickView: "Quick view",
      sale: "Sale",
      curated: "Curated collection",
      featured: "Featured",
      individualPieces: "Individual pieces",
      all: "All",
      viewAll: "View all products"
    },
    trust: {
      title: "Why trust us",
      authentic: "100% authentic",
      globalSourcing: "Global sourcing",
      handpicked: "Handpicked combinations"
    },
    newLooksDrop: {
      label: "Limited drop",
      title: "New looks",
      desc: "Exclusive sets. Limited quantity.",
      cta: "View looks"
    },
    showroom: {
      title: "Showroom",
      address: "Tashkent",
      cta: "Visit our showroom"
    },
    newCollection: {
      label: "Spring 2025",
      title: "New collection",
      cta: "View collection"
    },
    about: {
      label: "About",
      title: "Original only. Since 2016.",
      body: "We select only authentic sport and semi-classic wear. Every piece is first-hand, with quality guarantee. For those who don't compromise."
    },
    categories: {
      sportTitle: "Sport style",
      sportDesc: "Built for movement. Original gear from leading global brands.",
      sportBtn: "Explore sport",
      classicTitle: "Semi-classic",
      classicDesc: "The perfect balance between casual and formal. Timeless pieces.",
      classicBtn: "Explore classic"
    },
    newsletter: {
      title: "Join us.",
      desc: "Get exclusive access to new drops and private sales. For the 210 community only.",
      placeholder: "YOUR EMAIL",
      btn: "Subscribe"
    },
    footer: {
      desc: "Your destination for authentic brand wear. We bring together sport and style.",
      shop: "Shop",
      support: "Support",
      rights: "© 2024 210. ALL RIGHTS RESERVED.",
      privacy: "Privacy policy",
      terms: "Terms of use",
      shipping: "Shipping & returns",
      sizeGuide: "Size guide",
      contact: "Contact",
      faq: "FAQ"
    }
  }
};

interface Product {
  id: number;
  name: Record<Language, string>;
  brand: string;
  price: string;
  salePrice?: string;
  category: 'Sport' | 'Semi-Classic';
  image: string;
}

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

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: { ru: "Худи Tech Fleece", uz: "Tech Fleece Hudisi", en: "Tech Fleece Hoodie" },
    brand: "Nike",
    price: "1 200 000 UZS",
    salePrice: "999 000 UZS",
    category: 'Sport',
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: { ru: "Рубашка Oxford", uz: "Oxford Ko'ylagi", en: "Oxford Shirt" },
    brand: "Ralph Lauren",
    price: "950 000 UZS",
    category: 'Semi-Classic',
    image: "https://images.unsplash.com/photo-1596755094514-f87034a264c6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: { ru: "Спортивные брюки", uz: "Sport Shimlari", en: "Sport Pants" },
    brand: "Adidas",
    price: "850 000 UZS",
    category: 'Sport',
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: { ru: "Брюки Чинос", uz: "Chinos Shimlari", en: "Chinos" },
    brand: "Tommy Hilfiger",
    price: "1 100 000 UZS",
    category: 'Semi-Classic',
    image: "https://images.unsplash.com/photo-1473966968600-fa804b8693ba?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: { ru: "Кроссовки Air Max 270", uz: "Air Max 270 Krossovkalari", en: "Air Max 270" },
    brand: "Nike",
    price: "1 500 000 UZS",
    category: 'Sport',
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: { ru: "Свитер из шерсти мериноса", uz: "Merinos Junli Sviteri", en: "Merino Sweater" },
    brand: "Lacoste",
    price: "1 400 000 UZS",
    category: 'Semi-Classic',
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"
  }
];

const BRANDS = ["Nike", "Adidas", "Puma", "Ralph Lauren", "Tommy Hilfiger", "Lacoste", "Hugo Boss"];

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
            <motion.a href="#shop-looks" className="text-sm font-bold uppercase tracking-wider text-black border-b-2 border-black pb-0.5" whileHover={{ y: -1 }}>{t.shopLooks}</motion.a>
            {([t.new, t.sport, t.classic, t.brands] as const).map((label) => (
              <motion.a key={label} href="#" className="text-sm font-semibold uppercase tracking-wider text-black/70 hover:text-black transition-colors" whileHover={{ y: -1 }}>{label}</motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center gap-0.5 text-[11px] font-medium text-black/70">
              {(['uz', 'ru', 'en'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={cn("px-2.5 py-1 uppercase transition-colors hover:text-black", lang === l && "text-black font-semibold")}>{l}</button>
              ))}
            </div>
            <motion.button className="p-2 hover:bg-black/5 rounded-full transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Search size={20} /></motion.button>
            <motion.button className="p-2 hover:bg-black/5 rounded-full transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><User size={20} /></motion.button>
            <motion.button className="p-2 hover:bg-black/5 rounded-full transition-colors relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <div className="flex gap-0.5 text-[10px] font-medium">
              {(['uz', 'ru', 'en'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={cn("px-2 py-1 uppercase", lang === l && "font-bold text-black")}>{l}</button>
              ))}
            </div>
            <motion.button onClick={() => setIsOpen(!isOpen)} className="p-2" whileTap={{ scale: 0.9 }}>{isOpen ? <X size={24} /> : <Menu size={24} />}</motion.button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-b border-black/5 px-4 pt-2 pb-6 space-y-4 overflow-hidden">
          <a href="#shop-looks" className="block text-lg font-bold uppercase tracking-tight py-2 border-b border-black/10">{t.shopLooks}</a>
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

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
            <img
              src={LOGO_210_SRC}
              alt="210"
            className="h-24 md:h-32 w-auto object-contain mx-auto"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (t.nextElementSibling) return;
              const fallback = document.createElement('div');
              fallback.className = 'flex flex-col items-center';
              fallback.innerHTML = '<span class="text-5xl md:text-7xl font-black tracking-tighter text-black">210</span><span class="text-[10px] font-bold tracking-[0.2em] uppercase text-black/60 mt-1">SPORTS WEAR</span>';
              t.parentNode?.appendChild(fallback);
              t.style.display = 'none';
            }}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm md:text-base tracking-[0.2em] uppercase text-black/70 mb-14"
        >
          210 | Anba
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase text-black/50"
        >
          {HERO_BRANDS.map((brand) => (
            <span key={brand} className="hover:text-black/70 transition-colors">{brand}</span>
          ))}
        </motion.div>
        <motion.a
          href="#shop-looks"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-16 text-[11px] font-medium tracking-[0.2em] uppercase text-black/40 hover:text-black/70 transition-colors"
        >
          Shop looks
        </motion.a>
      </div>
    </section>
  );
};

const BrandMarquee = () => {
  return (
    <div className="py-8 bg-white border-y border-black/5 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <span key={i} className="mx-10 text-2xl md:text-4xl font-semibold uppercase text-black/10 hover:text-black/15 transition-colors cursor-default">
            {brand}
          </span>
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
        <motion.img
          src={look.image}
          alt={look.name[lang]}
          loading="lazy"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5 }}
        />
        <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold uppercase px-2 py-1 tracking-widest">
          {t.fullSet}
        </span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <motion.span
            className="bg-white text-black px-8 py-4 font-bold uppercase text-sm tracking-widest inline-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.viewLook}
          </motion.span>
        </div>
      </div>
      <h3 className="text-xl font-bold tracking-tight">{look.name[lang]}</h3>
      <p className="text-sm text-black/60 mt-1">{look.totalPrice}</p>
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
      exit={{ opacity: 0 }}
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

const TrustSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].trust;

  const items = [
    { label: t.authentic, key: 'authentic' },
    { label: t.globalSourcing, key: 'sourcing' },
    { label: t.handpicked, key: 'handpicked' }
  ];

  return (
    <section className="py-24 bg-neutral-50 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/50 mb-6">{t.title}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {items.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center md:text-left"
              >
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black/90">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

const NewLooksDropSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].newLooksDrop;
  const featuredLook = LOOKS[0];

  return (
    <section className="py-24 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <motion.img
                src={featuredLook.image}
                alt={featuredLook.name[lang]}
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
              <p className="text-lg text-black/70 mb-8 max-w-md">{t.desc}</p>
              <motion.a href="#shop-looks" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 font-bold uppercase tracking-widest" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {t.cta} <ArrowRight size={18} />
              </motion.a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

const ShowroomSection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].showroom;

  return (
    <section className="py-24 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/50 mb-4">{t.title}</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 flex items-center gap-3 text-black">
            <MapPin size={24} className="text-black/70" />
            {t.address}
          </h2>
          <div className="aspect-[21/9] max-h-[320px] w-full bg-neutral-100 overflow-hidden">
            <iframe
              title="Store location Tashkent"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.415268264807!2d69.279278!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef4d376395311%3A0x2f373e0e2b5c7b!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-black/60 mt-6 text-sm">{t.cta}</p>
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
              <li><a href="#shop-looks" className="hover:text-white transition-colors">{TRANSLATIONS[lang].nav.shopLooks}</a></li>
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

          <section id="shop-looks" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
            <SectionReveal>
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/50 mb-2 block">{t.looks.shopLooks}</span>
                <h2 className="text-5xl md:text-6xl font-black uppercase">{t.looks.shopLooks}</h2>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {LOOKS.map((look) => (
                <LookCard key={look.id} look={look} onSelect={() => setSelectedLook(look)} />
              ))}
            </div>
          </section>

          <TrustSection />
          <NewLooksDropSection />
          <AboutSection />
          <CategorySection />

          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-black/5">
            <SectionReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 mb-2 block">{t.products.curated}</span>
                  <h2 className="text-3xl md:text-4xl font-black uppercase text-black/90">{t.products.individualPieces}</h2>
                </div>
                <div className="flex gap-4">
                  <motion.button className="px-5 py-2 border border-black/20 font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors" whileTap={{ scale: 0.98 }}>{t.products.all}</motion.button>
                </div>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <motion.button className="text-sm font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors" whileTap={{ scale: 0.98 }}>
                {t.products.viewAll}
              </motion.button>
            </div>
          </section>

          <ShowroomSection />

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
