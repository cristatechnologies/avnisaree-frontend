
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function NewArrival({
  categories,
  sectionTitle,
  seeMoreUrl = "",
  categoryTitle = "",
}) {
  return (
    <section className="bg-[var(--secondary-color)] flex flex-wrap px-12 w-full h-auto ">
      <div className="w-full sm:first:w-full lg:first:w-[25%] md:first:w-[75%] grid align-middle py-10 ">
        <h2 className="font-serif font-thin text-[var(--primary-color)] lg:text-5xl">
          {categoryTitle}
        </h2>
        <p className="text-[var(--text-color)] font-normal leading-8 text-lg ">
          Compellingly cultivate synergistic infrastructures rather than fully
          tested opportunities. Synergistically evisculate web-enabled
          interfaces.
        </p>
        <div className="flex  justify-start   h-fit">
          <button className="border-2  border-[var(--primary-color)] rounded:md bg-slate-50 hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-white  flex justify-center items-center ">
            {" "}
            <Link
              href={seeMoreUrl}
              passHref
              rel="noopener noreferrer"
              className="px-6 p-2"
              legacyBehavior>

              {" "}
              {categoryTitle}

            </Link>
          </button>
        </div>
      </div>
      {categories &&
        categories.slice(0, 8).map((item, i) => (
          <div
            className=" rounded-xl lg:w-[25%] md:w-[50%] sm:w-full    "
            key={i}
          >
            <a href="#" className="block m-8 ">
              <Image
                objectFit="cover"
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  (item.category && item.category.image
                    ? item.category.image
                    : item.thumb_image)
                }
                height={600}
                width={400}
                alt=""
                className="h-64 w-full object-cover sm:h-70 lg:h-55 hover:opacity-80"
              />
              <h3 className="m-4 text-lg font-bold font-serif text-[var(--primary-color)] sm:text-xl">
                {item.name}
              </h3>
              { item.price ? (
                <p className="mt-2 m-4 max-w-sm font-serif text-[var(--text-color)] font-semibold">
                  {"₹ " + item.price}
                </p>
              ) : (
                <></>
              )}
            </a>
          </div>
        ))}
    </section>
  );
}

// <div className={`section-style-one ${className || ""}`}>
//   <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
//     <div className="products-section w-full">
//       <div>
//         <Slider {...slider_settings} className="width--full ">
//           {rs.map((datas) => (
//             <div data-aos="fade-up" key={datas.id} className="item w-full">
//               <ProductCardStyleOne
//                 datas={datas}
//                 quickViewHandler={quickViewHandler}
//               />
//             </div>
//           ))}
//         </Slider>
     
//       </div>
//     </div>
//   </ViewMoreTitle>
//   {quickViewModal && quickViewData && (
//     <div className="quicke-view-wrapper w-full h-full flex fixed left-0 top-0 justify-center z-50 items-center ">
//       <div
//         onClick={() => setQuickView(!quickViewModal)}
//         className="w-full h-full fixed left-0 right-0 bg-black  bg-opacity-25"
//       ></div>
//       <div
//         data-aos="fade-up"
//         className=" md:mx-10 xl:mt-[100px] rounded w-full bg-white relative lg:py-[40px] pt-[80px] pb-[40px] sm:px-[38px] px-3 md:mt-12 h-full overflow-y-scroll xl:overflow-hidden xl:mt-0 "
//         style={{ zIndex: "999" }}
//       >
//         <div className="w-full h-full overflow-y-scroll overflow-style-none">
//           <ProductView
//             images={
//               quickViewData.gellery.length > 0 ? quickViewData.gellery : []
//             }
//             quickViewData={quickViewData && quickViewData}
//             product={quickViewData.product}
//           />
//         </div>
//         <button
//           onClick={() => setQuickView(!quickViewModal)}
//           type="button"
//           className="absolute right-3 top-3"
//         >
//           <span className="text-red-500 w-12 h-12 flex justify-center items-center rounded border border-qred">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-10 h-10"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               ></path>
//             </svg>
//           </span>
//         </button>
//       </div>
//     </div>
//   )}
// </div>