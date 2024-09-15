import React, { useEffect, useState } from "react";
import "../../assets/customCss/Header.css";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../../context/Auth.jsx";
import MenuHeader from "./MenuHeader/index.jsx";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import main_logo from "../../assets/images/Header/main_logo.svg";
import newtollnumber from "../../assets/images/Header/new-toll-number.webp";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../../features/cartSlice.jsx";
import SearchInput from "../Form/SearchInput.jsx";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const { cart, totalQuantity } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div className="lence-header ">
        {/* search with header */}

        <div>
          {/* search with header */}
          <div className="searchHeader">
            <div className="logo">
              <NavLink className="main-logo" to="/">
                <img src={main_logo} />
              </NavLink>
              <NavLink className="main-logo">
                <img src={newtollnumber} />
              </NavLink>
            </div>
            <div className="search">
              <SearchInput />
            </div>
            <div className="icons">
              <NavLink className="icon">Track Order</NavLink>

              {!auth?.user ? (
                <div>
                  <NavLink to="/login" className="icon">
                          login
                  </NavLink>
                </div>
              ) : (
                <>
                  <NavLink
                    className="nav-link dropdown-toggle icon"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none" }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item "
                       
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item "
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </>
              )}

              <NavLink className="icon">
                <span>
                  <CiHeart />
                </span>
                Wishlist{" "}
              </NavLink>

              <Link to="/cart" className="icon">
                {" "}
                <CiShoppingCart /> <span> ({totalQuantity})</span>
              </Link>
            </div>
          </div>
          {/* search with header */}
        </div>

        {/* dynamic header */}
        <div className="">
          <MenuHeader />
        </div>
        {/* end dynamic header */}
      </div>
    </>
  );
};
export default Header;
