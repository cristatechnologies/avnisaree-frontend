import React from "react";
import CustomPageCom from "../../src/components/CustomPageCom";
import { useRouter } from "next/router";

const DynamicPage = () => {
  const router = useRouter();
  const customRouter = router.query.slug && `/pages/${router.query.slug}`;

  return (
    <>
      <CustomPageCom slug={customRouter} />
    </>
  );
};

export default DynamicPage;

// export default function PageWrap ()
// {
//   try {
//     const router = useRouter();
//     console.log(router.query.custom)
//   return (
//     <>
//       <CustomPageCom slug={router.query.custom} />

//     </>
//   );
//   } catch (error) {
//     console.log("router try catch error",error)
//   }

// }
