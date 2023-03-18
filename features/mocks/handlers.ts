import { rest } from 'msw';
import { BuildStatus } from '../../src/types/BuildStatus.js';
import { POST as DiscordPost } from '../../src/types/DiscordPost.js';
import {
  buildHistoryUrl,
  buildStatusBasketUrl,
  friendlyNameMapBasketUrl,
} from '../../netlify/botClient.js';
import { BuildHistory } from '../../src/types/BuildHistory.js';
import { tvaEndpoint } from '../../netlify/functions/tva.js';
import { getBuildHistoryState, getBuildStatusState, getFriendlyNameState, setBuildHistoryState, setBuildStatusState, setTvaReminderState } from '../step-definitions/world.js';

export const handlers = [
  rest.get(buildStatusBasketUrl, (req, res, ctx) => {
    return res(ctx.json(getBuildStatusState()));
  }),
  rest.put(buildStatusBasketUrl, async (req, res, ctx) => {
    setBuildStatusState((await req.json()) as BuildStatus);
    return res(ctx.json(getBuildStatusState()));
  }),
  rest.get(friendlyNameMapBasketUrl, (req, res, ctx) => res(ctx.json(getFriendlyNameState()))),
  rest.get(buildHistoryUrl, (req, res, ctx) => res(ctx.json(getBuildHistoryState()))),
  rest.put(buildHistoryUrl, async (req, res, ctx) => {
    const currentHistory = getBuildHistoryState();
    const update = (await req.json()) as BuildHistory;
    setBuildHistoryState([
      ...currentHistory.history,
      ...update.history,
    ]);
    return res(ctx.json(getBuildHistoryState()));
  }),
  rest.post(tvaEndpoint(), async (req, res) => {
    const msg = (await req.json()) as DiscordPost;
    setTvaReminderState(msg);
    return res();
  }),
];
