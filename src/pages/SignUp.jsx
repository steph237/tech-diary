import React from "react";
import "tailwindcss/tailwind.css";
import Modal from "../components/Modal";
import GetImages from "../components/Getimages";
import { Link, useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

function SignUp(props) {
  const {
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    passwordShown,
    setPasswordShown,
    togglePassword,
    register,
    hasAccount,
    setHasAccount,
    user,
    regEmailError,
    regPasswordError,
    logout,
  } = props;

  const navigate = useNavigate();

  return (
    <div className="flex mx-8 ">
      <div className="app-image mt-6">
        <GetImages />
      </div>
      <div>
        <div>
          <h1 className="text-slate-800 px-6 font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-14">
            {" "}
            Sign Up{" "}
          </h1>
        </div>
        <div className="form-content">
          <form className="p-6 " onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col pb-6">
              <label htmlFor="email">Enter Emails</label>
              <input
                autoFocus
                type="text"
                name="email"
                id="email"
                value={registerEmail}
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <p className="font-xs text-red-500">{regEmailError}</p>
            </div>

            <div className="pb-6">
              <label htmlFor="email">Create Password</label>

              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                id="password"
                value={registerPassword}
                placeholder="••••••••"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required=""
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <p className="font-xs text-red-500">{regPasswordError}</p>
              <div>
                <p
                  onClick={togglePassword}
                  className="cursor-pointer flex justify-end py-4 text-blue-400 text-sm"
                >
                  {" "}
                  Show Password{" "}
                </p>
              </div>
            </div>
            <div className="">
              {hasAccount}

              <div className="flex ">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500"
                  onClick={() => {
                    register();
                    navigate("/entry");
                  }}
                >
                  Create account
                </button>
                <Link to="/login">
                  <p className="ml-8 pt-2">
                    Already have an account
                    <span className="text-blue-500 mx-2 mouse-pointer hover:text-blue-700">
                      Login
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <h4> {user?.email}</h4>
        <button onClick={logout}>logout</button>
      </div>
      <Modal />
    </div>
  );
}

export default SignUp;
