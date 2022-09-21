import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Entry from "./pages/Entry/Entry";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regEmailError, setRegEmailError] = useState("");
  const [regPasswordError, setRegPasswordError] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  const [user, setUser] = useState({});
  const [hasAccount, setHasAccount] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const authListener = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (user) {
        clearInputs();

        setUser(currentUser);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authListener();
  }, []);

  const register = async () => {
    clearError();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setRegEmailError("Enter valid email");
      } else if (error.code === "auth/weak-password") {
        setRegPasswordError("Password must be more than 6 characters");
      } else if (error.code === "auth/email-already-in-use") {
        setRegEmailError("Email already in use");
      } else {
        setRegEmailError(error.message);
        setRegPasswordError(error.message);
      }
    }
  };

  const login = async () => {
    clearError();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
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

  const logout = async () => {
    await signOut(auth);
  };

  const clearInputs = () => {
    setRegisterEmail("");
    setRegisterPassword("");
    setLoginEmail("");
    setLoginPassword("");
  };

  const clearError = () => {
    setRegEmailError("");
    setRegPasswordError("");
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route logout={logout} path="/entry" element={<Entry />} />
          <Route
            path="/login"
            element={
              <Login
                loginEmail={loginEmail}
                loginPassword={loginPassword}
                setLoginPassword={setLoginPassword}
                setLoginEmail={setLoginEmail}
                passwordShown={passwordShown}
                setPasswordShown={setPasswordShown}
                togglePassword={togglePassword}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                loginEmailError={loginEmailError}
                loginPasswordError={loginPasswordError}
                setLoginEmailError={setLoginEmailError}
                setLoginPasswordError={setLoginPasswordError}
                login={login}
              />
            }
          />

          {/* <Route path="/" element={<App />} /> */}
          <Route
            path="/signUp"
            element={
              <SignUp
                registerEmail={registerEmail}
                registerPassword={registerPassword}
                setRegisterEmail={setRegisterEmail}
                setRegisterPassword={setRegisterPassword}
                passwordShown={passwordShown}
                setPasswordShown={setPasswordShown}
                togglePassword={togglePassword}
                register={register}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                regEmailError={regEmailError}
                regPasswordError={regPasswordError}
                setRegEmailError={setRegEmailError}
                setLoginPasswordError={setLoginPasswordError}
                user={user}
                setUser={setUser}
                logout={logout}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
