import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { POST as DiscordPost } from "../../types/DiscordPost"

const handler: Handler = async (event) => {
  const msgEndpoint = process.env.BUILD_MSG_ENDPOINT ?? '';
  const postBody: DiscordPost = {
    embeds: [
      {

        "title": "Build ConsumerAddressModule_20150407.2 succeeded",
        "color": 5612386,
        "fields": [
          {
            "name": "Requested By",
            "value": "Normal Paulk",
            "inline": true
          },
          {
            "name": "Duration",
            "value": "00:02:03"

          },
          {
            "name": "Build pipeline",
            "value": "ConsumerAddressModule",
            "inline": true
          },
          {
            "name": "Build",
            "value": "[ConsumerAddressModule_20150407.2](https://fabrikam-fiber-inc.visualstudio.com/web/build.aspx?pcguid=5023c10b-bef3-41c3-bf53-686c4e34ee9e&builduri=vstfs%3a%2f%2f%2fBuild%2fBuild%2f3)",
            "inline": true
          }
        ]
      },
      {
        title: "From TFS",
        description: JSON.stringify(event.body)
      }
    ]
  }

  const response = await fetch(msgEndpoint, {
    method: 'post',
    body: JSON.stringify(postBody),
    headers: {'Content-Type': 'application/json'}
  });
  return {
    statusCode: response.status
  };
}
  ;

  export {handler};
