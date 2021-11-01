import express from 'express';
import path from 'path';

import routes from './routes';

import './database/index';

class Application {
  constructor() {
    this.server = express();

    this.connectDatabase();
    this.middlewares();
    this.routes();
  }

  connectDatabase() {}

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uplouds'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new Application().server;
