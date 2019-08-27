import React from 'react'
import { PulseLoader } from 'react-spinners'

const Loading = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'monospace'
    }}
  >
    <PulseLoader sizeUnit={'px'} size={18} margin="5px" color={'#247ba0'} loading={true} />
  </div>
)

export default Loading
