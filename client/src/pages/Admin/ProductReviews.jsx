import React, { Fragment, useEffect, useState } from "react";
import "./productReviews.css";
import { Table } from 'react-bootstrap';
import SideNav from "../../adminComponents/SideNav.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductReviews = ({ history }) => {


  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState();

  const navigate = useNavigate();

  const deleteReviewHandler = async (reviewId) => {

    try {

      const { data } = await axios.delete(
        `/api/v1/product/delete-reviews?id=${reviewId}&productId=${productId}`
      );
    

      if (data.success) {
        toast.success("Review Deleted successfully ");
        
      
      }
      else {
        toast.error("something went wrong");
      }

    } catch (error) {
      console.log(error);
    }


  };

  const productReviewsSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      
      const { data } = await axios.get(`/api/v1/product/reviews?id=${productId}`);
      console.log(data);

      if (data.reviews) {
        setReviews(data.reviews);
      }

      if (data.success) {
        toast.success("Review fetch successfully ");

      }
      else {
        toast.error("something went wrong");
      }

    } catch (error) {
      console.log(error);
    }




  };

  // useEffect(async () => {
  //   try {
  //     if (productId.length === 24) {

  //       const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
  //     }

  //   }
  //   catch (error) {
  //     console.log(error);
  //   }


  // }, [id]);

  const columns = [
    // { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      // cellClassName: (params) => {
      //   return params.getValue(params.id, "rating") >= 3
      //     ? "greenColor"
      //     : "redColor";
      // },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button
            // onClick={() =>
            //   deleteReviewHandler(params.getValue(params.id, "id"))
            // }
            >
              Delete
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Layout>
      <Fragment>


        <div className="dashboard">
          <SideNav />

          <div className="productReviewsContainer">
            <form
              className="productReviewsForm"
              onSubmit={productReviewsSubmitHandler}
            >
              <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

              <div>
                Star
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                value="submit"

              >
                Search
              </button>
            </form>

            {reviews && reviews.length > 0 ? (
              <table className="table" style={{ fontSize: 12 }} responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ratings</th>
                    <th>Comments</th>
                    <th>Name</th>
                    

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {


                    reviews.map((r, id) => (
                      <tr key={r._id}>
                        <td>{id + 1}</td>
                        <td>{r.rating}</td>
                        <td>{r.comment}</td>

                        <td>{r.name}</td>


                        <td>


                          <button
                            className="p-1 btn btn-danger"
                            onClick={() => {
                              deleteReviewHandler(r._id);
                            }}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table >
            ) : (
              <h1 className="productReviewsFormHeading">No Reviews Found</h1>
            )}
          </div>
        </div>
      </Fragment>
    </Layout>

  );
};

export default ProductReviews;
