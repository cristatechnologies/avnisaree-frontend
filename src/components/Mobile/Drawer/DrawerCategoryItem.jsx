import Link from "next/link";
import FontAwesomeCom from "../../Helpers/icons/FontAwesomeCom";

function DrawerCategoryItem({ item, i, toggleSubcategories, expandedItem ,action}) {
  return <>
    {item.active_sub_categories.length > 0 ? (
      <div
        className=" flex justify-between items-center px-5 h-12 bg-white hover-primary-bg transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => toggleSubcategories(i)}
      >
        <div className="flex items-center space-x-6">
          <span>
            <span>
              <FontAwesomeCom className="w-4 h-4" icon={item.icon} />
            </span>
          </span>
          <span className="text-sm font-400 capitalize">{item.name}</span>
        </div>
        <div>
          <span>
            <svg
              width="6"
              height="9"
              viewBox="0 0 6 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={expandedItem === i ? "rotate-90" : ""}
            >
              <rect
                x="1.49805"
                y="0.818359"
                width="5.78538"
                height="1.28564"
                transform="rotate(45 1.49805 0.818359)"
                fill="#1D1D1D"
              />
              <rect
                x="5.58984"
                y="4.90918"
                width="5.78538"
                height="1.28564"
                transform="rotate(135 5.58984 4.90918)"
                fill="#1D1D1D"
              />
            </svg>
          </span>
        </div>
      </div>
    ) : (
      <Link
        href={{
          pathname: "/products",
          query: { category: item.slug },
        }}
        onClick={action}
        legacyBehavior>
        <div
          className=" flex justify-between items-center px-5 h-12 bg-white hover-primary-bg transition-all duration-300 ease-in-out cursor-pointer"
        >
          <div className="flex items-center space-x-6">
            <span>
              <span>
                <FontAwesomeCom className="w-4 h-4" icon={item.icon} />
              </span>
            </span>
            <span className="text-sm font-400 capitalize">{item.name}</span>
          </div>
        </div>
      </Link>
    )}
  </>;
}

export default DrawerCategoryItem;
