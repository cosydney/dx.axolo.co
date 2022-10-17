import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App.js'
import { PrivateRoute } from './components/PrivateRoute'

export default function Root() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/test" element={<PrivateRoute />}>
            <Route exact path="/test" element={<App />} />
          </Route>
          <Route path="*">{/* <Error /> */}</Route>
        </Routes>
      </Router>
    </div>
  )
}
