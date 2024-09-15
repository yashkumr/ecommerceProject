import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import "../../assets/customCss/Main.css";
import OAuth from "../../components/extraComponent/OAuth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout>
        {/* details */}
        <div className="container login-page mt-2">
          <div>
            <div className="row mt-5">
              <div className=" col-md-12 ">
                <form
                  onSubmit={handleSubmit}
                  className=" login-form container row g-3 p-3"
                >
                  <h4 className="">REGISTRATION FORM</h4>

                  <div className="col-md-12">
                    <p className="m-3">
                      If you have an account, <strong> sign </strong> in with
                      your email address <strong>*</strong>
                    </p>
                    <label htmlFor="inputEmail4" className="form-label">
                      EMAIL <strong>*</strong>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control shadow-none"
                      id="inputEmail4"
                    />
                  </div>

                  <div className="col-12">
                    <label
                      htmlFor="inputpassword"
                      className="form-label shadow-none"
                    >
                      PASSWORD<strong>*</strong>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control shadow-none"
                      id="inputpassword"
                      placeholder=""
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 p-1  login-back">
                      <button type="submit" className=" rounded-0">
                        <Link to="/">SignIn</Link>
                      </button>
                    </div>
                    <div className="col-md-6 p-1 login-back d-flex">
                      
                        <OAuth/>
                  
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h5 className="font-bold">New Customer</h5>
            <p className="">
              By creating an account with our store, you will be able to move
              through the checkout process faster, store multiple shipping
              addresses, view and track your orders in your account and more.
            </p>
            <div className="col-4 account-back">
              <button type="submit" className=" rounded-0">
                
                {/* <NavLink to="/register">Create an Account</NavLink> */}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
