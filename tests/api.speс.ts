import { test, expect } from '@playwright/test';

let userid;

 test('Create_User' , async ({ request }) => {
 const response = await request.post('https://petstore.swagger.io/v2/users', 
    { 
    data: {
             "name": "Nina",
             "job": "baker",
             "city": "Moscow"
    },
     headers: {
             "Accept": "application/json"
            }
 });
console.log(await response.json())
expect(response.status()).toBe(201)

const res = await response.json();
userid = res.id;
  
 });