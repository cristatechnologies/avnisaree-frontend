import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThinBag from "../../../Helpers/icons/ThinBag";

import TopBarSeven from "./partials/TopBarSeven";
import ServeLangItem from "../../../Helpers/ServeLangItem";

export default function HeaderSeven({ className, drawerAction, settings, contact }) {
  const { cart } = useSelector((state) => state.cart);
  const [cartItems, setCartItem] = useState(null);
  useEffect(() => {
    cart && setCartItem(cart.cartProducts);
  }, [cart]);

const theme  = settings?.selected_theme

  return (
    <>
      {theme != "theme7" ? (
        <header
          className={` ${
            className || ""
          } header-section-wrapper h-[80px] flex items-center fixed top-0 left-0 right-0 z-50 bg-white `}
        >
          {/* <div className="mt-5 border-b border-b-gray-200">
        <div className="container-x lg:!pl-0 h-full mx-auto pb-3">
          <Link href="/profile#dashboard" passHref>
            <a rel="noopener noreferrer">
              <span className="text-xs leading-6 text-[var(--text-color)] font-500 cursor-pointer capitalize">
                {ServeLangItem()?.Account}
              </span>
            </a>
          </Link>
          <Link href="/tracking-order" passHref>
            <a rel="noopener noreferrer">
              <span className="text-xs leading-6 text-[var(--text-color)] font-500 cursor-pointer capitalize ml-5">
                {ServeLangItem()?.Track_Order}
              </span>
            </a>
          </Link>
          <Link href="/faq" passHref>
            <a rel="noopener noreferrer">
              <span className="text-xs leading-6 text-[var(--text-color)] font-500 cursor-pointer capitalize ml-5">
                {ServeLangItem()?.Support}
              </span>
            </a>
          </Link>
        </div>
      </div> */}
          <TopBarSeven
            contact={contact && contact}
            className="quomodo-shop-top-bar"
            settings={settings && settings}
          />
          {/* <MiddlebarTwo
        settings={settings && settings}
        className="quomodo-shop-middle-bar lg:block hidden"
      /> */}
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
              <div>
                {settings && (
                  <Link href="/" passHref legacyBehavior>
                    <Image
                      width="152"
                      height="36"
                      src={`${
                        process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                      }`}
                      alt="logo"
                    />
                  </Link>
                )}
              </div>
              <div className="cart relative cursor-pointer">
                <Link href="/cart" legacyBehavior>
                  <span>
                    <ThinBag />
                  </span>
                </Link>
                <span className="w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[var(--primary-color)]">
                  {cartItems ? cartItems.length : 0}
                </span>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <>
          {" "}
          <header
            className={` ${
              className || ""
            } header-section-wrapper h-[80px] flex items-center fixed top-0 left-0 right-0 z-50 bg-white `}
          >
            {/* <div className="mt-5 border-b border-b-gray-200">
        <div className="container-x lg:!pl-0 h-full mx-auto pb-3">
          <Link href="/profile#dashboard" passHref>
            <a rel="noopener noreferrer">
              <span className="text-xs leading-6 text-[var(--text-color)] font-500 cursor-pointer capitalize">
                {ServeLangItem()?.Account}
              </span>
            </a>
          </Link>
          <Link href="/tracking-order" passHref>
            <a rel="noopener noreferrer">
              <span className="text-xs leading-6 text-[var(--text-color)] font-500 cursor-pointer capitalize ml-5">
                {ServeLangItem()?.Track_Order}
              </span>
            </a>
          </Link>
          <Link href="/faq" passHref>
            <a rel="noopener noreferrer">
              <span className="text-xs leading-6 text-[var(--text-color)] font-500 cursor-pointer capitalize ml-5">
                {ServeLangItem()?.Support}
              </span>
            </a>
          </Link>
        </div>
      </div> */}
            <TopBarSeven
              contact={contact && contact}
              className="quomodo-shop-top-bar"
              settings={settings && settings}
            />
            {/* <MiddlebarTwo
        settings={settings && settings}
        className="quomodo-shop-middle-bar lg:block hidden"
      /> */}
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
                <div>
                  {settings && (
                    <Link href="/" passHref legacyBehavior>
                      <Image
                        width="152"
                        height="36"
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                        }`}
                        alt="logo"
                      />
                    </Link>
                  )}
                </div>
                <div className="cart relative cursor-pointer">
                  <Link href="" legacyBehavior>
                    <span>
                      {/* <ThinBag /> */}
                    </span>
                  </Link>
                  {/* <span className="w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[var(--primary-color)]">
                    {cartItems ? cartItems.length : 0}
                  </span> */}
                </div>
              </div>
            </div>
          </header>{" "}
        </>
      )}
    </>
  );
}                   
