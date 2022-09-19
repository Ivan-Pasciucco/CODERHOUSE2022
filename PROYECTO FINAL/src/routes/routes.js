const router = require('express').Router();

router.use('/carrito', require('./cart.route'));
router.use('/', require('./index.route'));
router.use('/info', require('./info.server.route'));
router.use('/login', require('./login.route'));
router.use('mensajes', require('./chat.route'));
router.use('/productos', require('./product.route'));
router.use('/register', require('./register.route'));
router.use((req, res, next) => {
    res.redirect('/')
})

module.exports = router;