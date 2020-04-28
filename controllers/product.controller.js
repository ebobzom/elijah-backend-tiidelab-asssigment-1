import Product from "../models/product.model.js";

export const create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Form cannot be empty",
    });
  }

  const product = new Product({
    name: req.body.product_name,
    price: req.body.price,
    discountedPrice: req.body.discounted_price,
    brand: req.body.brand,
    size: req.body.size,
    productImageUrl: req.body.product_image_url,
    sectionId: req.body.section_id,
    sellerId: req.body.seller_id,
    description: req.body.description,
  });

  Product.create(product, (err, data) => {
      console.log(product)
    if (err)
      res.status(500).json({
        message: err.message || "errored while adding your product",
      });
    else res.status(201).json(data);
  });
};

export const findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "errored while retrieving .",
      });
    else res.status(200).json(data);
  });
};

export const findOne = (req, res) => {
  Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.productId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.productId,
        });
      }
    } else res.status(200).json(data);
  });
};

export const update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  Product.updateById(
    req.params.productId,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.productId}.`,
          });
          return;
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.productId,
          });
          return;
        }
      } else res.status(200).json(data);
    }
  );
};

export const deleteOne = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.productId,
        });
      }
    } else res.status(200).json({ message: `product was deleted successfully!` });
  });
};


export const deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err) {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while removing all products .",
        });
    } else res.status(200).json({message: `All products  were deleted successfully` });
  });
};