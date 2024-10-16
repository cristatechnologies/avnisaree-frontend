import { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductCardRowStyleTwo from "../Helpers/Cards/ProductCardRowStyleTwo";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import ServeLangItem from "../Helpers/ServeLangItem";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
import ShopByCard from "../Themes/StoreThemeFive/ShopByCard";
import ProductCards from "../Themes/StoreThemeFive/PartialsThemeFive/ProductCards";

export default function AllProductPage({ response, sellerInfo }) {
  const [resProducts, setProducts] = useState(null);
  const [nxtPage, setNxtPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variantsFilter, setVariantsFilter] = useState(null);
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [brands, setBrands] = useState(null);
  const [cardViewStyle, setCardViewStyle] = useState("row");

  const location = useRouter();
  const { pathname } = location;
  const products =
    resProducts &&
    resProducts.length > 0 &&
    resProducts.map((item) => {
      return {
        id: item.id,
        title: item.name,
        slug: item.slug,
        image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
        price: item.price,
        offer_price: item.offer_price,
        campaingn_product: null,
        review: parseInt(item.averageRating),
        variants: item.active_variants ? item.active_variants : [],
      };
    });
  const [selectedVarientFilterItem, setSelectedVarientFilterItem] = useState(
    []
  );
  const [selectedCategoryFilterItem, setSelectedCategoryFilterItem] = useState(
    []
  );
  const [selectedBrandsFilterItem, setSelectedBrandsFilterItem] = useState([]);
  const [volume, setVolume] = useState({ min: 0, max: 0 });

  const volumeHandler = (value) => {
    setVolume({ min: value[0], max: value[1] });
  };
  const varientHandler = (e) => {
    const { name } = e.target;
    const filterVariant =
      variantsFilter &&
      variantsFilter.length > 0 &&
      variantsFilter.map((varient) => {
        return {
          ...varient,
          active_variant_items:
            varient.active_variant_items &&
            varient.active_variant_items.length > 0 &&
            varient.active_variant_items.map((variant_item) => {
              if (variant_item.name === name) {
                return {
                  ...variant_item,
                  selected: !variant_item.selected,
                };
              } else {
                return {
                  ...variant_item,
                };
              }
            }),
        };
      });
    setVariantsFilter(filterVariant);
    if (selectedVarientFilterItem.includes(name)) {
      const newArr = selectedVarientFilterItem.filter((like) => like !== name);
      setSelectedVarientFilterItem(newArr);
    } else {
      setSelectedVarientFilterItem((p) => [...p, name]);
    }
  };
  const categoryHandler = (e) => {
    const { name } = e.target;
    const filterCat =
      categoriesFilter &&
      categoriesFilter.length > 0 &&
      categoriesFilter.map((item) => {
        if (parseInt(item.id) === parseInt(name)) {
          return {
            ...item,
            selected: !item.selected,
          };
        } else {
          return {
            ...item,
          };
        }
      });
    setCategoriesFilter(filterCat);
    if (selectedCategoryFilterItem.includes(name)) {
      const newArr = selectedCategoryFilterItem.filter((like) => like !== name);
      setSelectedCategoryFilterItem(newArr);
    } else {
      setSelectedCategoryFilterItem((p) => [...p, name]);
    }
  };
  const brandsHandler = (e) => {
    const { name } = e.target;
    const filterBrands =
      brands &&
      brands.length > 0 &&
      brands.map((item) => {
        if (parseInt(item.id) === parseInt(name)) {
          return {
            ...item,
            selected: !item.selected,
          };
        } else {
          return {
            ...item,
          };
        }
      });
    setBrands(filterBrands);
    if (selectedBrandsFilterItem.includes(name)) {
      const newArr = selectedBrandsFilterItem.filter((like) => like !== name);
      setSelectedBrandsFilterItem(newArr);
    } else {
      setSelectedBrandsFilterItem((p) => [...p, name]);
    }
  };

  const [filterToggle, setToggle] = useState(false);

  useEffect(() => {
    setProducts(response.data && response.data.products.data);
    setNxtPage(response.data && response.data.products.next_page_url);
    setCategoriesFilter(
      response.data &&
        response.data.categories.length > 0 &&
        response.data.categories.map((item) => {
          return {
            ...item,
            selected: false,
          };
        })
    );
    setVariantsFilter(
      response.data &&
        response.data.activeVariants.length > 0 &&
        response.data.activeVariants.map((varient) => {
          return {
            ...varient,
            active_variant_items:
              varient.active_variant_items &&
              varient.active_variant_items.length > 0 &&
              varient.active_variant_items.map((variant_item) => {
                return {
                  ...variant_item,
                  selected: false,
                };
              }),
          };
        })
    );
    setBrands(
      response.data &&
        response.data.brands.length > 0 &&
        response.data.brands.map((item) => {
          return {
            ...item,
            selected: false,
          };
        })
    );
    setVolume({
      min:
        response.data &&
        response.data.products.data &&
        Math.min(
          ...response.data.products.data.map((item) => parseInt(item.price))
        ),
      max:
        response.data &&
        response.data.products.data &&
        Math.max(
          ...response.data.products.data.map((item) => parseInt(item.price))
        ),
    });
  }, [response.data]);
  useEffect(() => {
    if (response.data) {
      const min =
        response.data &&
        Math.min(
          ...response.data.products.data.map((item) => parseInt(item.price))
        );
      const max =
        response.data &&
        Math.max(
          ...response.data.products.data.map((item) => parseInt(item.price))
        );

      const check =
        selectedVarientFilterItem.length > 0 ||
        selectedCategoryFilterItem.length > 0 ||
        selectedBrandsFilterItem.length > 0 ||
        (volume.min && volume.min !== min) ||
        (volume.max && volume.max !== max);
      if (check) {
        const brandsQuery =
          selectedBrandsFilterItem.length > 0
            ? selectedBrandsFilterItem.map((value) => {
                return `brands[]=${value}`;
              })
            : [];
        const brandString =
          brandsQuery.length > 0
            ? brandsQuery.map((value) => value + "&").join("")
            : "";

        const categoryQuery =
          selectedCategoryFilterItem.length > 0
            ? selectedCategoryFilterItem.map((value) => {
                return `categories[]=${value}`;
              })
            : [];
        const categoryString =
          categoryQuery.length > 0
            ? categoryQuery.map((value) => value + "&").join("")
            : "";

        const variantQuery =
          selectedVarientFilterItem.length > 0
            ? selectedVarientFilterItem.map((value) => {
                return `variantItems[]=${value}`;
              })
            : [];
        const variantString =
          variantQuery.length > 0
            ? variantQuery.map((value) => value + "&").join("")
            : "";
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/search-product?${
              brandString && brandString
            }${categoryString && categoryString}${
              variantString && variantString
            }min_price=${volume.min}&max_price=${volume.max}${
              sellerInfo ? `&shop_name=${sellerInfo.seller.slug}` : ""
            }`
          )
          .then((res) => {
            res.data && res.data.products.data.length > 0
              ? setProducts(res.data.products.data)
              : setProducts(response.data.products.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setProducts(response.data.products.data);
      }
    } else {
      return;
    }
  }, [
    selectedVarientFilterItem,
    selectedCategoryFilterItem,
    selectedBrandsFilterItem,
    volume,
    response.data,
  ]);
  // const shopStatus = (startTime, endTime) => {
  //   const openTime = startTime;
  //   const closeTime = endTime;
  //   const getOpen = openTime.split(":");
  //   const getClose = closeTime.split(":");
  //   const opening = new Date();
  //   opening.setHours(getOpen[0], getOpen[1]);
  //   const getOpeningTime = opening.getTime();
  //   const closing = new Date();
  //   closing.setHours(getClose[0], getClose[1]);
  //   const getClosingTimg = closing.getTime();
  //   const currentTime = new Date().getTime();
  //   if (getOpeningTime < currentTime && getClosingTimg > currentTime) {
  //     return "Store Open";
  //   } else {
  //     return "Store Close";
  //   }
  // };
  const nextPageHandler = async () => {
    setLoading(true);
    if (nxtPage) {
      await axios
        .get(`${nxtPage}`)
        .then((res) => {
          setLoading(false);
          if (res.data) {
            if (res.data.products.data.length > 0) {
              res.data.products.data.map((item) => {
                setProducts((prev) => [...prev, item]);
              });
              setNxtPage(res.data.products.next_page_url);
            }
          }

          // res.data && res.data.products.data.length > 0;
          // setNxtPage(response.data && response.data.products.next_page_url);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (nxtPage === "null") {
      setLoading(false);
      return false;
    } else {
      setLoading(false);
      return false;
    }
  };

  return <>
    <Layout>
      <div className="products-page-wrapper w-full">
        <div className="container-x mx-auto">
          {/* <BreadcrumbCom /> */}
          <div
            className={`${
              products ? "lg:flex lg:space-x-[30px] rtl:space-x-reverse" : ""
            } w-full "`}
          >
            <div className="lg:w-[270px]">
              <ProductsFilter
                filterToggle={filterToggle}
                filterToggleHandler={() => setToggle(!filterToggle)}
                categories={categoriesFilter}
                brands={brands}
                varientHandler={varientHandler}
                categoryHandler={categoryHandler}
                brandsHandler={brandsHandler}
                volume={volume}
                products={products}
                priceMax={
                  response.data &&
                  Math.max(
                    ...response.data.products.data.map((item) =>
                      parseInt(item.price)
                    )
                  )
                }
                priceMin={
                  response.data &&
                  Math.min(
                    ...response.data.products.data.map((item) =>
                      parseInt(item.price)
                    )
                  )
                }
                volumeHandler={volumeHandler}
                className="mb-[30px]"
                variantsFilter={variantsFilter}
                searchProductFilter={pathname === "/search" ? true : false}
              />

              {/* {response.data && response.data.shopPageSidebarBanner && (
                <div
                  style={{
                    backgroundImage: `url(${
                      process.env.NEXT_PUBLIC_BASE_URL +
                      response.data.shopPageSidebarBanner.image
                    })`,
                    backgroundSize: `cover`,
                    backgroundRepeat: `no-repeat`,
                  }}
                  className="w-full hidden py-[35px] ltr:pl-[40px] rtl:pr-[40px] group lg:block h-[295px] relative"
                >
                  <div className="flex flex-col justify-between w-full h-full">
                    <div>
                      <div className="mb-[10px]">
                        <span className="text-[var(--text-color)] uppercase text-xs font-semibold">
                          {response.data.shopPageSidebarBanner.title_one}
                        </span>
                      </div>
                      <div className="mb-[30px]">
                        <h1 className="w-[162px] text-[24px] leading-[40px] text-[var(--text-color)] font-semibold">
                          {response.data.shopPageSidebarBanner.title_two}
                        </h1>
                      </div>
                    </div>
                    <div className="w-[90px]">
                      <Link
                        href={{
                          pathname: "/products",
                          query: {
                            category:
                              response.data.shopPageSidebarBanner
                                .product_slug,
                          },
                        }}
                        passhref
                      >
                        <a rel="noopener noreferrer">
                          <div className="cursor-pointer w-full relative">
                            <div className="inline-flex  space-x-1.5 rtl:space-x-reverse items-center relative z-20">
                              <span className="text-sm text-[var(--text-color)] font-medium leading-[30px]">
                                {ServeLangItem()?.Shop_Now}
                              </span>
                              <span className="leading-[30px]">
                                <svg
                                  className={`transform rtl:rotate-180`}
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
                                    fill="#1D1D1D"
                                  />
                                  <rect
                                    x="7"
                                    y="5.54492"
                                    width="6.94219"
                                    height="1.54271"
                                    transform="rotate(135 7 5.54492)"
                                    fill="#1D1D1D"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="w-[82px] transition-all duration-300 ease-in-out group-hover:h-4 h-[2px] primary-bg absolute ltr:left-0 rtl:right-0 bottom-0 z-10"></div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              )} */}
            </div>

            <div className="flex-1">
              {response.data && response.data.products.data.length > 0 ? (
                <div className="w-full">
                  <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center mb-[40px]">
                    <div className="flex items-center gap-3">
                      <Link href={"/"} legacyBehavior>
                        <button className="text-sm bg-[var(--primary-color)] text-white p-2 rounded-md">
                          Back to Home
                        </button>
                      </Link>
                      <p className="font-400 text-[13px]">
                        <span className="text-qgray">
                          {" "}
                          {ServeLangItem()?.Showing}
                        </span>{" "}
                        1–
                        {response.data.products.data.length}{" "}
                        {ServeLangItem()?.of} {response.data.products.total}{" "}
                        {ServeLangItem()?.results}
                      </p>
                    </div>
                    {/* <div className="flex space-x-3 items-center">
                      <span className="font-bold  text-[var(--text-color)] text-[13px]">
                        {ServeLangItem()?.View_by} :
                      </span>
                      <button
                        onClick={() => setCardViewStyle("col")}
                        type="button"
                        className={`hover:text-qgreen w-6 h-6 ${
                          cardViewStyle === "col"
                            ? "text-qgreen"
                            : "text-qgray"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-current"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M11 5H5v14h6V5zm2 0v14h6V5h-6zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCardViewStyle("row")}
                        type="button"
                        className={`hover:text-qgreen w-6 h-6 ${
                          cardViewStyle === "row"
                            ? "text-qgreen"
                            : "text-qgray"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-current"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M19 11V5H5v6h14zm0 2H5v6h14v-6zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                        </svg>
                      </button>
                    </div> */}
                    <button
                      onClick={() => setToggle(!filterToggle)}
                      type="button"
                      className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow primary-text"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* {products && cardViewStyle === "col" && (
                    <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                      <DataIteration
                        datas={products && products}
                        startLength={0}
                        endLength={
                          products && products.length >= 6
                            ? 6
                            : products && products.length
                        }
                      >
                        {({ datas }) => (
                          <div data-aos="fade-up" key={datas.id}>
                            <ProductCardStyleOne datas={datas} />
                          </div>
                        )}
                      </DataIteration>
                    </div>
                  )} */}
                  {/* {products && cardViewStyle === "row" && (
                    <div className="grid lg:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                      <DataIteration
                        datas={products && products}
                        startLength={0}
                        endLength={
                          products && products.length >= 6
                            ? 6
                            : products && products.length
                        }
                      >
                        {({ datas }) => (
                          <div data-aos="fade-up" key={datas.id}>
                            <ProductCardRowStyleTwo datas={datas} />
                          </div>
                        )}
                      </DataIteration>
                    </div>
                  )} */}

                  {/* <div className="w-full relative text-[var(--text-color)] mb-[40px]">
                    {response.data && response.data.shopPageCenterBanner && (
                      <OneColumnAdsTwo
                        data={response.data.shopPageCenterBanner}
                      />
                    )}
                  </div> */}
                  {products && cardViewStyle === "col" && (
                    <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                      <DataIteration
                        datas={products && products}
                        // startLength={6}
                        // endLength={
                        //   products && products.length >= 14
                        //     ? 14
                        //     : products && products.length
                        // }
                      >
                        {({ datas }) => (
                          <div data-aos="fade-up" key={datas.id}>
                            <ProductCardStyleOne datas={datas} />
                          </div>
                        )}
                      </DataIteration>
                    </div>
                  )}
                  {products && cardViewStyle === "row" && (
                    <div className="grid lg:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                      <DataIteration
                        datas={products && products}
                        // startLength={0}
                        // endLength={
                        //   products && products.length >= 8
                        //     ? 8
                        //     : products && products.length
                        // }
                      >
                        {({ datas }) => (
                          <div data-aos="fade-up" key={datas.id}>
                            <ProductCardRowStyleTwo datas={datas} />
                            {/* <ProductCards datas={datas} /> */}
                          </div>
                        )}
                      </DataIteration>
                    </div>
                  )}

                  {nxtPage && nxtPage !== "null" && (
                    <div className="flex justify-center">
                      <button
                        onClick={nextPageHandler}
                        type="button"
                        className="w-[180px] h-[54px] primary-bg rounded mt-10"
                      >
                        <div className="flex justify-center w-full h-full items-center group rounded relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                          <div className="flex items-center transition-all duration-300 ease-in-out relative z-10  text-white hover:text-white">
                            <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                              {ServeLangItem()?.Show_more}...
                            </span>
                            {loading && (
                              <span
                                className="w-5 "
                                style={{ transform: "scale(0.3)" }}
                              >
                                <LoaderStyleOne />
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              transition: `transform 0.25s ease-in-out`,
                            }}
                            className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                          ></div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className={"mt-5 flex justify-center"}>
                  <h1 className="text-2xl font-medium text-[var(--text-color)]">
                    Products not available
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>;
}
