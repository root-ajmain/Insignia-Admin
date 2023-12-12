import axios from "axios";
import { useEffect, useState } from "react";
import Image from "../../../components/UI/Image";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useGetSystemConfigQuery,
  useUploadWindowImgMutation,
} from "../../../redux/features/dashboard/dashboardApi";
import { Button, Spin, notification, Carousel } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const WindowImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadWindowImg, uploadWindowImgResult] = useUploadWindowImgMutation();
  const { data } = useGetSystemConfigQuery();
  const [api, contextHolder] = notification.useNotification();

  const windowImages = [
    data?.data?.window1?.cloudinaryUrl,
    data?.data?.window2?.cloudinaryUrl,
    data?.data?.window3?.cloudinaryUrl,
    data?.data?.window4?.cloudinaryUrl,
  ];

  const handleToaster = (type, head, message) => {
    api[type]({
      message: head,
      description: message,
    });
  };

  useEffect(() => {
    if (uploadWindowImgResult?.data?.statusCode === 200) {
      setLoading(false);
      setImages([]);
      handleToaster("success", "Success", data?.message);
    } else if (uploadWindowImgResult?.error?.status) {
      setLoading(false);
      setImages([]);
      handleToaster(
        "error",
        "Error",
        uploadWindowImgResult?.error.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadWindowImgResult]);

  const onLoadImage = (callBack, reader, id, file) => {
    reader.onload = () => {
      callBack((prev) => [
        ...prev,
        {
          windowId: id,
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
      file.windowId = e.target.id;
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
    bodyFormData.append("folder", "insignia/window");

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
          windowId: item.windowId,
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
      uploadWindowImg(options);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        <div className="max-w-[600px]">
          <Carousel autoplay>
            {windowImages.map((item, index) => (
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
            Window Images
          </h1>
          <p className="text-primary">Note: Recommended size: 1280 * 1024</p>
        </div>

        <div className="flex justify-between gap-2 flex-col w-full">
          <div className="flex flex-col gap-2">
            <div className="text-primary font-brand__font__semibold flex-1">
              <input
                type="file"
                className="hidden"
                id="window1"
                onChange={handleImage}
              />
              {images.find((item) => item.windowId === "window1") ? (
                <Image
                  src={
                    images.find((item) => item.windowId === "window1")?.reader
                  }
                  className="w-full h-[148px] object-cover"
                />
              ) : (
                <div className="w-full h-[148px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="window1"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Window 1</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold flex-1">
              <input
                type="file"
                className="hidden"
                id="window2"
                onChange={handleImage}
              />
              {images.find((item) => item.windowId === "window2") ? (
                <Image
                  src={
                    images.find((item) => item.windowId === "window2")?.reader
                  }
                  className="w-full h-[148px] object-cover"
                />
              ) : (
                <div className="w-full h-[148px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="window2"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Window 2</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold flex-1">
              <input
                type="file"
                className="hidden"
                id="window3"
                onChange={handleImage}
              />
              {images.find((item) => item.windowId === "window3") ? (
                <Image
                  src={
                    images.find((item) => item.windowId === "window3")?.reader
                  }
                  className="w-full h-[148px] object-cover"
                />
              ) : (
                <div className="w-full h-[148px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="window3"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Window 3</small>
                  </label>
                </div>
              )}
            </div>

            <div className="text-primary font-brand__font__semibold flex-1">
              <input
                type="file"
                className="hidden"
                id="window4"
                onChange={handleImage}
              />
              {images.find((item) => item.windowId === "window4") ? (
                <Image
                  src={
                    images.find((item) => item.windowId === "window4")?.reader
                  }
                  className="w-full h-[148px] object-cover"
                />
              ) : (
                <div className="w-full h-[148px] object-cover border border-dotted border-primary relative">
                  <label
                    htmlFor="window4"
                    className="cursor-pointer flex flex-col justify-center items-center gap-1 h-full"
                  >
                    <AiOutlineCamera size={25} />
                    <small>Window 4</small>
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

export default WindowImages;
