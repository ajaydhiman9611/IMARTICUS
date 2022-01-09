import axios from "axios"
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

    if (loading) return <p className="p-3">Loading...!</p>
    return (
        <>
            <div className="container mb-3" >
                <div className="p-5" style={{ textAlign: "center" }}>
                    <h2>{quiz.title}</h2>
                    <button className="btn btn-success mt-5">Start the quiz</button>
                </div>
                <DetailsOfLecture style={{ marginTop: "150px" }} data={quiz} />
                <Pagination />
            </div>
        </>
    )
}

export default Quiz;