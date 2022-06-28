// eslint-disable-next-line @typescript-eslint/no-var-requires
const Pantry = require('pantry-node');
import { FriendlyNameMap } from '../src/types/FriendlyNameMap';
import { BuildStatus } from '../src/types/BuildStatus';

const pantryClient = new Pantry(process.env.PANTRY_ID);
const BUILD_STATUS_BASKET = 'res-test-build-status';
export const buildStatusBasketUrl = pantryClient.basket.link(BUILD_STATUS_BASKET);
const FRIENDLY_NAME_MAP_BASKET = 'friendly-name-map';
export const friendlyNameMapBasketUrl = pantryClient.basket.link(FRIENDLY_NAME_MAP_BASKET);

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
  return await pantryClient.basket.update(BUILD_STATUS_BASKET, status, { parseJSON: true });
}

export async function getFriendlyNameMap(): Promise<FriendlyNameMap> {
  return await pantryClient.basket.get(FRIENDLY_NAME_MAP_BASKET, { parseJSON: true });
}
