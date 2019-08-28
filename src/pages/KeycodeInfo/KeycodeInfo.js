import React, { Component } from 'react'
import './KeycodeInfo.css'

export default class KeycodeInfo extends Component {
  state = {
    key: '',
    keyCode: ''
  }

  handleKeydown = e => {
    e.preventDefault()
    this.setState({
      key: e.key,
      keyCode: e.keyCode,
      code: e.code
    })
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  render() {
    const { key, keyCode, code } = this.state
    return (
      <div className="keycodeInfoContainer">
        {keyCode ? (
          <>
            <div className="keycodeInfoKeycode">{keyCode}</div>
            <div className="keycodeInfoDetail">
              <div className="keycodeInfoDetailItem">
                <div className="keycodeInfoDetailItemLabel">key</div>
                {key}
              </div>
              <div className="keycodeInfoDetailItem">
                <div className="keycodeInfoDetailItemLabel">code</div>
                {code}
              </div>
            </div>
          </>
        ) : (
          <div className="keycodeInfoPlaceholder">Press any key to get keycode</div>
        )}
      </div>
    )
  }
}
