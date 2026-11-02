import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OPERATOR_LIST } from '../data/operators';
import { BANGLADESH_DIVISIONS } from '../data/bangladeshGeo';
import {
  Smartphone,
  MapPin,
  Lock,
  Layers,
  Code2,
} from 'lucide-react';

export const AboutTelecom: React.FC = () => {
  const { t, isBangla } = useLanguage();

  const totalDistricts = BANGLADESH_DIVISIONS.reduce(
    (acc, div) => acc + div.districts.length,
    0
  );
  const totalUpazilas = BANGLADESH_DIVISIONS.reduce(
    (acc, div) =>
      acc +
      div.districts.reduce((dAcc, dist) => dAcc + dist.upazilas.length, 0),
    0
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('aboutTitle')}
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {t('aboutSubtitle')}
        </p>
      </div>

      {/* Telecom Prefixes Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t('telecomHeading')}
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t('telecomDesc')}
        </p>

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
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  {isBangla ? 'অপারেটর প্রিফিক্স কোড' : 'Dialing Prefixes'}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {op.prefixes.map((pref) => (
                    <span
                      key={pref}
                      className="px-2 py-0.5 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
                    >
                      {pref} (e.g. +88{pref}XXXXXXX)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purpose & In-Memory Privacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('aboutPurposeHeading')}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('aboutPurposeText')}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('privacyHeading')}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('privacyText')}
          </p>
        </div>
      </div>
    </div>
  );
};
