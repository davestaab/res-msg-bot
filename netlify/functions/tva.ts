import { Handler } from '@netlify/functions';
import { POST as DiscordPost } from '../../src/types/DiscordPost.js';
import fetch from 'node-fetch';
import format from 'date-fns/format/index.js';

const images = [
  'https://res-msg-bot.netlify.app/images/TVA-A-01.png',
  'https://res-msg-bot.netlify.app/images/TVA-A-02.png',
  'https://res-msg-bot.netlify.app/images/TVA-A-03.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-02.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-03.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-04.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-05.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-06.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-07.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-08.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-10.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-11.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-12.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-13.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-14.jpg',
  'https://res-msg-bot.netlify.app/images/TVA-15.jpg',
];
export const tvaEndpoint = () => process.env.TVA_RES_ENDPOINT ?? 'https://res-test-app.com/tva-reminder';
const handler: Handler = async () => {
  const resEndpoint = tvaEndpoint();
  const postBody: DiscordPost = {
    content: `@here ${format(new Date(), 'EEE MMM d')}`,
    embeds: [
      {
        title: "Don't forget....",
        description:
          'Just a friendly reminder from the Time Variance Authority: ' +
          'Avoid a nexus event and enter your time! We can all do our' +
          ' part to protect and preserve the Sacred Timeline.\n\n' +
          '-- The Time-Keepers',
        image: {
          url: randomImage(),
        },
      },
    ],
  };
  await fetch(resEndpoint, {
    method: 'POST',
    body: JSON.stringify(postBody),
    headers: { 'Content-Type': 'application/json' },
  });
  return {
    statusCode: 204,
  };
};

export { handler };

function randomImage() {
  return images[getRandomArbitrary(0, images.length)];
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
