const { Sequelize } = require('sequelize'); // Import Sequelize from sequelize package

// Create a new Sequelize instance
const sequelize = new Sequelize({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'registered-users',
    dialect: 'mysql',
    pool: {
        max: 150,
        min: 0,
        acquire: 30000000,
        idle: 10000
    }
});

// Sync the database and handle errors
(async () => {
    try {
        await sequelize.sync({
            // force : true,
            // alter: true
        });
        console.log('Database connected and synchronized');
    } catch (error) {
        console.error('Error occurred during synchronization with DB:', error);
    }
})();


module.exports = sequelize;
