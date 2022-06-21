import { Given, When, Then } from '@cucumber/cucumber';
import { setBuildStatus } from "../../netlify/mocks/handlers";

// GIVEN

Given('the current test status is', function (docString) {
  setBuildStatus(JSON.parse(docString));
});

Given('the build run is by {string}', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('the build run is {string}', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('the build run happens at {string}', async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

// WHEN

When('the build run posts it\'s results', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

// THEN

Then('the current test status is:', async function (docString) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
