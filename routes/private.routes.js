const { Router } = require("express");
const { celebrate: validate } = require("celebrate");

const validation = require('../validations/product.validation')
const Products = require("../controller/ProductController");
const auth = require("../policies/auth.policy");
const checkRole = require("../middleware/is_Admin.middleware");
const router = Router();

router
  .route("/product")
  .post(
    validate(validation.product, { abortEarly: false }),
    auth,
    checkRole,
    Products.ProductController
  );
router.route("/getproducts").get(Products.GetAllProducts);
router.route("/getsingleproduct/:_id").get(Products.getSingleProduct);
router
  .route("/updateproduct/:_id")
  .put(auth, checkRole, Products.updateProduct);
router
  .route("/deleteproduct/:_id")
  .delete(auth, checkRole, Products.deleteProduct);

module.exports = router;
