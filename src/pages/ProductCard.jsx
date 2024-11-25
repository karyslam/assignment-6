import React from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../components/CartStore';
import { useFlashMessage } from './FlashMessageStore';

const ProductCard = (props) => {

    const { addToCart } = useCart();
    const [, setLocation] = useLocation();
    const { showMessage } = useFlashMessage();

    const handleAddToCart = () => {
        addToCart(props);
        showMessage('Item added to cart', 'success');
        setLocation('/cart');
    }

    return (
        // <div className="card">
        //   <img
        //     src={props.imageUrl}
        //     className="card-img-top"
        //     alt={props.productName}
        //   />
        //   <div className="card-body">
        //     <h5 className="card-title">{props.productName}</h5>
        //     <p className="card-text">${props.price}</p>
        //     <button className="btn btn-primary" onClick={handleAddToCart}>
        //       Add to Cart
        //     </button>
        //   </div>
        // </div>
        <div key={props.productName} className="group relative">
            <img
                alt={props.productName}
                src={props.imageUrl}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        {/* <a href={product.href}> */}
                        <span aria-hidden="true" className="absolute inset-0" />
                        {props.productName}
                        {/* </a> */}
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-900">{props.price}</p>
            </div>
        </div>

    );
};

export default ProductCard;