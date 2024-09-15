import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../../assets/customCss/Main.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import  rating from "../../assets/images/Home/user_rating.jpg"

const Customer = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
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
        <div className="CustomerCardSlider-top mt-5 p-3">
          <h2 className=""> LOVED BY CUSTOMERS</h2>
        </div>

        <div style={{ backgroundColor: "" }}>
          <div
            className="slider-container "
            style={{ width: "90%", margin: "auto" }}
          >
            <Slider {...settings}>
              <div className="CustomerCardSlider">
                <p>
                  {" "}
                  Thank you so much Ideas, I received my parcel today, I am very
                  satisfied with the online shopping experience! Great stuff and
                  unmatchable quality.{" "}
                </p>
                <div>
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                </div>
                <div>
                  {" "}
                  <span> -</span> <span> Sania Abbasi</span>
                </div>
              </div>
              <div className="CustomerCardSlider">
                <p>
                  {" "}
                  Thank you so much Ideas, I received my parcel today, I am very
                  satisfied with the online shopping experience! Great stuff and
                  unmatchable quality.{" "}
                </p>
                <div>
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                </div>
                <div>
                  {" "}
                  <span> -</span> <span> Sania Abbasi</span>
                </div>
              </div>
              <div className="CustomerCardSlider">
                <p>
                  {" "}
                  Thank you so much Ideas, I received my parcel today, I am very
                  satisfied with the online shopping experience! Great stuff and
                  unmatchable quality.{" "}
                </p>
                <div>
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                </div>
                <div>
                  {" "}
                  <span> -</span> <span> Sania Abbasi</span>
                </div>
              </div>
              <div className="CustomerCardSlider">
                <p>
                  {" "}
                  Thank you so much Ideas, I received my parcel today, I am very
                  satisfied with the online shopping experience! Great stuff and
                  unmatchable quality.{" "}
                </p>
                <div>
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                </div>
                <div>
                  {" "}
                  <span> -</span> <span> Sania Abbasi</span>
                </div>
              </div>
              <div className="CustomerCardSlider">
                <p>
                  {" "}
                  Thank you so much Ideas, I received my parcel today, I am very
                  satisfied with the online shopping experience! Great stuff and
                  unmatchable quality.{" "}
                </p>
                <div>
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                </div>
                <div>
                  {" "}
                  <span> -</span> <span> Sania Abbasi</span>
                </div>
              </div>
              <div className="CustomerCardSlider">
                <p>
                  {" "}
                  Thank you so much Ideas, I received my parcel today, I am very
                  satisfied with the online shopping experience! Great stuff and
                  unmatchable quality.{" "}
                </p>
                <div>
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                </div>
                <div>
                  {" "}
                  <span> -</span> <span> Sania Abbasi</span>
                </div>
              </div>
              <div className="CustomerCardSlider">
                <p>
                  {" "}
                  Thank you so much Ideas, I received my parcel today, I am very
                  satisfied with the online shopping experience! Great stuff and
                  unmatchable quality.{" "}
                </p>
                <div>
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                </div>
                <div>
                  {" "}
                  <span> -</span> <span> Sania Abbasi</span>
                </div>
              </div>
              <div className="CustomerCardSlider">
                <p>
                  {" "}
                  Thank you so much Ideas, I received my parcel today, I am very
                  satisfied with the online shopping experience! Great stuff and
                  unmatchable quality.{" "}
                </p>
                <div>
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                  <img
                    src={rating}
                    alt="image"
                  />
                </div>
                <div>
                  {" "}
                  <span> -</span> <span> Sania Abbasi</span>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
