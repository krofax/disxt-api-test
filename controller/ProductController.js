const httpStatus = require("http-status");

const sendResponse = require("../helpers/response");
const ProductQuery = require("../model/product");

exports.ProductController = async (req, res) => {
  try {
    const { id } = req.token;
    const newProduct = new ProductQuery({
      ...req.body,
      created_by: id,
    });
    const createdProduct = await newProduct.save();
    res.json(sendResponse(httpStatus.OK, "Product created", createdProduct));
  } catch (error) {
    res.json(sendResponse(httpStatus.BAD_REQUEST, "Product was not created"));
  }
};

exports.GetAllProducts = async (req, res) => {
  try {
    const listProducts = await ProductQuery.find();
    res.json(sendResponse(httpStatus.OK, "Product retrieved", listProducts));
  } catch (err) {
    res.json(sendResponse(httpStatus.BAD_GATEWAY, "Products not retrieved"));
  }
};

exports.getSingleProduct = async (req, res) => {
  const { _id } = req.params;
  try {
    const getOneProduct = await ProductQuery.findById({ _id });
    res.json(sendResponse(httpStatus.OK, "Product retrieved", getOneProduct));
  } catch (error) {
    res.json(
      sendResponse(
        httpStatus.BAD_GATEWAY,
        "Cannot get product because id is not correct"
      )
    );
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const update = req.body;
    const { _id } = req.params;
    await ProductQuery.findByIdAndUpdate(_id, update);
    const product = await ProductQuery.findById(_id);
    res.json(sendResponse(httpStatus.OK, "Product updated", product));
  } catch (error) {
    res.json(
      sendResponse(
        httpStatus.BAD_REQUEST,
        "Product not updated because id is not correct"
      )
    );
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { _id } = req.params;
    await ProductQuery.findByIdAndDelete({ _id });
    res.json(sendResponse(httpStatus.OK, "Product deleted"));
  } catch (error) {
    res.json(
      sendResponse(
        httpStatus.BAD_REQUEST,
        "Product not deleted because id is not correct"
      )
    );
    next(error);
  }
};
