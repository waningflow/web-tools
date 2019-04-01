// @flow
import Paper from '@material-ui/core/Paper'
import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './MainChart.css'
import { fetchNpmDownload } from '../../data/api'
import { formatDownloadData } from '../../data/parse'

type Props = {
  packageName: string,
  startDate: string,
  endDate: string,
  classes: Object
}

type State = {
  initData: Object
}

export default class MainChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.updateData()

    this.state = {
      initData: []
    }
  }

  async updateData() {
    const { packageName, startDate, endDate } = this.props
    let packages = packageName.split(',')
    let allData = []
    let proList = packages.map(async (v: string) => {
      let res = await fetchNpmDownload({ packageName: v, startDate, endDate })
      allData = allData.concat(res)
    })
    try {
      await Promise.all(proList)
      this.setState({
        initData: allData
      })
    } catch (error) {
      throw error
    }
  }

  parseChartOption(data: Array<Object>) {
    console.log(data)
    if (data.length === 0) {
      return {
        title: {
          text: ''
        },
        chart: {
          type: 'spline',
          height: 600
        }
      }
    }
    let dateList = data[0].downloads.map(v => v.day)
    let series: Array<Object> = data.map(v => {
      return {
        name: v.package,
        data: v.downloads.map(dv => dv.downloads),
        lineWidth: 1,
        marker: {
          radius: 2
        }
      }
    })
    let chartOption = {
      title: {
        text: ''
      },
      chart: {
        type: 'spline',
        height: 600
      },
      xAxis: {
        categories: dateList,
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Downloads'
        }
      },
      plotOptions: {
        series: {
          stacking: null
        }
      },
      tooltip: {
        shared: true
      },
      series: series
    }
    return chartOption
  }

  render() {
    const { initData } = this.state
    const allData = formatDownloadData(initData)
    const chartOption = this.parseChartOption(allData)
    return (
      <Paper className="chartContainer">
        <HighchartsReact highcharts={Highcharts} options={chartOption} />
      </Paper>
    )
  }
}
