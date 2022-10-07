const express = require('express');
const router = express.Router();
const { postFunction, lastvalues } = require('../utilities/postcheck');

router.route('/')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    console.log(lastvalues);
    res.statusCode = 200;
    next();
  })
  .post(postFunction)
  .get(async (req, res, next) => { res.send({ status: "server running" }); });

module.exports = router;


