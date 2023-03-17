import { When, Then } from '@cucumber/cucumber';
import { Context } from '@netlify/functions/dist/function/context.js';
import { Event } from '@netlify/functions/dist/function/event.js';
import { equal, notEqual } from 'assert';
import { format } from 'date-fns';
import { handler as tvaHandler } from '../../netlify/functions/tva.js';
import { getTvaReminderState } from '../mocks/handlers.js';

When('a time reminder is requested', async function () {
  const results = await tvaHandler({} as Event, {} as Context, () => undefined);
  equal(204, results?.statusCode ?? 0);

});
Then('the time reminder should have content', async function () {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(`@here ${format(new Date(), 'EEE MMM d')}`, reminder?.content);
});
Then('the time reminder embed title should be {string}', async function (title) {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(1, reminder?.embeds.length)
  equal(title, reminder?.embeds[0].title)
});
Then('the time reminder embed description should be:', async function (docString) {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(1, reminder?.embeds.length)
  equal(docString, reminder?.embeds[0].description);
});
Then('the time reminder embed should have an image', async function () {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(1, reminder?.embeds.length)
  notEqual(null, reminder?.embeds[0].image ?? null);
});