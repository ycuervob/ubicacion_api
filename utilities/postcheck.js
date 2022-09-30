const db = require('../postgresDB');

/***
 * request forma: 
 * req.body = { lista:[id_device, bateria, temperatura, humedad, flat, flon, timestamp, numero_satelites, varianza]}
 */

async function postFunction(req, res, next) {

    //Insert in database a log of the data that arrives to the server to store it
    const insertText_1 = 'INSERT INTO public."logs" ("postlogs") VALUES($1);';
    const res_1 = await db.query(insertText_1, [req.body]);

    if (!req.body?.lista) {
        res.statusCode = 400;
        return res.send({});
    }


    const [id_device, bateria, temperatura, humedad, flat, flon, timestamp, numero_satelites, varianza] = req.body?.lista;
    const data = [id_device, bateria, temperatura, humedad, flat, flon, timestamp, numero_satelites, varianza];

    if (data?.every(element => !(element == null)) == true) {

        const insertText = 'CALL public.insertarlectura($1,$2,$3,$4,$5,$6,$7,$8,$9);';
        const res_db = await new Promise((resolve, reject) => {
            db.query(
                insertText,
                [id_device, bateria, temperatura, humedad, flat, flon, timestamp, numero_satelites, varianza],
                (err, res1) => { if (err) resolve(err); else resolve(res1); }
            );
        });
        res.statusCode = res_db?.command ? 200 : 503;
        return res.send({});
    }

    res.statusCode = 400;
    return res.send({});
}

module.exports = postFunction;

