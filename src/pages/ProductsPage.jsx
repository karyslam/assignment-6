import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../pages/ProductCard';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products.json');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard
              imageUrl={product.image}
              productName={product.name}
              price={product.price.toFixed(2)}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default ProductsPage;