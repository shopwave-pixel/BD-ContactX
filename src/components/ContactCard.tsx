import React from 'react';
import { Contact } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { OPERATORS } from '../data/operators';
import { copyToClipboard, formatContact } from '../utils/generator';
import { Copy, RefreshCw, Phone, User, MapPin, Building } from 'lucide-react';

interface ContactCardProps {
  contact: Contact | null;
  onGenerateAnother: () => void;
  onShowToast: (message: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onGenerateAnother,
  onShowToast,
}) => {
  const { t, isBangla } = useLanguage();

  if (!contact) return null;

  const operatorInfo = OPERATORS[contact.operatorCode] || OPERATORS.GP;
  const displayName = isBangla ? contact.fullNameBn : contact.fullName;
  const displayGender = isBangla
    ? contact.gender === 'Male'
      ? t('genderMale')
      : t('genderFemale')
    : contact.gender;
  const displayDivision = isBangla ? contact.divisionBn : contact.division;
  const displayDistrict = isBangla ? contact.districtBn : contact.district;
  const displayUpazila = isBangla ? contact.upazilaBn : contact.upazila;
  const displayUnion = isBangla ? contact.unionBn : contact.union;
  const displayVillage = isBangla ? contact.villageBn : contact.village;
  const displayPostOffice = isBangla ? contact.postOfficeBn : contact.postOffice;
  const displayAddress = isBangla ? contact.fullAddressBn : contact.fullAddress;
  const displayOperator = isBangla ? contact.operatorBn : contact.operator;

  const handleCopyAll = async () => {
    const formatted = formatContact(contact, isBangla);
    const success = await copyToClipboard(formatted);
    if (success) {
      onShowToast(isBangla ? 'সফলভাবে কপি হয়েছে' : 'Copied successfully');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
      {/* Card Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold text-white border border-white/20">
            <User className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
              {displayName}
            </h2>
            <div className="flex items-center gap-2 text-xs text-emerald-200/90 font-medium">
              <span>{displayGender}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{contact.phone}</span>
            </div>
          </div>
        </div>

        {/* Operator Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-lg text-xs font-semibold shadow-xs ${operatorInfo.badgeBg} ${operatorInfo.badgeText}`}
          >
            {contact.operatorCode}
          </span>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
        {/* Primary Contact Row: Name & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="space-y-1 min-w-0">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {t('fullName')}
              </span>
              <p className="text-base font-bold text-slate-900 dark:text-white break-words">
                {displayName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 break-words">
                {isBangla ? contact.fullName : contact.fullNameBn}
              </p>
            </div>
          </div>

          {/* Mobile Number */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {t('mobileNumber')}
              </span>
              <p className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                {contact.phone}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span>{displayOperator}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400 text-xs">({contact.operatorCode})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Breakdown Grid */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            {t('cardTitle')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Division */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t('division')}
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {displayDivision}
              </span>
            </div>

            {/* District */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t('district')}
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {displayDistrict}
              </span>
            </div>

            {/* Upazila */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t('upazila')}
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {displayUpazila}
              </span>
            </div>

            {/* Union */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t('union')}
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {displayUnion}
              </span>
            </div>

            {/* Village */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t('village')}
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {displayVillage}
              </span>
            </div>

            {/* Post Office */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t('postOffice')}
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {displayPostOffice}
              </span>
            </div>

            {/* Post Code */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t('postCode')}
              </span>
              <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                {contact.postCode}
              </span>
            </div>

            {/* Gender */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t('gender')}
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {displayGender}
              </span>
            </div>
          </div>
        </div>

        {/* Full Address Block */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {t('fullAddress')}
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed break-words">
              {displayAddress}
            </p>
          </div>
        </div>

        {/* Buttons Action Bar - Only 2 Buttons: Generate Another & Copy All */}
        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onGenerateAnother}
            className="min-h-[42px] flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('generateAnother')}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className="min-h-[42px] flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>{t('copyAll')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
