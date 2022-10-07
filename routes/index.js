const express = require('express');
const router = express.Router();
const { postFunction, lastvalues } = require('../utilities/postcheck');

router.route('/favicon.ico').get((req, res, next) => { res.send({ data: null }); });

router.route('/')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.statusCode = 200;
    next();
  })
  .post((req, res, next) => { console.log(req.body) }, postFunction)
  .get(async (req, res, next) => { res.send({ status: "server running" }); });
module.exports = router;


