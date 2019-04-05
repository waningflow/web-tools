// @flow
import React, { Component } from 'react'
import { SketchPicker } from 'react-color'
import './ColorPicker.css'
import GridBox from '../GridBox'
import Popover from '@material-ui/core/Popover'
import PopupState, {
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/index'

type Props = {
  color: Object,
  onChange: Function
}

type State = {
  anchorEl: Object
}

class ColorPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      open: false,
      anchorEl: null
    }
  }

  shouldComponentUpdate(preProps: Props, preState: State) {
    if (
      this.props.color.r === preProps.color.r &&
      this.props.color.g === preProps.color.g &&
      this.props.color.b === preProps.color.b &&
      this.props.color.a === preProps.color.a &&
      Boolean(this.state.anchorEl) === Boolean(preState.anchorEl)
    ) {
      return false
    }
    return true
  }

  handleChangeColor = (color: Object) => {
    const { onChange } = this.props
    onChange(color.rgb)
  }

  render() {
    const { color } = this.props
    return (
      <div>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {popupState => (
            <div>
              <div {...bindTrigger(popupState)} className="colorPickerSwatch">
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
                      backgroundColor: `rgba(${color.r}, ${color.g}, ${
                        color.b
                      }, ${color.a})`
                    }}
                  />
                </div>
              </div>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <SketchPicker
                  color={color}
                  style={{ zIndex: 1000 }}
                  onChangeComplete={this.handleChangeColor}
                />
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    )
  }
}

export default ColorPicker
