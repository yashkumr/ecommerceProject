import React, { useEffect, useState } from "react";
import AdminLayout from "../../../adminComponents/AdminLayout.jsx";
import axios from "axios";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [banners, setBanners] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const navigate = useNavigate();

  //Submit Banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bannerData = new FormData();
      bannerData.append("name", name);
      bannerData.append("photo", photo);

      const { data } = axios.post("/api/v1/banner/create-banner", bannerData);

      if (data?.success) {
        toast.success(data?.message);
      }
      getAllBanner();
      navigate("/dashboard/admin/banner")
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  //getBanner
  const getAllBanner = async () => {
    try {
      const { data } = await axios.get("/api/v1/banner/get-banner");
      if (data?.success) {
        setBanners(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in sunglass");
    }
  };
  useEffect(() => {
    getAllBanner();
  }, []);

  const handleDelete = async (pId) => {
    try {
      let answer = window.prompt("Are You Sure want to delete this Banner ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/banner/delete-banner/${pId}`
      );
      if (data.success) {
        toast.success(`Banner Deleted Successfully`);
        getAllBanner();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title={"Dashboard - create-sunglass"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row ">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h2>Create Banner</h2>
            <div className="p-3 w-50 row">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Banner  Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3 ">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      multiple
                      className=""
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3 col-md-6">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">photo</th>
                    <th scope="col">Banner</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners?.map((c) => (
                    <>
                      <tr>
                        <td style={{ width: "10rem" }}>
                          {" "}
                          <img
                            src={`/api/v1/banner/product-photo/${c._id}`}
                            className="card-img-top"
                            alt={c.name}
                          />
                        </td>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                            }}
                          >
                            <Link
                              key={c._id}
                              to={`/dashboard/admin/banner/update-banner/${c.slug}`}
                            className="text-light" >
                              Edit
                            </Link>
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomeBanner;
