const express = require('express');
const router = express.Router();
const { postFunction, lastvalues } = require('../utilities/postcheck');

router.route('/flavico').get((req, res, next) => { res.send({ data: null }); });

router.route('/')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    res.statusCode = 200;
    next();
  })
  .post(postFunction)
  .get(async (req, res, next) => { res.send({ ultimos_10_valores: lastvalues }); });

module.exports = router;


