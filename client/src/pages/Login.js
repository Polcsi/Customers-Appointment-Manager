import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
// Redux Elements
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [adminValue, setAdminValue] = useState({
    username: `${localStorage["username"]}`,
    password: `${localStorage["password"]}`,
  });
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const checkboxRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || admin) {
      navigate("/");
    }
    dispatch(reset());
  }, [admin, isError, isLoading, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAdminValue({ ...adminValue, [name]: value });
    saveData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(adminValue));
  };

  const saveData = () => {
    let remember = checkboxRef.current.checked;
    if (remember) {
      if (
        usernameRef.current.value === "" &&
        passwordRef.current.value === ""
      ) {
        localStorage["checkbox"] = false;
      } else {
        localStorage["checkbox"] = true;
        localStorage["username"] = usernameRef.current.value;
        localStorage["password"] = passwordRef.current.value;
      }
    } else {
      localStorage["checkbox"] = false;
      localStorage["username"] = "";
      localStorage["password"] = "";
    }
  };

  useEffect(() => {
    checkboxRef.current.checked = JSON.parse(localStorage["checkbox"]);
  });

  return (
    <div className="login-page">
      {isLoading && <Spinner />}
      <div className="login-container">
        <div className="header">
          <h1>Sign in</h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              pattern="[A-Za-z0-9]{1,}"
              type="text"
              required
              autoComplete="off"
              name="username"
              value={adminValue.username}
              onChange={handleChange}
              ref={usernameRef}
            />
            <span>username</span>
          </div>
          <div className="form-control">
            <input
              pattern="[A-Za-z0-9]{1,}"
              type="password"
              required
              autoComplete="off"
              name="password"
              value={adminValue.password}
              onChange={handleChange}
              ref={passwordRef}
            />
            <span>password</span>
          </div>
          <button className="login-submit-btn" type="submit">
            sign in
          </button>
        </form>
        <div className="save-login">
          <span>Remember</span>
          <input
            type="checkbox"
            className="switch"
            onChange={saveData}
            ref={checkboxRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
