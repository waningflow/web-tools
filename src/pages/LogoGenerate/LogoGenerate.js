// @flow
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ColorPicker from './items/ColorPicker'
import Typography from '@material-ui/core/Typography'
import GridBox from './items/GridBox'

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
  fontFamily: string,
  firstText: string,
  lastText: string
}

const styles = theme => ({
  logoGenerateHandBar: {
    padding: '20px 0',
    borderRadius: '5px',
    border: '2px dashed',
    borderColor: theme.palette.secondary.main
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
  },
  logoGeneratePreviewContainer: {
    height: '600px',
    borderRadius: '5px',
    padding: '20px',
    // border: '2px dashed',
    // borderColor: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  logoGenerateLogoFullContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoGenerateLogoContainer: {
    padding: '20px',
    border: '2px solid',
    borderColor: theme.palette.secondary.main
  }
})

// const GridNum = 51
const ColorNameList = [
  {
    name: 'logoBackgroundColor',
    label: 'Background Color'
  },
  {
    name: 'highlightBackgroundColor',
    label: 'Highlight Color'
  },
  {
    name: 'firstTextColor',
    label: 'First Text Color'
  },
  {
    name: 'lastTextColor',
    label: 'Last Text Color'
  }
]

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
      fontFamily: '',
      firstText: 'You',
      lastText: 'Tube'
    }
  }

  handleChangeColor = (name: string) => (color: Object) => {
    this.setState({
      [name]: color
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container spacing={24} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={8} xl={8}>
          <div className={classes.logoGeneratePreviewContainer}>
            <GridBox gridNum={51} />
            <div className={classes.logoGenerateLogoFullContainer}>
              <div className={classes.logoGenerateLogoContainer} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <div className={classes.logoGenerateHandBar}>
            {ColorNameList.map(({ name, label }) => {
              return (
                <div className={classes.logoGenerateInputContainer} key={name}>
                  <div className={classes.logoGenerateLabel}>
                    <Typography variant="subtitle2">{label}</Typography>
                  </div>
                  <div className={classes.logoGenerateInput}>
                    <ColorPicker
                      color={this.state[name]}
                      onChange={this.handleChangeColor(name)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(LogoGenerate)
