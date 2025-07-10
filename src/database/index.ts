import { Sequelize, Dialect } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    logging: false,
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
