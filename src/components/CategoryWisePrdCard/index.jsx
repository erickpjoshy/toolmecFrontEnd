import { useEffect, useRef, useState } from 'react';
import axios from '../../utilities/customAxios.js';
import { displayINRCurrency } from '../../helpers/displayCurrency.js';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { getLogedId } from '../../utilities/index.js';
import { ToastContainer, toast } from 'react-toastify';
import { CartContext } from '../../context/index.js';
import { useContext } from 'react';

const CategoryWisePrdCard = ({ heading, category }) => {
  const navigate = useNavigate();
  const changePath = id => {
    navigate(`/productDetails/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollElement = useRef();
  const getCategoryProducts = async () => {
    const result = await axios.get('/product');
    const productList = result.data;
    const catPrd = [];
    productList.map(data => {
      // console.log(category);
      if (data.category.name === category) {
        catPrd.push(data);
        setProducts(catPrd);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getCategoryProducts();
  }, []);

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  //   console.log(products);

  const contentStyle = {
    padding: 50,
  };
  const content = <div style={contentStyle} />;

  // ---------------------------------Add to cart function---------------------------------
  const { getCartCount } = useContext(CartContext);
  const addToCart = async id => {
    try {
      console.log(id);
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

  return (
    <div className="container mx-auto my-6 relative">
      <ToastContainer position="top-center" />
      <h1 className="text-2xl font-semibold my-4">{heading}</h1>
      {loading ? (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      ) : (
        <div
          className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
          ref={scrollElement}
        >
          <button
            className="bg-white rounded-full py-2 px-4 shadow-md w-10 absolute left-0  z-10 hidden md:block"
            onClick={scrollLeft}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            className="bg-white rounded-full py-2 px-4 shadow-md w-10 absolute right-0  z-10 hidden md:block"
            onClick={scrollRight}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          {products.map((data, i) => {
            return (
              <div
                // to={`productDetails/${data._id}`}
                key={data._id}
                className="bg-white h-42 rounded-sm shadow  min-w-[240px]  max-w-[240px]  flex flex-col"
              >
                <div
                  onClick={() => changePath(data._id)}
                  className="p-2 h-full min-w-[145px] flex items-center justify-center"
                >
                  <div className="h-[130px] w-[130px]">
                    <img
                      src={data.productImage[0]}
                      className="w-full h-full object-contain hover:scale-110 transition-all"
                    />
                  </div>
                </div>
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

export default CategoryWisePrdCard;
