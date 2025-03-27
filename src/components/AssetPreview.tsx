import React from 'react'
import VideoPlayer from './VideoPlayer'
import {assetUrl} from '../utils'
import {Flex} from '@sanity/ui'
import {CloudinaryAsset} from '../types'
import {useSecrets} from '@sanity/studio-secrets'
import {namespace} from './SecretsConfigView'

interface ComponentProps {
  layout?: 'default' | 'block'
  value: CloudinaryAsset | undefined
}

interface ApiConfig {
  cloudName: string
}

const AssetPreview = ({value, layout}: ComponentProps) => {
  const {secrets, loading} = useSecrets<ApiConfig>(namespace)

  const url = value && assetUrl(value)
  if (!value || !url) {
    return null
  }

  if (value.format === 'pdf' && !loading && !secrets?.cloudName) {
    console.error('Cloudinary cloudName is missing')
    return null
  }

  const previewUrl =
    value.format === 'pdf' && !loading
      ? `https://res.cloudinary.com/${secrets?.cloudName ?? ''}/image/upload/f_jpg,pg_1/${
          value.public_id
        }.${value.format}`
      : url

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
