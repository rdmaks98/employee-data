import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserWorker } from "./redux/action/user_action";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const doHandleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (email.length < 3 || password.length < 3) {
      console.log("Please fill all details");
    } else {
      const payload = {
        email,
        password,
        // fcm_token: localStorage.getItem('fcmToken'),
        // is_web: true,
      };
      dispatch(loginUserWorker(payload));
    }
  };

  useEffect(() => {});

  return (
    <div className="center">
      <form className="form" onSubmit={doHandleFormSubmit}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account? <a href="">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
