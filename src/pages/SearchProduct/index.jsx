import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { CartContext } from '../../context/index.js';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { displayINRCurrency } from '../../helpers/displayCurrency.js';
import axios from '../../utilities/customAxios.js';
const SearchProduct = () => {
  const query = useLocation();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(query.search);
  const getSearchPrds = async () => {
    const response = await axios.get('product/searchproduct' + query.search);
    // console.log(response);
    setProduct(response.data);
    if (response.status === 200) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSearchPrds();
  }, [query]);

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

  console.log();
  return (
    <div className="container mx-auto pt-6">
      <ToastContainer position="top-center" />
      {loading && (
        <div className="mt-60">
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        </div>
      )}
      <p className="mb-4">Search Results : {product.length}</p>
      {product.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No data Found ...</p>
      )}
      {product.length !== 0 && !loading && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-6 md:gap-6">
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
  );
};

export default SearchProduct;
