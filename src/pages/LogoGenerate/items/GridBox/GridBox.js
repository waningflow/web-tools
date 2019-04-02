// @flow
import React, { PureComponent } from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

type Props = {
  gridNum: number
}

const GridNum = 51
const GridBgList = Array.from({ length: GridNum * GridNum }, (v, i) => i)

export default class GridBox extends PureComponent<Props> {
  render() {
    
    return (
      <GridList
        cellHeight={20}
        spacing={0}
        style={{ width: GridNum * 20 + 'px', height: GridNum * 20 + 'px' }}
        cols={GridNum}
      >
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
    )
  }
}
