// @flow
import React, { Component } from "react"
import MainForm from './items/MainForm'

export default class NpmDownload extends Component<{}>{
  
  render() {
    const params = new URLSearchParams(window.location.search)

    const formItem = ['packageName', 'startDate', 'endDate']
    const formInfo = formItem.reduce((pre, name: string) => {
      let value = params.get(name)
      if(value){
        pre[name] = value
      }
      return pre
    }, {})
    
    return (
      <div>
        <MainForm 
          {...formInfo}
        />
      </div>
    )
  }
}
