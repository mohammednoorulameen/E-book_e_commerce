import React, { useEffect, useState } from "react";
import { useGetProductsDetailsQuery } from "../../../../Services/Apis/UserApi";
import { useParams } from "react-router-dom";
import {
FaArrowLeft,
FaArrowRight
} from "react-icons/fa";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const { data } = useGetProductsDetailsQuery(product_id);
  const [currenImageIndex,setCurrentImageIndex]=useState(0)
  const [review,setReview]=useState([0])
  const [rating,Setrating]=useState(0)
console.log(review)
  useEffect(() => {
    if (data && data.productDetails) {
      setProduct(data.productDetails); 
      setReview(data.productDetails.review || []);
      const totalStar = data?.productDetails.review?.reduce((acc, obj)=>
        acc + obj.star,0
      );
      const avgStar = Math.round(totalStar/ data.productDetails.review.length)
      Setrating(avgStar)
    }
  }, [data]);

  // if ( data.productDetails.review) {
  //   setReview(data.productDetails.review)
  // }
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 0 && setQuantity(quantity - 1);

  const HandlePrevtImage=()=>{
    if (product.images?.length >0) {
      setCurrentImageIndex((prevIndex)=>(prevIndex-1)%product.images.length)
    }
  }
  const HandleNextImage=()=>{
    if (product.images?.length >0) {
      setCurrentImageIndex((prevIndex)=>(prevIndex+1)%product.images.length)
    }
  }
  return (
    <div className="p-8 bg-gray-100 " >
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <div className="grid grid-cols-3 gap-6">
        
        <div className="col-span-1">
          <img
            src={product.images?.[currenImageIndex] || "path/to/default-image.jpg"} 
            alt={product.productName || "Product Image"}
            className="w-full h-auto mb-4 border"
          />

          <div className="flex space-x-2">
            {product.images?.map((thumb, index) => (
              <img
                key={index}
                src={thumb || "path/to/default-thumbnail.jpg"}
                alt={`Thumbnail ${index + 1}`}
                className="h-16 w-16 border"
              />
            ))}
          </div>
          <button onClick={HandlePrevtImage}>
          <FaArrowLeft />
          </button>
          <button onClick={HandleNextImage}>
            <FaArrowRight/>
          </button>
        </div>

        {/* Middle: Product Info */}
        <div className="col-span-1">
        {product.stock>0 ?( 
        <div className="text-green-600 font-semibold mb-2">
          In Stock
        </div>):( 
          <div className="text-gray-600 font-semibold rounded mb-2 ">
          out of Stock
        </div>)
      }
          {/* <p className="text-green-600 font-semibold mb-2">In Stock</p> */}
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-yellow-500">
            ★★★★☆ ({rating} Customer Review)
          </p>
          <p className="line-through text-gray-400 mt-2">Price: Rs. {product.originalPrice}</p>
          <p className="text-2xl font-bold mt-1">Price: Rs. {product.price}</p>

          <button className="mt-4 px-4 py-2 bg-black text-white rounded">
            Wishlist ♥
          </button>

          <div className="flex items-center mt-6">
            <p className="mr-4 font-semibold">Quantity:</p>
            <button
              onClick={handleDecrement}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              +
            </button>
          </div>

          <p className="mt-4 text-gray-600">By: {product.author}</p>

          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-2 bg-orange-500 text-white rounded">
              Add to Cart 🛒
            </button>
            <button className="px-6 py-2 bg-yellow-400 text-white rounded">
              Buy Now
            </button>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="col-span-1 p-4 bg-white border">
          <h3 className="text-xl font-bold mb-4">Product Details</h3>
          <ul className="space-y-2">
            <li><strong>Name:</strong> {product.productName}</li>
            <li><strong>Author:</strong> {product.author}</li>
            <li><strong>Publisher:</strong> {product.publisher}</li>
            <li><strong>Language:</strong> {product.language}</li>
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>Discription:</strong> {product.description}</li>
          </ul>
        </div>
      </div>

      {/* Add Review Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Add Review</h3>
        <form className="mt-4">
          <div className="mb-4">
            <p>Rating:</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500">
                  ★
                </span>
              ))}
            </div>
          </div>

          <textarea
            className="w-full border p-2 rounded mb-4"
            rows="3"
            placeholder="Write your review here..."
          ></textarea>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>

      Latest Reviews
      <div className="mt-8">
        <h3 className="text-xl font-bold">Latest Reviews</h3>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {review.length > 0 ? (
          review.map((review, index) => (
            <div key={index} className="p-4 bg-white border rounded">
              <p className="text-yellow-500">★★★★★</p>
              <p className="font-bold">Review Title</p>
              <p className="text-sm text-gray-500">Review body...</p>
              <p className="text-sm text-gray-400">Reviewer name</p>
              <p className="text-sm text-gray-400">Date</p>
            </div>
          ))):(
            <p>no review yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
