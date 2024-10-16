import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import MyDocument from "./pdfDocument";

const DownloadPdf = (productDetails) => {
    console.log('prop', productDetails)
  return (
    <PDFDownloadLink
      document={<MyDocument data={productDetails && productDetails} />}
      // onClick={() => getOrderPdfDetails(item.order_id)}
      fileName={`Order-${productDetails.order_id}.pdf`}
    />
  );
};

export default DownloadPdf;
