export function parseDate(tmzDateString) {
  const date = new Date(tmzDateString);
  return date.toUTCString();
}
