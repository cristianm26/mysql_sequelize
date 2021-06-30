import { Sequelize } from 'sequelize';

const db = new Sequelize('node', 'root', 'WILDworld2020', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
})

export default db;