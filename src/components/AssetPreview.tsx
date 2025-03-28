import React from 'react'
import VideoPlayer from './VideoPlayer'
import {assetUrl} from '../utils'
import {Flex, Text} from '@sanity/ui'
import {CloudinaryAsset} from '../types'
import {DocumentIcon} from '@sanity/icons'

interface ComponentProps {
  layout?: 'default' | 'block'
  value: CloudinaryAsset | undefined
}

const AssetPreview = ({value, layout}: ComponentProps) => {
  const url = value && assetUrl(value)
  if (!value || !url) {
    return null
  }

  const previewUrl =
    value.format === 'pdf' ? url?.replace('image/upload', 'image/upload/f_jpg,pg_1') : url

  switch (value.resource_type) {
    case 'video':
      return (
        <Flex
          align="center"
          style={{
            maxWidth: layout === 'default' ? '80px' : '100%',
          }}
        >
          <VideoPlayer src={previewUrl} kind="player" />
        </Flex>
      )
    case 'raw':
      return (
        <Flex align="center">
          <DocumentIcon />
          <Text size={1} style={{marginLeft: '0.5em'}}>
            {value.display_name ?? 'Raw file'}
          </Text>
        </Flex>
      )
    default:
      return (
        <Flex align="center">
          <img
            alt="preview"
            src={previewUrl}
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
