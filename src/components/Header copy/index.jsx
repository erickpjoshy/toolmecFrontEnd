import NavBar from '../NavBar/index.jsx';
import Input from '../Input/index.jsx';
import { BsCart } from 'react-icons/bs';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValid } from '../../utilities/index.js';
import axios from '../../utilities/customAxios.js';
import { getLogedId } from '../../utilities/index.js';
import { HeaderContext } from '../../context/index.js';
import { CartContext } from '../../context/index.js';
import { useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const { cartProductCount, user, getUserDetails } = useContext(CartContext);
  const [search, setSearch] = useState(false);
  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = urlSearch.getAll('q');
  const [searchValue, setSearchValue] = useState(searchQuery);
  const searchShow = value => {
    if (value) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearchValue = e => {
    const { value } = e.target;
    setSearchValue(value);
    if (value) {
      navigate(`/searchproduct?q=${value}`);
    } else {
      navigate('/searchproduct');
    }
  };
  const handleSearch = () => {};
  return (
    <HeaderContext.Provider value={{ getUserDetails }}>
      <div className="header">
        <NavBar />
        <div className="header-sub">
          <div className="container mx-auto h-full flex items-center px-4 justify-between">
            <Link to={'/'} className="logo flex">
              <h1 className="text-white">TOOL</h1>
              <h1 className="ml-2 text-black">MEC</h1>
            </Link>
            <div className="showsearch w-full">
              <div className="search flex">
                <div className="input w-full">
                  <Input
                    onChange={handleSearchValue}
                    placeHolder="Search product here ..."
                    value={searchValue}
                  />
                </div>
                <div
                  onClick={handleSearch}
                  className="icon flex items-center justify-center cursor-pointer"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>
            <div
              className="searchicon w-full h-full justify-end text-white cursor-pointer"
              onClick={() => searchShow(search)}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            {isTokenValid() ? (
              <>
                <div className="userhover">
                  <div
                    to={'/'}
                    className="user-icon ml-4 text-white relative flex justify-center"
                  >
                    <i className="fa-regular fa-circle-user"></i>
                  </div>
                  <div className="absolute bg-white top-16 h-fit p-2 shadow-lg  userhoverblock">
                    <nav>
                      {user.role === 'ADMIN' && (
                        <Link
                          to={'/admin/list-users'}
                          className="text-primary px-3"
                        >
                          Admin Panel
                        </Link>
                      )}
                      {user.role === 'GENERAL' && (
                        <Link
                          to={`/user/${user._id}`}
                          className="text-primary px-3"
                        >
                          User
                        </Link>
                      )}
                    </nav>
                  </div>
                </div>
                <div className="user-icon ml-4 text-white">
                  <i
                    onClick={logOut}
                    className="fa-solid fa-arrow-right-from-bracket"
                  ></i>
                </div>
              </>
            ) : (
              <Link to={'/login'} className="user-icon ml-4 text-white">
                <i className="fa-regular fa-circle-user"></i>
              </Link>
            )}
            <div className="user text-white flex">
              {isTokenValid() ? (
                <>
                  <div className="userhover">
                    <div className="myaccount px-3 relative flex justify-center">
                      <h1 className="font-normal cursor-pointer">My Account</h1>
                    </div>
                    <div className="absolute bg-white top-16 h-fit p-2 shadow-lg  userhoverblock">
                      <nav>
                        {user.role === 'ADMIN' && (
                          <Link
                            to={'/admin/list-users'}
                            className="text-primary px-3"
                          >
                            Admin Panel
                          </Link>
                        )}
                        {user.role === 'GENERAL' && (
                          <Link
                            to={`/user/${user._id}`}
                            className="text-primary px-3"
                          >
                            User
                          </Link>
                        )}
                      </nav>
                    </div>
                  </div>
                  <div className="logout px-3">
                    <h1 onClick={logOut} className="font-normal cursor-pointer">
                      Logout
                    </h1>
                  </div>
                </>
              ) : (
                <Link to={'/login'} className="myaccount px-3">
                  <h1 className="font-normal cursor-pointer">Login/Signup</h1>
                </Link>
              )}
              {isTokenValid() && (
                <Link
                  to={`/addtocart/${getLogedId()}`}
                  className="px-3 flex items-center justify-center cursor-pointer"
                >
                  <div className="cart">
                    <BsCart className="carticon" />
                    <div className="cart-count">{cartProductCount}</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div
            className={`${
              search ? 'hide-search-show' : ''
            } hide-search container  mx-auto`}
          >
            <div className="search flex w-full">
              <div className="input w-full">
                <Input
                  onChange={handleSearchValue}
                  placeHolder="Search product here ..."
                  value={searchValue}
                />
              </div>
              <div
                onClick={handleSearch}
                className="icon flex items-center justify-center cursor-pointer"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderContext.Provider>
  );
};

export default Header;
