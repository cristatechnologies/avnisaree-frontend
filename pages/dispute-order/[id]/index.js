import React from "react";
import PageHead from "../../../src/components/Helpers/PageHead";
import Layout from "../../../src/components/Partials/Layout";
import DisputeOrder from "../../../src/components/DisputeOrder";

function DisputeOrderDetail() {
  return (
    <>
      <PageHead title="Dispure Order" />
      <Layout childrenClasses="pt-0 pb-0">
        <DisputeOrder />
      </Layout>
    </>
  );
}
export default DisputeOrderDetail;
