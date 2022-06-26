const Pantry = require("pantry-node");
import {BuildStatus} from "./types/BuildStatus";

const pantryClient = new Pantry(process.env.PANTRY_ID);
const TEST_STATUS_BASKET = 'res-test-build-status';
export const basketUrl = pantryClient.basket.link(TEST_STATUS_BASKET);

export async function getCurrentStatus(){
  const results = await _getCurrentStatus(true);
  if(typeof results === 'object') return results;
  throw 'Unexpected type';
}
export async function getCurrentStatusAsString(){
  const results = await _getCurrentStatus(false);
  if(typeof results === 'string') return results;
  throw 'Unexpected type';
}

async function _getCurrentStatus(parseJSON = true): Promise<string | BuildStatus> {
  return pantryClient.basket
    .get(TEST_STATUS_BASKET, {parseJSON});
}

export async function setCurrentStatus(status: BuildStatus): Promise<BuildStatus> {
  return await pantryClient.basket
    .update(TEST_STATUS_BASKET, status, {parseJSON: true});
}
