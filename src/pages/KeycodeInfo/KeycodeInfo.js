import React, { Component } from 'react'
import './KeycodeInfo.css'

export default class KeycodeInfo extends Component {
  state = {
    key: '',
    keyCode: ''
  }
  componentDidMount() {
    document.addEventListener('keydown', e => {
      console.log(e)
      e.preventDefault()
      this.setState({
        key: e.key,
        keyCode: e.keyCode
      })
    })
  }

  render() {
    const { key, keyCode } = this.state
    return (
      <div className="keycodeInfoContainer">
        {keyCode ? (
          <>
            <div className="keycodeInfoKeycode">{keyCode}</div>
            <div className="keycodeInfoDetail">{key}</div>
          </>
        ) : (
          <div className="keycodeInfoPlaceholder">Press any key to get keycode</div>
        )}
      </div>
    )
  }
}
