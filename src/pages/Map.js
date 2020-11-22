import React, { useState } from 'react'
import Page from 'components/Page'
import GoogleMap from 'components/GoogleMap'

import WikipediaApi from 'api/Wikipedia'

export default function Map () {
  const [markers, setMarkers] = useState([])

  async function handleCenterChanged (latLng) {
    try {
      const results = await WikipediaApi.getArticles({
        coord: latLng.toJSON(),
        limit: 50
      })

      setMarkers(results.query.geosearch)
    } catch (e) {
      console.error('Getting articles error:', e)
    }
  }

  return (
    <Page>
      <GoogleMap onCenterChanged={handleCenterChanged} markers={markers} />
    </Page>
  )
}
