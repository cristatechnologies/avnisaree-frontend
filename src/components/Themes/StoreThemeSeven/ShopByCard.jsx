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
      <div className="container mx-auto px-4 pb-10 font-['JOST'] ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories &&
            categories.map((item, i) => (
              <div
                data-aos="fade-left"
                data-aos-delay={i + "00"}
                key={i}
                className="flex flex-col items-center"
              >
                <Link
                  href={ item.category && item.category.slug
                          ? item.category.slug
                          : item.slug}
                  passhref
                  rel="noopener noreferrer"
                  legacyBehavior
                  className=""
                >
                  <div className="relative w-full aspect-[9/14] mb-2 cursor-pointer">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        (item.thumb_image ||
                          (item.category && item.category.image))
                      }
                      alt={item.name || (item.category && item.category.name)}
                      layout="fill"
                      objectFit="cover"
                      className=" hover:opacity-80 transition-opacity"
                    />
                  </div>
                </Link>
                <p className="text-center uppercase text-sm font-normal text-[var(--text-color)]">
                  {item.name || (item.category && item.category.name)}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }
