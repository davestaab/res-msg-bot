import { Handler } from '@netlify/functions';
import { POST as DiscordPost } from '../../src/types/DiscordPost';
import fetch from 'node-fetch';
import format from 'date-fns/format';

const hash = '1a03c4b2fa58ed70c7269647c8b4938a8a3d60f9';
const urlBase = `https://raw.githubusercontent.com/davestaab/res-msg-bot/${hash}/images`;

const images = [
  // This file doesn't exist, it's not in the images folder...
  // `${urlBase}/TVA-A-01.png`,
  `${urlBase}/TVA-A-02.png`,
  `${urlBase}/TVA-A-03.jpg`,
  `${urlBase}/TVA-02.jpg`,
  `${urlBase}/TVA-03.jpg`,
  `${urlBase}/TVA-04.jpg`,
  `${urlBase}/TVA-05.jpg`,
  `${urlBase}/TVA-06.jpg`,
  `${urlBase}/TVA-07.jpg`,
  `${urlBase}/TVA-08.jpg`,
  `${urlBase}/TVA-10.jpg`,
  `${urlBase}/TVA-11.jpg`,
  `${urlBase}/TVA-12.jpg`,
  `${urlBase}/TVA-13.jpg`,
  `${urlBase}/TVA-14.jpg`,
  `${urlBase}/TVA-15.jpg`,
];

const handler: Handler = async () => {
  const resEndpoint = process.env.TVA_RES_ENDPOINT ?? '';
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
    method: 'post',
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
