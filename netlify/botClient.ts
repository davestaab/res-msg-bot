import { BuildHistory } from '../src/types/BuildHistory.js';
import { FriendlyNameMap } from '../src/types/FriendlyNameMap.js';
import { BuildStatus } from '../src/types/BuildStatus.js';
import { pantry } from './pantryClient.js';
import { Response } from 'node-fetch';

const { get, put, link } = pantry(process.env.PANTRY_ID ?? 'testing-pantry-id');
const BUILD_STATUS_BASKET = 'res-test-build-status';
export const buildStatusBasketUrl = link(BUILD_STATUS_BASKET);
const FRIENDLY_NAME_MAP_BASKET = 'friendly-name-map';
export const friendlyNameMapBasketUrl = link(FRIENDLY_NAME_MAP_BASKET);
const BUILD_HISTORY_BASKET = 'res-ci-build-history';
export const buildHistoryUrl = link(BUILD_HISTORY_BASKET);

export async function getCurrentStatus(): Promise<BuildStatus> {
  return unwrapFetch<BuildStatus>(get(BUILD_STATUS_BASKET));
}

export async function setNewCurrentStatus(status: BuildStatus): Promise<BuildStatus> {
  checkStatus(await put(BUILD_STATUS_BASKET, status));
  const buildHistory = await unwrapFetch<BuildHistory>(get(BUILD_HISTORY_BASKET));
  buildHistory.history.push(status);
  checkStatus(await put(BUILD_HISTORY_BASKET, buildHistory));
  return status;
}

 export async function updateCurrentStatus(status: BuildStatus): Promise<BuildStatus> {
  checkStatus(await put(BUILD_STATUS_BASKET, status));
  return status;
}

export async function getFriendlyNameMap(): Promise<FriendlyNameMap> {
  return await unwrapFetch<FriendlyNameMap>(get(FRIENDLY_NAME_MAP_BASKET));
}


function unwrapFetch<R>(response: Promise<Response>) {
  return response.then(checkStatus).then(r => r.json()).then(r => r as R);
}
// https://www.npmjs.com/package/node-fetch#handling-exceptions
class HTTPResponseError extends Error {
  response: Response;
  constructor(response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.response = response;
  }
}

function checkStatus(response: Response) {
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    throw new HTTPResponseError(response);
  }
}