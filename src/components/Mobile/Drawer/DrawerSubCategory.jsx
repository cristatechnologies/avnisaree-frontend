import React, { useState } from "react";
import Link from "next/link";
import DrawerChildCategory from "./DrawerChildCategory";

function DrawerSubCategory({ item }) {
  const [expandedSubItem, setExpandedSubItem] = useState(null);

  const toggleChildcategories = (subcategoryIndex) => {
    if (expandedSubItem === subcategoryIndex) {
      setExpandedSubItem(null); // Collapse if already expanded
    } else {
      setExpandedSubItem(subcategoryIndex); // Expand the clicked item
    }
  };

  return (
    <ul>
      {item.active_sub_categories.map((subcategory, index) => (
        <li key={subcategory.id}>
          {subcategory.active_child_categories.length > 0 ? (
            <div
              className=" flex justify-between items-center px-5 h-12 bg-white hover-primary-bg transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => toggleChildcategories(index)}
            >
              <div className="flex items-center space-x-6">
                <span className="text-sm font-400 capitalize ml-16">
                  {subcategory.name}
                </span>
              </div>
              {subcategory.active_child_categories.length > 0 && (
                <div>
                  <span>
                    <svg
                      width="6"
                      height="9"
                      viewBox="0 0 6 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={expandedSubItem === index ? "rotate-90" : ""}
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
              )}
            </div>
          ) : (
            <Link
              href={{
                pathname: "/products",
                query: { category: item.slug },
              }}
              legacyBehavior>
              <div className=" flex justify-between items-center px-5 h-12 bg-white hover-primary-bg transition-all duration-300 ease-in-out cursor-pointer">
                <div className="flex items-center space-x-6">
                  <span className="text-sm font-400 capitalize ml-16">
                    {subcategory.name}
                  </span>
                </div>
                {subcategory.active_child_categories.length > 0 && (
                  <div>
                    <span>
                      <svg
                        width="6"
                        height="9"
                        viewBox="0 0 6 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={expandedSubItem === index ? "rotate-90" : ""}
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
                )}
              </div>
            </Link>
          )}
          {expandedSubItem === index && subcategory.active_child_categories && (
            <DrawerChildCategory subcategory={subcategory} itemSlug={item.slug}/>
          )}
        </li>
      ))}
    </ul>
  );
}

export default DrawerSubCategory;
