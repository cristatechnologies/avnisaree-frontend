import ProductCard from "./Partials/ProductCard";

const ProductGrid = ({categories}) => {
    // console.log(categories);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
     {categories && categories.map((item, index) => (
         item.is_best === 1 ? (
          <ProductCard key={index} item={item} />
        ) : null
))}
    </div>
  );
};



export default ProductGrid ;