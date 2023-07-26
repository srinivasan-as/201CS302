const express = require('express');
const router = express.Router();

const {
    getAllTrains,
    getTrain,
    auth,
    register
} = require('../controllers/trains');

/**
 * @route GET /trains
 * @description get all Trains
 * @access private
 */
router.get('/trains', getAllTrains);

/**
 * @route GET /trains/:id
 * @description get train
 * @access private
 */
router.get('/trains/:id', getTrain);

/**
 * @route POST /register
 * @description register company
 * @access public
 */
router.post('/register', register);

/**
 * @route POST /auth
 * @description get access token
 * @access public
 */
router.post('/auth', auth);

module.exports = router;