import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
const IconButton = ({ icon: Icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="group bg-white p-3 rounded-full shadow-md hover:bg-[var(--primary-color)] transition-transform duration-200 ease-in-out hover:scale-110">
        <Icon className="text-gray-600 text-xl group-hover:text-white " />
      </button>
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded transition-opacity duration-200 ease-in-out whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full aspect-w-1 aspect-h-1 px-4 relative overflow-hidden">
        <div className="flex items-center justify-center h-full cursor-pointer">
          <Image
            objectFit="cover"
            src={
              process.env.NEXT_PUBLIC_BASE_URL +
              (item.category && item.category.image
                ? item.category.image
                : item.thumb_image)
            }
            height={500}
            width={400}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div
          className={`absolute bottom-3 left-0 right-0 flex justify-center space-x-12 transition-all duration-300 ease-in-out ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          }`}
        >
          <IconButton icon={AiOutlineShoppingCart} text="Add to Cart" />
          <IconButton icon={AiOutlineSearch} text="Quick View" />
          <IconButton icon={AiOutlineHeart} text="Add to Wishlist" />
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-center pt-2 gap-2">
        <Link href={`/${item.slug}`} legacyBehavior>
          <span className="text-black font-semibold hover:text-[var(--primary-text-color)] cursor-pointer">
            {item.name}
          </span>
        </Link>
        <span className="text-[var(--primary-text-color)] font-extrabold ">
          {"₹ " + item.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
