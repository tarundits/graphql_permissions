import dotenv from 'dotenv';
import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { ApolloServer  } from "@apollo/server";
import { expressMiddleware ,  } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer  } from "@apollo/server/plugin/drainHttpServer";
// import { GraphQLUpload, graphqlUploadExpress } from'graphql-upload';

import typeDefs from './schema/index.js';
import resolvers from './resolvers/index.js';

import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
// import { ExecutionArgs, buildSchema , execute } from "graphql";
// import { createSchema } from 'graphql-yoga'

import { extractBearerToken } from './utils/userAuth.js';

dotenv.config();

class Server {
	/**
	 * Constructor to initialize
	 */
    constructor(port) {
		this.app = express();
		this.port = port;
		this.configureRoutes();
		this.configureMiddleWare();
    }

	/**
	 * Route Configuration
	 */
  	configureRoutes() {
		this.app.get("/", (req, res) => {
			res.send("Node Express App!");
		});
  	}

	/**
	 * Middleware Configuration
	 */
    configureMiddleWare() {
		this.app.use( cors({ credentials: true }) );
		this.app.use(compression());
		this.app.use(cookieParser());
		this.app.use(bodyParser.json());
		// this.app.use(graphqlUploadExpress());
    }

	/**
	 * Start Server function
	 */
	async start() {
		const httpServer = http.createServer(this.app);

		const server = new ApolloServer({
			typeDefs,
			resolvers,
			cache: 'bounded',
			plugins: [
				ApolloServerPluginDrainHttpServer({ httpServer }),
				{
					async requestDidStart(initialRequestContext) {
						return {
							async willSendResponse(requestContext) {
								const { response, errors } = requestContext;
								response.http.status = 400;
								if (errors) {
									const resError = [];

									errors.forEach((error) => {
										resError.push({
										message: error.message,
										code: error.extensions
											? error.extensions.code
											: "INTERNAL_SERVER_ERROR",
										});
									});

									response.body.singleResult.errors = resError;
								}
							},
						};
					},
				},
			], // end of plugins
			sendErrors: { unmodified: true },
		});

		await server.start();

		this.app.use("/graphql", cors(), bodyParser.json(), 
			expressMiddleware(server, {
				context: async ({ req }) => {
					return { token: extractBearerToken(req) }
				},
			})
		);

		await new Promise((resolve) =>
      		this.app.listen({ port: this.port }, resolve)
    	);
    	console.log(`🚀 Server ready at http://localhost:${this.port}`);
    	console.log(
      		`🚀 Graphql Server ready at http://localhost:${this.port}/graphql`
    	);
	} // end of start function
    
}

export default Server;
