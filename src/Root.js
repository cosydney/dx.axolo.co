import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './App.js'
import SlackAuth from './components/auth/authSlack.js'
import { PrivateRoute } from './components/PrivateRoute'

export default function Root() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/app" element={<PrivateRoute />}>
            <Route exact path="/app" element={<h1 className="bg-red-500">coucou</h1>} />
          </Route>
          <Route exact path="/app1" element={<h1 className="bg-red-500">coucou</h1>} />

          <Route exact path="/auth/slack/callback" element={<PrivateRoute />}>
            <Route exact path="/auth/slack/callback" element={<SlackAuth />} />
          </Route>
          <Route path="*">{/* <Error /> */}</Route>
        </Routes>
      </Router>
    </div>
  )
}
