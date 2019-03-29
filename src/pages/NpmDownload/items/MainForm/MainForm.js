// @flow
import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'

const { Component } = React
const dateFormat = 'YYYY-MM-DD'

type Props = {
  packageName: string,
  startDate: string,
  endDate: string
}

type State = {
  packageName: string,
  startDate: string,
  endDate: string
}

export default class MainForm extends Component<Props, State>{
  static defaultProps = {
    packageName: 'react,vue',
    startDate: moment.utc().add(-30, 'd').format(dateFormat),
    endDate: moment.utc().add(-1, 'd').format(dateFormat)
  }

  constructor(props: Props) {
    super(props)
  
    console.log(this.props)
    this.state = Object.assign({}, this.props)
  }

  handleChangePackage = (name: string) => (event: SyntheticInputEvent<>) => {
    this.setState({
      [name]: event.target.value
    })
  }
  
  render() {
    const { packageName } = this.state
    return (
      <div>
         <TextField
          id="outlined-name"
          label="Package"
          value={packageName}
          onChange={this.handleChangePackage('packageName')}
          margin="normal"
          variant="outlined"
        />
      </div>
    )
  }
}
