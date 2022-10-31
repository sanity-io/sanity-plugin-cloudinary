import React from 'react'
import {Button} from '@sanity/ui'
import {PatchEvent, setIfMissing, insert} from 'sanity'

import {useSecrets} from '@sanity/studio-secrets'
import SecretsConfigView, {namespace} from './components/SecretsConfigView'
import {cloudinaryAssetSchema} from './schema/cloudinaryAsset'
import {openMediaSelector} from './utils'
import {InsertHandlerParams} from './typings'

interface ApiConfig {
  cloudName: string
  apiKey: string
}

const AssetListFunctions = (props: any) => {
  const {secrets, loading} = useSecrets<ApiConfig>(namespace)
  const [showSettings, setShowSettings] = React.useState(false)

  const cloudinaryType = props.type.of.find(
    (t: {name: string}) => t.name === cloudinaryAssetSchema.name
  )

  const handleSelect = (selected: InsertHandlerParams) => {
    const {onCreateValue, onChange} = props
    const items = selected.assets.map((asset) =>
      Object.assign(
        {},
        asset,
        {
          // Schema version. In case we ever change our schema.
          _version: 1,
        },
        onCreateValue(cloudinaryType)
      )
    )
    onChange(PatchEvent.from([setIfMissing([]), insert(items, 'after', [-1])]))
  }

  const actions = (
    <>
      <Button
        disabled={props.readOnly || loading}
        mode="ghost"
        onClick={() =>
          secrets &&
          openMediaSelector(
            secrets.cloudName,
            secrets.apiKey,
            true, // multi-selection
            handleSelect
          )
        }
      >
        Add multiple
      </Button>
      <Button onClick={() => setShowSettings(true)}>Configure</Button>
    </>
  )

  return (
    <>
      {showSettings && <SecretsConfigView onClose={() => setShowSettings(false)} />}
      {/* <DefaultArrayFunctions {...props}>*/}
      {cloudinaryType && actions}
      {/*    </DefaultArrayFunctions>*/}
    </>
  )
}

export default AssetListFunctions
