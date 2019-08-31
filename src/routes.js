import React from 'react'
import { Router, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import './routes.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import ReactGA from 'react-ga'
import { createBrowserHistory as createHistory } from 'history'
import Loadable from 'react-loadable'

const history = createHistory()
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading
})
const NpmDownload = Loadable({
  loader: () => import('./pages/NpmDownload'),
  loading: Loading
})
const LogoGenerate = Loadable({
  loader: () => import('./pages/LogoGenerate'),
  loading: Loading
})
const KeycodeInfo = Loadable({
  loader: () => import('./pages/KeycodeInfo'),
  loading: Loading
})
const JsonParser = Loadable({
  loader: () => import('./pages/JsonParser'),
  loading: Loading
})

function AppRouter(params) {
  return (
    <Router history={history}>
      <Header />
      <div className="routeContainer">
        <Grid container spacing={0} justify={'center'}>
          <Grid item xs={12} md={10} xl={8}>
            <Route path="/" exact component={Home} />
            <Route path="/npm-download" exact component={NpmDownload} />
            <Route path="/logo-generate" exact component={LogoGenerate} />
            <Route path="/keycode-info" exact component={KeycodeInfo} />
            <Route path="/json-parser" exact component={JsonParser} />
            <Route path="/loading" exact component={Loading} />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </Router>
  )
}

export default AppRouter
