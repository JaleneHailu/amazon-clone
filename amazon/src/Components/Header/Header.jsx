import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import logo from '../../assets/logo.ico';
import flag from '../../assets/logo.png';
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';

const Header = () => {
  const [{basket}, dispatch]=useContext(DataContext)

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
            <input type="text" />
            <BsSearch />
          </div>
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img src={flag} alt="Language Flag" />
              <select>
                <option value="">EN</option>
              </select>
            </Link>
            <Link to="/auth">
              <div>
                <p>Sign In</p>
                <span>Account & List</span>
              </div>
            </Link>
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
