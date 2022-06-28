import { rest } from 'msw';
import { BuildStatus, Status } from '../../src/types/BuildStatus';
import { buildStatusBasketUrl, friendlyNameMapBasketUrl } from '../../netlify/pantryClient';
import { FriendlyNameMap } from '../../src/types/FriendlyNameMap';

interface MockState {
  status: BuildStatus;
  friendlyNameMap: FriendlyNameMap;
}
const state: MockState = {
  status: {
    who: 'dave',
    what: Status.FIXED,
    when: '2022-06-19T',
  },
  friendlyNameMap: {
    Dave: 'Dave',
    Aaron: 'Aaron',
    Shannon: 'Shannon',
  },
};

export const setBuildStatus = (newStatus: BuildStatus) => (state.status = newStatus);
export const getBuildStatus = () => state.status;
export const setFriendlyNameState = (newState: FriendlyNameMap) =>
  (state.friendlyNameMap = newState);
export const getFriendlyNameState = () => state.friendlyNameMap;

export const handlers = [
  rest.get(buildStatusBasketUrl, (req, res, ctx) => {
    return res(ctx.json(state.status));
  }),
  rest.put(buildStatusBasketUrl, (req, res, ctx) => {
    setBuildStatus(req.body as BuildStatus);
    return res(ctx.json(state.status));
  }),
  rest.get(friendlyNameMapBasketUrl, (req, res, ctx) => {
    return res(ctx.json(state.friendlyNameMap));
  }),
];
