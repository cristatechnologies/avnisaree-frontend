import Slider from "react-slick";
import { slider_settings } from "../../constant/constant";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import SimpleSlider from "./SliderCom";
import ViewMoreTitle from "./ViewMoreTitle";
import ProductView from "../SingleProductPage/ProductView";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SectionStyleThree({
  className,
  sectionTitle,
  seeMoreUrl,
  products = [],
}) {
  const [quickViewModal, setQuickView] = useState(false);
  const [quickViewData, setQuickViewData] = useState(null);
  const quickViewHandler = (slug) => {
    setQuickView(!quickViewModal);
    if (!quickViewData) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/product/${slug}`)
        .then((res) => {
          setQuickViewData(res.data ? res.data : null);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  useEffect(() => {
    if (quickViewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [quickViewModal]);

  const rs = products.map((item) => {
    return {
      id: item.id,
      title: item.name,
      slug: item.slug,
      image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
      price: item.price,
      offer_price: item.offer_price,
      campaingn_product: null,
      review: parseInt(item.averageRating),
      variants: item.active_variants,
    };
  });
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div>
            <Slider {...slider_settings} className="width--full ">
              {rs.map((datas) => (
                <div data-aos="fade-up" key={datas.id} className="item w-full">
                  <ProductCardStyleOne
                    datas={datas}
                    quickViewHandler={quickViewHandler}
                  />
                </div>
              ))}
            </Slider>
            {/* <DataIteration datas={rs} startLength={0} endLength={rs.length}>
              {({ datas }) => (
                <div data-aos="fade-up" key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration> */}
          </div>
        </div>
      </ViewMoreTitle>
      {quickViewModal && quickViewData && (
        <div className="quicke-view-wrapper w-full h-full flex fixed left-0 top-0 justify-center z-50 items-center ">
          <div
            onClick={() => setQuickView(!quickViewModal)}
            className="w-full h-full fixed left-0 right-0 bg-black  bg-opacity-25"
          ></div>
          <div
            data-aos="fade-up"
            className=" md:mx-10 xl:mt-[100px] rounded w-full bg-white relative lg:py-[40px] pt-[80px] pb-[40px] sm:px-[38px] px-3 md:mt-12 h-full overflow-y-scroll xl:overflow-hidden xl:mt-0 "
            style={{ zIndex: "999" }}
          >
            <div className="w-full h-full overflow-y-scroll overflow-style-none">
              <ProductView
                images={
                  quickViewData.gellery.length > 0 ? quickViewData.gellery : []
                }
                quickViewData={quickViewData && quickViewData}
                product={quickViewData.product}
              />
            </div>
            <button
              onClick={() => setQuickView(!quickViewModal)}
              type="button"
              className="absolute right-3 top-3"
            >
              <span className="text-red-500 w-12 h-12 flex justify-center items-center rounded border border-qred">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
