import { Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";
import PersistLogin from "./components/PersistLogin";
import NotFoundScreen from "./pages/not-found";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PersistLogin />}>
          {publicRoutes.map(({ path, name, Component }) => (
            <Route key={name} path={path} element={<Component />} />
          ))}

          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Home />}>
              {privateRoutes.map(({ path, name, Component }) => (
                <Route
                  key={name}
                  path={path}
                  index={name === "dashboard"}
                  element={<Component />}
                />
              ))}
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </>
  );
}

export default App;
