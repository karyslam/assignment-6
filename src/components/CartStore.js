import { atom, useAtom } from 'jotai';
import Immutable from "seamless-immutable";

// Define the initial state of the cart. We put in one piece of test data

const initialCart = Immutable([
    {
        product_id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        product_id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
])

// Create an atom for the cart
export const cartAtom = atom(initialCart);

// Custom hook for cart operations
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

    // Function to calculate the total price of items in the cart
    const getCartTotal = () => {
        return cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
    };

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex(product => product.product_id === product.product_id);
            if (existingItemIndex !== -1) {
                // Use setIn to update quantity immutably
                const currentQuantity = currentCart[existingItemIndex].quantity;
                return currentCart.setIn([existingItemIndex, 'quantity'], currentQuantity + 1);
            } else {
                // Use concat to add a new item immutably
                return currentCart.concat({ ...product, product_id: product.product_id, quantity: 1 });
            }
        });
    };

    const removeFromCart = (product_id) => {
        console.log(cart)
        console.log("Remove from Cart: ", product_id)
        setCart((currentCart) => {
            return currentCart.filter(product => product.product_id !== product_id);
        });
        console.log(cart)
    }

    return {
        cart,
        getCartTotal,
        addToCart,
        removeFromCart
    };
};