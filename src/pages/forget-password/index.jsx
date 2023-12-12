import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import { Form, Button, Input, Spin, notification } from "antd";
import { HiOutlineMail } from "react-icons/hi";
import { BiChevronLeft } from "react-icons/bi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { LoadingOutlined } from "@ant-design/icons";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import Title from "antd/es/typography/Title";
import { HashLink } from "react-router-hash-link";
import useToaster from "../../hooks/useToaster";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [forgetPassword, { data, error, isLoading }] =
    useForgetPasswordMutation();

  const {
    auth: { user },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  useEffect(() => {
    if (data?.statusCode === 200) {
      openNotificationWithIcon("success", "SUCCESS", data?.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
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

  const onFinish = (values) => {
    const options = {
      data: values,
    };
    forgetPassword(options);
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="border border-primary bg-white shadow-md rounded px-10 py-5 max-w-[380px] w-full">
        <div className="py-5 flex flex-col items-center justify-center text-primary gap-2 leading-tight">
          <AiOutlineExclamationCircle size={40} />
          <Title level={4}>Forgot Password</Title>
          <small className="text-brand__detail__text text-center">
            Enter your email and you&rsquo;ll get a link to reset your password.
          </small>
        </div>

        <Form
          name="normal_login"
          className="login-form w-full"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<HiOutlineMail className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item>
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
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
        <HashLink
          to="/"
          className="text-brand__font__size__sm flex items-center justify-center hover:text-primary duration-200"
        >
          <BiChevronLeft size={18} />
          <span>Back to Login</span>
        </HashLink>
      </div>
      {contextHolder}
    </section>
  );
};

export default ForgetPassword;
