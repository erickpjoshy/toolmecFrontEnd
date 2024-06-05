import React, { useState, useEffect } from 'react';
import './slider.css';
import { Spin } from 'antd';
const Slider = ({ images, loading, content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the image every 3000 milliseconds (3 seconds)
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 8000);

    return () => {
      // Clean up the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, [images.length]);
  // console.log(currentIndex);
  return (
    <div className="clearfix mx-auto slider-container">
      {loading ? (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      ) : (
        <div className="image-slider-container">
          {images.map((image, index) => {
            return (
              <img
                key={index}
                src={image.image}
                alt={`Slide ${index}`}
                className={`slider-image ${
                  index === currentIndex ? 'active' : ''
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Slider;
