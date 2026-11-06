import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OPERATOR_LIST } from '../data/operators';
import { BANGLADESH_DIVISIONS } from '../data/bangladeshGeo';
import { Smartphone, MapPin } from 'lucide-react';

export const AboutTelecom: React.FC = () => {
  const { t, isBangla } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Telecom Prefixes */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {t('telecomHeading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OPERATOR_LIST.map((op) => (
            <div
              key={op.code}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {isBangla ? op.nameBn : op.name}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold ${op.badgeBg} ${op.badgeText}`}
                >
                  {op.code}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {op.prefixes.map((pref) => (
                  <span
                    key={pref}
                    className="px-2 py-0.5 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
                  >
                    {pref} (+88{pref})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Administrative Hierarchy Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {t('geoHeading')}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BANGLADESH_DIVISIONS.map((div) => (
            <div
              key={div.name}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-center"
            >
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {isBangla ? div.nameBn : div.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {div.districts.length} {isBangla ? 'জেলা' : 'Districts'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
