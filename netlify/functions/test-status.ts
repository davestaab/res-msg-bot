import {Handler} from "@netlify/functions";
import Pantry from 'pantry-node';
import {BuildStatus} from "../types/BuildStatus";

const pantryClient = new Pantry(process.env.PANTRY_ID);
const TEST_STATUS_BASKET = 'res-test-build-status';
const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: await getCurrentTestStatus(),
    headers: {'Content-Type': 'application/json'},
  }
}

export {handler};

export async function getCurrentTestStatus(): Promise<string> {
  return pantryClient.basket
    .get(TEST_STATUS_BASKET, {parseJSON: false});
}

export async function getCurrentTestStatusJSON(): Promise<BuildStatus> {
  return pantryClient.basket
    .get(TEST_STATUS_BASKET, {parseJSON: true});
}

export async function setTestStatus(status: BuildStatus) {
  return await pantryClient.basket
    .update(TEST_STATUS_BASKET, status, {parseJSON: true});

}
