import { Handler } from '@netlify/functions';
import { BuildStatus, Status } from '../../src/types/BuildStatus';
import { BuildResults } from '../../src/types/BuildResults';
import { getCurrentStatus, setCurrentStatus, getFriendlyNameMap } from '../pantryClient';

const succeededStatus = 'succeeded';
const handler: Handler = async (event) => {
  const content = JSON.parse(event.body ?? '') as BuildResults;
  const { status: newStatus, buildNumber } = content.resource;
  const changedBy = await changedByName(content);
  const currentStatus = await getCurrentStatus();
  const updateStatus = updateStatusFactory(changedBy, content.createdDate, buildNumber);
  // compare newStatus to current status
  // case 1: do nothing if newStatus matches currentStatus
  if (
    (newStatusGood(newStatus) && currentStatusGood(currentStatus)) ||
    (newStatusBad(newStatus) && currentStatusBad(currentStatus))
  ) {
    // no change in status, increment count and save
    await setCurrentStatus({
      ...currentStatus,
      count: currentStatus.count ? currentStatus.count + 1 : 2,
    });
  } else if (currentStatusBad(currentStatus)) {
    // good news it's fixed! but is it fixed or just poop-smithed?
    if (changedBy === currentStatus.who) {
      // just poopsmithed
      await setCurrentStatus(updateStatus(Status.POOPSMITH));
    } else {
      // high paise!! 🙌
      await setCurrentStatus(updateStatus(Status.FIXED));
    }
  } else if (currentStatusGood(currentStatus)) {
    // oh boy, someone has the golden poo
    await setCurrentStatus(updateStatus(Status.BORKD));
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

function updateStatusFactory(who: string, when?: string, id?: string) {
  if (!when) throw 'updateStatusFactory: when argument missing';
  return (what: Status): BuildStatus => {
    return {
      what,
      who,
      when,
      id,
      count: 1,
    };
  };
}
