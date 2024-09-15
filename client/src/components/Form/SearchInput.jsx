import React, { useState } from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );

      setValues({ ...values, results: data });
      console.log(data)
      navigate("/search");
    } catch (error) {
      console.log("something went wrong");
    }
  };

  return (
    <>
      <div>
        {/* form */}
        <form
          className="d-flex search-form r"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-2 shadow outline-none"
            type="search"
            placeholder="whate are you searching for ?"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="btn btn-outline-none shadow" type="submit">
            search
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchInput;
