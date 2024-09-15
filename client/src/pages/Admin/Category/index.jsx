import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal.jsx";
import AddCategoryModal from "./components/AddCategoryModal.jsx";
import "./style.css";
import AdminLayout from "../../../adminComponents/AdminLayout.jsx";
import Modal from "./UI/Modal/index.jsx";

const Category = (props) => {
  // const category = useSelector((state) => state.category);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const [category, setCategory] = useState([]);

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


  const handleClose = () => {
    const form = new FormData();

    if (categoryName === "") {
      alert("Category name is required");
      setShow(false);
      return;
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    // dispatch(addCategory(form));
    const { data } = axios.post("/api/v1/category/create-category", form);

    if (data?.success) {
      toast.error(data?.message);
    } else {
      toast.success("Category Created Successfully");
      // navigate("");
    }

    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];

    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    console.log(value);
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    // dispatch(updateCategories(form));
    const { data } = axios.put("/api/v1/category/update-category", form);

    if (data?.success) {
      toast.error(data?.message);
    } else {
      toast.success("Category Updated Successfully");
      getAllCategory();
      setUpdateCategoryModal(false);

      // navigate("");
    }
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    try {
      const checkedIdsArray = checkedArray.map((item, index) => ({
        _id: item.value,
      }));
      const expandedIdsArray = expandedArray.map((item, index) => ({
        _id: item.value,
      }));
      const idsArray = expandedIdsArray.concat(checkedIdsArray);

      // if (checkedIdsArray.length > 0) {
      // }
      const { data } = axios.delete("/api/v1/category/delete-category", checkedIdsArray);
      console.log(data);

      if (data?.success) {
        toast.success("Category Deleted successfully");
        setDeleteCategoryModal(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
    }

    setDeleteCategoryModal(false);
  };

  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };

  const categoryList = createCategoryList(category);

  return (
    <AdminLayout>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions: </span>
                <button onClick={handleShow}>
                  <IoIosAdd /> <span>Add</span>
                </button>
                <button onClick={deleteCategory}>
                  <IoIosTrash /> <span>Delete</span>
                </button>
                <button onClick={updateCategory}>
                  <IoIosCloudUpload /> <span>Edit</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>
      <AddCategoryModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Category"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />

      {renderDeleteCategoryModal()}
    </AdminLayout>
  );
};

export default Category;
