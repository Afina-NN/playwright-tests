<!-- 1. UI-автотесты 

    1.1 demo.spec.ts - два e2e автотеста на интернет-магазин
    1.2 фикстуры лежат в папке pages, константы в папке constants

2. API-автотесты

tests/
└── API1/
    ├── requests/
    │   ├── authorisation.ts
    │   └── service.ts
    ├── schema/
    │   └── s.authorization.ts
    ├── tests/
    │   ├── authorization.spec.ts
    │   └── service.spec.ts
    └── common.ts


    2.1 Для валидационных схем используется библиотека zod

3. Используется .env (логин и пароль не попадут в репозиторий)

4. .gitignore - файл, в котором прописано, что не надо добавлять в git

5. К проекту прикручен отчет Allure

6. Добавлены плагины Prettier ESlint и Prettier Code formatter

