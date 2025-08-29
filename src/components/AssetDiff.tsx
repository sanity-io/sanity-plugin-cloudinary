import React from 'react'
import {DiffFromTo} from 'sanity'
import VideoPlayer from './VideoPlayer'
import {assetUrl} from '../utils'
import {CloudinaryAsset} from '../types'
import {useSecrets} from '@sanity/studio-secrets'
import {namespace, Secrets} from './SecretsConfigView'

type Props = {
  value: CloudinaryAsset | undefined
}

const CloudinaryDiffPreview = ({value}: Props) => {
  const {secrets} = useSecrets<Secrets>(namespace)
  const cloudName = secrets?.cloudName

  if (!value) {
    return null
  }

  const url = assetUrl(value, cloudName)

  if (value.resource_type === 'video' && url) {
    return (
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <VideoPlayer src={url} kind="diff" />
      </section>
    )
  }

  return <img alt="preview" src={url} style={{maxWidth: '100%', height: 'auto'}} />
}

type DiffProps = {
  diff: any
  schemaType: any
}

const AssetDiff = ({diff, schemaType}: DiffProps) => {
  return <DiffFromTo diff={diff} schemaType={schemaType} previewComponent={CloudinaryDiffPreview} />
}

export default AssetDiff
