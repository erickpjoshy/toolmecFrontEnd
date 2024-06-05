import { useState, useEffect } from 'react';
import Header from './components/Header/index.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import UserSignup from './pages/UserSignup';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import AddCategory from './pages/AddCategory';
import ListCategory from './pages/ListCategory';
import AddProduct from './pages/AddProduct';
import ListUser from './pages/ListUser';
import AddBrandName from './pages/AddBrandName';
import ListBrands from './pages/ListBrands';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import AddToCart from './pages/AddToCart';
import SearchProduct from './pages/SearchProduct';
import CategoryProduct from './pages/CategoryProduct/index.jsx';
import axios from './utilities/customAxios';
import { getLogedId } from './utilities/index.js';
import { Route, Routes } from 'react-router-dom';
import { CartContext } from './context/index.js';
import './App.css';

function App() {
  const [cartProductCount, setcartProductCount] = useState(0);
  const [user, setUser] = useState({});
  const getCartCount = async () => {
    const result = await axios.get(`addtocart/count/${getLogedId()}`);
    setcartProductCount(result.data);
    // console.log('helloi', result.data);
  };
  const getUserDetails = async () => {
    const result = await axios.get(`/user/profile/${getLogedId()}`);
    setUser(result.data);
  };
  useEffect(() => {
    getCartCount();
    getUserDetails();
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{ cartProductCount, getCartCount, user, getUserDetails }}
      >
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/:id" element={<UserPanel />} />
            <Route path="/admin" element={<AdminPanel />}>
              <Route path="add-categories" element={<AddCategory />} />
              <Route path="list-categories" element={<ListCategory />} />
              <Route path="add-products" element={<AddProduct />} />
              <Route path="list-users" element={<ListUser />} />
              <Route path="add-brands" element={<AddBrandName />} />
              <Route path="list-brands" element={<ListBrands />} />
            </Route>
            <Route path="/productDetails/:id" element={<ProductDetail />} />
            <Route path="/addtocart/:id" element={<AddToCart />} />
            <Route path="/searchproduct" element={<SearchProduct />} />
            <Route path="/product-category" element={<CategoryProduct />} />
          </Routes>
        </div>
        <Footer />
      </CartContext.Provider>
    </>
  );
}

export default App;
