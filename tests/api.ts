export const header = {
  accept: 'application/json',
};

export const dataType = {
  string: 'string',
  number: 'number',
};

export const value = {
  token: 'token',
  credentials: {
    name: 'admin',
    password: 'password123',
  },
};

export const regexp = {
  stringValue: /^[A-ZА-ЯЁ][a-zа-яё]*$/,
  dateFormat: /^\d{4}-\d{2}-\d{2}$/,
};
