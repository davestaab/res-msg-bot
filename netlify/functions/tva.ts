import { Handler, schedule } from "@netlify/functions";
import { POST as DiscordPost } from "../../types/DiscordPost"
import fetch from "node-fetch";
import format from 'date-fns/format';

const images = [
  "https://res-msg-bot.netlify.app/images/Miss_minutes.png",
  "https://res-msg-bot.netlify.app/images/tva-modius.jpg",
  "https://res-msg-bot.netlify.app/images/tva-leader.png"
];

const handlerFunc: Handler = async () => {
  const resEndpoint = process.env.TVA_RES_ENDPOINT ?? '';
  const postBody: DiscordPost = {
    content: `@here ${format(new Date(), 'EEE MMM d')}`,
    embeds: [
      {
        title: "Don't forget....",
        description:  "Just a friendly reminder from the Time Variance Authority: " +
          "Avoid a nexus event and enter your time! We can all do our" +
          " part to protect and perserve the Sacred Timeline.\n\n" +
          "-- The Time-Keepers",
        image: {
          url: randomImage()
        }
      }
    ],
  }
  await fetch(resEndpoint, {
    method: 'post',
    body: JSON.stringify(postBody),
    headers: {'Content-Type': 'application/json'}
  });
  return {
    statusCode: 204,
  };
}

const handler = schedule("15 18 * * *", handlerFunc)
export { handler };

function randomImage() {
  return images[getRandomArbitrary(0,images.length)];
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min:number, max:number) {
  return Math.floor(Math.random() * (max - min) + min);
}
