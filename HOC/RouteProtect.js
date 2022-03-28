import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const RouteProtect = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    GetAndSet();
  }, []);

  const GetAndSet = async () => {
    const token = await Cookies.get("token");


    if (token) setIsLoggedIn(true);
  };

  return isLoggedIn ? children : null;
};

export default RouteProtect;