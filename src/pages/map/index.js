import React from 'react'
import Page from 'components/Page'
import GoogleMap from 'components/GoogleMap'
import useMapPageMediator from 'pages/map/mediator'

export default function Map () {
  useMapPageMediator()

  return (
    <Page>
      <GoogleMap />
    </Page>
  )
}
