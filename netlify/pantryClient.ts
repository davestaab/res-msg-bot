import { BuildHistory } from '../src/types/BuildHistory.js';
import { FriendlyNameMap } from '../src/types/FriendlyNameMap.js';
import { BuildStatus } from '../src/types/BuildStatus.js';
import fetch, { Response, RequestInit } from 'node-fetch';

const BASE_PATH = 'https://getpantry.cloud'
const API_VERSION = '1'

const { get, put, link } = createClient(process.env.PANTRY_ID ?? 'testing-pantry-id');
const BUILD_STATUS_BASKET = 'res-test-build-status';
export const buildStatusBasketUrl = link(BUILD_STATUS_BASKET);
const FRIENDLY_NAME_MAP_BASKET = 'friendly-name-map';
export const friendlyNameMapBasketUrl = link(FRIENDLY_NAME_MAP_BASKET);
const BUILD_HISTORY_BASKET = 'res-ci-build-history';
export const buildHistoryUrl = link(BUILD_HISTORY_BASKET);

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
  return get(BUILD_STATUS_BASKET, { parseJSON });
}

export async function setNewCurrentStatus(status: BuildStatus): Promise<BuildStatus> {
  await put(BUILD_STATUS_BASKET, status);
  const buildHistory = (await get(BUILD_HISTORY_BASKET, {
    parseJSON: true,
  })) as BuildHistory;
  buildHistory.history.push(status);
  await put(BUILD_HISTORY_BASKET, buildHistory);
  return status;
}

export async function updateCurrentStatus(status: BuildStatus): Promise<BuildStatus> {
  await put(BUILD_STATUS_BASKET, status);
  return status;
}

export async function getFriendlyNameMap(): Promise<FriendlyNameMap> {
  return await get(FRIENDLY_NAME_MAP_BASKET, { parseJSON: true });
}

function createClient(id: string) {
  return {
    async get<T>(basket: string, options: any) {
      return unwrapFetch<T>(fetch(path(id, basket)))
    },
    async put<P, R>(basket: string, payload: P) {
      return unwrapFetch<R>(fetch(path(id, basket), {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }));
    },
    link(basket: string): string {
      return path(id, basket);
    }
  }

}

function path(pantryId: string, basket: string) {
  return `${BASE_PATH}/apiv${API_VERSION}/pantry/${pantryId}/basket/${basket}`
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