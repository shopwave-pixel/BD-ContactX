import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { isBangla } = useLanguage();

  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 py-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <span>© {new Date().getFullYear()} {isBangla ? 'বিডি কনট্যাক্টএক্স' : 'BD ContactX'}</span>
      </div>
    </footer>
  );
};
