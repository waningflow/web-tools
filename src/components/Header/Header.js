// @flow
import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import './Header.css'
import { withRouter } from 'react-router'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'

type Props = {
  classes: Object,
  history: Object
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

const githubUrl = 'https://github.com/waningflow'

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

  handleClickMenuItem(path) {
    this.handleLinkTo(path)
    this.handleCloseMenu()
  }

  menuBoard() {
    const { classes } = this.props
    return (
      <Paper className="headerMenuBoard">
        {MenuConfig.map(menuItem => (
          // <Link href={menuItem.path} underline="none" key={menuItem.name}>
          <div
            key={menuItem.name}
            className={classes.headerMenuItem}
            onClick={_ => this.handleClickMenuItem(menuItem.path)}
          >
            <Typography variant="subtitle1">{menuItem.title}</Typography>
            <Typography variant="subtitle2" style={{ color: '#aaa' }}>
              {menuItem.desc}
            </Typography>
          </div>
          // </Link>
        ))}
      </Paper>
    )
  }

  toolsButton() {
    const { anchorEl } = this.state
    return (
      <div>
        <IconButton color="primary" onClick={this.handleOpenMenu.bind(this)}>
          <MenuIcon />
        </IconButton>
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

  handleLinkTo(url) {
    const { history } = this.props
    history.push(url)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            {this.toolsButton()}
            <div className="headerLogoImage" />
            <div className={classes.grow} />
            <a href={githubUrl}>
              {/* <div className="githubLogoImage" /> */}
              <IconButton aria-label="Github">
                <SvgIcon style={{color: '#000'}}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </SvgIcon>
              </IconButton>
            </a>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(Header))
