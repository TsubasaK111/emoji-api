module.exports = {
  // database connection configs
  db: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "emoji_api_db",
    },
    port: 33071,
  },

  // port for server to run on
  express: {
    port: 3001,
  }
};
