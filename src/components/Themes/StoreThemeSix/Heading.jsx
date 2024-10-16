import Link from "next/link";
import ServeLangItem from "../../Helpers/ServeLangItem";
import settings from "../../../../utils/settings";
import { CiGrid41 } from "react-icons/ci";
import ShopByCard from "./ShopByCard";





export default function Heading({ categoryTitle = "", className, children, seeMoreUrl }) {
  const { selected_theme } = settings();

  return (
    <>
      {/* {selected_theme === "theme5" ? ( */}

      <h1 className="flex justify-center font-serif font-thin text-[var(--primary-color)] lg:text-5xl text-4xl pt-20 pb-12">
        {categoryTitle}
      </h1>
      <div className="flex justify-center pb-10">
        <Link
          href={seeMoreUrl}
          passHref
          className="border-2 rounded:md bg-slate-50 hover:bg-[var(--primary-color)] text-[var(--text-color)] hover:text-white px-6 py-2 flex justify-center items-center text-xl"
          legacyBehavior
        >
          <div>
            <CiGrid41 color="[var(--primary-color)]" />
            View More
          </div>
        </Link>
      </div>
    </>
  );
}
