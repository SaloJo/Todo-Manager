import { useState } from "react";
import {useDispatch} from 'react-redux';
import {authActions} from '../../store/auth';
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    dispatch(authActions.login())
  }

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5 form-el">
          <div className="wrap">
            <img
              className="img"
              alt=""
              src={require("../../assets/images/bg-1.jpg")}
            ></img>
            <div className="login-wrap p-4 p-md-5">
              <div className="d-flex">
                <div className="w-100">
                  <h3 className="mb-4">Sign In</h3>
                </div>
              </div>
              <form onSubmit={submitHandler} className="signin-form">
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label className="form-control-placeholder" for="username">
                    Username
                  </label>
                </div>
                <div className="form-group mt-4">
                  <input
                    id="password-field"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="form-control-placeholder" for="password">
                    Password
                  </label>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary rounded submit px-3"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
