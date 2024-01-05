import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";

const LOGIN_URL = "/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user, password);
    setSuccess(true);
    setPassword("");
    setUser("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[30%]  shadow-sm border-2 border-gray-200 flex flex-col p-4 drop-shadow-md">
        {success ? window.location.replace("/") : null}
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
            placeholder="Username"
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
            ref={userRef}
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
