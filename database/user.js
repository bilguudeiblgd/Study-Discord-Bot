const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    },
    username: Sequelize.STRING,
    studystarted: { type: Sequelize.BOOLEAN, defaultValue: false },
    starttime: {
        type: Sequelize.DATE,
    },
    endtime: {
        type: Sequelize.DATE,
    },
    studytime: Sequelize.INTEGER,
    weeklytime: Sequelize.INTEGER,
});

module.exports = Users;