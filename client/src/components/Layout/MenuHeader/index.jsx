import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import toast from "react-hot-toast";

const MenuHeader = (props) => {
  const [category, setCategory] = useState([]);

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

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>

          {category.parentId ? (
            <a
              href={`/${category.slug}?category=${category.name}&cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}
          
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  return (
    <div className="menuHeader">
      <ul>{category.length > 0 ? renderCategories(category) : null}</ul>
    </div>
  );
};

export default MenuHeader;
