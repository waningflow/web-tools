import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Home from './pages/Home'
import NpmDownload from './pages/NpmDownload'
import LogoGenerate from './pages/LogoGenerate'
import './routes.css'
import Header from './components/Header'

function AppRouter(params) {
  return (
    <Router>
      <Header />
      <div className="routeContainer">
        <Grid container spacing={24} justify={'center'}>
          <Grid item xs={12} md={10} xl={8}>
            <Route path="/" exact component={Home} />
            <Route path="/npm-download" exact component={NpmDownload} />
            <Route path="/logo-generate" exact component={LogoGenerate} />
          </Grid>
        </Grid>
      </div>
    </Router>
  )
}

export default AppRouter
