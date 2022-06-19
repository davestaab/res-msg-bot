import {Handler} from "@netlify/functions";
import {getCurrentTestStatusJSON, setTestStatus} from "./test-status";
import {BuildStatus, Status} from "../types/BuildStatus";

const succeededStatus = 'succeeded';
const handler: Handler = async (event) => {
  const content = JSON.parse(event.body ?? '');
  const {status: newStatus} = content.resource;
  const lastChangedBy = lastChangedByUniqueName(content);
  const currentStatus = await getCurrentTestStatusJSON();
  const updateStatus = updateStatusFactory(currentStatus, content.createdDate);
  console.log(`last changed by ${lastChangedBy}`);
  console.log(`currentStatus ${JSON.stringify(currentStatus)}`);
  console.log(`newStatus ${newStatus}`);
  // compare newStatus to current status
  // case 1: do nothing if newStatus matches currentStatus
  if ((newStatusGood(newStatus) && currentStatusGood(currentStatus)) || (newStatusBad(newStatus) && currentStatusBad(currentStatus))) {
    // no change in status, do nothing
    console.log()
  } else if (currentStatusGood(currentStatus)) {
    // good news it's fixed! but is it fixed or just poopsmithed?
    if (lastChangedBy === currentStatus.who) {
      // just poopsmithed
      console.log(await setTestStatus(updateStatus(Status.POOPSMITH)))
    } else {
      // high paise!! 🙌
      console.log(await setTestStatus(updateStatus(Status.FIXED)))
    }
  } else if (currentStatusBad(currentStatus)) {
    // oh boy, someone has the golden poo
    console.log(await setTestStatus(updateStatus(Status.BORKD)));
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

function newStatusGood(status: string) {
  return status === succeededStatus;
}

function newStatusBad(status: string) {
  return !newStatusGood(status);
}

function lastChangedByUniqueName(content: any): string {
  return content.resource.lastChangedBy.uniqueName;
}

function updateStatusFactory({ who }: BuildStatus, when: string) {
  return (what: Status): BuildStatus => {
    return {
      what,
      who,
      when
    }
  }
}
