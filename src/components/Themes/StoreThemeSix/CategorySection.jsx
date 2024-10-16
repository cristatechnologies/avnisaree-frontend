import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import FontAwesomeCom from "../../Helpers/icons/FontAwesomeCom";
import ServeLangItem from "../../Helpers/ServeLangItem";
import Arrow from "../../Helpers/icons/Arrow";

function CategorySection({ sectionTitle, categories }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  const mageMenuList = websiteSetup && websiteSetup.payload.megaMenuCategories;
  const megaMenuBanner = websiteSetup && websiteSetup.payload.megaMenuBanner;
  const customPages = websiteSetup && websiteSetup.payload.customPages;

  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;

    const handleMouseDown = (e) => {
      setDragging(true);
      setStartX(e.pageX - slider.offsetLeft);
      setScrollLeft(slider.scrollLeft);
    };

    const handleMouseMove = (e) => {
      if (!dragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the multiplier for smoother scrolling
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    const handleMouseLeave = () => {
      setDragging(false);
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dragging, startX, scrollLeft]);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 235;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 235;
  };

  return (
    <div className="category-section-wrapper container-x mx-auto flex px-10 py-10">
      <div className="container-x mx-auto pb-[60px] w-1/2 !pl-0">
        <div className="max-w-7xl mx-auto py-5 h-full flex flex-col justify-center relative">
          {/* <div className="absolute rounded-full bg-[var(--primary-color)] p-2 h-14 w-14 flex justify-center items-center top-16 right-0 transition-all ease-in duration-150 z-10">
            <button onClick={slideRight}>
              <Arrow
                className={"w-5 h-5 fill-[var(--secondary-color)] -rotate-90"}
              />
            </button>
          </div> */}
          {/*<div className="section-title flex justify-between items-center mb-5">*/}
          {/*    <div>*/}
          {/*        <h1 className="sm:text-3xl text-xl font-600 text-[var(--text-color)]text">*/}
          {/*            {sectionTitle}*/}
          {/*        </h1>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div
            className="w-full flex gap-2 overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth px-4 py-2 transition-all ease-in duration-150 category-slider"
            id="slider"
            ref={sliderRef}
          >
            {categories &&
              categories.slice(0, 5).map((item, i) => (
                <div
                  data-aos="fade-left"
                  data-aos-delay={i + "00"}
                  key={i}
                  className="item w-full cursor-pointer group"
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { category: item.category.slug },
                    }}
                    passhref
                    rel="noopener noreferrer"
                    className="flex flex-col justify-center items-center"
                    legacyBehavior>

                    <div className="w-48 h-48 relative rounded-full flex justify-center items-center hover:brightness-50 ">
                      <div className="relative w-full h-full rounded-full overflow-hidden transform hover:scale-90 transition-transform duration-500 ease-in-out">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            item.category.image
                          }
                          alt=""
                          className="rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-base text-[var(--text-color)] text-center group-hover:translate-y-[-10px] transition-transform duration-200 ease-in-out">
                          <div className="p-2 bg-white rounded-2xl max-w-[150px] mx-auto whitespace-normal">
                            <p>{item.category.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </Link>
                </div>
              ))}
          </div>
          {/* <div className="absolute rounded-full bg-[var(--primary-color)] p-2 h-14 w-14 flex justify-center items-center top-16 transition-all ease-in duration-150 -left-0">
            <button onClick={slideLeft}>
              <Arrow
                className={"w-5 h-5 fill-[var(--secondary-color)] rotate-90"}
              />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
