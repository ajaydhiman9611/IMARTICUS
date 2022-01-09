import React, { useEffect, useState } from "react"
import axios from 'axios';
import string from "../../urlForBackend";
import './ListOfChapters.css'
import '../../App.css'
import { Accordion } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function ListOfChapters() {
    return (
        <>
            <div className="container w-75">
                <small>All courses &gt; Introduction to Machine Learning</small>
                <hr />
                <br/>
                <HeaderChapter />
                <ListOfLectures />
            </div>
        </>
    )
}

export function ListOfLectures() {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();

    const getOpenedKey = () => {
        if (pathname === "/") return "0";
        else {
            let temp = pathname.split("chapter-")[1].split("/")[0];
            // console.log("temp : ", temp)
            for (let i = 0; i < chapters.length; i++) {
                // console.log("chapters[", i, "]._id", chapters[i]._id, " and  temp : ", temp)
                if (chapters[i]._id == temp) return i;
            }
        }
    }

    useEffect(() => {
        getTheData();
    }, [])

    async function getTheData() {
        let { data } = await axios.get(`${string}/chapters/getAll`);
        console.log("Data : ", data);
        setChapters(data);
        setLoading(false);
    }

    if (loading) return <p className="p-3">Loading...!</p>
    return (
        <Accordion defaultActiveKey={getOpenedKey()} style={{ marginBottom: "40px" }}>
            {chapters.map((d, idx) => <List data={d} i={idx} />)}
        </Accordion>
    )
}

// Smaller components of the same page below =====================
const HeaderChapter = () => {
    return (
        <div className="card p-3 bg-body rounded">
            <div className="row no-margin">
                <div className="col-sm-4 col-md-3 col-lg-3 rvm-v1-crs-img-ctnr">
                    <div className="rvm-v1-crs-img" style={{ background: "url(https://cdn.eckovation.com/images/Introduction-to-Machine-Learning.png) center center / cover" }}>
                    </div>
                </div>
                <div className="col-sm-8 col-md-9 col-lg-9 rvm-v1-crs-meta-ctnr">
                    <h4>
                        Introduction to Machine Learning
                    </h4>
                    <h6 className="mt-3">0% Complete</h6>
                </div>
            </div>
        </div>
    )
}

const List = ({ data, i }) => {
    return (
        <Accordion.Item eventKey={i}>
            <Accordion.Header style={{ fontSize: "16px" }}>
                <p style={{ marginBottom: "0px" }}>{data.title}
                    <br />
                    <span style={{ fontSize: "14px" }}>
                        {data.lectures?.length} 
                        {data.lectures?.length > 1 ? " Lectures" : " Lecture"} 
                        &nbsp;&nbsp; 
                        {data.quizzes?.length > 0 && (<>{data.quizzes?.length} {data.quizzes?.length > 1 ? " Quizzes" : "Quiz" }</>)}
                    </span>
                </p>
            </Accordion.Header>
            <Accordion.Body style={{ padding: "2px" }}>
                <ul className="mt-2">
                    {data.lectures.length > 0 && data.lectures.map((lec, idx) => <Lectures id={data._id} data={lec} i={idx} />)}
                    {data.quizzes.length > 0 && (
                        <>
                            <hr style={{ color: "#9b9b9b", margin: "0px auto 12px auto", width: "95%" }} />
                            {data.quizzes.map((quiz, idx) => <Quizzes i={idx} id={data._id} data={quiz} />)}
                        </>
                    )}
                </ul>
            </Accordion.Body>
        </Accordion.Item>
    )
}

const Lectures = ({ id, data, i }) => {
    return (
        <Link key={i} to={`/videos/chapter-${id}/lesson-${data._id}`} >
            <li className="lecturesInList">
                <p className="lecturesInListP"><img src="https://learn.pegasus.imarticus.org/images/play-button.svg" alt="playbtn" />&nbsp;&nbsp;&nbsp;&nbsp;{i + 1}.&nbsp;&nbsp;{data.title}</p>
            </li>
        </Link>
    )
}

const Quizzes = ({ data, id, i }) => {
    return (
        <Link to={`/videos/chapter-${id}/quiz-${data._id}`} key={i}>
            <li className="lecturesInList">
                <p className="lecturesInListP">&nbsp;<img src="https://learn.pegasus.imarticus.org/images/quiz.svg" alt="playbtn" />&nbsp;&nbsp;&nbsp;&nbsp;{data.title}</p>
            </li>
        </Link>
    )
}