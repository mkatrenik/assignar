import * as React from 'react'
import { view } from 'react-easy-state'
import { appState } from '../store'
import styled from 'styled-components'
import { ImgurImageSource } from '../interfaces'
import { ModalCmp } from './modal'
import { GalleryItemLocal } from '../models'
import { fileReaderPromised } from '../utils'

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
  constructor(props: any) {
    super(props)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  async componentDidMount() {
    appState.fetch()
  }

  async handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const fileList = ev.currentTarget.files

    if (!fileList) return
    if (fileList.length === 0) return

    const dataUrl = await fileReaderPromised(fileList[0])

    appState.imagesLocal.push(new GalleryItemLocal(dataUrl))
  }

  render() {
    return (
      <Styled>
        <form
          onSubmit={ev => {
            appState.imagesCurrentPage = 0
            appState.fetch()
            ev.preventDefault()
          }}
        >
          <div className="grid">
            <div className="col-1">
              <select
                value={appState.imgurImageSourceType}
                className="select"
                onChange={ev => {
                  appState.imgurImageSourceValue = ''
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
                    ? 'Subreddit name (e.g. EarthPorn or aww)'
                    : 'Album id (uploads album is K5Ror)'
                }
                onChange={ev =>
                  (appState.imgurImageSourceValue = ev.currentTarget.value)
                }
              />
            </div>
            <div className="col-1">
              <button
                type="submit"
                disabled={appState.imgurImageSourceValue === ''}
              >
                fetch
              </button>
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
        <div className="local-images">
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
                    className="col-2 image"
                    src={i.link}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="imgur-images">
          <h2>Imgur images from {appState.imgurImageSourceValue}</h2>
          Page: {appState.imagesCurrentPage}{' '}
          <button
            onClick={_ => {
              appState.setImagesCurrentPage(-1)
              appState.fetch()
            }}
          >
            prev
          </button>{' '}
          <button
            onClick={_ => {
              appState.setImagesCurrentPage(1)
              appState.fetch()
            }}
          >
            next
          </button>
          <div style={{ marginBottom: 10 }} />
          <div className="grid">
            {appState.images.filter(i => i.link.match(/jpg$/)).map(i => (
              <img
                key={i.id}
                onClick={() => {
                  appState.onImageClick(i)
                }}
                className="col-2 image"
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
