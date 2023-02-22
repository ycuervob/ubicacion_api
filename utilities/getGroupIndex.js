const grupoLectura = require('../database/models/grupoLectura.js');
const dispositivo = require('../database/models/dispositivo.js');


async function getGroupIndex(req, res, next) {
    try {
        if (!req.query?.id_dispositivo) return res.status(400).json({ error: "id_dispositivo is required" });
        const dispositivoExists = await dispositivo.findOne({ where: { id_dispositivo: req.query.id_dispositivo } });
        if (!dispositivoExists) return res.status(400).json({ error: "Dispositivo no registrado" });
        var currIndex = await grupoLectura.max('id_grupo_lectura');
        await grupoLectura.create({ id_dispositivo: req.query.id_dispositivo, id_grupo_lectura: currIndex + 1 });

        return res.status(200).json({ currIndex });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}


module.exports = getGroupIndex;