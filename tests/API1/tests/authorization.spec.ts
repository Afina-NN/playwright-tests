import { test, expect } from "@playwright/test";
import { regexp, header, dataType } from "..common.ts";
import {
  createVerifiedUser,
  generateEmail,
  generatePassword,
  negativeRegistrationWrongAccountType,
  negativeRegistrationWrongPassword,
  userRegistration,
  verifyUser,
} from "../requests/authorization";
import "dotenv/config";
import {
  apiRequest,
  value,
  positiveRegistration,
  negativeRegistrationWrongEmail,
} from "../requests/authorization";
import {
  emailVerificationSchema,
  ErrorVerificationSchema,
  positiveSchema,
  errorSchema,
  errorResendVerificationSchema,
  LoginResponseSchema,
  refreshSchema,
  errorResfreshSchema,
  logoutResponseSchema,
  logoutErrorResponseSchema,
  jwksSchema,
  forgotPasswordSchema,
  ResetPasswordSchema,
  ErrorResetSchema,
} from "../schema/s_authorisation";

// позитивные тесты на регистрацию с account type: applicant, employer. Пароль 8 символов, 9 символов
for (const { account_type, expectedType, pass } of positiveRegistration) {
  test(`Positive registration ${expectedType}`, async ({ request }) => {
    const email = generateEmail();
    const RegistrationResponse = await apiRequest(
      request,
      "post",
      "v1/auth/register",
      {
        email,
        password: pass,
        account_type: account_type,
      },
    );

    const body = await RegistrationResponse.json();

    // Валидация статуса
    expect(RegistrationResponse.status()).toBe(201);

    // Валидация заголовка в ответе
    expect(RegistrationResponse.headers()[header.contentType]).toBe(
      header.accept,
    );

    // проверка схемы
    positiveSchema.parse(body);

    // регулярка на UUID, проверяет в т.ч., что строки непустые
    expect(body.account_id).toMatch(regexp.UUID);

    // регулярка на почту, проверяет в т.ч., что строки непустые
    expect(body.email).toBe(email.toLowerCase());

    // Валидация account type
    expect(body.account_type).toBe(expectedType);

    console.log(RegistrationResponse);
    console.log(body);
    console.log(pass);
    // TODO переписать с учетом требований к почте и паролю
  });
}

// отрицательные тесты_некорректный account type
for (const {
  wrongAccountType,
  expectedTest,
} of negativeRegistrationWrongAccountType) {
  test(`Negative registration_wrong_account type_${expectedTest}`, async ({
    request,
  }) => {
    const email = generateEmail();
    const password = generatePassword();
    const RegistrationResponse = await apiRequest(
      request,
      "post",
      "v1/auth/register",
      {
        email,
        password,
        account_type: wrongAccountType,
      },
    );
    const body = await RegistrationResponse.json();

    // Валидация статуса
    expect(RegistrationResponse.status()).toBe(400);

    // Валидация заголовка в ответе
    const contentType = RegistrationResponse.headers()[header.contentType];
    expect(contentType).toContain(header.accept);

    // проверка схемы
    errorSchema.parse(body);

    // Валидация кода ошибки
    expect(body.error.code).toBe(value.error.invalid_accountType);

    // TODO как валидировать сообщения в message

    // валидация, что сообщее не пустое
    expect(body.error.message.length).toBeGreaterThan(5);

    // message не состоит из пробелов
    expect(body.error.message.trim()).not.toBe(" ");

    // вывести респонс
    console.log(RegistrationResponse);
    console.log(body);
  });
}

