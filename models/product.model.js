import connection from '../database/databaseConnection.js';

// Constructur for creating a product instance

function Product(product){
    this.productName = product.product_name;
    this.price = product.price;
    this.discountedPrice = product.discounted_price;
    this.brand = product.brand;
    this.size = product.size;
    this.productImageUrl = product.productImageUrl;
    this.sectionId = product.sectionId;
    this.sellerId = product.seller_id;
}

// Create new product
Product.create = (newProduct, result) => {
    connection.query("INSERT INTO products SET ?", newProduct, (err, res) => {
      if (err) {
        console.log("error_inserting:  ", err);
        result(err, null);
        return;
      }
      console.log("product added: ", { id: res.name, ...newProduct });
      result(null, { id: res.name, ...newProduct });
    });
  };
  
  Product.findById = (productId, result) => {
    connection.query(`SELECT * FROM products WHERE product_id =   ${productId}`, (err, res) => {
      if (err) {
        console.log("error fetching product:  ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Found Product: ", res[0]);
        result(null, res[0]);
      }
      result({ kind: "not_found" }, null);
    });
  };
  
  Product.getAll = (result) => {
    connection.query(`SELECT * FROM products`, (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }
      console.log("products: ", res);
      result(null, res);
    });
  };
  
  Product.updateById = (productId, product, result) => {
    connection.query(
      `UPDATE products SET name=?, price=?, brand=?, size=?, productImageUrl=?, description=?, discountedPrice=? WHERE _id =? `,
      [
        product.name,
        product.price,
        product.brand,
        product.size,
        product.productImageUrl,
        product.description,
        product.discountedPrice,
        productId,
      ],
      (err, res) => {
        if (err) {
          console.log("error updating:  ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Product: ");
        result(null, { _id: productId, ...product });
      }
    );
  };
  
  Product.remove = (productId, result) => {
    connection.query(`DELETE FROM products WHERE _id =   ${productId}`, (err, res) => {
      if (err) {
        console.log("error deleting product:  ", err);
        result(err, null);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Deleted Product: ");
      result(null, res);
    });
  };
  
  Product.removeAll = (result) => {
    connection.query(`TRUNCATE TABLE products`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} products`);
      result(null, res);
    });
  };

  export default Product;