import SubscribeInputWidget from "./Helpers/SubscribeInputWidget";
export default function DiscountBanner({ className, datas }) {
  return (
    <div
      className={`w-full h-[320px]  flex justify-center items-end print:hidden  bg-[var(--primary-color)]${
        className || ""
      }`}
    >
      <div className="mb-[70px]">
        <div data-aos="fade-up">
          <h1 className="sm:text-3xl text-xl font-700 text-white mb-2 text-center">
            {datas.header}
          </h1>
          <p className="text-center sm:text-[18px] text-sm font-400 text-white">
            {datas.title}
          </p>
        </div>
        <SubscribeInputWidget />
      </div>
    </div>
  );
}
