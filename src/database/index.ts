import { Sequelize, Dialect } from 'sequelize';
import config from '../../config/config.json';

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect as Dialect,
  }
);
// Sync database and create tables
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

export default sequelize;
