import React from "react";

import "../../assets/customCss/Main.css";
import { useAuth } from "../../context/Auth";
import Layout from "../../components/Layout/Layout.jsx";
import UserMenu from "../../components/extraComponent/UserMenu.jsx";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Layout>
        <div className="user-wrapper">
          <div className="container ">
            <h5 className="text-center">{auth?.user?.name} </h5>
            <strong style={{ color: "#ff6200" }}>Profile</strong>
          </div>
        </div>

        <div className="container-fluid m-5 p-3 dashboard">
          <div>
            <h1 className="text-center">WELCOME TO PROFILE</h1>
          </div>

          <div className="row mt-4">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9 mt-4">
              <div className="card w-75 p-3">
                <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                {/* <h3>{auth?.user?.address}</h3> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserDashboard;
