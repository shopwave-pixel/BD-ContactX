import React, { useState, useMemo } from 'react';
import { Contact, GenderSelection, OperatorCode } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BANGLADESH_DIVISIONS } from '../data/bangladeshGeo';
import { OPERATOR_LIST } from '../data/operators';
import { generateSingleContact } from '../utils/generator';
import { ContactCard } from './ContactCard';
import { UserPlus, SlidersHorizontal, RotateCcw, MapPin } from 'lucide-react';

interface SingleGeneratorProps {
  onShowToast: (message: string) => void;
  initialContact?: Contact | null;
}

export const SingleGenerator: React.FC<SingleGeneratorProps> = ({
  onShowToast,
  initialContact,
}) => {
  const { t, isBangla } = useLanguage();

  // Generator Filters
  const [gender, setGender] = useState<GenderSelection>('random');
  const [operator, setOperator] = useState<OperatorCode | 'random'>('random');
  const [selectedDivision, setSelectedDivision] = useState<string>('random');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('random');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('random');
  const [nameScript, setNameScript] = useState<'en' | 'bn'>('en');

  // Currently generated contact
  const [currentContact, setCurrentContact] = useState<Contact | null>(() => {
    return initialContact || generateSingleContact();
  });

  // Dependent dropdowns calculations
  const availableDistricts = useMemo(() => {
    if (selectedDivision === 'random') return [];
    const div = BANGLADESH_DIVISIONS.find((d) => d.name === selectedDivision);
    return div ? div.districts : [];
  }, [selectedDivision]);

  const availableUpazilas = useMemo(() => {
    if (selectedDistrict === 'random') return [];
    const dist = availableDistricts.find((d) => d.name === selectedDistrict);
    return dist ? dist.upazilas : [];
  }, [availableDistricts, selectedDistrict]);

  const handleDivisionChange = (divName: string) => {
    setSelectedDivision(divName);
    setSelectedDistrict('random');
    setSelectedUpazila('random');
  };

  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    setSelectedUpazila('random');
  };

  const handleGenerate = () => {
    const contact = generateSingleContact({
      gender,
      operator,
      division: selectedDivision,
      district: selectedDistrict,
      upazila: selectedUpazila,
      nameScript,
    });
    setCurrentContact(contact);
  };

  const handleResetFilters = () => {
    setGender('random');
    setOperator('random');
    setSelectedDivision('random');
    setSelectedDistrict('random');
    setSelectedUpazila('random');
    setNameScript('en');
    onShowToast(t('reset'));
  };

  return (
    <div className="space-y-6">
      {/* Utility Dashboard Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isBangla ? 'বিডি কনট্যাক্টএক্স' : 'BD ContactX'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            {t('appDescription')}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t('generateContact')}</span>
          </button>

          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('reset')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Filters on Left, Result Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Configuration Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('filter')}</span>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 font-medium"
            >
              {t('reset')}
            </button>
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('genderLabel')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setGender('random')}
                className={`min-h-[40px] py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  gender === 'random'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {t('genderAny')}
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`min-h-[40px] py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  gender === 'male'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {t('genderMale')}
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`min-h-[40px] py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  gender === 'female'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {t('genderFemale')}
              </button>
            </div>
          </div>

          {/* Operator Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('operatorLabel')}
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value as OperatorCode | 'random')}
              className="w-full min-h-[42px] px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="random">{t('operatorAny')}</option>
              {OPERATOR_LIST.map((op) => (
                <option key={op.code} value={op.code}>
                  {isBangla ? op.nameBn : op.name} ({op.prefixes.join(', ')})
                </option>
              ))}
            </select>
          </div>

          {/* Geographic Hierarchy: Division */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>{t('divisionLabel')}</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-normal">
                {BANGLADESH_DIVISIONS.length} {t('divisionsCount')}
              </span>
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className="w-full min-h-[42px] px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="random">{t('divisionAny')}</option>
              {BANGLADESH_DIVISIONS.map((div) => (
                <option key={div.name} value={div.name}>
                  {isBangla ? div.nameBn : div.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown (Dependent) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('districtLabel')}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              disabled={selectedDivision === 'random' || availableDistricts.length === 0}
              className="w-full min-h-[42px] px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="random">{t('districtAny')}</option>
              {availableDistricts.map((dist) => (
                <option key={dist.name} value={dist.name}>
                  {isBangla ? dist.nameBn : dist.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Dropdown (Dependent) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('upazilaLabel')}
            </label>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={selectedDistrict === 'random' || availableUpazilas.length === 0}
              className="w-full min-h-[42px] px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="random">{t('upazilaAny')}</option>
              {availableUpazilas.map((up) => (
                <option key={up.name} value={up.name}>
                  {isBangla ? up.nameBn : up.name}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button in Filter Column */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t('generateContact')}</span>
            </button>
          </div>
        </div>

        {/* Result Contact Card Column */}
        <div className="lg:col-span-7">
          <ContactCard
            contact={currentContact}
            onGenerateAnother={handleGenerate}
            onShowToast={onShowToast}
          />
        </div>
      </div>
    </div>
  );
};
