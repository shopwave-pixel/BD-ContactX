import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, isBangla } = useLanguage();

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isBangla ? 'বিডি কনট্যাক্টএক্স' : 'BD ContactX'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t('footerRights')}</span>
          </div>

          <div className="flex items-center gap-1.5 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('privacyHeading')}</span>
          </div>
        </div>

        <div className="mt-4 text-center text-[11px] text-slate-400 dark:text-slate-500">
          {t('footerTagline')}
        </div>
      </div>
    </footer>
  );
};
