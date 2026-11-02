import { Gender, GenderSelection } from '../types';

export interface NamePair {
  en: string;
  bn: string;
}

export const MALE_FIRST_NAMES: NamePair[] = [
  { en: 'Mohammad', bn: 'মোহাম্মদ' },
  { en: 'Tanvir', bn: 'তানভীর' },
  { en: 'Arif', bn: 'আরিফ' },
  { en: 'Shakib', bn: 'সাকিব' },
  { en: 'Rakib', bn: 'রাকিব' },
  { en: 'Mehedi', bn: 'মেহেদী' },
  { en: 'Fahim', bn: 'ফাহিম' },
  { en: 'Mahmudul', bn: 'মাহমুদুল' },
  { en: 'Naim', bn: 'নাঈম' },
  { en: 'Ashiqur', bn: 'আশিকুর' },
  { en: 'Sourav', bn: 'সৌরভ' },
  { en: 'Anik', bn: 'অনিক' },
  { en: 'Suman', bn: 'সুমন' },
  { en: 'Pranto', bn: 'প্রান্ত' },
  { en: 'Biplob', bn: 'বিপ্লব' },
  { en: 'Farhan', bn: 'ফারহান' },
  { en: 'Imtiaz', bn: 'ইমতিয়াজ' },
  { en: 'Kamrul', bn: 'কামরুল' },
  { en: 'Shahadat', bn: 'শাহাদাত' },
  { en: 'Tariqul', bn: 'তরিকুল' },
  { en: 'Asif', bn: 'আসিফ' },
  { en: 'Zubayer', bn: 'জুবায়ের' },
  { en: 'Muntasir', bn: 'মুনতাসির' },
  { en: 'Rifat', bn: 'রিফাত' },
  { en: 'Sabbir', bn: 'সাব্বির' },
  { en: 'Tamim', bn: 'তামিম' },
  { en: 'Mushfiqur', bn: 'মুশফিকুর' },
  { en: 'Mustafizur', bn: 'মুস্তাফিজুর' },
  { en: 'Shahin', bn: 'শাহিন' },
  { en: 'Nazmul', bn: 'নাজমুল' },
  { en: 'Ripon', bn: 'রিপন' },
  { en: 'Shimul', bn: 'শিমুল' },
  { en: ' Palash', bn: 'পলাশ' },
  { en: 'Arafat', bn: 'আরাফাত' },
  { en: 'Rayhan', bn: 'রায়হান' },
  { en: 'Sayed', bn: 'সৈয়দ' },
  { en: 'Hasibul', bn: 'হাসিবুল' },
  { en: 'Enamul', bn: 'এনামুল' },
  { en: 'Ziaur', bn: 'জিয়াউর' },
  { en: 'Abdur', bn: 'আব্দুর' },
];

export const FEMALE_FIRST_NAMES: NamePair[] = [
  { en: 'Farhana', bn: 'ফারহানা' },
  { en: 'Nusrat', bn: 'নুসরাত' },
  { en: 'Sadia', bn: 'সাদিয়া' },
  { en: 'Tanjila', bn: 'তানজিলা' },
  { en: 'Jannatul', bn: 'জান্নাতুল' },
  { en: 'Sumaiya', bn: 'সুমাইয়া' },
  { en: 'Mim', bn: 'মীম' },
  { en: 'Ritu', bn: 'ঋতু' },
  { en: 'Anika', bn: 'আনিকা' },
  { en: 'Shaila', bn: 'শায়লা' },
  { en: 'Sabrina', bn: 'সাবরিনা' },
  { en: 'Tasnim', bn: 'তাসনিম' },
  { en: 'Lamia', bn: 'লামিয়া' },
  { en: 'Priyanka', bn: 'প্রিয়াঙ্কা' },
  { en: 'Puja', bn: 'পূজা' },
  { en: 'Shampa', bn: 'শম্পা' },
  { en: 'Ayesha', bn: 'আয়েশা' },
  { en: 'Fatema', bn: 'ফাতেমা' },
  { en: 'Khadija', bn: 'খাদিজা' },
  { en: 'Mehnaz', bn: 'মেহনাজ' },
  { en: 'Nazneen', bn: 'নাজনীন' },
  { en: 'Sharmin', bn: 'শারমিন' },
  { en: 'Moumita', bn: 'মৌমিতা' },
  { en: 'Suraiya', bn: 'সুরাইয়া' },
  { en: 'Nafisa', bn: 'নাফিসা' },
  { en: 'Samia', bn: 'সামিয়া' },
  { en: 'Tahmina', bn: 'তাহমিনা' },
  { en: 'Farzana', bn: 'ফারজানা' },
  { en: 'Sultana', bn: 'সুলতানা' },
  { en: 'Rokeya', bn: 'রোকেয়া' },
  { en: 'Nasrin', bn: 'নাসরিন' },
  { en: 'Rubina', bn: 'রুবিনা' },
  { en: 'Afroza', bn: 'আফরোজা' },
  { en: 'Tasmia', bn: 'তাসমিয়া' },
  { en: 'Mahmuda', bn: 'মাহমুদা' },
];

