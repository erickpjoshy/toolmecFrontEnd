import Header from '../../components/Header/index.jsx';
import axios from '../../utilities/customAxios.js';
import Input from '../../components/Input';
import Button from '../../components/Button/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import uploadImage from '../../helpers/uploadProduct.js';
import 'react-toastify/dist/ReactToastify.css';
import './usersignup.css';

const UserSignUp = () => {
  // ---------------------------START NAVIGATE TO LOGIN----------------------------

  const navigate = useNavigate();
  const navigation = () => {
    navigate('/login');
  };
  // ---------------------------STOP NAVIGATE TO LOGIN----------------------------

  //  ---------------------start set pwdicon-----------------------
  const [showpwd1, setShowPwd1] = useState(false);
  const [showpwd2, setShowPwd2] = useState(false);

  //  ---------------------end set pwdicon-----------------------

  // ---------------------------START SIGNUP DATA STORE----------------------------

  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });

  const onChange = (e, key) => {
    console.log(e.target.value);
    setSignUp({ ...signUp, [key]: e.target.value });
    // console.log(signUp);
  };

  // ---------------------------STOP SIGNUP DATA STORE----------------------------

  // ---------------------------START IMAGE UPLOAD OLD CODE----------------------------
  // const onUpload = async e => {
  //   if (signUp.image) {
  //     const name = signUp.image.split('4445/')[1];
  //     const response = await axios.post('/upload/delete', { image: name });
  //     // console.log(response);
  //   }
  //   const file = e.target.files[0];
  //   // console.log(e.target.files[0]);
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     try {
  //       const response = await axios.post('/upload/image', formData);
  //       setSignUp({ ...signUp, image: response.data.url });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };
  // ---------------------------STOP IMAGE UPLOAD OLD CODE----------------------------

  // ---------------------------START IMAGE UPLOAD NEW CODE----------------------------
  const onUpload = async e => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setSignUp({
      ...signUp,
      image: uploadImageCloudinary.url,
    });
  };
  // ---------------------------STOP IMAGE UPLOAD NEW CODE----------------------------

  // ---------------------------START POST SIGNUP DATA----------------------------

  const onclick = async () => {
    try {
      await axios.post('/user/signup', signUp);
      toast.success('user signup successful,please login', {
        autoClose: 1500,
        onClose: () => {
          navigation();
        },
      });
    } catch (e) {
      console.log(e);
      toast.error('Whoops, Somthing went wrong! Please try again', {
        autoClose: 1500,
      });
    }
  };
  // ---------------------------STOP POST SIGNUP DATA----------------------------
  console.log(signUp);
  return (
    <>
      <div className="container  mx-auto">
        <section className="absolute w-full">
          <div className="container mx-auto">
            <div className="signup">
              <h2 className="text-primary">Create my account</h2>
              <p className="text-third">
                Please fill in the information below:
              </p>
              <ToastContainer position="top-center" />
              <div className="flex justify-center">
                <div className="user-image relative flex items-center justify-center overflow-hidden">
                  {signUp.image ? (
                    <div className="image">
                      <img
                        src={signUp.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <i className="fa-regular fa-user"></i>
                  )}
                  <div className="user-text text-xs py-4 px-2 absolute bottom-0 text-center cursor-pointer">
                    Upload Image
                  </div>
                  <form>
                    <Input type="file" onChange={onUpload} />
                  </form>
                </div>
              </div>
              <Input
                placeHolder="Name"
                required={true}
                onChange={e => onChange(e, 'name')}
              />
              <Input
                placeHolder="Email"
                required={true}
                onChange={e => onChange(e, 'email')}
              />
              <div className="relative">
                <Input
                  placeHolder="Password"
                  required={true}
                  type={showpwd1 ? 'text' : 'password'}
                  onChange={e => onChange(e, 'password')}
                />
                <div
                  className="absolute top-0 right-0 flex eye"
                  onClick={() => setShowPwd1(preve => !preve)}
                >
                  {showpwd1 ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </div>
              </div>
              <div className="relative">
                <Input
                  required={true}
                  placeHolder="Confirm Password"
                  type={showpwd2 ? 'text' : 'password'}
                  onChange={e => onChange(e, 'confirmPassword')}
                />
                <div
                  className="absolute top-0 right-0 flex eye"
                  onClick={() => setShowPwd2(preve => !preve)}
                >
                  {showpwd2 ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </div>
              </div>

              <p className="paragraph text-center text-secondary">
                Forgot password
              </p>
              <div className="flex justify-center">
                <Button onClick={onclick}>Sign Up</Button>
              </div>
              <p className="paragraph text-center">
                <span className="text-primary">Have an account</span>
                <span
                  className="text-secondary ml-5 paragraph"
                  onClick={navigation}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserSignUp;
