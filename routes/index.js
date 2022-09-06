const express = require('express');
const db = require('../postgresDB');
const router = express.Router();

router.route('/')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.statusCode = 200;
    next();
  })
  .post(postFunction)
  .get(async (req, res, next) => {
    res.send({ status: "server running" });
  });

async function postFunction(req, res, next) {

  const insertText_1 = 'INSERT INTO public."logs" ("postlogs") VALUES($1);';
  const res_1 = await db.query(insertText_1, [req.body]);

  const ub = req.body;
  if (ub.x && ub.y && ub.id_dipositivo && ub.t_lectura && ub.humedad && ub.temperatura) {
    // MISSING OTHER CHECKUPS
    const insertText = 'INSERT INTO public.lectura_de_dispositivo ("id_dispositivo", x, y, "timestamp", temperatura, humedad) VALUES($1, $2, $3, $4, $5, $6);';
    const res = await db.query(insertText, [ub.id_dipositivo, ub.x, ub.y, ub.t_lectura, ub.temperatura, ub.humedad]);

  }

  res.send(req.body);
}

module.exports = router;


