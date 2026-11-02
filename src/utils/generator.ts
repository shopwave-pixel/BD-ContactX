import {
  Contact,
  GeneratorFilters,
  DivisionInfo,
  DistrictInfo,
  UpazilaInfo,
  PostInfo,
} from '../types';
import { generateBdPhoneNumber } from '../data/operators';
import { generateRandomName } from '../data/names';
import { BANGLADESH_DIVISIONS, SAMPLE_VILLAGES, getRandomItem } from '../data/bangladeshGeo';

export function generateSingleContact(filters?: Partial<GeneratorFilters>): Contact {
  // 1. Name and Gender
  const nameData = generateRandomName(filters?.gender || 'random');

  // 2. Mobile and Operator
  const { phone, operator } = generateBdPhoneNumber(filters?.operator || 'random');

  // 3. Geographic hierarchy
  // Division
  let selectedDivision: DivisionInfo;
  if (filters?.division && filters.division !== 'random') {
    selectedDivision =
      BANGLADESH_DIVISIONS.find((d) => d.name === filters.division) ||
      getRandomItem(BANGLADESH_DIVISIONS);
  } else {
    selectedDivision = getRandomItem(BANGLADESH_DIVISIONS);
  }

  // District
  let selectedDistrict: DistrictInfo;
  if (filters?.district && filters.district !== 'random') {
    selectedDistrict =
      selectedDivision.districts.find((d) => d.name === filters.district) ||
      getRandomItem(selectedDivision.districts);
  } else {
    selectedDistrict = getRandomItem(selectedDivision.districts);
  }

  // Upazila
  let selectedUpazila: UpazilaInfo;
  if (filters?.upazila && filters.upazila !== 'random') {
    selectedUpazila =
      selectedDistrict.upazilas.find((u) => u.name === filters.upazila) ||
      getRandomItem(selectedDistrict.upazilas);
  } else {
    selectedUpazila = getRandomItem(selectedDistrict.upazilas);
  }

  // Union
  const unionObj =
    selectedUpazila.unions.length > 0
      ? getRandomItem(selectedUpazila.unions)
      : { en: 'Sadar Ward', bn: 'সদর ওয়ার্ড' };

  // Sample Village
  const villageObj = getRandomItem(SAMPLE_VILLAGES);

  // Post Office & Post Code
  const postOfficeObj: PostInfo =
    selectedUpazila.postOffices.length > 0
      ? getRandomItem(selectedUpazila.postOffices)
      : { postOffice: `${selectedUpazila.name} PO`, postOfficeBn: `${selectedUpazila.nameBn} ডাকঘর`, postCode: '1000' };

  // Full addresses: Village, Union, Upazila, District - PostCode
  const fullAddressEn = `${villageObj.en}, ${unionObj.en}, ${selectedUpazila.name}, ${selectedDistrict.name} - ${postOfficeObj.postCode}`;
  const fullAddressBn = `${villageObj.bn}, ${unionObj.bn}, ${selectedUpazila.nameBn}, ${selectedDistrict.nameBn} - ${postOfficeObj.postCode}`;

  const id = `bdc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id,
    firstName: nameData.firstName,
    lastName: nameData.lastName,
    fullName: nameData.fullName,
    firstNameBn: nameData.firstNameBn,
    lastNameBn: nameData.lastNameBn,
    fullNameBn: nameData.fullNameBn,
    gender: nameData.gender,
    phone,
    operator: operator.name,
    operatorBn: operator.nameBn,
    operatorCode: operator.code,
    division: selectedDivision.name,
    divisionBn: selectedDivision.nameBn,
    district: selectedDistrict.name,
    districtBn: selectedDistrict.nameBn,
    upazila: selectedUpazila.name,
    upazilaBn: selectedUpazila.nameBn,
    union: unionObj.en,
    unionBn: unionObj.bn,
    village: villageObj.en,
    villageBn: villageObj.bn,
    postOffice: postOfficeObj.postOffice,
    postOfficeBn: postOfficeObj.postOfficeBn,
    postCode: postOfficeObj.postCode,
    fullAddress: fullAddressEn,
    fullAddressBn,
    createdAt: Date.now(),
  };
}

export function generateBulkContactsList(count: number, filters?: Partial<GeneratorFilters>): Contact[] {
  const safeCount = Math.min(Math.max(1, count), 500);
  const contacts: Contact[] = [];
  for (let i = 0; i < safeCount; i++) {
    contacts.push(generateSingleContact(filters));
  }
  return contacts;
}

/**
 * Shared contact formatter meeting exact three-line format:
 * Bangla:
 * নাম: হাসিবুল খাতুন
 * ফোন: +8801949604036
 * ঠিকানা: ছোট গ্রাম, গুলশান ২ সার্কেল, গুলশান, ঢাকা - 1212
 *
 * English:
 * Name: Hasibul Khatun
 * Phone: +8801949604036
 * Address: Choto Gram, Gulshan 2 Circle, Gulshan, Dhaka - 1212
 */
export function formatContact(contact: Contact, isBangla = false): string {
  if (isBangla) {
    return `নাম: ${contact.fullNameBn}\nফোন: ${contact.phone}\nঠিকানা: ${contact.fullAddressBn}`;
  }

  return `Name: ${contact.fullName}\nPhone: ${contact.phone}\nAddress: ${contact.fullAddress}`;
}

export function formatContactsList(contacts: Contact[], isBangla = false): string {
  return contacts.map((c) => formatContact(c, isBangla)).join('\n\n');
}

export const formatContactPlain = formatContact;

export async function copyToClipboard(text: string): Promise<boolean> {
  // 1. Modern Async Clipboard API (Chrome, Firefox, Edge, Safari 13.1+, Android, iOS)
  if (navigator?.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Modern clipboard API failed, trying fallback:', err);
    }
  }

  // 2. Universal fallback for iOS Safari, WebViews, and older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.setAttribute('readonly', '');

    document.body.appendChild(textArea);
    textArea.focus({ preventScroll: true });
    textArea.select();
    // Required for mobile Safari
    textArea.setSelectionRange(0, text.length);

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (e) {
    console.error('Fallback copy failed:', e);
    return false;
  }
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Defer revocation to allow Safari / iOS Safari to start the download
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1500);
}

export function exportContactsToCSV(contacts: Contact[], isBangla = false): void {
  if (!contacts.length) return;

  const headers = isBangla
    ? ['আইডি', 'নাম', 'লিঙ্গ', 'মোবাইল নম্বর', 'অপারেটর', 'বিভাগ', 'জেলা', 'উপজেলা', 'ইউনিয়ন', 'ডাকঘর', 'পোস্ট কোড', 'সম্পূর্ণ ঠিকানা']
    : ['ID', 'Full Name', 'Gender', 'Phone', 'Operator', 'Division', 'District', 'Upazila', 'Union', 'Post Office', 'Post Code', 'Full Address'];

  const rows = contacts.map((c) => {
    if (isBangla) {
      return [
        c.id,
        `"${c.fullNameBn.replace(/"/g, '""')}"`,
        c.gender === 'Male' ? 'পুরুষ' : 'মহিলা',
        `"${c.phone}"`,
        `"${c.operatorCode}"`,
        `"${c.divisionBn}"`,
        `"${c.districtBn}"`,
        `"${c.upazilaBn}"`,
        `"${c.unionBn}"`,
        `"${c.postOfficeBn}"`,
        `"${c.postCode}"`,
        `"${c.fullAddressBn.replace(/"/g, '""')}"`,
      ];
    }
    return [
      c.id,
      `"${c.fullName.replace(/"/g, '""')}"`,
      c.gender,
      `"${c.phone}"`,
      `"${c.operatorCode}"`,
      `"${c.division}"`,
      `"${c.district}"`,
      `"${c.upazila}"`,
      `"${c.union}"`,
      `"${c.postOffice}"`,
      `"${c.postCode}"`,
      `"${c.fullAddress.replace(/"/g, '""')}"`,
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, `BD_ContactX_${Date.now()}.csv`);
}

