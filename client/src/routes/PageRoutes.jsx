import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Main from "../pages/Main";
import Error from "../pages/Error";
import ForgotPassword from "../pages/ForgotPassword";
import NewPassword from "../pages/NewPassword";
import Protected from "./Protected";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/newpassword" element={<NewPassword />} />
      <Route element={<Protected />}>
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default PageRoutes;
