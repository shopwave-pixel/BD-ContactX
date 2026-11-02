export type Gender = 'Male' | 'Female';
export type GenderSelection = 'male' | 'female' | 'random';

export type OperatorCode = 'GP' | 'Robi' | 'BL' | 'Airtel' | 'Teletalk';

export interface OperatorInfo {
  code: OperatorCode;
  name: string;
  nameBn: string;
  prefixes: string[];
  color: string;
  badgeBg: string;
  badgeText: string;
}

export interface PostInfo {
  postOffice: string;
  postOfficeBn: string;
  postCode: string;
}

export interface UpazilaInfo {
  name: string;
  nameBn: string;
  postOffices: PostInfo[];
  unions: { en: string; bn: string }[];
}

export interface DistrictInfo {
  name: string;
  nameBn: string;
  upazilas: UpazilaInfo[];
}

export interface DivisionInfo {
  name: string;
  nameBn: string;
  districts: DistrictInfo[];
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  firstNameBn: string;
  lastNameBn: string;
  fullNameBn: string;
  gender: Gender;
  phone: string;
  operator: string;
  operatorBn: string;
  operatorCode: OperatorCode;
  division: string;
  divisionBn: string;
  district: string;
  districtBn: string;
  upazila: string;
  upazilaBn: string;
  union: string;
  unionBn: string;
  village: string;
  villageBn: string;
  postOffice: string;
  postOfficeBn: string;
  postCode: string;
  fullAddress: string;
  fullAddressBn: string;
  createdAt: number;
}

export interface GeneratorFilters {
  gender: GenderSelection;
  operator: OperatorCode | 'random';
  division: string | 'random';
  district: string | 'random';
  upazila: string | 'random';
  nameScript: 'en' | 'bn';
}
