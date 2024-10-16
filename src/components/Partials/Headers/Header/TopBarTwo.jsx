import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { fetchWishlist } from "../../../../store/wishlistData";
import LoginContext from "../../../Contexts/LoginContext";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import ServeLangItem from "../../../Helpers/ServeLangItem";
import Cart from "../../../Cart";
import apiRequest from "../../../../../utils/apiRequest";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import SearchBoxTwo from "../../../Helpers/SearchBoxTwo";
import Arrow from "../../../Helpers/icons/Arrow";
import Compair from "../../../Helpers/icons/Compair";
import SearchBox from "../../../Helpers/SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";

import IcoLogout from "../../../Auth/Profile/icons/IcoLogout";

import Login from "../../../Helpers/icons/Login";

export default function TopBarTwo({ className, contact, settings }) {
  const router = useRouter();
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  const getLoginContexts = useContext(LoginContext);
  const dispatch = useDispatch();
  const location = useRouter();
  const [auth, setAuth] = useState(null);
  const cartItem = useSelector(
    (state) => state.cart?.cart?.cartProducts?.length
  );
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const { compareProducts } = useSelector((state) => state.compareProducts);
  const wishlists = wishlistData && wishlistData.wishlists;
  const [profile, setProfile] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  useEffect(() => {
    if (getLoginContexts.loginPopup === false) {
      setAuth(() => JSON.parse(localStorage.getItem("auth")));
    }
  }, [getLoginContexts.loginPopup]);

  

  const profilehandler = () => {
    setProfile(!profile);
  };

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
    dispatch(fetchWishlist());
  }, []);

  const logout = () => {
    if (auth) {
      apiRequest.logout(auth.access_token);
      localStorage.removeItem("auth");
      dispatch(fetchWishlist());
      location.push("/login");
    }
  };

  const searchHandler = () => {
    if (searchKey !== "") {
      router.push({
        pathname: "/search",
        query: { search: searchKey },
      });
    } else {
      return false;
    }
  };

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission logic here
    console.log("Search for:", searchKey);
    // You can navigate to the search results page or perform other actions
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setSearchKey("");
  };

  return (
    <div className={`w-full   h-18 hidden lg:block  ${className || ""}`}>
      <header className="flex !justify-evenly items-center h-12 py-4 text-xl ">
        {!isSearchActive && (
          <>
            <div className="flex-1 flex items-center justify-start h-[60px]  ">
              <Link href="/" passHref rel="noopener noreferrer" legacyBehavior>
                {settings ? (
                  <Image
                    width="180"
                    height="75"
                    objectFit="scale-down"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                    alt="logo"
                  />
                ) : (
                  <span>Loading...</span> // or some other fallback content
                )}
              </Link>
            </div>
            <div className="flex-1 flex items-center justify-around h-full px-4  on ">
              <Link href="/" passHref rel="noopener noreferrer" legacyBehavior>
                <span className="hover:underline cursor-pointer text-black hover:text-[var(--primary-text-color)] ">
                  {ServeLangItem()?.home}
                </span>
              </Link>

              {/* */}
              <div className="relative parent">
                <a rel="noopener noreferrer">
                  <Link href="/products" passHref legacyBehavior>
                    <span className="flex justify-between md:inline-flex p-4 items-center  space-x-2 text-black hover:text-[var(--primary-text-color)]  cursor-pointer hover:underline translate transition duration-300">
                      <span>{ServeLangItem()?.Shop}</span>

                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-current pt-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                    </svg> */}
                    </span>
                  </Link>
                </a>
                {/* <div className="child absolute top-full left-0 w-full bg-white hidden group-hover:block">
                  {/* {categoryList.map((category, index) => (
                    <div className="relative group" key={index}>
                      <Link
                        href={{
                          pathname: "/products",
                          query: { category: category.slug },
                        }}
                        passHref
                      >
                        <a
                          rel="noopener no referrer"
                          className="border-t-2 border-[var(--primary-color)] flex px-4 py-3 hover:bg-gray-50 text-sm min-w-max"
                        >
                          {category.name}
                        </a>
                      </Link>
                      {category.children && category.children.length > 0 && (
                        <div className="absolute left-0 top-full w-full bg-white hidden group-hover:block">
                          {category.children.map((child, childIndex) => (
                            <Link
                              href={{
                                pathname: "/products",
                                query: { category: category.slug },
                              }}
                              passHref
                              key={childIndex}
                            >
                              <a
                                rel="noopener no referrer"
                                className="border-t-2 border-[var(--primary-color)] flex px-4 py-3 hover:bg-gray-50 text-sm min-w-max"
                              >
                                {child.name}
                              </a>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))} 
                </div> */}
              </div>
              {/* </Link> */}
              {/* 
          <Link href="/blogs" passHref>
            <a rel="noopener noreferrer">
              <span className="hover:underline cursor-pointer ">
                <span>{ServeLangItem()?.Blogs}</span>
              </span>
            </a>
          </Link> */}
              <Link
                href="/about"
                passHref
                rel="noopener noreferrer"
                legacyBehavior
              >
                <span className="hover:underline cursor-pointer text-black hover:text-[var(--primary-text-color)]  ">
                  <span>{ServeLangItem()?.About}</span>
                </span>
              </Link>

              <Link
                href="/contact"
                passHref
                rel="noopener noreferrer"
                legacyBehavior
              >
                <span className="hover:underline cursor-pointer text-black hover:text-[var(--primary-text-color)]  ">
                  <span>{ServeLangItem()?.Contact}</span>
                </span>
              </Link>
            </div>
          </>
        )}
        {isSearchActive && (
          <div className="flex-1 flex items-center justify-center">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <input
                type="text"
                value={searchKey}
                onKeyDown={(e) => e.key === "Enter" && searchHandler()}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder={ServeLangItem()?.Search_products + "..."}
                className="text-[var(--primary-color)] font-serif text-3xl w-full px-4 pl-12 py-2 bg-transparent outline-none focus:ring-0"
              />
            </form>
          </div>
        )}

        <div className="flex-1 flex items-center justify-end h-full">
          <div className="topbar-dropdowns lg:block hidden">
            <div className="flex ltr:space-x-6 rtl:-space-x-0 items-center">
              <div className="flex space-x-6 rtl:space-x-reverse items-center relative">
                {isSearchActive ? (
                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  <div className="favorite relative">
                    <span
                      className="cursor-pointer"
                      onClick={handleSearchClick}
                    >
                      <FontAwesomeIcon
                        icon="fas fa-search"
                        // style={{ color: "var(--primary-color)" }}
                      />
                    </span>
                  </div>
                )}
                <button onClick={profilehandler} type="button">
                  <span className="cursor-pointer">
                    <ThinPeople className={"w-6 h-6"} />
                  </span>
                </button>

                {profile && (
                  <>
                    <div
                      onClick={() => setProfile(false)}
                      className="w-full h-full fixed top-0 left-0 z-30"
                      style={{ zIndex: "35", margin: "0" }}
                    ></div>
                    <div
                      className="w-[208px] h-auto bg-white absolute right-0 top-11 z-40 border-t-[3px] primary-border flex flex-col justify-between"
                      style={{
                        boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                      }}
                    >
                      <div className="menu-item-area w-full  p-5">
                        <ul className="w-full  flex flex-col space-y-7">
                          {auth && (
                            <li className="text-base text-qgraytwo">
                              <span>
                                {ServeLangItem()?.Hi}, {auth && auth.user.name}{" "}
                              </span>
                            </li>
                          )}
                          <li className="text-base text-qgraytwo cursor-pointer hover:text-[var(--text-color)] hover:font-semibold">
                            <Link
                              href="/profile#dashboard"
                              passHref
                              rel="noopener noreferrer"
                              legacyBehavior
                            >
                              <span className="capitalize">
                                {ServeLangItem()?.profile}
                              </span>
                            </Link>
                          </li>
                          <li className="text-base text-qgraytwo cursor-pointer hover:text-[var(--text-color)] hover:font-semibold">
                            <Link
                              href="/tracking-order"
                              passHref
                              rel="noopener noreferrer"
                              legacyBehavior
                            >
                              <span className="capitalize">
                                {ServeLangItem()?.Track_Order}
                              </span>
                            </Link>
                          </li>
                          <li className="text-base text-qgraytwo cursor-pointer hover:text-[var(--text-color)] hover:font-semibold">
                            <Link
                              href="/contact"
                              passHref
                              rel="noopener noreferrer"
                              legacyBehavior
                            >
                              <span className="capitalize">
                                {ServeLangItem()?.Support}
                              </span>
                            </Link>
                          </li>
                          <li className="text-base text-qgraytwo cursor-pointer hover:text-[var(--text-color)] hover:font-semibold">
                            <Link
                              href="/faq"
                              passHref
                              rel="noopener noreferrer"
                              legacyBehavior
                            >
                              <span className="capitalize">
                                {ServeLangItem()?.FAQ}
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="w-full h-10 flex justify-center items-center border-t border-qgray-border">
                        <button
                          onClick={() => {
                            auth ? logout() : location.push("/login");
                          }}
                          type="button"
                          className="text-[var(--text-color)] text-base font-semibold"
                        >
                          {auth
                            ? ServeLangItem()?.Sign_Out
                            : ServeLangItem()?.Login}
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {/* <div className="favorite relative ">
                  {auth ? (
                    <Link href="/products-compaire" passHref>
                      <a rel="noopener noreferrer">
                        <span className="cursor-pointer">
                          <Compair className="fill-current" />
                        </span>
                      </a>
                    </Link>
                  ) : (
                    <Link href="/login" passHref>
                      <a rel="noopener noreferrer">
                        <span className="cursor-pointer">
                          <Compair className="fill-current" />
                        </span>
                      </a>
                    </Link>
                  )}

                  <span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[var(--primary-color)] text-[var(--secondary-color)]">
                    {compareProducts ? compareProducts.products.length : 0}
                  </span>
                </div> */}
                <div className="favorite relative ">
                  <Link
                    href="/wishlist"
                    passHref
                    rel="noopener noreferrer"
                    legacyBehavior
                  >
                    <span className="cursor-pointer ">
                      <ThinLove className="fill-current font-bold  w-6 h-6" />
                    </span>
                  </Link>
                  <span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[var(--primary-color)] text-[var(--secondary-color)]">
                    {wishlists ? wishlists.data.length : 0}
                  </span>
                </div>
                <div className="cart-wrapper group relative py-4">
                  <div className="cart relative cursor-pointer">
                    <Link
                      href="/cart"
                      passHref
                      rel="noopener noreferrer"
                      legacyBehavior
                    >
                      <span className="cursor-pointer">
                        <ThinBag
                          pathClassName={"fill-black"}
                          className={"fill-black w-6 h-6"}
                        />
                      </span>
                    </Link>
                    <span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]  bg-[var(--primary-color)] text-[var(--secondary-color)]">
                      {cartItem ? cartItem : 0}
                    </span>
                  </div>

                  <Cart className="absolute text-white ltr:-right-[45px] rtl:-left-[45px] top-11 z-50 hidden group-hover:block" />
                </div>
              </div>
              <div className="flex ltr:space-x-2 rtl:space-x-0 items-center ">
                {/* cart and heart */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
{
  /* <div className="topbar-nav">
                                <ul className="flex space-x-6 items-center w-full">
                                    <li className="rtl:ml-6 ltr:ml-0">
                                        <div className="w-[470px]">
                                            <SearchBoxTwo className="search-com" />
                                        </div>
                                    </li>
                                </ul>
                            </div> */
}

{
  /* <div className="topbar-dropdowns lg:block hidden">
            <div className="flex ltr:space-x-6 rtl:-space-x-0 items-center">
              <div className="flex space-x-6 rtl:space-x-reverse items-center relative">
                <div className="favorite relative ">
                  {auth ? (
                    <Link href="/products-compaire" passHref>
                      <a rel="noopener noreferrer">
                        <span className="cursor-pointer">
                          <Compair className="fill-current" />
                        </span>
                      </a>
                    </Link>
                  ) : (
                    <Link href="/login" passHref>
                      <a rel="noopener noreferrer">
                        <span className="cursor-pointer">
                          <Compair className="fill-current" />
                        </span>
                      </a>
                    </Link>
                  )}

                  <span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[var(--primary-color)] text-[var(--secondary-color)]">
                    {compareProducts ? compareProducts.products.length : 0}
                  </span>
                </div>
                <div className="favorite relative ">
                  <Link href="/wishlist" passHref>
                    <a rel="noopener noreferrer">
                      <span className="cursor-pointer ">
                        <ThinLove className="fill-current font-bold  w-6 h-6" />
                      </span>
                    </a>
                  </Link>
                  <span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[var(--primary-color)] text-[var(--secondary-color)]">
                    {wishlists ? wishlists.data.length : 0}
                  </span>
                </div>
                <div className="cart-wrapper group relative py-4">
                  <div className="cart relative cursor-pointer">
                    <Link href="/cart" passHref>
                      <a rel="noopener noreferrer">
                        <span className="cursor-pointer">
                          <ThinBag
                            pathClassName={"fill-black"}
                            className={"fill-black w-6 h-6"}
                          />
                        </span>
                      </a>
                    </Link>
                    <span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]  bg-[var(--primary-color)] text-[var(--secondary-color)]">
                      {cartItem ? cartItem : 0}
                    </span>
                  </div>

                  <Cart className="absolute text-white ltr:-right-[45px] rtl:-left-[45px] top-11 z-50 hidden group-hover:block" />
                </div>

                <button onClick={profilehandler} type="button">
                  <span className="cursor-pointer">
                    <ThinPeople className={"w-6 h-6"} />
                  </span>
                </button>

                {profile && (
                  <>
                    <div
                      onClick={() => setProfile(false)}
                      className="w-full h-full fixed top-0 left-0 z-30"
                      style={{ zIndex: "35", margin: "0" }}
                    ></div>
                    <div
                      className="w-[208px] h-auto bg-white absolute right-0 top-11 z-40 border-t-[3px] primary-border flex flex-col justify-between"
                      style={{
                        boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                      }}
                    >
                      <div className="menu-item-area w-full  p-5">
                        <ul className="w-full  flex flex-col space-y-7">
                          {auth && (
                            <li className="text-base text-qgraytwo">
                              <span>
                                {ServeLangItem()?.Hi}, {auth && auth.user.name}{" "}
                              </span>
                            </li>
                          )}
                          <li className="text-base text-qgraytwo cursor-pointer hover:text-[var(--text-color)] hover:font-semibold">
                            <Link href="/profile#dashboard" passHref>
                              <a rel="noopener noreferrer">
                                <span className="capitalize">
                                  {ServeLangItem()?.profile}
                                </span>
                              </a>
                            </Link>
                          </li>
                          <li className="text-base text-qgraytwo cursor-pointer hover:text-[var(--text-color)] hover:font-semibold">
                            <Link href="/tracking-order" passHref>
                              <a rel="noopener noreferrer">
                                <span className="capitalize">
                                  {ServeLangItem()?.Track_Order}
                                </span>
                              </a>
                            </Link>
                          </li>
                          <li className="text-base text-qgraytwo cursor-pointer hover:text-[var(--text-color)] hover:font-semibold">
                            <Link href="/contact" passHref>
                              <a rel="noopener noreferrer">
                                <span className="capitalize">
                                  {ServeLangItem()?.Support}
                                </span>
                              </a>
                            </Link>
                          </li>
                          <li className="text-base text-qgraytwo cursor-pointer hover:text-[var(--text-color)] hover:font-semibold">
                            <Link href="/faq" passHref>
                              <a rel="noopener noreferrer">
                                <span className="capitalize">
                                  {ServeLangItem()?.FAQ}
                                </span>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="w-full h-10 flex justify-center items-center border-t border-qgray-border">
                        <button
                          onClick={() => {
                            auth ? logout() : location.push("/login");
                          }}
                          type="button"
                          className="text-[var(--text-color)] text-base font-semibold"
                        >
                          {auth
                            ? ServeLangItem()?.Sign_Out
                            : ServeLangItem()?.Login}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex ltr:space-x-2 rtl:space-x-0 items-center ">
                {/* cart and heart */
}
{
  /* </div>
            </div>
          </div>
        </div>
      </div> */
}
