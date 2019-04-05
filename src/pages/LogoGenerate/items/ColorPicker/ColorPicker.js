// @flow
import React, { Component } from 'react'
import { SketchPicker } from 'react-color'
import './ColorPicker.css'
import GridBox from '../GridBox'

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

  shouldComponentUpdate(preProps: Props, preState: State) {
    if (
      this.props.color.r === preProps.color.r &&
      this.props.color.g === preProps.color.g &&
      this.props.color.b === preProps.color.b &&
      this.props.color.a === preProps.color.a &&
      this.state.open === preState.open
    ) {
      return false
    }
    return true
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
              position: 'relative',
              width: '20px',
              height: '20px',
              overflow: 'hidden'
            }}
          >
            <GridBox gridNum={5} gridWidth={5} />
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${
                  color.a
                })`
              }}
            />
          </div>
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
