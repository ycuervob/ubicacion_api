const { sequelize, Sequelize } = require('../config/sequelize.js');
const dispositivo = require('./dispositivo.js');
const grupoLectura = require('./grupoLectura.js');

const lecturaDispositivo = sequelize.define('lectura_de_dispositivos', {
    id_dispositivo: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: dispositivo,
            key: 'id_dispositivo'
        },
    },
    longitud: {
        type: Sequelize.FLOAT(8),
        allowNull: false
    },
    latitud: {
        type: Sequelize.FLOAT(8),
        allowNull: false
    },
    timestamp: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    storedtime: {
        type: 'TIMESTAMP',
        allowNull: true,
        default: `(now() AT TIME ZONE 'america/bogota'::text)`,
    },
    temperatura: {
        type: Sequelize.FLOAT(8),
        allowNull: false
    },
    humedad: {
        type: Sequelize.FLOAT(8),
        allowNull: false
    },
    num_satellites: {
        type: 'int2',
        allowNull: false
    },
    varianza: {
        type: Sequelize.FLOAT(8),
        allowNull: true
    },
    aceleracion_x: {
        type: Sequelize.FLOAT(8),
        allowNull: true
    },
    aceleracion_y: {
        type: Sequelize.FLOAT(8),
        allowNull: true
    },
    aceleracion_z: {
        type: Sequelize.FLOAT(8),
        allowNull: true
    },
    aceleracion_total: {
        type: Sequelize.FLOAT(8),
        allowNull: true
    },
    velocidad: {
        type: Sequelize.FLOAT(8),
        allowNull: true
    },
    temperatura_termocupla: {
        type: Sequelize.FLOAT(8),
        allowNull: true
    },
    id_grupo_lectura: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'grupo_lectura',
            key: 'id_grupo_lectura'
        }
    }
}
);
lecturaDispositivo.belongsTo(grupoLectura, { foreignKey: 'id_grupo_lectura', targetKey: 'id_grupo_lectura' });
lecturaDispositivo.belongsTo(dispositivo, { foreignKey: 'id_dispositivo', targetKey: 'id_dispositivo' });
lecturaDispositivo.removeAttribute('id');

module.exports = lecturaDispositivo;