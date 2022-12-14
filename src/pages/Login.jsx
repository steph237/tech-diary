import React from "react";
import "tailwindcss/tailwind.css";
import GetImages from "../components/Getimages";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function Login(props) {
  const { togglePassword, hasAccount, clearError, setUser, clearInputs } =
    props;

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/entry");
      console.log(user);
    } catch (error) {
      // eslint-disable-next-line default-case
      if (error.code === "auth/invalid-email") {
        setLoginEmailError("Enter valid email");
      } else if (error.code === "auth/user-disabled") {
        setLoginEmailError("User account has been disabled");
      } else if (error.code === "auth/user-not-found") {
        setLoginEmailError("User account does not exist please SignUp");
      } else {
        setLoginEmailError(error.message);
        setLoginPasswordError(error.message);
      }
    }
  };

  const authListener = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (user) {
        clearInputs();
        setUser(currentUser);
        navigate("/entry");
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authListener();
  }, []);

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
                placeholder="????????????????????????"
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
                  onClick={() => {
                    login();
                  }}
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
