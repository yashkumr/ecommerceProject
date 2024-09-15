import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import UserRoute from "./Routes/UserRoute.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

import Category from "./pages/Admin/Category/index.jsx";
import Products from "./pages/Admin/Products/index.jsx";
import HomeBanner from "./pages/Admin/Banner/HomeBanner.jsx";
import UpdateBanner from "./pages/Admin/Banner/UpdateBanner.jsx";
import UpdateProduct from "./pages/Admin/Products/UpdateProduct.jsx";
import UserProfile from "./pages/User/UserProfile.jsx";
import AllUser from "./pages/Admin/User/AllUser.jsx";

import ProductDetails from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPage.jsx";
import Shipping from "./pages/Shipping.jsx";
import ProductListPage from "./pages/ProductListPage/index.jsx"; 
import AllFilterProduct from "./pages/AllFilterProduct.jsx";
import Search from "./pages/Search.jsx";
import AdminOrder from "./pages/Admin/Orders/AdminOrder.jsx";
import UserOrder from "./pages/User/UserOrder.jsx";
import ProductReviews from "./pages/Admin/ProductReviews.jsx";

function App() {
  return (
    <>
    {/* import ProductListPage from "./pages/ProductListPage/index.jsx"; */}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ProductListPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shipping" element={<Shipping />} />

        <Route path="/search" element={<Search/>}/>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<Products />} />
          <Route
            path="admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="admin/banner" element={<HomeBanner />} />
          <Route path="admin/all-users" element={<AllUser />} />
          <Route path="admin/orders" element={<AdminOrder />} />
          <Route path="admin/reviews" element={<ProductReviews/>} />
          <Route path="admin/create-category" element={<Category />} />
          <Route
            path="admin/banner/update-banner/:slug"
            element={<UpdateBanner />}
          />
        </Route>

        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/orders" element={<UserOrder/>} />
          <Route path="user/profile" element={<UserProfile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
