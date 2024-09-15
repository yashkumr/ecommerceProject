import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";


const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <Layout>
        <div
          style={{
            width: "80%",
            margin: "25px auto auto auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2 className="text-center">redirecting to you in {count} second </h2>
          <p className="spinner-border text-center" role="status"></p>
        </div>
      </Layout>
    </>
  );
};

export default Spinner;
