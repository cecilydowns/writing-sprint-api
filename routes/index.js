const express = require('express');
const router = express.Router();

const sprintController = require('../controllers/sprintController')

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(sprintController.homePage));

module.exports = router;
