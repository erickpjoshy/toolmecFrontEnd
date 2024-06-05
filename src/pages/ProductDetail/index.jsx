import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utilities/customAxios';
import Header from '../../components/Header';
import { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { displayINRCurrency } from '../../helpers/displayCurrency';
import Button from '../../components/Button';
import CategoryWisePrdCard from '../../components/CategoryWisePrdCard';
import { getLogedId } from '../../utilities/index.js';
import { ToastContainer, toast } from 'react-toastify';
import './productdetail.css';
import { useContext } from 'react';
import { CartContext } from '../../context/index.js';

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const { id } = useParams();
  const getProductDetail = async () => {
    const result = await axios.get(`/product/${id}`);
    setProductDetail(result.data);
    setActiveImage(result.data.productImage[0]);
    setLoading(false);
  };
  useEffect(() => {
    getProductDetail();
  }, [id]);

  const handleActiveImage = imgURL => {
    setActiveImage(imgURL);
  };
  const contentStyle = {
    padding: 50,
  };
  const content = <div style={contentStyle} />;
  // console.log(productDetail?.category?.name);
  // ---------------------------------Start image zoom function---------------------------------
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const handleZoomImage = useCallback(
    e => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
      // console.log(e.clientX);
      // console.log(e.target.getBoundingClientRect());
      // console.log(left, top, width, height);
    },
    [zoomImageCoordinate]
  );
  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
  // ---------------------------------End image zoom function---------------------------------

  // ---------------------------------Add to cart function---------------------------------
  const { getCartCount } = useContext(CartContext);
  const addToCart = async id => {
    try {
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
  const navigate = useNavigate();
  const handleBuyProduct = async (e, id) => {
    await addToCart(id);
    getCartCount();
    navigate(`/addtocart/${getLogedId()}`);
  };

  return (
    <div>
      <div className="container mx-auto">
        <ToastContainer position="top-center" />
        <div className="pt-6 min-h-[200px]">
          {loading ? (
            <div className="mt-60">
              <Spin tip="Loading" size="large">
                {content}
              </Spin>
            </div>
          ) : (
            <div className="flex gap-6 flex-col md:flex-row flex-wrap">
              {/* ------------product images-------------- */}
              <div className="flex gap-2 md:flex-col overflow-scroll scrollbar-none px-6">
                {productDetail.productImage.map((img_url, i) => {
                  return (
                    <div key={i} className="w-20 h-20 bg-white rounded p-1">
                      <img
                        src={img_url}
                        className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleActiveImage(img_url)}
                      />
                    </div>
                  );
                })}
              </div>
              {/* ------------product images-------------- */}
              {/* ------------product main image-------------- */}
              <div className=" flex justify-center">
                <div className="mainimage rounded p-1 relative">
                  <img
                    src={activeImage}
                    className="h-full w-full object-scale-down"
                    onMouseMove={handleZoomImage}
                    onMouseLeave={handleLeaveImageZoom}
                  />
                  {/* product zoom */}
                  {zoomImage && (
                    <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-white p-1 -right-[510px] top-0 overflow-hidden">
                      <div
                        className="w-full h-full mix-blend-multiply min-w-[500px] min-h-[400px] scale-150"
                        style={{
                          backgroundImage: `url(${activeImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: `${
                            zoomImageCoordinate.x * 100
                          }% ${zoomImageCoordinate.y * 100}%`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
              {/* ------------product main image-------------- */}
              {/* ------------product details-------------- */}
              <div className="flex flex-col gap-2 max-w-full md:max-w-[300px] sm:px-1 px-8">
                <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
                  {productDetail?.brandName.name}
                </p>
                <h2 className="text-2xl lg:text-4xl font-medium">
                  {productDetail?.productName}
                </h2>
                <p className="capitalize text-slate-400">
                  {productDetail?.category.name}
                </p>
                <div className="text-red-600 flex items-center gap-1">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  {/* <i className="fa-solid fa-star-half"></i> */}
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <div className="flex gap-2 text-xl md:text-2xl items-center font-medium my-1 flex-wrap">
                  <p className="text-600">
                    {displayINRCurrency(productDetail?.selling)}
                  </p>
                  <p className="text-slate-400 line-through">
                    {displayINRCurrency(productDetail?.price)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={e => handleBuyProduct(e, productDetail._id)}>
                    Buy Now
                  </Button>
                  <Button onClick={() => addToCart(productDetail._id)}>
                    Add To Cart
                  </Button>
                </div>
              </div>
              <div>
                <h2>Description</h2>
                <p>{productDetail?.description}</p>
              </div>
              {/* ------------product details-------------- */}
            </div>
          )}
        </div>
        {/* -----------------category card------------------------- */}
        <div className="mt-16">
          {productDetail.category && (
            <CategoryWisePrdCard
              category={productDetail?.category?.name}
              heading="Recommended Products"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
