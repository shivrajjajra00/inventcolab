const express = require("express")
const router = express.Router()
const clientcontroller = require('../controllers/clientcontroller.js');
const dashboardcontroller = require('../controllers/dashboardcontroller.js')
// const { validateDbId, verifyToken } = require('../middlewares');

router.post('/users', async (req, res) => {
    clientcontroller.createUser(req, res);
});

router.get('/:id', async (req, res) => {
    dashboardcontroller.getById(req, res);
})


module.exports = router;
