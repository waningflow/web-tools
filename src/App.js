import React, { Component } from 'react'
import './App.css'
import AppRouter from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Header from './components/Header'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(36, 123, 160, 1)',
      contrastText: '#fff'
    },
    secondary: {
      main: 'rgba(112, 193, 179, 1)',
      contrastText: '#fff'
    }
  },
  status: {
    danger: 'rgba(255, 22, 84, 1)'
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    useNextVariants: true,
    htmlFontSize: 16
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <div className="App">
          <AppRouter />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
