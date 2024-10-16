import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./TwoColsCategories.module.css";

const TwoColsCategories = ({ categories }) => {
  return <>
 
    {categories &&
      categories.slice(0, 1).map((item, index) => (
        <div
          className="flex flex-col lg:flex-row justify-between items-center max-h-min bg-white relative w-full"
          key={index}
          style={{ fontFamily: "Jost", fontWeight: "bold" }}
        >
          <div className="text-center sm:text-left flex justify-center items-center flex-col lg:w-2/4 w-full lg:inset-0">
            <div className=" flex w-2/3  justify-center items-center flex-col ">
              <h1 className="text-4xl font-semibold mb-4">
                Chest Of Drawers
              </h1>
              <p className="mb-6 text-center ">
                Timeless and evolving, unlimited in expression, we build
                spaces around the lives we lead. Using furnishings and objects
                in.
              </p>
              <Link href="/products" legacyBehavior>
                <button className="px-6 py-2 border border-black font-semibold  hover:bg-black hover:text-white  ">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
          <div className="relative  lg:w-2/4 w-full z-10 flex sm:flex-cols sm:items-start justify-between space-y-4 sm:space-y-0 sm:space-x-8 p-8  ">
            <div className={`w-full h-96 relative ${styles.wiggle}`}>
              <Image
                layout="fill"
                objectFit="cover"
                src={process.env.NEXT_PUBLIC_BASE_URL + item.category.image}
                alt=""
                className="h-46"
              />
            </div>
          </div>
          <div className="absolute  flex justify-end items-center z-0">
            <div className="bg-orange-300 w-1/5 h-3/5"></div>
          </div>
        </div>
      ))}
  </>;
};

export default TwoColsCategories;
