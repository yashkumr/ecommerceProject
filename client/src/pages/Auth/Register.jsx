import React, { useState } from "react";
import "../../assets/customCss/Main.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/Layout/Layout.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/v1/auth/register", {
        name,
        number,
        email,
        password,
        cpassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Layout>
        <div className="registr-img mt-3 mb-3">
          <div className="container-fluid  text-light py-3">
            {/* <header className="text-center">
              <h1 className="display-6">REGISTRATION FORM</h1>
            </header> */}
          </div>
          <section className="container my-2  w-50 text-light p-2">
            <form
              onSubmit={handleSubmit}
              className=" register-form container row g-3 p-3"
            >
              <h4 className="">REGISTRATION FORM</h4>
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
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="form-control shadow-none"
                  id="validationDefault01"
                  placeholder="Number"
                  required
                />
              </div>

              <div className="col-md-12">
                <h6 className="m-3">SIGN-IN INFORMATION</h6>
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
                  type="number"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control shadow-none"
                  id="inputpassword"
                  placeholder=""
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputpassword" className="form-label">
                  CONFIRM PASSWORD<strong>*</strong>
                </label>
                <input
                  type="number"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  className="form-control shadow-none"
                  id="inputpassword"
                  placeholder=" "
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input shadow-none rounded-0"
                    type="checkbox"
                    id="gridCheck"
                    required
                  />
                  <label className="form-check-label " htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              {/* <div className="col-6 registr-back">
                <button type="submit" className=" rounded-0">
                  <Link to="/">Back</Link>
                </button>
              </div> */}
              <div className="col-6 registr-back">
                <button type="submit" className=" rounded-0">
                  Create Account
                </button>
              </div>
            </form>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Register;
