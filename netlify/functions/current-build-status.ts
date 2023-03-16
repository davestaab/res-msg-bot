import { Handler } from '@netlify/functions';
import { getCurrentStatus } from '../botClient.js';

const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(await getCurrentStatus()),
    headers: { 'Content-Type': 'application/json' },
  };
};

export { handler };
