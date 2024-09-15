import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../../assets/customCss/Main.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";

const SlickSlider = () => {
  const [category, setCategory] = useState([]);
  //getAll category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      console.log(data);
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in category");
    }
  };

  useEffect(() => {
    getAllCategory();
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
          <h2> SHOP BY POPULAR CATEGORY</h2>
        </div>

        <div style={{ backgroundColor: "rgb(255 255 255)" }}>
          <div
            className="slider-container "
            style={{ width: "85%", margin: "auto" }}
          >
            <Slider {...settings}>
              {category.length > 0
                ? category.map((c, id) => (
                    <>
                    
                    <div className="homeCardSlider">
                      <Link to={`/${c.slug}?cid=${c._id}&type=${c.type}`}>
                    
                      <img
                        src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${c.categoryImage}`}
                        alt={c.name}
                        
                      />
                        </Link>
                      <div>
                      <h4 className="sell-name-button" style={{ textAlign:"center", color:"gray"}}> {c.name}</h4>
                      </div>
                      
                    </div>
                    </>

                  ))
                : null}
              
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlickSlider;
