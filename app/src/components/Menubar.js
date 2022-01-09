import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function Menubar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Introduction to Machine Learning</a>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled">Disabled</a>
                    </li>
                </ul>

            </div>
        </nav>
    )
}