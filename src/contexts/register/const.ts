export const REGISTRATION_STEPS: string[] = [
    'country',
    'account',
    'personal',
    'address',
    'finish'
]

export const REGISTRATION_STEPS_DATA = [
    { key: 'country', label: 'Country' },
    { key: 'account', label: 'Account' },
    { key: 'personal', label: 'Personal' },
    { key: 'address', label: 'Address' },
    { key: 'finish', label: 'Finish' },
];

export const EMAIL_REGEX_CHECK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;