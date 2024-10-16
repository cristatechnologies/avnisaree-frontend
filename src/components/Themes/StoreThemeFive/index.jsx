import { useEffect, useState } from "react";
import settings from "../../../../utils/settings";
import SectionStyleFour from "../../Helpers/SectionStyleFour";
import SectionStyleOne from "../../Helpers/SectionStyleOne";
import SectionStyleThree from "../../Helpers/SectionStyleThree";
import SectionStyleTwo from "../../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../../Helpers/ViewMoreTitle";
import Layout from "../../Partials/Layout";
import Ads from "./Ads";
import Banner from "./Banner";
// import BestSellers from "./BestSellers";
// import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
// import ProductsAds from "./ProductsAds";
import TwoColumnAds from "./ProductAds/TwoColumnAds";
import OneColumnAdsOne from "./ProductAds/OneColumnAdsOne";
import OneColumnAdsTwo from "./ProductAds/OneColumnAdsTwo";
import CategorySection from "./CategorySection";

import Heading from "./Heading";
import ShopByCard from "./ShopByCard";
import NewArrival from "./NewArrival";
import ChooseUs from "../../Partials/Static/Theme5/chooseUs";

export default function StorePageThemeFive({ homepageData }) {
  const getsectionTitles = homepageData.section_title;
  const [sectionTitles, setSectionTitles] = useState(null);
console.log(homepageData)
  useEffect(() => {
    if (!sectionTitles) {
      let tem =
        getsectionTitles &&
        getsectionTitles.map((item, i) => {
          return {
            [item.key]: item.custom ? item.custom : item.default,
          };
        });
      setSectionTitles(Object.assign.apply(Object, tem));
    }
  }, [sectionTitles]);

  const [homepage] = useState(homepageData);
  const { enable_multivendor } = settings();
  const [isMultivendor, setIsMultivendor] = useState(false);
  useEffect(() => {
    if (!isMultivendor) {
      setIsMultivendor(enable_multivendor && parseInt(enable_multivendor));
    }
  }, [isMultivendor]);
  console.log(homepage.productCategories);
  return (
    <>
      <Layout childrenClasses="pt-0 pb-[60px]">
        <Ads />
        {homepage && (
          <Banner
          services={homepage.services}
            images={homepage.sliders}
            // remove service slider
            sidebarImgOne={homepage.sliderBannerOne}
            sidebarImgTwo={homepage.sliderBannerTwo}
            className="banner-wrapper "
          />
        )}
        <ChooseUs className={"pt-20"}/>
        {homepage && (
          <section>
            <div className="container mx-auto px-4 py-8">
              <Heading
                className="feature mb-[5px]  "
                seeMoreUrl={`/products?highlight=categories`}
                categoryTitle={sectionTitles && sectionTitles.Featured_Category}
              ></Heading>
              <ShopByCard
                categories={homepage.featuredCategories}
                sectionTitle={sectionTitles && sectionTitles.Featured_Category}
              />
            </div>
          </section>
        )}
        {homepage && (
          <NewArrival
            categories={homepage.newArrivalProducts}
            categoryTitle={sectionTitles && sectionTitles.New_Arrivals}
          />
        )}
         {homepage && (
          <NewArrival
         
            categories={homepage.popularCategories}
           
            categoryTitle={sectionTitles && sectionTitles.Popular_Category}
           
            seeMoreUrl={`/products?highlight=popular_category`}
            
          />
        )} 
        {/* {homepage && (
          <BrandSection
            brands={homepage.brands.length > 0 ? homepage.brands : []}
            sectionTitle={sectionTitles && sectionTitles.Shop_by_Brand}
            className="brand-section-wrapper md:mb-[60px] mb-[30px]"
          />
        )}  */}
        {homepage && (
          <section>
            <div className="container mx-auto px-4 py-8">
              <Heading
                className="feature md:mb-[60px] mb-[30px] "
                seeMoreUrl={`/products?highlight=featured_product`}
                categoryTitle={sectionTitles && sectionTitles.Featured_Products}
              ></Heading>
              <ShopByCard
                categories={
                  homepage.featuredCategoryProducts.length > 0
                    ? homepage.featuredCategoryProducts.slice(0, 12)
                    : []
                }
                sectionTitle={sectionTitles && sectionTitles.Featured_Products}
              />
            </div>
          </section>
        )}
        {homepage && (
          <>
            <Heading
              className="top-selling-product md:mb-[60px] mb-[30px] "
              seeMoreUrl={`/products?highlight=top_product`}
              categoryTitle={sectionTitles && sectionTitles.Top_Rated_Products}
            />
            <ShopByCard
              categories={
                homepage.topRatedProducts.length &&
                homepage.topRatedProducts.length > 0
                  ? homepage.topRatedProducts
                  : []
              }
            />
          </>
        )}
        {/* {homepage && isMultivendor === 1 && (
          <ViewMoreTitle
            className="best-sallers-section md:mb-[60px] mb-[30px]"
            seeMoreUrl="/sellers"
            categoryTitle={sectionTitles && sectionTitles.Shop_by_Brand === 'Shop by Brand' ? 'Shop by Artist' : 'Shop by Brand'}
          >
            <BestSellers
              sallers={homepage.sellers.length > 0 ? homepage.sellers.slice(0, 7) : []}
            />
          </ViewMoreTitle>
        )} */}
        {homepage && (
          <TwoColumnAds
            bannerOne={homepage.twoColumnBannerOne}
            bannerTwo={homepage.twoColumnBannerTwo}
          />
        )}
        {homepage && (
          <SectionStyleOne
            categories={
              homepage.featuredCategories.length > 0
                ? homepage.featuredCategories
                : []
            }
            categoryBackground={
              process.env.NEXT_PUBLIC_BASE_URL +
              homepage.featuredCategorySidebarBanner
            }
            categoryTitle={sectionTitles && sectionTitles.Featured_Products}
            products={
              homepage.featuredCategoryProducts.length > 0
                ? homepage.featuredCategoryProducts.slice(0, 12)
                : []
            }
            sectionTitle={sectionTitles && sectionTitles.Featured_Products}
            seeMoreUrl={`/products?highlight=featured_product`}
            className="category-products md:mb-[60px] mb-[30px]"
          />
        )}
        {/* {homepage && <OneColumnAdsOne data={homepage.singleBannerOne} />} */}
        {/* {homepage && (
          <SectionStyleThree
            products={
              homepage.newArrivalProducts.length > 0
                ? homepage.newArrivalProducts.slice(0, 12)
                : []
            }
            sectionTitle={sectionTitles && sectionTitles.New_Arrivals}
            seeMoreUrl={`/products?highlight=new_arrival`}
            className="new-products md:mb-[60px] mb-[30px]"
          />
        )} */}
        {/* {homepage && (
          <div className="w-full text-white md:mb-[60px] mb-[30px]">
            <div className="container-x mx-auto">
              <OneColumnAdsTwo data={homepage.singleBannerTwo} />
            </div>
          </div>
        )} */}
        {homepage && (
          <NewArrival
            categories={
              homepage.bestProducts.length > 0
                ? homepage.bestProducts.slice(0, 12)
                : []
            }
            categoryTitle={sectionTitles && sectionTitles.Best_Products}
            seeMoreUrl={`/products?highlight=best_product`}
            className="category-products md:mb-[60px] mb-[30px]"
          />
        )}
        {homepage && (
          <CampaignCountDown
            className="md:mb-[60px] mb-[30px]"
            flashSaleData={homepage.flashSale}
            downloadData={homepage.flashSaleSidebarBanner}
            lastDate={homepage.flashSale.end_time}
          />
        )}
      </Layout>
    </>
  );
}
