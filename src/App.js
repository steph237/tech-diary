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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState({});
  const [hasAccount, setHasAccount] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);

  // });
  const register = async () => {
    clearError();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (err) {
      // eslint-disable-next-line default-case
      switch (err.code) {
        case "auth/email-already-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
      console.log(err.message);
    }
    setShowModal();
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
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
    setEmailError("");
    setPasswordError("");
  };

  // const validatePassword = () => {
  //   let isValid = true;
  //   if (password !== "" && confirmPassword !== "") {
  //     if (password !== confirmPassword) {
  //       isValid = false;
  //       setError("Passwords does not match");
  //     }
  //   }
  //   return isValid;
  // };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/entry" element={<Entry />} />
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
                emailError={emailError}
                passwordError={passwordError}
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
                emailError={emailError}
                passwordError={passwordError}
                showModal={showModal}
                setShowModal={setShowModal}
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
