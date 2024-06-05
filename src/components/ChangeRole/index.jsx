import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Select from '../Select';
import Button from '../Button/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
const ChangeRole = ({ userid, onCloseChangeBox }) => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState('');
  if (userid !== 0) {
    const getUserDetails = async () => {
      const result = await axios.get(`user/profile/${userid}`);
      setUser(result.data);
    };
    useEffect(() => {
      getUserDetails();
    }, []);
  }
  const changeRole = e => {
    setRole(e.target.value);
  };
  const onClick = async () => {
    try {
      await axios.patch(`/user/profile/${user._id}`, { role: role });
      toast.success('User Details Updated...', {
        autoClose: 1500,
        onClose: () => {
          onCloseChangeBox();
        },
      });
    } catch (e) {
      console.log(e);
      toast.error('Whoops, Somthing went wrong! Please try again', {
        autoClose: 1500,
      });
    }
  };
  return (
    <div className="absolute top-0 flex w-full justify-center items-center h-full">
      <ToastContainer position="top-center" />
      <div className="p-3  change-role-box">
        <button className="block ml-auto" onClick={onCloseChangeBox}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1 className="text-2xl text-primary text-center mb-5">
          Change user role
        </h1>
        <p className="my-1">
          <span>Name :</span>
          <span> {user.name}</span>
        </p>
        <p className="my-1">
          <span>Email :</span>
          <span className="text-third"> {user.email}</span>
        </p>
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>Role :</p>
          </div>
          <div className="w-50">
            <Select
              placeHolder={user.role}
              options={[{ name: 'GENERAL' }, { name: 'ADMIN' }]}
              onChange={changeRole}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={onClick}>Change Role</Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeRole;
