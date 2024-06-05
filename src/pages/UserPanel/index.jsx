import Header from '../../components/Header/index.jsx';
import axios from '../../utilities/customAxios.js';
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import './userpanel.css';
const UserPanel = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const getUserDetails = async () => {
    const result = await axios.get(`user/profile/${id}`);
    setUser(result.data);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <div className="container  mx-auto">
        <div className="flex flex-wrap md:flex-nowrap  py-3">
          <aside className="bg-white w-full md:w-60 min-h-full">
            <div className="flex justify-center flex-col items-center h-60 w-full bg-slate-100">
              <div className="rounded-full h-40 w-40 overflow-hidden">
                <img src={user.image} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-primary py-2">{user.name}</h1>
              <p className="text-primary">{user.role}</p>
            </div>
            <div className="my-8">
              <nav className="grid gap-2">
                <NavLink
                  to={'all-users'}
                  className="px-2 py-1 hover:bg-slate-100 hover:text-black act-class"
                >
                  <i className="fa-regular fa-user mr-2"></i>All Users
                </NavLink>
                <div className="flex flex-col">
                  <h1 className="text-secondary px-2 mb-2">Products</h1>
                  <NavLink
                    to={'all-products'}
                    className="px-3 py-1  my-1 hover:bg-slate-100 hover:text-black act-class w-full"
                  >
                    <i className="fa-solid fa-cart-plus mr-2"></i>Add Product
                  </NavLink>
                  <NavLink
                    to={'all-categories'}
                    className="px-3 py-1 my-1 hover:bg-slate-100 hover:text-black act-class w-full"
                  >
                    <i className="fa-solid fa-bag-shopping mr-2"></i>List
                    Products
                  </NavLink>
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
              </nav>
            </div>
          </aside>
          <main className="w-full h-full p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default UserPanel;
