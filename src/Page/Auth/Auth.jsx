import React, { useState, useContext,useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./auth.module.css";
import { auth } from "../../Utility/fireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { Type } from "../../Utility/actiontype";
import { ClipLoader } from "react-spinners";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signin: false, signup: false });

  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);
  const navigate = useNavigate();
  const navstateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading({ ...loading, signin: true, signup: true }); // Start loading

      if (e.target.name === "signin") {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        console.log(user);
        console.log(userInfo.user);
        setLoading({ ...loading, signin: false }); // Stop loading for signin
        navigate(navstateData?.state?.redirect || "/");
      } else {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signup: false }); // Stop loading for signup
        navigate(navstateData?.state?.redirect || "/");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading({ ...loading, signin: false, signup: false }); // Stop loading on error
    }
  };
  
 

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className={classes.logincontainer}>
        <h1>Sign In</h1>
        {navstateData?.state?.msg && (
          <small
            style={{
              style: "50px",
              padding: "5px",
              textAlign: "center",
              fontWeight: "bold",
              color: "red",
            }}
          >
            {navstateData.state.msg}
          </small>
        )}
        {/* Display error message */}
        <form onSubmit={authHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            name="signin" // Ensure this is correct
            type="submit"
            onClick={authHandler}
            className={classes.login_button_wrapper}
          >
            {loading.signin ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        <p>
          By signing in, you agree to the AMAZON FAKE CLONE conditions of use &
          sale. Please see our privacy service, cookies notice, and
          interest-based ads notice.
        </p>
        <button
          name="signup" // Ensure this matches
          type="submit"
          onClick={authHandler}
          className={classes.login__registerbutton}
        >
          {loading.signup ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "  Create your Account"
          )}
        </button>
        {error && <p style={{ paddingTop: "50px", color: "red" }}>{error}</p>}
      </div>
    </section>
  );
};

export default Auth;
