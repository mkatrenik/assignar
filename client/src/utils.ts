import { TDataUrl, TImageSize } from './interfaces'

/**
 * converts resource on url to DataUrl
 * @param url
 */
export const urlToDataURL = (url: string) =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise<TDataUrl>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
    )

/**
 * convert svg element to image
 * @param svg
 * @param fileType
 */
export const svgToImageAsDataUrl = (
  svg: SVGSVGElement,
  fileType: 'png' | 'jpeg' = 'jpeg'
) => {
  return new Promise<TDataUrl>((resolve, reject) => {
    const svgData = new XMLSerializer().serializeToString(svg)

    const canvas = document.createElement('canvas')

    const svgSize = svg.getBoundingClientRect()
    canvas.width = svgSize.width
    canvas.height = svgSize.height

    const ctx = canvas.getContext('2d')

    if (ctx == null) {
      return reject(`ctx is null`)
    }

    const img = document.createElement('img')
    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData))

    img.onload = function() {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL(`image/${fileType}`))
    }
  })
}

/**
 * get image dimansions
 * @param image
 */
export const getImageSize = (image: TDataUrl) => {
  return new Promise<TImageSize>(resolve => {
    let img = new Image()

    img.onload = function() {
      resolve({ width: img.width, height: img.height })
    }

    img.src = image
  })
}

/**
 * convert DataUrl to Blob
 * @param dataUrl
 */
export const dataUrlToBlob = (dataUrl: TDataUrl) =>
  fetch(dataUrl).then(res => res.blob())

/**
 * timeout as promise
 * @param time
 */
export const timeout = (time: number) => {
  return new Promise(ok => {
    setTimeout(() => {
      ok({})
    }, time)
  })
}

/**
 * read Blob as DataUrl
 * @param file
 */
export const fileReaderPromised = (file: File) => {
  return new Promise<TDataUrl>(resolve => {
    const reader = new FileReader()
    reader.onload = evv => {
      const dataUrl = (evv.currentTarget as any).result as TDataUrl
      resolve(dataUrl)
    }
    reader.readAsDataURL(file)
  })
}
