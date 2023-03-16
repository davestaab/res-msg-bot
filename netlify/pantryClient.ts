import fetch, { Response, RequestInit } from 'node-fetch';

const BASE_PATH = 'https://getpantry.cloud'
const API_VERSION = '1'

export function pantry(id: string) {
  return {
    async get(basket: string) {
      return fetch(path(id, basket))
    },
    async put<P>(basket: string, payload: P) {
      return fetch(path(id, basket), {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    link(basket: string): string {
      return path(id, basket);
    }
  }

}

function path(pantryId: string, basket: string) {
  return `${BASE_PATH}/apiv${API_VERSION}/pantry/${pantryId}/basket/${basket}`
}
