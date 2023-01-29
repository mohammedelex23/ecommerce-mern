const router = require("express").Router();
const productCtrl = require("../controllers/product.controller");
const {
  validateCreate,
  validateUpdate,
} = require("../middlewares/productValidationMiddlewares");

const multer = require("multer");
const mimetypes = ["image/jpeg", "image/png", "image/jpg"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2097152 },
  fileFilter(req, file, cb) {
    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}); //max file size 2MB

router.get("/", productCtrl.getAllProducts);
router.get("/:id", productCtrl.getOneProduct);
router.post(
  "/",
  upload.single("image"),
  validateCreate,
  productCtrl.createProduct
);
router.put(
  "/:id",
  upload.single("image"),
  validateUpdate,
  productCtrl.updateProduct
);
router.delete("/:id", productCtrl.deleteProduct);
router.get("/:id/image", productCtrl.getProductImage);
module.exports = router;
