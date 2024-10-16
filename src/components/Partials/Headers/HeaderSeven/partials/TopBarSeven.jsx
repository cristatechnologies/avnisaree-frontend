import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { fetchWishlist } from "../../../../../store/wishlistData";
import LoginContext from "../../../../Contexts/LoginContext";


import ThinPeople from "../../../../Helpers/icons/ThinPeople";
import ServeLangItem from "../../../../Helpers/ServeLangItem";
import Cart from "../../../../Cart";
import apiRequest from "../../../../../../utils/apiRequest";
import ThinBag from "../../../../Helpers/icons/ThinBag";
import ThinLove from "../../../../Helpers/icons/ThinLove";
// import SearchBox from "../../../../Helpers/SearchBox";
// import Arrow from "../../../Helpers/icons/Arrow";
// import Compair from "../../../Helpers/icons/Compair";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Router from "next/router";

// import IcoLogout from "../../../Auth/Profile/icons/IcoLogout";

// import Login from "../../../Helpers/icons/Login";

export default function TopBarSeven({ className, contact, settings }) {
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
    <div
      className={`w-full   h-18 hidden lg:block font-['Jost'] ${
        className || ""
      }`}
    >
      <header className="flex !justify-evenly items-center h-12 py-4 text-xl ">
        {!isSearchActive && (
          <>
            <div className="flex-1 flex items-center justify-start h-[60px]  ">
              {settings && (
                <Link
                  href="/"
                  passHref
                  rel="noopener noreferrer"
                  legacyBehavior
                >
                  <Image
                    width="170"
                    height="65"
                    objectFit="scale-down"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <div className=" flex items-center  h-full space-x-6 text-sm font-normal ">
              <Link href="/" passHref legacyBehavior>
                <a className="text-black hover:text-gray-500 transition-colors duration-200">
                  HOME
                </a>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <a className="text-black hover:text-gray-500 transition-colors duration-200">
                  ABOUT US
                </a>
              </Link>
              <div className="relative group">
                <span className="text-black hover:text-gray-500 transition-colors duration-200 cursor-pointer flex items-center">
                  PRODUCTS
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="absolute left-0  w-48 bg-white shadow-lg hidden group-hover:block z-50">
                  {categoryList.map((category, index) => (
                    <Link
                      href={{
                        pathname: "/products",
                        query: {
                          category:
                          category.slug
                        },
                      }}
                      key={index}
                      passHref
                      legacyBehavior
                    >
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {category.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/contact" passHref legacyBehavior>
                <a className="text-black hover:text-gray-500 transition-colors duration-200">
                  CONTACT US
                </a>
              </Link>
            </div>
          </>
        )}
      

        <div className="flex-1 flex items-center justify-end h-full">
        
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
