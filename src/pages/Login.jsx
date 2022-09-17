import React from "react";
import "tailwindcss/tailwind.css";

import GetImages from "../components/Getimages";
import { Link } from "react-router-dom";

function Login(props) {
  const {
    passwordShown,
    setPasswordShown,
    togglePassword,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    setLoginEmailError,
    setLoginPasswordError,
    loginEmailError,
    loginPasswordError,
    loginEmail,
    setLoginEmail,
    loginPassword,
    login,
    setLoginPassword,
  } = props;

  return (
    <div className=" flex mx-8 ">
      <div className="app-image">
        <GetImages />
      </div>
      <div>
        <div>
          <h1 className="text-slate-800 px-6 font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-14">
            {" "}
            Log in
          </h1>
        </div>
        <div className="form-content">
          <form className="p-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col pb-6">
              <label htmlFor="email">Enter Emails</label>
              <input
                autoFocus
                type="text"
                id="email"
                name="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
              <p className="font-xs text-red-500">{loginEmailError}</p>
            </div>

            <div className="pb-6">
              <label htmlFor="email">Password</label>

              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                id="password"
                value={loginPassword}
                placeholder="••••••••"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required=""
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <p className="font-xs text-red-500">{loginPasswordError}</p>
            </div>

            <p
              onClick={togglePassword}
              class="cursor-pointer flex justify-end mb-4 text-blue-400 text-sm"
            >
              {" "}
              Show Password{" "}
            </p>

            <div className="">
              {hasAccount}
              <div className="flex ">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500"
                  onClick={login}
                >
                  Login
                </button>
                <Link to="/signUp">
                  <p className="ml-8 pt-2">
                    Dont have an account?
                    <span className="text-blue-500 mx-2 mouse-pointer hover:text-blue-700">
                      SignUp
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </form>
          <h1> </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
