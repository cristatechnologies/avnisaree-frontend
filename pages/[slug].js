import { useRouter } from "next/router";
import CustomPageCom from "../src/components/CustomPageCom";
import { useEffect } from "react";
import PageHead from "../src/components/Helpers/PageHead";
import SingleProductPage from "../src/components/SingleProductPage";

const SingleProduct = ({ data }) => {
  const router = useRouter();

  const customRouter = router.query.slug && `/${router.query.slug}`;
  useEffect(() => {
    if (router && !router.query.slug) {
      router.push("*");
    }
  });
  console.log(router.query.slug);

  return (
    <>
      <PageHead
        title={`${data.product && data.product.seo_title}`}
        metaDes={data.product && data.product.seo_description}
      />
      {router.query.slug && <SingleProductPage details={data} />}
    </>
  );
};
export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/product/${slug}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();

    if (!data || !data.product) {
      return { notFound: true };
    }

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
};

export default SingleProduct;
