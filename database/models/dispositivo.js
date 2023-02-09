const { sequelize, Sequelize } = require('../config/sequelize.js');

const dispositivo = sequelize.define('dispositivo', {
    id_dispositivo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    batery: {
        type: 'int2',
        allowNull: false
    }
}
);

module.exports = dispositivo;
