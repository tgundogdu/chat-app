import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../redux/features/authSlice";
import Loader from "../components/loader/Loader";
import { UserServices } from "../services";
//import io from "../utils/socket";

const Protected = () => {
  const [status, setStatus] = useState("pending");
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      setStatus("denied");
    } else if (!user) {
      UserServices.getInfo()
        .then((response) => {
          dispatch(login(response));
          //io.connect();
          setStatus("success");
        })
        .catch(() => {
          setStatus("denied");
        });
    } else {
      setStatus("success");
    }
  }, [token, user, dispatch]);

  if (status === "pending") {
    return <Loader show />;
  } else if (status === "success") {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Protected;
