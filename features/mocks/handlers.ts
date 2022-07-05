import { rest } from 'msw';
import { BuildStatus, Status } from '../../src/types/BuildStatus';
import {
  buildHistoryUrl,
  buildStatusBasketUrl,
  friendlyNameMapBasketUrl,
} from '../../netlify/pantryClient';
import { FriendlyNameMap } from '../../src/types/FriendlyNameMap';
import { BuildHistory } from '../../src/types/BuildHistory';

interface MockState {
  status: BuildStatus;
  friendlyNameMap: FriendlyNameMap;
  historyState: BuildHistory;
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
};

export const setBuildStatus = (newStatus: BuildStatus) => (state.status = { ...newStatus });
export const getBuildStatus = () => state.status;

export const setFriendlyNameState = (newState: FriendlyNameMap) =>
  (state.friendlyNameMap = { ...newState });

export const getBuildHistory = () => state.historyState;
export const setBuildHistory = (history: BuildStatus[]) => (state.historyState.history = history);
export const clearBuildHistory = () => (state.historyState.history = []);

export const resetMockState = () => {
  clearBuildHistory();
  setFriendlyNameState({});
  setBuildStatus(initialStatus);
};

export const handlers = [
  rest.get(buildStatusBasketUrl, (req, res, ctx) => {
    return res(ctx.json(state.status));
  }),
  rest.put(buildStatusBasketUrl, (req, res, ctx) => {
    setBuildStatus(req.body as BuildStatus);
    return res(ctx.json(state.status));
  }),
  rest.get(friendlyNameMapBasketUrl, (req, res, ctx) => res(ctx.json(state.friendlyNameMap))),
  rest.get(buildHistoryUrl, (req, res, ctx) => res(ctx.json(state.historyState))),
  rest.put(buildHistoryUrl, (req, res, ctx) => {
    setBuildHistory((req.body as BuildHistory).history);
    return res(ctx.json(getBuildHistory()));
  }),
];
