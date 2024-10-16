import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThinBag from "../../../Helpers/icons/ThinBag";
import MiddlebarFour from "../Header/MiddleBarFour";
import TopBarFour from "../Header/TopBarFour";
import ServeLangItem from "../../../Helpers/ServeLangItem";
import FontAwesomeCom from "../../../Helpers/icons/FontAwesomeCom";

export default function HeaderFour({
  className,
  drawerAction,
  settings,
  contact,
}) {
  const { cart } = useSelector((state) => state.cart);
  const [cartItems, setCartItem] = useState(null);

  useEffect(() => {
    cart && setCartItem(cart.cartProducts);
  }, [cart]);

  return (
    <header className={` ${className || ""} header-section-wrapper relative `}>
      <div className="border-b border-b-gray-200 bg-[var(--primary-color)] ">
        <div className="container-x lg:!pl-0 h-full mx-auto p-3">
          <Link
            href="tel:+380961381876"
            passHref
            rel="noopener noreferrer"
            legacyBehavior>

            <span className="text-sm leading-6 text-white font-500 cursor-pointer capitalize">
              <FontAwesomeCom
                icon={"fa fa-phone"}
                className={"w-4 h-4 text-white mr-2"}
              />
              +380961381876
            </span>

          </Link>
          <span className="text-sm leading-6 !text-white font-500 capitalize ml-20">
            TAKE CARE OF YOUR Health{" "}
            <span className="text-[var(--secondary-color)]">25% OFF</span>
            &nbsp; USE CODE “ DOFIX03 ”
          </span>
        </div>
      </div>
      <TopBarFour
        contact={contact && contact}
        className="quomodo-shop-top-bar"
        settings={settings && settings}
      />
      <MiddlebarFour
        settings={settings && settings}
        className="quomodo-shop-middle-bar lg:block hidden"
      />
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
            <Link href="/" passHref legacyBehavior>

              {settings && (
                <Image
                  width="152"
                  height="36"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                  alt="logo"
                />
              )}

            </Link>
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
  );
}
