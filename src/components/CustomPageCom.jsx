import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "./Partials/Layout";
import PageTitle from "./Helpers/PageTitle";
// import languageModel from "../../utils/languageModel";
import PageHead from "./Helpers/PageHead";
import ServeLangItem from "./Helpers/ServeLangItem";

function CustomPageCom({ slug }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [pageData, setPageData] = useState(null);
  // const [langCntnt, setLangCntnt] = useState(null);
  // useEffect(() => {
  //     setLangCntnt(languageModel());
  // }, []);
  const router = useRouter();
  useEffect(() => {
    if (websiteSetup) {
      const checkPageIsExist = websiteSetup.payload.customPages.find((item) => {
        return item.slug === slug;
      });

      const checkSellerPageExist = websiteSetup.payload.customPages.find(
        (item) => {
          if (item.seller_id !== null) {
            return item.slug === slug.split("/")[1];
          }
        }
      );

      if (checkPageIsExist) {
        setPageData(checkPageIsExist);
      } else if (checkSellerPageExist) {
        setPageData(checkSellerPageExist);
      } else {
        router.push("/404");
      }
    }
  }, [slug, websiteSetup]);

  return (
    <>
      {pageData && <PageHead title={pageData.page_name} />}
      <Layout childrenClasses="pt-0 pb-0">
        <div className="w-full pb-[30px] min-h-screen">
          <div className="w-full mb-[30px]">
            {pageData && (
              <PageTitle
                breadcrumb={[
                  { name: ServeLangItem()?.home, path: "/" },
                  {
                    name: pageData.page_name,
                    path: `${pageData.slug}`,
                  },
                ]}
                title={pageData.page_name}
                isBecomeSeller={true}
              />
            )}
          </div>
          <div className="w-full bg-white rounded-3xl max-w-5xl mx-auto">
            <div className="container-x mx-auto">
              {pageData && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: pageData.description,
                  }}
                  style={{ color: "black !important" }}
                  className="p-10"
                ></div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CustomPageCom;
