import React from 'react'
import VideoPlayer from './VideoPlayer'
import {assetUrl} from '../utils'
import {Flex} from '@sanity/ui'
import {CloudinaryAsset} from '../types'

interface ComponentProps {
  layout?: 'default' | 'block'
  value: CloudinaryAsset | undefined
}

const AssetPreview = ({value, layout}: ComponentProps) => {
  const url = value && assetUrl(value)
  if (!value || !url) {
    return null
  }

  switch (value.resource_type) {
    case 'video':
      return (
        <Flex
          align="center"
          style={{
            maxWidth: layout === 'default' ? '80px' : '100%',
          }}
        >
          <VideoPlayer src={url} kind="player" />
        </Flex>
      )
    default:
      return (
        <Flex align="center">
          <img
            alt="preview"
            src={url}
            style={{
              maxWidth: layout === 'default' ? '80px' : '100%',
              height: 'auto',
            }}
          />
        </Flex>
      )
  }
}

export default AssetPreview
