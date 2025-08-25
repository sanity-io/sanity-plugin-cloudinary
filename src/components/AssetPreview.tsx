import React from 'react'
import VideoPlayer from './VideoPlayer'
import {assetUrl} from '../utils'
import {Flex, Text} from '@sanity/ui'
import {CloudinaryAsset} from '../types'
import {DocumentIcon} from '@sanity/icons'
import {useSecrets} from '@sanity/studio-secrets'
import {namespace, Secrets} from './SecretsConfigView'

interface ComponentProps {
  layout?: 'default' | 'block'
  value: CloudinaryAsset | undefined
}

const AssetPreview = ({value, layout}: ComponentProps) => {
  const {secrets} = useSecrets<Secrets>(namespace)
  const cloudName = secrets?.cloudName

  if (!value || !cloudName) {
    return null
  }
  const url = value && assetUrl(value, cloudName)
  if (!url) return null
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
      return layout === 'default' ? (
        <Flex align="center" justify="center" style={{width: '100%'}}>
          <img
            alt="preview"
            src={
              value.format === 'pdf' && url
                ? url.replace(
                    'image/upload',
                    'image/upload/f_jpg,pg_1,l_text:Verdana_75_letter_spacing_14:PDF'
                  )
                : url || ''
            }
            style={{
              maxWidth: '80px',
              height: 'auto',
              display: 'block',
            }}
          />
        </Flex>
      ) : (
        <div style={{width: '100%'}}>
          <img
            alt="preview"
            src={
              value.format === 'pdf' && url
                ? url.replace(
                    'image/upload',
                    'image/upload/f_jpg,pg_1,l_text:Verdana_75_letter_spacing_14:PDF'
                  )
                : url || ''
            }
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      )
  }
}

export default AssetPreview
