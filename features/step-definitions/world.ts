// we're not using cucumber's world because msw can't easily get access to it.
// I could add all msw handlers for every before step and enject world 
// but that seems like a lot of work for little gain.
// we'll build our own API and reset for each test so each test is isolated. 

import { BuildHistory } from "../../src/types/BuildHistory.js";
import { BuildResults } from "../../src/types/BuildResults.js";
import { BuildStatus, Status } from "../../src/types/BuildStatus.js";
import { BuildStatusMap } from "../../src/types/BuildStatusMap.js";
import { POST } from "../../src/types/DiscordPost.js";
import { FriendlyNameMap } from "../../src/types/FriendlyNameMap.js";



interface MockState {
  status: BuildStatusMap;
  friendlyNameMap: FriendlyNameMap;
  historyState: BuildHistory;
  tvaReminder: POST | null;
  buildResult: BuildResults;
  buildResultMsg: POST | null;
}

const initialStatus: BuildStatus = {
  who: 'dave',
  what: Status.BORKD,
  when: '2022-06-19T10:00:00z',
  id: '20220630.1',
  count: 1,
  branch: 'release/lead-leopard',
};

const state: MockState = {
  status: {
    [initialStatus.branch]: {
      ...initialStatus
    }
  },
  friendlyNameMap: {},
  historyState: {
    history: [],
  },
  tvaReminder: null,
  buildResultMsg: null,
  buildResult: {
    resource: {
      status: undefined,
      buildNumber: '',
      sourceGetVersion: 'ab:refs/heads/release/lead-leopard:abcd1234',
      requests: [
        {
          requestedFor: {
            uniqueName: undefined,
          },
        },
      ],
    },
    createdDate: undefined,
  },

};


export const updateBuildStatusMapState = (newStatus: BuildStatusMap) => (state.status = { ...state.status, ...newStatus });
export const clearBuildStatusMapState = () => (state.status = {});
export const setBuildStatusState = (newStatus: BuildStatus) => (state.status[newStatus.branch] = { ...newStatus });
export const getBuildStatusState = (branch: string) => state.status[branch];
export const getBuildStatusStateAllBranches = () => state.status;

export const setFriendlyNameState = (newState: FriendlyNameMap) =>
  (state.friendlyNameMap = { ...newState });
export const getFriendlyNameState = () => state.friendlyNameMap;

export const getBuildHistoryState = () => state.historyState;
export const setBuildHistoryState = (history: BuildStatus[]) => (state.historyState.history = history);

export const getTvaReminderState = () => state.tvaReminder
export const setTvaReminderState = (reminder: POST | null) => (state.tvaReminder = reminder)

export const getBuildResultMsg = () => state.buildResultMsg;
export const setBuildResultMsg = (msg: POST) => state.buildResultMsg = msg;

export const resetWorld = () => {
  state.status = {
    [initialStatus.branch]: {
      ...initialStatus
    }
  };
  setFriendlyNameState({});
  setBuildHistoryState([]);
  setTvaReminderState(null);
  resetBuildMsg();
  state.buildResultMsg = null;
};

export function setWho(who: string) {
  state.buildResult.resource.requests[0].requestedFor.uniqueName = who;
}

export function setWhat(status: boolean) {
  state.buildResult.resource.status = status ? 'succeeded' : 'failed';
}

export function setWhen(when: string) {
  state.buildResult.createdDate = when;
}

export function setId(id: string) {
  state.buildResult.resource.buildNumber = id;
}
export function setbranch(branch: string) {
  state.buildResult.resource.sourceGetVersion = `ab:refs/heads/${branch}:abcd1234`;
}

export function getBuildResult() {
  return state.buildResult;
}

function resetBuildMsg() {
  state.buildResult.resource.status = undefined;
  state.buildResult.resource.requests[0].requestedFor.uniqueName = undefined;
  state.buildResult.createdDate = undefined;
  state.buildResult.resource.buildNumber = '';
}
