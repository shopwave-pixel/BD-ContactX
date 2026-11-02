import React, { useState } from 'react';
import { Contact, GenderSelection, OperatorCode } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BANGLADESH_DIVISIONS } from '../data/bangladeshGeo';
import { OPERATORS, OPERATOR_LIST } from '../data/operators';
import {
  generateBulkContactsList,
  exportContactsToCSV,
  exportContactsToJSON,
  copyToClipboard,
  formatContact,
  formatContactsList,
} from '../utils/generator';
import {
  Database,
  FileSpreadsheet,
  FileCode,
  Copy,
  Trash2,
  CheckSquare,
  Square,
  Play,
  Phone,
  SlidersHorizontal,
  Layers,
} from 'lucide-react';

interface BulkGeneratorProps {
  onShowToast: (message: string) => void;
}

export const BulkGenerator: React.FC<BulkGeneratorProps> = ({ onShowToast }) => {
  const { t, isBangla } = useLanguage();

  // Generator quantity state
  const [quantity, setQuantity] = useState<number>(10);
  const [customInput, setCustomInput] = useState<string>('25');

  // Filter criteria for bulk generation
  const [gender, setGender] = useState<GenderSelection>('random');
  const [operator, setOperator] = useState<OperatorCode | 'random'>('random');
  const [division, setDivision] = useState<string>('random');

  // Generated contacts list
  const [contacts, setContacts] = useState<Contact[]>([]);
  // Set of selected contact IDs
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleGenerate = (count: number) => {
    if (isNaN(count) || count < 1 || count > 500) {
      onShowToast(t('invalidQuantity'));
      return;
    }
    const newContacts = generateBulkContactsList(count, {
      gender,
      operator,
      division,
    });
    setContacts(newContacts);
    setSelectedIds(new Set());
    onShowToast(t('bulkGeneratedSuccess', { count: newContacts.length }));
  };

  const handleSelectAll = () => {
    if (selectedIds.size === contacts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(contacts.map((c) => c.id)));
    }
  };

  const handleToggleRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleCopyAll = async () => {
    if (contacts.length === 0) return;
    const text = formatContactsList(contacts, isBangla);
    const success = await copyToClipboard(text);
    if (success) {
      onShowToast(isBangla ? 'সফলভাবে কপি হয়েছে' : 'Copied successfully');
    }
  };

  const handleCopySelected = async () => {
    if (selectedIds.size === 0) {
      onShowToast(t('noSelectionToCopy'));
      return;
    }
    const selectedContacts = contacts.filter((c) => selectedIds.has(c.id));
    const text = formatContactsList(selectedContacts, isBangla);
    const success = await copyToClipboard(text);
    if (success) {
      onShowToast(isBangla ? 'সফলভাবে কপি হয়েছে' : 'Copied successfully');
    }
  };

  const handleClear = () => {
    setContacts([]);
    setSelectedIds(new Set());
    onShowToast(t('clearedSuccess'));
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) return;
    exportContactsToCSV(contacts, isBangla);
    onShowToast(t('exportedCSVSuccess'));
  };

  const handleExportJSON = () => {
    if (contacts.length === 0) return;
    exportContactsToJSON(contacts, isBangla);
    onShowToast(t('exportedJSONSuccess'));
  };

  const allSelected = contacts.length > 0 && selectedIds.size === contacts.length;

  return (
    <div className="space-y-6">
      {/* Configuration Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('navBulk')}</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('appDescription')}
          </p>
        </div>

        {/* Quantity Selectors */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {t('quantityLabel')}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {[10, 50, 100].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setQuantity(preset);
                  handleGenerate(preset);
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                  quantity === preset && contacts.length > 0
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {preset} {isBangla ? 'টি' : 'Contacts'}
              </button>
            ))}

            {/* Custom Input */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5">
              <input
                type="number"
                min="1"
                max="500"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="25"
                className="w-16 text-sm font-mono bg-transparent text-slate-900 dark:text-white focus:outline-none tabular-nums"
              />
              <button
                type="button"
                onClick={() => {
                  const num = parseInt(customInput, 10);
                  if (!isNaN(num)) {
                    setQuantity(num);
                    handleGenerate(num);
                  }
                }}
                className="px-3 py-1 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                {t('generateBulk')}
              </button>
            </div>
          </div>
        </div>

        {/* Optional Filter Overrides */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {t('genderLabel')}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as GenderSelection)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="random">{t('genderAny')}</option>
              <option value="male">{t('genderMale')}</option>
              <option value="female">{t('genderFemale')}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {t('operatorLabel')}
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value as OperatorCode | 'random')}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="random">{t('operatorAny')}</option>
              {OPERATOR_LIST.map((op) => (
                <option key={op.code} value={op.code}>
                  {isBangla ? op.nameBn : op.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {t('divisionLabel')}
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="random">{t('divisionAny')}</option>
              {BANGLADESH_DIVISIONS.map((d) => (
                <option key={d.name} value={d.name}>
                  {isBangla ? d.nameBn : d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Toolbar & Counter */}
      {contacts.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSelectAll}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {allSelected ? (
                <CheckSquare className="w-4 h-4 text-emerald-600" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
              <span>{allSelected ? t('deselectAll') : t('selectAll')}</span>
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              ({selectedIds.size} / {contacts.length} {isBangla ? 'নির্বাচিত' : 'selected'})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selectedIds.size > 0 && (
              <button
                type="button"
                onClick={handleCopySelected}
                className="min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{t('copySelected')} ({selectedIds.size})</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyAll}
              className="min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{t('copyAll')}</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('exportCSV')}</span>
            </button>

            <button
              type="button"
              onClick={handleExportJSON}
              className="min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-sky-600" />
              <span>{t('exportJSON')}</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('clearResults')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Table */}
      {contacts.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full min-w-[780px] text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/80 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                      aria-label="Select all"
                    />
                  </th>
                  <th className="py-3 px-2 w-8 text-center text-slate-400">#</th>
                  <th className="py-3 px-3">{t('colName')}</th>
                  <th className="py-3 px-3">{t('colGender')}</th>
                  <th className="py-3 px-3">{t('colPhone')}</th>
                  <th className="py-3 px-3">{t('colOperator')}</th>
                  <th className="py-3 px-3">{t('colDivision')}</th>
                  <th className="py-3 px-3">{t('colDistrict')}</th>
                  <th className="py-3 px-3">{t('colUpazila')}</th>
                  <th className="py-3 px-3">{t('colPostCode')}</th>
                  <th className="py-3 px-3 text-right">{t('colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {contacts.map((contact, index) => {
                  const isSelected = selectedIds.has(contact.id);
                  const op = OPERATORS[contact.operatorCode] || OPERATORS.GP;
                  const displayName = isBangla ? contact.fullNameBn : contact.fullName;
                  const displayGender = isBangla
                    ? contact.gender === 'Male'
                      ? t('genderMale')
                      : t('genderFemale')
                    : contact.gender;
                  const displayDivision = isBangla ? contact.divisionBn : contact.division;
                  const displayDistrict = isBangla ? contact.districtBn : contact.district;
                  const displayUpazila = isBangla ? contact.upazilaBn : contact.upazila;

                  return (
                    <tr
                      key={contact.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                        isSelected ? 'bg-emerald-50/60 dark:bg-emerald-950/30' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleRow(contact.id)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-400 tabular-nums">
                        {index + 1}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {displayName}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="text-slate-600 dark:text-slate-400">
                          {displayGender}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-medium text-emerald-700 dark:text-emerald-400 tabular-nums whitespace-nowrap">
                        {contact.phone}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${op.badgeBg} ${op.badgeText}`}
                        >
                          {contact.operatorCode}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">{displayDivision}</td>
                      <td className="py-2.5 px-3 whitespace-nowrap">{displayDistrict}</td>
                      <td className="py-2.5 px-3 whitespace-nowrap">{displayUpazila}</td>
                      <td className="py-2.5 px-3 font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {contact.postCode}
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={async () => {
                            const formatted = formatContact(contact, isBangla);
                            const ok = await copyToClipboard(formatted);
                            if (ok) onShowToast(isBangla ? 'সফলভাবে কপি হয়েছে' : 'Copied successfully');
                          }}
                          className="p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                          title={t('copyAll')}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Database className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('emptyBulkTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('emptyBulkDesc')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleGenerate(10)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>10 {isBangla ? 'টি তৈরি করুন' : 'Generate 10 Contacts'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
