import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../pages/ProductCard";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get("/featured.json");
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const renderFeaturedProducts = () => {
    const productElements = [];
    for (const product of featuredProducts) {
      productElements.push(
        <div key={product.id} className="col-md-3 mb-4">
          <ProductCard
            product={product}
          />
        </div>
      );
    }
    return productElements;
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <a
              href="#"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
            <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
              <img
                src="/flowers1.jpg"
                alt="flowersinvase"
                className="object-cover object-center group-hover:opacity-75"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50"
              ></div>
              <div className="flex items-end p-6">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="inset-0"></span>
                      New Arrivals
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
            <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
              <img
                src="/gradflowers.jpg"
                alt="gradflowers"
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              ></div>
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Graduation
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
            <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
              <img
                src="/appreciationflowers.jpg"
                alt="appreciationflowers"
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              ></div>
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Appreciation
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
            <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
              <img
                src="/birthdayflowers.jpg"
                alt="birthdayflowers"
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              ></div>
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Birthdays
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:hidden">
            <a
              href="#"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Bestselling Bouquets
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {renderFeaturedProducts()}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
