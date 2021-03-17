import React from 'react'
import { useCurrentMarkerStore, useMapStoreBySelector } from 'pages/map/store'
import { Modal } from 'antd'

export default function ArticleModal () {
  const [visible] = useMapStoreBySelector(state => state.visible)
  const [state, { closeModal }] = useCurrentMarkerStore()
  const { title, url } = state

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={closeModal}
      footer={null}
      width='80vw'
      bodyStyle={{
        height: '80vh'
      }}
    >
      <iframe
        src={url?.replace('wikipedia', 'm.wikipedia')}
        title={title}
        width='100%'
        height='100%'
        style={{ border: 'none' }}
      />
    </Modal>
  )
}
