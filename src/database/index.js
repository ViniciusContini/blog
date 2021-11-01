import Sequelize from 'sequelize';

import User from '../app/models/User';
import Posts from '../app/models/Posts';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Posts, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
