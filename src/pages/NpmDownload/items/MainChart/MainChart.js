// @flow
import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import _ from 'lodash'
import './MainChart.css'
import { fetchNpmDownload } from '../../data/api'
import { formatDownloadData } from '../../data/parse'
// import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Immutable from 'seamless-immutable'

type Props = {
  packageName: string,
  startDate: string,
  endDate: string,
  update: Boolean,
  classes: Object
}

type State = {
  initData: Object,
  breakdown: string
}

const breakdownList = ['day', 'week', 'month', 'year']

export default class MainChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.updateData()

    this.state = {
      initData: Immutable([]),
      breakdown: 'day'
    }
  }

  shouldComponentUpdate(prevProps: Props, preState: State) {
    if (
      this.props.update === prevProps.update &&
      this.state.initData === preState.initData &&
      this.state.breakdown === preState.breakdown
    ) {
      return false
    }
    return true
  }

  componentDidUpdate(prevProps: Object) {
    if (this.props.update !== prevProps.update) {
      this.updateData()
    }
  }

  async updateData() {
    const { packageName, startDate, endDate } = this.props
    let packages = packageName.split(',')
    let allData = []
    let proList = packages.map(async (v: string) => {
      try {
        let res = await fetchNpmDownload({
          packageName: _.trim(v),
          startDate,
          endDate
        })
        allData = allData.concat(res)
      } catch (e) {}
    })
    try {
      await Promise.all(proList)
      this.setState({
        initData: Immutable(allData)
      })
    } catch (error) {
      throw error
    }
  }

  parseChartOption(data: Array<Object>) {
    if (data.length === 0) {
      return {
        title: {
          text: ''
        },
        chart: {
          type: 'spline',
          height: 600
        },
        credits: {
          enabled: false
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
      credits: {
        enabled: false
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

  handleChangeBreakdown = (e: SyntheticEvent<>, value: string) => {
    this.setState({
      breakdown: value
    })
  }

  render() {
    const { initData, breakdown } = this.state
    const allData = formatDownloadData(initData, breakdown)
    const chartOption = this.parseChartOption(allData)
    return (
      <div>
        <div className="buttonGroupContainer">
          <ToggleButtonGroup
            className="buttonGroup"
            value={breakdown}
            exclusive={true}
            onChange={this.handleChangeBreakdown.bind(this)}
          >
            {breakdownList.map(bv => (
              <ToggleButton value={bv} key={bv}>
                {bv}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <Paper className="chartContainer">
          <HighchartsReact highcharts={Highcharts} options={chartOption} />
        </Paper>
      </div>
    )
  }
}
