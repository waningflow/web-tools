// @flow
import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import './Header.css'

type Props = {
  classes: Object
}
type State = {
  anchorEl: Object
}

const MenuConfig = [
  {
    name: 'NpmDownload',
    title: 'NPM Downloads',
    desc: 'Downloads statistic of NPM packages',
    path: '/npm-download'
  },
  {
    name: 'LogoGenerate',
    title: 'Logo Generate',
    desc: 'Generate logo like youtube',
    path: '/logo-generate'
  }
]

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  headerMenuItem: {
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
})

class Header extends React.Component<Props, State> {
  state = {
    anchorEl: null
  }

  handleOpenMenu = (e: SyntheticEvent<>) => {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  handleCloseMenu() {
    this.setState({
      anchorEl: null
    })
  }

  menuBoard() {
    const { classes } = this.props
    return (
      <Paper className="headerMenuBoard">
        {MenuConfig.map(menuItem => (
          <Link href={menuItem.path} underline="none" key={menuItem.name}>
            <div className={classes.headerMenuItem}>
              <Typography variant="subtitle1">{menuItem.title}</Typography>
              <Typography variant="subtitle2" style={{ color: '#aaa' }}>
                {menuItem.desc}
              </Typography>
            </div>
          </Link>
        ))}
      </Paper>
    )
  }

  toolsButton() {
    const { anchorEl } = this.state
    return (
      <div>
        <Button color="primary" onClick={this.handleOpenMenu.bind(this)}>
          <MenuIcon />
          Tools
        </Button>
        <Popover
          id="simple-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleCloseMenu.bind(this)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {this.menuBoard()}
        </Popover>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <div className="headerLogoImage" />
            {this.toolsButton()}
            <div className={classes.grow} />
            <Link href="https://github.com/waningflow" underline="none">
              <div className="githubLogoImage" />
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
