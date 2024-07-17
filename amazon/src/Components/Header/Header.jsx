import React from 'react'
import classes from './Header.module.css'
import {SlLocationPin} from "react-icons/sl"
import {BsSearch} from "react-icons/bs"
import {BiCart} from "react-icons/bi"
import logo from '../../assets/logo.jpg'
import flag from '../../assets/flag.png'

const Header = () => {
return (
    <section className=''>
            <div className={classes.header_container}>
                <div className={classes.logo_container}>
                <a href="">
                    <img src={logo} alt="" />
                </a>
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
            <input type="text" name='' id='' placeholder='search products' />
            <BsSearch />
            </div>
            <div>
                <div>
                    <img src={flag} alt="" />
                    <select>
                        <option value="">EN</option>
                    </select>
                </div>
                <a href="">
                    <div>
                        <p>Sign In</p>
                        <span>Account & List</span>
                    </div>
                </a>
                <a href="">
                    <p>returns</p>
                    <span>& Orders</span>
                </a>
                <a href="">
                    <BiCart />
                    <span>0</span>
                </a>
            </div>
            </div>
        </section>
)
}

export default Header