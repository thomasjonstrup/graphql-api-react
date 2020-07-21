const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql');

const _PORT  = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: buildSchema(`
			type RootQuery {
				events: [String!]!
			}

			type RootMutation {
				createEvent(name: String): String
			}

			schema {
				query: RootQuery
				mutation: RootMutation
			}
		`),
		rootValue: {
			events: () => {
				return ['Test', 'Football', 'Coding', 'Gaming'];
			},
			createEvent: (args) => {
				const eventName = args.name;
				return eventName;
			},
		},
		graphiql: true,
	})
);

app.listen(3000, () => {
	console.log(`LISTEN ON PORT ${_PORT}`);
});