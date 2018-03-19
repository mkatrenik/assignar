import * as React from 'react'
import Mosaic from 'react-mosaic'
import { view } from 'react-easy-state'
import { appState } from '../store'
import { TileRenderer } from '../interfaces'

function circleRenderer(props: any) {
  return (
    <circle cx={props.x} cy={props.y} r={6} fill={props.fill} key={props.key} />
  )
}

function halfToneRenderer(props: any) {
  const r = (16777215 - Number('0x' + props.color)) / 16777215 * 6
  return (
    <circle cx={props.x} cy={props.y} r={r} fill={props.fill} key={props.key} />
  )
}

@view
export class MakeMosaic extends React.Component {
  render() {
    if (!appState.selectedImage) return null

    let { dataUrl, size } = appState.selectedImage

    // This is hack, due to bug in react-mosaic, they render on
    // componentWillReceiveProps, which is not called first time
    if (!dataUrl || !size) {
      dataUrl = ''
      size = { height: 0, width: 0 }
    }

    const renderer =
      appState.currentTileRenderer === TileRenderer.circleRenderer
        ? circleRenderer
        : halfToneRenderer

    return (
      <div>
        <Mosaic
          src={dataUrl}
          tileSize={12}
          width={size.width}
          height={size.height}
          tileRenderer={renderer}
        />
      </div>
    )
  }
}
