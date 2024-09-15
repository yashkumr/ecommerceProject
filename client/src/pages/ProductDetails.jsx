import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
import { IoIosArrowForward } from "react-icons/io";
import "../assets/customCss/Main.css";
import { useDispatch } from "react-redux";
import Rating from "../components/extraComponent/Rating.jsx";
import ReviewCard from "../components/extraComponent/ReviewCard.jsx";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImg, setMainImg] = useState();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  const [id, setId] = useState("");

  const handleImageClick = (img) => {
    setMainImg(img);
  };

  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      // console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      // console.log("dimension", x, y);
      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const params = useParams();
  const navigate = useNavigate();

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setSingleProduct(data?.product);
      setId(data.product._id),

        getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  const productsArray = Array.isArray(singleProduct)
    ? singleProduct
    : [singleProduct];


  // const singleImage = productsArray.productPictures[0].img;
  // console.log(singleImage);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // review section

  const handleRating = (rate) => {
    setRating(rate);
    // console.log(`User rated: ${rating}`);
  };


  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // const myForm = new FormData();
      // myForm.append("rating", rating);
      // myForm.append("comment", comment);
      // myForm.append("productId", id);
      console.log(rating)
      console.log(comment)
      console.log(id)


      const { data } = await axios.put("/api/v1/product/review", { rating, comment, id });

      if (data.success) {
        toast.success("Review submitted successfully");
      }
      else {
        data.error(toast.message);
      }
    }
    catch (error) {
      console.log(error);
    }


  };


  return (
    <>
      <Layout title={"Product-Details"}>
        <div className="product-details-responsive">
          <div className="main-info">
            <div className="quick-info">
              <ul>
                <li>
                  <NavLink to="/">
                    Home
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    {singleProduct.name}
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    {singleProduct?.category?.name}
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink>{singleProduct?.description}</NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div>
            {productsArray?.map((sp) => (
              <>
                <div className="lence-cart">
                  <div className="lence-cart-section">
                    <div className="">
                      <div className="multi-images">
                        {sp &&
                          sp?.productPictures.map((picture) => (
                            <>
                              <img
                                src={`${import.meta.env.VITE_REACT_APP_MAIN_URL
                                  }${picture.img}`}
                                alt="images"
                                onClick={() => setMainImg(picture?.img)}
                              />
                            </>
                          ))}
                      </div>

                      <div>
                        {sp && sp?.mainImages.map((picture) => <>



                          <img
                            src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${mainImg || picture.img
                              }`}
                            alt="images"
                            className="single-image"
                            onMouseMove={handleZoomImage}
                            onMouseLeave={handleLeaveImageZoom}
                          />


                          {/**product zoom */}
                          {zoomImage && (
                            <div className="singel-zoom   ">
                              <div
                                className="scroll-img "
                                style={{
                                  backgroundImage: `url(${import.meta.env.VITE_REACT_APP_MAIN_URL
                                    }${mainImg || picture.img})`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: `${zoomImageCoordinate.x * 100
                                    }% ${zoomImageCoordinate.y * 100}% `,
                                  height: "70dvh",
                                }}
                              ></div>
                            </div>
                          )}
                        </>)}
                      </div>
                    </div>
                  </div>

                  <div className="lence-cart-details">
                    <h5>{sp.name}</h5>
                    <h5>Category:{sp.category.name}</h5>
                    <h4>{sp.description}</h4>


                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      Submit Review
                    </button>
                    <div>
                      {" "}
                      <p> Size:Extra Wide</p> <p> </p>
                    </div>
                    <div>
                      {" "}
                      <span> Rs: {sp?.price}</span>{" "}
                      <p>
                        Status:
                        <b className={sp.stock < 1 ? "redColor" : "greenColor"}>
                          {sp.stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                      </p>
                      <span style={{ fontSize: "11px", color: "black" }}>
                        {" "}
                        1200 with GST
                      </span>
                    </div>


                    <div className="cEJNnp">
                      <NavLink to="#" className="dVEnwe">
                        <span className="bDyAKl"></span>
                      </NavLink>
                      <NavLink to="#" className="dVEnwe">
                        <span className="bDyAKl"></span>
                      </NavLink>
                      <NavLink to="#" className="dVEnwe">
                        <span className="bDyAKl"></span>
                      </NavLink>
                    </div>
                    <div className="jfGDCb">
                      <div>With BLU Digital Rays Protection Lenses</div>
                      <div>Get for ₹700. Use Coupon: TRYUS</div>
                    </div>

                    <div className="">
                      <NavLink to="/cart" className="">
                        <button
                          className=" product-button"
                          onClick={() => navigate("/cart")}
                        >
                          Buy Now
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          {/* similar products */}
          <hr />
          <div className="">
            {relatedProducts.length < 1 && (
              <p className="text-center">No Similar Products found</p>
            )}
            <h4 className="text-center">
              <span style={{ color: "skyblue", borderRadius: "4px" }}>
                {relatedProducts.length}{" "}
              </span>{" "}
              Products Found ➡️
            </h4>

            <div className=" similar-product-body">
              {relatedProducts?.map((p) => (
                <div className="filter-body-img" key={p._id}>
                  {p.mainImages.map((picture) => (
                    <>
                      <img
                        src={`${import.meta.env.VITE_REACT_APP_MAIN_URL}${picture.img
                          }`}
                        alt="images"
                      />
                    </>
                  ))}
                  <div className="">
                    <h3 className="product-name">
                      <strong> Product : </strong>
                      {p.name}
                    </h3>
                    <p className="product-price">
                      <span>&#8377;</span> {p.price}
                    </p>

                    <div className="card-name-price">
                      <button
                        className="product-button"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ratings */}
          <h3 className="reviewsHeading">REVIEWS</h3>

          {/* <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog> */}
          <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={reviewSubmitHandler}>
                    <div>

                      <Rating totalStars={5} initialRating={rating} onRate={handleRating} />

                    </div>


                    <div className="mb-3">
                      <label htmlFor="exampleFormControlTextarea1" className="form-label">comment</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary" >
                        Submit
                      </button>
                    </div>


                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                </div>
              </div>
            </div>
          </div>

          {singleProduct.reviews && singleProduct.reviews[0] ? (
            <div className="reviews">
              {singleProduct.reviews &&
                singleProduct.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}


        </div>
      </Layout>
    </>
  );
};

export default ProductDetails;
