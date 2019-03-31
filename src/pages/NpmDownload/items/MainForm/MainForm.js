// @flow
import * as React from 'react'
// import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import MomentUtils from '@date-io/moment'
import './MainForm.css'
// import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '20px'
  },
  textField: {
    width: '120px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10
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

class MainForm extends React.Component<Props, State> {
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
        <div className="dateRangeContainer">
          <InlineDatePicker
            className={classes.textField}
            clearable
            label="Start"
            value={startDate}
            margin="normal"
            onChange={this.handleChangeDate('startDate')}
            format={'MM/DD/YYYY'}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
          <InlineDatePicker
            className={classes.textField}
            clearable
            label="End"
            value={endDate}
            margin="normal"
            onChange={this.handleChangeDate('endDate')}
            format={'MM/DD/YYYY'}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
        <div>
          <Paper className={classes.root} elevation={1}>
            <InputBase
              className={classes.input}
              value={packageName}
              onChange={this.handleChangeInput('packageName')}
              placeholder="Package"
            />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </MuiPickersUtilsProvider>
    )
  }
}

export default withStyles(styles)(MainForm)
