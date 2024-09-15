import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import UserMenu from "../../components/extraComponent/UserMenu.jsx";
import moment from "moment";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <>
      <Layout title={"Your Orders"}>
        <div className="user-wrapper">
          <div className="container">
            <h5 className="text-center">{auth?.user?.name} </h5>
            <strong style={{ color: "#ff6200" }}>Profile</strong>
          </div>
        </div>

        <div className="container mt-4 p-3 m-3 dashboard">
          <div className="row ">
            <div className="col-md-3 mt-4 ">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h2 className="text-center">All Orders</h2>
              {orders?.map((o, i) => {
                return (
                  <>
                 
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col"> date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o.createdAt).fromNow()}</td>

                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                          <div className="col-md-4">
                            {p?.mainImages.map((picture) => (
                              <>
                              
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_MAIN_URL
                                }${picture.img}`}
                                alt="images"
                              />
                              </>
                            ))}
                          </div>
                          <div className="col-md-8">
                            <p>
                              {" "}
                              Product:{" "}
                              <strong style={{ fontSize: "13px" }}>
                              {o?.products?.name}
                              
                              </strong>
                            </p>
                            <p>
                              About:{" "}
                              <strong style={{ fontSize: "13px" }}>
                                {p.description}
                              </strong>
                            </p>
                            <p>
                              Price :{" "}
                              <strong style={{ fontSize: "13px" }}>
                                {" "}
                                {p.price}
                              </strong>{" "}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserOrder;
