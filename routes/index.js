const express = require('express');
const router = express.Router();
var passport = require("passport");

const sprintController = require('../controllers/sprintController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(sprintController.homePage));

router.get('/sprints', passport.authenticate('jwt', { session: false }), catchErrors(sprintController.getSprints))

router.post('/sprints', passport.authenticate('jwt', { session: false }), catchErrors(sprintController.createSprint))

router.post('/register', catchErrors(userController.register))

router.post('/login', catchErrors(authController.login));


module.exports = router;
