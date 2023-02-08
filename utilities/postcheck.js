const db = require('../postgresDB');
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

    //Insert in database a log of the data that arrives to the server to store it
    const insertText_1 = 'INSERT INTO public."logs" ("postlogs") VALUES($1);';
    const res_1 = await db.query(insertText_1, [req.body]);
    console.log(req.body);

    //Check if the data is correct
    if (!req.body?.lista) {
        res.statusCode = 400;
        return res.send({});
    }

    //Format the data to insert it in the database
    const [id_device, bateria, temperatura, humedad, flat, flon, timestamp, numero_satelites, varianza, velocidad, aceleracion_x, aceleracion_y, aceleracion_z, aceleracion_total, temperatura_termmocupla] = req.body?.lista;
    var fecha = new Date(timestamp + "UTC+5");
    const data = [id_device, bateria, temperatura, humedad, flat, flon, fecha, numero_satelites, varianza, velocidad, aceleracion_x, aceleracion_y, aceleracion_z, aceleracion_total, temperatura_termmocupla];

    //Insert the data in the database, if the data is correct return code 200 and if not return code 400
    if (data?.every(element => !(element == null)) == true) {

        const insertText = 'CALL public.insertarlectura($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);';
        const res_db = await new Promise((resolve, reject) => {
            db.query(
                insertText,
                [id_device, bateria, temperatura, humedad, flat, flon, fecha, numero_satelites, varianza, velocidad,aceleracion_x, aceleracion_y, aceleracion_z, aceleracion_total, temperatura_termmocupla],
                (err, res1) => { if (err) resolve(err); else resolve(res1); }
            );
        });
        res.statusCode = res_db?.command ? 200 : 400;
    }

    //Return a void JSON just to check if the data is correct
    return res.send({});
}


module.exports = { postFunction, lastvalues };

