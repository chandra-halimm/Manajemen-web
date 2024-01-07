import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LOGIN_URL = "http://localhost:8000/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email: user,
        password: password,
      });

      const token = response.data.data;

      if (token) {
        setAuth({ email: user, password: password, token: token });
        alert("login success");
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
        console.log(err);
      } else if (err.response?.status === 400) {
        setErrMsg("Username or password incorrect");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  //
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[30%]  shadow-sm border-2 border-gray-200 flex flex-col p-4 drop-shadow-md">
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </section>
        <h2 className="text-center font-medium mx-[100] my-4 text-[20px]">
          LOGIN
        </h2>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            className="mb-4 p-3 border-2 rounded-md focus:border-sky-500 focus:outline-none active:border-sky-500 active:outline-none"
            type="text"
            placeholder="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <input
            className="mb-4 p-3 border-2 rounded-md focus:border-sky-500 focus:outline-none active:border-sky-500 active:outline-none"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button className="p-2 bg-sky-500 text-white rounded-md my-3 hover:bg-sky-800 duration-200 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
