import React from "react";
import { FaRegUser, FaRegUserCircle, FaProductHunt } from "react-icons/fa";
import AdminLTELogo from "../assets/dists/img/AdminLTELogo.png"
import user2 from "../assets/dists/img/user2-160x160.jpg"

const SideNav = () => {
  return (
    <>
      <div className="">
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="#  " className="brand-link">
            <img
              src={AdminLTELogo}
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">LenceCart</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={user2}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a href="/dashboard/admin" className="d-block">
                  Abhdesh Tomar
                </a>
              </div>
            </div>
            {/* SidebarSearch Form */}
            {/* <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div> */}
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* <li className="nav-item menu-open">
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="/dashboard/admin" className="nav-link ">
                        <i className="far fa-circle nav-icon" />
                        <p>Admin Dashboard</p>
                      </a>
                    </li>
                  </ul>
                </li> */}

                {/* <li className="nav-item">
                  <a
                    href="/dashboard/admin/create-computerGlass"
                    className="nav-link"
                  >
                    <span className="p-2">
                      <FaProductHunt />{" "}
                    </span>
                    <p>Create Computer Glass</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/dashboard/admin/create-sunGlass"
                    className="nav-link"
                  >
                    <span className="p-2">
                      <FaProductHunt />{" "}
                    </span>
                    <p>Create sunGlass</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/dashboard/admin/create-eyeGlass"
                    className="nav-link"
                  >
                    <span className="p-2">
                      <FaProductHunt />{" "}
                    </span>
                    <p>Create eyeGlass</p>
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    href="/dashboard/admin/banner"
                    className="nav-link"
                  >
                    <span className="p-2">
                      <FaProductHunt />{" "}
                    </span>
                    <p>Banner</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/dashboard/admin/create-category"
                    className="nav-link"
                  >
                    <span className="p-2">
                      <FaProductHunt />{" "}
                    </span>
                    <p>Category</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/dashboard/admin/create-product"
                    className="nav-link"
                  >
                    <span className="p-2">
                      <FaProductHunt />{" "}
                    </span>
                    <p>Products</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/dashboard/admin/all-users"
                    className="nav-link"
                  >
                    <span className="p-2">
                    <FaRegUserCircle />
                     
                    </span>
                    <p>Users</p>
                  </a>
                </li>

              

                <li className="nav-item">
                  <a href="/dashboard/admin/orders" className="nav-link">
                    <span className="p-2">
                    <FaProductHunt />{" "} 
                    </span>
                    <p> Orders</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/dashboard/admin/reviews" className="nav-link">
                    <span className="p-2">
                    <FaProductHunt />{" "} 
                    </span>
                    <p> Reviews</p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    </>
  );
};

export default SideNav;
