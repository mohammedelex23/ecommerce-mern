const Product = require("../models/product.model");
const { BadRequest, NotFound } = require("../error/errorClass");
const fs = require("fs");
const path = require("path");

async function getAllProducts(req, res, next) {
  try {
    let producs = await Product.find({});
    res.status(200).json(producs);
  } catch (error) {
    next(error);
  }
}

async function getOneProduct(req, res, next) {
  try {
    let product = await Product.findById(req.params.id);
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
    const { name, price, description, image } = req.body;
    // remove duplicate if found
    let product = await Product.findOne({ name });
    if (product) {
      removeImage(req.file.path);
      return next(
        new BadRequest(`product with name: ${name} is already exists`)
      );
    }
    product = new Product({
      name,
      price,
      description,
      image,
    });
    product = await product.save();
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
      removeImage(image);
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
      removeImage(oldImage);
    }
    res.status(200).json(newProduct);
  } catch (error) {
    removeImage(req.body.image);
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

    res.sendFile(path.join(__dirname, "../", product.image), function (err) {
      // console.log(__dirname);
    });
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
    removeImage(product.image);
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

function removeImage(path) {
  fs.rm(path, function (err) {
    if (err) console.log(err);
  });
}
