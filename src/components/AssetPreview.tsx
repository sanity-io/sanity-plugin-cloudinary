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
            src={
              // Cloudinary returns resource_type as "image" even for PDFs,
              // so we check the format to handle PDFs specifically.
              // If it's a PDF, convert the first page to JPG and overlay a "PDF" label for thumbnail clarity.
              value.format === 'pdf'
                ? url?.replace(
                    'image/upload',
                    'image/upload/f_jpg,pg_1,l_text:Verdana_75_letter_spacing_14:PDF'
                  )
                : url
            }
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
