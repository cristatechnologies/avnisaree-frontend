import React from "react";
import ServeLangItem from "../ServeLangItem";

function ShopNowBtn() {
  return (
    <div className="cursor-pointer w-full relative">
      <button className="w-full px-6 py-3 bg-white text-black font-semibold text-base hover:bg-[var(--primary-color)] hover:text-white">
        {ServeLangItem()?.Shop_Now}
      </button>
    </div>
  );
}

export default ShopNowBtn;
