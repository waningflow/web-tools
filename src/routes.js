import React from 'react'
import { Router, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import './routes.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ReactGA from 'react-ga'
import { createBrowserHistory as createHistory } from 'history'
import Loadable from 'react-loadable'

const history = createHistory()
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

const Loading = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'monospace'
    }}
  >
    Loading...
  </div>
)

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

function AppRouter(params) {
  return (
    <Router history={history}>
      <Header />
      <div className="routeContainer" style={{ minHeight: window.innerHeight - 150 }}>
        <Grid container spacing={24} justify={'center'}>
          <Grid item xs={12} md={10} xl={8}>
            <Route path="/" exact component={Home} />
            <Route path="/npm-download" exact component={NpmDownload} />
            <Route path="/logo-generate" exact component={LogoGenerate} />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </Router>
  )
}

export default AppRouter
