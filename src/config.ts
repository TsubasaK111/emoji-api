const config = {
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
  }
};

export default config;
// module.exports = config;