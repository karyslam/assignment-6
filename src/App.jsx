import React, { useEffect } from "react";
import { Route, Switch } from "wouter";
import Navbar from "./components/navbar";
import AboutUsPage from "./pages/aboutus";
import CategoriesPage from "./pages/categories";
import HomePage from "./pages/home";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import ShoppingCart from "./pages/ShoppingCart";
import SingleCategoryPage from "./pages/single-category";
import SingleProductPage from "./pages/single-product";
import { useFlashMessage } from "./stores/FlashMessageStore";

function App() {
  const { getMessage, clearMessage } = useFlashMessage();
  const flashMessage = getMessage();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [flashMessage]);
  return (
    <div className="App">
      <header className="bg-white shadow z-100">
        <Navbar />
        {flashMessage.message && (
          <div
            className={`alert alert-${flashMessage.type} text-center flash-alert`}
            role="alert"
          >
            {flashMessage.message}
          </div>
        )}
      </header>
      <body>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/about-us" component={AboutUsPage} />
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/categories/:id" component={SingleCategoryPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/products/:id" component={SingleProductPage} />
          <Route path="/shopping-cart" component={ShoppingCart} />
        </Switch>
      </body>
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2023 E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
