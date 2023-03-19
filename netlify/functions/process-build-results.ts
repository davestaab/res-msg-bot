import { Handler } from '@netlify/functions';
import { BuildStatus, ScenarioBranch, Status } from '../../src/types/BuildStatus.js';
import { BuildResults } from '../../src/types/BuildResults.js';
import {
  getCurrentStatus,
  getFriendlyNameMap,
  setNewCurrentStatus,
  updateCurrentStatus,
} from '../botClient.js';

const succeededStatus = 'succeeded';
const handler: Handler = async (event) => {
  const content = JSON.parse(event.body ?? '') as BuildResults;
  const { status: newStatus, buildNumber } = content.resource;
  debugger;
  const changedBy = await changedByName(content);
  const getVersion = content.resource.sourceGetVersion;
  const [_, branch, _commit] = getVersion.split(':');
  const currentStatus = await getCurrentStatus(branchName(branch));
  const updateStatus = updateStatusFactory(changedBy, branchName(branch), content.createdDate, buildNumber);
  // compare newStatus to current status
  // case 1: do nothing if newStatus matches currentStatus
  if (
    (newStatusGood(newStatus) && currentStatusGood(currentStatus)) ||
    (newStatusBad(newStatus) && currentStatusBad(currentStatus))
  ) {
    // no change in status, increment count and save
    await updateCurrentStatus({
      ...currentStatus,
      count: currentStatus.count ? currentStatus.count + 1 : 2,
    });
  } else if (currentStatusBad(currentStatus)) {
    // good news it's fixed! but is it fixed or just poop-smithed?
    if (changedBy === currentStatus.who) {
      // just poopsmithed
      await setNewCurrentStatus(updateStatus(Status.POOPSMITH), currentStatus);
    } else {
      // high paise!! 🙌
      await setNewCurrentStatus(updateStatus(Status.FIXED), currentStatus);
    }
  } else if (currentStatusGood(currentStatus)) {
    // oh boy, someone has the golden poo
    await setNewCurrentStatus(updateStatus(Status.BORKD), currentStatus);
  }
  return {
    statusCode: 204,
  };
};

export { handler };

function currentStatusGood({ what }: BuildStatus) {
  return what === Status.FIXED || what === Status.POOPSMITH;
}

function currentStatusBad(status: BuildStatus) {
  return !currentStatusGood(status);
}

function newStatusGood(status: string | undefined) {
  return status === succeededStatus;
}

function newStatusBad(status: string | undefined) {
  return !newStatusGood(status);
}

async function changedByName(content: BuildResults) {
  const nameMap = await getFriendlyNameMap();
  const name = content.resource.requests[0].requestedFor.uniqueName ?? 'unknown';
  return nameMap[name] ?? name;
}

function updateStatusFactory(who: string, branch: ScenarioBranch, when?: string, id?: string) {
  if (!when) throw 'updateStatusFactory: when argument missing';
  return (what: Status): BuildStatus => {
    return {
      what,
      who,
      when,
      id,
      count: 1,
      branch
    };
  };
}
/**
 * 
 * @param branch 
 * @returns 
 */
function branchName(branch: string): ScenarioBranch {
  const parts = branch.split('/');
  return [parts[parts.length - 2], parts[parts.length-1]].join('/') as ScenarioBranch;
}