import React, { Component } from 'react'
import './KeycodeInfo.css'

export default class KeycodeInfo extends Component {
  state = {
    keyCode: ''
  }
  componentDidMount() {
    document.addEventListener('keydown', e => {
      console.log(e)
      this.setState({
        keyCode: e.keyCode
      })
    })
  }

  render() {
    const { keyCode } = this.state
    return (
      <div className="keycodeInfoContainer">
        {keyCode ? (
          <div className="keycodeInfoKeycode">{keyCode}</div>
        ) : (
          <div className="keycodeInfoPlaceholder">Press any key to get keycode</div>
        )}
      </div>
    )
  }
}
