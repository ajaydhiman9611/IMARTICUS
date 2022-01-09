import axios from "axios"
import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { DetailsOfLecture, Pagination } from "../VideoLessons/VideoLessons"
import { useParams } from "react-router-dom"
import string from "../../urlForBackend"
import './Quiz.css'

const Quiz = () => {
    let { quizId } = useParams();
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getQuizData() {
            let { data } = await axios.get(`${string}/quizzes/${quizId}`);
            setQuiz(data);
            setLoading(false);
        }
        getQuizData();
    }, [])

    if (loading) return (<div className="container mb-3">
        <p><Link to="/" >All courses</Link> &gt; <Link to="/" >Introduction to Machine Learning</Link> &gt; {quiz?.title} </p>
        <hr />
        <div className="videoframe" >
            <p className="p-3 mt-5">Loading...!</p>
        </div>
    </div>)
    return (
        <>
            <div className="container mb-3" >
                <p><Link to="/" >All courses</Link> &gt; <Link to="/" >Introduction to Machine Learning</Link> &gt; {quiz?.title} </p>
                <hr />
                <div className="videoframe" >
                    <h2 className="mt-5 mb-5">{quiz.title}</h2>
                    <button className="btn btn-success mt-3" >Start Quiz</button>
                </div>
                <DetailsOfLecture style={{ marginTop: "20px" }} data={quiz} />
                <Pagination />
            </div>
        </>
    )
}

export default Quiz;