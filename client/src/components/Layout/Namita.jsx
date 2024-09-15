import React from "react";
import "../../assets/customCss/Main.css"
import lence3 from "../../assets/images/Peyush/lence3.webp";
import lence2 from "../../assets/images/Peyush/lence2.webp";
import lence4 from "../../assets/images/Peyush/lence4.webp";
import lence5 from "../../assets/images/Peyush/lence5.webp";

const Namita = () => {
  return (
    <>
      <div>
        <h2 className="text-center mt-5" style={{ color: " #38386c" }}>
          Women's Choice
        </h2>
        <p className="text-center text-muted fw-normanl">
          Hustlr in Namita's favorite's colors
        </p>
      </div>
      <div className="peyush">
        <div>
          <img src={lence3} />
        </div>
        <div>
          <img src={lence2} />
        </div>
        <div>
          <img src={lence4} />
        </div>
        <div>
          <img src={lence5} />
        </div>
        <div>
          <img src={lence2} />
        </div>
      </div>
    </>
  );
};

export default Namita;
