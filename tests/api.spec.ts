import { test, expect } from '@playwright/test';
import { dataType, value, regexp, header } from './api.ts';
import 'dotenv/config';
import { z } from 'zod';

test('Create_token', async ({ request }) => {
  const response = await request.post(`${process.env.URL}auth`, {
    data: {
      username: process.env.USERNAME1,
      password: process.env.PASSWORD1,
    },
    headers: {
      Accept: header.accept,
    },
  });

  // * вывести body в консоль
  console.log(await response.json());
  //  * валидация респонса
  // ** валидация статуса
  expect(response.status()).toBe(200);
  const body = await response.json();
  // **  содержит token
  expect(body).toHaveProperty(value.token);
  // ** тип данных строка
  expect(typeof body.token).toBe(dataType.string);
  // ** длина токена
  expect(body.token.length).toBeGreaterThanOrEqual(15);
});

test('Get_Booking', async ({ request }) => {
  const response = await request.get(`${process.env.URL}booking/1`, {
    headers: {
      Accept: header.accept,
    },
  });
  const body = await response.json();
  // схема
  const BookingSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    totalprice: z.number(),
    depositpaid: z.boolean(),
    bookingdates: z.object(),
    additionalneeds: z.string().optional(),
  });
  // вывести респонс
  console.log(await response.json());
  // валидация статуса
  expect(response.status()).toBe(200);
  // проверка схемы
  BookingSchema.parse(body);
  // регулярка на имя и фамилию, проверяет в т.ч., что строки непустые
  expect(body.firstname).toMatch(regexp.stringValue);
  expect(body.lastname).toMatch(regexp.stringValue);

  // * totalprice
  // ** проверка значения
  expect(body.totalprice).toBeLessThanOrEqual(1000);
  // ** проверка длины
  expect(String(body.totalprice).length).toBeGreaterThanOrEqual(3);

  // * проверка дат
  // ** checkin
  expect(body.bookingdates.checkin).toMatch(regexp.dateFormat);
  // ** checkout
  expect(body.bookingdates.checkout).toMatch(regexp.dateFormat);

  // ** проверка, что checkout старше checkin
  const dateStr1 = body.bookingdates.checkin;
  const dateStr2 = body.bookingdates.checkout;

  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  if (date1.getTime() < date2.getTime()) {
    console.log('checkout старше checkin — всё правильно.');
  } else {
    throw new Error('checkout должен быть позже checkin!');
  }
});
