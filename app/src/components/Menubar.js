import React from 'react'
import { BiUser } from "react-icons/bi";

export default function Menubar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-3 bg-body rounded">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Introduction to Machine Learning</a>
                <ul className="navbar-nav mb-2 ml-auto">
                    <li className="nav-item">
                        <a className="nav-link disabled">
                            <BiUser />&nbsp;&nbsp;
                            {/* <FaUserSecret /> */}
                            Hello, Ajay!
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}