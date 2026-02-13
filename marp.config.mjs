/** @type {import('@marp-team/marp-cli').Config} */
export default {
  allowLocalFiles: true,
  baseUrl: new URL('./', import.meta.url).toString(),
  html: true,
  themeSet: ['./themes/default.css'],
};
