import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Spin, notification, Carousel } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "../../../components/UI/Image";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useGetSystemConfigQuery,
  useUploadBannerImgMutation,
} from "../../../redux/features/dashboard/dashboardApi";

const Banner = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadBannerImg, uploadBannerResult] = useUploadBannerImgMutation();
  const { data } = useGetSystemConfigQuery();
  const [api, contextHolder] = notification.useNotification();
  const handleToaster = (type, head, message) => {
    api[type]({
      message: head,
      description: message,
    });
  };

  const bannerImages = [
    data?.data?.banner1?.cloudinaryUrl,
    data?.data?.banner2?.cloudinaryUrl,
    data?.data?.banner3?.cloudinaryUrl,
  ];

  useEffect(() => {
    if (uploadBannerResult?.data?.statusCode === 200) {
      setLoading(false);
      setImages([]);
      handleToaster("success", "Success", uploadBannerResult?.data?.message);
    } else if (uploadBannerResult?.error?.status) {
      setLoading(false);
      setImages([]);
      handleToaster(
        "error",
        "Error",
        uploadBannerResult?.error.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadBannerResult]);

  const onLoadImage = (callBack, reader, id, file) => {
    reader.onload = () => {
      callBack((prev) => [
        ...prev,
        {
          bannerId: id,
          reader: reader.result,
          file: file,
        },
      ]);
    };
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      file.bannerId = e.target.id;
      reader.readAsDataURL(file);
      onLoadImage(setImages, reader, e.target.id, file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const uploadedImages = [];
    const bodyFormData = new FormData();

    bodyFormData.append("upload_preset", "wi9geu2m");
    bodyFormData.append("cloud_name", "dqlxcdlce");
    bodyFormData.append("folder", "insignia/banner");

    for (const item of images) {
      try {
        bodyFormData.append("file", item.file);
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dqlxcdlce/upload",
          bodyFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        uploadedImages.push({
          cloudinaryId: data.public_id,
          cloudinaryUrl: data.secure_url,
          bannerId: item.bannerId,
        });
      } catch (error) {
        setLoading(false);
        handleToaster("Something went wrong!", "error", "Error");
      }
    }

    if (uploadedImages.length) {
      const options = {
        data: uploadedImages,
      };
      uploadBannerImg(options);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        <div className="max-w-[600px]">
          <Carousel autoplay>
            {bannerImages.map((item, index) => (
              <Image
                key={index}
                src={item}
                className="w-full h-[200px] object-cover rounded-md"
              />
            ))}
          </Carousel>
        </div>
        <div className="my-2">
          <h1 className="text-brand__font__size__xl text-brand__detail__text">
            Banner Images
          </h1>
          <p className="text-primary">Note: Recommended size: 1280 * 1024</p>
        </div>

        <div className="flex justify-between gap-2 flex-col w-full">
          <div className="flex flex-col gap-2">
            <div className="text-primary font-brand__font__semibold flex-1">
              <input
                type="file"
                className="hidden"
                id="banner1"
                onChange={handleImage}
              />
              {images.find((item) => item.bannerId === "banner1") ? (
                <Image
                  src={
                    images.find((item) => item.bannerId === "banner1")?.reader
                  }
                  className="w-full h-[200px] object-cover"
                />
              ) : (
                <div className="w-full h-[200px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="banner1"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Banner 1</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold flex-1">
              <input
                type="file"
                className="hidden"
                id="banner2"
                onChange={handleImage}
              />
              {images.find((item) => item.bannerId === "banner2") ? (
                <Image
                  src={
                    images.find((item) => item.bannerId === "banner2")?.reader
                  }
                  className="w-full h-[200px] object-cover"
                />
              ) : (
                <div className="w-full h-[200px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="banner2"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Banner 2</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold flex-1">
              <input
                type="file"
                className="hidden"
                id="banner3"
                onChange={handleImage}
              />
              {images.find((item) => item.bannerId === "banner3") ? (
                <Image
                  src={
                    images.find((item) => item.bannerId === "banner3")?.reader
                  }
                  className="w-full h-[200px] object-cover"
                />
              ) : (
                <div className="w-full h-[200px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="banner3"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Banner 3</small>
                  </label>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="w-full flex justify-center">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
            </div>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={images.length < 1}
              className="bg-primary mt-3 w-full text-white uppercase rounded"
            >
              update
            </Button>
          )}
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Banner;
