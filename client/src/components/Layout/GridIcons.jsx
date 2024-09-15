import React from 'react'
import "../../assets/customCss/Main.css"
import shippingTrack from "../../assets/images/Home/shipping-fast-black.png"
import support from "../../assets/images/Home/24-hours-support-icons_2.png"
import exchange from "../../assets/images/Home/return_n_exhange_icon.png"


const GridIcons = () => {
  return (
    <>
     {/* fress support price */}
     <div className="fress">
          <div>
            <img src={shippingTrack} alt="" />
            <div>
              <span>Free Shipping</span>
              <br />
              <span>enjoy free and fast delivery</span>
            </div>
          </div>{" "}
          <div>
            <img src={support} alt="" />
            <div>
              <span>Support 24/7</span>
              <br />
              <span>contact us 24 hours a day</span>
            </div>
          </div>{" "}
          <div>
            <img src={shippingTrack} alt="" />
            <div>
              <span>Low Price Commitment</span>
              <br />
              <span>daily sales mean you always save</span>
            </div>
          </div>{" "}
          <div>
            <img src={exchange} alt="" />
            <div>
              <span>100% Payment Secure</span>
              <br />
              <span>we ensure secure payment</span>
            </div>
          </div>
        </div>

        {/*end fress support price */}
    </>
  )
}

export default GridIcons