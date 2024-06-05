import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import UploadProduct from '../../components/UploadProduct';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import EditItem from '../../components/EditItem/index.jsx';
import { displayINRCurrency } from '../../helpers/displayCurrency.js';
const AddProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [prdid, setId] = useState('');

  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(3);
  const getProducts = async () => {
    const result = await axios.get(`/product/filter?page=${page}`);
    setProducts(result.data);
  };
  useEffect(() => {
    getProducts();
  }, [page]);

  const handleNextPage = () => {
    // if (currentIndex < 5) {
    setPage(page + 1);
    // setCurrentIndex(3 + 4);
    // }
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrentIndex(currentIndex - 4);
    }
  };

  const closeUploadProductFn = () => {
    setOpenUploadProduct(false);
    getProducts();
  };
  const deleteProduct = async id => {
    // console.log(id);
    await axios.delete(`/product/${id}`);
    toast.success('Product Deleted Successfully...', {
      autoClose: 1500,
      onClose: () => {
        getProducts();
      },
    });
  };
  const openEditProductFn = id => {
    setId(id);
    setOpenEditProduct(true);
  };
  const closeEditProductFn = () => {
    setOpenEditProduct(false);
    getProducts();
  };
  // console.log(products);
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="relative px-4 py-2 bg-red-300 rounded">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-2xl text-primary mt-4">PRODUCT</h1>
          <Button
            onClick={() => {
              setOpenUploadProduct(true);
            }}
          >
            Add Product
          </Button>
        </div>
        {openUploadProduct && (
          <UploadProduct closeUploadProductFn={closeUploadProductFn} />
        )}
      </div>
      <div className="relative">
        <h1 className="text-2xl text-center mt-4">PRODUCTS</h1>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 items-center ">
          {products.map((data, i) => {
            return (
              <div key={data._id}>
                <div className="bg-white prd-card rounded p-1 relative">
                  <div className="flex justify-center">
                    <div className="img-container">
                      <img
                        src={data?.productImage[0]}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex heading">
                    <h1>{data.productName}</h1>
                  </div>
                  <h1>{displayINRCurrency(data.selling)}</h1>
                  <div className="flex gap-2 justify-end mb-2 mr-2">
                    <div className=" bg-black rounded-full text-white icon-bg">
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteProduct(data._id)}
                      ></i>
                    </div>
                    <div className=" bg-black rounded-full text-white icon-bg">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => {
                          openEditProductFn(data._id);
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
                {openEditProduct && prdid === data._id && (
                  <EditItem
                    closeEditProductFn={closeEditProductFn}
                    data={data}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-x-4 justify-end mr-8 mb-8">
        <button onClick={handlePrevPage} disabled={page === 1}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button onClick={handleNextPage}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
};

export default AddProduct;
