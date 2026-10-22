import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  STANDARD_TRANSLATIONS,
  translateToAr,
  hasArabic,
  hasLatinWords,
} from './translationsData';

export interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (keyOrText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Keep WeakMaps to store original text so we can cleanly revert when switching to 'en'
const originalTextMap = new WeakMap<Node, string>();
const originalPlaceholderMap = new WeakMap<Element, string>();
const originalTitleMap = new WeakMap<Element, string>();

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('adsdi_lang');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('adsdi_lang', language);
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [language, direction]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (keyOrText: string): string => {
    if (!keyOrText) return '';
    if (STANDARD_TRANSLATIONS[keyOrText] && STANDARD_TRANSLATIONS[keyOrText][language]) {
      return STANDARD_TRANSLATIONS[keyOrText][language];
    }
    if (language === 'ar') {
      return translateToAr(keyOrText);
    }
    return keyOrText;
  };

  // Automated DOM translation engine for complete website Arabic localization
  useEffect(() => {
    let isTranslating = false;

    const shouldSkipNode = (node: Node): boolean => {
      const parent = node.parentElement;
      if (!parent) return false;
      const tagName = parent.tagName;
      if (
        tagName === 'SCRIPT' ||
        tagName === 'STYLE' ||
        tagName === 'CODE' ||
        tagName === 'PRE'
      ) {
        return true;
      }
      if (
        parent.closest('.leaflet-tile-container') ||
        parent.closest('.leaflet-control') ||
        parent.closest('.no-translate')
      ) {
        return true;
      }
      return false;
    };

    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (shouldSkipNode(node)) return;
        const currentVal = node.nodeValue || '';
        if (!currentVal.trim()) return;

        if (language === 'ar') {
          // If already Arabic and has no untranslated Latin words, skip
          if (!hasLatinWords(currentVal) && hasArabic(currentVal)) return;

          // If currentVal contains Latin words and no Arabic, it is newly rendered English text from React
          if (hasLatinWords(currentVal) && !hasArabic(currentVal)) {
            originalTextMap.set(node, currentVal);
          } else if (!originalTextMap.has(node)) {
            originalTextMap.set(node, currentVal);
          }

          const original = originalTextMap.get(node) || currentVal;
          const translated = translateToAr(original);
          if (translated !== currentVal) {
            node.nodeValue = translated;
          }
        } else {
          // Revert to English
          if (originalTextMap.has(node)) {
            const original = originalTextMap.get(node)!;
            if (node.nodeValue !== original) {
              node.nodeValue = original;
            }
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        // Translate placeholders
        if (el.hasAttribute('placeholder')) {
          const currentPh = el.getAttribute('placeholder') || '';
          if (language === 'ar') {
            if (hasLatinWords(currentPh) && !hasArabic(currentPh)) {
              originalPlaceholderMap.set(el, currentPh);
            } else if (!originalPlaceholderMap.has(el)) {
              originalPlaceholderMap.set(el, currentPh);
            }
            const orig = originalPlaceholderMap.get(el) || currentPh;
            const trans = translateToAr(orig);
            if (trans !== currentPh) {
              el.setAttribute('placeholder', trans);
            }
          } else if (originalPlaceholderMap.has(el)) {
            el.setAttribute('placeholder', originalPlaceholderMap.get(el)!);
          }
        }

        // Translate titles / tooltips
        if (el.hasAttribute('title')) {
          const currentTitle = el.getAttribute('title') || '';
          if (language === 'ar') {
            if (hasLatinWords(currentTitle) && !hasArabic(currentTitle)) {
              originalTitleMap.set(el, currentTitle);
            } else if (!originalTitleMap.has(el)) {
              originalTitleMap.set(el, currentTitle);
            }
            const orig = originalTitleMap.get(el) || currentTitle;
            const trans = translateToAr(orig);
            if (trans !== currentTitle) {
              el.setAttribute('title', trans);
            }
          } else if (originalTitleMap.has(el)) {
            el.setAttribute('title', originalTitleMap.get(el)!);
          }
        }

        // Traverse children
        node.childNodes.forEach(translateNode);
      }
    };

    const processRoot = () => {
      if (isTranslating) return;
      isTranslating = true;
      try {
        const root = document.getElementById('root') || document.body;
        translateNode(root);
      } finally {
        isTranslating = false;
      }
    };

    // Initial pass
    processRoot();

    // Observer for dynamically added nodes / route transitions
    let animationFrameId: number | null = null;
    const observer = new MutationObserver(() => {
      if (isTranslating) return;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        processRoot();
        animationFrameId = null;
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'title'],
    });

    // Periodic sweep ensuring dynamically rendered tabs and async components are translated in Arabic mode
    const intervalId = setInterval(() => {
      if (language === 'ar') {
        processRoot();
      }
    }, 500);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
