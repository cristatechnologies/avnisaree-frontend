import Link from "next/link";
import { useEffect } from "react";
import settings from "../../../../utils/settings";
import ShopNowBtn from "../../Helpers/Buttons/ShopNowBtn";
import ServeLangItem from "../../Helpers/ServeLangItem";
import SimpleSlider from "../../Helpers/SliderCom";
import FontAwesomeCom from "../../Helpers/icons/FontAwesomeCom";
export default function Banner({
  className,
  images = [],
  sidebarImgOne,
  sidebarImgTwo,
  services = [],
}) {
  const settingBanner = {
    infinite: true,
    dots: true,
    autoplay: false,
    arrows: false,
    fade: true,
  };
  const { text_direction } = settings();
  useEffect(() => {
    const getSliderInitElement = document.querySelector(
      ".slider-wrapper .slick-slider.slick-initialized"
    );
    getSliderInitElement.setAttribute("dir", `${text_direction}`);
  }, [text_direction]);

  return <>
    <div className={`w-full ${className || ""}`}>
      <div>
        <div className="main-wrapper w-full">
          <div className="banner-card xl:flex xl:space-x-[30px] rtl:space-x-0 xl:h-[600px]  mb-[30px] ">
            <div
              data-aos="fade-right"
              className="rtl:ml-[30px] ltr:ml-0 w-full xl:h-full md:h-[500px] h-[220px] xl:mb-0 mb-2"
            >
              <div className="slider-wrapper w-full h-full">
                <SimpleSlider settings={settingBanner}>
                  {images.length > 0 &&
                    images.map((item, i) => (
                      <div
                        key={i}
                        className="item w-full h-full group relative"
                      >
                        <div
                          style={{
                            position: "relative",
                            height: "100%",
                            width: "100%",
                            display: " flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="flex w-full h-full relative items-center justify-center"
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              bottom: "0",
                              left: "0",
                              filter: " brightness(0.8)",
                              backgroundImage: `url(${
                                process.env.NEXT_PUBLIC_BASE_URL + item.image
                              })`,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                          <div className="text-center relative z-10">
                            <div className="md:w-[112px] w-[100px] shadow md:h-[25px] h-[18px] flex items-center justify-center bg-white rounded-full md:mb-[30px] mb-[15px]">
                              <span className="text-[var(--text-color)] uppercase md:text-xs text-[10px] font-semibold">
                                {item.badge}
                              </span>
                            </div>
                            <div className="md:mb-[30px] mb-[15px]">
                              <p className="md:text-[50px] text-[20px] leading-none text-[var(--secondary-color)] md:mb-3 w-fit">
                                {item.title_one}
                              </p>
                              <h1 className="md:text-[50px] text-[20px] md:w-[400px] md:leading-[66px] text-[var(--secondary-color)] font-bold !w-fit">
                                {item.title_two}
                              </h1>
                            </div>
                            <div className="text-start">
                              <button className="h-10 text-[var(--secondary-color)] bg-[var(--primary-color)] rounded-md hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] font-bold">
                                <Link
                                  href={{
                                    pathname: "/single-product",
                                    query: { slug: item.product_slug },
                                  }}
                                  passHref
                                  rel="noopener noreferrer"
                                  legacyBehavior>

                                  <span className="p-5">Shop Now</span>

                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </SimpleSlider>
              </div>
            </div>
          </div>


          
          <div
            data-aos="fade-up"
            className="best-services w-full bg-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10"
          >
            {services.map((service) => (
              <div key={service.id} className="item">
                <div className="flex space-x-5 rtl:space-x-reverse items-center">
                  <div>
                    <span className="w-10 h-10 primary-text">
                      <FontAwesomeCom
                        className="w-8 h-8"
                        icon={service.icon}
                      />
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      {service.title}
                    </p>
                    <p className="text-sm text-qgray line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>;
}
