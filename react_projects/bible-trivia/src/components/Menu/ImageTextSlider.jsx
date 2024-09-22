// src/components/ImageTextSlider.js
import React, { useState, useEffect } from 'react';
import slide1 from "../../assets/logo/new_testament.png";
import slide2 from "../../assets/logo/old_testament.png";
import slide3 from "../../assets/logo/general_knowledge.png";

const slides = [
    {
      image: slide1,
      text: "New Testament",
    },
    {
      image: slide3,
      text: "Church History",
    },
    {
      image: slide2,
      text: "Old Testament",
    },
  ];
  
  const ImageTextSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [nextIndex, setNextIndex] = useState(1);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsSliding(true);
        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setNextIndex((nextIndex + 1) % slides.length);
          setIsSliding(false);
        }, 500); // Transition duration matches slide time
      }, 3000); // Change slide every 3 seconds
  
      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [nextIndex]);
  
    return (
      <div style={sliderContainerStyle}>
        <div
          style={{
            ...sliderItemStyle,
            transform: isSliding ? 'translateX(-100%)' : 'translateX(0)',
            zIndex: isSliding ? 0 : 1,
          }}
        >
          <img
            src={slides[currentIndex].image}
            alt="Slide"
            style={imageStyle}
          />
          <div style={textStyle}>
            {slides[currentIndex].text}
          </div>
        </div>
  
        <div
          style={{
            ...sliderItemStyle,
            transform: isSliding ? 'translateX(0)' : 'translateX(100%)',
            zIndex: isSliding ? 1 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <img
            src={slides[nextIndex].image}
            alt="Next Slide"
            style={imageStyle}
          />
          <div style={textStyle}>
            {slides[nextIndex].text}
          </div>
        </div>
      </div>
    );
  };
  
  const sliderContainerStyle = {
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '400px',
    // maxWidth: '500px',
    // margin: '20px auto',
    borderRadius: '10px',
    backgroundColor: '#282c34',
  };
  
  const sliderItemStyle = {
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.5s ease-in-out',
    width: '100%',
    height: '100%',
    position: 'relative',
  };
  
  const imageStyle = {
    maxWidth: '50px',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px 0 0 10px',
  };
  
  const textStyle = {
    color: 'white',
    padding: '20px',
    fontSize: '0.8rem',
    textAlign: 'center',
    flex: '1',
  };
  
  export default ImageTextSlider;