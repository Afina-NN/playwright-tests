import { APIRequestContext, expect } from "@playwright/test";
import { header } from "../common.ts";

type HttpMethod = "get" | "post" | "put" | "delete";

export async function apiRequest<T>(
  request: APIRequestContext,
  method: HttpMethod,
  path: string,
  data?: T,
  params?: URLSearchParams,
  token?: string,
) {
  return request[method](`${process.env.URL}/${path}`, {
    ...(data ? { data } : {}),
    ...(params && { params }),
    headers: {
      Accept: header.accept,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}

export const letterToLowerCase = "abcdefghijklmnopqrstuvwxyz";
export const letterToUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const symbol = "!#$*";

export const domains = ["ya.ru", "gmail.com"];

export function generateEmail() {
  return (
    Math.floor(Math.random() * 100000000) +
    letterToLowerCase[Math.floor(Math.random() * 26)] +
    letterToUpperCase[Math.floor(Math.random() * 26)] +
    "@" +
    domains[Math.floor(Math.random() * domains.length)]
  );
}

export const emailToUpperCase =
  letterToUpperCase[Math.floor(Math.random() * 26)] +
  letterToUpperCase[Math.floor(Math.random() * 26)] +
  "@" +
  "YA.RU";

export function generatePassword() {
  return (
    Math.floor(Math.random() * 900000) +
    100000 +
    letterToLowerCase[Math.floor(Math.random() * 26)] +
    letterToUpperCase[Math.floor(Math.random() * 26)] +
    symbol[Math.floor(Math.random() * 4)]
  );
}

export const value = {
  token: "token",
  credentials: {
    name: "admin",
    password: "password123",
  },
  error: {
    invalid_email: "INVALID_EMAIL",
    weak_password: "WEAK_PASSWORD",
    duplicate: "EMAIL_ALREADY_REGISTERED",
    invalid_accountType: "INVALID_ACCOUNT_TYPE",
  },
  ok: "ok",
  ready: "ready",
  applicant: "applicant",
  employer: "employer",
} as const;

export const positiveRegistration = [
  {
    account_type: value.applicant,
    expectedType: value.applicant,
    pass: generatePassword(),
  },
  // 9 символов, чтобы проверить граничное значение
  {
    account_type: value.employer,
    expectedType: value.employer,
    pass: "Passw123!",
  },
];

export const negativeRegistrationWrongEmail = [
  { wrongEmail: "testya.ru", expectedTest: "почта без @" },
  { wrongEmail: "test@yaru", expectedTest: "почта без точки" },
  { wrongEmail: "@ya.ru", expectedTest: "без текста до @" },
  { wrongEmail: "", expectedTest: "пустое поле" },
  { wrongEmail: "         ", expectedTest: "только пробелы" },
];

export const negativeRegistrationWrongPassword = [
  { wrongPassword: "1Av!000", expectedTest: "7 символов" },
  { wrongPassword: "1*!123000", expectedTest: "без букв" },
  { wrongPassword: "A*!v&Hhgfrd", expectedTest: "без цифр" },
  { wrongPassword: "AvHhgfrdS", expectedTest: "без символов" },
  { wrongPassword: "ASA!*93745454", expectedTest: "только верхний регистр" },
  { wrongPassword: "asa!*93745454", expectedTest: "только нижний регистр" },
  { wrongPassword: "aЩa!*93745454", expectedTest: "русские буквы" },
];

export const negativeRegistrationWrongAccountType = [
  { wrongAccountType: "recruiter", expectedTest: "другой тип" },
  { wrongAccountType: "", expectedTest: "пустая строка" },
  { wrongAccountType: "         ", expectedTest: "9 пробелов" },
  { wrongAccountType: "null", expectedTest: "значение null" },
  { wrongAccountType: "undefined", expectedTest: "значение undefined" },
  // TODO нужно добавлять еще какие-то проверки?
];

// TODO переписать функцию
export async function createVerifiedUser(request: APIRequestContext) {
  const email = generateEmail();
  const password = generatePassword();

  // registration
  const registerResponse = await apiRequest(
    request,
    "post",
    "v1/auth/register",
    {
      email,
      password,
      account_type: "applicant",
    },
  );

  expect(registerResponse.status()).toBe(201);

  const registerBody = await registerResponse.json();

  //console.log(registerBody);

  // verify
  const verifyResponse = await apiRequest(
    request,
    "post",
    "v1/auth/verify-email",
    {
      token: registerBody.verify_token,
    },
  );

  const verifyBody = await verifyResponse.json();
  //console.log(verifyBody);

  expect(verifyResponse.status()).toBe(200);

  // login
  const loginResponse = await apiRequest(request, "post", "v1/auth/login", {
    email,
    password,
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  //console.log(loginBody)

  return {
    email,
    password,
    verifyToken: registerBody.verify_token,
    accessToken: loginBody.access_token,
  };
}

// TODO переписать функцию, объединить с createVerifiedUser
export async function userRegistration(request: APIRequestContext) {
  const email = generateEmail();
  const password = generatePassword();

  // registration
  const registerResponse = await apiRequest(
    request,
    "post",
    "v1/auth/register",
    {
      email,
      password,
      account_type: "applicant",
    },
  );
  expect(registerResponse.status()).toBe(201);

  const registerBody = await registerResponse.json();

  return {
    email,
    password,
    verifyToken: registerBody.verify_token,
  };
}

// TODO переписать функцию, объединить с createVerifiedUser
export async function verifyUser(request: APIRequestContext) {
  const email = generateEmail();
  const password = generatePassword();

  // registration
  const registerResponse = await apiRequest(
    request,
    "post",
    "v1/auth/register",
    {
      email,
      password,
      account_type: "applicant",
    },
  );
  expect(registerResponse.status()).toBe(201);

  const registerBody = await registerResponse.json();

  //console.log(registerBody);

  // verify
  const verifyResponse = await apiRequest(
    request,
    "post",
    "v1/auth/verify-email",
    {
      token: registerBody.verify_token,
    },
  );

  const verifyBody = await verifyResponse.json();
  //console.log(verifyBody);

  expect(verifyResponse.status()).toBe(200);

  return {
    email,
    password,
  };
}
