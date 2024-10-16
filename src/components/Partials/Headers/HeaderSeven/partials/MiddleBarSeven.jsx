import NavbarSeven from "./NavbarSeven";

export default function MiddlebarSeven({ className }) {
    return (
      <div
        className={`w-full h-[66px] ${className}  bg-[var(--primary-color)]`}
      >
        <div className="relative h-full">
          <div className="flex justify-start items-center h-full ">
            <NavbarSeven className="quomodo-shop-nav-bar lg:block hidden" />
          </div>
        </div>
      </div>
    );
}
