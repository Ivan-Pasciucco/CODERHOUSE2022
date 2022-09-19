const router = require('express').Router();
const loginController = require('../controllers/login.controller');

router.get('/', loginController.login);
router.get('/error', loginController.error);
router.post('/', loginController.loguear);
router.get('/logout',loginController.logout);

module.exports = router;