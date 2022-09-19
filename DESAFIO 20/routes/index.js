const router = require('../controllers/middlewares/session');
const index = require('../controllers/index');

router.get('/', index);

module.exports = router;