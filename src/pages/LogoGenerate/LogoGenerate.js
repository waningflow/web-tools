// @flow
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ColorPicker from './items/ColorPicker'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'

type Props = {
  classes: Object
}

type State = {
  logoBackgroundColor: Object,
  highlightBackgroundColor: Object,
  firstTextColor: Object,
  lastTextColor: Object,
  highlightText: string,
  fontSize: number,
  fontFamily: string
}

const styles = theme => ({
  logoGenerateHandBar: {
    minHeight: '300px',
    borderRadius: '5px',
    border: '2px dashed',
    borderColor: theme.palette.primary.main
  },
  logoGenerateInputContainer: {
    display: 'flex',
    height: '50px'
  },
  logoGenerateLabel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoGenerateInput: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

// const GridNum = 51

class LogoGenerate extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      logoBackgroundColor: { r: 244, g: 0, b: 0, a: 1 },
      highlightBackgroundColor: { r: 255, g: 255, b: 255, a: 0 },
      firstTextColor: { r: 255, g: 255, b: 255, a: 0 },
      lastTextColor: { r: 255, g: 255, b: 255, a: 0 },
      highlightText: 'last',
      fontSize: 60,
      fontFamily: ''
    }
  }
  render() {
    const { classes } = this.props
    const { logoBackgroundColor } = this.state
    return (
      <Grid container spacing={0} style={{marginTop: '20px'}}>
        <Grid item xs={12} md={9} xl={9} />
        <Grid item xs={12} md={3} xl={3}>
          <div className={classes.logoGenerateHandBar}>
            <div className={classes.logoGenerateInputContainer}>
              <div className={classes.logoGenerateLabel}>
                <Typography variant="subtitle2">Background Color</Typography>
              </div>
              <div className={classes.logoGenerateInput}>
                <ColorPicker color={logoBackgroundColor} />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(LogoGenerate)
