// we're not using cucumber's world because msw can't easily get access to it.
// I could add all msw handlers for every before step and enject world 
// but that seems like a lot of work for little gain.
// we'll build our own API and reset for each test so each test is isolated. 

import { BuildHistory } from "../../src/types/BuildHistory.js";
import { BuildResults } from "../../src/types/BuildResults.js";
import { BuildStatus, Status } from "../../src/types/BuildStatus.js";
import { POST } from "../../src/types/DiscordPost.js";
import { FriendlyNameMap } from "../../src/types/FriendlyNameMap.js";

interface MockState {
    status: BuildStatus;
    friendlyNameMap: FriendlyNameMap;
    historyState: BuildHistory;
    tvaReminder: POST | null;
    buildMsg: BuildResults;
}

const initialStatus: BuildStatus = {
    who: 'dave',
    what: Status.BORKD,
    when: '2022-06-19T10:00:00z',
    id: '20220630.1',
    count: 1,
};

const state: MockState = {
    status: { ...initialStatus },
    friendlyNameMap: {},
    historyState: {
        history: [],
    },
    tvaReminder: null,
    buildMsg: {
        resource: {
            status: undefined,
            buildNumber: '',
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


export const setBuildStatusState = (newStatus: BuildStatus) => (state.status = { ...newStatus });
export const getBuildStatusState = () => state.status;

export const setFriendlyNameState = (newState: FriendlyNameMap) =>
    (state.friendlyNameMap = { ...newState });
export const getFriendlyNameState = () => state.friendlyNameMap;

export const getBuildHistoryState = () => state.historyState;
export const setBuildHistoryState = (history: BuildStatus[]) => (state.historyState.history = history);

export const getTvaReminderState = () => state.tvaReminder
export const setTvaReminderState = (reminder: POST | null) => (state.tvaReminder = reminder)

export const resetWorld = () => {
    setBuildStatusState(initialStatus);
    setFriendlyNameState({});
    setBuildHistoryState([]);
    setTvaReminderState(null);
    resetBuildMsg();
};

export function setWho(who: string) {
    state.buildMsg.resource.requests[0].requestedFor.uniqueName = who;
}

export function setWhat(status: boolean) {
    state.buildMsg.resource.status = status ? 'succeeded' : 'failed';
}

export function setWhen(when: string) {
    state.buildMsg.createdDate = when;
}

export function setId(id: string) {
    state.buildMsg.resource.buildNumber = id;
}

export function getBuildMsg() {
    return state.buildMsg;
}
function resetBuildMsg() {
    state.buildMsg.resource.status = undefined;
    state.buildMsg.resource.requests[0].requestedFor.uniqueName = undefined;
    state.buildMsg.createdDate = undefined;
    state.buildMsg.resource.buildNumber = '';
}
