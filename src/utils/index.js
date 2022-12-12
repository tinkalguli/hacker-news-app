import { concat, toUpper } from 'ramda';

const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export const capitalize = (string) => concat(toUpper(string[0]), string.slice(1));

export const formatDate = (date) => new Date(date).toLocaleDateString("en-US", dateFormatOptions);