import { useState } from "react";
import DrawerCategoryItem from "./DrawerCategoryItem";
import DrawerSubCategory from "./DrawerSubCategory";
import Link from "next/link";
import FontAwesomeCom from "../../Helpers/icons/FontAwesomeCom";

function DrawerCategory({categoryList,action}) {
    const [expandedItem, setExpandedItem] = useState(null);
    
    const toggleSubcategories = (index) => {
      if (expandedItem === index) {
        setExpandedItem(null); // Collapse if already expanded
      } else {
        setExpandedItem(index); // Expand the clicked item
      }
    };
    const renderParentCategories = (categories) => {
      return (
        <ul className="all-categories-item bg-white">
          {categories.map((category, index) => (
            <li
              className="text-[var(--text-color)] group/parent"
              key={category.id}
              onClick={() => toggleSubcategories(index)} // Add onClick handler
            >
              {/* Conditional rendering based on the presence of children */}
              {!category.children.length ? ( // If no children
                (<Link
                href={{
                  pathname: "/products",
                  query: { category: category.slug },
                }}
                passHref
                rel="noopener noreferrer"
                legacyBehavior>

                  <div className="flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer group-hover/parent:bg-gray-200">
                    <div className="flex items-center rtl:space-x-reverse space-x-6 ">
                      <span>
                        <FontAwesomeCom
                          className="w-4 h-4"
                          icon={category.icon}
                        />
                      </span>
                      <span className="text-xs font-400">
                        {category.name}
                      </span>
                    </div>
                  </div>

                </Link>)
              ) : (
                // If children present
                <div className="flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer group-hover/parent:bg-gray-200">
                  <div className="flex items-center rtl:space-x-reverse space-x-6 ">
                    <span>
                      <FontAwesomeCom
                        className="w-4 h-4"
                        icon={category.icon}
                      />
                    </span>
                    <span className="text-xs font-400">{category.name}</span>
                  </div>
                  {category.children.length > 0 && (
                    <div>
                      <span>
                        <svg
                          className={`transform rtl:rotate-180 fill-current`}
                          width="6"
                          height="9"
                          viewBox="0 0 6 9"
                          fill="text-[var(--text-color)]"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1.49805"
                            y="0.818359"
                            width="5.78538"
                            height="1.28564"
                            transform="rotate(45 1.49805 0.818359)"
                          />
                          <rect
                            x="5.58984"
                            y="4.90918"
                            width="5.78538"
                            height="1.28564"
                            transform="rotate(135 5.58984 4.90918)"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              )}
              {/* Render child categories if the parent category is expanded */}
              {expandedItem === index &&
                category.children.length > 0 &&
                renderChildCategories(category.children)}
            </li>
          ))}
        </ul>
      );
    };

    const renderChildCategories = (children) => {
      return (
        <ul className="children-categories ml-5">
          {children.map((child) => (
            <li key={child.id} className="text-[var(--text-color)]">
              <Link
                href={{
                  pathname: "/products",
                  query: { category: child.slug },
                }}
                passHref
                rel="noopener noreferrer"
                legacyBehavior>

                <div className="flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                  <div className="flex items-center rtl:space-x-reverse space-x-6">
                    <span className={"text-xs font-400"}>{child.name}</span>
                  </div>
                </div>

              </Link>
              {child.children.length > 0 &&
                renderChildCategories(child.children)}
            </li>
          ))}
        </ul>
      );
    };
  
  return (
   
     renderParentCategories(categoryList)
  );
}

export default DrawerCategory;
 