import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import FontAwesomeCom from "../../Helpers/icons/FontAwesomeCom";
import ServeLangItem from "../../Helpers/ServeLangItem";
import Arrow from "../../Helpers/icons/Arrow";

export default function ShopByCard({ sectionTitle, categories }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  // const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  // const mageMenuList = websiteSetup && websiteSetup.payload.megaMenuCategories;
  // const megaMenuBanner = websiteSetup && websiteSetup.payload.megaMenuBanner;
  // const customPages = websiteSetup && websiteSetup.payload.customPages;
console.log(categories);


  return (
    <div className="flex justify-center pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-serif uppercase text-sm font-bold text-[var(--text-color)]">
        {categories &&
          categories.map((item, i) => (
            <div
              data-aos="fade-left"
              data-aos-delay={i + "00"}
              key={i}
              className=""
            >
              <Link
                href={{
                  pathname: "/products",
                  query: {
                    category:
                      item.category && item.category.slug
                        ? item.category.slug
                        : item.slug,
                  },
                }}
                passhref
                rel="noopener noreferrer"
                legacyBehavior>

                <div className="relative">
                  <Image
                    loading="lazy"
                    object-fit="contain"
                    width={400} // Example width
                    height={300} // Example height
                    objectFit="cover"
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      (item.category && item.category.image
                        ?  item.category.image
                        : item.thumb_image)
                    }
                    alt={item.category && item.category.name ? item.category.name : item.name}
                    className="w-full h-auto hover:opacity-80"
                  />
                  <div className="absolute bottom-0 left-0 bg-white  p-4 text-[var(--primary-color)]">
                    <p>
                      {item.category && item.category.name
                        ? item.category.name
                        : item.name}
                    </p>
                  </div>
                </div>

              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
