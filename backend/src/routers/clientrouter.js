const express = require("express")
const router = express.Router()
const clientcontroller = require('../controllers/clientcontroller.js');
// const { validateDbId, verifyToken } = require('../middlewares');

router.post('/users', async (req, res) => {
    clientcontroller.createUser(req, res);
});

module.exports = router;
