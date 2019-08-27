import React, { Component } from 'react'
// import GitHubButton from 'react-github-btn'
// import { GithubUrl } from '../../config'

export default class Footer extends Component {
  render() {
    return (
      <>
        {/* <div>
          <GitHubButton href={GithubUrl} aria-label="Star waningflow/tools on GitHub">
            Star
          </GitHubButton>
        </div> */}
        <div style={{ color: '#aaa', fontSize: '14px', margin: '20px' }}>
          <span role="img" aria-label="website policy">
            ©️2019 waningflow.com All rights reserved.
          </span>
        </div>
      </>
    )
  }
}
