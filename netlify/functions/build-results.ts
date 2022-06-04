import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { POST as DiscordPost } from "../../types/DiscordPost"
const emojiLookup = new Map<string, string>();
emojiLookup.set('thorium-turkey', '🦃');

const handler: Handler = async (event) => {
  const msgEndpoint = process.env.BUILD_MSG_ENDPOINT ?? '';
  const content = JSON.parse(event.body ?? '');
  const getVersion = content.resource.sourceGetVersion;
  const [_, branch, commit] = getVersion.split(':');
  const branchName = last(branch.split('/'));
  const shortCommit = commit.substring(0, 8);
  const requestedBy = content.resource.requests[0].requestedFor.displayName;
  const durationStr = duration(content.resource.startTime, content.resource.finishTime);
  const buildName = content.resource.definition.name;
  const postBody: DiscordPost = {
    embeds: [
      {
        "title": `${content.message.text}`,
        "color": content.eventType === 'build.complete' ? 5612386 : 12649008,
        "fields": [
          {
            "name": `Build Config`,
            "value": `${buildName}`
          },
          {
            "name": "Branch",
            "value": `${branchName} ${emojiLookup.get(branchName) ?? ''}`,
            "inline": true
          },
          {
            "name": "Commit",
            "value": `${shortCommit}`,
            "inline": true
          },
          {
            "name": "Build",
            "value": `${content.detailedMessage.markdown}`
          },
          {
            "name": "Requested By",
            "value": `${requestedBy}`,
            "inline": true
          },
          {
            "name": "Duration",
            "value": `${durationStr}`,
            "inline": true
          }
        ]
      }
    ]
  }

  await fetch(msgEndpoint, {
    method: 'post',
    body: JSON.stringify(postBody),
    headers: {'Content-Type': 'application/json'}
  });
  return {
    statusCode: 204
  };
}

export {handler};

function duration(startStr: string, finishStr: string): string {
  const start = Date.parse(startStr);
  const finish = Date.parse(finishStr);
  const totalSeconds = (finish - start) / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds}s`;
}

function last(input: Array<string>): string {
  return input[input.length-1];
}
