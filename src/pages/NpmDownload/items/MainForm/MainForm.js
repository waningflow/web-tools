// @flow
import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import './MainForm.css'

import {
  InlineDatePicker,
  MuiPickersUtilsProvider
} from 'material-ui-pickers'

const { Component } = React
const dateFormat = 'YYYY-MM-DD'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

type Props = {
  packageName: string,
  startDate: string,
  endDate: string,
  classes: Object
}

type State = {
  packageName: string,
  startDate: string,
  endDate: string
}

class MainForm extends Component<Props, State> {
  static defaultProps = {
    packageName: 'react,vue',
    startDate: moment
      .utc()
      .add(-30, 'd')
      .format(dateFormat),
    endDate: moment
      .utc()
      .add(-1, 'd')
      .format(dateFormat)
  }

  constructor(props: Props) {
    super(props)

    console.log(this.props)
    this.state = Object.assign({}, this.props)
  }

  handleChangeInput = (name: string) => (event: SyntheticInputEvent<>) => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangeDate = (name: string) => (value: string) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { packageName, startDate, endDate } = this.state
    const { classes } = this.props
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div>
          <TextField
            label="Package"
            value={packageName}
            onChange={this.handleChangeInput('packageName')}
            margin="normal"
            variant="outlined"
            fullWidth={true}
          />
        </div>
        <div>
          <InlineDatePicker
            className={classes.textField}
            keyboard
            clearable
            variant="outlined"
            label="Start Date"
            value={startDate}
            margin="normal"
            onChange={this.handleChangeDate('startDate')}
            format={'MM/DD/YYYY'}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
          <InlineDatePicker
            className={classes.textField}
            keyboard
            clearable
            variant="outlined"
            label="End Date"
            value={endDate}
            margin="normal"
            onChange={this.handleChangeDate('endDate')}
            format={'MM/DD/YYYY'}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
      </MuiPickersUtilsProvider>
    )
  }
}

export default withStyles(styles)(MainForm)