export function exportContactsToJSON(contacts: Contact[], isBangla = false): void {
  if (!contacts.length) return;

  const formattedData = contacts.map((c) => ({
    id: c.id,
    name: isBangla ? c.fullNameBn : c.fullName,
    gender: isBangla ? (c.gender === 'Male' ? 'পুরুষ' : 'মহিলা') : c.gender,
    phone: c.phone,
    operator: c.operatorCode,
    operatorFullName: isBangla ? c.operatorBn : c.operator,
    division: isBangla ? c.divisionBn : c.division,
    district: isBangla ? c.districtBn : c.district,
    upazila: isBangla ? c.upazilaBn : c.upazila,
    union: isBangla ? c.unionBn : c.union,
    village: isBangla ? c.villageBn : c.village,
    postOffice: isBangla ? c.postOfficeBn : c.postOffice,
    postCode: c.postCode,
    address: isBangla ? c.fullAddressBn : c.fullAddress,
    isSampleData: true,
  }));

  const jsonString = JSON.stringify(formattedData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  triggerDownload(blob, `BD_ContactX_${Date.now()}.json`);
}

export function downloadVCard(contact: Contact): void {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${contact.lastName};${contact.firstName};;;`,
    `FN:${contact.fullName}`,
    `TEL;TYPE=CELL:${contact.phone}`,
    `ADR;TYPE=HOME:;;${contact.village}, ${contact.union};${contact.upazila};${contact.district};${contact.postCode};Bangladesh`,
    `NOTE:BD ContactX Test Contact (${contact.operatorCode})`,
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  triggerDownload(blob, `${contact.fullName.replace(/\s+/g, '_')}.vcf`);
}
