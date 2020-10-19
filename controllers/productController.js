const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error.message);
  }
}

// @desc    Get single Product
// @route   GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ product }));
    }
  } catch (error) {
    console.log(error.message);
  }
}

// @desc    Create a Product
// @route   POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const product = {
      name,
      description,
      price,
    };

    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error.message);
  }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
  const product = await Product.findById(id);

  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Products Not Found" }));
  } else {
    const body = await getPostData(req);

    const { name, description, price } = JSON.parse(body);

    //If there is any of item that wasn't updated
    const productData = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
    };

    const updateProduct = await Product.update(productData, id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updateProduct));
  }
}

async function deleteProduct(req, res, id) {
    const product = await Product.findById(id);
    if(!product){
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'Product Not Found'}));
    }else{
        const deleteProduct = await Product.deleteById(id);
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(deleteProduct));
    }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
