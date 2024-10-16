import ProductCards from "../Themes/StoreThemeFive/PartialsThemeFive/ProductCards";

export default function allProductsThemeFive() {
  return (
    <>
      <div className="container pt-48  h-auto w-[100%] px-12">
        <div className="flex flex-wrap justify-between">
          <h1 className="font-serif text-cnvsThemeColor text-5xl text-left ">
            All Products
          </h1>
          <div className="flex justify-end gap-2 ">
            {/* <select
              size={0}
              className="border-2 border-cnvsThemeColor p-2  "
              defaultValue={"choose C"}
            >
              {categoryOptions.map((item, index) => (
                <option key={index}>{item.Value}</option>
              ))}
            </select>
            <select size={0} className="border-2 border-cnvsThemeColor p-2  ">
              {sortByDefault.map((item, index) => (
                <option key={index}>{item.Value}</option>
              ))}
            </select> */}
          </div>
        </div>
        <section className="bg-[#F3F3ED] flex flex-wrap  w-full h-auto ">
          <ProductCards categories={categories}/>
        </section>
      </div>
    </>
  );
}
