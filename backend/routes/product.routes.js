const router = require("express").Router();
const productCtrl = require("../controllers/product.controller");
const {
  validateCreate,
  validateUpdate,
} = require("../middlewares/productValidationMiddlewares");

router.get("/", productCtrl.getAllProducts);
router.get("/:id", productCtrl.getOneProduct);
router.post("/", validateCreate, productCtrl.createProduct);
router.put("/:id", validateUpdate, productCtrl.updateProduct);
router.delete("/:id", productCtrl.deleteProduct);
router.get("/:id/image", productCtrl.getProductImage);
module.exports = router;
