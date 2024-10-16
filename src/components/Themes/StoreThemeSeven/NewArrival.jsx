import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function NewArrival({
  categories,
  sectionTitle,
  seeMoreUrl = "",
  categoryTitle = "",
}) {
  return (
    <section className="flex flex-wrap px-4 sm:px-6 lg:px-12 w-full ">
      <div className="w-full flex flex-col lg:flex-row justify-center lg:h-[410px] items-center">
        {/* Sidebar Section */}
        <div className="w-full lg:w-[20%] grid lg:grid-cols-1 p-4 md:grid-cols-1 sm:grid-cols-3 gap-4 py-6 h-full lg:py-10 lg:pl-8 bg-green-600">
          <h2 className="font-thin text-white text-3xl lg:text-4xl col-span-full sm:col-span-1">
            {categoryTitle}
          </h2>
          <p className="text-white font-normal leading-7 text-base lg:text-lg sm:col-span-1">
            Cardigan helvetica sriracha, portland celiac truffaut woke lorem
            ipsum dolor...
          </p>
          <div className="flex justify-start h-fit font-thin sm:col-span-1">
            <button className="rounded-md text-white flex justify-center items-center">
              <Link
                href={seeMoreUrl}
                passHref
                rel="noopener noreferrer"
                className="px-6 py-2"
              >
                <span className="inline-flex items-center space-x-2 group">
                  Check All Products
                  <svg
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 ml-2"
                    viewBox="0 0 256 512"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="white"
                  >
                    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                  </svg>
                </span>
              </Link>
            </button>
          </div>
        </div>

        {/* Grid for the product cards */}
        <div className="w-[80%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 p-5 h-full">
          {categories &&
            categories.slice(0, 6).map((item, i) => (
              <div
                data-aos="fade-left"
                data-aos-delay={i + "00"}
                key={i}
                className="flex flex-col items-center h-full   shadow-sm"
              >
                <Link
                  href={
                    item.category && item.category.slug
                      ? item.category.slug
                      : item.slug
                  }
                  passHref
                  rel="noopener noreferrer"
                  legacyBehavior
                >
                  <div className="container cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="relative w-full md:h-[130%] pb-[100%] mb-1">
                      <Image
                        objectFit="cover"
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          (item.category && item.category.image
                            ? item.category.image
                            : item.thumb_image)
                        }
                        layout="fill"
                        alt={item.name}
                        className=""
                      />
                    </div>
                    <h3 className="text-base font-normal text-center text-[var(--primary-color)]">
                      {item.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
