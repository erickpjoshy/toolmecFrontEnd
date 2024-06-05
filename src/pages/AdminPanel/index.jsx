import Header from '../../components/Header/index.jsx';
import axios from '../../utilities/customAxios';
import { useState, useEffect } from 'react';
import { getLogedId } from '../../utilities/index.js';
import { NavLink, Outlet } from 'react-router-dom';
import './adminpanel.css';
const AdminPanel = () => {
  const [user, setUser] = useState({});
  const getUserDetails = async () => {
    const result = await axios.get(`user/profile/${getLogedId()}`);
    setUser(result.data);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <Header />
      <div className="container  mx-auto">
        <div className="flex flex-wrap md:flex-nowrap  py-3">
          <aside className="bg-white w-full md:w-60 min-h-full">
            <div className="flex justify-center flex-col items-center h-60 w-full bg-slate-100 p-1 overflow-hidden">
              <div className="rounded-full h-40 w-40 overflow-hidden">
                <img src={user.image} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-primary py-2">{user.name}</h1>
              <p className="text-primary">{user.role}</p>
            </div>
            <div className="my-8">
              <nav className="grid gap-2">
                <NavLink
                  to={'list-users'}
                  className="px-2 py-1 hover:bg-slate-100 hover:text-black act-class"
                >
                  <i className="fa-regular fa-user mr-2"></i>All Users
                </NavLink>
                <div className="flex flex-col">
                  <h1 className="text-secondary px-2 mb-2">Products</h1>
                  <NavLink
                    to={'add-products'}
                    className="px-3 py-1  my-1 hover:bg-slate-100 hover:text-black act-class w-full"
                  >
                    <i className="fa-solid fa-cart-plus mr-2"></i>Add Product
                  </NavLink>
                  {/* <NavLink
                    to={'all-categories'}
                    className="px-3 py-1 my-1 hover:bg-slate-100 hover:text-black act-class w-full"
                  >
                    <i className="fa-solid fa-bag-shopping mr-2"></i>List Products
                  </NavLink> */}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-secondary px-2 mb-2">Categories</h1>
                  <NavLink
                    to={'add-categories'}
                    className="px-3 py-1  my-1 hover:bg-slate-100 hover:text-black act-class w-full"
                  >
                    <i className="fa-solid fa-file-circle-plus mr-2"></i>Add
                    Category
                  </NavLink>
                  <NavLink
                    to={'list-categories'}
                    className="px-3 py-1 my-1 hover:bg-slate-100 hover:text-black act-class w-full"
                  >
                    <i className="fa-solid fa-list mr-2"></i>List Categories
                  </NavLink>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-secondary px-2 mb-2">Brand Name</h1>
                  <NavLink
                    to={'add-brands'}
                    className="px-3 py-1  my-1 hover:bg-slate-100 hover:text-black act-class w-full"
                  >
                    <i class="fa-solid fa-bookmark mr-2"></i>Add Brand Name
                  </NavLink>
                  <NavLink
                    to={'list-brands'}
                    className="px-3 py-1 my-1 hover:bg-slate-100 hover:text-black act-class w-full"
                  >
                    <i className="fa-solid fa-list mr-2"></i>List Brands
                  </NavLink>
                </div>
              </nav>
            </div>
          </aside>
          <main className=" w-full md:w-11/12	 h-full p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
