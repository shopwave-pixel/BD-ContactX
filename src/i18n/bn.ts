import { TranslationKey } from './en';

export const bn: Record<TranslationKey, string> = {
  // App & Brand
  appName: 'বিডি কনট্যাক্টএক্স',
  appTagline: 'বাংলাদেশ কন্টাক্ট জেনারেটর',
  appDescription: '',
  testDataNotice: '',

  // Nav
  navDashboard: 'জেনারেটর',
  navSingle: 'একক',
  navBulk: 'বাল্ক',
  navExplorer: 'এক্সপ্লোরার',
  navAbout: 'রেফারেন্স',

  // Actions
  generateContact: 'কন্টাক্ট তৈরি করুন',
  generateAnother: 'আরেকটি তৈরি করুন',
  generateBulk: 'কন্টাক্ট তৈরি করুন',
  copyName: 'নাম কপি',
  copyNumber: 'নম্বর কপি',
  copyAddress: 'ঠিকানা কপি',
  copyAll: 'সব কপি করুন',
  copySelected: 'নির্বাচিত কপি করুন',
  selectAll: 'সব নির্বাচন',
  deselectAll: 'নির্বাচন বাতিল',
  clearResults: 'মুছুন',
  exportCSV: 'সিএসভি এক্সপোর্ট',
  exportJSON: 'জেসন এক্সপোর্ট',
  downloadVCard: 'ভি-কার্ড',
  viewQR: 'কিউআর',
  close: 'বন্ধ',
  filter: 'ফিল্টার',
  search: 'অনুসন্ধান',
  reset: 'রিসেট',

  // Form & Filter Labels
  genderLabel: 'লিঙ্গ',
  genderAny: 'সকল',
  genderMale: 'পুরুষ',
  genderFemale: 'মহিলা',

  operatorLabel: 'অপারেটর',
  operatorAny: 'সকল অপারেটর',
  operatorGP: 'গ্রামীণফোন (০১৭, ০১৩)',
  operatorRobi: 'রবি (০১৮)',
  operatorBL: 'বাংলালিংক (০১৯, ০১৪)',
  operatorAirtel: 'এয়ারটেল (০১৬)',
  operatorTeletalk: 'টেলিটক (০১৫)',

  divisionLabel: 'বিভাগ',
  divisionAny: 'সকল বিভাগ',
  districtLabel: 'জেলা',
  districtAny: 'সকল জেলা',
  upazilaLabel: 'উপজেলা',
  upazilaAny: 'সকল উপজেলা',

  nameScriptLabel: 'নামের স্ক্রিপ্ট',
  nameScriptEnglish: 'English',
  nameScriptBangla: 'বাংলা',

  quantityLabel: 'সংখ্যা',
  customQuantity: 'কাস্টম (১ - ৫০০)',

  // Result card labels
  cardTitle: 'কন্টাক্ট বিবরণ',
  fullName: 'পুরো নাম',
  mobileNumber: 'মোবাইল নম্বর',
  mobileOperator: 'অপারেটর',
  gender: 'লিঙ্গ',
  division: 'বিভাগ',
  district: 'জেলা',
  upazila: 'উপজেলা',
  union: 'ইউনিয়ন',
  village: 'গ্রাম',
  postOffice: 'ডাকঘর',
  postCode: 'পোস্ট কোড',
  fullAddress: 'ঠিকানা',
  sampleNotice: '',

  // Table Columns
  colSelect: 'বাছাই',
  colId: '#',
  colName: 'নাম',
  colGender: 'লিঙ্গ',
  colPhone: 'ফোন',
  colOperator: 'অপারেটর',
  colDivision: 'বিভাগ',
  colDistrict: 'জেলা',
  colUpazila: 'উপজেলা',
  colPostCode: 'পোস্ট কোড',
  colActions: 'কার্যক্রম',

  // Feedback & Notifications
  copiedSuccess: 'সফলভাবে কপি হয়েছে',
  copiedField: 'সফলভাবে কপি হয়েছে',
  copiedContactAll: 'সফলভাবে কপি হয়েছে',
  copiedSelected: 'সফলভাবে কপি হয়েছে',
  bulkGeneratedSuccess: '{count} টি কন্টাক্ট তৈরি হয়েছে',
  exportedCSVSuccess: 'সিএসভি ডাউনলোড হয়েছে',
  exportedJSONSuccess: 'জেসন ডাউনলোড হয়েছে',
  vcardDownloaded: 'ভি-কার্ড ডাউনলোড হয়েছে',
  clearedSuccess: 'মুছে ফেলা হয়েছে',
  invalidQuantity: '১ থেকে ৫০০ এর মধ্যে সংখ্যা দিন',
  noSelectionToCopy: 'কোনো কন্টাক্ট নির্বাচন করা হয়নি',

  // Empty states
  emptyBulkTitle: 'কোনো কন্টাক্ট নেই',
  emptyBulkDesc: 'সংখ্যা নির্বাচন করে তৈরি করুন।',
  emptySearchTitle: 'কোনো ফলাফল নেই',
  emptySearchDesc: 'অন্য শব্দ দিয়ে অনুসন্ধান করুন।',

  // Address Explorer
  explorerTitle: 'ঠিকানা এক্সপ্লোরার',
  explorerSubtitle: '',
  searchPlaceholder: 'বিভাগ, জেলা, উপজেলা বা পোস্ট কোড...',
  divisionsCount: '৮টি বিভাগ',
  districtsCount: '৬৪টি জেলা',
  totalPostalZones: 'পোস্ট কোড',
  exploreDistricts: 'জেলাসমূহ',
  exploreUpazilas: 'উপজেলাসমূহ',
  quickGenerateFromArea: 'এই এলাকা ব্যবহার করুন',
  hierarchicalPath: 'অনুক্ৰম',

  // Reference guide
  aboutTitle: 'রেফারেন্স',
  aboutSubtitle: '',
  aboutPurposeHeading: 'সংক্ষিপ্ত বিবরণ',
  aboutPurposeText: 'বাংলাদেশের মোবাইল অপারেটরের প্রিফিক্স এবং প্রশাসনিক কাঠামো।',
  telecomHeading: 'মোবাইল নম্বরের প্রিফিক্স (+৮৮০)',
  telecomDesc: 'অপারেটর অনুযায়ী প্রিফিক্স:',
  geoHeading: 'প্রশাসনিক কাঠামো',
  geoDesc: 'বিভাগ, জেলা, উপজেলা এবং পোস্ট কোড।',
  privacyHeading: '',
  privacyText: '',

  // Theme & UI
  lightMode: 'লাইট',
  darkMode: 'ডার্ক',
  language: 'ভাষা',
  theme: 'থিম',
  footerRights: 'বিডি কনট্যাক্টএক্স',
  footerTagline: '',
};
