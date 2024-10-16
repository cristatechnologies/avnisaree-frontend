import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import Youtube from "../../../Helpers/icons/Youtube";
import FontAwesomeCom from "../../../Helpers/icons/FontAwesomeCom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import apiRequest from "../../../../../utils/apiRequest";
export default function FooterSeven({ settings }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [firstCol, setFirstCol] = useState(null);
  const [secondCol, setSecondCol] = useState(null);
  const [thirdCol, setThirdCol] = useState(null);
  const [desc, setDesc] = useState(null);
    const [socialLink, setSocialLink] = useState(null);
const [productCategories, setProductCategories] = useState(null);
const [email, setEmail] = useState("");

  console.log(desc)


useEffect(()=>
{
  if(!productCategories) {
    setProductCategories(
      websiteSetup && 
      websiteSetup.payload &&
      websiteSetup.payload.productCategories
    )
}});

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
    if (!desc) {
      setDesc(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.footer
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



  
  const subscribehandler = () => {
    apiRequest
      .subscribeRequest({ email: email })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response && err.response.data.message);
      });
  };

  return (
    <footer className="bg-white font-['JOST'] border-t-2">
      <div className=" w-full  pt-16 ">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4 px-6 pb-10">
          <div>
            {desc && (
              <>
                <p className="font-normal text-gray-900 text-md uppercase">
                  {" "}
                  About Styler
                </p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li className="font-normal text-gray-900 text-md transform transition-transform duration-300 hover:scale-105">
                    Trading address (By Appointment only):
                  </li>
                  {desc.address && (
                    <li className="transform transition-transform duration-300 hover:scale-105">
                      {desc.address}
                    </li>
                  )}
                  <li className="flex flex-row gap-4">
                    {socialLink &&
                      socialLink.length > 0 &&
                      socialLink.map((item, i) => (
                        <a
                          key={i}
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FontAwesomeCom
                            className="w-10 h-10 "
                            icon={item.icon}
                          />
                        </a>
                      ))}
                  </li>
                </ul>
              </>
            )}
          </div>
          <div>
            {productCategories && (
              <>
                <p className="font-normal text-gray-900 text-lg uppercase">
                  {" "}
                  categories{" "}
                </p>

                <ul className="mt-6 space-y-4 text-sm">
                  {productCategories.length > 0 &&
                    productCategories.map((item, i) => (
                      <li
                        key={i}
                        className="transform transition-transform duration-300 hover:scale-105 capitalize "
                      >
                        <Link
                          href={{pathname: "/products", query: {category: item.slug}}}
                          className="text-gray-700 transition hover:opacity-75"
                          legacyBehavior
                        >
                          <span className="cursor-pointer"> {item.name}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
          {firstCol && (
            <div>
              <p className="font-normal text-gray-900 text-lg">
                {" "}
                Help
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                {firstCol.col_links.length > 0 &&
                  firstCol.col_links.map((item, i) => (
                    <li
                      key={i}
                      className="transform transition-transform duration-300 hover:scale-105"
                    >
                      <Link
                        href={item.link}
                        className="text-gray-700 transition-opacity duration-300 hover:opacity-75"
                        legacyBehavior
                      >
                        <span className="cursor-pointer">{item.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div>
            {thirdCol && (
              <>
                {/* Newsletter Section */}
                <div className="">
                  <h3 className="font-normal text-gray-900 text-lg mb-4">
                    NEWSLETTER
                  </h3>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4"
                  >
                    <input
                      onChange={(e) => setEmail(e.target.value.trim())}
                      value={email}
                      type="text"
                      placeholder="Your E-mail"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <button
                      onClick={subscribehandler}
                      type="button"
                      className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
                    >
                      Submit
                    </button>
                  </form>
                  <p className="text-sm text-gray-600 mt-2">
                    Sign up to get the latest on new Products, Promotions,
                    Design news and more
                  </p>
                </div>
              </>
            )}
          </div>

          {/* <div>
              <p className="font-medium text-gray-900">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Contact
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    FAQs
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Live Chat
                  </a>
                </li>
              </ul>
            </div> */}
        </div>

        <div className="py-4 bg-gray-950 px-4 mx-0 ">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-4 text-md ">
            <div className="flex lg:flex-row flex-col  w-[50%] items-center gap-4 text-md ">
              <p className=" text-white font-normal ">
                <FontAwesomeIcon icon="fa-solid fa-copyright" />
                {desc && desc.copyright}
              </p>
              <p className=" text-white">
                <FontAwesomeIcon icon="fa-solid fa-phone-volume" />
                {desc && desc.phone}
              </p>
              <p className=" text-white">
                <FontAwesomeIcon icon="fa-regular fa-envelope" />
                {desc && desc.email}
              </p>
            </div>
            <div className="flex  w-[50%] gap-8 justify-center items-center "> 
              {socialLink &&
                socialLink.length > 0 &&
                socialLink.map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noreferrer">
                    <FontAwesomeCom
                      className="w-10 h-10   text-[var(--secondary-color)]"
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
