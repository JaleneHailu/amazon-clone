import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import {SlLocationPin} from "react-icons/sl"
import {BsSearch} from "react-icons/bs"
import {BiCart} from "react-icons/bi"
import logo from '../../assets/logo.ico'
import flag from '../../assets/logo.png'
import LowerHeader from './LowerHeader'

const Header = () => {
return (
    <>
    <section >
            <div className={classes.header_container}>
                <div className={classes.logo_container}>
                <Link href='./'>
                    <img src={logo} alt="" />
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
            <input type="text"/>
            <BsSearch />
            </div>
            <div className={classes.order_container}>
                <Link href='' className={classes.language}>
                    <img src={flag} alt="" />
                    <select>
                        <option value="">EN</option>
                    </select>
                </Link>
                <Link href="/Linkuth">
                    <div>
                        <p>Sign In</p>
                        <span>Account & List</span>
                    </div>
                </Link>
                <Link href="">
                    <p>returns</p>
                    <span>& Orders</span>
                </Link>
                <Link href="" className={classes.cart}>
                    <BiCart size={35} />
                    <span>0</span>
                </Link>
            </div>
            </div>
        </section>
        <LowerHeader />
        </>
)
}

export default Header