// отрицательные тесты_некорректная почта
for (const { wrongEmail, expectedTest } of negativeRegistrationWrongEmail) {
  test(`Negative registration_wrong email_ ${expectedTest}`, async ({
    request,
  }) => {
    const password = generatePassword();
    const RegistrationResponse = await apiRequest(
      request,
      "post",
      "v1/auth/register",
      {
        email: wrongEmail,
        password,
        account_type: value.applicant,
      },
    );
    const body = await RegistrationResponse.json();

    // Валидация статуса
    expect(RegistrationResponse.status()).toBe(400);

    // Валидация заголовка в ответе
    const contentType = RegistrationResponse.headers()[header.contentType];
    expect(contentType).toContain(header.accept);

    // проверка схемы
    errorSchema.parse(body);

    // Валидация кода ошибки
    expect(body.error.code).toBe(value.error.invalid_email);

    // TODO как валидировать сообщения в message

    // валидация, что сообщее не пустое
    expect(body.error.message.length).toBeGreaterThan(5);

    // message не состоит из пробелов
    expect(body.error.message.trim()).not.toBe("");

    // вывести респонс
    console.log(RegistrationResponse);
    console.log(body);

    // TODO  test('Registration_incorrect_email_меньше min длины', async ({ request }) => {});
    // TODO  test('Registration_incorrect_email_больше max длины', async ({ request }) => {});
    //   test('Registration_incorrect_email_пробелы в начале и в конце', async ({ request }) => {});
    //   test('Registration_incorrect_email_запрещенные спецсимволы', async ({ request }) => {});
    //   test('Registration_incorrect_email_почта в верхнем регистре', async ({ request }) => {});
  });
}

// отрицательный тест_дубликат почты
test("Negative registration_duplicate", async ({ request }) => {
  const password = generatePassword();
  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/register",
    {
      email: "afina-nn.bugrova@yandex.ru",
      password,
      account_type: value.applicant,
    },
  );
  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(409);

  // Валидация заголовка в ответе
  const contentType = RegistrationResponse.headers()[header.contentType];
  expect(contentType).toContain(header.accept);

  // проверка схемы
  errorSchema.parse(body);

  // Валидация кода ошибки
  expect(body.error.code).toBe(value.error.duplicate);

  // валидация, что сообщение не пустое
  expect(body.error.message.length).toBeGreaterThan(5);

  // message не состоит из пробелов
  expect(body.error.message.trim()).not.toBe("");

  // вывести респонс
  console.log(RegistrationResponse);
  console.log(body);
});

// отрицательные тесты_некорректный пароль:
for (const {
  wrongPassword,
  expectedTest,
} of negativeRegistrationWrongPassword) {
  test(`Negative registration ${expectedTest}`, async ({ request }) => {
    const email = generateEmail();
    const RegistrationResponse = await apiRequest(
      request,
      "post",
      "v1/auth/register",
      {
        email,
        password: wrongPassword,
        account_type: value.employer,
      },
    );
    const body = await RegistrationResponse.json();

    // Валидация статуса
    expect(RegistrationResponse.status()).toBe(400);

    // Валидация заголовка в ответе
    const contentType = RegistrationResponse.headers()[header.contentType];
    expect(contentType).toContain(header.accept);

    // проверка схемы
    errorSchema.parse(body);

    // Валидация кода ошибки
    expect(body.error.code).toBe(value.error.weak_password);

    // TODO как валидировать сообщения в message

    // валидация, что сообщее не пустое
    expect(body.error.message.length).toBeGreaterThan(5);

    // message не состоит из пробелов
    expect(body.error.message.trim()).not.toBe("");

    // вывести респонс
    console.log(RegistrationResponse);
    console.log(body);
  });
}

