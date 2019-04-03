// @flow
import React, { PureComponent } from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

type Props = {
  gridNum: number,
  gridWidth: number
}

export default class GridBox extends PureComponent<Props> {
  static defaultProps = {
    gridNum: 21,
    gridWidth: 25
  }

  render() {
    const { gridNum, gridWidth } = this.props
    const GridBgList = Array.from({ length: gridNum * gridNum }, (v, i) => i)
    return (
      <div style={{ width: gridNum * gridWidth + 'px', height: gridNum * gridWidth + 'px' , position: 'absolute'}}>
        <GridList cellHeight={gridWidth} spacing={0} cols={gridNum}>
          {GridBgList.map(tile => (
            <GridListTile
              key={tile}
              cols={1}
              style={{
                padding: 0,
                backgroundColor: tile % 2 === 0 ? '#fff' : '#eee'
              }}
            />
          ))}
        </GridList>
      </div>
    )
  }
}
