import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import ReactJson from 'react-json-view'
import './JsonParser.css'

export default class JsonParser extends Component {
  state = {
    inputStr: ''
  }

  parseJson = str => {
    let rtn = undefined
    try {
      rtn = JSON.parse(str)
    } catch (e) {
      console.error(str)
    }
    return rtn
  }

  handleChangeInput = e => {
    this.setState({
      inputStr: e.target.value
    })
  }

  render() {
    const { inputStr } = this.state
    const inputJson = this.parseJson(inputStr)
    return (
      <div className="jsonParserContainer">
        <div className="jsonParserInputContainer">
          <TextField
            fullWidth
            multiline
            variant="outlined"
            rows="5"
            onChange={this.handleChangeInput}
            placeholder="Paste json string here"
          />
        </div>
        <div className="jsonParserOutputContainer">
          <ReactJson
            src={inputJson}
            theme="monokai"
            displayDataTypes={false}
            style={{ padding: '6px', borderRadius: '3px', height: window.innerHeight - 300 }}
          />
        </div>
      </div>
    )
  }
}
