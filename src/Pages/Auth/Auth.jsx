import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import logo from "../../assets/image.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.redirect || "/";
  const msg = location.state?.msg || "";

  const authHandler = async (e) => {
    e.preventDefault();
    const action = e.target.name;

    if (action === "signIn") {
      setLoading((prevLoading) => ({ ...prevLoading, signIn: true }));
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        navigate(redirectPath, { replace: true });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading((prevLoading) => ({ ...prevLoading, signIn: false }));
      }
    } else if (action === "signUp") {
      setLoading((prevLoading) => ({ ...prevLoading, signUp: true }));
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        navigate(redirectPath, { replace: true });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading((prevLoading) => ({ ...prevLoading, signUp: false }));
      }
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {msg && (
          <small
            style={{
              color: "red",
              padding: "5px",
              textAlign: "center",
              fontWeight: "bold",
              margin: "15px",
              marginLeft: "15vh",
            }}
          >
            {msg}
          </small>
        )}
        <form>
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
            type="submit"
            onClick={authHandler}
            name="signIn"
            className={classes.login_signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="button"
          onClick={authHandler}
          name="signUp"
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ marginBottom: "15px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
