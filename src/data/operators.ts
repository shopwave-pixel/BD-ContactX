import { OperatorCode, OperatorInfo } from '../types';

export const OPERATORS: Record<OperatorCode, OperatorInfo> = {
  GP: {
    code: 'GP',
    name: 'Grameenphone (GP)',
    nameBn: 'গ্রামীণফোন (জিপি)',
    prefixes: ['017', '013'],
    color: '#0070BA',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/60',
    badgeText: 'text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800',
  },
  Robi: {
    code: 'Robi',
    name: 'Robi',
    nameBn: 'রবি',
    prefixes: ['018'],
    color: '#ED1C24',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
  },
  BL: {
    code: 'BL',
    name: 'Banglalink',
    nameBn: 'বাংলালিংক',
    prefixes: ['019', '014'],
    color: '#F37021',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
  },
  Airtel: {
    code: 'Airtel',
    name: 'Airtel',
    nameBn: 'এয়ারটেল',
    prefixes: ['016'],
    color: '#E40000',
    badgeBg: 'bg-red-50 dark:bg-red-950/60',
    badgeText: 'text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800',
  },
  Teletalk: {
    code: 'Teletalk',
    name: 'Teletalk',
    nameBn: 'টেলিটক',
    prefixes: ['015'],
    color: '#28A745',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
  },
};

export const OPERATOR_LIST: OperatorInfo[] = Object.values(OPERATORS);

export function getRandomOperator(): OperatorInfo {
  const keys = Object.keys(OPERATORS) as OperatorCode[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return OPERATORS[randomKey];
}

/**
 * Generate a synthetic Bangladesh mobile number in +8801XXXXXXXXX format
 */
export function generateBdPhoneNumber(operatorCode?: OperatorCode | 'random'): { phone: string; operator: OperatorInfo } {
  let operator: OperatorInfo;
  if (!operatorCode || operatorCode === 'random') {
    operator = getRandomOperator();
  } else {
    operator = OPERATORS[operatorCode] || getRandomOperator();
  }

  // pick one of the operator's official prefixes (e.g., '017' or '013')
  const prefix = operator.prefixes[Math.floor(Math.random() * operator.prefixes.length)];
  // The prefix has 3 digits: '01X'
  // When formatted internationally with +88, it drops the leading 0: '+88' + '01X' -> wait, Bangladesh standard international notation:
  // Country code is +880, then 1XXXXXXXXX, so:
  // e.g. +8801712345678 or +8801812345678
  // Notice: +880 + (1X) + 8 digits = 11 digits national, +880 + 10 digits
  const suffixDigits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
  const phone = `+88${prefix}${suffixDigits}`;

  return { phone, operator };
}
