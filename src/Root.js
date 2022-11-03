import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './App.js'
import Feed from './components/Feed/index.js'
import { PrivateRoute } from './components/PrivateRoute'

export default function Root() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/app" element={<PrivateRoute />}>
            <Route exact path="/app" element={<Feed />} />
          </Route>
          <Route path="*">{/* <Error /> */}</Route>
        </Routes>
      </Router>
    </div>
  )
}
