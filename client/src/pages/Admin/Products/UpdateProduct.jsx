import React, { useState, useEffect } from "react";
import AdminLayout from "../../../adminComponents/AdminLayout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);

  const [category, setCategory] = useState([]);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  //getAll category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setVisibility(data.product.visibility);
      setQuantity(data.product.quantity);
      setCategoryId(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("visibility", visibility);
      productData.append("description", description);
      productData.append("category", categoryId);

      for (let pic of productPictures) {
        productData.append("productPicture", pic);
      }

      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <AdminLayout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h3>Update Product</h3>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <select
                className="form-control mt-2"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option>select category</option>
                {createCategoryList(category).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>

              <div className="mb-3">
                <label>Price</label>
                <input
                  type="Number"
                  value={price}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Visibile Products</label>
                <input
                  type="text"
                  value={visibility}
                  placeholder="Visible Products"
                  className="form-control"
                  onChange={(e) => setVisibility(e.target.value)}
                />
              </div>
              <div className="mb-3">
                {productPictures.length > 0
                  ? productPictures.map((pic, index) => (
                      <div key={index}>{pic.name}</div>
                    ))
                  : null}

                <input
                  type="file"
                  multiple
                  name="productPicture"
                  className="form-control"
                  onChange={handleProductPictures}
                />
              </div>

              <div className="mb-3">
                <label>Description</label>
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
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

export default UpdateProduct;
