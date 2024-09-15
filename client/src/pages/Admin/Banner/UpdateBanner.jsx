import React, { useState, useEffect } from "react";
import AdminLayout from "../../../adminComponents/AdminLayout.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateBanner = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  // Single Banner

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/banner/get-banner/${params.slug}`
      );

      setName(data.product.name);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  // handleUpdate

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const bannerData = new FormData();
      bannerData.append("name", name);

      photo && bannerData.append("photo", photo);

      const { data } = axios.put(
        `/api/v1/banner/update-banner/${id}`,
        bannerData
      );
      if (data?.success) {
        toast.error("Something went wrong")
      } else {
        
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/banner");
      }
    } catch (error) {
      console.log(error);
     
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/banner/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateBanner;
