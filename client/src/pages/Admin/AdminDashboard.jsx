import React from "react";
import AdminLayout from "../../adminComponents/AdminLayout.jsx";
import AdminHome from "../../adminComponents/AdminHome.jsx";

const AdminDashboard = () => {
  return (
    <>
      <AdminLayout>
        <AdminHome />
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
