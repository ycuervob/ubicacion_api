const express = require('express');
const router = express.Router();
const { postFunction, lastvalues } = require('../utilities/postcheck');

router.route('/')
  .all((req, res, next) => {
    console.log(req.body);
    res.set('Content-Type', 'application/json');
    res.statusCode = 200;
    next();
  })
  .post(postFunction)
  .get(async (req, res, next) => { res.send({ status: "server running" }); });

router.route('/favicon.ico').get((req, res, next) => { res.send({ data: null }); });
module.exports = router;

