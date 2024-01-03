import React from "react";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[30%]  shadow-sm border-2 border-gray-200 flex flex-col p-4 drop-shadow-md">
        <h2 className="text-center font-medium mx-[100] my-4 text-[20px]">
          LOGIN
        </h2>
        <input
          className="mb-4 p-3 border-2 rounded-md focus:border-sky-500 focus:outline-none active:border-sky-500 active:outline-none"
          type="text"
          placeholder="Username"
        />
        <input
          className="mb-4 p-3 border-2 rounded-md focus:border-sky-500 focus:outline-none active:border-sky-500 active:outline-none"
          type="password"
          placeholder="Password"
        />

        <button className="p-2 bg-sky-500 text-white rounded-md my-3 hover:bg-sky-800 duration-200 ">
          Submit
        </button>
      </div>
    </div>
  );
}
