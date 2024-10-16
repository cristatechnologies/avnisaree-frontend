import Navbar from "./NavbarFour";

export default function MiddlebarFour({ className }) {
  return (
    <div className={`w-full h-[66px] ${className}  bg-[var(--primary-color)]`}>
      <div className="relative h-full">
        <div className="flex justify-start items-center h-full ">
          <Navbar className="quomodo-shop-nav-bar lg:block hidden" />
        </div>
      </div>
    </div>
  );
}
