import React from 'react'
import VideoPlayer from './VideoPlayer'
import {assetUrl} from '../utils'
import {Box} from '@sanity/ui'
import {CloudinaryAsset} from '../typings'

type ComponentProps = {
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
        <Box>
          <VideoPlayer src={url} kind="player" />
        </Box>
      )
    default:
      return (
        <Box>
          <img
            alt="preview"
            src={url}
            style={{
              maxWidth: layout === 'default' ? '80px' : '100%',
              height: 'auto',
            }}
          />
        </Box>
      )
  }
}

export default AssetPreview
