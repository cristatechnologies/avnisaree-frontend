import Link from "next/link";
import ServeLangItem from "../../Helpers/ServeLangItem";
import settings from "../../../../utils/settings";
import { CiGrid41 } from "react-icons/ci";
import ShopByCard from "./ShopByCard";





export default function Heading({ categoryTitle = "", className, children, seeMoreUrl }) {
  const { selected_theme } = settings();

  return <>
    {/* {selected_theme === "theme5" ? ( */}
  
          <h1 className="flex justify-center font-['JOST']  font-normal  lg:text-4xl text-3xl pt-20 pb-12">
            {categoryTitle}
          </h1>
         
         
       
  </>;
}
