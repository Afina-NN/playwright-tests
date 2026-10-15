import { APIRequestContext, expect } from "@playwright/test";
import { header, dataType } from "../common.ts";

export async function checkEndpoint(
  request: APIRequestContext,
  endpoint: string,
  expectedStatus: string,
) {
  const response = await request.get(`${process.env.URL}//${endpoint}`);

  // валидация статуса
  expect(response.status()).toBe(200);

  interface serviceResponse {
    status: string;
  }

  const body = (await response.json()) as serviceResponse;

  expect(body).toEqual({
    status: expectedStatus,
  });

  // тип данных строка
  expect(typeof body.status).toBe(dataType.string);

  // валидация заголовка в респонсе
  expect(response.headers()[header.contentType]).toContain(header.accept);

  console.log(body);
  console.log(response);
}

