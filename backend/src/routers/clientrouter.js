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

module.exports = router;
