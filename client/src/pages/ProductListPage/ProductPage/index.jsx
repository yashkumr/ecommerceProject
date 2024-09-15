import React, { useEffect } from "react";

import getParams from "../../utils/getParams";

const ProductPage = (props) => {
  // const dispatch = useDispatch();
  // const product = useSelector(state => state.product);
  // const { page } = product;

  useEffect(() => {
    const params = getParams(props.location.search);
    // console.log({params});
    // const payload = {
    //     params
    // }
    // dispatch(getProductPage(payload));
  }, []);

  return (
    <>
      <h1>het</h1>
    </>
  );
};

export default ProductPage;
