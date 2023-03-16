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

export async function getCurrentStatus() {
  return unwrapFetch<BuildStatus>(get(BUILD_STATUS_BASKET));
}

export async function setNewCurrentStatus(newStatus: BuildStatus, currentStatus: BuildStatus ) {
  await checkStatus(put(BUILD_STATUS_BASKET, newStatus));
  const buildHistory: BuildHistory = {
    history: [currentStatus]
  };
  // https://documenter.getpostman.com/view/3281832/SzmZeMLC#f1c2c2b2-63d3-42f6-b30d-94b08ed68ca9
  // put will update existing content and append values to nested arrays
  await checkStatus(put(BUILD_HISTORY_BASKET, buildHistory));
}

 export async function updateCurrentStatus(status: BuildStatus) {
  await checkStatus(put(BUILD_STATUS_BASKET, status));
  return status;
}

export async function getFriendlyNameMap() {
  return await unwrapFetch<FriendlyNameMap>(get(FRIENDLY_NAME_MAP_BASKET));
}


async function unwrapFetch<R>(response: Promise<Response>) {
  return checkStatus(response).then(r => r.json()).then(r => r as R);
}
// https://www.npmjs.com/package/node-fetch#handling-exceptions
class HTTPResponseError extends Error {
  response: Response;
  constructor(response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.response = response;
  }
}

async function checkStatus(p: Promise<Response>) {
  const response = await p; 
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    throw new HTTPResponseError(response);
  }
}