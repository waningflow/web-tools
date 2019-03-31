import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Home from './pages/Home'
import NpmDownload from './pages/NpmDownload'
import './routes.css'

function AppRouter(params) {
  return (
    <Router>
      <div className="routeContainer">
        <Grid container spacing={24} justify={'center'}>
          <Grid item xs={12} md={10} xl={8}>
            <Route path="/" exact component={Home} />
            <Route path="/npm-download" exact component={NpmDownload} />
          </Grid>
        </Grid>
      </div>
    </Router>
  )
}

export default AppRouter
