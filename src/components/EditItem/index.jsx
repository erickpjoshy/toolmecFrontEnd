import { toast, ToastContainer } from 'react-toastify';
import axios from '../../utilities/customAxios.js';
import Input from '../Input';
import Select from '../Select/index.jsx';
import { useEffect, useState } from 'react';
import Button from '../Button/index.jsx';
const EditItem = ({ closeEditProductFn, data }) => {
  const [patchProduct, setPatchProduct] = useState({
    productName: data?.productName,
    productNumber: data?.productNumber,
    brandName: data?.brandName?._id,
    category: data?.category?._id,
    productImage: data?.productImage,
    description: data?.description,
    price: data?.price,
    selling: data?.selling,
  });

  //---------------------start get the categories,brandname-----------------------------------------//
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const getCategories = async () => {
    const result = await axios.get('/category');
    setCategories(result.data);
  };
  const getBrands = async () => {
    const result = await axios.get('/brand');
    setBrands(result.data);
  };
  useEffect(() => {
    getCategories(), getBrands();
  }, []);

  //---------------------end get the categories,brandname-----------------------------------------//

  //---------------------start restore the values to setProduct using on change-----------------------//
  const onChange = (e, key) => {
    if (key === 'price' || key === 'selling') {
      if (e.target.value) {
        setPatchProduct({ ...patchProduct, [key]: parseInt(e.target.value) });
      }
    } else {
      setPatchProduct({ ...patchProduct, [key]: e.target.value });
    }
  };
  //---------------------end restore the values to setProduct using on change-----------------------//

  //---------------------start delete the productimages---------------------------------------------//

  const handleDeleteProductImage = i => {
    const newProductImage = [...patchProduct.productImage];
    newProductImage.splice(i, 1);
    setPatchProduct({
      ...patchProduct,
      productImage: [...newProductImage],
    });
  };
  //---------------------end delete the productimages---------------------------------------------//

  //---------------------start update the product---------------------------------------------//

  const updatePrd = async () => {
    // console.log(data._id);
    await axios.patch(`/product/${data._id}`, patchProduct);
    toast.success('Product Updated Successfully...', {
      autoClose: 1500,
      onClose: () => {
        closeEditProductFn();
      },
    });
  };

  //---------------------stop update the product---------------------------------------------//

  // console.log(patchProduct);

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="absolute top-0 w-full z-10 left-0">
        <div className="prdbox p-3">
          <button className="block ml-auto" onClick={closeEditProductFn}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h1 className="text-2xl text-primary text-center mb-5">
            Edit Product
          </h1>
          <form className="grid p-4 overflow-y-scroll w-full">
            <label htmlFor="productName">product Name:</label>
            <Input
              id="productName"
              placeHolder="Enter product name"
              value={patchProduct.productName}
              name="productName"
              onChange={e => onChange(e, 'productName')}
            />
            <label htmlFor="productNumber">product Number:</label>
            <Input
              id="productNumber"
              placeHolder="Enter product number"
              value={patchProduct.productNumber}
              name="productNumber"
              onChange={e => onChange(e, 'productNumber')}
            />
            <label htmlFor="brandName">Brand Name:</label>
            <Select
              id="brandName"
              placeHolder={data.brandName.name}
              options={brands}
              value={patchProduct.brandName._id}
              // disabled="disabled"
              name="brandName"
              onChange={e => onChange(e, 'brandName')}
            />

            <label htmlFor="category">Category Name:</label>
            <Select
              id="category"
              placeHolder={data.category.name}
              options={categories}
              // disabled="disabled"
              value={patchProduct.category._id}
              name="category"
              onChange={e => onChange(e, 'category')}
            />
            <div className="flex items-center gap-2 my-2">
              {patchProduct?.productImage[0] ? (
                patchProduct.productImage.map((item, i) => {
                  return (
                    <div key={i} className="imgcontainer relative">
                      <img
                        key={i}
                        src={item}
                        alt={item}
                        className="bg-slate-100 border object-contain w-full h-full"
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full w-8 h-8 text-center hover-icon"
                        onClick={() => handleDeleteProductImage(i)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-red-700 text-xs mb-2">*No images</p>
              )}
            </div>
            <label htmlFor="description">Description:</label>
            <Input
              id="description"
              placeHolder="Enter Description"
              value={patchProduct.description}
              name="description"
              onChange={e => onChange(e, 'description')}
            />

            <label htmlFor="price">Price:</label>
            <Input
              id="price"
              type="number"
              placeHolder="Enter Price"
              value={patchProduct.price}
              name="price"
              onChange={e => onChange(e, 'price')}
            />

            <label htmlFor="selling">Selling:</label>
            <Input
              id="selling"
              type="number"
              placeHolder="Enter Selling"
              value={patchProduct.selling}
              name="selling"
              onChange={e => onChange(e, 'selling')}
            />
          </form>
          <div className="flex justify-end">
            <Button onClick={updatePrd}>Update</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItem;
