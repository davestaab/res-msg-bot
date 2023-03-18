import { When, Then } from '@cucumber/cucumber';
import { Context } from '@netlify/functions/dist/function/context.js';
import { Event } from '@netlify/functions/dist/function/event.js';
import { equal, notEqual } from 'assert';
import { format } from 'date-fns';
import { handler as tvaHandler } from '../../netlify/functions/tva.js';
import { getTvaReminderState } from './world.js';

When('a time reminder is requested', async function () {
  const results = await tvaHandler({} as Event, {} as Context, () => undefined);
  equal(results?.statusCode ?? 0, 204);

});
Then('the time reminder should have content', async function () {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(reminder?.content, `@here ${format(new Date(), 'EEE MMM d')}`);
});
Then('the time reminder embed title should be {string}', async function (title) {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(reminder?.embeds.length, 1)
  equal(reminder?.embeds[0].title, title)
});
Then('the time reminder embed description should be:', async function (docString) {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(reminder?.embeds.length, 1)
  equal(docString, reminder?.embeds[0].description);
});
Then('the time reminder embed should have an image', async function () {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(reminder?.embeds.length, 1)
  notEqual(reminder?.embeds[0].image ?? null, null);
});