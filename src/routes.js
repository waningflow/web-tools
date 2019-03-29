import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/Home'
import NpmDownload from './pages/NpmDownload'

function AppRouter(params) {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/npm-download" exact component={NpmDownload} />
    </Router>
  )
}

export default AppRouter
