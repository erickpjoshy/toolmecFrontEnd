import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

const CategorySlider = () => {
  // -------------------start setup loading-----------------------
  const [loading, setLoading] = useState(true);
  const contentStyle = {
    padding: 50,
  };
  const content = <div style={contentStyle} />;
  // -------------------end setup loading-----------------------

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const result = await axios.get('/category');
    setCategories(result.data);
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);
  // console.log(categories);

  return (
    <div className="container mx-auto">
      {loading ? (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      ) : (
        <div className="min-h-40 flex pt-8 py-4 overflow-scroll scrollbar-none">
          {categories.map(item => {
            return (
              <div className="flex flex-col" key={item._id}>
                <Link
                  to={`/product-category?category=` + item._id}
                  className="h-20 w-20 sm:h-32 sm:w-32 overflow-hidden rounded-full mx-4 cursor-pointer"
                >
                  <img src={item.image} />
                </Link>
                <p className="text-primary text-center mt-2 text-sm sm:text-base">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategorySlider;
