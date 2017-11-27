Minesweeper API with Express
==========

Using:

 - [Node.js](https://nodejs.org/en/)
 - [Express.js](https://expressjs.com/)
 - [Graphql](http://graphql.org/)
 - [Postgres](https://www.postgresql.org/)
 - [Postgres Docker-Hub](https://hub.docker.com/_/postgres/)

I developed my own automated model generator based on `src/models.json`.

Take a look!
-----
The [API is live and running here!](https://minesweeper-express-api.herokuapp.com/api/) (hosted in [Heroku](https://www.heroku.com))
```
/users: List of registered users
/records: List of registered records
/graphql: GraphQL interface
```

Testing
-----

Unit Tests with [enzyme](https://www.npmjs.com/package/enzyme).

To run them:
```bash
npm test
```

Front-End
-----

You can check the front-end code [here](https://github.com/juancaacuna/minesweeper-react-redux)

Ready for some action? Play the game [here](https://minesweeper-react-redux.herokuapp.com/)! Try to beat some records.
