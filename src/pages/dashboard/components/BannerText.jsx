import {
  useGetSystemConfigQuery,
  useUploadBannerTitleMutation,
} from "../../../redux/features/dashboard/dashboardApi";
import { Button, Form, Input, Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const BannerText = () => {
  const [uploadBannerTitle, { isSuccess, isLoading }] =
    useUploadBannerTitleMutation();
  const { data } = useGetSystemConfigQuery();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isSuccess) {
      const handleToaster = (type, head, message) => {
        api[type]({
          message: head,
          description: message,
        });
      };
      handleToaster("success", "Success", "Banner text updated!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onFinish = (values) => {
    const options = {
      data: values,
    };
    uploadBannerTitle(options);
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-brand__font__size__xl text-brand__detail__text my-2">
          Banner Title
        </h1>
        <p className="text-primary">
          Note: You can update title/sub-title at anytime
        </p>
      </div>

      <div className="py-2">
        <Form
          initialValues={{
            bannerText: data?.data?.bannerTitle?.bannerText,
            bannerSubText: data?.data?.bannerTitle?.bannerSubText,
          }}
          onFinish={onFinish}
        >
          <h1 className="text-brand__font__size__base">Banner Title</h1>
          <div>
            <Form.Item
              name="bannerText"
              rules={[
                {
                  required: true,
                  message: "Please input title!",
                },
              ]}
            >
              <Input.TextArea
                style={{
                  height: 120,
                }}
                placeholder="Title"
                className="text-brand__font__size__lg"
              />
            </Form.Item>
          </div>

          <h1 className="text-brand__font__size__base">Banner Subtitle</h1>
          <div>
            <Form.Item
              name="bannerSubText"
              rules={[
                {
                  required: true,
                  message: "Please input SubText!",
                },
              ]}
            >
              <Input.TextArea
                style={{
                  height: 410,
                }}
                placeholder="Subtitle"
                className="text-brand__font__size__lg"
              />
            </Form.Item>
          </div>

          {isLoading ? (
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
              type="primary"
              htmlType="submit"
              className="login-form-button bg-primary w-full"
            >
              update
            </Button>
          )}
        </Form>
      </div>
      {contextHolder}
    </div>
  );
};

export default BannerText;
