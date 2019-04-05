// @flow
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ColorPicker from './items/ColorPicker'
import Typography from '@material-ui/core/Typography'
import GridBox from './items/GridBox'
import FontPicker from 'font-picker-react'
import domtoimage from 'dom-to-image'
import Button from '@material-ui/core/Button'
import { createAndDownloadFile } from '../../utils'
import Slider from '@material-ui/lab/Slider'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

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
  direction: string
  // firstText: string,
  // lastText: string
}

const api_key = 'AIzaSyD5hekAz930QwvNrQe6orJBFL0TO5iH0_k'

const styles = theme => ({
  logoGenerateHandBar: {
    padding: '20px 15px',
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
    justifyContent: 'center',
    minWidth: 0
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
    // border: '2px solid',
    borderColor: theme.palette.secondary.main,
    fontSize: '60px',
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '1px'
  },
  logoGenerateText: {
    display: 'flex'
    // border: '1px solid',
    // borderColor: theme.palette.primary.main,
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

const firstText = 'Edit'
const lastText = 'Me'

class LogoGenerate extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      logoBackgroundColor: { r: 255, g: 0, b: 0, a: 1 },
      highlightBackgroundColor: { r: 255, g: 255, b: 255, a: 1 },
      firstTextColor: { r: 255, g: 255, b: 255, a: 1 },
      lastTextColor: { r: 255, g: 0, b: 0, a: 1 },
      highlightText: 'last',
      fontSize: 60,
      fontFamily: 'Ubuntu', // or Fira Sans Condensed or Oswald
      direction: 'row'
    }

    this.logoRef = React.createRef()
  }

  handleChangeColor = (name: string) => (color: Object) => {
    this.setState({
      [name]: color
    })
  }

  handleClickExport() {
    domtoimage.toBlob(this.logoRef.current).then(function(blob) {
      // window.saveAs(blob, 'my-node.png')
      createAndDownloadFile('my_node.png', blob)
    })
  }

  handleChangeFontSize(event, value) {
    this.setState({
      fontSize: value
    })
  }

  handleChangeDirection = event => {
    this.setState({ direction: event.target.value })
  }

  render() {
    const { classes } = this.props
    const {
      fontFamily,
      logoBackgroundColor,
      highlightBackgroundColor,
      firstTextColor,
      lastTextColor,
      fontSize,
      direction
    } = this.state
    const parseColor = color =>
      `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    return (
      <Grid container spacing={24} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={8} xl={8}>
          <div className={classes.logoGeneratePreviewContainer}>
            <GridBox gridNum={51} />
            <div className={classes.logoGenerateLogoFullContainer}>
              <div
                className={[
                  classes.logoGenerateLogoContainer,
                  'apply-font'
                ].join(' ')}
                style={{
                  backgroundColor: parseColor(logoBackgroundColor),
                  fontSize: fontSize + 'px',
                  flexDirection: direction
                }}
                ref={this.logoRef}
              >
                <div
                  className={classes.logoGenerateText}
                  style={{
                    padding: '0px 5px',
                    color: parseColor(firstTextColor)
                  }}
                  contentEditable={true}
                  spellCheck={false}
                >
                  {firstText}
                </div>
                <div
                  className={classes.logoGenerateText}
                  style={{
                    padding: '0px 5px',
                    borderRadius: '10px',
                    backgroundColor: parseColor(highlightBackgroundColor),
                    color: parseColor(lastTextColor)
                  }}
                  contentEditable={true}
                  spellCheck={false}
                >
                  {lastText}
                </div>
              </div>
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
            <div className={classes.logoGenerateInputContainer}>
              <div className={classes.logoGenerateLabel}>
                <Typography variant="subtitle2">Font Size</Typography>
              </div>
              <div className={classes.logoGenerateInput}>
                <Slider
                  value={fontSize}
                  min={30}
                  max={180}
                  step={1}
                  aria-labelledby="label"
                  onChange={this.handleChangeFontSize.bind(this)}
                />
              </div>
            </div>
            <div className={classes.logoGenerateInputContainer}>
              <div className={classes.logoGenerateLabel}>
                <Typography variant="subtitle2">Font Family</Typography>
              </div>
              <div className={classes.logoGenerateInput}>
                <FontPicker
                  apiKey={api_key}
                  activeFontFamily={fontFamily}
                  limit={50}
                  sort={'popularity'}
                  variants={['700']}
                  onChange={nextFont =>
                    this.setState({
                      fontFamily: nextFont.family
                    })
                  }
                />
              </div>
            </div>
            <div className={classes.logoGenerateInputContainer}>
              <div className={classes.logoGenerateLabel}>
                <Typography variant="subtitle2">Direction</Typography>
              </div>
              <div className={classes.logoGenerateInput}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="Direction"
                    name="direction"
                    value={direction}
                    row
                    onChange={this.handleChangeDirection.bind(this)}
                  >
                    <FormControlLabel
                      value="row"
                      control={<Radio color="primary" />}
                      label="Row"
                    />
                    <FormControlLabel
                      value="column"
                      control={<Radio color="primary" />}
                      label="Column"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickExport.bind(this)}
            style={{
              marginTop: '20px'
            }}
          >
            Export
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(LogoGenerate)
