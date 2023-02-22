const express = require('express');
const router = express.Router();
const { postFunction, lastvalues } = require('../utilities/postcheck');
const getGroupIndex = require('../utilities/getGroupIndex');

/** GET home page.
 * @route GET /
 * @returns {object} 200 - An array of last 10 values registered sended to the api
 * @returns {Error}  default - Unexpected error
 * @produces application/json
 * @consumes application/json 
*/
router.route('/')
  .all((req, res, next) => {
    console.log(req.body);
    res.set('Content-Type', 'application/json');
    res.statusCode = 200;
    next();
  })
  .post(postFunction)
  .get(getGroupIndex);

router.route('/lastvalues').get(async (req, res, next) => { res.send({ status: lastvalues }); });
router.route('/favicon.ico').get((req, res, next) => { res.send({ data: null }); });
module.exports = router;

