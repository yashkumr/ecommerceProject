import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import Slider from "react-slick";
import SlickSlider from "../components/Layout/SlickSlider.jsx";
import Peyush from "../components/Layout/Peyush.jsx";
import NewOnSale from "../components/Layout/NewOnSale.jsx";
import NewArrival from "../components/Layout/NewArrival.jsx";
import Namita from "../components/Layout/Namita.jsx";
import Trending from "../components/Layout/Trending.jsx";
import Customer from "../components/Layout/Customer.jsx";
import GridIcons from "../components/Layout/GridIcons.jsx";
import Anupam from "../components/Layout/Anupam.jsx";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  //getBanner
  const getAllBanner = async () => {
    try {
      const { data } = await axios.get("/api/v1/banner/get-banner");
      if (data?.success) {
        setBanners(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBanner();
  }, []);

  //getAllCategory
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <Layout title={"Home-page"}>
        {/* Bootstrap Caraousel */}
        <div className="lence-banner mb-5">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            
          >
            <div className="carousel-inner">
              {banners?.map((c) => (
                <>
                  <div className="carousel-item active" >
                    <img
                      src={`/api/v1/banner/product-photo/${c._id}`}
                      className="card-img-top"
                      alt={c.name}
                    />
                  </div>
                </>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* End Bootstrap Caraousel */}

        {/* slickSlider */}

        <SlickSlider />

        {/* peyush */}
        <Peyush />

        {/* NewOnSale */}
        <NewOnSale />

        <Anupam />

        {/* NewArrival */}
        <NewArrival />

        {/* Namita */}
        <Namita />
        {/* Treding */}
        <Trending />
        {/* Customer */}
        <Customer />

        {/* GridIcons */}
        <div className="m-5">
          <GridIcons />
        </div>
      </Layout>
    </>
  );
};

export default Home;
