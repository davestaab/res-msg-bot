import {rest} from 'msw'
import {BuildStatus, Status} from "../types/BuildStatus";

let status: BuildStatus = {
  who: 'dave',
  what: Status.FIXED,
  when: '2022-06-19T'
}

export const handlers = [
  rest.post('/.netlify/functions/test-build-results', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),
  rest.get('/.netlify/functions/test-status', (req, res, ctx) => {
    return res(ctx.json(status));
  }),
];

export const setBuildStatus = (newStatus: BuildStatus) => status = newStatus;

