const express = require("express")
const router = express.Router()
const clientcontroller = require('../controllers/clientcontroller.js');
const clientlistcontroller = require("../controllers/clientcontroller.js")
// const { validateDbId, verifyToken } = require('../middlewares');

router.post('/users', async (req, res) => {
    clientcontroller.createUser(req, res);
});
router.post("/addproduct", clientlistcontroller.tokenVerification);
router.get("/productlist", clientlistcontroller.getProductList);
router.get("/findone/:id", clientlistcontroller.findOneProduct);
router.put("/update/:id", clientlistcontroller.updateProductList);
router.delete("/delete/:id", clientlistcontroller.deleteProduct);
router.get("/search/:key", clientlistcontroller.searchProduct);

// router.get('/:id', async (req, res) => {
//     try {
//         await dashboardcontroller.getById(req, res, next);
//     } catch (err) {
//         // Handle any errors here
//         console.error(err);
//         res.status(500).json({
//             status: 500,
//             message: "Internal server error",
//             data: ["Error in getById:", err.message],
//         });
//     }
// })

router.get('/users', clientcontroller.getAllUsers);

// Assuming you have a router set up
router.delete('/users/:id', clientcontroller.deleteUser);

router.get('/users/:id', clientcontroller.getUserById);

module.exports = router;
