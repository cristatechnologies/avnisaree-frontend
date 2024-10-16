import React from "react";
import axios from "axios";
import jsPDF from "jspdf";
import DateFormat from "../../../../../utils/DateFormat";
import Link from "next/link";
import ServeLangItem from "../../../Helpers/ServeLangItem";
import settings from "../../../../../utils/settings";
import auth from "../../../../../utils/auth";
import apiRequest from "../../../../../utils/apiRequest";

export default function OrderTab({ orders }) {
  const { currency_icon } = settings();

  const generateOrderPdf = (productId, orderId) => {
    if (auth) {
      axios
        .get(
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }api/user/order-pdf-web/${productId}?token=${auth().access_token}`,
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const blob = new Blob([res.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `Order_${orderId}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  return (
    <div>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                {ServeLangItem()?.Order}
              </td>
              <td className="py-4 whitespace-nowrap text-center">
                {ServeLangItem()?.Date}
              </td>
              <td className="py-4 whitespace-nowrap text-center">
                Product Quantity
              </td>
              <td className="py-4 whitespace-nowrap text-center">
                {ServeLangItem()?.Amount}
              </td>
              <td className="py-4 whitespace-nowrap  text-center">
                {ServeLangItem()?.Action}
              </td>
            </tr>
            {/* table heading end */}
            {orders &&
              orders.length > 0 &&
              orders.map((item, i) => (
                <tr key={i} className="bg-white border-b hover:bg-gray-50">
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">
                      #{item.order_id}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray  whitespace-nowrap">
                      {DateFormat(item.created_at)}
                    </span>
                  </td>
                  {/*<td className="text-center py-4 px-2">*/}
                  {/*  <span className="text-sm rounded text-green-500 bg-green-100 p-2">*/}
                  {/*    Complated*/}
                  {/*  </span>*/}
                  {/*</td>*/}
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-[var(--text-color)] whitespace-nowrap px-2 ">
                      {item.product_qty}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-[var(--text-color)] whitespace-nowrap px-2 ">
                      {currency_icon + item.total_amount}
                    </span>
                  </td>
                  <td className="py-4 flex justify-center">
                    <div className="flex space-x-2 rtl:space-x-reverse items-center">
                      {/* <Link href={`/order/${item.order_id}`}>
                        <div className="w-[116px] h-[46px] primary-bg text-[var(--text-color)] font-bold flex justify-center items-center cursor-pointer">
                          <span>{ServeLangItem()?.View_Details}</span>
                        </div>
                      </Link> */}
                      <div
                        className="w-[116px] h-[46px] primary-bg text-[var(--secondary-color)] font-bold flex justify-center items-center cursor-pointer"
                        onClick={() => generateOrderPdf(item.id, item.order_id)}
                      >
                        <span>Pdf bill</span>
                      </div>
                      <Link
                        href={`/dispute-order/${item.order_id}`}
                        rel="noopener noreferrer"
                        legacyBehavior>

                        <div className=" w-[126px] h-[46px] flex justify-center items-center cursor-pointer bg-[var(--primary-color)] ml-2">
                          <div className="flex rtl:space-x-reverse space-x-2 items-center">
                            <span className="text-sm font-bold text-[var(--secondary-color)]">
                              Dispute Order
                            </span>
                          </div>
                        </div>

                      </Link>
                      {/*{item.order_status === "0" && (*/}
                      {/*  <button*/}
                      {/*    type="button"*/}
                      {/*    className="text-green-500 text-sm font-semibold"*/}
                      {/*  >*/}
                      {/*    Review*/}
                      {/*  </button>*/}
                      {/*)}*/}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
