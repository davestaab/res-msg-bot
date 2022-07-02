import { Given, When, Then } from '@cucumber/cucumber';
import {
  clearBuildHistory,
  getBuildHistory,
  getBuildStatus,
  setBuildHistory,
  setBuildStatus,
  setFriendlyNameState,
} from '../mocks/handlers';
import { setWho, setWhat, setWhen, getBuildResults, createEvent, setId } from './helpers';
import { handler } from '../../netlify/functions/process-build-results';
import { Context } from '@netlify/functions/dist/function/context';
import { BuildStatus, Status } from '../../src/types/BuildStatus';
import { deepEqual, equal } from 'assert';
import { parseSimpleTime } from './parameterTypes';

//<editor-fold desc="ǴIVENS">
Given(
  'the build status is currently {buildStatus} by {string} at {simpleTime}',
  async function (what: Status, who, when) {
    setBuildStatus({
      what,
      who,
      when,
      id: '',
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
  clearBuildHistory();
});

Given('the current build history is:', async function (dataTable) {
  const history = dataTable.hashes().map((h: BuildStatus) => ({
    ...h,
    when: parseSimpleTime(h.when),
    id: h.id ? h.id : '',
  }));
  setBuildHistory(history);
  if (history.length > 0) setBuildStatus(history[history.length - 1]);
});
//</editor-fold>

//<editor-fold desc="ẂHENS">
When("the build run posts it's results", async function () {
  const buildResult = getBuildResults();
  const results = await handler(createEvent(buildResult), {} as Context, () => undefined);
  equal(204, results?.statusCode ?? 0);
});
//</editor-fold>

//<editor-fold desc="THENS">
Then(
  'the build status is {buildStatus} by {string} at {simpleTime}',
  async function (what: Status, who, when) {
    const actual = getBuildStatus();
    const expected: BuildStatus = {
      who,
      when,
      what,
      id: '',
    };
    deepEqual(expected, actual);
  }
);

Then('the build status has an id of {string}', async function (buildId) {
  const status = getBuildStatus();
  equal(status.id, buildId);
});

Then('the build history is:', async function (dataTable) {
  const actual = getBuildHistory();
  const history = dataTable.hashes().map((h: BuildStatus) => {
    return { id: '', ...h, when: parseSimpleTime(h.when) } as BuildStatus;
  }) as BuildStatus[];
  deepEqual(actual, { history });
});
//</editor-fold>
