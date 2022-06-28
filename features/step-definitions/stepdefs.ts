import { Given, When, Then } from '@cucumber/cucumber';
import { getBuildStatus, setBuildStatus, setFriendlyNameState } from '../mocks/handlers';
import { setWho, setWhat, setWhen, getBuildResults, createEvent } from './helpers';
import { handler } from '../../netlify/functions/process-build-results';
import { Context } from '@netlify/functions/dist/function/context';
import { BuildStatus, Status } from '../../src/types/BuildStatus';
import { deepEqual, equal } from 'assert';

// GIVEN

Given(
  'the build status is currently {buildStatus} by {string} at {simpleTime}',
  async function (what: Status, who, when) {
    setBuildStatus({
      what,
      who,
      when,
    });
  }
);

Given(
  'the build run by {string} at {simpleTime} was {buildResult}',
  async function (who: string, when: string, what: boolean) {
    setWho(who);
    setWhen(when);
    setWhat(what);
  }
);
Given('the friendly name mapping is:', async function (docString) {
  setFriendlyNameState(JSON.parse(docString));
});

// WHEN

When("the build run posts it's results", async function () {
  const buildResult = getBuildResults();
  const results = await handler(createEvent(buildResult), {} as Context, () => undefined);
  equal(204, results?.statusCode ?? 0);
});

// THEN

Then(
  'the build status is {buildStatus} by {string} at {simpleTime}',
  async function (what: Status, who, when) {
    const actual = getBuildStatus();
    const expected: BuildStatus = {
      who,
      when,
      what,
    };
    deepEqual(expected, actual);
  }
);
