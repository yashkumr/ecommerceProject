import React, { useState, useEffect } from "react";
import filterimg1 from "../../../assets/images/Filter/filter1.webp";
import "./style.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../../components/extraComponent/Prices.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cartSlice.jsx";
import getParams from "../../utils/getParams.jsx";
import { FilterCategory } from "../../../components/extraComponent/FilterCategory.jsx";

const ProductStore = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const param = getParams(location.search);
  const cat = param.category;

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${cat}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by cat
  const handleFilter = (value, fname) => {
    let all = [...checked];
    if (value) {
      all.push(fname);
    } else {
      all = all.filter((c) => c !== fname);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getPrductsByCat();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      console.log(data?.products);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="filter-banner">
        <img src={filterimg1} />
      </div>

      <div className="cat-filter">
        <div className=" filter">
          <h5 className="text-start">category</h5>
          <div className="cat-f">
            {FilterCategory?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c.name)}
                value={c.name}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h5 className="text-start mt-4">Price</h5>
          <div className="">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className=" m-1">
            <button
              className="btn btn-danger p-1 m-1 fs-6"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="filter-body">
          {products?.map((p) => (
            <div className="filter-body-img" key={p._id}>
              {p.mainImages.map((picture) => (
                <>
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${
                      picture.img
                    }`}
                    alt="images"
                  />
                </>
              ))}
              <div>
                <h6 className="product-name">{p.name}</h6>
                <h6 className="product-price ">  &#x20b9; {p.price}</h6>

                <div className="">
                  <button
                    className="product-button "
                    onClick={() =>
                      dispatch(addToCart(p)) && navigate(`/product/${p.slug}`)
                    }
                  >
                    Add To Cart
                  </button>
                  {/* <button className="btn btn-dark mt-2 ">Buy Now</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductStore;
