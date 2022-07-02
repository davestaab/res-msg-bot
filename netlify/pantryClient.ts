// eslint-disable-next-line @typescript-eslint/no-var-requires
const Pantry = require('pantry-node');

import { BuildHistory } from '../src/types/BuildHistory';
import { FriendlyNameMap } from '../src/types/FriendlyNameMap';
import { BuildStatus } from '../src/types/BuildStatus';

const pantryClient = new Pantry(process.env.PANTRY_ID);
const BUILD_STATUS_BASKET = 'res-test-build-status';
export const buildStatusBasketUrl = pantryClient.basket.link(BUILD_STATUS_BASKET);
const FRIENDLY_NAME_MAP_BASKET = 'friendly-name-map';
export const friendlyNameMapBasketUrl = pantryClient.basket.link(FRIENDLY_NAME_MAP_BASKET);
const BUILD_HISTORY_BASKET = 'res-ci-build-history';
export const buildHistoryUrl = pantryClient.basket.link(BUILD_HISTORY_BASKET);

export async function getCurrentStatus() {
  const results = await _getCurrentStatus(true);
  if (typeof results === 'object') return results;
  throw 'Unexpected type';
}

export async function getCurrentStatusAsString() {
  const results = await _getCurrentStatus(false);
  if (typeof results === 'string') return results;
  throw 'Unexpected type';
}

async function _getCurrentStatus(parseJSON = true): Promise<string | BuildStatus> {
  return pantryClient.basket.get(BUILD_STATUS_BASKET, { parseJSON });
}

export async function setCurrentStatus(status: BuildStatus): Promise<BuildStatus> {
  await pantryClient.basket.update(BUILD_STATUS_BASKET, status);
  const buildHistory = (await pantryClient.basket.get(BUILD_HISTORY_BASKET, {
    parseJSON: true,
  })) as BuildHistory;
  buildHistory.history.push(status);
  await pantryClient.basket.update(BUILD_HISTORY_BASKET, buildHistory);
  return status;
}

export async function getFriendlyNameMap(): Promise<FriendlyNameMap> {
  return await pantryClient.basket.get(FRIENDLY_NAME_MAP_BASKET, { parseJSON: true });
}
