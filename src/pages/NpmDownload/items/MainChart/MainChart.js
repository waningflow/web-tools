// @flow
import Paper from '@material-ui/core/Paper'
import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './MainChart.css'

type Props = {
  packageName: string,
  startDate: string,
  endDate: string,
  classes: Object
}

type State = {
  chartOption: Object
}

export default class MainChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      chartOption: {
        title: {
          text: 'My chart'
        },
        series: [
          {
            data: [1, 2, 3]
          }
        ]
      }
    }
  }

  render() {
    const { chartOption } = this.state
    return (
      <Paper className="chartContainer">
        <HighchartsReact highcharts={Highcharts} options={chartOption} />
      </Paper>
    )
  }
}
