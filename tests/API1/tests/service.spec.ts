import { test } from "@playwright/test";
import "dotenv/config";
import { checkEndpoint, value } from "../requests/service";

// Проверка доступности сервера
test("Server access check", async ({ request }) => {
  await checkEndpoint(request, "healthz", value.ok);
});

// Проверка готовности сервера
test("Server readiness check", async ({ request }) => {
  await checkEndpoint(request, "readyz", value.ready);
});
