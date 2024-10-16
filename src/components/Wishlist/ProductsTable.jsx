import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import apiRequest from "../../../utils/apiRequest";
import auth from "../../../utils/auth";
import settings from "../../../utils/settings";
import { fetchWishlist } from "../../store/wishlistData";
import CheckProductIsExistsInFlashSale from "../Shared/CheckProductIsExistsInFlashSale";
import ServeLangItem from "../Helpers/ServeLangItem";
import { useRouter } from "next/router";



const Redirect = () => {
  return (
    <div className="flex space-x-2 items-center">
      <span className="text-sm text-gray-500">
        {ServeLangItem()?.Item_added}
      </span>
      <Link href="/cart" legacyBehavior>
        <span className="text-xs border-b border-blue-600 text-blue-600 mr-2 cursor-pointer">
          {ServeLangItem()?.Go_To_Cart}
        </span>
      </Link>
    </div>
  );
};




export default function ProductsTable({ className, products, product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mainProduct, setMainProducts] = useState(null);
  // const calcTotalPrice = (id, qyt) => {
  //   setMainProducts(
  //     mainProduct &&
  //       mainProduct.map((obj) => {
  //         if (obj.product.id === id) {
  //           return {
  //             ...obj,
  //             totalPrice: obj.product.price * qyt,
  //           };
  //         }
  //         return obj;
  //       })
  //   );
  // };
  const addToCard = () => {
    const data = {
      id: product.id,
      token: auth() && auth().access_token,
      quantity: quantity,
      variants:
        getFirstVarients &&
        getFirstVarients.map((v) => parseInt(v.product_variant_id)),
      variantItems: getFirstVarients && getFirstVarients.map((v) => v.id),
    };
    if (auth()) {
      if (varients) {
        const variantQuery = data.variants.map((value, index) => {
          return `variants[]=${value}`;
        });
        const variantString = variantQuery.map((value) => value + "&").join("");

        const itemsQuery = data.variantItems.map((value, index) => {
          return `items[]=${value}`;
        });
        const itemQueryStr = itemsQuery.map((value) => value + "&").join("");
        const uri = `token=${data.token}&product_id=${data.id}&${variantString}${itemQueryStr}quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) =>
            toast.success(<Redirect />, {
              autoClose: 5000,
            })
          )
          .catch((err) => console.log(err));
        dispatch(fetchCart());
      } else {
        const uri = `token=${data.token}&product_id=${data.id}&quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) => {
            toast.success(<Redirect />, {
              autoClose: 5000,
            });
            toast.error(
              res.response &&
                res.response.data.message &&
                res.response.data.message
            );
          })
          .catch((err) => {
            console.log(err);
            toast.error(
              err.response &&
                err.response.data.message &&
                err.response.data.message
            );
          });
        dispatch(fetchCart());
      }
    } else {
      localStorage.setItem(
        "data-hold",
        JSON.stringify({ type: "add-to-cart", ...data })
      );
      loginPopupBoard.handlerPopup(true);
    }
  };

  const price = (item) => {
    if (item) {
      if (item.product.offer_price) {
        if (
          item.product.active_variants &&
          item.product.active_variants.length > 0
        ) {
          const prices = item.product.active_variants.map((item) =>
            item
              ? parseInt(
                  item.active_variant_items.length > 0
                    ? item.active_variant_items[0].price
                    : 0
                )
              : 0
          );
          const sumVarient = prices.reduce((p, c) => p + c);
          return parseInt(item.product.offer_price) + sumVarient;
        } else {
          return parseInt(item.product.offer_price);
        }
      } else {
        if (
          item.product.active_variants &&
          item.product.active_variants.length > 0
        ) {
          const prices = item.product.active_variants.map((item) =>
            item
              ? parseInt(
                  item.active_variant_items.length > 0
                    ? item.active_variant_items[0].price
                    : 0
                )
              : 0
          );
          const sumVarient = prices.reduce((p, c) => p + c);
          return parseInt(item.product.price) + sumVarient;
        } else {
          return item.product.price;
        }
      }
    }
  };
  useEffect(() => {
    if (products) {
      setMainProducts(
        products &&
          products.data.map((item) => {
            return {
              ...item,
              totalPrice: item.product.price,
            };
          })
      );
    } else {
      setMainProducts(null);
    }
  }, [products]);

  const removeToWishlist = (id) => {
    if (auth()) {
      apiRequest
        .removeToWishlist({ id: id, token: auth().access_token })
        .then((res) => {
          if (res) {
            dispatch(fetchWishlist());
          }
        })
        .catch((error) => console.error(error));
      1;
    } else {
      router.push("/login");
    }
  };
  const { currency_icon } = settings();
  return (
    <div className={`w-full ${className || ""}`}>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right tracking-[.2em]">
            {/* table heading */}
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-2 w-[400px]">
                {ServeLangItem()?.Product}
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900  border-2">
                {ServeLangItem()?.Price}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900  border-2">
                {ServeLangItem()?.Action}
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900  border-2"></th>
            </tr>
          </thead>
          {/*table heading end*/}
          <tbody className="divide-y divide-gray-200">
            {mainProduct &&
              mainProduct.map((item) => (
                <tr key={item.id} className=" text-center align-middle">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <div className="flex space-x-4 rtl:space-x-reverse items-center">
                      <div className="w-[60px] h-[60px] overflow-hidden flex justify-center items-center border border-[#EDEDED] relative">
                        <Image
                          layout="fill"
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL +
                            item.product.thumb_image
                          }`}
                          alt="product"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 flex flex-col max-w-[200px]">
                        <Link
                          href={{
                            pathname: "/single-product",
                            query: { slug: item.product.slug },
                          }}
                          legacyBehavior>
                          <p className="font-medium text-[15px] text-[var(--text-color)] hover:text-blue-500 cursor-pointer truncate">
                            {item.product.name}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-2 py-2 text-gray-700">
                    <span
                      suppressHydrationWarning
                      className="text-[15px] font-normal"
                    >
                      {
                        <CheckProductIsExistsInFlashSale
                          id={item.product_id}
                          price={price(item)}
                        />
                      }
                    </span>
                  </td>
                  <td className=" whitespace-nowrap">
                    <button
                      onClick={addToCard}
                      className="bg-black text-white px-6 py-4 uppercase text-xs font-bold hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <span
                      className="cursor-pointer inline-block"
                      onClick={() => removeToWishlist(item.id)}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                          fill="#000"
                        />
                      </svg>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
