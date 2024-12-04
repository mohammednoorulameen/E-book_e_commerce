import Products from "../../Models/ProductModel.js";
import mongoose from "mongoose";

/**
 * list  products
 */

const ListProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit; 
    const category = req.query.category;
    const sort = req.query.sort || "" ;

    const sortOption = {};
    if (sort == 'price-accending')  sortOption.price = 1;   
    if (sort == 'price-descending') sortOption.price = -1;
    if (sort == 'Popularity') sortOption.price = -1
    if (sort == 'newest')  sortOption.createdAt = -1

    /**
     * filtering category
     */

    const categoryFilter = { status : true };
    if (category && category !=  "all") {
      categoryFilter.category = category
    }

    const allProducts = await Products.find(categoryFilter)
    const products = await Products.find(categoryFilter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const totalProducts = await Products.countDocuments(categoryFilter);
    const totalPage = Math.ceil(totalProducts / limit);
    const currentPage = page;

    if (!products || products.length === 0) {
      return res.status(401).json({ message: "block products" });
    }
    res
      .status(200)
      .json({
        message: "products listing succussfully",
        totalPage,
        totalProducts,
        currentPage,
        products,
        allProducts
      });
  } catch (error) {
    res.status(500).json({ message: "error retrieve products" });
  }
};

/**
 * Get single product details
 */
const ProductDetails = async (req, res) => {
  const { product_id } = req.query;
  // console.log("check ",product_id);

  try {
    // Ensure product_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find the product by ID
    const productDetails = await Products.findById(product_id);

    if (!productDetails) {
      return res.status(404).json({ message: "Product details not found" });
    }

    res.status(200).json({ message: "Success", productDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export { ProductDetails, ListProduct };
