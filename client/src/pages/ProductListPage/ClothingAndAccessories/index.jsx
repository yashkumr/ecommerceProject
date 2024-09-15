import  { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ClothingAndAccessories = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      console.log(data?.products);
      console.log("access")
      console.log(data?.products);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>hey Clothign & Accessories</h1>
    </>
  );
};

export default ClothingAndAccessories;
