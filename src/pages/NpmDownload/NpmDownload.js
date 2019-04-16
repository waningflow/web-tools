// @flow
import React, { Component } from 'react'
import MainForm from './items/MainForm'
import MainChart from './items/MainChart'
import moment from 'moment'

const dateFormat = 'YYYY-MM-DD'

const defaultParams = {
  packageName: 'react,vue',
  startDate: moment
    .utc()
    .add(-1, 'd')
    .add(-1, 'M')
    .format(dateFormat),
  endDate: moment
    .utc()
    .add(-1, 'd')
    .format(dateFormat)
}

const formItem = ['packageName', 'startDate', 'endDate']

type State = {
  packageName: string,
  startDate: string,
  endDate: string,
  update: number
}

export default class NpmDownload extends Component<{}, State> {
  constructor(props: {}) {
    super(props)

    const params = new URLSearchParams(window.location.search)

    this.state = formItem.reduce(
      (pre, name: string) => {
        let value = params.get(name)
        pre[name] = value || defaultParams[name]
        return pre
      },
      { }
    )
    this.state.update = 0
  }

  handleChange = (data: Object) => {
    this.setState(state => {
      return Object.assign({}, state, data)
    })
  }

  handleSubmit() {
    this.setState(state => {
      const formInfo = formItem.reduce((pre, name: string) => {
        let value = state[name]
        pre[name] = value || defaultParams[name]
        return pre
      }, {})
      return Object.assign({}, formInfo, { update: state.update + 1 })
    })
  }

  render() {
    const { packageName, startDate, endDate, update } = this.state
    return (
      <div>
        <MainForm
          packageName={packageName}
          startDate={startDate}
          endDate={endDate}
          onChange={this.handleChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        />
        <MainChart
          packageName={packageName}
          startDate={startDate}
          endDate={endDate}
          update={update}
        />
      </div>
    )
  }
}
