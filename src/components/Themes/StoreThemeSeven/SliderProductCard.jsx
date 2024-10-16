import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function SliderProductCard({ sectionTitle, categories }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  // const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  // const mageMenuList = websiteSetup && websiteSetup.payload.megaMenuCategories;
  // const megaMenuBanner = websiteSetup && websiteSetup.payload.megaMenuBanner;
  // const customPages = websiteSetup && websiteSetup.payload.customPages;
  console.log(categories);

  const settings = {
    
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container mx-auto px-4 pb-10 font-['JOST'] ">
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"> */}
      <style >{`
        .slick-slide > div {
          margin: 0 10px;
        }
        .slick-list {
          margin: 0 -10px;
        }
      `}</style>
      <Slider {...settings}>
        {categories &&
          categories.map((item, i) => (
            <div
              data-aos="fade-left"
              data-aos-delay={i + "00"}
              key={i}
              className="flex flex-col items-center"
            >
              <Link
                href={
                
                  
                  
                    
                         item.slug
                        
                 
                }
                passhref
                rel="noopener noreferrer"
                legacyBehavior
              >
                <div className="relative w-full aspect-[19/26] mb-2 cursor-pointer">
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
      </Slider>
      {/* </div> */}
    </div>
  );
}
