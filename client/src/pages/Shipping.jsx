import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import "../assets/customCss/Main.css";
import Layout from "../components/Layout/Layout.jsx";
import { useSelector, useDispatch } from "react-redux";

import { getCartTotal } from "../features/cartSlice.jsx";

import DropIn from "braintree-web-drop-in-react";
import { useAuth } from "../context/Auth.jsx";

const Shipping = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [userEmail, setUserMail] = useState("");
  const [country, setCountery] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [number, setNumber] = useState("");

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const navigate = useNavigate();

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      console.log("handlepayment");
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
        name,
        lname,
        userEmail,
        country,
        state,
        city,
        address,
        pinCode,
        number,
      });
      console.log(data);
      setLoading(false);
      // localStorage.removeItem("cart");

      // navigate("/dashboard/user/orders");
      toast.success(" Congrates ! Your payment Completed Successfully ");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Layout>
        <div className="shipping-wrapper">
          <div className="container">
            <h5 className="text-center fw-bold">Shipping </h5>
          </div>
        </div>

        <div className="container-fluid main-info">
          <div className="quick-info">
            <ul>
              <li>
                <NavLink to="#">
                  Home
                  <span>
                    <IoIosArrowForward />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="#">
                  Product
                  <span>
                    <IoIosArrowForward />
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="#">Shipping</NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Start ProgressBar  */}
        <div className="container">
          <div className="checkout-container">
            <div className="authentication-wrapper">
              <div className="action-auth-toggle">
                <NavLink to="/register"> Sign In</NavLink>
              </div>
            </div>

            <div className="prgress-wrapper">
              <ul className="opc-progress-bar ">
                <li className="opc-progress-bar-item _active">
                  <span> Shipping</span>
                </li>
                <li className="opc-progress-bar-item ">
                  <span> Review & Payments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* end progressBar   */}

        <div className="main-bill">
          {/*Shippin form */}

          <div>
            <div className="shipping-title  ">Reviews & Payments</div>

            <form
              
              className=" register-form  row g-3 p-1"
            >
              <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">
                  EMAIL <strong>*</strong>
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserMail(e.target.value)}
                  className="form-control shadow-none"
                  id="inputEmail4"
                />
              </div>

              <div className="col-md-6 text-dark">
                <h5 className="mb-2">
                  Personal Information <strong>*</strong>{" "}
                </h5>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control  shadow-none"
                  id="validationDefault01"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="col-md-6 text-gray mt-5">
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="form-control shadow-none"
                  id="validationDefault01"
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">
                  Country<strong>*</strong>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountery(e.target.value)}
                  className="form-control shadow-none"
                  id="inputEmail4"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  City <strong>*</strong>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-control shadow-none"
                  required
                  id="inputEmail4"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  State/Province <strong>*</strong>
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="form-control shadow-none"
                  required
                  id="inputEmail4"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Address <strong>*</strong>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control shadow-none"
                  id="inputEmail4"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Zip/Postal Code <strong>*</strong>
                </label>
                <input
                  type="number"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="form-control shadow-none"
                  id="inputEmail4"
                  required
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">
                  Phone Number<strong>*</strong>
                </label>
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="form-control shadow-none"
                  id="inputEmail4"
                  required
                />
              </div>

              {/* <button type="submit" value="submit" className="bill-button">
                Proceed To Checkout
              </button> */}
              {/* Payments */}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="bill-button"
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      {loading ? "Processing ...." : "Pay Now"}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>

          <div>
            <div className="lence-bill-details">
              <div className="fw-normal fs-4">Bill Details</div>

              <div className="lence-bill-details-card">
                <div>
                  <div className="gMDLDI">
                    <div className="dfuMlk">Total Quantity</div>{" "}
                    <div className="dfuMlk"> {totalQuantity}</div>
                  </div>
                </div>
                <div>
                  <div className="gMDLDI">
                    <div className="cart-total">Total payable</div>{" "}
                    <div className="cart-total"> {totalPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shipping;
