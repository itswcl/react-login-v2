import { useState } from 'react'
import { login } from "./utils";
import "./styles.css";

// ================ LOGIN FORM ====================
//
// Guidelines:
// * You have an incomplete login form.
// * You are not allowed to add any additional HTML elements.
// * You are not allowed to use refs.
//
// Tasks:
//  * The login button should trigger the login() action imported above and pass required data to it.
//  * Disable the Login button if email is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the login() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box (native Javascript alert) if login succeeds. Investigate the login function to find out how to log in successfully.

export default function LoginForm() {
  // state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // set error for error message to display on page
  const [error, setError] = useState(null)
  // loading in order to disable button while loading
  const [load, setLoad] = useState(false);

  // disable button as no email input / password less than 6 str / it's loading
  const disableButton = !email || password < 6 || load

  // handle login to trigger the login function from utils
  // async and await required because of promise
  const handleLogin = async () => {
    // reset error message while login
    setError(null)
    // logging in as loading true
    setLoad(true)
    try {
      // login function formwt
      await login({ email, password })
      // set the alert message
      alert("Success")
      // load is done reset load
      setLoad(false)

      // log in failed
    } catch (error) {
      // error message is object we need to access the message value
      setError(error.message)
      // load is done reset load
      setLoad(false)
    }

  }
  return (
    <div className="wrapper">
      {/* default value for both email and password */}
      {/* update input email and password */}
      {/* 1. value default 2. onClick state change */}
      <div className="row">
        <label htmlFor={"email"}>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} id={"email"} type={"email"} value={email} />
      </div>
      <div className="row">
        <label htmlFor={"password"}>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} id={"password"} type={"password"} value={password} />
      </div>

      {/* Place login error inside this div. Show the div ONLY if there are login errors. */}
      {
        // if error message is set
        error
          // display the error message
          ? <div className="errorMessage">{error}</div>
          // if no error message leave it empty
          : ""
      }

      <div className="button">
        {/* add onclick handle and disabled based on disableButton */}
        <button disabled={disableButton} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
