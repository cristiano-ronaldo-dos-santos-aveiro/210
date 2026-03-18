import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, Instagram, Facebook, Twitter, Globe } from 'lucide-react';
import { cn } from './lib/utils';

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
    curated: string;
    featured: string;
    all: string;
    viewAll: string;
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
      curated: "Кураторская коллекция",
      featured: "Избранные товары",
      all: "Все",
      viewAll: "Посмотреть все товары"
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
      curated: "Tanlangan to'plam",
      featured: "Saralangan mahsulotlar",
      all: "Hammasi",
      viewAll: "Barcha mahsulotlarni ko'rish"
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
  const [isOpen, setIsOpen] = React.useState(false);
  const { lang, setLang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].nav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <span className="text-4xl font-black tracking-tighter leading-none">210</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase -mt-1">Sports Wear</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-semibold uppercase tracking-wider hover:text-black/60 transition-colors">{t.new}</a>
            <a href="#" className="text-sm font-semibold uppercase tracking-wider hover:text-black/60 transition-colors">{t.sport}</a>
            <a href="#" className="text-sm font-semibold uppercase tracking-wider hover:text-black/60 transition-colors">{t.classic}</a>
            <a href="#" className="text-sm font-semibold uppercase tracking-wider hover:text-black/60 transition-colors">{t.brands}</a>
          </div>

          {/* Icons & Lang Switcher */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center bg-black/5 rounded-full p-1">
              <button 
                onClick={() => setLang('ru')}
                className={cn("px-3 py-1 text-[10px] font-bold rounded-full transition-all", lang === 'ru' ? "bg-black text-white" : "text-black/40")}
              >
                RU
              </button>
              <button 
                onClick={() => setLang('uz')}
                className={cn("px-3 py-1 text-[10px] font-bold rounded-full transition-all", lang === 'uz' ? "bg-black text-white" : "text-black/40")}
              >
                UZ
              </button>
            </div>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><Search size={20} /></button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><User size={20} /></button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setLang(lang === 'ru' ? 'uz' : 'ru')} className="p-2 bg-black/5 rounded-full">
              <Globe size={20} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-black/5 px-4 pt-2 pb-6 space-y-4"
        >
          <a href="#" className="block text-lg font-bold uppercase tracking-tight">{t.new}</a>
          <a href="#" className="block text-lg font-bold uppercase tracking-tight">{t.sport}</a>
          <a href="#" className="block text-lg font-bold uppercase tracking-tight">{t.classic}</a>
          <a href="#" className="block text-lg font-bold uppercase tracking-tight">{t.brands}</a>
          <div className="flex space-x-6 pt-4 border-t border-black/5">
            <Search size={20} />
            <User size={20} />
            <ShoppingBag size={20} />
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].hero;

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920" 
          alt="Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-7xl md:text-9xl font-black uppercase leading-[0.85] mb-6">
            {t.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{t.title2}</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/80 mb-8 max-w-lg">
            {t.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2">
              {t.btnSport} <ArrowRight size={18} />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              {t.btnClassic}
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Vertical Rail Text */}
      <div className="absolute right-8 bottom-24 hidden lg:block">
        <span className="writing-vertical-rl rotate-180 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
          {t.rail}
        </span>
      </div>
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

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name[lang]} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black text-white text-[10px] font-bold uppercase px-2 py-1 tracking-wider">
            {t.badge}
          </span>
        </div>
        <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-4 font-bold uppercase text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {t.add}
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">{product.brand}</p>
          <h3 className="text-lg font-bold leading-tight">{product.name[lang]}</h3>
        </div>
        <p className="font-bold">{product.price}</p>
      </div>
    </motion.div>
  );
};

const CategorySection = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].categories;

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[600px] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
            alt="Sport" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
            <h2 className="text-5xl font-black uppercase mb-4">{t.sportTitle}</h2>
            <p className="text-lg text-white/80 mb-6 max-w-sm">{t.sportDesc}</p>
            <button className="w-fit border-b-2 border-white pb-1 font-bold uppercase tracking-widest hover:text-white/70 hover:border-white/70 transition-all">
              {t.sportBtn}
            </button>
          </div>
        </div>
        <div className="relative h-[600px] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1000" 
            alt="Semi-Classic" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
            <h2 className="text-5xl font-black uppercase mb-4">{t.classicTitle}</h2>
            <p className="text-lg text-white/80 mb-6 max-w-sm">{t.classicDesc}</p>
            <button className="w-fit border-b-2 border-white pb-1 font-bold uppercase tracking-widest hover:text-white/70 hover:border-white/70 transition-all">
              {t.classicBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = React.useContext(LangContext);
  const t = TRANSLATIONS[lang].footer;

  return (
    <footer className="bg-black text-white pt-24 pb-12">
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
              <Instagram className="hover:text-white/60 cursor-pointer transition-colors" />
              <Facebook className="hover:text-white/60 cursor-pointer transition-colors" />
              <Twitter className="hover:text-white/60 cursor-pointer transition-colors" />
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
    </footer>
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
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 mb-2 block">{t.products.curated}</span>
                <h2 className="text-5xl md:text-6xl font-black uppercase">{t.products.featured}</h2>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 border border-black font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all">{t.products.all}</button>
                <button className="px-6 py-2 border border-black/10 font-bold uppercase text-xs tracking-widest hover:border-black transition-all">{t.nav.sport}</button>
                <button className="px-6 py-2 border border-black/10 font-bold uppercase text-xs tracking-widest hover:border-black transition-all">{t.nav.classic}</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-16 flex justify-center">
              <button className="group flex items-center gap-4 text-xl font-black uppercase tracking-tighter hover:gap-6 transition-all">
                {t.products.viewAll} <ArrowRight size={24} />
              </button>
            </div>
          </section>

          <CategorySection />

          <section className="py-24 bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="absolute -top-24 -right-24 text-[200px] font-black text-white/5 select-none pointer-events-none">
                210
              </div>
              <div className="max-w-2xl">
                <h2 className="text-6xl md:text-8xl font-black uppercase mb-8 leading-none">{t.newsletter.title}</h2>
                <p className="text-xl text-white/60 mb-12">{t.newsletter.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder={t.newsletter.placeholder}
                    className="bg-white/10 border border-white/20 px-6 py-4 flex-grow font-bold uppercase tracking-widest focus:outline-none focus:border-white transition-colors"
                  />
                  <button className="bg-white text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-white/90 transition-all">
                    {t.newsletter.btn}
                  </button>
                </div>
              </div>
            </div>
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
