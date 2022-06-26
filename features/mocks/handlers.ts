import {rest} from 'msw'
import {BuildStatus, Status} from "../../netlify/types/BuildStatus";
import {basketUrl} from "../../netlify/pantryClient";

let status: BuildStatus = {
  who: 'dave',
  what: Status.FIXED,
  when: '2022-06-19T'
}
export const handlers = [
  rest.get(basketUrl, (req, res, ctx) => {
    return res(ctx.json(status));
  }),
  rest.put(basketUrl, (req, res, ctx) => {
    setBuildStatus(req.body as BuildStatus);
    return res(ctx.json(status));
  }),
];

export const setBuildStatus = (newStatus: BuildStatus) => status = newStatus;
export const getBuildStatus = () => status;
