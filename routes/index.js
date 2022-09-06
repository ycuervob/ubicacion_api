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
  res.send({status:"server running"});
});

async function postFunction(req, res, next){
  res.send(req.body);
}

module.exports = router;