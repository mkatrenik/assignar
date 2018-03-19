import * as React from 'react'
import { shallow, mount, render } from 'enzyme'
import { Gallery } from '../gallery'
import { resetAppState, appState } from '../../store'
import * as api from '../../api'
import { mock } from '../../__mocks__/getGallery'
import { ImgurImageSource } from '../../interfaces'
import { GalleryItemLocal } from '../../models'
import { ModalCmp } from '../modal'

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
    const spy = jest.spyOn(appState, 'fetch').mockImplementation(() => null)

    shallow(<Gallery />)
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should fetch on submit', async () => {
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })

    const spy = jest.spyOn(appState, 'fetch').mockImplementation(() => null)

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

  it('should handle local file upload from computer', async () => {
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })

    const fakeEvent: any = {
      currentTarget: {
        files: [new Blob()]
      }
    }
    await (wrapper.instance() as Gallery).handleFileChange(fakeEvent)
    expect(appState.imagesLocal.length).toBe(1)
    expect(appState.imagesLocal[0]).toBeInstanceOf(GalleryItemLocal)
  })

  it('should show local images on file upload', async () => {
    jest.spyOn(GalleryItemLocal, 'generateId').mockReturnValue('foo')
    appState.imagesLocal.push(new GalleryItemLocal('base64'))
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('should show local images on file upload', async () => {
    jest.spyOn(GalleryItemLocal, 'generateId').mockReturnValue('foo')
    appState.imagesLocal.push(new GalleryItemLocal('base64'))
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('should call appStore.onImageClick on image click', async () => {
    const spy = jest.spyOn(appState, 'onImageClick').mockReturnValue('foo')
    appState.imagesLocal.push(new GalleryItemLocal('base64'))
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })

    wrapper
      .find('.local-images .image')
      .first()
      .simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0]).toBeInstanceOf(GalleryItemLocal)
  })

  it('should open modal dialog on appStore.modalIsOpen', async () => {
    appState.modalIsOpen = true
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })
    expect(wrapper.find(ModalCmp).length).toBe(1)
  })
})
