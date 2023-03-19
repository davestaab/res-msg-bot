import { rest } from 'msw';
import { POST as DiscordPost } from '../../src/types/DiscordPost.js';
import {
  buildHistoryUrl,
  buildStatusBasketUrl,
  friendlyNameMapBasketUrl,
} from '../../netlify/botClient.js';
import { BuildHistory } from '../../src/types/BuildHistory.js';
import { tvaEndpoint } from '../../netlify/functions/tva.js';
import { getBuildHistoryState, getBuildStatusStateAllBranches, getFriendlyNameState, setBuildHistoryState, setTvaReminderState, updateBuildStatusMapState } from '../step-definitions/world.js';
import { BuildStatusMap } from '../../src/types/BuildStatusMap.js';

export const handlers = [
  rest.get(buildStatusBasketUrl, (req, res, ctx) => {
    return res(ctx.json(getBuildStatusStateAllBranches()));
  }),
  rest.put(buildStatusBasketUrl, async (req, res, ctx) => {
    updateBuildStatusMapState((await req.json()) as BuildStatusMap);
    return res(ctx.json(getBuildStatusStateAllBranches()));
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
