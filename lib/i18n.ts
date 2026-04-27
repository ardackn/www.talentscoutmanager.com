// Simple i18n - English default, expandable to next-intl
export const translations = {
  en: {
    // Navigation
    'nav.athlete': 'Athlete',
    'nav.scout': 'Scout',
    'nav.yetenek': '(Yetenek)',
    'nav.yetenek-avcisi': '(Yetenek Avcısı)',
    
    // Positions (English first)
    'position.goalkeeper': 'Goalkeeper',
    'position.defender': 'Defender',
    'position.right-back': 'Right Back',
    'position.left-back': 'Left Back',
    'position.defensive-midfielder': 'Defensive Midfielder',
    'position.central-midfielder': 'Central Midfielder',
    'position.attacking-midfielder': 'Attacking Midfielder',
    'position.right-winger': 'Right Winger',
    'position.left-winger': 'Left Winger',
    'position.striker': 'Striker',

    // Common UI
    'search.placeholder': 'Search athletes by name...',
    'contact.button': 'Contact Player',
    'contact.title': 'Send Message to Admin',
    'contact.placeholder': 'Your message to the administrator...',
    'contact.sent': 'Message sent to admin!',
    'current.team.amateur': 'Amateur',
    
    // Stats labels
    'stats.speed': 'Speed',
    'stats.skill': 'Skill',
    'stats.jumping': 'Jumping',
    'stats.agility': 'Agility',
    'stats.stamina': 'Stamina',
    
    // Status
    'loading': 'Loading...',
    'no.results': 'No athletes found',
  },
  // Future languages
  // tr: { ... }
} as const;

export type Language = keyof typeof translations;
export const defaultLang: Language = 'en';

export function t(key: keyof typeof translations['en'], lang: Language = defaultLang): string {
  return translations[lang]?.[key] ?? key;
}

// Localized position
export function getPositionLabel(position: string, lang: Language = defaultLang): string {
  const key = `position.${position.toLowerCase().replace(/\s+/g, '-')}` as keyof typeof translations['en'];
  return t(key, lang);
}
