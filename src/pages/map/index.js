import React from 'react'
import Page from 'components/Page'
import GoogleMap from 'components/GoogleMap'
import ArticleModal from 'components/ArticleModal'
import { MapMediator } from 'pages/map/mediator'

export default function Map () {
  return (
    <Page>
      <MapMediator />
      <ArticleModal />
      <GoogleMap />
    </Page>
  )
}
