export const en = {
  // App & Brand
  appName: 'BD ContactX',
  appTagline: 'Bangladesh Contact Generator',
  appDescription: '',
  testDataNotice: '',

  // Nav
  navDashboard: 'Generator',
  navSingle: 'Single',
  navBulk: 'Bulk',
  navExplorer: 'Explorer',
  navAbout: 'Reference',

  // Actions
  generateContact: 'Generate Contact',
  generateAnother: 'Generate Another',
  generateBulk: 'Generate Contacts',
  copyName: 'Copy Name',
  copyNumber: 'Copy Number',
  copyAddress: 'Copy Address',
  copyAll: 'Copy All',
  copySelected: 'Copy Selected',
  selectAll: 'Select All',
  deselectAll: 'Deselect All',
  clearResults: 'Clear',
  exportCSV: 'Export CSV',
  exportJSON: 'Export JSON',
  downloadVCard: 'Download vCard',
  viewQR: 'QR Code',
  close: 'Close',
  filter: 'Filter',
  search: 'Search',
  reset: 'Reset',

  // Form & Filter Labels
  genderLabel: 'Gender',
  genderAny: 'All',
  genderMale: 'Male',
  genderFemale: 'Female',

  operatorLabel: 'Operator',
  operatorAny: 'All Operators',
  operatorGP: 'Grameenphone (017, 013)',
  operatorRobi: 'Robi (018)',
  operatorBL: 'Banglalink (019, 014)',
  operatorAirtel: 'Airtel (016)',
  operatorTeletalk: 'Teletalk (015)',

  divisionLabel: 'Division',
  divisionAny: 'All Divisions',
  districtLabel: 'District',
  districtAny: 'All Districts',
  upazilaLabel: 'Upazila',
  upazilaAny: 'All Upazilas',

  nameScriptLabel: 'Name Script',
  nameScriptEnglish: 'English',
  nameScriptBangla: 'বাংলা',

  quantityLabel: 'Quantity',
  customQuantity: 'Custom (1 - 500)',

  // Result card labels
  cardTitle: 'Contact Details',
  fullName: 'Full Name',
  mobileNumber: 'Mobile Number',
  mobileOperator: 'Operator',
  gender: 'Gender',
  division: 'Division',
  district: 'District',
  upazila: 'Upazila',
  union: 'Union',
  village: 'Village',
  postOffice: 'Post Office',
  postCode: 'Post Code',
  fullAddress: 'Address',
  sampleNotice: '',

  // Table Columns
  colSelect: 'Select',
  colId: '#',
  colName: 'Name',
  colGender: 'Gender',
  colPhone: 'Phone',
  colOperator: 'Operator',
  colDivision: 'Division',
  colDistrict: 'District',
  colUpazila: 'Upazila',
  colPostCode: 'Post Code',
  colActions: 'Action',

  // Feedback & Notifications
  copiedSuccess: 'Copied successfully',
  copiedField: 'Copied successfully',
  copiedContactAll: 'Copied successfully',
  copiedSelected: 'Copied successfully',
  bulkGeneratedSuccess: 'Generated {count} contacts',
  exportedCSVSuccess: 'CSV downloaded',
  exportedJSONSuccess: 'JSON downloaded',
  vcardDownloaded: 'vCard downloaded',
  clearedSuccess: 'Cleared',
  invalidQuantity: 'Enter quantity between 1 and 500',
  noSelectionToCopy: 'No contacts selected',

  // Empty states
  emptyBulkTitle: 'No Contacts Generated',
  emptyBulkDesc: 'Select quantity to generate contacts.',
  emptySearchTitle: 'No Matching Locations',
  emptySearchDesc: 'Try another search term.',

  // Address Explorer
  explorerTitle: 'Address Explorer',
  explorerSubtitle: '',
  searchPlaceholder: 'Search division, district, upazila, or post code...',
  divisionsCount: '8 Divisions',
  districtsCount: '64 Districts',
  totalPostalZones: 'Post Codes',
  exploreDistricts: 'Districts',
  exploreUpazilas: 'Upazilas',
  quickGenerateFromArea: 'Use Location',
  hierarchicalPath: 'Hierarchy',

  // Reference guide
  aboutTitle: 'Reference',
  aboutSubtitle: '',
  aboutPurposeHeading: 'Overview',
  aboutPurposeText: 'Bangladesh mobile operator prefixes and administrative hierarchy.',
  telecomHeading: 'Mobile Number Prefixes (+880)',
  telecomDesc: 'Dialing prefixes by operator:',
  geoHeading: 'Administrative Divisions',
  geoDesc: 'Divisions, districts, upazilas, and postal codes.',
  privacyHeading: '',
  privacyText: '',

  // Theme & UI
  lightMode: 'Light',
  darkMode: 'Dark',
  language: 'Language',
  theme: 'Theme',
  footerRights: 'BD ContactX',
  footerTagline: '',
};

export type TranslationKey = keyof typeof en;
