import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Title from "antd/es/skeleton/Title";
import { Button, Form, Input, Spin, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import useCookie from "../../hooks/useCookie";
import { setAuth } from "../../redux/features/auth/authSlice";
import useToaster from "../../hooks/useToaster";

const ResetPassword = () => {
  const { handleSetCookie } = useCookie();
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location.state?.from?.pathname || "/";
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [resetPassword, { data, isLoading, error }] =
    useResetPasswordMutation();

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
      handleSetCookie(data?.data?.refreshToken);
      dispatch(setAuth(data?.data));
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
    values.token = token
    const options = {
      data: values,
    };
    resetPassword(options);
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="border border-primary bg-white shadow-md rounded px-10 py-5 max-w-[380px] w-full">
        <div className="py-5 flex flex-col items-center justify-center text-primary gap-2 leading-tight">
          <AiOutlineExclamationCircle size={40} />
          <Title level={4}>Forgot Password</Title>
          <small className="text-brand__detail__text text-center">
            Enter your new password to login.
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
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New password"
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
      </div>
      {contextHolder}
    </section>
  );
};

export default ResetPassword;
