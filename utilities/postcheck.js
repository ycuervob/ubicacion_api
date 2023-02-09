const lecturaDispositivo = require('../database/models/lecturaDispositivo.js');
const logs = require('../database/models/logs.js');
const dispositivo = require('../database/models/dispositivo.js');
var lastvalues = new Array(10);
var i = 0;

/**POST function to insert data in the database
 * @route POST /
 * @param {object} req.body - The data to insert in the database
 * @param {string} req.body.lista.id_device - The id of the device that sends the data
 * @param {string} req.body.lista.bateria - The battery level of the device
 * @param {string} req.body.lista.temperatura - The temperature of the device
 * @param {string} req.body.lista.humedad - The humidity of the device
 * @param {string} req.body.lista.flat - The latitude of the device
 * @param {string} req.body.lista.flon - The longitude of the device
 * @param {string} req.body.lista.timestamp - The timestamp of the device
 * @param {string} req.body.lista.numero_satelites - The number of satellites of the device
 * @param {string} req.body.lista.varianza - The variance of satellite signal of the device
 * @param {string} req.body.lista.velocidad - The speed of the device
 * @param {string} req.body.lista.aceleracion_x - The acceleration in the x axis of the device
 * @param {string} req.body.lista.aceleracion_y - The acceleration in the y axis of the device
 * @param {string} req.body.lista.aceleracion_z - The acceleration in the z axis of the device
 * @param {string} req.body.lista.aceleracion_total - The total acceleration of the device
 * @param {string} req.body.lista.temperatura_termmocupla - The temperature of the thermocouple of the device
 * @returns {object} 200 - The data inserted in the database
 * @returns {Error}  400 - Bad Request
 * @produces application/json
 * @consumes application/json  
 */

async function postFunction(req, res, next) {

    //Save the last 10 values in an array to show them in the Get "/" request
    lastvalues[i] = req.body; i++;
    if (i >= 10) i = 0;

    try {
        //Insert in database a log of the data that arrives to the server to store it
        const inserted_log = await logs.create({ postlogs: req.body });
       
        //Format the data to insert it in the database
        var data = req.body?.lista;
        data[6] = new Date(data[6] + "UTC+5");

        //Check if the device exists in the database and update the battery level
        const dispositivoExists = await dispositivo.findOne({ where: { id_dispositivo: data[0] } });
        if (!dispositivoExists) {
            return res.status(400).send({ message: "Bad Request",error: "The device does not exist in the database"});
        }
        dispositivoExists.batery = data[1];
        dispositivoExists.save();

        //Insert the data in the database
        const inserted_lectura = await lecturaDispositivo.create({
            id_dispositivo: data[0],
            temperatura: data[2],
            humedad: data[3],
            latitud: data[4],
            longitud: data[5],
            timestamp: data[6],
            num_satellites: data[7],
            varianza: data[8],
            velocidad: data[9],
            aceleracion_x: data[10],
            aceleracion_y: data[11],
            aceleracion_z: data[12],
            aceleracion_total: data[13],
            temperatura_termocupla: data[14]
        });

        //Return a void JSON just to check if the data is correct
        return res.status(200).send({});
    } catch (error) {
        return res.status(400).send({ message: "Bad Request",error: error?.errors || error?.parent?.detail || error?.parent || error});
    }
}


module.exports = { postFunction, lastvalues };

