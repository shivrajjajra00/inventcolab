const express = require("express")
const router = express.Router()
const clientcontroller = require('../controllers/clientcontroller.js');

// const { validateDbId, verifyToken } = require('../middlewares');

router.post('/users', async (req, res) => {
    clientcontroller.createUser(req, res);
});

router.get('/users', clientcontroller.getAllUsers);
router.delete('/users/:id', clientcontroller.deleteUser);
router.get('/users/:id', clientcontroller.getUserById);

module.exports = router;
