export type Locale = 'fr' | 'ar'

export const locales: Locale[] = ['fr', 'ar']
export const defaultLocale: Locale = 'fr'

export const ui = {
  fr: {
    nav: {
      home: 'Accueil',
      association: "L'association",
      activities: 'Activités',
      rescue: 'Secours',
      gallery: 'Galerie',
      contact: 'Contact',
    },
    footer: {
      tagline: "Association de Spéléologie et d'Escalade de Zaghouan",
      quickLinks: 'Liens rapides',
      contactTitle: 'Contact',
      followUs: 'Suivez-nous',
      rights: 'Tous droits réservés.',
    },
    common: {
      switchLanguage: 'العربية',
      menu: 'Menu',
      closeMenu: 'Fermer',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      association: 'الجمعية',
      activities: 'الأنشطة',
      rescue: 'الإغاثة',
      gallery: 'معرض الصور',
      contact: 'اتصل بنا',
    },
    footer: {
      tagline: 'جمعية الاستغوار والتسلق بزغوان',
      quickLinks: 'روابط سريعة',
      contactTitle: 'اتصل بنا',
      followUs: 'تابعونا',
      rights: 'جميع الحقوق محفوظة.',
    },
    common: {
      switchLanguage: 'Français',
      menu: 'القائمة',
      closeMenu: 'إغلاق',
    },
  },
} as const

export function getUI(locale: Locale) {
  return ui[locale]
}

export function isRTL(locale: Locale) {
  return locale === 'ar'
}