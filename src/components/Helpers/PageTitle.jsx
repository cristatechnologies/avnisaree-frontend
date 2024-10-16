import BreadcrumbCom from "../BreadcrumbCom";

export default function PageTitle({ title, breadcrumb = [], isBecomeSeller }) {
  return (
    <div className="page-title-wrapper bg-[var(--primary-color)] w-full  h-[200px] p-[75px] ">
      <div className="container-x mx-auto">
        <div>
          <BreadcrumbCom
            paths={breadcrumb}
            isBecomeSeller={isBecomeSeller && isBecomeSeller}
          />
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold  text-[var(--secondary-color)]">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
