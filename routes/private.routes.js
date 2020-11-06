import { Router } from "express";
import { celebrate as validate } from "celebrate";

import { product } from '../validations/product.validation';
import { ProductController, GetAllProducts, getSingleProduct, updateProduct, deleteProduct } from "../controller/ProductController";
import auth from "../policies/auth.policies";
import checkRole from "../middleware/is_Admin.middleware";
const router = Router();

router
  .route("/product")
  .post(
    validate(product, { abortEarly: false }),
    auth,
    checkRole,
    ProductController
  );
router.route("/getproducts").get(GetAllProducts);
router.route("/getsingleproduct/:_id").get(getSingleProduct);
router
  .route("/updateproduct/:_id")
  .put(auth, checkRole, updateProduct);
router
  .route("/deleteproduct/:_id")
  .delete(auth, checkRole, deleteProduct);

export default router;
