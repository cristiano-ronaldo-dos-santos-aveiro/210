import type { Language } from './lang';

export type LegalSection = {
  title: string;
  points?: readonly string[];
  text?: string;
};

export type LegalDocChrome = {
  h1: string;
  lead: string;
  /** e.g. "Updated: {year}, 210 Sports Wear." — include {year} placeholder */
  updatedLine: string;
  backHome: string;
};

const PRIVACY_SECTIONS: Record<Language, readonly LegalSection[]> = {
  ru: [
    {
      title: '1. Какие данные мы можем получать',
      points: [
        'Техническая информация браузера (тип устройства, версия браузера, язык интерфейса).',
        'Анонимная статистика посещений (через стандартные аналитические инструменты).',
        'Информация, которую вы добровольно передаете нам при общении в социальных сетях или по телефону.'
      ]
    },
    {
      title: '2. Как мы используем информацию',
      points: [
        'Улучшение качества сервиса и удобства сайта.',
        'Ответы на ваши обращения в мессенджерах и соцсетях.',
        'Базовая аналитика (какие страницы интересны гостям).'
      ]
    },
    {
      title: '3. С кем мы делимся данными',
      text: 'Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, когда это требуется по закону или при использовании стандартных сервисов аналитики и хостинга.'
    },
    {
      title: '4. Социальные сети и мессенджеры',
      points: [
        'Instagram: [@210_direct](https://www.instagram.com/210_direct/)',
        'Telegram: [@Direct_210](https://t.me/Direct_210)'
      ],
      text: 'Политика конфиденциальности этих платформ регулируется их собственными правилами.'
    },
    {
      title: '5. Контакты',
      text: 'По вопросам конфиденциальности вы можете связаться с нами по телефону: +998 95 210-00-00.'
    }
  ],
  uz: [
    {
      title: '1. Qanday ma’lumotlarni olishimiz mumkin',
      points: [
        'Brauzerning texnik ma’lumotlari (qurilma turi, brauzer versiyasi, interfeys tili).',
        'Tashriflar bo‘yicha anonim statistika (standart tahlil vositalari orqali).',
        'Ijtimoiy tarmoqlar yoki telefon orqali muloqotda bizga ixtiyoriy yetkazgan ma’lumotlaringiz.'
      ]
    },
    {
      title: '2. Ma’lumotlardan qanday foydalanamiz',
      points: [
        'Sayt va servis sifatini yaxshilash.',
        'Messenjerlar va ijtimoiy tarmoqlardagi murojaatlaringizga javob berish.',
        'Asosiy tahlil (qaysi sahifalar mehmonlar uchun qiziqarli).'
      ]
    },
    {
      title: '3. Ma’lumotlarni kim bilan baham ko‘ramiz',
      text: 'Shaxsiy ma’lumotlaringizni uchinchi shaxslarga sotmaymiz va bermaymiz, bundan mustasno: qonun talab qilganda yoki standart tahlil va hosting xizmatlaridan foydalanganda.'
    },
    {
      title: '4. Ijtimoiy tarmoqlar va messenjerlar',
      points: [
        'Instagram: [@210_direct](https://www.instagram.com/210_direct/)',
        'Telegram: [@Direct_210](https://t.me/Direct_210)'
      ],
      text: 'Ushbu platformalarning maxfiylik siyosati ularning o‘z qoidalari bilan belgilanadi.'
    },
    {
      title: '5. Aloqa',
      text: 'Maxfiylik bo‘yicha savollar uchun telefon: +998 95 210-00-00.'
    }
  ],
  en: [
    {
      title: '1. Information we may collect',
      points: [
        'Technical browser information (device type, browser version, interface language).',
        'Anonymous visit statistics (via standard analytics tools).',
        'Information you voluntarily share when you contact us on social networks or by phone.'
      ]
    },
    {
      title: '2. How we use information',
      points: [
        'To improve service quality and site usability.',
        'To respond to your messages in messengers and social networks.',
        'Basic analytics (which pages visitors find useful).'
      ]
    },
    {
      title: '3. Sharing data with others',
      text: 'We do not sell or share your personal data with third parties, except where required by law or when using standard analytics and hosting services.'
    },
    {
      title: '4. Social networks and messengers',
      points: [
        'Instagram: [@210_direct](https://www.instagram.com/210_direct/)',
        'Telegram: [@Direct_210](https://t.me/Direct_210)'
      ],
      text: 'Privacy on those platforms is governed by their own policies.'
    },
    {
      title: '5. Contact',
      text: 'For privacy questions, call us at +998 95 210-00-00.'
    }
  ]
};

const PRIVACY_CHROME: Record<Language, LegalDocChrome> = {
  ru: {
    h1: 'Политика конфиденциальности',
    lead: 'Эта страница описывает, как 210 Sports Wear обращается с базовой информацией, связанной с нашим сайтом и онлайн-присутствием.',
    updatedLine: 'Обновлено: {year} год, 210 Sports Wear.',
    backHome: 'На главную'
  },
  uz: {
    h1: 'Maxfiylik siyosati',
    lead: 'Ushbu sahifada 210 Sports Wear veb-sayti va onlayn mavjudligi bilan bog‘liq asosiy ma’lumotlarni qanday boshqarishimiz tasvirlangan.',
    updatedLine: 'Yangilandi: {year}, 210 Sports Wear.',
    backHome: 'Bosh sahifaga'
  },
  en: {
    h1: 'Privacy Policy',
    lead: 'This page describes how 210 Sports Wear handles basic information related to this website and our online presence.',
    updatedLine: 'Updated: {year}, 210 Sports Wear.',
    backHome: 'Back to home'
  }
};

