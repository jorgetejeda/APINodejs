const http = require("http");
const EventEmitter = require("events");
const emitter = new EventEmitter();

const ProductController = require("./controllers/productController");
const product = new ProductController();

//Listener
product.on("GET_PRODUCT", () => {
  console.log("Get product");
});

product.on("GET_PRODUCT_BY_ID", (arg) => {
  console.log("Get product by id", arg);
});

product.on("POST_PRODUCT", (arg) => {
  console.log("Post product", arg);
});

product.on("PUT_PRODUCT", (arg) => {
  console.log("Update product by id", arg);
});

product.on("DELETE_PRODUCT", (arg) => {
  console.log("Delete product by id", arg);
});

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    product.getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3]; // api/products/1
    product.getProduct(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    product.createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3]; // api/products/1
    product.updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    product.deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("Running 4000");
});
