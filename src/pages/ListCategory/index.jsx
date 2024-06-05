import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import './listcategory.css';
const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const result = await axios.get('/category');
    setCategories(result.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mt-5">
      <h1 className="text-2xl text-primary text-center mb-5">CATEGORIES</h1>
      <div className="category-box bg-white min-h-60 p-5 overflow-scroll scrollbar-none">
        <table className="category-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Category Name</th>
              <th>Status</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.status.toString()}</td>
                  <td>
                    <div className="w-full flex justify-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={data.image} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <i className="fa-solid fa-pen mr-8"></i>
                    <i className="fa-solid fa-trash "></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategory;
