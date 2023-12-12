import ForgetPassword from "../pages/forget-password";
import ResetPassword from "../pages/reset-password";
import SignInScreen from "../pages/sign-in";

const publicRoutes = [
  { path: "/", name: "sign-in", Component: SignInScreen },
  {
    path: "/forget-password",
    name: "forget-password",
    Component: ForgetPassword,
  },
  {
    path: "/reset-password/:token",
    name: "reset-password",
    Component: ResetPassword,
  },
];

export default publicRoutes;
