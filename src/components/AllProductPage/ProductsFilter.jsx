import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Checkbox from "../Helpers/Checkbox";
import ServeLangItem from "../Helpers/ServeLangItem";
import Link from "next/link";
import FontAwesomeCom from "../Helpers/icons/FontAwesomeCom";
import { useSelector } from "react-redux";
export default function ProductsFilter({
  categories,
  categoryHandler,
  varientHandler,
  brandsHandler,
  volume,
  volumeHandler,
  className,
  filterToggle,
  filterToggleHandler,
  variantsFilter,
  priceMin,
  priceMax,
  brands,
  products,
  searchProductFilter,
}) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  return (
    <>
      {searchProductFilter || filterToggle ? (
        <div
          className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] shadow-lg max-h-[600px]  overflow-auto ${
            className || ""
          }  ${filterToggle ? "block" : "hidden lg:block"}`}
        >
          <div className="filter-subject-item pb-10 border-b border-qgray-border ">
            <div className="subject-title mb-[30px]">
              <h1 className="text-black text-base font-500">
                {ServeLangItem()?.Product_categories}
              </h1>
            </div>
            <div className="filter-items">
              <ul>
                {categories &&
                  categories.length > 0 &&
                  categories.map((item, i) => (
                    <li key={i} className="item mb-5">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-[14px] rtl:space-x-reverse items-center">
                          <div>
                            <Checkbox
                              id={item.slug}
                              name={item.id}
                              handleChange={(e) => categoryHandler(e)}
                              checked={item.selected}
                            />
                          </div>
                          <label
                            htmlFor={item.slug}
                            className="text-xs font-black font-400 capitalize"
                          >
                            {item.name}
                          </label>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {products && (
            <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
              <div className="subject-title mb-[30px]">
                <h1 className="text-black text-base font-500">
                  {ServeLangItem()?.Price_Range}
                </h1>
              </div>
              {volume && (
                <>
                  <div className="price-range mb-5">
                    <Slider
                      range
                      allowCross={false}
                      min={priceMin}
                      max={priceMax}
                      defaultValue={[priceMin, priceMax]}
                      value={[volume.min, volume.max]}
                      onChange={volumeHandler}
                    />
                  </div>
                  <p className="text-xs text-[var(--text-color)] font-400">
                    {ServeLangItem()?.Price}: ₹{volume.min} - ₹{volume.max}
                  </p>
                </>
              )}
            </div>
          )}
          {/* <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
            <div className="subject-title mb-[30px]">
              <h1 className="text-black text-base font-500">
                {ServeLangItem()?.Brands}
              </h1>
            </div>
            <div className="filter-items">
              <ul>
                {brands &&
                  brands.length > 0 &&
                  brands.map((brand, i) => (
                    <li
                      key={i}
                      className="item flex justify-between items-center mb-5"
                    >
                      <div className="flex space-x-[14px] rtl:space-x-reverse items-center">
                        <div>
                          <Checkbox
                            id={brand.name}
                            name={brand.id}
                            handleChange={(e) => brandsHandler(e)}
                            checked={brand.selected}
                          />
                        </div>
                        <label
                          htmlFor={brand.name}
                          className="text-xs font-black font-400 capitalize"
                        >
                          {brand.name}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div> */}
          {variantsFilter &&
            variantsFilter.length &&
            variantsFilter.map((variant, i) => (
              <div
                key={i}
                className="filter-subject-item pb-10 border-b border-qgray-border mt-10"
              >
                <div className="subject-title mb-[30px]">
                  <h1 className="text-black text-base font-500">
                    {variant.name}
                  </h1>
                </div>
                <div className="filter-items">
                  <ul>
                    {variant &&
                      variant.active_variant_items.length > 0 &&
                      variant.active_variant_items.map((varientItem, i) => (
                        <li
                          key={i}
                          className="item flex justify-between items-center mb-5"
                        >
                          <div className="flex space-x-[14px] rtl:space-x-reverse items-center">
                            <div>
                              <Checkbox
                                id={varientItem.name}
                                name={varientItem.name}
                                handleChange={(e) => varientHandler(e)}
                                checked={varientItem.selected}
                              />
                            </div>
                            <label
                              htmlFor={varientItem.name}
                              className="text-xs font-black font-400 capitalize"
                            >
                              {varientItem.name}
                            </label>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}

          <button
            onClick={filterToggleHandler}
            type="button"
            className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className={`${
            products ? "border border-black-800" : ""
          } h-auto w-[280px]  relative hidden lg:block bg-white mt-28 sm:hidden`}
        >
          {/* <div className="hidden h-[41px] px-5 rounded-[5px] bg-[var(--primary-color)] lg:block sm:block">
            <button
              type="button"
              className="w-full h-full flex justify-between items-center cursor-default"
            >
              <div className="flex rtl:space-x-reverse space-x-3 items-center">
                <span>
                  <svg
                    width="14"
                    height="9"
                    color="#ffff"
                    viewBox="0 0 14 9"
                    className="fill-current text-[var(--secondary-color)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="14" height="1" />
                    <rect y="8" width="14" height="1" />
                    <rect y="4" width="10" height="1" />
                  </svg>
                </span>
                <span className="text-sm font-600 text-white">
                  {ServeLangItem()?.All_Categories}
                </span>
              </div>
            </button>
          </div> */}
          {/* <ul className="all-categories-item bg-white">
            {categoryList &&
              categoryList.map((item) => (
                <li
                  className="hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white group/parent"
                  key={item.id}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { category: item.slug },
                    }}
                    passHref
                  >
                    <a rel="noopener noreferrer">
                      <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                        <div className="flex items-center rtl:space-x-reverse space-x-6">
                          <span>
                            <FontAwesomeCom
                              className="w-4 h-4"
                              icon={item.icon}
                            />
                          </span>
                          <span className="text-xs font-400">{item.name}</span>
                        </div>
                        {item.active_sub_categories.length > 0 && (
                          <div>
                            <span>
                              <svg
                                className={`transform rtl:rotate-180 fill-current`}
                                width="6"
                                height="9"
                                viewBox="0 0 6 9"
                                fill="text-[var(--text-color)]"
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
                        )}
                      </div>
                    </a>
                  </Link>

                  {item.active_sub_categories.length > 0 && (
                    <ul className="hidden group-hover/parent:block border border-black-800 z-10 absolute ltr:left-[260px] lg:ltr:left-[260px] sm:ltr:left-[200px] w-[270px] bg-slate-100 top-0 h-[612px] overflow-auto">
                      {item.active_sub_categories.map((subItems) => (
                        <li
                          key={subItems.id}
                          className="group/child text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white"
                        >
                          <Link
                            href={{
                              pathname: "/products",
                              query: { category: item.slug },
                            }}
                            passHref
                          >
                            <a rel="noopener noreferrer">
                              <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                                <div className="flex items-center rtl:space-x-reverse space-x-6">
                                  <span className="text-xs font-400">
                                    {subItems.name}
                                  </span>
                                </div>
                                {subItems.active_child_categories.length >
                                  0 && (
                                  <div>
                                    <span>
                                      <svg
                                        className={`transform rtl:rotate-180 fill-current`}
                                        width="6"
                                        height="9"
                                        viewBox="0 0 6 9"
                                        fill="text-[var(--text-color)]"
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
                                )}
                              </div>
                            </a>
                          </Link>
                          {subItems.active_child_categories.length > 0 && (
                            <ul className="hidden group-hover/child:block border border-black-800 z-10 absolute ltr:left-[270px] lg:ltr:left-[270px] sm:ltr:left-[255px] w-[270px] bg-slate-100 top-0 h-[576px]">
                              {subItems.active_child_categories.map(
                                (subItemChild) => (
                                  <li
                                    key={subItemChild.id}
                                    className="hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white"
                                  >
                                    <Link
                                      href={{
                                        pathname: "/products",
                                        query: { category: item.slug },
                                      }}
                                      passHref
                                    >
                                      <a rel="noopener noreferrer">
                                        <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                                          <div className="flex items-center rtl:space-x-reverse space-x-6">
                                            <span className="text-xs font-400">
                                              {subItemChild.name}
                                            </span>
                                          </div>
                                        </div>
                                      </a>
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul> */}
          {products && (
            <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10 p-5">
              <div className="subject-title mb-[30px]">
                <h1 className="text-[var(--text-color)] text-base font-500">
                  {ServeLangItem()?.Price_Range}
                </h1>
              </div>
              {volume && (
                <>
                  <div className="price-range mb-5">
                    <Slider
                      range
                      allowCross={false}
                      min={priceMin}
                      max={priceMax}
                      defaultValue={[priceMin, priceMax]}
                      value={[volume.min, volume.max]}
                      onChange={volumeHandler}
                    />
                  </div>
                  <p className="text-xs text-[var(--text-color)] font-400">
                    {ServeLangItem()?.Price}: ₹{volume.min} - ₹{volume.max}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
