import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListOfLectures } from '../../views/ListofChapters/ListOfChapters';

import "./Sidebar.css";

export const Sidebar = () => {
    const { pathname } = useLocation();
    return (
        <>
            <div className="side-bar">
                <div className="content" style={{ width: "100%" }}>
                    {pathname === "/"
                        ? <>
                            <div className="shadow-sm mb-5 bg-body rounded" style={{ padding: "12.5px", marginBottom: "40px" }}>
                                <h2 align="center">Menu</h2>
                            </div>
                            <ul className='.sidebarUl'>
                                <Link to="/">
                                    <li className='sidebarli active'>Courses</li>
                                </Link>
                                <li className='sidebarli'>Discussions</li>
                            </ul>
                        </>
                        : <CustomSideBar />
                    }
                </div>
            </div>
        </>
    );
};

const CustomSideBar = () => {
    return (
        <>
            <div style={{ background: "darkgreen", padding: "12px", marginBottom: "40px" }}>
                <Link to="/">
                    <button className='backbutton mt-5 mx-5' align="center">&lt; Back</button>
                </Link>
            </div>
            <ListOfLectures />
            <br/>
            <h5 align="center">Get Certificate</h5>
            <br/>
        </>
    )
}