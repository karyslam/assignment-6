import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../stores/CartStore";
import { useJwt } from "../stores/UserStore";

export default function ShoppingCart() {
  const { cart, getCartTotal, modifyQuantity, removeFromCart, setCartContent } =
    useCart();
  const { getJwt } = useJwt();
  const [isUpdating, setIsUpdating] = useState(false);
  const isFirstRender = useRef(true); // Track first render

  const fetchCart = async () => {
    const jwt = getJwt();
    // console.log(jwt)
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/cart",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Cart:", response.data);
      setCartContent(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCart = async () => {
    setIsUpdating(true);
    const jwt = getJwt();
    console.log(cart)
    try {
      const updatedCart = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      await axios.put(
        process.env.REACT_APP_API_URL + "/api/cart",
        { cartItems: updatedCart },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip the first render
    }
    // console.log(cart)
    updateCart();
    return () => {
      console.log("cleanup");
    };
  }, [cart]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        <form className="mt-12">
          <div>
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {cart.map((product, productIdx) => (
                <li key={product.product_id} className="flex py-6 sm:py-10">
                  <div className="shrink-0">
                    <img
                      alt="flower"
                      src={product.image}
                      className="size-24 rounded-lg object-cover sm:size-32"
                    />
                  </div>

                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                          {product.size ? (
                            <p className="mt-1 text-sm text-gray-500">
                              {product.size}
                            </p>
                          ) : null}
                        </div>

                        <p className="text-right text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {product.name}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base/5 font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          disabled={isUpdating}
                          onChange={(e) =>
                            modifyQuantity(product.product_id, e.target.value)
                          }
                          value={product.quantity}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
                            <option value={x}>{x}</option>
                          ))}
                        </select>

                        <button
                          type="button"
                          className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                          onClick={() => removeFromCart(product.product_id)}
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-green-500"
                        />
                      ) : (
                        <ClockIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-300"
                        />
                      )}

                      <span>
                        {product.inStock
                          ? "In stock"
                          : `Ships in ${product.leadTime}`}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="mt-10 sm:ml-32 sm:pl-6">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">
                      ${getCartTotal()}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">$0.00</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">$0.00</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${getCartTotal()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
