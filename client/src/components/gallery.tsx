import * as React from 'react'
import { view } from 'react-easy-state'
import { appState } from '../store'
import styled from 'styled-components'
import { ImgurImageSource } from '../interfaces'

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

function resized(path: string) {
  return path.replace(/.jpg$/, 'm.jpg')
}

@view
export class Gallery extends React.Component {
  constructor(props: any) {
    super(props)
  }

  fetch() {
    appState.fetch({ subreddit: appState.imgurImageSourceValue })
  }

  async componentDidMount() {
    this.fetch()
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
                <option value={ImgurImageSource.album}>Album</option>
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
            <div className="col">
              <button type="submit">fetch</button>
            </div>
          </div>
        </form>
        <div className="grid">
          {appState.images.map(i => (
            <img key={i.id} className="col-2" src={resized(i.link)} />
          ))}
        </div>
      </Styled>
    )
  }
}
