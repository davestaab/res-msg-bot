import { BuildResults } from '../../src/types/BuildResults';
import { Event } from '@netlify/functions/dist/function/event';

const buildResults: BuildResults = {
  resource: {
    status: undefined,
    buildNumber: '',
    requests: [
      {
        requestedFor: {
          uniqueName: undefined,
        },
      },
    ],
  },
  createdDate: undefined,
};

export function resetBuildResults() {
  buildResults.resource.status = undefined;
  buildResults.resource.requests[0].requestedFor.uniqueName = undefined;
  buildResults.createdDate = undefined;
  buildResults.resource.buildNumber = '';
}

export function setWho(who: string) {
  buildResults.resource.requests[0].requestedFor.uniqueName = who;
}

export function setWhat(status: boolean) {
  buildResults.resource.status = status ? 'succeeded' : 'failed';
}

export function setWhen(when: string) {
  buildResults.createdDate = when;
}

export function setId(id: string) {
  buildResults.resource.buildNumber = id;
}
export function getBuildResults() {
  return buildResults;
}

export function createEvent(buildResults: BuildResults): Event {
  return {
    body: JSON.stringify(buildResults),
  } as Event;
}
