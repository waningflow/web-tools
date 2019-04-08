import React, { Component } from 'react'
import GitHubButton from 'react-github-btn'

export default class Footer extends Component {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <div>
          <GitHubButton
            href="https://github.com/waningflow/tools"
            aria-label="Star waningflow/tools on GitHub"
          >
            Star
          </GitHubButton>
        </div>
        <div style={{ color: '#aaa', fontSize: '14px', margin: '20px' }}>
          <span>©️2019 waningflow.com All rights reserved.</span>
        </div>
      </div>
    )
  }
}
