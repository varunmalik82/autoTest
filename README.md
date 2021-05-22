### Set up
install the latest node js
Once you have downloaded or cloned the repo you need to install the dependencies for the API. We do this using `npm`.

```cli
npm install
```

### Run the test suite

```cli
if OS is mac
npm test
```

### Run individual test
Individual tests can be run from cli by supplying the required params to the api test. e.g. below command will execute `Validate Api Key` test (first test from `specs\e2eTest.js`).
```cli
npx mocha specs/e2eTest.js -g 'Validate Api Key' --reporter mochawesome
```
Similar to above if you want to `Add New Gift Card` you can run the follwing command

```cli
token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE2MjEzMDc2NTgxODYsImlhdCI6MTYyMTMyMjY1OX0.JOist0Jx8wVxp5ubkNTH7vkjHXrOcxpbBXT7DIoZNUM' npx mocha specs/e2eTest.js -g 'Add New Gift Card' --reporter mochawesome	
```

### Report
After execution of tests `mochawesome` report is generated and it can located in the `mochawesome-report\mochawesome.html` folder

### logs
Test Execution logs request/response of api's are logged in the `logs\api.log`

### Test Execution images

`Execution from command line`

![cliExecution](https://user-images.githubusercontent.com/17876410/119212249-145d2f00-ba85-11eb-8f87-dfe9fb568b24.jpg)

`Failed Test Screen Print`

![failTest](https://user-images.githubusercontent.com/17876410/119212251-16bf8900-ba85-11eb-9fda-af9012ec2b4d.jpg)

`Pass Test Screen Print`

![passTest](https://user-images.githubusercontent.com/17876410/119212252-18894c80-ba85-11eb-85f2-aa9b59844916.jpg)



