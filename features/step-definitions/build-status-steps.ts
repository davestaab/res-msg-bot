import { Given, When, Then } from '@cucumber/cucumber';
import { handler } from '../../netlify/functions/process-build-results.js';
import { Context } from '@netlify/functions/dist/function/context.js';
import { BuildStatus, Status } from '../../src/types/BuildStatus.js';
import { deepEqual, equal } from 'assert';
import { parseSimpleTime } from './parameterTypes.js';
import { Event } from '@netlify/functions/dist/function/event.js';
import { getBuildHistoryState, getBuildMsg, getBuildStatusState, setBuildHistoryState, setBuildStatusState, setFriendlyNameState, setId, setWhat, setWhen, setWho } from './world.js';

Given(
  'the build status is currently {buildStatus} by {string} at {simpleTime}',
  async function (what: Status, who, when) {
    setBuildStatusState({
      what,
      when,
      who,
      id: '',
      count: 1,
    });
  }
);
Given(
  'the build status is currently {buildStatus} by {string} at {simpleTime} with a count of {int}',
  async function (what: Status, who, when, count) {
    setBuildStatusState({
      what,
      when,
      who,
      id: '',
      count,
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

Given('the build run had an id of {string}', async function (buildId) {
  setId(buildId);
  // set other values also
  setWho('blah');
  setWhen(new Date().toISOString());
  setWhat(true);
});

Given('the build history is empty', async function () {
  setBuildHistoryState([])
});

Given('the current build history is:', async function (dataTable) {
  const history = dataTable.hashes().map((h: BuildStatus) => ({
    id: '',
    ...h,
    when: parseSimpleTime(h.when),
  }));
  setBuildHistoryState(history);
  if (history.length > 0) setBuildStatusState(history[history.length - 1]);
});

Given('the build status has a count of {int}', async function (count) {
  setBuildStatusState({
    ...getBuildStatusState(),
    count,
  });
});

Given('the build status count is undefined', async function () {
  setBuildStatusState({
    ...getBuildStatusState(),
    count: undefined,
  });
});

When("the build run posts it's results", async function () {
  const buildResult = getBuildMsg();
  const results = await handler(createEvent(buildResult), {} as Context, () => undefined);
  equal(204, results?.statusCode ?? 0);
});

Then(
  'the build status should be {buildStatus} by {string} at {simpleTime}',
  async function (what: Status, who, when) {
    const actual = getBuildStatusState();
    const expected: BuildStatus = {
      who,
      when,
      what,
      id: '',
      count: 1,
    };
    deepEqual(actual, expected);
  }
);

Then('the build status should have an id of {string}', async function (buildId) {
  const status = getBuildStatusState();
  equal(status.id, buildId);
});

Then('the build history should be:', async function (dataTable) {
  const actual = getBuildHistoryState();
  const history = dataTable.hashes().map((h: BuildStatus) => {
    return { id: '', ...h, when: parseSimpleTime(h.when) } as BuildStatus;
  }) as BuildStatus[];
  deepEqual(actual, { history });
});

Then(
  'the build status should be {buildStatus} by {string} at {simpleTime} with a count of {int}',
  async function (what, who, when, count) {
    const actual = getBuildStatusState();
    deepEqual(actual, {
      id: '',
      who,
      what,
      when,
      count,
    });
  }
);

function createEvent<T>(buildResults: T): Event {
  return {
    body: JSON.stringify(buildResults),
  } as Event;
}