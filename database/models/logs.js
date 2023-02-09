const { sequelize } = require('../config/sequelize.js');

const logs = sequelize.define('logs', {
    postlogs: {
        type: 'json',
        allowNull: false
    }
}
);
logs.removeAttribute('id');

module.exports = logs;