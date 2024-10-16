import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import ServeLangItem from "../Helpers/ServeLangItem";
import ProductsTable from "./ProductsTable";
import auth from "../../../utils/auth";
import Image from "next/image";
import apiRequest from "../../../utils/apiRequest";
import { fetchWishlist } from "../../store/wishlistData";
import isAuth from "../../../Middleware/isAuth";




function Wishlist() {
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlists = wishlistData && wishlistData.wishlists;
  const clearList = () => {
    if (auth()) {
      apiRequest
        .clearWishlist({
          token: auth().access_token,
        })
        .then(() => {
          toast.success(ServeLangItem()?.Clear_wishlist);
          dispatch(fetchWishlist());
        });
    }
    return false;
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  return <>
    {wishlists && wishlists.data.length === 0 ? (
      <div className="wishlist-page-wrapper w-full">
        <div className="container-x mx-auto">
          <BreadcrumbCom
            paths={[
              { name: ServeLangItem()?.home, path: "/" },
              { name: ServeLangItem()?.Wishlist, path: "/wishlist" },
            ]}
          />
          <EmptyWishlistError />
        </div>
      </div>
    ) : (
      <div className="wishlist-page-wrapper w-full  pb-[60px]">
        {/* <div className="w-full">
          <PageTitle
            title="Wishlist"
            breadcrumb={[
              { name: ServeLangItem()?.home, path: "/" },
              { name: ServeLangItem()?.Wishlist, path: "/wishlist" },
            ]}
            isBecomeSeller={true}
          />
        </div> */}
        <div className="w-full mt-[20px]">
          <div
            className="relative w-full h-[400px] bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/images/themeTwo/bg_image.jpg')`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <div
                  className="text-white text-bold text-5xl"
                  style={{ fontFamily: "Jost" }}
                >
                  Wishlist
                </div>
                <nav className="  rounded text-white text-semibold text-lg">
                  {/* Your breadcrumb component here */}
                  <BreadcrumbCom
                    paths={[
                      { name: ServeLangItem()?.home, path: "/" },
                      { name: ServeLangItem()?.Wishlist, path: "/wishlist" },
                    ]}
                    isMyAccountBreadCrumps={true}
                  />
                </nav>
              </div>
            </div>
          </div>
          <div className="container-x mx-auto">
            <ProductsTable
              products={wishlists && wishlists}
              className="mb-[30px]"
            />
            {wishlists && wishlists.data.length > 0 && (
              <div className="w-full mt-[30px] flex sm:justify-end justify-start">
                <div className="sm:flex sm:space-x-[30px] rtl:space-x-reverse items-center">
                  <button onClick={() => clearList()} type="button">
                    <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                      {ServeLangItem()?.Clean_Wishlist}
                    </div>
                  </button>
                  <Link href="/cart" legacyBehavior>
                    <div className="w-[180px] h-[50px] cursor-pointer">
                      <div className="yellow-btn flex justify-center">
                        <span className="w-full text-sm font-semibold text-center text-[var(--secondary-color)]">
                          {ServeLangItem()?.View_Cards}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>;
}

export default isAuth(Wishlist);
