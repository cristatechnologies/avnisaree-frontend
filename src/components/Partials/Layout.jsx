import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DiscountBanner from "../DiscountBanner";
import Drawer from "../Mobile/Drawer";
import Header from "./Headers/Header";
import HeaderTwo from "./Headers/HeaderTwo";
import HeaderThree from "./Headers/HeaderThree";
import HeaderFour from "./Headers/HeaderFour";
import HeaderSeven from "./Headers/HeaderSeven";



import Footer from "./Footers/Footer";
import FooterTheme2 from "./Footers/FooterTwo";
import FooterTheme3 from "./Footers/FooterThree";
import FooterTheme4 from "./Footers/FooterFour";
import FooterTheme5 from "./Footers/FooterFive";
import FooterSeven from "./Footers/FooterSeven";

import apiRequest from "../../../utils/apiRequest";
import HeaderFive from "./Headers/HeaderFive";

export default function Layout({ children, childrenClasses }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [settings, setSettings] = useState(null);
  const themeSetting = JSON.parse(localStorage.getItem("settings"));
  const [subscribeData, setSubScribeDAta] = useState(null);
  
  const [contact, setContact] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
// console.log(settings);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!subscribeData) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/`)
        .then((res) => {
          if (res.data) {
            setSubScribeDAta(res.data.subscriptionBanner);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [subscribeData]);

  useEffect(() => {
    if (websiteSetup) {
      setSettings(websiteSetup.payload.setting);
    }
  }, [websiteSetup]);
  useEffect(() => {
    if (!contact) {
      apiRequest
        .contactUs()
        .then((res) => {
          if (res.data) {
            setContact(res.data.contact);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const [drawer, setDrawer] = useState(false);

  const themeHeaderComponents = {
    theme1: Header,
    theme2: HeaderTwo,
    theme3: HeaderThree,
    theme4: HeaderFour,
    theme5: HeaderFive ,   
    theme7: HeaderSeven
    // Add more themes as needed
  };

  const SelectedThemeHeaderComponent =
    themeHeaderComponents[themeSetting.selected_theme];

  const themeFooterComponents = {
    theme1: Footer,
    theme2: FooterTheme2,
    theme3: FooterTheme3,
    theme4: FooterTheme4,
    theme5: FooterTheme5,
    theme7: FooterSeven
   
    // Add more themes as needed
  };

  const SelectedThemeFooterComponent =
    themeFooterComponents[themeSetting.selected_theme];

  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        {themeSetting && (
          <SelectedThemeHeaderComponent
            contact={contact && contact}
            settings={settings}
            drawerAction={() => setDrawer(!drawer)}
          />
        )}

        <div style={{marginTop:"80px"}}
          className={`w-full min-h-screen  ${
            childrenClasses || "pt-[60px] pb-[90px]"
          }`}
        >
          {children && children}
        </div>
        {/* {subscribeData && <DiscountBanner datas={subscribeData} />} */}

        {themeSetting && <SelectedThemeFooterComponent settings={settings} />}

        <button
          onClick={scrollToTop}
          className={`${
            isVisible ? "block" : "hidden"
          } fixed bottom-4 right-4 bg-[var(--primary-color)] text-white px-5 py-4 rounded-full`}
        >
          <FontAwesomeIcon icon={"fa fa-angle-up scroll-top-arrow"} />
        </button>
      </div>
    </>
  );
}
