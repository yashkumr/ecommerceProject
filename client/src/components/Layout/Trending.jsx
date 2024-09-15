import React, { useState, useEffect, Fragment } from "react";
import Slider from "react-slick";
import "../../assets/customCss/Main.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";

const Trending = () => {
  const [trendingButton, setTrendingButton] = useState("trending");
  const [trendingProducts, setTrendingProducts] = useState([]);

  const handleButtonClick = async (buttonId) => {
    try {
      setTrendingButton(buttonId);
      const { data } = await axios.get(
        `/api/v1/product/visible-product/${buttonId}`
      );
      console.log("data?.products", data?.products);
      setTrendingProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleButtonClick("trending");
  }, []);
  var settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
         
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div>
        <div className="homeCardSlider-top mt-5">
          <h2> TRENDING</h2>
        </div>
        

        <div style={{ backgroundColor: "rgb(255 255 255)" }}>
          <div
            className="slider-container "
            style={{ width: "90%", margin: "auto" }}
          >
            <Slider {...settings}>
              {trendingProducts.map((val, index) => {
                return (
                  <Fragment key={index}>
                    <div className="homeCardSlider">
                    <Link to={`/product/${val.slug}`}>
                      {val.mainImages.map((picture) => (
                        <>
                        
                        
                          <img
                            src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${picture.img}`}
                            alt="images"
                          />
                        
                        </>
                      ))}
                        </Link>
                      <div className="sell-Button">
                        <NavLink className="sell-name-button">{val?.name}</NavLink>
                      </div>
                      
                    </div>
                  </Fragment>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
