import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import ChangeRole from '../../components/ChangeRole/index.jsx';
import './listuser.css';
const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [changeRoleOpen, setchangeRoleOpen] = useState(false);
  const [userid, setUsersId] = useState(0);

  const getUsers = async () => {
    const result = await axios.get('/user');
    setUsers(result.data);
  };

  const changeRoleOpenFn = id => {
    setUsersId(id);
    setchangeRoleOpen(true);
  };
  const changeRoleCloseFn = () => {
    setchangeRoleOpen(false);
    getUsers();
  };
  useEffect(() => {
    getUsers();
  }, []);

  const userDeleteFn = async id => {
    await axios.delete(`/user/profile/${id}`);
    getUsers();
  };

  return (
    <div className="mt-5 relative">
      <h1 className="text-2xl text-primary text-center mb-5">USERS</h1>
      <div className="category-box bg-white min-h-60 p-5 overflow-scroll scrollbar-none">
        <table className="category-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, i) => {
              return (
                <tr key={data._id}>
                  <td>{i + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                  <td>
                    <div className="w-full flex justify-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={data.image} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-pen mr-8"
                      onClick={() => {
                        changeRoleOpenFn(data._id);
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-trash "
                      onClick={() => {
                        userDeleteFn(data._id);
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {changeRoleOpen && (
        <ChangeRole onCloseChangeBox={changeRoleCloseFn} userid={userid} />
      )}
    </div>
  );
};

export default ListUser;
