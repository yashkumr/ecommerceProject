import React from "react";
import Header from "./Header.jsx";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import SideNav from "./SideNav";
import AdminFooter from "./AdminFooter.jsx";


const AdminLayout = ({ children, title, description, keywords, author }) => {
  return (
    <>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
    </div>
    <Header />
    <SideNav/>
    <main style={{ minHeight: "50vh" }}>
      <Toaster />
      {children}
    </main>
    <AdminFooter/>
   
  </>
  
  )
}


AdminLayout.defaultProps = {
  title: "LenceCart",
  description: "welcome to LenceCart",
  keywords: "top-product, trending-product",
  author: "Abadhesh Tomar",
};

export default AdminLayout