import React, { useEffect, useState } from "react";
import AdminLayout from "../../../adminComponents/AdminLayout.jsx";
import { useAuth } from "../../../context/Auth.jsx";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
import moment from "moment";

const AdminOrder = () => {
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminLayout title={"All-Orders"}>
        <div className="row dashboard">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
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
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
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
                          <p>{p.name}</p>
                          <p>{p.description}</p>
                          <p> : {p.price}</p>
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
      </AdminLayout>
    </>
  );
};

export default AdminOrder;
