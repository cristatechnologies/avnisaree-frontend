import BreadcrumbCom from "../BreadcrumbCom";
import ServeLangItem from "../Helpers/ServeLangItem";
import DisputeOrderForm from "./DisputeOrderForm";
import { useRouter } from "next/router";

function DisputeOrder() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container-x mx-auto">
      <div className="w-full my-10">
        <BreadcrumbCom
          paths={[
            { name: ServeLangItem()?.home, path: "/" },
            { name: "Dispute Order", path: "/dispute-order" },
          ]}
        />
      </div>
      <div className="w-full bg-white xl:p-10 p-5">
        <div className="title-area w-full">
          <h1 className="text-[22px] font-bold text-[var(--text-color)] border-b border-slate-300 pb-3">
            Raise Dispute
          </h1>
        </div>

        <DisputeOrderForm id={id} />
      </div>
    </div>
  );
}

export default DisputeOrder;
