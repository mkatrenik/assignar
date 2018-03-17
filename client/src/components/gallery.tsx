import * as React from 'react'
import { view } from 'react-easy-state'
import { appState } from '../store'
import styled from 'styled-components'
import { ImgurImageSource } from '../interfaces'
import { ModalCmp } from './modal'
import { GalleryItemLocal } from '../models'

const Styled = styled.div`
  img {
    object-fit: cover;
    width: 100%;
    max-height: 200px;
  }
  .select {
    width: 100%;
  }
  .name {
    width: 100%;
  }
`

@view
export class Gallery extends React.Component {
  fetch() {
    appState.fetch({ subreddit: appState.imgurImageSourceValue })
  }

  async componentDidMount() {
    this.fetch()
  }

  handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = ev.currentTarget.files

    if (!fileList) return
    if (fileList.length === 0) return

    const file = fileList[0]

    const reader = new FileReader()
    reader.onload = evv => {
      const dataUrl = (evv.currentTarget as any).result
      appState.imagesLocal.push(new GalleryItemLocal(dataUrl))
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <Styled>
        <form
          onSubmit={ev => {
            this.fetch()
            ev.preventDefault()
          }}
        >
          <div className="grid">
            <div className="col-1">
              <select
                value={appState.imgurImageSourceType}
                className="select"
                onChange={ev => {
                  appState.imgurImageSourceType = ev.currentTarget.value as any
                }}
              >
                <option value={ImgurImageSource.subreddit}>Subreddit</option>
                <option value={ImgurImageSource.album}>Imgur album</option>
              </select>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="name"
                value={appState.imgurImageSourceValue}
                placeholder={
                  appState.imgurImageSourceType === ImgurImageSource.subreddit
                    ? 'Subreddit name (e.g. EarthPorn)'
                    : 'Album id or deleteHash'
                }
                onChange={ev =>
                  (appState.imgurImageSourceValue = ev.currentTarget.value)
                }
              />
            </div>
            <div className="col-1">
              <button type="submit">fetch</button>
            </div>
            <div className="col">
              Or upload your own{' '}
              <input
                type="file"
                name="image"
                onChange={this.handleFileChange}
                accept="image/*"
              />
            </div>
          </div>
        </form>
        <div>
          {appState.imagesLocal.length > 0 && (
            <>
              <h2>Local images</h2>
              <div className="grid">
                {appState.imagesLocal.slice(0, 12).map(i => (
                  <img
                    key={i.id}
                    onClick={() => {
                      appState.onImageClick(i)
                    }}
                    className="col-2"
                    src={i.link}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div>
          <h2>Imgur images</h2>
          <div className="grid">
            {appState.images
              .filter(i => i.link.match(/jpg$/))
              .slice(0, 12)
              .map(i => (
                <img
                  key={i.id}
                  onClick={() => {
                    appState.onImageClick(i)
                  }}
                  className="col-2"
                  src={i.link}
                />
              ))}
          </div>
        </div>
        {appState.modalIsOpen && <ModalCmp />}
      </Styled>
    )
  }
}
