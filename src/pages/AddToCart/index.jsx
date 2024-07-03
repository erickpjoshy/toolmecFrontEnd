import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/index.jsx';
import { Spin } from 'antd';
import { displayINRCurrency } from '../../helpers/displayCurrency.js';
import axios from '../../utilities/customAxios.js';
import { CartContext } from '../../context';
import { useContext } from 'react';
import Input from '../../components/Input/index.jsx';
import Select from '../../components/Select/index.jsx';
import TextArea from '../../components/TextArea/index.jsx';
import { getLogedId } from '../../utilities/index.js';
import './addtocart.css';

function AddToCart() {
  const { getCartCount } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProducts] = useState([]);
  //   ----------loading-----------------
  const [loading, setLoading] = useState(true);
  const contentStyle = {
    padding: 50,
  };
  //   ----------loading-----------------

  const content = <div style={contentStyle} />;
  const getProducts = async () => {
    orderPost.cartProducts = [];
    const result = await axios.get(`addtocart/${id}`);
    setProducts(result.data);
    const cartIds = result.data.map(item => {
      return item._id;
    });
    // console.log(cartIds);

    setOrderPost({
      ...orderPost,
      cartProducts: [...orderPost.cartProducts, ...cartIds],
    });

    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  //   ----------start decrease quantity-----------------

  const decQty = async (id, qty) => {
    if (qty >= 2) {
      const quantity = qty - 1;
      const response = await axios.patch('addtocart/quantity', {
        id,
        quantity,
      });
      if (response.status === 201) {
        getProducts();
      }
    }
  };
  //   ----------end decrease quantity-----------------

  //   ----------start increase quantity-----------------

  const incQty = async (id, qty) => {
    const quantity = qty + 1;
    const response = await axios.patch('addtocart/quantity', { id, quantity });
    if (response.status === 201) {
      getProducts();
    }
  };
  //   ----------end increase quantity-----------------

  //   ----------start delete product-----------------

  const delateCartPrd = async id => {
    const response = await axios.delete(`addtocart/delete/${id}`);
    if (response.status === 201) {
      getProducts();
      getCartCount();
    }
  };
  //   ----------end delete product-----------------

  const totalQty = product.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = product.reduce(
    (prev, curr) => prev + curr.quantity * curr?.product?.selling,
    0
  );
  //   console.log(totalPrice);
  //   console.log(product[0]._id);

  // ---------------------------------------------------

  // ---------------user secssion-----------------------

  // ---------------------------------------------------

  const [orderPost, setOrderPost] = useState({
    user: '',
    userName: '',
    cartProducts: [],
    deliveryType: '',
    phoneOne: '',
    phoneTwo: '',
    deliveryAddress: '',
    deliveryPlace: '',
    state: '',
    district: '',
  });
  // ----------------get user---------------------
  const [user, setUser] = useState();
  const getUserDetails = async () => {
    const response = await axios.get(`user/profile/${getLogedId()}`);
    setUser(response.data);
    setOrderPost({
      ...orderPost,
      userName: response.data.name,
      user: response.data._id,
    });
  };
  // ----------------end get user---------------------

  // ----------------get states,districts---------------------
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const getStates = async () => {
    const response = await axios.get('location/state');
    console.log(response.data);
    setStates(response.data);
  };
  const stateFunction = async (e, key) => {
    orderPost.district = '';
    // setOrderPost({ ...orderPost, district: '' });
    const stateId = e.target.value;
    setOrderPost({ ...orderPost, state: stateId });
    const response = await axios.get(`location/district/${stateId}`);
    setDistricts(response.data);
  };

  // console.log(districts);
  useEffect(() => {
    getUserDetails();
    getStates();
  }, []);

  const orderPostFunction = (e, key) => {
    setOrderPost({ ...orderPost, [key]: e.target.value });
  };

  const orderTypePostFunction = (value, key) => {
    setOrderPost({ ...orderPost, [key]: value });
  };

  console.log(orderPost);
  // console.log(product);
  return (
    <>
      <Header />
      <div className="container mx-auto py-4 cart">
        {loading ? (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        ) : (
          <div className="text-center text-lg my-3 pt-4">
            {product.length === 0 ? (
              <p className="bg-white py-5">No Data</p>
            ) : (
              <div className="flex flex-col lg:flex-row gap-10 w-full lg:justify-between">
                <div className="flex flex-col gap-6 w-full max-w-3xl">
                  {product.map(data => {
                    return (
                      <div
                        key={data._id}
                        className="h-34 bg-white border border-slate-50 rounded p-3 grid grid-cols-[128px,1fr] overflow-hidden"
                      >
                        <div className="w-28 h-28">
                          <img
                            src={data.product.productImage[0]}
                            className="w-full h-full object-scale-down mix-blend-multiply"
                          />
                        </div>
                        <div className="p-4 relative">
                          <div className="absolute text-red-600 right-2 hover:text-red-300 cursor-pointer">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => {
                                delateCartPrd(data._id);
                              }}
                            ></i>
                          </div>
                          <h2 className="text-lg  text-ellipsis line-clamp-1 text-left">
                            {data.product.productName}
                          </h2>
                          <div className="items-center justify-between flex my-2">
                            <p className="capitalize text-slate-500 text-left text-sm">
                              {displayINRCurrency(data?.product?.selling)}
                            </p>
                            <p className="capitalize text-red-500 text-left text-sm">
                              {displayINRCurrency(
                                data?.product?.selling * data?.quantity
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => {
                                decQty(data._id, data.quantity);
                              }}
                              className="p-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                            >
                              -
                            </button>
                            <span>{data?.quantity}</span>
                            <button
                              onClick={() => {
                                incQty(data._id, data.quantity);
                              }}
                              className="p-1 border border-red-600 text-red-600  hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="side-class w-full h-32 md:max-w-sm max-w-full mb-10">
                  <h2 className="text-lg text-left">PAYMENT</h2>
                  <form className="text-sm flex flex-col gap-2 pt-2 pb-6">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="sortBy" disabled />
                      <label>Credit Card</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        onChange={e =>
                          orderTypePostFunction(
                            'cashOnDelivery',
                            'deliveryType'
                          )
                        }
                        type="radio"
                        name="sortBy"
                      />
                      <label>Cash On Delivery</label>
                    </div>
                  </form>
                  <h2 className="text-lg text-left">ADDRESS</h2>
                  <Input
                    placeHolder="Name"
                    value={orderPost.userName}
                    onChange={e => orderPostFunction(e, 'userName')}
                  />
                  <Input
                    type="number"
                    placeHolder="Phone Number"
                    onChange={e => orderPostFunction(e, 'phoneOne')}
                  />
                  <Input
                    type="number"
                    placeHolder="Phone Number 2"
                    onChange={e => orderPostFunction(e, 'phoneTwo')}
                  />
                  <TextArea
                    className="large-field"
                    placeHolder="Adress"
                    onChange={e => orderPostFunction(e, 'deliveryAddress')}
                  />
                  <Input
                    placeHolder="Place"
                    onChange={e => orderPostFunction(e, 'deliveryPlace')}
                  />
                  <Select
                    options={states}
                    placeHolder="States"
                    onChange={e => stateFunction(e, 'state')}
                    value={orderPost.state}
                  />
                  <Select
                    options={districts}
                    placeHolder="Districts"
                    onChange={e => orderPostFunction(e, 'district')}
                    value={orderPost.district}
                  />
                  <div className="bg-slate-200 mt-8">
                    <h2 className="text-white bg-red-600 px-4 py-1 text-lg text-left">
                      Summary
                    </h2>
                    <div className="flex text-lg justify-between px-4 mt-2 font-medium">
                      <p className="text-left">Quantity</p>
                      <p>{totalQty}</p>
                    </div>

                    <div className="flex text-lg justify-between px-4 mt-2 font-medium">
                      <p className="text-left">Total Price</p>
                      <p>{displayINRCurrency(totalPrice)}</p>
                    </div>
                    <button className="bg-blue-600 text-white w-full p-2 text-lg border border-red-700">
                      Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AddToCart;
