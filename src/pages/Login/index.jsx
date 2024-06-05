import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import axios from '../../utilities/customAxios.js';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import generator from 'generate-password-ts';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { CartContext } from '../../context/index.js';
import './login.css';
const Login = () => {
  //  ---------------------start set pwdicon-----------------------
  const [showpwd, setShowPwd] = useState(false);
  //  ---------------------end set pwdicon-----------------------
  // ------------------cart render----------------------------
  const { getCartCount, getUserDetails } = useContext(CartContext);
  // ------------------end cart render------------------------
  //  ---------------------go to  user signup-----------------------

  const navigate = useNavigate();
  const navigation = e => {
    e.preventDefault;
    navigate('/user/signup');
  };
  //  ---------------------stop go to  user signup-----------------------

  const [userDetails, setuserDetails] = useState({
    email: '',
    password: '',
  });
  const onChange = (e, key) => {
    setuserDetails({ ...userDetails, [key]: e.target.value });
    console.log(userDetails);
  };

  // ------------------login---------------------------
  const onclick = async () => {
    try {
      const response = await axios.post('/user/login', userDetails);
      console.log(response);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      toast.success('login successful', {
        autoClose: 1500,
        onClose: () => {
          getCartCount();
          getUserDetails();
          navigate('/');
        },
      });
    } catch (e) {
      toast.error('please try again');
    }
  };
  // ------------------login---------------------------

  const onGoogleClick = async credentialResponse => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);
      const response = await axios.post('/user/google', {
        name: decoded.name,
        email: decoded.email,
        password: generator.generate({ length: 10, numbers: true }),
        image: decoded.picture,
        role: 'GENERAL',
        status: true,
      });
      if (response) {
        localStorage.setItem('token', response.data.token);
      }
      toast.success('login successful', {
        autoClose: 1500,
        onClose: () => {
          navigate('/');
        },
      });
    } catch (e) {
      toast.error('please try again');
    }
  };

  return (
    <>
      <div className="container  mx-auto">
        <section className="absolute w-full">
          <div className="container mx-auto">
            <div className="login">
              <div>
                <h2 className="text-primary">Login to my account</h2>
                <p className="text-third">Enter your e-mail and password:</p>
              </div>
              <form>
                <ToastContainer position="top-center" />
                <Input
                  placeHolder="Email"
                  onChange={e => onChange(e, 'email')}
                />
                <div className="relative">
                  <Input
                    className=""
                    placeHolder="Password"
                    type={showpwd ? 'text' : 'password'}
                    onChange={e => onChange(e, 'password')}
                  />
                  <div
                    className="absolute top-0 right-0 flex eye"
                    onClick={() => setShowPwd(preve => !preve)}
                  >
                    {showpwd ? (
                      <i className="fa-regular fa-eye-slash"></i>
                    ) : (
                      <i className="fa-regular fa-eye"></i>
                    )}
                  </div>
                </div>
              </form>
              <Link to={'/forgetpassword'}>
                <p className="paragraph text-center text-secondary">
                  Forgot password
                </p>
              </Link>
              <div className="flex justify-center">
                <Button onClick={onclick}>Login</Button>
              </div>
              <div className="flex items-center justify-center">
                <GoogleLogin
                  onSuccess={onGoogleClick}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  auto_select={false}
                />
              </div>
              <p className="paragraph text-center">
                <span className="text-primary">Don't have an account ?</span>

                <span
                  className="text-secondary ml-3 paragraph"
                  onClick={navigation}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
