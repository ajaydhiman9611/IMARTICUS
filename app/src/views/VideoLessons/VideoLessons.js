import React, { useState, useEffect } from "react";
import { useLocation, useParams, Redirect, useHistory, Link } from 'react-router-dom';
import axios from "axios";
import string from "../../urlForBackend";
import './VideoLessons.css'
import { Tabs, Tab } from 'react-bootstrap';

const VideoLessons = () => {
    let { lessonId } = useParams();

    let [lectureData, setLectureData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("In Useeffect!", lessonId)
        async function getSpecificLectureDetails() {
            try {
                let { data } = await axios.get(`${string}/lectures/${lessonId}`)
                // console.log(data);
                setLectureData(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        getSpecificLectureDetails();
    }, [lessonId])

    if (loading) return (<div className="container mb-3">
        <div className="videoframe" >
            <p className="p-3 mt-5">Loading...!</p>
        </div>
    </div>)
    return (
        <>
            <div className="container mb-3">
                {Object.keys(lectureData).length > 0
                    ? <div className="videoframe" >
                        <h2 className="mt-5 mb-5">{lectureData.title}</h2>
                        A relevant video will play here!
                    </div>
                    : <p className="p-3">Error loading data from the server, Please try again!</p>
                }

                <DetailsOfLecture style={{ marginTop: "20px" }} data={lectureData} />
                <Pagination />
            </div>
        </>
    )
}

export default VideoLessons;



const DetailsOfLecture = ({ data, style }) => {
    return (
        <Tabs defaultActiveKey="about" style={style} id="tabsInVideoLessons" className="mb-3">
            <Tab eventKey="about" title="About">
                <p>{data.description}</p>
            </Tab>
            <Tab eventKey="Resources" title="Resources">
                <p>Resources</p>
            </Tab>
        </Tabs>
    )
}
export { DetailsOfLecture, Pagination };

const Pagination = () => {
    const [list, setList] = useState([]);
    const { pathname } = useLocation();

    let currPath = pathname.split("videos")[1].trim();
    console.log("currPath : ", currPath)

    useEffect(() => {
        getTheData();
    }, [])

    async function getTheData() {
        let { data } = await axios.get(`${string}/chapters/getAll`);
        console.log("Data : ", data);
        let newData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].lectures.length > 0) {
                for (let j = 0; j < data[i].lectures.length; j++) {
                    newData.push(`/chapter-${data[i]._id}/lesson-${data[i].lectures[j]._id}`)
                }
            }
            if (data[i].quizzes.length > 0) {
                for (let j = 0; j < data[i].quizzes.length; j++) {
                    newData.push(`/chapter-${data[i]._id}/quiz-${data[i].quizzes[j]._id}`)
                }
            }
        }
        console.log("New Data : ", newData)
        setList(newData);
    }
    let history = useHistory();

    const prev = () => {
        console.log("Prev Called")
        if (list[0] === currPath) { console.log("1st in list!"); return; }
        for (let i = 0; i < list.length; i++) {
            if (list[i] === currPath) {
                console.log("List[i] : ", list[i], " and currPath : ", currPath, " so the prev one is : ", list[i - 1]);
                // history.push(`/videos${list[i - 1]}`);
                return `/videos${list[i - 1]}`
            }
        }
    }

    const next = () => {
        console.log("Next Called")
        let n = list.length;
        if (list[n - 1] === currPath) { console.log("last in list!"); return; }
        for (let i = 0; i < list.length; i++) {
            if (list[i] === currPath) {
                console.log("List[i] : ", list[i], " and currPath : ", currPath, " so the prev one is : ", list[i + 1]);
                // history.push(`/videos${list[i + 1]}`);
                return `/videos${list[i + 1]}`
            }
        }
    }

    const curr = () => {
        return list.indexOf(currPath) + 1;
    }

    return (
        <div className="topic-head">
            <ul>
                <li style={{ cursor: "pointer" }}
                // onClick={prev}
                >
                    <Link to={prev}>
                        Previous
                    </Link>
                </li>
                <li><p>{curr()}/{list.length}</p></li>
                <li style={{ cursor: "pointer" }}
                //  onClick={next}
                >
                    <Link to={next}>
                        Next
                    </Link>
                </li>
            </ul>
        </div>
    )
}