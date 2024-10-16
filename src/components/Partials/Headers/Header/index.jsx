import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import IcoLogout from "../../../Auth/Profile/icons/IcoLogout";
import Login from "../../../Helpers/icons/Login";
import { useRouter } from "next/router";
import auth from "../../../../../utils/auth";
import apiRequest from "../../../../../utils/apiRequest";
import { fetchWishlist } from "../../../../store/wishlistData";
import ServeLangItem from "../../../Helpers/ServeLangItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({ drawerAction, settings, contact }) {
  const { cart } = useSelector((state) => state.cart);
  const [cartItems, setCartItem] = useState(null);
  const location = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenu, setIsSubmenu] = useState(false);
  const logout = () => {
    if (auth) {
      apiRequest.logout(auth.access_token);
      localStorage.removeItem("auth");
      dispatch(fetchWishlist());
      location.push("/login");
    }
  };

  useEffect(() => {
    cart && setCartItem(cart.cartProducts);
  }, [cart]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsSubmenu(false);
  };

  const handleOnOpenSubmenu = () => {
    setIsSubmenu(!isSubmenu);
  };

  const RouterMapper = [
    "/become-seller",
    "/who-we-are",
    "/why-kalalay",
    "/why-are-we-different",
    "/buyer-benefits",
    "/cancellation-policy",
    "/intellectual-property",
    "/privacy-policy",
    "/return-refund-policy",
    "/terms-conditions",
    "/shipping-delivery-policy",
  ];
  const { asPath } = location;
  const isRouteInMapper = RouterMapper.includes(asPath);

  return (
    <header className="header-section-wrapper relative print:hidden">
      <div className="bg-[var(--primary-color)] w-full h-10 flex ">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={"fa-solid fa-truck"}
            className="w-5 h-5 text-[var(--secondary-color)] -scale-x-100 ml-20 my-2"
          />
          <p className="text-xs text-[var(--secondary-color)] ml-2">
            FREE SHIPPING ON ORDERS OVER{" "}
            <span className="text-[var(--text-color)]">$100</span>
          </p>
        </div>
      </div>

      <TopBar
        contact={contact && contact}
        className="quomodo-shop-top-bar"
        settings={settings && settings}
      />
      <Middlebar
        settings={settings && settings}
        className="quomodo-shop-middle-bar lg:block hidden"
      />
      {isRouteInMapper ? (
        <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
          <div className="w-full h-full flex justify-between items-center px-5">
            <div className="w-[200px] h-12 relative">
              <Link href="/" passHref legacyBehavior>

                {settings && (
                  <Image
                    layout="fill"
                    objectFit="scale-down"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                      }`}
                    alt="logo"
                  />
                )}

              </Link>
            </div>
            <div
              onClick={handleClick}
              className="flex flex-col justify-center items-center relative"
            >
              <span
                className={`bg-steel-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm border-2 border-black  ${isOpen ? "rotate-45 translate-y-2" : "-translate-y-0.5"
                  } `}
              ></span>
              <span
                className={`bg-steel-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 border-2 border-black ${isOpen ? "opacity-0" : "opacity-100"
                  }`}
              ></span>
              <span
                className={`bg-steel-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm border-2 border-black ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                  }`}
              ></span>
            </div>
            {isOpen && (
              <div className="absolute min-h-full h-auto bg-white w-screen left-0 top-20 z-10">
                <div className="flex pl-16 pr-10 pt-5 flex-col pb-10 gap-3">
                  <Link href="/" passHref rel="noopener noreferrer" legacyBehavior>

                    <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500">
                      Home
                    </span>

                  </Link>
                  <Link href="/who-we-are" passHref rel="noopener noreferrer" legacyBehavior>

                    <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500">
                      Who We Are
                    </span>

                  </Link>
                  <Link href="/why-kalalay" passHref rel="noopener noreferrer" legacyBehavior>

                    <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500">
                      Why Kalalay
                    </span>

                  </Link>
                  <Link
                    href="/why-are-we-different"
                    passHref
                    rel="noopener noreferrer"
                    legacyBehavior>

                    <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500">
                      We Are Different
                    </span>

                  </Link>
                  <Link href="/become-seller" passHref rel="noopener noreferrer" legacyBehavior>

                    <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500">
                      Artist Registration
                    </span>

                  </Link>
                  <div>
                    <span onClick={handleOnOpenSubmenu}>
                      <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500">
                        More
                      </span>
                    </span>
                    {isSubmenu && (
                      <span className="flex-col flex gap-2 bg-white w-40 p-5 shadow-2xl rounded-md mb-5">
                        <span>
                          <Link href="/buyer-benefits" passHref rel="noopener noreferrer" legacyBehavior>

                            <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500">
                              Buyer Benefits
                            </span>

                          </Link>
                        </span>
                        <span>
                          <Link href="#" passHref rel="noopener noreferrer" legacyBehavior>

                            <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500 ">
                              How We Work
                            </span>

                          </Link>
                        </span>
                      </span>
                    )}
                  </div>
                  <Link
                    href="/blogs"
                    passHref
                    rel="noopener noreferrer"
                    className="mb-5"
                    legacyBehavior>

                    <span className="text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer hover:text-orange-500 mb-5">
                      {ServeLangItem()?.blogs}
                    </span>

                  </Link>
                  <Link href="/store" passHref rel="noopener noreferrer" legacyBehavior>

                    <span className="mt-5 text-sm sm:text-base lg:text-base leading-6 text-gray-500 font-regular cursor-pointer border-2 border-gray-500 pt-2 pl-5 pr-5 pb-2 rounded-full">
                      Store
                    </span>

                  </Link>
                  <div className="mt-5 ">
                    {auth() ? (
                      <span
                        onClick={logout}
                        className="flex items-center gap-3 border border-[var(--primary-color)] rounded-xl p-2 w-28 cursor-pointer"
                      >
                        <IcoLogout
                          className={"fill-[var(--primary-color)]"}
                          pathClassName={"fill-[var(--primary-color)]"}
                        />
                        <span className="text-[14px] text-[var(--text-color)]">
                          Logout
                        </span>
                      </span>
                    ) : (
                      <div
                        onClick={() => location.push("/login")}
                        className="flex items-center gap-3 border border-[var(--primary-color)] rounded-xl p-2 w-28 cursor-pointer"
                      >
                        <Login
                          className={"fill-[var(--primary-color)]"}
                          pathClassName={"fill-[var(--primary-color)]"}
                        />
                        <span className="text-[14px] text-[var(--text-color)]">
                          Login
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
          <div className="w-full h-full flex justify-between items-center px-5">
            <div onClick={drawerAction}>
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <div className="w-[200px] h-12 relative">
              <Link href="/" passHref legacyBehavior>

                {settings && (
                  <Image
                    layout="fill"
                    objectFit="scale-down"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                      }`}
                    alt="logo"
                  />
                )}

              </Link>
            </div>
            <div className="flex items-center">
              <div className="cart relative cursor-pointer">
                <Link href="/cart" legacyBehavior>
                  <span>
                    <ThinBag
                      className={"fill-[var(--primary-color)]"}
                      pathClassName={"fill-[var(--primary-color)]"}
                    />
                  </span>
                </Link>
                <span className="w-[18px] h-[18px] rounded-full primary-bg absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                  {cartItems ? cartItems.length : 0}
                </span>
              </div>
              <div className="ml-8 lg:block hidden">
                {auth() ? (
                  <span
                    onClick={logout}
                    className="flex items-center gap-3 border border-[var(--primary-color)] rounded-xl p-2 w-28 cursor-pointer"
                  >
                    <IcoLogout
                      className={"fill-[var(--primary-color)]"}
                      pathClassName={"fill-[var(--primary-color)]"}
                    />
                    <span className="text-[14px] text-[var(--text-color)]">
                      Logout
                    </span>
                  </span>
                ) : (
                  <div
                    onClick={() => location.push("/login")}
                    className="flex items-center gap-3 border border-[var(--primary-color)] rounded-xl p-2 w-28 cursor-pointer"
                  >
                    <Login
                      className={"fill-[var(--primary-color)]"}
                      pathClassName={"fill-[var(--primary-color)]"}
                    />
                    <span className="text-[14px]  text-[var(--text-color)]">
                      Login
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Navbar className="quomodo-shop-nav-bar lg:block hidden" /> */}
    </header>
  );
}
