import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import mr from './locales/mr.json';
import gu from './locales/gu.json';
import ml from './locales/ml.json';
import kn from './locales/kn.json';
import pa from './locales/pa.json';
import or from './locales/or.json';
import as from './locales/as.json';
import ur from './locales/ur.json';

const resources = {
  en: { translation: (en as any).default || en },
  hi: { translation: (hi as any).default || hi },
  bn: { translation: (bn as any).default || bn },
  ta: { translation: (ta as any).default || ta },
  te: { translation: (te as any).default || te },
  mr: { translation: (mr as any).default || mr },
  gu: { translation: (gu as any).default || gu },
  ml: { translation: (ml as any).default || ml },
  kn: { translation: (kn as any).default || kn },
  pa: { translation: (pa as any).default || pa },
  or: { translation: (or as any).default || or },
  as: { translation: (as as any).default || as },
  ur: { translation: (ur as any).default || ur },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: typeof window !== 'undefined' ? localStorage.getItem("language") || 'en' : 'en',
    interpolation: { escapeValue: false },
    ns: ['translation'],
    defaultNS: 'translation',
    react: {
      useSuspense: false,
    },
  });

export default i18n;
