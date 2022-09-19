const router = require('express').Router();
const chatController = require('../controllers/chat.controller');
const isAuth = require('../middlewares/isAuth');

router.post('/', chatController.newMessage);
router.get('/', isAuth, chatController.getMessages);

module.exports = router;