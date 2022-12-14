const db = require('../postgresDB');

/***
 * request forma: 
 * req.body = { lista:[id_device, bateria, temperatura, humedad, flat, flon, timestamp, numero_satelites, varianza]}
 */

var lastvalues = new Array(10);
var i = 0;

async function postFunction(req, res, next) {

    lastvalues[i] = req.body; i++;
    if (i >= 10) i = 0;

    //Insert in database a log of the data that arrives to the server to store it
    const insertText_1 = 'INSERT INTO public."logs" ("postlogs") VALUES($1);';
    const res_1 = await db.query(insertText_1, [req.body]);
    console.log(req.body);

    if (!req.body?.lista) {
        res.statusCode = 400;
        return res.send({});
    }

    const [id_device, bateria, temperatura, humedad, flat, flon, timestamp, numero_satelites, varianza, velocidad, aceleracion_x, aceleracion_y, aceleracion_z, aceleracion_total, temperatura_termmocupla] = req.body?.lista;
    var fecha = new Date(timestamp + "UTC+5");
    const data = [id_device, bateria, temperatura, humedad, flat, flon, fecha, numero_satelites, varianza, velocidad, aceleracion_x, aceleracion_y, aceleracion_z, aceleracion_total, temperatura_termmocupla];

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

    return res.send({});
}


module.exports = { postFunction, lastvalues };

