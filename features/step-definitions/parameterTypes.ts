import { defineParameterType } from '@cucumber/cucumber';
import { formatISO, parse } from 'date-fns';
const timeFormat = 'p'; // long localized time 12:00 AM

export const parseSimpleTime = (s: string) => formatISO(parse(s, timeFormat, new Date()));

defineParameterType({
  name: 'buildResult',
  regexp: /successful|unsuccessful/,
  transformer: (s) => s === 'successful',
});

defineParameterType({
  name: 'simpleTime',
  regexp: /\d?\d:\d\d [A|P]M/,
  transformer: parseSimpleTime,
});

defineParameterType({
  name: 'buildStatus',
  regexp: /BORKD|POOPSMITH|FIXED/,
  transformer: (s) => s,
});
