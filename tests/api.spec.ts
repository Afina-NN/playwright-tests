import { test, expect } from '@playwright/test';

let userid = "string";


// проект учебный, коммерческого опыта написания API нет
 test('Create_User' , async ({ request }) => {
 const response = await request.post('https://petstore.swagger.io/v2/user', 
    { 
    data: {
             "name": "Nina",
             "job": "baker",
             "city": "Moscow",
             "id": "411"
    },
     headers: {
             "Accept": "application/json"
            }
 });
console.log(await response.json())
expect(response.status()).toBe(200)

const res = await response.json();
userid = res.id;
  
 });

 test('Update_User' , async ({ request }) => {
 const response = await request.put('https://petstore.swagger.io/v2/user/Irina', 
    { 
    data: {
             "name": "Nina",
             "job": "baker",
             "city": "Moscow",
             "id": "411"
    },
     headers: {
             "Accept": "application/json"
            }
 });
console.log(await response.json());
expect(response.status()).toBe(200);  
 });

