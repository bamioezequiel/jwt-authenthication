import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:3001/verifyUser",
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          toast(`Hi ${data.user}`, { theme: "dark" });
          setUser(data.user);
          console.log(data.user);
        }
      }
    };
    verifyUser();
  }, [cookies, removeCookie, navigate]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>
      <div className="private">
        <h2>Welcome</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <ToastContainer />
    </>
  );
}
