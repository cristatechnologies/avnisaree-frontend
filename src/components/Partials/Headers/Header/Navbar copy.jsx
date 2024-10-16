import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Arrow from "../../../Helpers/icons/Arrow";
import FontAwesomeCom from "../../../Helpers/icons/FontAwesomeCom";
import ServeLangItem from "../../../Helpers/ServeLangItem";

export default function Navbar({ className }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  const mageMenuList = websiteSetup && websiteSetup.payload.megaMenuCategories;
  const megaMenuBanner = websiteSetup && websiteSetup.payload.megaMenuBanner;
  // const customPages = websiteSetup && websiteSetup.payload.customPages;
  const [categoryToggle, setToggle] = useState(false);
  const [subCatHeight, setHeight] = useState(null);
  const handler = () => {
    setToggle(!categoryToggle);
  };

  useEffect(() => {
    let categorySelector = document.querySelector(".category-dropdown");
    setHeight(categorySelector.offsetHeight);
  }, [categoryToggle]);
  return (
    <div
      className={`nav-widget-wrapper w-full  h-[60px] relative z-30  ${
        className || ""
      }`}
    >
      <div className="mx-24">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-start items-center">
            <div className="flex row-auto ">
              <div className="categorycategory ml-10 w-[270px] h-[51px] bg-[var(--secondary-color)] px-5 rounded-[5px] relative">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center"
                >
                  <div className="flex rtl:space-x-reverse space-x-3 text-[var(--primary-color)] items-center">
                    <span>
                      <svg
                        width="14"
                        height="9"
                        color="#ffff"
                        viewBox="0 0 14 9"
                        className="fill-current text-[var(--primary-color)]"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-[var(--primary-color)]">
                      {ServeLangItem()?.All_Categories}
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-[var(--primary-color)]"
                    />
                  </div>
                </button>
                {categoryToggle && (
                  <>
                    <div
                      className="fixed top-0 left-0 w-full h-full -z-10"
                      onClick={handler}
                    ></div>
                  </>
                )}
                <div
                  style={{
                    boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                  }}
                  className={`category-dropdown w-full absolute left-0 top-[40px]  ${
                    categoryToggle ? "block" : "hidden"
                  }`}
                >
                  <ul className="categories-list relative">
                    {categoryList &&
                      categoryList.map((item) => (
                        <li key={item.id} className="category-item">
                          <Link
                            href={{
                              pathname: "/products",
                              query: { category: item.slug },
                            }}
                            passHref
                            rel="noopener noreferrer"
                            legacyBehavior>

                            <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                              <div className="flex items-center rtl:space-x-reverse space-x-6">
                                <span>
                                  <FontAwesomeCom
                                    className="w-4 h-4"
                                    icon={item.icon}
                                  />
                                </span>
                                <span className="text-xs font-400">
                                  {item.name}
                                </span>
                              </div>
                              <div>
                                <span>
                                  <svg
                                    className={`transform rtl:rotate-180 fill-current`}
                                    width="6"
                                    height="9"
                                    viewBox="0 0 6 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="1.49805"
                                      y="0.818359"
                                      width="5.78538"
                                      height="1.28564"
                                      transform="rotate(45 1.49805 0.818359)"
                                    />
                                    <rect
                                      x="5.58984"
                                      y="4.90918"
                                      width="5.78538"
                                      height="1.28564"
                                      transform="rotate(135 5.58984 4.90918)"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </div>

                          </Link>
                          <div
                            className={`sub-category-lvl-two absolute ltr:left-[200px] rtl:right-[200px] top-0 z-10 w-[200px] ${
                              item.children.length > 0
                                ? "bg-white"
                                : ""
                            }`}
                            style={{ height: `${subCatHeight}px` }}
                          >
                            <ul className="">
                              {item.children.length > 0 &&
                                item.children.map((subItem) => (
                                  <li
                                    key={subItem.id}
                                    className="category-item"
                                  >
                                    <Link
                                      href={{
                                        pathname: "/products",
                                        query: { sub_category: subItem.slug },
                                      }}
                                      passHref
                                      rel="noopener noreferrer"
                                      legacyBehavior>

                                      <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                                        <div>
                                          <span className="text-xs font-400">
                                            {subItem.name}
                                          </span>
                                        </div>
                                        <div>
                                          <span>
                                            <svg
                                              className={`transform rtl:rotate-180 fill-current`}
                                              width="6"
                                              height="9"
                                              viewBox="0 0 6 9"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <rect
                                                x="1.49805"
                                                y="0.818359"
                                                width="5.78538"
                                                height="1.28564"
                                                transform="rotate(45 1.49805 0.818359)"
                                              />
                                              <rect
                                                x="5.58984"
                                                y="4.90918"
                                                width="5.78538"
                                                height="1.28564"
                                                transform="rotate(135 5.58984 4.90918)"
                                              />
                                            </svg>
                                          </span>
                                        </div>
                                      </div>

                                    </Link>
                                    <div
                                      className={`sub-category-lvl-three absolute ltr:left-[200px] rtl:right-[200px] top-0 z-10 w-[200px] ${
                                        subItem.children.length >
                                        0
                                          ? "bg-white"
                                          : ""
                                      }`}
                                      style={{ height: `${subCatHeight}px` }}
                                    >
                                      <ul className="">
                                        {subItem.children
                                          .length > 0 &&
                                          subItem.children.map(
                                            (subsubitem) => (
                                              <li
                                                key={subsubitem.id}
                                                className="category-item"
                                              >
                                                <Link
                                                  href={{
                                                    pathname: "/products",
                                                    query: {
                                                      child_category:
                                                        subsubitem.slug,
                                                    },
                                                  }}
                                                  passHref
                                                  rel="noopener noreferrer"
                                                  legacyBehavior>

                                                  <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                                                    <div>
                                                      <span className="text-xs font-400">
                                                        {subsubitem.name}
                                                      </span>
                                                    </div>
                                                  </div>

                                                </Link>
                                              </li>
                                            )
                                          )}
                                      </ul>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="category-and-nav flex xl:rtl:space-x-reverse  rtl:space-x-reverse space-x-3 items-center">
              <div className="nav ml-10">
                <ul className="nav-wrapper flex xl:space-x-10 rtl:space-x-reverse space-x-5">
                  <li>
                    <Link href="/" passHref rel="noopener noreferrer" legacyBehavior>

                      <span className="flex items-center text-sm font-600 cursor-pointer text-[var(--text-color)] ">
                        <span className="capitalize">
                          {ServeLangItem()?.home}
                        </span>
                      </span>

                    </Link>
                  </li>
                  <li>
                    <Link href="/products" passHref rel="noopener noreferrer" legacyBehavior>

                      <span className="flex items-center text-sm font-600 cursor-pointer text-[var(--text-color)] ">
                        <span className="capitalize">
                          {ServeLangItem()?.products}
                        </span>
                      </span>

                    </Link>
                  </li>
                  {/* <li>
                    <span className="flex items-center text-sm font-600 cursor-pointer text-[var(--text-color)] ">
                      <span>{ServeLangItem()?.Shop}</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-full absolute left-0 top-[60px]">
                      <div
                        className="mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center "
                        style={{
                          minHeight: "295px",
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                          {mageMenuList &&
                            mageMenuList.slice(0, 3).map((megaItem) => (
                              <div key={megaItem.id}>
                                <div className="category">
                                  <h1 className="text-[13px] font-700 text-[var(--text-color)] uppercase mb-[13px]">
                                    {megaItem.category.name}
                                  </h1>
                                </div>
                                <div className="category-items">
                                  <ul className="flex flex-col space-y-2">
                                    {megaItem.sub_categories.length > 0 &&
                                      megaItem.sub_categories.map((subItem) => (
                                        <li key={subItem.id}>
                                          <Link
                                            href={{
                                              pathname: "/products",
                                              query: {
                                                sub_category:
                                                  subItem.sub_category &&
                                                  subItem.sub_category.slug,
                                              },
                                            }}
                                            passHref
                                          >
                                            <a rel="noopener noreferrer">
                                              <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:primary-text cursor-pointer">
                                                {subItem.sub_category &&
                                                  subItem.sub_category.name}
                                              </span>
                                            </a>
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                        </div>
                        {megaMenuBanner && (
                          <div
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL +
                                megaMenuBanner.image
                                })`,
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                            }}
                            className="thumbnil w-[348px] h-[235px] relative flex items-center ltr:pl-[40px] rtl:pr-[40px] group"
                          >
                            <div className="flex flex-col justify-between">
                              <div>
                                <div className=" mb-[10px]">
                                  <span className="text-[var(--text-color)] uppercase text-xs font-semibold">
                                    {megaMenuBanner.title_one}
                                  </span>
                                </div>
                                <div className="mb-[30px]">
                                  <h1 className="w-[160px] text-[24px] leading-[32px] text-[var(--text-color)] font-semibold">
                                    {megaMenuBanner.title_two}
                                  </h1>
                                </div>
                              </div>
                              <div className="w-[90px]">
                                <Link
                                  href={{
                                    pathname: "/products",
                                    query: {
                                      category: megaMenuBanner.product_slug,
                                    },
                                  }}
                                  passHref
                                >
                                  <a rel="noopener noreferrer">
                                    <div className="cursor-pointer w-full relative  ">
                                      <div className="inline-flex  rtl:space-x-reverse space-x-1.5 items-center relative z-20">
                                        <span className="text-sm text-[var(--text-color)] font-medium leading-[30px]">
                                          {ServeLangItem()?.Shop_Now}
                                        </span>
                                        <span className="leading-[30px]">
                                          <svg
                                            className={`transform rtl:rotate-180 fill-current`}
                                            width="7"
                                            height="11"
                                            viewBox="0 0 7 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <rect
                                              x="2.08984"
                                              y="0.636719"
                                              width="6.94219"
                                              height="1.54271"
                                              transform="rotate(45 2.08984 0.636719)"
                                            />
                                            <rect
                                              x="7"
                                              y="5.54492"
                                              width="6.94219"
                                              height="1.54271"
                                              transform="rotate(135 7 5.54492)"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                      <div className="w-[82px] transition-all duration-300 ease-in-out group-hover:h-4 h-[0px] primary-bg absolute left-0 bottom-0 z-10"></div>
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li> */}

                  <li>
                    <Link href="/blogs" passHref rel="noopener noreferrer" legacyBehavior>

                      <span className="flex items-center text-sm font-600 cursor-pointer text-[var(--text-color)] ">
                        <span className="capitalize">
                          {ServeLangItem()?.blogs}
                        </span>
                      </span>

                    </Link>
                  </li>
                  <li>
                    <Link href="/about" passHref rel="noopener noreferrer" legacyBehavior>

                      <span className="flex items-center text-sm font-600 cursor-pointer text-[var(--text-color)] ">
                        <span>{ServeLangItem()?.About}</span>
                      </span>

                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" passHref rel="noopener noreferrer" legacyBehavior>

                      <span className="flex items-center text-sm font-600 cursor-pointer text-[var(--text-color)] ">
                        <span>{ServeLangItem()?.Contact}</span>
                      </span>

                    </Link>
                  </li>
                  {/* <li className="relative">
                    <span className="flex items-center text-sm font-600 cursor-pointer text-[var(--text-color)] ">
                      <span>{ServeLangItem()?.Pages}</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <Link href="/privacy-policy" passHref>
                                    <a rel="noopener noreferrer">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:primary-text cursor-pointer">
                                        {ServeLangItem()?.Privacy_Policy}
                                      </span>
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/terms-condition" passHref>
                                    <a rel="noopener noreferrer">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:primary-text cursor-pointer">
                                        {ServeLangItem()?.Term_and_Conditions}
                                      </span>
                                    </a>
                                  </Link>
                                </li>
                                {Multivendor() === 1 && (
                                  <li>
                                    <Link
                                      href="seller-terms-condition"
                                      passHref
                                    >
                                      <a rel="noopener noreferrer">
                                        <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:primary-text cursor-pointer">
                                          {
                                            ServeLangItem()
                                              ?.Seller_terms_and_conditions
                                          }
                                        </span>
                                      </a>
                                    </Link>
                                  </li>
                                )}
                                <li>
                                  <Link href="/faq" passHref>
                                    <a rel="noopener noreferrer">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:primary-text cursor-pointer">
                                        {ServeLangItem()?.FAQ}
                                      </span>
                                    </a>
                                  </Link>
                                </li>
                                {customPages &&
                                  customPages.length > 0 &&
                                  customPages.map((item, i) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <React.Fragment key={i}>
                                      <li>
                                        <Link
                                          href={`/pages?custom=${item.slug}`}
                                          passHref
                                        >
                                          <a rel="noopener noreferrer">
                                            <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:primary-text cursor-pointer">
                                              {item.page_name}
                                            </span>
                                          </a>
                                        </Link>
                                      </li>
                                    </React.Fragment>
                                  ))}
                               
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
