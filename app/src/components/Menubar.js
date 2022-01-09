import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function Menubar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-3 bg-body rounded">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Introduction to Machine Learning</a>
            </div>
        </nav>
    )
}