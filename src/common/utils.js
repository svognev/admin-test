import { format } from 'date-fns-tz';

export const formatDate = (utcString) => {
  const date = new Date(Date.parse(utcString));
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateString = format(date, "dd.MM.yy-MM HH:mm", timeZone);

  return dateString;
}  