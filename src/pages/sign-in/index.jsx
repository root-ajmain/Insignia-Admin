import { useEffect } from "react";
import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, /* Checkbox, */ Form, Input, Spin, notification } from "antd";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAuth } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useCookie from "../../hooks/useCookie";
import { MdLockOutline } from "react-icons/md";
import useToaster from "../../hooks/useToaster";
import { HashLink } from "react-router-hash-link";

const SignInScreen = () => {
  const { handleSetCookie } = useCookie();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location.state?.from?.pathname || "/admin";
  const [login, { data, error, isLoading }] = useLoginMutation();
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
    const options = {
      data: values,
    };
    login(options);
  };

  return (
    <div className="h-screen flex justify-between bg-white">
      <div className="bg-login__bg bg-cover bg-center duration-300 basis-[0%] md:basis-[60%]" />
      <div className="duration-300 w-full md:basis-[40%] h-full flex flex-col items-center p-2.5 lg:p-10 border justify-center">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-[42px] h-[42px] bg-[#9C27B0] rounded-full flex justify-center items-center text-white text-brand__font__size__xl">
              <MdLockOutline />
            </div>
            <h3 className="text-brand__font__size__lg font-brand__font__semibold">
              Sign In
            </h3>
          </div>
          <div className="flex justify-center w-full">
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
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
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
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <div className="flex justify-end">
                  {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item> */}

                  <HashLink
                    to="/forget-password"
                    className="underline hover:underline text-primary"
                    href=""
                  >
                    Forgot password?
                  </HashLink>
                </div>
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
                    SIGN IN
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      {contextHolder}
    </div>
  );
};

export default SignInScreen;