export const LAST_NAMES: NamePair[] = [
  { en: 'Rahman', bn: 'রহমান' },
  { en: 'Islam', bn: 'ইসলাম' },
  { en: 'Hossain', bn: 'হোসেন' },
  { en: 'Ahmed', bn: 'আহমেদ' },
  { en: 'Chowdhury', bn: 'চৌধুরী' },
  { en: 'Khan', bn: 'খান' },
  { en: 'Hasan', bn: 'হাসান' },
  { en: 'Ali', bn: 'আলী' },
  { en: 'Sikder', bn: 'সিকদার' },
  { en: 'Talukder', bn: 'তালুকদার' },
  { en: 'Paul', bn: 'পাল' },
  { en: 'Das', bn: 'দাস' },
  { en: 'Roy', bn: 'রায়' },
  { en: 'Bhowmik', bn: 'ভৌমিক' },
  { en: 'Majumder', bn: 'মজুমদার' },
  { en: 'Sarkar', bn: 'সরকার' },
  { en: 'Haque', bn: 'হক' },
  { en: 'Akter', bn: 'আক্তার' },
  { en: 'Begum', bn: 'বেগম' },
  { en: 'Uddin', bn: 'উদ্দিন' },
  { en: 'Miah', bn: 'মিয়া' },
  { en: 'Mondal', bn: 'মন্ডল' },
  { en: 'Sheikh', bn: 'শেখ' },
  { en: 'Khatun', bn: 'খাতুন' },
  { en: 'Kazi', bn: 'কাজী' },
  { en: 'Munshi', bn: 'মুন্সী' },
  { en: 'Bhuyan', bn: 'ভূঁইয়া' },
  { en: 'Biswas', bn: 'বিশ্বাস' },
  { en: 'Chakraborty', bn: 'চক্রবর্তী' },
  { en: 'Ghosh', bn: 'ঘোষ' },
  { en: 'Karim', bn: 'করিম' },
  { en: 'Bhuiyan', bn: 'ভূঁইয়া' },
];

export function getRandomElement<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateRandomName(genderSelect: GenderSelection = 'random'): {
  firstName: string;
  lastName: string;
  fullName: string;
  firstNameBn: string;
  lastNameBn: string;
  fullNameBn: string;
  gender: Gender;
} {
  let resolvedGender: Gender;
  if (genderSelect === 'male') {
    resolvedGender = 'Male';
  } else if (genderSelect === 'female') {
    resolvedGender = 'Female';
  } else {
    resolvedGender = Math.random() > 0.5 ? 'Male' : 'Female';
  }

  const firstPool = resolvedGender === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES;
  const first = getRandomElement(firstPool);
  const last = getRandomElement(LAST_NAMES);

  const firstNameEn = first.en.trim();
  const lastNameEn = last.en.trim();
  const fullNameEn = `${firstNameEn} ${lastNameEn}`;

  const firstNameBn = first.bn.trim();
  const lastNameBn = last.bn.trim();
  const fullNameBn = `${firstNameBn} ${lastNameBn}`;

  return {
    firstName: firstNameEn,
    lastName: lastNameEn,
    fullName: fullNameEn,
    firstNameBn,
    lastNameBn,
    fullNameBn,
    gender: resolvedGender,
  };
}
