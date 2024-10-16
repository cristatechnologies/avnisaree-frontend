import Link from "next/link";

function DrawerChildCategory({ subcategory, itemSlug }) {
  return (
    <ul>
      {subcategory.active_child_categories.map((childCategory) => (
        <Link
          href={{
            pathname: "/products",
            query: { category: itemSlug },
          }}
          key={childCategory.id}
          legacyBehavior>
          <div
            className=" flex justify-between items-center px-5 h-12 bg-white hover-primary-bg transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex items-center space-x-6">
              <span className="text-sm font-400 capitalize ml-20">
                {childCategory.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}

export default DrawerChildCategory;
