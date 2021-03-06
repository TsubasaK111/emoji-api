module.exports = {
  // database connection configs
  db: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "emoji_api",
    },
    port: 3307,
  },

  // port for server to run on
  express: {
    port: 3001,
  },

  tokens: {
    slackApiToken: process.env.SLACK_API_TOKEN,
  }
};
