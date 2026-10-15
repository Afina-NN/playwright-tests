export const header = {
  accept: 'application/json',
} as const;

export const dataType = {
  string: 'string',
  number: 'number',
} as const;

export const value = {
  token: 'token',
  credentials: {
    name: 'admin',
    password: 'password123',
  },
} as const;

export const regexp = {
  stringValue: /^[A-ZА-ЯЁ][a-zа-яё]*$/,
  dateFormat: /^\d{4}-\d{2}-\d{2}$/,
} as const;
