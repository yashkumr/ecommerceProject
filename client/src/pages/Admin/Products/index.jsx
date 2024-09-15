import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../Category/UI/Input";
import Modal from "../Category/UI/Modal";
import toast from "react-hot-toast";
import axios from "axios";
import "./style.css";
import AdminLayout from "../../../adminComponents/AdminLayout";
import { Link } from "react-router-dom";
import Pagination from "../../../components/extraComponent/Pagination.jsx";

const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [visibilty, setVisibility] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [pageNo, setPageNo] = useState(5);
  const[totalPosts , setTotalPosts] = useState();
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [category, setCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

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
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product?page=${pageNo}`
      );
      console.log(data);

      setAllProducts(data.posts);
      setTotalPosts(data.totalPages);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, [pageNo]);

  const handleClose = () => {
    setShow(false);
  };

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("visibility", visibilty);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    // dispatch(addProduct(form)).then(() => setShow(false));
    const { data } = axios.post("/api/v1/product/create-product", form);
    setShow(false);
    console.log(form);
    if (data?.success) {
      toast.error(data?.message);
    } else {
      toast.success("Product Created Successfully");
      // navigate("/dashboard/admin/products");
    }
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  // delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${pId}`
      );

      if (data?.success) {
        toast.success("Category Deleted successfully");
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in delete categroy");
    }
  };

  const renderProducts = () => {
    return (
      <>
        <Table style={{ fontSize: 12 }} responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.length > 0
              ? allProducts.map((product, id) => (
                  <tr key={product._id}>
                    <td>{id + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>

                    <td>{product && product?.category?.name}</td>
                    {/* <td>
                    <div style={{ display: "flex" }}>
                      {product.productPictures.map((picture) => (
                        <div className="productImgContainer">
                          <img
                            src={`../../public/uploads/${picture.img}`}
                            alt="images"
                          />
                        </div>
                      ))}
                    </div>
                  </td> */}

                    <td>
                      <button
                        onClick={() => showProductDetailsModal(product)}
                        className="p-1 btn btn-primary"
                      >
                        info
                      </button>
                      <button className="p-1 btn btn-warning m-1">
                        <Link
                          key={product._id}
                          to={`/dashboard/admin/update-product/${product.slug}`}
                        >
                          Edit
                        </Link>
                      </button>
                      <button
                        className="p-1 btn btn-danger"
                        onClick={() => {
                          handleDelete(product._id);
                        }}
                      >
                        del
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
        <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPosts={totalPosts}  />
      </>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Name"
          value={name}
          required={true}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          required={true}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          required={true}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control mt-2"
          required={true}
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

        <label className="mt-2 ">Visibility</label>
        <select
          className="form-control  mb-2 "
          required={true}
          value={visibilty}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option>wear</option>
          <option>unstiched</option>
          <option>bear</option>
          <option>men</option>
          <option>western</option>
          <option>kid</option>
          <option>accessories</option>
        </select>

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          multiple
          name="productPicture"
          required={true}
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">
              {productDetails && productDetails?.category?.name}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <>
                  <div className="productImgContainer">
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${
                        picture.img
                      }`}
                      alt="images"
                    />
                  </div>
                </>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <AdminLayout>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow} className="btn btn-primary">
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </AdminLayout>
  );
};

export default Products;
