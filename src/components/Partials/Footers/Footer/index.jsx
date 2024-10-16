import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import Youtube from "../../../Helpers/icons/Youtube";
import FontAwesomeCom from "../../../Helpers/icons/FontAwesomeCom";
export default function Footer({ settings }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [firstCol, setFirstCol] = useState(null);
  const [secondCol, setSecondCol] = useState(null);
  const [thirdCol, setThirdCol] = useState(null);
  const [footerContent, setFooterContent] = useState(null);
  const [socialLink, setSocialLink] = useState(null);

  useEffect(() => {
    if (!footerContent) {
      setFooterContent(
        websiteSetup && websiteSetup.payload && websiteSetup.payload.footer
      );
    }
  });

  useEffect(() => {
    if (!socialLink) {
      setSocialLink(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.social_links
      );
    }
  });

  useEffect(() => {
    if (!firstCol) {
      setFirstCol(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.footer_first_col
      );
    }
  });
  useEffect(() => {
    if (!secondCol) {
      setSecondCol(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.footer_second_col
      );
    }
  });
  useEffect(() => {
    if (!thirdCol) {
      setThirdCol(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.footer_third_col
      );
    }
  });

  return (
    <footer className="footer-section-wrapper print:hidden">
      <div className="pt-[56px]">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between mb-[50px] w-full sm:w-full lg:max-w-4xl mx-auto">
          <div className="lg:w-52 mr-10 w-full mb-10 lg:mb-0">
            <div className="mb-[40px] text-center lg:text-inherit">
              <Link href="/" passHref legacyBehavior>

                {settings && (
                  <Image
                    width="200"
                    height="100"
                    objectFit="scale-down"
                    src={`${
                      process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                    }`}
                    alt="logo"
                  />
                )}

              </Link>
            </div>
            {/*<p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">*/}
            {/*  {footerContent && footerContent.email ? footerContent.email : ""}*/}
            {/*</p>*/}
            {/*<p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">*/}
            {/*  {footerContent && footerContent.address*/}
            {/*    ? footerContent.address*/}
            {/*    : ""}*/}
            {/*</p>*/}
            {/*<div>*/}
            {/*  <ul className="flex flex-col space-y-4 ">*/}
            {/*    <li>*/}
            {/*      <Link href="/tracking-order">*/}
            {/*        <span className="text-[#9A9A9A] text-[15px] hover:text-[var(--text-color)] border-b border-transparent hover:border-qblack cursor-pointer capitalize">*/}
            {/*          Track Order*/}
            {/*        </span>*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <Link href="/faq">*/}
            {/*        <span className="text-[#9A9A9A] text-[15px] hover:text-[var(--text-color)] border-b border-transparent hover:border-qblack cursor-pointer capitalize">*/}
            {/*          Support*/}
            {/*        </span>*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*    */}
            {/*  </ul>*/}
            {/*</div>*/}
          </div>
          <div className="flex lg:flex flex-wrap justify-center lg:flex-nowrap">
            <div className="lg:w-80 w-52 mb-10 lg:mb-0">
              {firstCol && (
                <>
                  <div className="mb-5">
                    <h6 className="text-xl font-bold text-[var(--primary-color)]">
                      {firstCol.columnTitle}
                    </h6>
                  </div>
                  <div>
                    <ul className="flex flex-col space-y-2 ">
                      {firstCol.col_links.length > 0 &&
                        firstCol.col_links.map((item, i) => (
                          <li key={i} className="w-fit">
                            <Link href={`${item.link}`} rel="noopener noreferrer" legacyBehavior>

                              <span className="text-[var(--text-color)] text-[15px] hover:text-[var(--primary-color)] border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                                {item.title}
                              </span>

                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div className="lg:flex lg:flex-col items-center w-52 lg:w-full mb-10 lg:mb-0 ">
              <div>
                {secondCol && (
                  <>
                    <div className="mb-5">
                      {secondCol.columnTitle ? (
                        <h6 className="text-xl font-bold text-[var(--primary-color)]">
                          {secondCol.columnTitle}
                        </h6>
                      ) : (
                        <h6 className="text-xl font-bold text-[var(--primary-color)]">
                          &#160;
                        </h6>
                      )}
                    </div>
                    <div>
                      <ul className="flex flex-col space-y-2 ">
                        {secondCol.col_links.length > 0 &&
                          secondCol.col_links.map((item, i) => (
                            <li key={i}>
                              <Link href={`${item.link}`} passHref rel="noopener noreferrer" legacyBehavior>

                                <span className="text-[var(--text-color)] text-[15px] hover:text-[var(--primary-color)] border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                                  {item.title}
                                </span>

                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="lg:w-1/3 w-52 lg:flex lg:flex-col items-center mb-10 lg:mb-0">
              <div>
                {thirdCol && (
                  <>
                    <div className="mb-5">
                      <h6 className="text-xl font-bold text-[var(--primary-color)] ">
                        {thirdCol.columnTitle}
                      </h6>
                    </div>
                    <div>
                      <ul className="flex flex-col space-y-2 ">
                        {thirdCol.col_links.length > 0 &&
                          thirdCol.col_links.map((item, i) => {
                            return (
                              <li key={i} className="flex items-center gap-2">
                                <FontAwesomeCom
                                  className={"w-4 h-4 text-[var(--text-color)]"}
                                  icon={item.link}
                                />
                                <span className="text-[var(--text-color)] text-[15px] hover:text-[var(--primary-color)] border-b border-transparent hover:border-qblack">
                                  {item.title}
                                </span>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--primary-color)] lg:h-[82px] flex lg:flex-row flex-col-reverse
         justify-between items-center w-full  "
        >
          <div className="flex px-20 flex-wrap sm:flex-nowrap lg:flex-nowrap sm:px-32 lg:px-40 justify-evenly sm:justify-between lg:justify-between items-center mb-3 w-full lg:max-w-6xl lg:mx-auto">
            <span className="sm:text-base text-xs text-[var(--secondary-color)] font-300 py-5">
              {footerContent && footerContent.copyright
                ? footerContent.copyright
                : ""}
            </span>
            <div className="flex rtl:space-x-reverse space-x-5 items-center ">
              {socialLink &&
                socialLink.length > 0 &&
                socialLink.map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noreferrer">
                    <FontAwesomeCom
                      className="w-4 h-4 text-[var(--secondary-color)]"
                      icon={item.icon}
                    />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
