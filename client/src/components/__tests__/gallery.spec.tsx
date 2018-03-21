import * as React from 'react'
import { shallow } from 'enzyme'
import { Gallery } from '../gallery'
import { resetAppState, appState } from '../../store'
import * as api from '../../api'
import { mock } from '../../__mocks__/getGallery'
import { ImgurImageSource } from '../../interfaces'
import { GalleryItemTmp, GalleryItemLocal } from '../../models'
import { ModalCmp } from '../modal'

describe('<Gallery />', () => {
  beforeEach(() => {
    resetAppState()
  })

  afterEach(() => jest.clearAllMocks())

  it('should show imgur images', async () => {
    appState.images = mock as any

    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('should call getImgurImages on didmount', async () => {
    const spy = jest
      .spyOn(appState, 'getImgurImages')
      .mockImplementation(() => null)

    shallow(<Gallery />)
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should call getImgurImages on submit', async () => {
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })

    const spy = jest
      .spyOn(appState, 'getImgurImages')
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

  it('should handle local file upload from computer', async () => {
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })

    const fakeEvent: any = {
      currentTarget: {
        files: [new Blob()]
      }
    }
    await (wrapper.instance() as Gallery).handleFileChange(fakeEvent)
    expect(appState.selectedImage).toBeInstanceOf(GalleryItemTmp)
  })

  it('should show local images', async () => {
    appState.imagesLocal.push(
      new GalleryItemLocal({ id: 1, link: 'foo', title: 'asda' })
    )
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('should call getLocalImages on didmount', async () => {
    const spy = jest
      .spyOn(appState, 'getLocalImages')
      .mockImplementation(() => null)

    shallow(<Gallery />)
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should call appState.onImageClick on image click', async () => {
    appState.imagesLocal.push(
      new GalleryItemLocal({ id: 1, link: 'foo', title: 'asda' })
    )
    const wrapper = shallow(<Gallery />, { disableLifecycleMethods: true })
    const spy = jest.spyOn(appState, 'onImageClick').mockReturnValue('foo')

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
