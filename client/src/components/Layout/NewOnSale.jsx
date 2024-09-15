import React, { useState, useEffect, Fragment } from "react";
import Slider from "react-slick";
import "../../assets/customCss/Main.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NewOnSale() {
  const [activeButton, setActiveButton] = useState("western");
  const [visibilities, setVisibilites] = useState([]);

  const navigate = useNavigate();

  const handleButtonClick = async (buttonId) => {
    try {
      setActiveButton(buttonId);
      const { data } = await axios.get(
        `/api/v1/product/visible-product/${buttonId}`
      );
      console.log("data?.products", data?.products);
      setVisibilites(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleButtonClick("western");
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
          <h2> NEW ON SALE</h2>
        </div>

        <div className="sale-tab-section">
          <button
            className={
              activeButton === "western" ? "active1" : "sale-tab-button"
            }
            onClick={() => handleButtonClick("western")}
          >
            Western
          </button>
          <button
            className={activeButton === "men" ? "active1" : "sale-tab-button"}
            onClick={() => handleButtonClick("men")}
          >
            Men
          </button>
          <button
            className={activeButton === "kids" ? "active1" : "sale-tab-button"}
            onClick={() => handleButtonClick("kids")}
          >
            Kids
          </button>
          <button
            className={
              activeButton === "accessories" ? "active1" : "sale-tab-button"
            }
            onClick={() => handleButtonClick("accessories")}
          >
            Accessories
          </button>
          <button
            className={
              activeButton === "unstiched" ? "active1" : "sale-tab-button"
            }
            onClick={() => handleButtonClick("unstiched")}
          >
            Unstiched
          </button>
          <button
            className={activeButton === "home" ? "active1" : "sale-tab-button"}
            onClick={() => handleButtonClick("home")}
          >
            Home
          </button>
          <button
            className={activeButton === "bear" ? "active1" : "sale-tab-button"}
            onClick={() => handleButtonClick("bear")}
          >
            {" "}
            Ready To Bear
          </button>
        </div>

        <div style={{ backgroundColor: "rgb(255 255 255)" }}>
          <div
            className="slider-container "
            style={{ width: "85%", margin: "auto" }}
          >
            <Slider {...settings}>
              {visibilities.map((val, index) => {
                return (
                  <Fragment key={index}>
                    <div className="homeCardSlider">
                      <Link to={`/product/${val.slug}`}>
                        {val.mainImages.map((picture) => (
                          <>
                            <img
                              src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${
                                picture.img
                              }`}
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
}
