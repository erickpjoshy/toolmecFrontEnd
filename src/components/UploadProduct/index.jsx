import { useState, useEffect } from 'react';
import Input from '../Input';
import Select from '../Select';
import axios from '../../utilities/customAxios.js';
import uploadImage from '../../helpers/uploadProduct.js';
import Button from '../Button/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import './uploadproduct.css';
const UploadProduct = ({ closeUploadProductFn }) => {
  const [data, setData] = useState({
    productName: '',
    productNumber: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    selling: '',
    tag: '',
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  //   const [uploadProductImageInput, setUploadProductImageInput] = useState('');
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
  const onChange = (e, key) => {
    if (key === 'price' || key === 'selling') {
      if (e.target.value) {
        setData({ ...data, [key]: parseInt(e.target.value) });
      }
    } else {
      setData({ ...data, [key]: e.target.value });
    }
  };

  const onUpload = async e => {
    const file = e.target.files[0];
    // setUploadProductImageInput(file.name);
    const uploadImageCloudinary = await uploadImage(file);
    // console.log(uploadImageCloudinary.url);
    // setData(preve => {
    //   return {
    //     ...preve,
    //     productImage: [...preve.productImage, uploadImageCloudinary.url],
    //   };
    // });
    setData({
      ...data,
      productImage: [...data.productImage, uploadImageCloudinary.url],
    });
  };
  const handleDeleteProductImage = async i => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(i, 1);
    setData({
      ...data,
      productImage: [...newProductImage],
    });
  };
  const addProduct = async () => {
    await axios.post('/product', data);
    toast.success('Product Added Successfully...', {
      autoClose: 1500,
      onClose: () => {
        closeUploadProductFn();
      },
    });
  };
  return (
    <div className="absolute  top-0 w-full z-10 left-0 mt-4">
      <ToastContainer position="top-center" />
      <div className="prdbox mt-20 p-3">
        <button className="block ml-auto" onClick={closeUploadProductFn}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1 className="text-2xl text-primary text-center mb-5">
          UploadProduct
        </h1>
        <form className="grid p-4 overflow-y-scroll w-full">
          <label htmlFor="productName">product Name:</label>
          <Input
            id="productName"
            placeHolder="Enter product name"
            value={data.productName}
            name="productName"
            onChange={e => onChange(e, 'productName')}
          />
          <label htmlFor="productNumber">product Number:</label>
          <Input
            id="productNumber"
            placeHolder="Enter product number"
            value={data.productNumber}
            name="productNumber"
            onChange={e => onChange(e, 'productNumber')}
          />
          <label htmlFor="brandName">Brand Name:</label>
          <Select
            id="brandName"
            placeHolder="Enter brand name"
            options={brands}
            value={data.brandName}
            name="brandName"
            onChange={e => onChange(e, 'brandName')}
          />

          <label htmlFor="category">Category Name:</label>
          <Select
            id="category"
            placeHolder="Enter category"
            options={categories}
            value={data.category}
            name="category"
            onChange={e => onChange(e, 'category')}
          />

          <label htmlFor="productImage">Product Image:</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-white border h-32 flex justify-center items-center cursor-pointer">
              <div className="flex flex-col items-center justify-center p-1 img-icon">
                <i className="fa-solid fa-cloud-arrow-up text-4xl"></i>
                <p>Upload Product Image</p>
              </div>
              <Input
                className="prdimginp hidden"
                id="uploadImageInput"
                placeHolder="productImage"
                name="productImage"
                type="file"
                onChange={onUpload}
              />
            </div>
          </label>

          <div className="flex items-center gap-2 my-2">
            {data?.productImage[0] ? (
              data.productImage.map((item, i) => {
                return (
                  <div className="imgcontainer relative">
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
              <p className="text-red-700 text-xs mb-2">*Upload image</p>
            )}
          </div>

          <label htmlFor="description">Description:</label>
          <Input
            id="description"
            placeHolder="Enter Description"
            value={data.description}
            name="description"
            onChange={e => onChange(e, 'description')}
          />

          <label htmlFor="price">Price:</label>
          <Input
            id="price"
            type="number"
            placeHolder="Enter Price"
            value={data.price}
            name="price"
            onChange={e => onChange(e, 'price')}
          />

          <label htmlFor="selling">Selling:</label>
          <Input
            id="selling"
            type="number"
            placeHolder="Enter Selling"
            value={data.selling}
            name="selling"
            onChange={e => onChange(e, 'selling')}
          />

          <label htmlFor="tag">Tag:</label>
          <Input
            id="tag"
            placeHolder="Enter Tag"
            value={data.tag}
            name="tag"
            onChange={e => onChange(e, 'tag')}
          />
        </form>
        <div className="flex justify-end">
          <Button onClick={addProduct}>Add Product</Button>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
