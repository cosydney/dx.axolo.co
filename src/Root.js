import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './App.js'
import OnePageResult from './components/answers/onePageResult/index.js'
import QuestionResults from './components/answers/results/index.js'
import SlackAuth from './components/auth/authSlack.js'
import Error404 from './components/error404'
import { PrivateRoute } from './components/PrivateRoute'
import ManageContentQuestions from './components/questions/content/index.js'
import ScheduleQuestions from './components/questions/schedule/index.js'
import TeamSetting from './components/team/team/index.js'

export default function Root() {
  return (
    <div className="w-[100vw] font-sans">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/auth/slack/callback" element={<SlackAuth />} />
          <Route exact path="/testaccount" element={<SlackAuth type={'dummy'} />} />

          <Route exact path="/answers/results" element={<PrivateRoute />}>
            <Route exact path="/answers/results" element={<QuestionResults />} />
          </Route>

          <Route exact path="/answers/results/:sequencedId" element={<PrivateRoute />}>
            <Route
              exact
              path="/answers/results/:sequencedId"
              element={<OnePageResult />}
            />
          </Route>

          <Route exact path="/questions/schedule" element={<PrivateRoute />}>
            <Route exact path="/questions/schedule" element={<ScheduleQuestions />} />
          </Route>

          <Route exact path="/questions/content" element={<PrivateRoute />}>
            <Route exact path="/questions/content" element={<ManageContentQuestions />} />
          </Route>

          <Route exact path="/team/manage" element={<PrivateRoute />}>
            <Route exact path="/team/manage" element={<TeamSetting />} />
          </Route>

          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  )
}
