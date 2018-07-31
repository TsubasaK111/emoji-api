const Promise = require("bluebird");
const config = require("../../config.js");
const fetch = require("node-fetch");

const getApiResults = (url, searchParams) => {
  let requestUrl = new URL(url);
  if (typeof searchParams === "string") requestUrl.search = searchParams;

  return fetch(requestUrl.href)
    .then(response => response.json())
    .catch(err => { throw err });
}

exports.seed = function (knex, Promise) {

  const slackApiToken = config.tokens.slackApiToken;

  return getApiResults(
    "https://slack.com/api/emoji.list",
    `?token=${config.tokens.slackApiToken}`
  )
    .then(jsonResponse => {
      if (!jsonResponse.ok) {
        throw new Error(`slack API returned an error!: \n${jsonResponse}`);
      }
      return Object.entries(jsonResponse.emoji);
    })
    .then((emojis) => {
      // Deletes ALL existing entries
      return knex('emojis')
        .del()
        .then(() => emojis);
    })
    .then((emojis) => {
      return emojis.map(([name, uri]) => {
        return { name, uri };
      });
    })
    .then((emojis) => {
      console.log(emojis);
      // Inserts seed entries
      return knex('emojis').insert(emojis)
    })
    .then(res => {
      console.log(
        "Database is now seeded!",
        "Run `yarn start` to start the API :sunglasses:"
      );
    })
    .catch(err => {
      console.log(err);
    })
};