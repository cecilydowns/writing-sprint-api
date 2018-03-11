const express = require('express');
const router = express.Router();
var passport = require("passport");

const sprintController = require('../controllers/sprintController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(sprintController.homePage));

router.get('/projects', passport.authenticate('jwt', { session: false }), catchErrors(projectController.getProjects))
router.post('/projects', passport.authenticate('jwt', { session: false }), catchErrors(projectController.createProject))

router.get('/sprints', passport.authenticate('jwt', { session: false }), catchErrors(sprintController.getSprints))
router.post('/sprints', passport.authenticate('jwt', { session: false }), catchErrors(sprintController.createSprint))

router.post('/register', catchErrors(userController.register))
router.post('/login', catchErrors(authController.login));



// Set up Facebook auth routes
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

// Set up Google auth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));



module.exports = router;
