
import "./style.css";
import getParams from "../utils/getParams.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import ClothingAndAccessories from "./ClothingAndAccessories/index.jsx";
import ProductStore from "./ProductStore/index.jsx";
import ProductPage from "./ProductPage/index.jsx";
import { useLocation } from 'react-router-dom';


const ProductListPage = (props) => {
  const location = useLocation();
  
  const renderProduct = () => {

    const params = getParams(location.search);
    
    // console.log("params is =", params);
    // const cat = params.category;
    // console.log(cat);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ProductStore {...props} />;
    }

    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
