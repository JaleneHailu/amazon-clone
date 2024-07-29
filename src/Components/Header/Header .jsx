import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import logo from "../../assets/logo.png";
import flag from "../../assets/flag.png";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Calculate total items in basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Clear user data in context after sign out
      dispatch({ type: "SET_USER", user: null });
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">ALL</option>
            </select>
            <input type="text"></input>
            <BsSearch size={26} />
          </div>
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img src={flag} alt="Language Flag" />
              <select>
                <option value="">EN</option>
              </select>
            </Link>
            <div>
              {user ? (
                <div>
                  <p>Hello {user.email.split("@")[0]}</p>
                  <span onClick={handleSignOut} style={{ cursor: "pointer" }}>
                    Sign Out
                  </span>
                </div>
              ) : (
                <Link to="/auth">
                  <div>
                    <p>Hello, Sign In</p>
                    <span>Account & List</span>
                  </div>
                </Link>
              )}
            </div>
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{basket.length}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
