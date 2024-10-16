export const slider_settings = {
  dots: true,
  infinite: true,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  //   centerMode: true,
  centerPadding: "-40px",
  responsive: [
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 500,
      centerPadding: "0px",
      settings: {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 320,
      centerPadding: "0px",
      settings: {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
  //   speed: 8000,
  //   cssEase: "linear",
  // autoplay: true,
  // autoplaySpeed: 0,
  // pauseOnHover: false,
};
