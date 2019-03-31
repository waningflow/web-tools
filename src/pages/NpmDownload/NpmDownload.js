// @flow
import React, { Component } from 'react'
import MainForm from './items/MainForm'
import MainChart from './items/MainChart'
import moment from 'moment'

const dateFormat = 'YYYY-MM-DD'

export default class NpmDownload extends Component<{}> {
  render() {
    const params = new URLSearchParams(window.location.search)

    const defaultParams = {
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

    const formItem = ['packageName', 'startDate', 'endDate']
    const formInfo = formItem.reduce((pre, name: string) => {
      let value = params.get(name)
      pre[name] = value || defaultParams[name]
      return pre
    }, {})

    return (
      <div>
        <MainForm {...formInfo} />
        <MainChart {...formInfo} />
      </div>
    )
  }
}
