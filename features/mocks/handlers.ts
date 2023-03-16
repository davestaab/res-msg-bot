import { rest } from 'msw';
import { BuildStatus, Status } from '../../src/types/BuildStatus.js';
import { POST as DiscordPost } from '../../src/types/DiscordPost.js';
import {
  buildHistoryUrl,
  buildStatusBasketUrl,
  friendlyNameMapBasketUrl,
} from '../../netlify/botClient.js';
import { FriendlyNameMap } from '../../src/types/FriendlyNameMap.js';
import { BuildHistory } from '../../src/types/BuildHistory.js';
import { TESTING_TVA_ENDPOINT } from '../../netlify/functions/tva.js';

interface MockState {
  status: BuildStatus;
  friendlyNameMap: FriendlyNameMap;
  historyState: BuildHistory;
  tvaReminder: DiscordPost | null;
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
  tvaReminder: null
};

export const setBuildStatus = (newStatus: BuildStatus) => (state.status = { ...newStatus });
export const getBuildStatus = () => state.status;

export const setFriendlyNameState = (newState: FriendlyNameMap) =>
  (state.friendlyNameMap = { ...newState });

export const getBuildHistory = () => state.historyState;
export const setBuildHistory = (history: BuildStatus[]) => (state.historyState.history = history);
export const clearBuildHistory = () => (state.historyState.history = []);

export const getTvaReminderState = () => state.tvaReminder

export const resetMockState = () => {
  clearBuildHistory();
  setFriendlyNameState({});
  setBuildStatus(initialStatus);
};

export const handlers = [
  rest.get(buildStatusBasketUrl, (req, res, ctx) => {
    return res(ctx.json(state.status));
  }),
  rest.put(buildStatusBasketUrl, async (req, res, ctx) => {
    setBuildStatus((await req.json()) as BuildStatus);
    return res(ctx.json(state.status));
  }),
  rest.get(friendlyNameMapBasketUrl, (req, res, ctx) => res(ctx.json(state.friendlyNameMap))),
  rest.get(buildHistoryUrl, (req, res, ctx) => res(ctx.json(state.historyState))),
  rest.put(buildHistoryUrl, async (req, res, ctx) => {
    setBuildHistory(((await req.json()) as BuildHistory).history);
    return res(ctx.json(getBuildHistory()));
  }),
  rest.post(TESTING_TVA_ENDPOINT, async (req, res, ctx) => {
    const msg = (await req.json()) as DiscordPost;
    state.tvaReminder = msg;
    return res();
  }),
];
