import React, { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import "../assets/customCss/Main.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import zero from "../assets/images/Home/zero.webp";
import bill from "../assets/images/Home/bill.webp";
import axios from "axios";
import toast from "react-hot-toast";
import {
  
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  getCartTotal,
} from "../features/cartSlice";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";

const CartPage = () => {
  

  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

 

  return (
    <Layout>
      <>
        <div className="shipping-wrapper">
          <div className="container">
            <h5 className="text-center fw-bold">Billings Details </h5>
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
                  <span> Address</span>
                </li>
                <li className="opc-progress-bar-item ">
                  <span> Address & shipping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* end progressBar   */}

        <div className="lence-bill">
          

          <div className="shipping-img  mb-3">
            <div className="shipping-title  ">Reviews & Payments</div>
            <div className="p-2">
              <div className="enEBpN">
                <img src={bill} />
              </div>
              <div>Cart - {cart.length} items</div>

              <div className="XgzsV p-2">
                {cart?.map((data, id) => (
                  <>
                    <div>
                      <div className="dtjBcJ p-2">
                        <NavLink to="#">
                          {data?.mainImages.map((picture) => (
                            <>
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_MAIN_URL
                                }${picture.img}`}
                                alt="images"
                              />
                            </>
                          ))}
                        </NavLink>
                        <div className="main-cart-detials">
                          <div className="ezTXEY">
                            <div className="bil-para">{data.name}</div>

                            <div>{data.price}</div>
                          </div>

                          <div className="eQSjIx">
                            {/* <div>Final Price</div>
                          <div>
                            <span>Rs:</span>
                            <span>5100</span>
                          </div> */}
                          </div>
                          <hr />
                          <div className="lence-indc">
                            <div className="">
                              <div className="">
                                <div className="lence-indc-button-gap mb-">
                                  <button
                                    className="cart-button"
                                    onClick={
                                      data.quantity <= 1
                                        ? 1
                                        : () =>
                                            dispatch(
                                              decreaseItemQuantity(data._id)
                                            )
                                    }
                                  >
                                    <span>
                                      <HiMinusSmall />
                                    </span>
                                  </button>

                                  <div className="cart-input">
                                    <input
                                      name="quantity"
                                      readOnly
                                      value={data.quantity}
                                      type="number"
                                      className="text-center"
                                      onChange={() => null}
                                    />
                                  </div>

                                  <button
                                    className="cart-button "
                                    onClick={() =>
                                      dispatch(increaseItemQuantity(data._id))
                                    }
                                  >
                                    <span>
                                      <GoPlus />
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="cart-remove-button"
                              data-mdb-toggle="tooltip"
                              title="Remove item"
                              onClick={() => dispatch(removeItem(data._id))}
                            >
                              <FaRegTrashAlt />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

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

            <div className="lence-bill-details-card">
              <div>
                <div className="coupon p-1 ">
                  <div>GLASS BADLO, VIBE BADLO</div>{" "}
                  <div> Get HUSTLR for ₹1200. Use coupon: TRYUS</div>
                </div>
              </div>
            </div>

            <div className="lence-bill-details-card">
              <div>
                <div className="coupon p-1">
                  <div>Apply Coupon</div> <div> Check available offers</div>
                </div>
              </div>
            </div>
            <NavLink to="/shipping" className="bill-button">
                Proceed To Checkout
              </NavLink>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CartPage;
