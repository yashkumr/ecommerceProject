import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../context/Search.jsx";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"search-products"}>
      <div className="main-info">
        <div className="quick-info">
          <ul>
            <li>
              <NavLink to="/">
                Home
                <span>
                  <IoIosArrowForward />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                Search
                <span>
                  <IoIosArrowForward />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink>
                Products
                <span>
                  <IoIosArrowForward />
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="" style={{ width: "100%", margin: "auto",backgroundColor:"#f8f8f8" }}>
        <div className="text-center p-1" style={{backgroundColor:"#f1f1f1",color:"rgb(26 63 76)"}}>
          <h4>Search Results</h4>
          <p>
            {values?.results.length < 1
              ? "No Products Found"
              : `Total Products : ${values?.results.length}`}
          </p>
        </div>

        <div className="filter-body pl-5 pr-5">
          {values?.results.map((p) => (
            <>
              <div className="filter-body-img">
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

                <div className="">
                  <h5 className="product-name">{p.name}</h5>
                  <p className="product-price">
                    {p.description.substring(0, 30)}....
                  </p>
                  <p className="product-price">{p.price}</p>
                  <button className="product-button">Buy Now</button>
                  {/* <button className="product-button">
                          Add To Cart
                </button> */}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
