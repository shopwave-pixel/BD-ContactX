export const en = {
  // App & Brand
  appName: 'BD ContactX',
  appTagline: 'Bangladesh Contact Generator',
  appDescription: 'Generate test contacts, Bangladesh mobile numbers, and administrative addresses across all 8 divisions.',
  testDataNotice: 'Test Data: Phone numbers and addresses are generated for software testing and development purposes.',

  // Nav
  navDashboard: 'Contact Generator',
  navSingle: 'Single Generator',
  navBulk: 'Bulk Generator',
  navExplorer: 'Address Explorer',
  navAbout: 'Telecom Reference',

  // Actions
  generateContact: 'Generate Contact',
  generateAnother: 'Generate Another',
  generateBulk: 'Generate Bulk Contacts',
  copyName: 'Copy Name',
  copyNumber: 'Copy Number',
  copyAddress: 'Copy Address',
  copyAll: 'Copy All',
  copySelected: 'Copy Selected',
  selectAll: 'Select All',
  deselectAll: 'Deselect All',
  clearResults: 'Clear Results',
  exportCSV: 'Export CSV',
  exportJSON: 'Export JSON',
  downloadVCard: 'Download vCard',
  viewQR: 'View QR Code',
  close: 'Close',
  filter: 'Filter',
  search: 'Search',
  reset: 'Reset Filters',

  // Form & Filter Labels
  genderLabel: 'Gender',
  genderAny: 'Random / Any Gender',
  genderMale: 'Male',
  genderFemale: 'Female',

  operatorLabel: 'Mobile Operator',
  operatorAny: 'Random / Any Operator',
  operatorGP: 'Grameenphone (017, 013)',
  operatorRobi: 'Robi (018)',
  operatorBL: 'Banglalink (019, 014)',
  operatorAirtel: 'Airtel (016)',
  operatorTeletalk: 'Teletalk (015)',

  divisionLabel: 'Division',
  divisionAny: 'All Divisions',
  districtLabel: 'District',
  districtAny: 'All Districts',
  upazilaLabel: 'Upazila / Thana',
  upazilaAny: 'All Upazilas',

  nameScriptLabel: 'Name Script',
  nameScriptEnglish: 'English (Roman)',
  nameScriptBangla: 'বাংলা (Bangla)',

  quantityLabel: 'Quantity',
  customQuantity: 'Custom Quantity (1 - 500)',

  // Result card labels
  cardTitle: 'Contact Profile',
  fullName: 'Full Name',
  mobileNumber: 'Mobile Number',
  mobileOperator: 'Operator',
  gender: 'Gender',
  division: 'Division',
  district: 'District',
  upazila: 'Upazila',
  union: 'Union / Ward',
  village: 'Village / Area',
  postOffice: 'Post Office',
  postCode: 'Post Code',
  fullAddress: 'Full Address',
  sampleNotice: 'Sample Data',

  // Table Columns
  colSelect: 'Select',
  colId: '#',
  colName: 'Name',
  colGender: 'Gender',
  colPhone: 'Phone (+880)',
  colOperator: 'Operator',
  colDivision: 'Division',
  colDistrict: 'District',
  colUpazila: 'Upazila',
  colPostCode: 'Post Code',
  colActions: 'Actions',

  // Feedback & Notifications
  copiedSuccess: 'Copied to clipboard',
  copiedField: '{field} copied to clipboard',
  copiedContactAll: 'Contact details copied to clipboard',
  copiedSelected: '{count} contacts copied to clipboard',
  bulkGeneratedSuccess: 'Generated {count} contacts',
  exportedCSVSuccess: 'CSV file downloaded',
  exportedJSONSuccess: 'JSON file downloaded',
  vcardDownloaded: 'vCard file downloaded',
  clearedSuccess: 'Results cleared',
  invalidQuantity: 'Please enter a quantity between 1 and 500',
  noSelectionToCopy: 'No contacts selected',

  // Empty states
  emptyBulkTitle: 'No Contacts Generated',
  emptyBulkDesc: 'Select a quantity and click "Generate Bulk Contacts" to populate the table.',
  emptySearchTitle: 'No Matching Locations',
  emptySearchDesc: 'Adjust your search terms to explore Bangladesh divisions, districts, and postal codes.',

  // Address Explorer
  explorerTitle: 'Bangladesh Address Explorer',
  explorerSubtitle: 'Browse administrative divisions, districts, upazilas, and verified postal codes.',
  searchPlaceholder: 'Search division, district, upazila or post code...',
  divisionsCount: '8 Divisions',
  districtsCount: '64 Districts',
  totalPostalZones: 'Verified Post Codes',
  exploreDistricts: 'Districts',
  exploreUpazilas: 'Upazilas & Post Offices',
  quickGenerateFromArea: 'Use This Location',
  hierarchicalPath: 'Hierarchy',

  // Reference guide
  aboutTitle: 'Telecom & Geographic Reference',
  aboutSubtitle: 'Official dialing codes and administrative boundaries for software testing in Bangladesh.',
  aboutPurposeHeading: 'Overview',
  aboutPurposeText: 'BD ContactX generates formatted test records for database seeding, form validation, and software quality assurance.',
  telecomHeading: 'Mobile Number Formats (+880)',
  telecomDesc: 'Standard Bangladesh dialing plan prefixes by network operator:',
  geoHeading: 'Administrative Hierarchy',
  geoDesc: 'Structured by division, district (zila), upazila (sub-district), and local post office codes.',
  privacyHeading: 'Client-Side Execution',
  privacyText: 'Runs directly in your browser session. Data is generated in memory and never sent to external servers.',

  // Theme & UI
  lightMode: 'Light Mode',
  darkMode: 'Dark Mode',
  language: 'Language',
  theme: 'Theme',
  footerRights: 'BD ContactX. Random contact data for testing purposes.',
  footerTagline: 'Professional contact generator utility.',
};

export type TranslationKey = keyof typeof en;
