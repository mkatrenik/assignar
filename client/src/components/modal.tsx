import * as React from 'react'
import { view } from 'react-easy-state'
import Modal from 'react-responsive-modal'
import { appState } from '../store'
import { MakeMosaic } from './mosaic'
import { TileRenderer } from '../interfaces'

@view
export class ModalCmp extends React.Component {
  box: HTMLDivElement | null = null

  /**
   * grab svg element and call upload
   */
  onUploadBtnClick = async () => {
    if (this.box) {
      // get svg elem from mosaic component, because there is no api for
      // getting back rendered svg
      const svg = this.box.querySelector('svg')

      if (svg) {
        await appState.upload(svg)
      } else {
        console.error(`Couldn't find svg!`)
      }
    }
  }

  render() {
    return (
      <div>
        <Modal
          open={appState.modalIsOpen}
          onClose={() => {
            appState.modalIsOpen = false
            appState.newLink = ''
          }}
          little
        >
          <div
            ref={box => (this.box = box)}
            style={{ marginTop: 30, minWidth: 100 }}
          >
            <select
              style={{ marginBottom: 10 }}
              value={appState.currentTileRenderer}
              onChange={ev =>
                (appState.currentTileRenderer = ev.currentTarget
                  .value as TileRenderer)
              }
            >
              <option value={TileRenderer.circleRenderer}>
                {TileRenderer.circleRenderer}
              </option>
              <option value={TileRenderer.halfToneRenderer}>
                {TileRenderer.halfToneRenderer}
              </option>
            </select>
            {appState.loading && <div>LOADING...</div>}
            {appState.selectedImage && (
              <>
                <MakeMosaic />
                {appState.loading === false && (
                  <div>
                    <button onClick={this.onUploadBtnClick}>Upload</button>
                  </div>
                )}
                {appState.newLink !== '' && (
                  <div>
                    <a target="_blank" href={appState.newLink}>
                      {appState.newLink}
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}
