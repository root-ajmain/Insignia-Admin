import { Button, Typography, Form, Input, notification, Spin } from "antd";
import { useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import useToaster from "../../hooks/useToaster";
import { LoadingOutlined } from "@ant-design/icons";
const { Title } = Typography;

const AdminProfile = () => {
  const [form] = Form.useForm();
  const {
    auth: { user },
  } = useAppSelector((state) => state);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [changePassword, { data, isLoading, error }] =
    useChangePasswordMutation();

  const onFinish = (values) => {
    const options = {
      data: values,
    };
    changePassword(options);
  };

  useEffect(() => {
    if (data?.statusCode === 200) {
      setIsPasswordOpen(false);
      form.resetFields();
      openNotificationWithIcon("success", "SUCCESS", data?.message);
    }
    if (error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <section className="bg-white p-5 rounded-md max-w-screen-xl mx-auto w-full shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Title level={2}>
            <span className="text-[#D65050]">Hello,</span> {user?.firstName}
          </Title>
        </div>
      </div>

      <div className="py-2">
        <div className="flex py-4 border-b">
          <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
            <span>ID</span>
          </div>
          <div className="flex-1 font-brand__font__semibold flex gap-x-1">
            {user?.userId}
          </div>
        </div>
        <div className="flex py-4 border-b">
          <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
            <span>Name</span>
          </div>
          <div className="flex-1 font-brand__font__semibold flex gap-x-1">
            <span>{user?.firstName}</span>
            <span>{user?.lastName}</span>
          </div>
        </div>
        <div className="flex py-4 border-b">
          <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
            <span>Email</span>
          </div>
          <div className="flex-1 font-brand__font__semibold">
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="flex py-4 border-b">
          <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
            <span>Role</span>
          </div>
          <div className="flex-1 font-brand__font__semibold uppercase">
            <span>{user?.role}</span>
          </div>
        </div>

        <div className="flex py-4 border-b">
          <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
            <span>Updated At</span>
          </div>
          <div className="flex-1 font-brand__font__semibold">
            <span>{user?.updatedAt}</span>
          </div>
        </div>
        <div className="flex py-4 border-b">
          <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
            <span>Created At</span>
          </div>
          <div className="flex-1 font-brand__font__semibold">
            <span>{user?.createdAt}</span>
          </div>
        </div>
        <br />
        <br />
      </div>

      {isPasswordOpen ? (
        <Form
          form={form}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <div>
              <Input.Password />
              <small>Must contain symbol, number</small>
            </div>
          </Form.Item>

          <div className="w-full flex items-center justify-end">
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
              <div className="flex items-center justify-center gap-x-2">
                <Button
                  onClick={() => setIsPasswordOpen((prev) => !prev)}
                  className="border border-primary px-4 py-1 rounded-md text-primary"
                >
                  Close
                </Button>
                <Form.Item className="mt-5">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-primary"
                  >
                    Save
                  </Button>
                </Form.Item>
              </div>
            )}
          </div>
        </Form>
      ) : (
        <div className="flex py-4">
          <div className="max-w-[170px] md:max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
            <span>Password</span>
          </div>
          <div className="flex-1 font-brand__font__semibold text-primary">
            <Button onClick={() => setIsPasswordOpen((prev) => !prev)}>
              Change Password ?
            </Button>
          </div>
        </div>
      )}

      {contextHolder}
    </section>
  );
};

export default AdminProfile;
