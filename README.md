<!-- This was created during my time as a student at Code Chrysalis -->

# Emoji-API ![](https://emoji.slack-edge.com/TBAST357H/glitch_crab/db049f1f9c.png)  

add, search and use emojis whereever you please with this RESTful API!


## Getting Started: 
 1. **Install all requirements.**
 1. Download the contents of this repo.
 1. Start up postgresSQL.  
    (make sure to setup a default database and user.)
 1. Get the 'legacy token' from Slack while you are logged in [here](https://api.slack.com/docs/oauth-test-tokens).
 1. Open command prompt
 1. place the token (a long hash) into the environment variable SLACK_API_TOKEN with `export SLACK_API_TOKEN= "token_here"`
 1. Run `yarn install`
 1. Run `yarn test`
 1. If all tests do not pass,   
    follow all above instructions again.
 1. Run `yarn start`
 1. Access http://localhost:3001/
 1. Emojis!^^

<!-- TODO: (_Alternatively_, if you run vagrant and git, you can just:  
`git clone https://github.com/udacity/BLABLABLA-vm.git fullstack`  
and `vagrant up`.) -->

The detailed specs of each endpoint is available on http://localhost:3001 once your server is successfully up and running.

## Requirements:
 - [postgresSQL/psql](https://www.postgresql.org/download/)
 - [node](https://nodejs.org/en/)
 - [yarn](https://yarnpkg.com/en/)
 - [knex](https://knexjs.org/#Installation) (`npm install knex --global`)
 - [nodemon](https://github.com/remy/nodemon#nodemon) (`npm install nodemon --global`)


<!-- TODO: search feature http://rachbelaid.com/postgres-full-text-search-is-good-enough/ -->

## License:
This repo is distributed under the [MIT License](http://opensource.org/licenses/MIT).
