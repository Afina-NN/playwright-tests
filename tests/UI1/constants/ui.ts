const alphabet: string = 'абвгдежзклмнопрстуфхцчэюя';
const ind: number = Math.ceil(Math.random() * 10);

interface User {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const user: User = {
  firstName: 'Ирин'.concat(alphabet[ind]),
  lastName: 'Бугров'.concat(alphabet[ind]),
  postalCode: String(Math.ceil(Math.random() * 1000000)),
};
