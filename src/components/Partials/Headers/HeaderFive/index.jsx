import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThinBag from "../../../Helpers/icons/ThinBag";
import MiddlebarFour from "../Header/MiddleBarFour";
import TopBarFive from "../Header/TopBarFive";
import ServeLangItem from "../../../Helpers/ServeLangItem";
import FontAwesomeCom from "../../../Helpers/icons/FontAwesomeCom";

export default function HeaderFive({
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex flex-wrap  font-serif justify-between px-10 py-2 text-[var(--text-color)]  bg-[var(--secondary-color)] border-b-2 border-[var(--secondary-color)] ">
        <div className="flex">
          <span className="">Free Shipping on every order</span>
          <span className="px-4 ">30 days return</span>
        </div>
        <div className="flex">
          <span>Need Help?</span>
          <span>
            Call us at <u className="font-medium">+91 972-442-4494</u> or{" "}
            <u>email</u> us.
          </span>
        </div>
      </div>

      <TopBarFive
        contact={contact && contact}
        className="quomodo-shop-top-bar"
        settings={settings && settings}
      />
      {/* <MiddlebarFour
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
            <Link href="/" passHref>
              <a>
                {settings && (
                  <Image
                    width="152"
                    height="36"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                    alt="logo"
                  />
                )}
              </a>
            </Link>
          </div>
          <div className="cart relative cursor-pointer">
            <Link href="/cart">
              <span>
                <ThinBag />
              </span>
            </Link>
            <span className="w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[var(--primary-color)]">
              {cartItems ? cartItems.length : 0}
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
