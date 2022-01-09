import Menubar from './components/Menubar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import ListOfChapters from './views/ListofChapters/ListOfChapters';
import VideoLessons from './views/VideoLessons/VideoLessons';
import Quiz from './views/Quizzes/Quiz';


function App() {
  return (
    <>
      <Router>
        <div className='row w-100'>
          <Sidebar height={"100vh"} />
          <div style={{ width: "100%", paddingLeft: "270px"}}>
            <Menubar />
            <Switch>
              <Route exact path="/videos/chapter-:chapterId/lesson-:lessonId">
                <VideoLessons />
              </Route>
              <Route exact path="/videos/chapter-:chapterId/quiz-:quizId">
                <Quiz />
              </Route>
              <Route exact path="/">
                <ListOfChapters />
              </Route>

              {/* if Any other url is encountered then we should have our own 404 not found page! */}
              <Route path="/*">
                <div className='p-5'>
                  <p>404 Error page!</p>
                </div>
              </Route>

            </Switch>
          </div>
        </div>
      </Router>

    </>
  );
}

export default App;
