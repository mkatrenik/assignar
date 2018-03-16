import * as React from 'react'
import { Gallery } from './gallery'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  }
`

export const App = () => <Gallery />
