import {Handler} from "@netlify/functions";
// import {getCurrentTestStatusJSON, setTestStatus} from "./test-status";
import {BuildStatus, Status} from "../types/BuildStatus";
import {BuildResults} from "../types/BuildResults";
import {getCurrentStatus, setCurrentStatus} from "../pantryClient";

const succeededStatus = 'succeeded';
const handler: Handler = async (event) => {
  const content = JSON.parse(event.body ?? '') as BuildResults;
  const {status: newStatus} = content.resource;
  const changedBy = changedByUniqueName(content);
  const currentStatus = await getCurrentStatus();
  const updateStatus = updateStatusFactory(changedBy, content.createdDate);
  // compare newStatus to current status
  // case 1: do nothing if newStatus matches currentStatus
  if ((newStatusGood(newStatus) && currentStatusGood(currentStatus)) || (newStatusBad(newStatus) && currentStatusBad(currentStatus))) {
    // no change in status, do nothing
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
  }
}

export {handler};

function currentStatusGood({what}: BuildStatus) {
  return what === Status.FIXED || what === Status.POOPSMITH
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

function changedByUniqueName(content: any): string {
  return content.resource.lastChangedBy.uniqueName;
}

function updateStatusFactory(who:string, when?: string) {
  if(!when) throw 'updateStatusFactory: when argument missing';
  return (what: Status): BuildStatus => {
    return {
      what,
      who,
      when
    }
  }
}
