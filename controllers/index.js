const router = require('express').Router();
const feederRoutes = require('./techRoutes');

router.use('/',techRoutes);

module.exports = router;