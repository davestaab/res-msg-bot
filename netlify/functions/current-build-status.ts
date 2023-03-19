import { Handler } from '@netlify/functions';
import { getCurrentStatusMap } from '../botClient.js';

const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(await getCurrentStatusMap()),
    headers: { 'Content-Type': 'application/json' },
  };
};

export { handler };
