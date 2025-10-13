import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    home: 'Home',
    contact: 'Contact',
    profile: 'Profile',
    premium: 'Premium',
    settings: 'Settings',
    all: 'All',
    motivation: 'Motivation',
    goodmorning: 'Good Morning',
    goodnight: 'Good Night',
    health: 'Health',
    god: 'Divine',
    day_special: 'Day Special',
    birthday: 'Birthday',
    new: 'New',
    anniversary: 'Anniversary',
    politics: 'Politics',
    categories: 'Categories'
  },
  hi: {
    home: 'होम',
    contact: 'संपर्क',
    profile: 'प्रोफ़ाइल',
    premium: 'प्रीमियम',
    settings: 'सेटिंग्स',
    all: 'सभी',
    motivation: 'प्रेरणा',
    goodmorning: 'सुप्रभात',
    goodnight: 'शुभ रात्रि',
    health: 'स्वास्थ्य',
    god: 'भगवान',
    day_special: 'दिन विशेष',
    birthday: 'जन्मदिन',
    new: 'नया',
    anniversary: 'सालगिरह',
    politics: 'राजनीति',
    categories: 'श्रेणियाँ'
  },
  kn: {
    home: 'ಮನೆ',
    contact: 'ಸಂಪರ್ಕ',
    profile: 'ಪ್ರೊಫೈಲ್',
    premium: 'ಪ್ರೀಮಿಯಂ',
    settings: 'ಸಂಯೋಜನೆಗಳು',
    all: 'ಎಲ್ಲಾ',
    motivation: 'ಪ್ರೇರಣೆ',
    goodmorning: 'ಶುಭೋದಯ',
    goodnight: 'ಶುಭ ರಾತ್ರಿ',
    health: 'ಆರೋಗ್ಯ',
    god: 'ದೇವರು',
    day_special: 'ದಿನ ವಿಶೇಷ',
    birthday: 'ಹುಟ್ಟುಹಬ್ಬ',
    new: 'ಹೊಸದು',
    anniversary: 'ವಾರ್ಷಿಕೋತ್ಸವ',
    politics: 'ರಾಜಕೀಯ',
    categories: 'ವರ್ಗಗಳು'
  },
  ta: {
    home: 'முகப்பு',
    contact: 'தொடர்பு',
    profile: 'சுயவிவரம்',
    premium: 'பிரீமியம்',
    settings: 'அமைப்புகள்',
    all: 'அனைத்தும்',
    motivation: 'உந்துதல்',
    goodmorning: 'காலை வணக்கம்',
    goodnight: 'இரவு வணக்கம்',
    health: 'ஆரோக்கியம்',
    god: 'கடவுள்',
    day_special: 'நாள் சிறப்பு',
    birthday: 'பிறந்தநாள்',
    new: 'புதிய',
    anniversary: 'ஆண்டுவிழா',
    politics: 'அரசியல்',
    categories: 'வகைகள்'
  },
  te: {
    home: 'హోమ్',
    contact: 'సంప్రదించండి',
    profile: 'ప్రొఫైల్',
    premium: 'ప్రీమియం',
    settings: 'సెట్టింగ్‌లు',
    all: 'అన్నీ',
    motivation: 'ప్రేరణ',
    goodmorning: 'శుభోదయం',
    goodnight: 'శుభ రాత్రి',
    health: 'ఆరోగ్యం',
    god: 'దేవుడు',
    day_special: 'రోజు ప్రత్యేకం',
    birthday: 'పుట్టినరోజు',
    new: 'కొత్త',
    anniversary: 'వార్షికోత్సవం',
    politics: 'రాజకీయాలు',
    categories: 'వర్గాలు'
  },
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('inspireme_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('inspireme_language', langCode);
  };
  
  const t = useCallback((key) => {
    return translations[currentLanguage][key] || key;
  }, [currentLanguage]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  ];

  const value = {
    currentLanguage,
    changeLanguage,
    languages,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};