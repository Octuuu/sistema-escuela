import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  }
});

export default sequelize;