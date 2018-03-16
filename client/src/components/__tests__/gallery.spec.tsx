import * as React from 'react'
import { shallow, mount, render } from 'enzyme'
import { Gallery } from '../gallery'
import { resetAppState, appState } from '../../store'
import * as api from '../../api'
import { mock } from '../../__mocks__/getGallery'
import { ImgurImageSource } from '../../interfaces'

describe('<Gallery />', () => {
  beforeEach(() => {
    resetAppState()
  })

  afterEach(() => jest.clearAllMocks())

  it('should show data', async () => {
    appState.images = mock as any

    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('should call fetch on didmount', async () => {
    const spy = jest
      .spyOn(Gallery.prototype, 'fetch')
      .mockImplementation(() => null)

    shallow(<Gallery />)
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should fetch on submit', async () => {
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })

    const spy = jest
      .spyOn(Gallery.prototype, 'fetch')
      .mockImplementation(() => null)

    wrapper
      .find('select')
      .simulate('change', { currentTarget: { value: ImgurImageSource.album } })

    wrapper
      .find('.name')
      .simulate('change', { currentTarget: { value: 'foo' } })

    wrapper.find('form').simulate('submit', { preventDefault() {} })

    expect(spy.mock.calls.length).toBe(1)
    expect(appState.imgurImageSourceType).toBe(ImgurImageSource.album)
    expect(appState.imgurImageSourceValue).toBe('foo')
  })
})
