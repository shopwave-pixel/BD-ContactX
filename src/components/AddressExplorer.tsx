import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BANGLADESH_DIVISIONS } from '../data/bangladeshGeo';
import { DivisionInfo, DistrictInfo, UpazilaInfo } from '../types';
import { copyToClipboard } from '../utils/generator';
import {
  MapPin,
  Search,
  Building2,
  Mail,
  Copy,
  Check,
  ChevronRight,
  X,
} from 'lucide-react';

interface AddressExplorerProps {
  onShowToast: (message: string) => void;
  onSelectLocationForGenerator?: (division: string, district: string, upazila: string) => void;
}

export const AddressExplorer: React.FC<AddressExplorerProps> = ({
  onShowToast,
  onSelectLocationForGenerator,
}) => {
  const { t, isBangla } = useLanguage();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDivisionName, setSelectedDivisionName] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Search logic across all divisions, districts, upazilas, and postal codes
  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return BANGLADESH_DIVISIONS.filter((div) => {
      if (selectedDivisionName !== 'all' && div.name !== selectedDivisionName) {
        return false;
      }

      if (!query) return true;

      // check division match
      if (
        div.name.toLowerCase().includes(query) ||
        div.nameBn.toLowerCase().includes(query)
      ) {
        return true;
      }

      // check if any district or upazila or postal code matches
      return div.districts.some((district) => {
        if (
          district.name.toLowerCase().includes(query) ||
          district.nameBn.toLowerCase().includes(query)
        ) {
          return true;
        }

        return district.upazilas.some((up) => {
          if (
            up.name.toLowerCase().includes(query) ||
            up.nameBn.toLowerCase().includes(query)
          ) {
            return true;
          }

          return up.postOffices.some(
            (p) =>
              p.postCode.includes(query) ||
              p.postOffice.toLowerCase().includes(query) ||
              p.postOfficeBn.toLowerCase().includes(query)
          );
        });
      });
    }).map((div) => {
      // If there is a search query, filter the nested districts/upazilas
      if (!query) return div;

      const filteredDistricts = div.districts
        .map((dist) => {
          const distMatches =
            dist.name.toLowerCase().includes(query) ||
            dist.nameBn.toLowerCase().includes(query);

          const filteredUpazilas = dist.upazilas.filter((up) => {
            const upMatches =
              up.name.toLowerCase().includes(query) ||
              up.nameBn.toLowerCase().includes(query);

            const postMatches = up.postOffices.some(
              (p) =>
                p.postCode.includes(query) ||
                p.postOffice.toLowerCase().includes(query) ||
                p.postOfficeBn.toLowerCase().includes(query)
            );

            return distMatches || upMatches || postMatches;
          });

          if (distMatches || filteredUpazilas.length > 0) {
            return {
              ...dist,
              upazilas: distMatches ? dist.upazilas : filteredUpazilas,
            };
          }
          return null;
        })
        .filter(Boolean) as DistrictInfo[];

      return {
        ...div,
        districts: filteredDistricts,
      };
    });
  }, [searchQuery, selectedDivisionName]);

  const handleCopy = async (code: string, label: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedCode(code);
      onShowToast(isBangla ? 'সফলভাবে কপি হয়েছে' : 'Copied successfully');
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Explorer Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('explorerTitle')}</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('explorerSubtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Division Selector Tabs */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 scrollbar-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <button
            type="button"
            onClick={() => setSelectedDivisionName('all')}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedDivisionName === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isBangla ? 'সকল বিভাগ (৮)' : 'All Divisions (8)'}
          </button>
          {BANGLADESH_DIVISIONS.map((div) => {
            const isSelected = selectedDivisionName === div.name;
            return (
              <button
                key={div.name}
                type="button"
                onClick={() => setSelectedDivisionName(div.name)}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isBangla ? div.nameBn : div.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hierarchy Cards Listing */}
      {filteredData.length > 0 ? (
        <div className="space-y-6">
          {filteredData.map((division) => (
            <div
              key={division.name}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              {/* Division Bar */}
              <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isBangla ? division.nameBn : division.name} {t('division')}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    ({isBangla ? division.name : division.nameBn})
                  </span>
                </div>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  {division.districts.length} {isBangla ? 'টি জেলা তালিকাভুক্ত' : 'Districts listed'}
                </span>
              </div>

              {/* Districts Container */}
              <div className="p-6 divide-y divide-slate-100 dark:divide-slate-800 space-y-6">
                {division.districts.map((district) => (
                  <div key={district.name} className="pt-6 first:pt-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {isBangla ? district.nameBn : district.name} {t('district')}
                        </h4>
                        <span className="text-xs text-slate-400">
                          ({district.upazilas.length} {t('upazila')})
                        </span>
                      </div>
                    </div>

                    {/* Upazilas Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {district.upazilas.map((upazila) => {
                        const primaryPost = upazila.postOffices[0];
                        return (
                          <div
                            key={upazila.name}
                            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-3 hover:border-emerald-500/50 transition-colors"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                  {isBangla ? upazila.nameBn : upazila.name}
                                </span>
                                {primaryPost && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopy(primaryPost.postCode, `${primaryPost.postOffice} Post Code`)
                                    }
                                    className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 hover:border-emerald-500 cursor-pointer"
                                    title={t('postCode')}
                                  >
                                    <Mail className="w-3 h-3" />
                                    <span>{primaryPost.postCode}</span>
                                    {copiedCode === primaryPost.postCode ? (
                                      <Check className="w-3 h-3 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3 h-3 text-slate-400" />
                                    )}
                                  </button>
                                )}
                              </div>

                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                {isBangla ? upazila.name : upazila.nameBn}
                              </p>

                              {/* Sample Unions */}
                              {upazila.unions.length > 0 && (
                                <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                                  <span className="font-semibold text-slate-500 dark:text-slate-500">
                                    {t('union')}:{' '}
                                  </span>
                                  {upazila.unions
                                    .map((u) => (isBangla ? u.bn : u.en))
                                    .slice(0, 3)
                                    .join(', ')}
                                </div>
                              )}
                            </div>

                            {/* Quick Generate Link */}
                            {onSelectLocationForGenerator && (
                              <button
                                type="button"
                                onClick={() =>
                                  onSelectLocationForGenerator(
                                    division.name,
                                    district.name,
                                    upazila.name
                                  )
                                }
                                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg border border-dashed border-emerald-300 dark:border-emerald-800 transition-colors cursor-pointer"
                              >
                                <span>{t('quickGenerateFromArea')}</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('emptySearchTitle')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {t('emptySearchDesc')}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedDivisionName('all');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {t('reset')}
          </button>
        </div>
      )}
    </div>
  );
};