// верификация почты_позитивные тесты
test("Email_verification_positive", async ({ request }) => {
  const user = await userRegistration(request);

  const token = user.verifyToken;
  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/verify-email",
    {
      token: token,
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(200);

  // проверка схемы
  emailVerificationSchema.parse(body);

  console.log(RegistrationResponse);
  console.log(body);
  console.log(user.password);
});

// верификация почты_отрицательные тесты
test("Email_verification_negative", async ({ request }) => {
  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/verify-email",
    {
      token: "sZSXw0SWyYXWjj3CQ84CyOinbCo39QGY_3tj319mCrU",
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(400);

  // проверка схемы
  ErrorVerificationSchema.parse(body);

  console.log(RegistrationResponse);
  console.log(body);
});

// Повторно отправить письмо на почту_положительные тесты_без верификации
test("Resend verification_positive", async ({ request }) => {
  const user = await userRegistration(request);

  const email = user.email;

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/resend-verification",
    {
      email: email,
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(202);

  // проверка типа
  expect(typeof body.message).toBe(dataType.string);

  console.log(RegistrationResponse);
  console.log(body);
});

// Повторно отправить письмо на почту_отрицательные тесты
test("Resend verification_negative", async ({ request }) => {
  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/resend-verification",
    {
      email: "1234675675",
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(400);

  // проверка схемы
  errorResendVerificationSchema.parse(body);

  console.log(RegistrationResponse);
  console.log(body);
});

// Авторизация_положительный тест
test("Login_positive", async ({ request }) => {
  const user = await verifyUser(request);

  const email = user.email;
  const password = user.password;

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/login",
    {
      email: email,
      password: password,
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(200);

  // проверка схемы
  LoginResponseSchema.parse(body);

  console.log(RegistrationResponse);
  console.log(body);
  console.log(password);
});

// Авторизация_негативный тест 401 и 403 без схемы
test("Login_negative", async ({ request }) => {
  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/login",
    {
      email: "69909890lh@gmail.com",
      password: "851290fE#",
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(401);

  // проверка схемы

  console.log(RegistrationResponse);
  console.log(body);
});

// Получить текущую сессию и данные аккаунта_позитивный тест (проверить employer и applicant)
test("Get session_positive", async ({ request }) => {
  const user = await createVerifiedUser(request);

  const RegistrationResponse = await apiRequest(
    request,
    "get",
    "v1/auth/me",
    undefined,
    undefined,
    user.accessToken,
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(200);

  // проверка схемы
  emailVerificationSchema.parse(body);
  console.log(RegistrationResponse);
  console.log(body);
});

// TODO проверить когда заработает стенд
// Получить текущую сессию и данные аккаунта_негативный тест
test("Get session_negative", async ({ request }) => {
  const accessToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6Im1WcnNLQ0dnWEFaU29ZeTlEb0t6QUUtdEViSGZ0aUlybEN0V1llUmRSTkEiLCJ0eXAiOiJKV1QifQ.eyJlbWFpbCI6Ijc3ODk4NjcydWNAZ21haWwuY29tIiwiYWNjb3VudF90eXBlIjoiYXBwbGljYW50IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh1bnRlZS1hdXRoIiwic3ViIjoiYzAyYzdhZjUtYTRiYy00NDI0LWFlMzAtZTY4MzRiMzU3NDk0IiwiYXVkIjpbImh1bnRlZS1hcGkiXSwiZXhwIjoxNzg1NDIwNDE1LCJpYXQiOjE3ODU0MTk1MTUsImp0aSI6ImE2OTEwZTA4LTUwNDItNDg0MC1hZmMwLWFkM2RlZmM2YTg4MiJ9.ZCFSSmDr5oaKfwlUfWfXJKWWHh6BafoBhBBnKAFokAKaQEeCTnokQfL0yQz90njMp4EYSqGtwtWu782U0TTWWtC2ALzqNsOAhl6ny_U63a-Jkkzywlk3u-2m_HeH4U9lCzI4MCgpje0Sb3bYpyYtwN_CpTS7mFpXWgFQJudLGZnnEZ650A_eE1pVsyP2tsbVk1lt9vZh67vKlhyN1ogC6jf-lFNYhpEyFKSj142YISKCHSegagTTNxiLsBYbvPWPkxyGEqxHKXDpNejQE3UXCSg2HnT14lAS3rdV2IUvvF01YHzWXB4A9hRqbpTwVuorAyRJsNSnp8egmBh2vZV-vQ";

  const RegistrationResponse = await apiRequest(
    request,
    "get",
    "v1/auth/me",
    undefined,
    undefined,
    accessToken,
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(401);

  // проверка схемы
  emailVerificationSchema.parse(body);
  console.log(RegistrationResponse);
  console.log(body);
});

// Обновить access-token и ротировать refresh-token
test("Refresh_positive", async ({ request }) => {
  await createVerifiedUser(request);

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/refresh",
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(200);

  // проверка схемы
  refreshSchema.parse(body);

  console.log(RegistrationResponse);
  console.log(body);
});

// Обновить access-token и ротировать refresh-token_негативный тест
test("Refresh_negative", async ({ request }) => {
  //const user = await createVerifiedUser(request)

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/refresh",
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(401);

  // проверка схемы
  errorResfreshSchema.parse(body);

  console.log(RegistrationResponse);
  console.log(body);
});

// Отозвать refresh-token_позитивный
test("Logout_positive", async ({ request }) => {
  const user = await createVerifiedUser(request);

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/logout",
    undefined,
    undefined,
    user.accessToken,
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(200);

  // проверка схемы
  logoutResponseSchema.parse(body);

  console.log(RegistrationResponse);
  console.log(body);
});

// после logout refresh больше не работает.
// TODO Когда решатся проблемы со стендом, проверить боди
test("Logout_negative1", async ({ request }) => {
  const user = await createVerifiedUser(request);

  // request уже содержит refresh_token

  const logoutResponse = await apiRequest(
    request,
    "post",
    "v1/auth/logout",
    undefined,
    undefined,
    user.accessToken,
  );

  expect(logoutResponse.status()).toBe(200);

  // пробуем refresh
  const refreshResponse = await apiRequest(
    request,
    "post", // или "get" — зависит от вашего API
    "v1/auth/refresh",
  );

  expect(refreshResponse.status()).toBe(401);
  console.log(logoutResponse);
});

// Отозвать refresh-token_негативный.
// TODO Когда решатся проблемы со стендом, проверить боди
test("Logout_negative", async ({ request }) => {
  //const user = await createVerifiedUser(request)

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "v1/auth/logout",
    undefined,
    undefined,
    //  user.accessToken,
  );

  // const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(401);

  // проверка схемы
  // logoutErrorResponseSchema.parse(body);

  console.log(RegistrationResponse);
  // console.log(body);
  const text = await RegistrationResponse.text();

  console.log(text);
});

// Получить публичные ключи в формате JWT
test("Public key JWT as JWKS", async ({ request }) => {
  const RegistrationResponse = await apiRequest(
    request,
    "get",
    ".well-known/jwks.json",
    undefined,
    undefined,
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(200);

  // проверка схемы
  jwksSchema.parse(body);

  // проверка заголовка

  console.log(RegistrationResponse);
  console.log(body);
  console.log(body.keys[0].kid);
});

// Запросить письмо для сброса пароля_позитивный
test("Forgot password_positive", async ({ request }) => {
  const user = await createVerifiedUser(request);
  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "/v1/auth/password/forgot",
    {
      email: user.email,
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(202);

  // проверка схемы
  forgotPasswordSchema.parse(body);

  // проверка заголовка

  console.log(RegistrationResponse);
  console.log(body);
});

// Сравнить респонсы существующего пользователя с несуществующим
test("Forgot password does not reveal account existence", async ({
  request,
}) => {
  const existingUser = await createVerifiedUser(request);

  // существующий email
  const existingResponse = await apiRequest(
    request,
    "post",
    "/v1/auth/password/forgot",
    {
      email: existingUser.email,
    },
  );
  console.log(existingResponse);

  const existingBody = await existingResponse.json();

  // несуществующий email
  const fakeResponse = await apiRequest(
    request,
    "post",
    "/v1/auth/password/forgot",
    {
      email: "unknown_user_12345@test.com",
    },
  );

  const fakeBody = await fakeResponse.json();

  expect(existingResponse.status()).toBe(202);

  expect(fakeResponse.status()).toBe(202);

  expect(existingBody.message).toBe(fakeBody.message);

  console.log(existingBody.message);
  console.log(fakeBody.message);
});

// Запросить письмо для сброса пароля_негативный
test("Forgot password_negative", async ({ request }) => {
  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "/v1/auth/password/forgot",
    {
      email: "test@",
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(400);

  // проверка схемы
  errorResendVerificationSchema.parse(body);

  // проверка заголовка

  console.log(RegistrationResponse);
  console.log(body);
});

// Сбросить пароль_позитивный
test("Reset password_positive", async ({ request }) => {
  const password = generatePassword();

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "/v1/auth/password/reset",
    {
      //reset токен из кейса "Forgot password_positive"
      token: "LGpe4iR0D056mwYTxv_wsoYYSgICCOZEWqs_wxLIE44",
      new_password: password,
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(200);

  // проверка схемы
  ResetPasswordSchema.parse(body);

  // проверка заголовка

  console.log(RegistrationResponse);
  console.log(body);
});

// Сбросить пароль_негативный
test("Reset password_negative", async ({ request }) => {
  const user = await userRegistration(request);

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "/v1/auth/password/reset",
    {
      token: "bQtZqJRGNS5IdIWP5J61rjS4Mrgtz74zGdrc9yj1SqE",
      new_password: "Avv123!!",
    },
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(400);

  // проверка схемы
  ErrorResetSchema.parse(body);

  // проверка заголовка

  console.log(RegistrationResponse);

  console.dir(body, { depth: null });
});

// Изменить пароль_позитивный
test("Change password_positive", async ({ request }) => {
  const user = await createVerifiedUser(request);
  const password = generatePassword();
  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "/v1/auth/password/change",
    {
      current_password: user.password,
      new_password: password,
    },
    undefined,
    user.accessToken,
  );

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(200);

  // проверка схемы
  ResetPasswordSchema.parse(body);

  // проверка заголовка

  console.log(RegistrationResponse);
  console.log(body);
  console.log(user.accessToken);
});

// Изменить пароль_негативный
test("Change password_negative", async ({ request }) => {
  const user = await createVerifiedUser(request);

  const RegistrationResponse = await apiRequest(
    request,
    "post",
    "/v1/auth/password/change",
    {
      current_password: user.password,
      new_password: "876307aU*",
    },
    undefined,
    "eyJhbGciOiJSUzI1NiIsImtpZCI6Im1WcnNLQ0dnWEFaU29ZeTlEb0t6QUUtdEViSGZ0aUlybEN0V1llUmRSTkEiLCJ0eXAiOiJKV1QifQ.eyJlbWFpbCI6Ijk4NTczODI3c2lAeWEucnUiLCJhY2NvdW50X3R5cGUiOiJhcHBsaWNhbnQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHVudGVlLWF1dGgiLCJzdWIiOiI1Mjk0OWQwYi1mNjY3LTRiNjUtYmRlNC1mNTYxMmY3NjcwMDQiLCJhdWQiOlsiaHVudGVlLWFwaSJdLCJleHAiOjE3ODU5NDczMzksImlhdCI6MTc4NTk0NjQzOSwianRpIjoiNTBkYWMyYmUtZWE4MC00ZjU2LTg5ZDItZmQwOWJlYjRmMjRiIn0.iU5HnYfn4i-R7_Z-KA1g2VpuHANdjRq7A4N6dvskR3N6ScyLc7qQNpGhHB3GfWRm7J4MCXlVeRUSxh-3IthstYaPjj2TttXktpugNG96q0Fyq3U3o_3e6R74IOVlD5l_yXw5uPifcmlyTSn-AYn6_5ZjkKAqMq5wiLDQZLlcIMNpAGYFOVDq6xUYK_A5S11cT6E2r3IFy9nJlwHwNtenlD1pAxhR-m2c1c6Pnfdzb-nhWffUqvJmxU0IPEXBibGZmTa3z2o7_z_D1NnN1100SpMyoTCwUQjq6UarWDqjOpLEoEaRyK9T-CXs2rVkpUxzjXLUPu-KSuuQ5qrQkHGAOQ",
  );

  console.log(user.accessToken);

  const body = await RegistrationResponse.json();

  // Валидация статуса
  expect(RegistrationResponse.status()).toBe(401);

  // проверка схемы
  //ResetPasswordSchema.parse(body);

  // проверка заголовка

  console.log(RegistrationResponse);
  //console.log(body);

  console.dir(body, { depth: null });
});

