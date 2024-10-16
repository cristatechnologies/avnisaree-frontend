import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import settings from "../../../../../utils/settings" 
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"; 
import auth from "../../../../../utils/auth";
import apiRequest from "../../../../../utils/apiRequest";
import { toast } from "react-toastify";
import { fetchCart } from "../../../../store/Cart";
import ServeLangItem from "../../../Helpers/ServeLangItem";



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

const ProductCards = ({ datas }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  //cart
  const varients = datas && datas.variants.length > 0 && datas.variants;
  const [getFirstVarients, setFirstVarients] = useState(
    varients && varients.map((v) => v.active_variant_items[0])
  );
  const [price, setPrice] = useState(null);
  const [offerPrice, setOffer] = useState(null);
  const addToCart = (id) => {
    if (auth()) {
      const data = {
        id: id,
        token: auth() && auth().access_token,
        quantity: 1,
        variants:
          getFirstVarients &&
          getFirstVarients.length > 0 &&
          getFirstVarients.map((v) =>
            v ? parseInt(v.product_variant_id) : null
          ),
        variantItems:
          getFirstVarients &&
          getFirstVarients.length > 0 &&
          getFirstVarients.map((v) => (v ? v.id : null)),
      };
      if (varients) {
        const variantQuery = data.variants.map((value, index) => {
          return value ? `variants[]=${value}` : `variants[]=-1`;
        });
        const variantString = variantQuery.map((value) => value + "&").join("");

        const itemsQuery = data.variantItems.map((value, index) => {
          return value ? `items[]=${value}` : `items[]=-1`;
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
          .catch((err) => {
            toast.error(
              err.response &&
                err.response.data.message &&
                err.response.data.message
            );
          });
        dispatch(fetchCart());
      } else {
        const uri = `token=${data.token}&product_id=${data.id}&quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) =>
            toast.success(<Redirect />, {
              autoClose: 5000,
            })
          )
          .catch((err) => {
            toast.error(
              err.response &&
                err.response.data.message &&
                err.response.data.message
            );
          });
        dispatch(fetchCart());
      }
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    if (varients) {
      const prices = varients.map((v) =>
        v.active_variant_items.length > 0 && v.active_variant_items[0].price
          ? v.active_variant_items[0].price
          : 0
      );

      if (datas.offer_price) {
        const sumOfferPrice = parseFloat(
          prices.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) +
            parseFloat(datas.offer_price)
        );
        setPrice(datas.price);
        setOffer(sumOfferPrice);
      } else {
        const sumPrice = parseFloat(
          prices.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) +
            parseFloat(datas.price)
        );
        setPrice(sumPrice);
      }
    } else {
      setPrice(datas && datas.price);
      setOffer(datas && datas.offer_price);
    }
  }, [datas, varients]);
  const { currency_icon } = settings();
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [isProductInFlashSale, setData] = useState(null);
  useEffect(() => {
    if (websiteSetup) {
      const getId = websiteSetup.payload.flashSaleProducts.find(
        (item) => parseInt(item.product_id) === parseInt(datas.id)
      );
      let lastDateSale = new Date(websiteSetup.payload.flashSale.end_time);
      let currentDate = new Date();
      if (getId) {
        if (currentDate.getTime() <= lastDateSale.getTime()) {
          setData(true);
        } else {
          setData(false);
        }
      }
    }
  }, [websiteSetup]);
  const [isHovered, setIsHovered] = useState(false);

  const IconButton = ({ icon: Icon, text, onClick }) => {
    const [isIconHovered, setIsIconHovered] = useState(false);

    return (
      <div
        className="relative"
        onMouseEnter={() => setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
      >
        <button
          className="group bg-white p-3 rounded-full shadow-md hover:bg-[var(--primary-color)] transition-transform duration-200 ease-in-out hover:scale-110"
          onClick={onClick}
        >
          <Icon className="text-gray-600 text-xl group-hover:text-white " />
        </button>
        {isIconHovered && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded transition-opacity duration-200 ease-in-out whitespace-nowrap">
            {text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    
      <div className="w-full aspect-w-1 aspect-h-1 px-4 relative overflow-hidden">
        <div className="flex items-center justify-center h-full cursor-pointer">
          <Link
            href={{
              pathname: "/single-product",
              query: { slug: datas.slug },
            }}
            passHref
            rel="noopener noreferrer"
            legacyBehavior>

            <Image
              width={400}
              height={450}
              src={datas.image}
              alt={datas.slug}
              className="w-full h-full object-contain hover:cursor-pointer"
            />

          </Link>
        </div>
        <div
          className={`absolute lg:bottom-10 left-0 right-0 flex justify-center space-x-12 transition-all duration-300 ease-in-out ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          }`}
        >
          <IconButton
            icon={AiOutlineShoppingCart}
            text="Add to Cart"
            onClick={() => addToCart(datas.id)}
          />
          <IconButton icon={AiOutlineSearch} text="Quick View" />
          <IconButton icon={AiOutlineHeart} text="Add to Wishlist" />
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-center pt-2 gap-2">
        <Link
          href={`/${datas.slug}`}
          className="text-lg font-semibold text-gray-800 hover:text-[var(--primary-text-color)] transition-colors duration-300"
          legacyBehavior>

          {datas.title}

        </Link>
        <span className="text-[var(--primary-text-color)] font-extrabold ">
          {"₹ " + datas.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCards;
