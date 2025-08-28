import React from "react";
import "./NykaaSection.css";

const NykaaSection = () => {
  return (
    <div className="nykaa-section">
      {/* Banner Section */}
      <div className="nykaa-banner">
        <img
          src="https://images-static.nykaa.com/uploads/7eb7ab0c-8a8b-4c93-a00e-b1812e9adcb4.jpg?tr=cm-pad_resize,w-600"
          alt="Nykaa Banner"
        />
      </div>
      <br></br>

      {/* Category Boxes */}
      <div className="nykaa-categories">
        <div className="category-box">
          <img
            src="https://images-static.nykaa.com/creatives/26419e54-efd2-4f5e-9a8e-9d90d2c13b67/default.jpg?tr=cm-pad_resize,w-600"
            alt="Makeup"
          />
          <p>Makeup</p>
        </div>
        <div className="category-box">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREfGIQ_rg7lbJ9_2-tNy48OZsdg6BtenI5Jw&s"
            alt="Skincare"
          />
          <p>Skincare</p>
        </div>
        <div className="category-box">
          <img
            src="https://images-static.nykaa.com/media/catalog/product/7/2/72ae5ccNYNYKBC001505_3.jpg?tr=w-500"
            alt="Haircare"
          />
          <p>Haircare</p>
        </div>
      </div>
    </div>
  );
};

export default NykaaSection;
