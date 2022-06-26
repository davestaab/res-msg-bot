import {BuildResults} from "../../netlify/types/BuildResults";
import {Event} from "@netlify/functions/dist/function/event";

const buildResults: BuildResults = {
  resource: {
    status: undefined,
    lastChangedBy: {
      uniqueName: undefined,
    }
  },
  createdDate: undefined
};

export function resetBuildResults() {
  buildResults.resource.status = undefined;
  buildResults.resource.lastChangedBy.uniqueName = undefined;
  buildResults.createdDate = undefined;
}

export function setWho(who: string) {
  buildResults.resource.lastChangedBy.uniqueName = who;
}

export function setWhat(status: boolean) {
  buildResults.resource.status = status ? 'succeeded' : 'failed';
}

export function setWhen(when: string) {
  buildResults.createdDate = when;
}

export function getBuildResults() {
  return buildResults;
}

export function createEvent(buildResults: BuildResults): Event {
  return {
    body: JSON.stringify(buildResults),
  } as Event;
}
