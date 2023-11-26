import { When, Then, Given } from '@cucumber/cucumber';
import { Context } from '@netlify/functions/dist/function/context.js';
import { Event } from '@netlify/functions/dist/function/event.js';
import { equal, notEqual } from 'assert';
import { format } from 'date-fns';
import { handler as tvaHandler } from '../../netlify/functions/tva.js';
import { getTvaReminderState } from './world.js';
import { setHolidays, setToday } from '../../netlify/holidays.js';
import Embed from '../../src/types/Embed.js';

Given('the holidays are:', async function (dataTable) {
  setHolidays(dataTable.hashes());
});
Given('today is {string}', async function (date) {
  setToday(date);
});
Then('the time reminder content should be:', async function (docString) {
  const reminder = getTvaReminderState();
  // console.log('docString', docString);
  equal(reminder?.content, docString);
});

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
  equal(reminder?.embeds?.length, 1)
  const embed: Embed = reminder?.embeds?.[0] as Embed;
  equal(embed.title, title)
});
Then('the time reminder embed description should be:', async function (docString) {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(reminder?.embeds?.length, 1)
  const embed: Embed = reminder?.embeds?.[0] as Embed;
  equal(docString, embed.description);
});
Then('the time reminder embed should have an image', async function () {
  const reminder = getTvaReminderState();
  notEqual(reminder, null);
  equal(reminder?.embeds?.length, 1)
  const embed: Embed = reminder?.embeds?.[0] as Embed;
  notEqual(embed?.image ?? null, null);
});