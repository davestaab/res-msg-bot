import { Handler } from '@netlify/functions';
import { getCurrentStatusAsString } from '../pantryClient.js';

const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: await getCurrentStatusAsString(),
    headers: { 'Content-Type': 'application/json' },
  };
};

export { handler };
