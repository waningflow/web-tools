import React, { Component } from 'react'
import { MenuConfig } from '../../config'
// import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  headerMenuItem: {
    margin: 20,
    padding: 10,
    textAlign: 'left'
  },
  headerMenuItemTitle: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
})

class Home extends Component {
  handleClickMenuItem(url) {
    const { history } = this.props
    history.push(url)
  }

  menuBoard() {
    const { classes } = this.props
    return (
      <div>
        {MenuConfig.slice(1).map(menuItem => (
          <div key={menuItem.name} className={classes.headerMenuItem}>
            <Typography
              variant="subtitle1"
              className={classes.headerMenuItemTitle}
              onClick={_ => this.handleClickMenuItem(menuItem.path)}
            >
              {menuItem.title}
            </Typography>
            <Typography variant="subtitle2" style={{ color: '#aaa' }}>
              {menuItem.desc}
            </Typography>
          </div>
        ))}
      </div>
    )
  }

  render() {
    return <div>{this.menuBoard()}</div>
  }
}

export default withStyles(styles)(withRouter(Home))
