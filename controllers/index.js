const router = require('express').Router();
const techRoutes = require('./techRoutes');

router.use('/', techRoutes);

module.exports = router;