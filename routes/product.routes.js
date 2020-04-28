import { create, findAll, findOne, update, deleteOne, deleteAll} from "../controllers/product.controller.js";

function routeHandler(app) {
    // Add a Product
    app.post("/products", create);
  
    //Retrive all Product
    app.get("/products", findAll);
  
    // Retrieve one products
    app.get("/products/:productId", findOne);
  
    // Edit Product
    app.put("/products/:productId", update);
  
    // Delete Product
    app.delete("/products/:productId", deleteOne);
  
    //Delete All Products
    app.delete("/products", deleteAll);
  
  };

  export default routeHandler;