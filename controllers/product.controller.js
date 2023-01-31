const Product = require("../models/product.model");
const { BadRequest, NotFound } = require("../error/errorClass");
const fs = require("fs");
const path = require("path");

async function getAllProducts(req, res, next) {
  try {
    let producs = await Product.find({}).select("-image");
    res.status(200).json(producs);
  } catch (error) {
    next(error);
  }
}

async function getOneProduct(req, res, next) {
  try {
    let product = await Product.findById(req.params.id).select("-image");
    if (!product) {
      return next(
        new NotFound(`product with id ${req.params.id} is not found`)
      );
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    let { name, price, description, image: file } = req.body;

    // remove duplicate if found
    let product = await Product.findOne({ name });
    if (product) {
      return next(
        new BadRequest(`product with name: ${name} is already exists`)
      );
    }
    let image = {};
    image.data = fs.readFileSync(file.filepath);
    image.contentType = file.mimetype;
    product = new Product({
      name,
      price,
      description,
      image,
    });
    product = await product.save();
    product.image = undefined;
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { name, description, price, image } = req.body;
    let oldProduct = await Product.findById(req.params.id);
    if (!oldProduct) {
      return next(
        new NotFound(`product with id ${req.params.id} is not found`)
      );
    }

    oldProduct.name = name || oldProduct.name;
    oldProduct.price = price || oldProduct.price;
    oldProduct.description = description || oldProduct.description;
    let oldImage = oldProduct.image;
    oldProduct.image = image || oldProduct.image;

    let newProduct = await oldProduct.save();
    if (image) {
      // remove old image
    }
    newProduct.image = undefined;
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
}

async function getProductImage(req, res, next) {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new NotFound(`product with id ${req.params.id} is not found`)
      );
    }
    res.set("Content-Type", product.image.contentType);
    res.send(product.image.data);

    // res.sendFile(path.join(__dirname, "../", product.image), function (err) {
    //   // console.log(__dirname);
    // });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new NotFound(`product with id ${req.params.id} is not found`)
      );
    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).send("Deleted successfully");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImage,
};
