import type { Language } from './lang';
import type { AppRoute } from './route.ts';

/** Page titles + meta descriptions by route and UI language */
export function getSiteMeta(route: AppRoute, lang: Language): { title: string; description: string } {
  const home: Record<Language, { title: string; description: string }> = {
    uz: {
      title: '210 Sports Wear | Premium erkaklar kiyimi',
      description:
        '210 va Anba: premium soatlar, kiyim, poyabzal va parfyumeriya. Nurafshon, Gulzor va Nukus filiallari. Rasmiy brendlar va yuqori servis.'
    },
    ru: {
      title: '210 Sports Wear | Премиальная мужская одежда',
      description:
        '210 и Anba: премиальные часы, одежда, обувь и парфюмерия. Филиалы в Нурафшоне, Гульзоре и Нукусе. Оригинальные бренды и сервис.'
    },
    en: {
      title: '210 Sports Wear | Premium menswear',
      description:
        '210 and Anba: premium watches, clothing, footwear, and fragrance. Branches in Nurafshon, Gulzor, and Nukus. Authentic brands and service.'
    }
  };

  const privacy: Record<Language, { title: string; description: string }> = {
    uz: {
      title: 'Maxfiylik siyosati | 210 Sports Wear',
      description: '210 Sports Wear veb-sayti va onlayn mavjudligi bilan bog‘liq asosiy ma’lumotlarni qanday boshqarishimiz haqida.'
    },
    ru: {
      title: 'Политика конфиденциальности | 210 Sports Wear',
      description: 'Как 210 Sports Wear обрабатывает базовую информацию, связанную с сайтом и онлайн-присутствием.'
    },
    en: {
      title: 'Privacy Policy | 210 Sports Wear',
      description: 'How 210 Sports Wear handles basic information related to this website and our online presence.'
    }
  };

  const terms: Record<Language, { title: string; description: string }> = {
    uz: {
      title: 'Foydalanish shartlari | 210 Sports Wear',
      description: '210 Sports Wear veb-saytidan foydalanish va mahsulotlarimiz haqida ma’lumot olishning asosiy shartlari.'
    },
    ru: {
      title: 'Пользовательские условия | 210 Sports Wear',
      description: 'Базовые условия использования сайта 210 Sports Wear и получения информации о продуктах и сервисе.'
    },
    en: {
      title: 'Terms of Use | 210 Sports Wear',
      description: 'Basic terms for using the 210 Sports Wear website and learning about our products and service.'
    }
  };

  const aurora: Record<Language, { title: string; description: string }> = {
    uz: { title: '210 | Aurora', description: '210 Sports Wear — Aurora fon namoyishi.' },
    ru: { title: '210 | Aurora', description: '210 Sports Wear — демонстрация фона Aurora.' },
    en: { title: '210 | Aurora', description: '210 Sports Wear — Aurora background preview.' }
  };

  switch (route) {
    case 'privacy':
      return privacy[lang];
    case 'terms':
      return terms[lang];
    case 'aurora':
      return aurora[lang];
    default:
      return home[lang];
  }
}
