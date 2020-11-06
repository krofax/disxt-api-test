import { OK, BAD_REQUEST, BAD_GATEWAY } from "http-status";

import sendResponse from "../helpers/response";
import ProductModel from "../model/product";

export async function ProductController(req, res) {
  try {
    const { id } = req.token;
    const newProduct = new ProductModel({
      ...req.body,
      created_by: id,
    });
    const createdProduct = await newProduct.save();
    res.json(sendResponse(OK, "Product created", createdProduct));
  } catch (error) {
    res.json(sendResponse(BAD_REQUEST, "Product was not created"));
  }
}

export async function GetAllProducts(req, res) {
  try {
    const listProducts = await ProductModel.find();
    res.json(sendResponse(OK, "Product retrieved", listProducts));
  } catch (err) {
    res.json(sendResponse(BAD_GATEWAY, "Products not retrieved"));
  }
}

export async function getSingleProduct(req, res) {
  const { _id } = req.params;
  try {
    const getOneProduct = await ProductModel.findById({ _id });
    res.json(sendResponse(OK, "Product retrieved", getOneProduct));
  } catch (error) {
    res.json(
      sendResponse(
        BAD_GATEWAY,
        "Cannot get product because id is not correct"
      )
    );
  }
}

export async function updateProduct(req, res, next) {
  try {
    const update = req.body;
    const { _id } = req.params;
    await ProductModel.findByIdAndUpdate(_id, update);
    const product = await ProductModel.findById(_id);
    res.json(sendResponse(OK, "Product updated", product));
  } catch (error) {
    res.json(
      sendResponse(
        BAD_REQUEST,
        "Product not updated because id is not correct"
      )
    );
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { _id } = req.params;
    await ProductModel.findByIdAndDelete({ _id });
    res.json(sendResponse(OK, "Product deleted"));
  } catch (error) {
    res.json(
      sendResponse(
        BAD_REQUEST,
        "Product not deleted because id is not correct"
      )
    );
    next(error);
  }
}
