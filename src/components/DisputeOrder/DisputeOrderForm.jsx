import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import auth from "../../../utils/auth";
import ServeLangItem from "../Helpers/ServeLangItem";
import settings from "../../../utils/settings";
import { useRouter } from "next/router";

function DisputeOrderForm({ id }) {
  const router = useRouter();
  const MAX_IMAGE_SIZE_MB = 3;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
  const MAX_VIDEO_SIZE_MB = 10;
  const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;
  const profileImgInput = useRef(null);
  const videoInput = useRef(null);
  const description = useRef(null);
  const formRef = useRef(null);
  const [disputeProductDetails, setDisputeProductDetails] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState("");
  const [disputeProductList, setDisputeProductList] = useState([]);
  const [errors, setErrors] = useState(null);
  
  const getDisputeProductDetails = useCallback(() => {
    if (auth()) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/user/order-show/${id}?token=${
            auth().access_token
          }`
        )
        .then((res) => {
          setDisputeProductDetails([res.data?.order?.order_products]);
        });
    }
  }, []);

  const imgUploadChangeHandler = (e) => {
    const files = Array.from(e.target.files);
    let hasError = false;
  
    files.forEach((file) => {
      if (file.type.startsWith("video/")) {
        setErrors({
          ...errors,
          upload_Image: "Please upload image format files",
        });
        e.target.value = null;
        hasError = true;
      } else if (file.size > MAX_IMAGE_SIZE_BYTES) {
        setErrors({
          ...errors,
          upload_Image: `Image file size exceeds ${MAX_IMAGE_SIZE_MB} MB.`,
        });
        e.target.value = null;
        hasError = true;
      } else if (selectedImages.length + files.length <= 5) {
        setSelectedImages((prevImages) => [...prevImages, file]);
        const preview = URL.createObjectURL(file);
        setImagePreviews((prevPreviews) => [...prevPreviews, preview]);
        setErrors({
          ...errors,
          upload_Image: "",
        });
      }
    });
  
    if (!hasError && selectedImages.length + files.length > 5) {
      toast.error("You can select a maximum of 5 images");
    }
  };

  const removeImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

const handleVideoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.type.startsWith("video/")) {
      if (file.size > MAX_VIDEO_SIZE_BYTES) {
        setErrors({
          ...errors,
          upload_video: `Video file size exceeds ${MAX_VIDEO_SIZE_MB} MB.`,
        });
        e.target.value = null;
      } else {
        const videoUrl = URL.createObjectURL(file);
        setVideoPreview(videoUrl);
        setErrors({
          ...errors,
          upload_video: "",
        });
      }
    } else {
      setErrors({
        ...errors,
        upload_video: "Please upload a video format file.",
      });
      e.target.value = null;
    }
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      auth() &&
      description.current?.value &&
      videoInput?.current?.files[0] &&
      selectedImages.length > 0 &&
      disputeProductList.length > 0
    ) {
      const formData = new FormData();
      formData.append(
        "dispute_title",
        disputeProductList.length > 0 && disputeProductList
      );
      formData.append("dispute_description", description.current?.value);
      formData.append("order_products_id", id);
      formData.append("notes", description.current?.value);
      formData.append("files[0]", videoInput.current?.files[0], selectedImages);

      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}api/user/raise-dispute?token=${
          auth().access_token
        }`,
        data: formData,
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          formRef.current.reset();
          router.push('/profile#order');
          setImagePreviews([]);
          setVideoPreview("");
          setDisputeProductList([]);
          setErrors(null);
          toast.success(res.data && res.data.message);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response && err.response.data.errors);
          setErrors(err.response && err.response.data.errors);
        });
    } else {
      setErrors({
        disputeProduct:
          disputeProductList.length === 0
            ? "Please select product to raise dispute"
            : "",
        description: description.current?.value
          ? ""
          : "Please enter description",
        upload_video: videoInput?.current?.files[0]
          ? ""
          : "Please upload video",
        upload_Image: selectedImages.length === 0 ? "Please upload image" : "",
      });

      return false;
    }
  };

  useEffect(() => {
    getDisputeProductDetails();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-4" ref={formRef}>
      <p className="text-lg font-bold mb-5">Order Number: {id && id}</p>

      <label className="text-gray-500 text-sm">
        Select product to raise dispute<span className={"text-red-600"}>*</span>
      </label>

        <div className="mt-2">
          <div className="relative w-full overflow-x-auto overflow-style-none border border-[#EDEDED] box-border mb-2">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                {/* table heading */}
                <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                  <td className="w-12"></td>
                  <td className="py-4 whitespace-nowrap text-left pl-3">
                    {ServeLangItem()?.Product}
                  </td>
                  <td className="py-4 whitespace-nowrap  text-center w-28">
                    {ServeLangItem()?.quantity}
                  </td>
                  <td className="py-4 whitespace-nowrap text-center w-28">
                    {ServeLangItem()?.Price}
                  </td>
                  <td className="py-4 whitespace-nowrap text-center w-28">
                    {ServeLangItem()?.Total}
                  </td>
                </tr>
                <tbody>
                {/* table heading end */}
                
                {disputeProductDetails &&
                  disputeProductDetails[0]?.map((products, index) => {
                    const { product_name, product_id ,qty,unit_price} = products;
                    const { currency_icon } = settings();
                    return (
                      <Fragment key={index}>
                        <tr className="border-b border-gray-100 ">
                          <td className="text-center py-5">
                            <input
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const productName = e.target.name;
                                if (isChecked) {
                                  setDisputeProductList((prevSelectedValue) => [
                                    ...prevSelectedValue,
                                    productName,
                                  ]);
                                } else {
                                  setDisputeProductList((prevSelectedValue) =>
                                    prevSelectedValue.filter(
                                      (name) => name !== productName
                                    )
                                  );
                                }
                                setErrors({
                                  ...errors,
                                  disputeProduct: "",
                                });
                              }}
                              type="checkbox"
                              name={`${product_name}`}
                              checked={disputeProductList.includes(
                                product_name
                              )}
                              id={`${product_id}`}
                            />
                          </td>
                        
                          <td className="text-left pl-3">{product_name}</td>
                          <td className="text-center">{qty}</td>
                          <td className="text-center"><span>{currency_icon}</span>{unit_price}</td>
                          <td className="text-center"><span>{currency_icon}</span>{(unit_price * qty).toFixed(2)}</td>
                          </tr>
                          </Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {errors && Object.hasOwn(errors, "disputeProduct") ? (
          <span className="text-sm text-qred ">{errors.disputeProduct}</span>
        ) : (
          ""
        )}
    
      <div className="flex flex-col mt-5">
        <label className="text-gray-500 text-sm mb-3">
          Discription<span className={"text-red-600"}>*</span>
        </label>
        <textarea
          ref={description}
          onChange={() =>
            setErrors({
              ...errors,
              description: description?.current?.value
                ? ""
                : "Please enter description",
            })
          }
          name="description"
          placeholder="Description"
          className="p-2 border rounded resize-none mb-3"
          autoComplete="none"
        />
        {errors && Object.hasOwn(errors, "description") ? (
          <span className="text-sm text-qred">{errors.description}</span>
        ) : (
          ""
        )}

        <label className="text-gray-500 text-sm mb-5 mt-3">
          Upload Opening Video: <span className={"text-red-600"}>*</span> <span className="font-bold text-[10px] ml-3">limit 10 MB or 10,000 KB</span>
        </label>
        <input
          ref={videoInput}
          onChange={handleVideoChange}
          type="file"
          accept="video/*"
          className="hidden"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            videoInput.current.click();
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-56"
        >
          Select Video
        </button>
        {errors && Object.hasOwn(errors, "upload_video") ? (
          <span className="text-sm mt-1 text-qred">{errors.upload_video}</span>
        ) : (
          ""
        )}

        {videoInput && (
          <p className="text-sm mt-1">{videoInput.current?.value}</p>
        )}

        <label className="text-gray-500 text-sm mb-5 mt-5">
          Upload Image: <span className={"text-red-600"}>*</span> <span className="font-bold text-[10px] ml-3">limit 3 MB or 3,000 KB</span>
        </label>
        <input
          ref={profileImgInput}
          onChange={(e) => imgUploadChangeHandler(e)}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            profileImgInput.current.click();
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-56"
        >
          Select Images
        </button>

        {errors && Object.hasOwn(errors, "upload_Image") ? (
          <span className="text-sm mt-1 text-qred">{errors.upload_Image}</span>
        ) : (
          ""
        )}
        <div className="mt-4 flex flex-wrap flex-col sm:w-96 lg:w-96">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative m-2">
              {/* <div
                className="relative w-20 h-20 rounded overflow-hidden"
                style={{
                  backgroundImage: `url(${preview})`,
                  backgroundSize: "cover",
                }}
              /> */}
              <p className="text-sm mt-1 w-fit">{preview.split('blob:')}</p>
              <button
                onClick={(e) => {e.preventDefault();removeImage(index)}}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded mt-4"
      >
        Submit Product
      </button>
    </form>
  );
}

export default DisputeOrderForm;
