import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
const CompanyContactBanner = () => {
  const [brands, setBrands] = useState([]);
  const getCategories = async () => {
    const result = await axios.get('/brand');
    setBrands(result.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="container mx-auto mt-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white shadow p-5">
        <div className="about my-5 px-10">
          <h1 className="text-2xl font-semibold my-4 max-w-[310px]">
            We're Authorized Dealer for Bosch, Dewalt, Stanley, & Black+Decker.
          </h1>
          <p className="font-light text-slate-500 text-base">
            Get High range of hand tools available online with us is diverse,
            and it includes cutters, pullers & separators, hammers, crimpers,
            riveters and more.
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <button className="text-xs sm:text-base bg-secondary text-white rounded px-6 py-2">
              Know More
            </button>
            <button className="text-xs sm:text-base border-1-secondary text-secondary rounded px-6 py-2">
              Contact Us
            </button>
          </div>
        </div>
        <div className="brands m-4 flex justify-center items-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 border-1-fouth ">
            {brands.map((data, i) => {
              return (
                <div
                  key={data._id}
                  className="border-1-fouth h-20 w-full max-w-[200px] p-5"
                >
                  <img src={data.image} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyContactBanner;
