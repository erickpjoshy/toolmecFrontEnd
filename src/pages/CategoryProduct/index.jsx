import { useEffect, useState, useContext } from 'react';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import { CartContext } from '../../context/index.js';
import { Spin } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { displayINRCurrency } from '../../helpers/displayCurrency.js';
const CategoryProduct = () => {
  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = URLSearch.getAll('category');
  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });
  // --------------get category details-----------------

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const getCategories = async () => {
    const result = await axios.get('/category');
    setCategories(result.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  // --------------get category details-----------------

  // --------------select category -----------------
  const [selectCategory, setselectCategory] = useState(urlCategoryListObject);

  const handleSelectCategory = e => {
    const { name, value, checked } = e.target;
    setselectCategory({ ...selectCategory, [value]: checked });
    // console.log(name, value, checked);
  };

  // console.log(selectCategory);
  // --------------end select category -----------------

  // --------------get product details-----------------
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  // console.log(categories);
  useEffect(() => {
    const arrayOfCategory = categories
      .map(categoryData => {
        if (selectCategory[categoryData._id]) {
          return categoryData._id;
        }
        return null;
      })
      .filter(el => el);
    setFilterCategoryList(arrayOfCategory);
    // console.log(arrayOfCategory);
    //------------format for url change when on the checkbox---------------
    const urlFormat = arrayOfCategory.map((el, i) => {
      if (arrayOfCategory.length - 1 === i) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    // console.log(urlFormat.join(''));
    if (arrayOfCategory.length !== 0) {
      navigate('/product-category?' + urlFormat.join(''));
    }
  }, [selectCategory, categories]);
  //------------format for url change when on the checkbox---------------

  const getSearchPrds = async () => {
    // console.log(selectCategory);
    const response = await axios.post(
      `product/categoryfilter/`,
      filterCategoryList
    );
    // console.log(response);
    setProduct(response?.data || []);
    if (response.status === 200) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSearchPrds();
  }, [filterCategoryList]);
  // --------------end get product details-----------------

  // ---------------------------------Add to cart function---------------------------------
  const { getCartCount } = useContext(CartContext);
  const addToCart = async id => {
    try {
      //   console.log(id);
      const res = await axios.post('/addtocart', {
        user: getLogedId(),
        product: id,
      });
      toast.success('product added to the cart', {
        autoClose: 1500,
        onClose: () => {
          getCartCount();
        },
      });

      // console.log(res);
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
      // console.log(e);
    }
  };
  // ---------------------------------End Add to cart function---------------------------------

  // ----------set loading----------------
  const contentStyle = {
    padding: 50,
  };
  const content = <div style={contentStyle} />;
  // ----------end set loading----------------

  // ----------sort by value ----------------
  const [sortBy, setSortBy] = useState('');
  const handleOnChangeSortBy = e => {
    const { value } = e.target;
    setSortBy(value);
    if (value === 'asc') {
      setProduct(prev => prev.sort((a, b) => a.selling - b.selling));
    }
    if (value === 'dsc') {
      setProduct(prev => prev.sort((a, b) => b.selling - a.selling));
    }
  };
  useEffect(() => {}, [sortBy]);

  // ----------end sort by value ----------------
  console.log(sortBy);
  return (
    <div className="container mx-auto pt-6">
      <ToastContainer position="top-center" />
      <div className="hidden lg:grid grid-cols-[200px,1fr] ">
        {/* --leftside-- */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* sort by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBy"
                  value="asc"
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBy"
                  value="dsc"
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {categories.map(data => {
                return (
                  <div className="flex items-center gap-2" key={data._id}>
                    <input
                      type="checkbox"
                      name={'category'}
                      value={data?._id}
                      id={data?._id}
                      checked={selectCategory[data?._id]}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={data?._id}>{data?.name}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* --leftside-- */}
        {/* --rightside-- */}
        <div className="px-4">
          {loading && (
            <div className="mt-60">
              <Spin tip="Loading" size="large">
                {content}
              </Spin>
            </div>
          )}
          {product.length === 0 && (
            <p className="text-center bg-white p-4">
              No products under this Category
            </p>
          )}
          <div className="p-2 min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-scroll">
            {product.length !== 0 && (
              <p className="mb-2">Serach Results : {product.length}</p>
            )}
            {product && !loading && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 md:gap-6">
                {product.map((data, i) => {
                  return (
                    <div
                      key={data._id}
                      className="bg-white rounded-sm shadow  min-w-[240px]  max-w-[240px] flex flex-col"
                    >
                      <Link
                        to={`productDetails/${data._id}`}
                        className="p-2 h-full min-w-[145px] flex items-center justify-center"
                      >
                        <div className="h-[130px] w-[130px]">
                          <img
                            src={data.productImage[0]}
                            className="w-full h-full object-contain hover:scale-110 transition-all"
                          />
                        </div>
                      </Link>
                      <div className="bg-fouth w-full p-4 grid">
                        <h1 className="font-medium text-base text-ellips line-clamp-1">
                          {data.productName}
                        </h1>
                        <p className="capitalize text-slate-500 text-sm">
                          {data.category.name}
                        </p>
                        <div className="flex gap-2">
                          <p className="text-red-600 font-medium">
                            {displayINRCurrency(data?.selling)}
                          </p>
                          <p className="text-slate-600 line-through">
                            {displayINRCurrency(data?.price)}
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="text-small bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-0.5 w-[110px] "
                            onClick={() => addToCart(data._id)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* --rightside-- */}
      </div>
    </div>
  );
};

export default CategoryProduct;
