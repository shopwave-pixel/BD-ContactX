import { TranslationKey } from './en';

export const bn: Record<TranslationKey, string> = {
  // App & Brand
  appName: 'বিডি কনট্যাক্টএক্স',
  appTagline: 'বাংলাদেশ কন্টাক্ট জেনারেটর',
  appDescription: 'সফটওয়্যার টেস্টিংয়ের জন্য বাংলাদেশি মোবাইল নম্বর এবং ৮টি বিভাগের প্রশাসনিক ঠিকানা তৈরি করুন।',
  testDataNotice: 'টেস্ট ডাটা: সফটওয়্যার টেস্টিং ও ডেভেলপমেন্ট কাজের জন্য নম্বর ও ঠিকানা প্রস্তুত করা হয়েছে।',

  // Nav
  navDashboard: 'কন্টাক্ট জেনারেটর',
  navSingle: 'একক জেনারেটর',
  navBulk: 'বাল্ক জেনারেটর',
  navExplorer: 'ঠিকানা এক্সপ্লোরার',
  navAbout: 'টেলিকম রেফারেন্স',

  // Actions
  generateContact: 'কন্টাক্ট তৈরি করুন',
  generateAnother: 'আরেকটি তৈরি করুন',
  generateBulk: 'বাল্ক কন্টাক্ট তৈরি করুন',
  copyName: 'নাম কপি করুন',
  copyNumber: 'নম্বর কপি করুন',
  copyAddress: 'ঠিকানা কপি করুন',
  copyAll: 'সব কপি করুন',
  copySelected: 'নির্বাচিতগুলো কপি করুন',
  selectAll: 'সব নির্বাচন করুন',
  deselectAll: 'নির্বাচন বাতিল করুন',
  clearResults: 'ফলাফল মুছুন',
  exportCSV: 'সিএসভি এক্সপোর্ট',
  exportJSON: 'জেসন এক্সপোর্ট',
  downloadVCard: 'ভি-কার্ড ডাউনলোড',
  viewQR: 'কিউআর কোড দেখুন',
  close: 'বন্ধ করুন',
  filter: 'ফিল্টার',
  search: 'অনুসন্ধান',
  reset: 'রিসেট করুন',

  // Form & Filter Labels
  genderLabel: 'লিঙ্গ',
  genderAny: 'যেকোনো / এলোমেলো',
  genderMale: 'পুরুষ',
  genderFemale: 'মহিলা',

  operatorLabel: 'মোবাইল অপারেটর',
  operatorAny: 'যেকোনো অপারেটর',
  operatorGP: 'গ্রামীণফোন (০১৭, ০১৩)',
  operatorRobi: 'রবি (০১৮)',
  operatorBL: 'বাংলালিংক (০১৯, ০১৪)',
  operatorAirtel: 'এয়ারটেল (০১৬)',
  operatorTeletalk: 'টেলিটক (০১৫)',

  divisionLabel: 'বিভাগ',
  divisionAny: 'সকল বিভাগ',
  districtLabel: 'জেলা',
  districtAny: 'সকল জেলা',
  upazilaLabel: 'উপজেলা / থানা',
  upazilaAny: 'সকল উপজেলা',

  nameScriptLabel: 'নামের স্ক্রিপ্ট',
  nameScriptEnglish: 'ইংরেজি (English)',
  nameScriptBangla: 'বাংলা (Bangla)',

  quantityLabel: 'সংখ্যা',
  customQuantity: 'কাস্টম সংখ্যা (১ - ৫০০)',

  // Result card labels
  cardTitle: 'কন্টাক্ট প্রোফাইল',
  fullName: 'পুরো নাম',
  mobileNumber: 'মোবাইল নম্বর',
  mobileOperator: 'অপারেটর',
  gender: 'লিঙ্গ',
  division: 'বিভাগ',
  district: 'জেলা',
  upazila: 'উপজেলা',
  union: 'ইউনিয়ন / ওয়ার্ড',
  village: 'গ্রাম / এলাকা',
  postOffice: 'ডাকঘর',
  postCode: 'পোস্ট কোড',
  fullAddress: 'সম্পূর্ণ ঠিকানা',
  sampleNotice: 'নমুনা ডাটা',

  // Table Columns
  colSelect: 'বাছাই',
  colId: 'ক্রমিক',
  colName: 'নাম',
  colGender: 'লিঙ্গ',
  colPhone: 'ফোন (+৮৮০)',
  colOperator: 'অপারেটর',
  colDivision: 'বিভাগ',
  colDistrict: 'জেলা',
  colUpazila: 'উপজেলা',
  colPostCode: 'পোস্ট কোড',
  colActions: 'কার্যক্রম',

  // Feedback & Notifications
  copiedSuccess: 'ক্লিপবোর্ডে কপি সম্পন্ন হয়েছে',
  copiedField: '{field} ক্লিপবোর্ডে কপি করা হয়েছে',
  copiedContactAll: 'কন্টাক্ট বিবরণ ক্লিপবোর্ডে কপি করা হয়েছে',
  copiedSelected: '{count} টি কন্টাক্ট কপি করা হয়েছে',
  bulkGeneratedSuccess: '{count} টি কন্টাক্ট তৈরি হয়েছে',
  exportedCSVSuccess: 'সিএসভি ফাইল ডাউনলোড হয়েছে',
  exportedJSONSuccess: 'জেসন ফাইল ডাউনলোড হয়েছে',
  vcardDownloaded: 'ভি-কার্ড ফাইল ডাউনলোড হয়েছে',
  clearedSuccess: 'সকল ফলাফল মুছে ফেলা হয়েছে',
  invalidQuantity: '১ থেকে ৫০০ এর মধ্যে একটি সংখ্যা দিন',
  noSelectionToCopy: 'কোনো কন্টাক্ট নির্বাচন করা হয়নি',

  // Empty states
  emptyBulkTitle: 'কোনো কন্টাক্ট তৈরি করা হয়নি',
  emptyBulkDesc: 'সংখ্যা নির্বাচন করে "বাল্ক কন্টাক্ট তৈরি করুন" বাটনে চাপ দিন।',
  emptySearchTitle: 'কোনো এলাকা পাওয়া যায়নি',
  emptySearchDesc: 'অনুসন্ধানের বানান পরীক্ষা করে পুনরায় চেষ্টা করুন।',

  // Address Explorer
  explorerTitle: 'বাংলাদেশের ঠিকানা এক্সপ্লোরার',
  explorerSubtitle: 'বিভাগ, জেলা, উপজেলা এবং পোস্ট কোডের কাঠামো দেখুন।',
  searchPlaceholder: 'বিভাগ, জেলা, উপজেলা বা পোস্ট কোড দিয়ে খুঁজুন...',
  divisionsCount: '৮টি বিভাগ',
  districtsCount: '৬৪টি জেলা',
  totalPostalZones: 'যাচাইকৃত পোস্ট কোড',
  exploreDistricts: 'জেলাসমূহ',
  exploreUpazilas: 'উপজেলা ও ডাকঘরসমূহ',
  quickGenerateFromArea: 'এই এলাকা ব্যবহার করুন',
  hierarchicalPath: 'প্রশাসনিক অনুক্রম',

  // Reference guide
  aboutTitle: 'টেলিকম ও ভৌগোলিক তথ্য',
  aboutSubtitle: 'সফটওয়্যার টেস্টিং ও যাচাইয়ের জন্য অফিসিয়াল কোড ও প্রশাসনিক কাঠামোর বিবরণ।',
  aboutPurposeHeading: 'সংক্ষিপ্ত বিবরণ',
  aboutPurposeText: 'বিডি কনট্যাক্টএক্স ডাটাবেস সিডিং, ফর্ম ভ্যালিডেশন এবং সফটওয়্যার কিউএ টেস্টিংয়ের জন্য বাস্তবসম্মত টেস্ট রেকর্ড তৈরি করে।',
  telecomHeading: 'মোবাইল নম্বরের ফরম্যাট (+৮৮০)',
  telecomDesc: 'অপারেটর অনুযায়ী অফিসিয়াল ডায়ালিং প্রিফিক্স কোড:',
  geoHeading: 'প্রশাসনিক কাঠামো',
  geoDesc: 'বিভাগ, জেলা, উপজেলা এবং স্থানীয় পোস্ট কোড অনুযায়ী সাজানো।',
  privacyHeading: 'ব্রাউজার-ভিত্তিক সঞ্চালন',
  privacyText: 'অ্যাপ্লিকেশনটি সরাসরি ব্রাউজারে চলে এবং কোনো ডাটা বাইরের সার্ভারে পাঠানো হয় না।',

  // Theme & UI
  lightMode: 'লাইট মোড',
  darkMode: 'ডার্ক মোড',
  language: 'ভাষা',
  theme: 'থিম',
  footerRights: 'বিডি কনট্যাক্টএক্স। শুধুমাত্র সফটওয়্যার পরীক্ষার উদ্দেশ্যে ব্যবহৃত।',
  footerTagline: 'প্রফেশনাল কন্টাক্ট জেনারেটর ইউটিলিটি।',
};
