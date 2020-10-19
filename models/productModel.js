const products = require("../data/products");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((x) => x.id == id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = {
      id: uuidv4(),
      ...product,
    };
    //Add product into array model
    products.push(newProduct);
    //overwrite json file
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function update(product, id) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((x) => x.id == id);
    products[index] = { id, ...product };
    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function deleteById(id){
    return new Promise((resolve, reject)=>{
        const newProduct = products.filter(x=> x.id !== id);
        writeDataToFile("./data/products.json", newProduct);
        resolve(newProduct);
    })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById
};
