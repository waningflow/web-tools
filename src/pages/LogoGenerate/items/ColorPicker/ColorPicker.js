// @flow
import React, { Component } from 'react'
import { SketchPicker } from 'react-color'
import './ColorPicker.css'

type Props = {
  color: Object,
  onChange: Function
}

type State = {
  open: boolean
}

class ColorPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleChangeColor = (color: Object) => {
    const { onChange } = this.props
    onChange(color.rgb)
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClickClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { open } = this.state
    const { color } = this.props
    return (
      <div>
        <div
          className="colorPickerSwatch"
          onClick={this.handleClickOpen.bind(this)}
        >
          <div
            style={{
              minWidth: '20px',
              minHeight: '20px',
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${
                color.a
              })`
            }}
          />
        </div>

        {open && (
          <div className="colorPickPopover">
            <div
              className="colorPickerCover"
              onClick={this.handleClickClose.bind(this)}
            />
            <SketchPicker
              color={color}
              onChangeComplete={this.handleChangeColor}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ColorPicker
