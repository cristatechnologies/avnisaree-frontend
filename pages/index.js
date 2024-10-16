import settings from "../utils/settings";
import PageHead from "../src/components/Helpers/PageHead";
import StorePage from "../src/components/Themes/Store";
import StorePageThemeTwo from "../src/components/Themes/StoreThemeTwo";
import StorePageThemeThree from "../src/components/Themes/StoreThemeThree";
import StorePageThemeFour from "../src/components/Themes/StoreThemeFour";
import StorePageThemeFive from "../src/components/Themes/StoreThemeFive";
import StorePageThemeSeven from "../src/components/Themes/StoreThemeSeven";

export default function HomePage({ data }) {
  const { seoSetting } = data;
  const { selected_theme } = settings();
  console.log(data)

  const themeComponents = {
    theme1: StorePage,
    theme2: StorePageThemeTwo,
    theme3: StorePageThemeThree,
    theme4: StorePageThemeFour,
    theme5: StorePageThemeFive,
    theme7: StorePageThemeSeven
    // Add more themes as needed
  };
  const SelectedThemeComponent = themeComponents[selected_theme];
  return (
    <>
      <PageHead
        title={`${seoSetting.seo_title}`}
        metaDes={seoSetting.seo_description}
      />
      {/* < homepageData={data} /> */}
      <SelectedThemeComponent homepageData={data} />
    </>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/`);
  const data = await res.json();
  return { props: { data } };
}
