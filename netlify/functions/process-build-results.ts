import { Handler } from '@netlify/functions';
import { BuildStatus, ScenarioBranch, Status } from '../../src/types/BuildStatus.js';
import { BuildResults } from '../../src/types/BuildResults.js';
import {
  getCurrentStatus,
  getFriendlyNameMap,
  updateCurrentStatus,
} from '../botClient.js';
import { POST } from '../../src/types/DiscordPost.js';
import fetch from 'node-fetch';

const succeededStatus = 'succeeded';
export const testBuildMsgEndpoint = () => process.env.TEST_BUILD_MSG_ENDPOINT ?? 'https://res-test-app.com/test-build-results';
const handler: Handler = async (event) => {
  const content = JSON.parse(event.body ?? '') as BuildResults;
  const { status: newStatus, buildNumber } = content.resource;
  const changedBy = await changedByName(content);
  const getVersion = content.resource.sourceGetVersion;
  const [_, branch, _commit] = getVersion.split(':');
  const currentStatus = await getCurrentStatus(branchName(branch));
  const updateStatus = updateStatusFactory(changedBy, branchName(branch), content.createdDate, buildNumber);
  const newBuildStatus = calculateNewBuildStatus(newStatus, currentStatus, changedBy, updateStatus);
  await updateCurrentStatus(newBuildStatus);
  await sendBuildResultMessage(newBuildStatus);


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
  return [parts[parts.length - 2], parts[parts.length - 1]].join('/') as ScenarioBranch;
}

function calculateNewBuildStatus(newStatus: string | undefined, currentBuildStatus: BuildStatus | null, changedBy: string, updateStatus: (what: Status) => BuildStatus) {
  if (currentBuildStatus === null) {
    // no current status, set new status
    return updateStatus(newStatusGood(newStatus) ? Status.FIXED : Status.BORKD);
  } else {

    // compare newStatus to current status
    // case 1: do nothing if newStatus matches currentStatus
    if (
      (newStatusGood(newStatus) && currentStatusGood(currentBuildStatus)) ||
      (newStatusBad(newStatus) && currentStatusBad(currentBuildStatus))
    ) {
      // no change in status, increment count and save
      return {
        ...currentBuildStatus,
        count: currentBuildStatus.count ? currentBuildStatus.count + 1 : 2,
      };
    } else if (currentStatusBad(currentBuildStatus)) {
      // good news it's fixed! but is it fixed or just poop-smithed?
      if (changedBy === currentBuildStatus.who) {
        // just poopsmithed
        return updateStatus(Status.POOPSMITH);
      } else {
        // high paise!! 🙌
        return updateStatus(Status.FIXED);
      }
    }
    // oh boy, someone has the golden poo
    return updateStatus(Status.BORKD);
  }
}

async function sendBuildResultMessage(status: BuildStatus) {
  const failed = status.what === Status.BORKD;
  const description = failed ? `🌧 Tests on \`${status.branch}\` failed!\n\n🧹 I'm sorry **${status.who}** but you should probably clean that up!` : `🌞 Tests on \`${status.branch}\` passed!\n\n🥇 Congrats **${status.who}** on a job well done!`;
  const postBody: POST = {
    embeds: [
      {
        title: `Latest Test run ${failed ? 'failed' : 'passed'}!`,
        color: status.what === Status.BORKD ? 12649008 : 5612386,
        description,
      }
    ]
  };
  await fetch(testBuildMsgEndpoint(), {
    method: 'post',
    body: JSON.stringify(postBody),
    headers: { 'Content-Type': 'application/json' },
  });
}