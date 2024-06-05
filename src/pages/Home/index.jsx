import Slider from '../../components/Slider';
import CategorySlider from '../../components/CategorySlider/index.jsx';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/index.jsx';
import CategoryCard from '../../components/CategoryCard/index.jsx';
import CompanyContactBanner from '../../components/CompanyContactBanner/index.jsx';
import VerticalCard from '../../components/VerticalCard/index.jsx';
import axios from '../../utilities/customAxios.js';

const Home = () => {
  // -------------------start setup loading-----------------------
  const [loading, setLoading] = useState(true);
  const contentStyle = {
    padding: 50,
  };
  const content = <div style={contentStyle} />;
  // -------------------end setup loading-----------------------
  const [slider, setSlider] = useState([]);

  const getSlider = async () => {
    const response = await axios.get('/slider');
    const images = response.data.filter(item => item.status === true);
    setSlider(images);
    setLoading(false);
  };

  useEffect(() => {
    getSlider();
  }, []);

  return (
    <div>
      <CategorySlider />
      <Slider images={slider} loading={loading} content={content} />
      <CategoryCard heading="Angle Grinders" category="Angle Grinders" />
      <CompanyContactBanner />
      <VerticalCard heading="New Arrival" tag="New Arrival" />
    </div>
  );
};

export default Home;
