import React, {useCallback, useState} from 'react'
import WidgetInput from './WidgetInput'
import {nanoid} from 'nanoid'
import {ObjectInputProps, PatchEvent, set} from 'sanity'
import {CloudinaryAsset} from '../types'
import {useSecrets} from '@sanity/studio-secrets'
import {InsertHandlerParams} from '../types'
import {openMediaSelector} from '../utils'
import SecretsConfigView, {namespace, Secrets} from './SecretsConfigView'

const CloudinaryInput = (props: ObjectInputProps) => {
  const [showSettings, setShowSettings] = useState(false)
  const {secrets} = useSecrets<Secrets>(namespace)
  const {onChange, schemaType: type} = props
  const value = (props.value as CloudinaryAsset) || undefined

  const handleSelect = useCallback(
    (payload: InsertHandlerParams) => {
      const [asset] = payload.assets

      if (!asset) {
        return
      }

      //The metadata in Sanity Studio cannot contain special characters,
      //hence the cloudinary metadata (context) needs to be transformed to valid object keys
      if (asset.context) {
        const objectWithRenamedKeys = Object.fromEntries(
          Object.entries(asset.context.custom).map(([contextKey, contextValue]) => {
            return [contextKey.replace(/[^a-zA-Z0-9_]|-/g, '_'), contextValue]
          })
        )

        // Update the asset with the new custom values
        const updatedAsset = {
          ...asset,
          context: {
            ...asset.context,
            custom: objectWithRenamedKeys,
          },
        }

        onChange(
          PatchEvent.from([
            set(
              Object.assign(
                {
                  _type: type.name,
                  _version: 1,
                  ...(value?._key ? {_key: value._key} : {_key: nanoid()}),
                },
                updatedAsset
              )
            ),
          ])
        )
      } else {
        onChange(
          PatchEvent.from([
            set(
              Object.assign(
                {
                  _type: type.name,
                  _version: 1,
                  ...(value?._key ? {_key: value._key} : {_key: nanoid()}),
                },
                asset
              )
            ),
          ])
        )
      }
    },
    [onChange, type, value?._key]
  )

  const action = secrets
    ? () =>
        openMediaSelector(
          secrets.cloudName,
          secrets.apiKey,
          false, // single selection
          handleSelect,
          value
        )
    : () => setShowSettings(true)

  return (
    <>
      {showSettings && <SecretsConfigView onClose={() => setShowSettings(false)} />}
      <WidgetInput onSetup={() => setShowSettings(true)} openMediaSelector={action} {...props} />
    </>
  )
}

export default CloudinaryInput
