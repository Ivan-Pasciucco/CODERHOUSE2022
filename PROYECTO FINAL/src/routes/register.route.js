const router = require('express').Router();
const registerController = require('../controllers/register.controller');


router.get('/', registerController.registro);
router.get('/error', registerController.error);
router.get('/exito', registerController.exito);
router.get('/logout', registerController.logout);
router.post('/', registerController.registrar);


module.exports = router;