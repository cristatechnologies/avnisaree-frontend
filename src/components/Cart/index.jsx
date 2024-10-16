import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "../../../utils/apiRequest";
import auth from "../../../utils/auth";
import settings from "../../../utils/settings";
import { fetchCart } from "../../store/Cart";
import CheckProductIsExistsInFlashSale from "../Shared/CheckProductIsExistsInFlashSale";
import ServeLangItem from "../Helpers/ServeLangItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


export default function Cart({ className, isOpen, onClose }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [getCarts, setGetCarts] = useState(null);
  const [getAllPrice, setGetAllPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    setTotalPrice(
      getAllPrice &&
        getAllPrice.reduce((prev, curr) => parseFloat(prev) + parseFloat(curr))
    );
  }, [getAllPrice]);

  useEffect(() => {
    cart && setGetCarts(cart.cartProducts);
  }, [cart]);

  const checkProductExistsInFlashSale = (id, price) => {
    if (websiteSetup) {
      const flashSaleOffer =
        websiteSetup.payload.flashSale && websiteSetup.payload.flashSale.offer;
      const flashSaleIds =
        websiteSetup.payload.flashSaleProducts.length > 0 &&
        websiteSetup.payload.flashSaleProducts.find(
          (item) => parseInt(item.product_id) === parseInt(id)
        );
      if (flashSaleOffer && flashSaleIds) {
        const offer = parseInt(flashSaleOffer);
        const discountPrice = (offer / 100) * price;
        const mainPrice = price - discountPrice;
        return mainPrice;
      } else {
        return price;
      }
    }
  };

  useEffect(() => {
    if (getCarts && getCarts.length > 0) {
      setGetAllPrice(
        getCarts.map((v) => {
          if (v.product.offer_price) {
            if (v.variants && v.variants.length > 0) {
              const prices = v.variants.map((item) =>
                item.variant_item ? parseInt(item.variant_item.price) : 0
              );
              const sumCal = prices.reduce((p, c) => p + c);
              const v_price = sumCal + parseInt(v.product.offer_price);
              return checkProductExistsInFlashSale(v.product_id, v_price);
            } else {
              const wo_v_price = v.product.offer_price;
              return checkProductExistsInFlashSale(v.product_id, wo_v_price);
            }
          } else {
            if (v.variants && v.variants.length > 0) {
              const prices = v.variants.map((item) =>
                item.variant_item ? parseInt(item.variant_item.price) : 0
              );
              const sumCal = prices.reduce((p, c) => p + c);
              const v_price = sumCal + parseInt(v.product.price);
              return checkProductExistsInFlashSale(v.product_id, v_price);
            } else {
              const wo_v_price = v.product.price;
              return checkProductExistsInFlashSale(v.product_id, wo_v_price);
            }
          }
        })
      );
    } else {
      setGetAllPrice(null);
    }
  }, [getCarts]);

  const deleteItem = (id) => {
    if (auth()) {
      apiRequest
        .deleteCartItem({
          id: id,
          token: auth().access_token,
        })
        .then(() => {
          toast.warn(ServeLangItem()?.Remove_from_Cart, {
            autoClose: 1000,
          });
          dispatch(fetchCart());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return false;
    }
  };

  const price = (item) => {
    if (item) {
      if (item.product.offer_price) {
        if (item.variants && item.variants.length > 0) {
          const prices = item.variants.map((item) =>
            item.variant_item ? parseInt(item.variant_item.price) : 0
          );
          const sumVarient = prices.reduce((p, c) => p + c);
          return parseInt(item.product.offer_price) + sumVarient;
        } else {
          return item.product.offer_price;
        }
      } else {
        if (item.variants && item.variants.length > 0) {
          const prices = item.variants.map((item) =>
            item.variant_item ? parseInt(item.variant_item.price) : 0
          );
          const sumVarient = prices.reduce((p, c) => p + c);
          return parseInt(item.product.price) + sumVarient;
        } else {
          return item.product.price;
        }
      }
    }
  };

  const { currency_icon } = settings();

  return (
    <div className="fixed top-0 right-0 h-full group">
      <div className="absolute top-0 right-0 w-5 h-full"></div>
      <div className="cart-wrapper fixed top-0 right-0 w-[400px] h-full bg-white border-l-[3px] shadow-lg z-50 transform translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0">
        <div className="w-full h-full flex flex-col">
          <div className="product-items flex-grow overflow-y-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              Shopping Cart
            </h2>
            <ul>
              {getCarts &&
                getCarts.length > 0 &&
                getCarts.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div className="flex items-stretch gap-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          layout="fill"
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL +
                            item.product.thumb_image
                          }`}
                          alt=""
                          className="aspect-square w-20 rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-md/tight font-medium text-gray-900">
                          {item.product.name}
                        </p>

                        <p className="mt-0.5 text-gray-700 text-base">
                          <CheckProductIsExistsInFlashSale
                            id={item.product_id}
                            price={price(item)}
                          />
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </li>
                ))}
            </ul>
            {getCarts && getCarts.length === 0 && (
              <p className="text-gray-500 text-center">
                {ServeLangItem()?.No_items_found}
              </p>
            )}
          </div>

          <div className="cart-footer border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold text-xl">
                {currency_icon}
                {totalPrice ? parseFloat(totalPrice).toFixed(2) : "0.00"}
              </span>
            </div>

            <div className="flex flex-row ">
              <Link
                href="/cart"
                className="block w-1/2 text-sm bg-gray-200 text-center pt-4  "
                legacyBehavior>

                {ServeLangItem()?.View_Cart}

              </Link>
              <Link
                href="/checkout"
                className="block w-1/2 bg-black text-sm text-white text-center py-4 "
                legacyBehavior>

                {ServeLangItem()?.Checkout_Now}

              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