const TERMS_SECTIONS: Record<Language, readonly LegalSection[]> = {
  ru: [
    {
      title: '1. Назначение сайта',
      text: 'Сайт предназначен для ознакомления с брендом 210 Sports Wear, нашими коллекциями и контактами для связи.'
    },
    {
      title: '2. Отсутствие онлайн-заказа',
      text: 'На данный момент оформление онлайн-заказа через сайт не предусмотрено. Для покупки и консультации свяжитесь с нами по телефону, в Instagram или Telegram.'
    },
    {
      title: '3. Актуальность информации',
      text: 'Мы стараемся поддерживать информацию (ассортимент, контакты, режим работы) в актуальном состоянии, но отдельные данные могут обновляться.'
    },
    {
      title: '4. Ответственность',
      text: '210 Sports Wear не несет ответственности за временную недоступность сайта, а также за работу сторонних сервисов (соцсети, мессенджеры, карты и внешние ссылки).'
    },
    {
      title: '5. Авторские права',
      text: 'Материалы сайта (тексты, логотип, элементы дизайна и изображения) принадлежат 210 Sports Wear и не могут использоваться в коммерческих целях без согласия.'
    },
    {
      title: '6. Обратная связь',
      text: 'Если у вас есть вопросы по условиям использования, свяжитесь с нами по телефону +998 95 210-00-00 или через официальные страницы в социальных сетях.'
    }
  ],
  uz: [
    {
      title: '1. Saytning maqsadi',
      text: 'Sayt 210 Sports Wear brendi, kolleksiyalarimiz va aloqa uchun kontaktlar bilan tanishish uchun mo‘ljallangan.'
    },
    {
      title: '2. Onlayn buyurtma',
      text: 'Hozircha sayt orqali onlayn buyurtma qabul qilinmaydi. Xarid va maslahat uchun telefon, Instagram yoki Telegram orqali bog‘laning.'
    },
    {
      title: '3. Ma’lumotlar dolzarbligi',
      text: 'Assortiment, kontaktlar va ish vaqti kabi ma’lumotlarni dolzarb saqlashga harakat qilamiz, ammo alohida ma’lumotlar yangilanishi mumkin.'
    },
    {
      title: '4. Mas’uliyat',
      text: '210 Sports Wear saytning vaqtincha ishlamasligi, shuningdek uchinchi tomon xizmatlari (ijtimoiy tarmoqlar, messenjerlar, xaritalar va tashqi havolalar) ishi uchun javobgar emas.'
    },
    {
      title: '5. Mualliflik huquqi',
      text: 'Sayt materiallari (matnlar, logotip, dizayn elementlari va rasmlar) 210 Sports Wear ga tegishli va roziliksiz tijorat maqsadida ishlatilmasligi kerak.'
    },
    {
      title: '6. Aloqa',
      text: 'Foydalanish shartlari bo‘yicha savollar uchun +998 95 210-00-00 raqamiga qo‘ng‘iroq qiling yoki ijtimoiy tarmoqlardagi rasmiy sahifalarimiz orqali yozing.'
    }
  ],
  en: [
    {
      title: '1. Purpose of the site',
      text: 'This site is for learning about the 210 Sports Wear brand, our collections, and how to contact us.'
    },
    {
      title: '2. No online checkout',
      text: 'Online ordering through the site is not available at this time. For purchases and advice, contact us by phone, Instagram, or Telegram.'
    },
    {
      title: '3. Accuracy of information',
      text: 'We aim to keep information (assortment, contacts, opening hours) up to date, but some details may change.'
    },
    {
      title: '4. Liability',
      text: '210 Sports Wear is not responsible for temporary site unavailability or for third-party services (social networks, messengers, maps, and external links).'
    },
    {
      title: '5. Copyright',
      text: 'Site materials (text, logo, design elements, and images) belong to 210 Sports Wear and may not be used commercially without permission.'
    },
    {
      title: '6. Contact',
      text: 'If you have questions about these terms, call +998 95 210-00-00 or reach us through our official social pages.'
    }
  ]
};

const TERMS_CHROME: Record<Language, LegalDocChrome> = {
  ru: {
    h1: 'Пользовательские условия',
    lead: 'Эта страница описывает базовые условия использования сайта 210 Sports Wear и получения информации о наших продуктах и сервисе.',
    updatedLine: 'Обновлено: {year} год, 210 Sports Wear.',
    backHome: 'На главную'
  },
  uz: {
    h1: 'Foydalanish shartlari',
    lead: 'Ushbu sahifada 210 Sports Wear veb-saytidan foydalanish va mahsulotlarimiz hamda servisimiz haqida ma’lumot olishning asosiy shartlari berilgan.',
    updatedLine: 'Yangilandi: {year}, 210 Sports Wear.',
    backHome: 'Bosh sahifaga'
  },
  en: {
    h1: 'Terms of Use',
    lead: 'This page describes basic terms for using the 210 Sports Wear website and learning about our products and service.',
    updatedLine: 'Updated: {year}, 210 Sports Wear.',
    backHome: 'Back to home'
  }
};

export function getPrivacyCopy(lang: Language) {
  return { sections: PRIVACY_SECTIONS[lang], chrome: PRIVACY_CHROME[lang] };
}

export function getTermsCopy(lang: Language) {
  return { sections: TERMS_SECTIONS[lang], chrome: TERMS_CHROME[lang] };
}
