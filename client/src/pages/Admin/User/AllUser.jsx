import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import AdminLayout from "../../../adminComponents/AdminLayout.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const AllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  //getall products
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-users");

      setAllUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);

  // delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/auth/delete-user/${pId}`
      );

      if (data?.success) {
        toast.success("User Deleted successfully");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in delete Users");
    }
  };

  return (
    <>
      <AdminLayout>
        <Table style={{ fontSize: 12 }} responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0
              ? allUsers.map((users, id) => (
                  <tr key={users._id}>
                    <td>{id + 1}</td>
                    <td>{users.name}</td>
                    <td>{users.email}</td>

                    <td>{users?.number}</td>

                    <td>
                     
                      <button
                        className="p-1 btn btn-danger"
                        onClick={() => {
                          handleDelete(users._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </AdminLayout>
    </>
  );
};

export default AllUser;
