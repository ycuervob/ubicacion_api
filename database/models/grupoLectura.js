const { sequelize, Sequelize } = require('../config/sequelize.js');
const dispositivo = require('./dispositivo.js');

const grupoLectura = sequelize.define('grupo_lectura', {
    id_grupo_lectura: {
        type: 'int2',
        allowNull: false,
        primaryKey: true
    },
    id_dispositivo: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'dispositivo',
            key: 'id_dispositivo'
        }
    }
});

grupoLectura.removeAttribute('id');
grupoLectura.belongsTo(dispositivo, { foreignKey: 'id_dispositivo' , targetKey: 'id_dispositivo'});


module.exports = grupoLectura;