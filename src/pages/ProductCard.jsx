import React from "react";
import { useLocation } from "wouter";
import { useCart } from "../stores/CartStore";
import { useFlashMessage } from "../stores/FlashMessageStore";

const ProductCard = (props) => {
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();

  const handleAddToCart = () => {
    addToCart(props);
    showMessage("Item added to cart", "success");
    setLocation("/shopping-cart");
  };


  return (
    <>
      <div key={props.product.product_id} className="group relative">
        <img
          alt={props.product.name}
          src={props.product.image}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              {/* <a href={product.href}> */}
              <span aria-hidden="true" className="absolute inset-0" />
              {props.product.name}
              {/* </a> */}
            </h3>
            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
          </div>
          <p className="text-sm font-medium text-gray-900">
            ${props.product.price}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <button
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
