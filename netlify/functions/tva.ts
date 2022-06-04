import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  return {
    statusCode: 200,
    body: `hello world from the time variance authority`
  };
}

export {handler};
